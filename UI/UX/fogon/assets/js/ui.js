/**
 * ui.js — Comportamiento interactivo compartido por todas las páginas.
 *
 * Cada función `init*` tiene una sola responsabilidad y se activa solo si
 * los elementos que necesita existen en la página. Se ejecuta al final del
 * <body>, cuando el DOM ya está listo.
 */
(function defineUi(Fogon) {
  'use strict';

  var $ = Fogon.$;
  var $$ = Fogon.$$;
  var html = document.documentElement;

  var THEME_KEY = 'fogon:theme';
  var LOADER_KEY = 'fogon:loader-shown';
  var ANNOUNCE_KEY_PREFIX = 'fogon:announce:';
  var THEME_COLORS = { light: '#FAF6F0', dark: '#14110F' };
  var DIALOG_CLOSE_MS = 320;
  var REDUCED_CLOSE_MS = 160;
  var DRAG_CLOSE_THRESHOLD_PX = 100;
  var SWIPE_THRESHOLD_PX = 50;
  var PARALLAX_FACTOR = 0.08;

  /** Promesa que se resuelve tras `ms` milisegundos. */
  function wait(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  /** Guarda en almacenamiento sin romper si está bloqueado. */
  function safeWrite(storage, key, value) {
    try { storage.setItem(key, value); } catch (error) { /* Modo privado: se ignora. */ }
  }

  function safeRead(storage, key) {
    try { return storage.getItem(key); } catch (error) { return null; }
  }

  // ---------------------------------------------------------------
  // Estado de apertura en todos los [data-status]
  // ---------------------------------------------------------------

  /**
   * Pinta el indicador "Abierto / Cerrado" y lo actualiza cada minuto.
   * data-status="compact" muestra solo el título; data-status-pill lo
   * envuelve en la píldora oscura para fondos fotográficos.
   */
  function initStatus() {
    function paint() {
      $$('[data-status]').forEach(function (element) {
        var content = Fogon.statusHTML({ compact: element.dataset.status === 'compact' });
        element.innerHTML = element.hasAttribute('data-status-pill') ? '<span class="status-pill">' + content + '</span>' : content;
      });
    }
    paint();
    setInterval(paint, 60 * 1000);
  }

  // ---------------------------------------------------------------
  // Tema claro / oscuro
  // ---------------------------------------------------------------

  function updateThemeControls(theme) {
    var label = theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
    $$('[data-theme-toggle]').forEach(function (button) { button.setAttribute('aria-label', label); });
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLORS[theme]);
  }

  /**
   * Aplica el tema con un revelado circular desde el botón (View Transitions).
   * Sin soporte o con movimiento reducido, usa un fundido de 300 ms.
   * @param {'light'|'dark'} next - Tema a aplicar.
   * @param {{x: number, y: number}} origin - Centro del revelado.
   */
  function setTheme(next, origin) {
    function apply() {
      html.dataset.theme = next;
      safeWrite(window.localStorage, THEME_KEY, next);
      updateThemeControls(next);
    }

    if (!document.startViewTransition || Fogon.prefersReducedMotion()) {
      html.classList.add('theme-fade');
      apply();
      setTimeout(function () { html.classList.remove('theme-fade'); }, 320);
      return;
    }

    html.classList.add('is-theme-switching');
    var transition = document.startViewTransition(apply);
    transition.ready.then(function () {
      var radius = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y));
      html.animate(
        { clipPath: ['circle(0px at ' + origin.x + 'px ' + origin.y + 'px)', 'circle(' + radius + 'px at ' + origin.x + 'px ' + origin.y + 'px)'] },
        { duration: 450, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
    transition.finished.finally(function () { html.classList.remove('is-theme-switching'); });
  }

  function initThemeToggle() {
    updateThemeControls(html.dataset.theme);
    document.addEventListener('click', function (event) {
      var button = event.target.closest('[data-theme-toggle]');
      if (!button) return;
      var rect = button.getBoundingClientRect();
      var next = html.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(next, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    });
  }

  // ---------------------------------------------------------------
  // Loader con el isotipo (sección 7.3 del brief)
  // ---------------------------------------------------------------

  /**
   * Hace "viajar" el isotipo del loader a su lugar en el encabezado (FLIP).
   * @param {HTMLElement} loader
   * @returns {Promise<void>}
   */
  function flyMarkToHeader(loader) {
    var mark = $('.loader__mark', loader);
    var target = $('.site-header .brand-mark');
    if (!mark || !target || !mark.animate) return Promise.resolve();

    var from = mark.getBoundingClientRect();
    var to = target.getBoundingClientRect();
    if (!to.width) return wait(300);

    var deltaX = (to.left + to.width / 2) - (from.left + from.width / 2);
    var deltaY = (to.top + to.height / 2) - (from.top + from.height / 2);
    var scale = to.width / from.width;
    var animation = mark.animate([
      { transform: 'translate(0, 0) scale(1)', color: getComputedStyle(mark).color },
      { transform: 'translate(' + deltaX + 'px, ' + deltaY + 'px) scale(' + scale + ')', color: getComputedStyle(target).color }
    ], { duration: 450, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' });
    return animation.finished;
  }

  function finishLoader(loader) {
    html.classList.remove('has-loader');
    loader.classList.remove('is-animating', 'is-leaving');
    document.dispatchEvent(new CustomEvent('fogon:loaded'));
  }

  function exitLoader(loader) {
    loader.classList.add('is-leaving');
    return flyMarkToHeader(loader).then(function () { finishLoader(loader); });
  }

  /** Salida rápida: la página cargó antes de mostrar el loader. */
  function hideLoaderQuickly(loader) {
    loader.classList.add('is-leaving');
    return wait(REDUCED_CLOSE_MS).then(function () { finishLoader(loader); });
  }

  function initLoader() {
    var loader = $('.loader');
    if (!loader || !html.classList.contains('has-loader')) return;

    safeWrite(window.sessionStorage, LOADER_KEY, '1');
    var config = Fogon.config;
    var forced = new URLSearchParams(location.search).get('loader') === '1';
    var pageLoaded = new Promise(function (resolve) {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', resolve, { once: true });
    });

    if (Fogon.prefersReducedMotion()) {
      pageLoaded.then(function () { hideLoaderQuickly(loader); });
      return;
    }

    // Modo producción: si la página carga en < 300 ms, el loader no se anima.
    if (config.loaderMode === 'production' && !forced) {
      var elapsed = performance.now();
      var armDelay = Math.max(0, config.loaderSkipIfFasterThanMs - elapsed);
      var armTimer = setTimeout(function () { loader.classList.add('is-animating'); }, armDelay);
      pageLoaded.then(function () {
        if (!loader.classList.contains('is-animating')) {
          clearTimeout(armTimer);
          hideLoaderQuickly(loader);
        } else {
          wait(900).then(function () { exitLoader(loader); });
        }
      });
      return;
    }

    // Modo mockup: animación completa, sin pasar de ~1,8 s en total.
    loader.classList.add('is-animating');
    var flightMs = 450;
    var minimum = Promise.all([pageLoaded, wait(config.loaderMinMs)]);
    var maximum = wait(config.loaderMaxMs - flightMs);
    Promise.race([minimum, maximum]).then(function () { exitLoader(loader); });
  }

  // ---------------------------------------------------------------
  // Encabezado, parallax, barra inferior y "volver arriba"
  // ---------------------------------------------------------------

  function initScrollEffects() {
    var header = $('.site-header');
    var backToTop = $('[data-back-to-top]');
    var parallax = $('[data-parallax]');
    var canParallax = parallax && !Fogon.prefersReducedMotion() && window.matchMedia('(min-width: 1024px)').matches;
    var ticking = false;

    function update() {
      var y = window.scrollY;
      if (header) header.classList.toggle('is-scrolled', y > 8);
      if (backToTop) backToTop.classList.toggle('is-visible', y > window.innerHeight * 2);
      if (canParallax && y < window.innerHeight * 1.2) {
        parallax.style.transform = 'translate3d(0, ' + (y * PARALLAX_FACTOR).toFixed(1) + 'px, 0)';
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();

    if (backToTop) {
      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: Fogon.prefersReducedMotion() ? 'auto' : 'smooth' });
        var main = $('#contenido');
        if (main) main.focus({ preventScroll: true });
      });
    }
  }

  /**
   * La barra inferior aparece cuando las acciones del hero salen de la
   * pantalla (nunca compite con el botón primario del hero).
   */
  function initBottomBar() {
    var bar = $('.bottom-bar');
    if (!bar) return;
    var heroActions = $('[data-hero-actions]');
    if (!heroActions || !('IntersectionObserver' in window)) {
      bar.classList.add('is-visible');
      return;
    }
    new IntersectionObserver(function (entries) {
      var entry = entries[0];
      var isAbove = entry.boundingClientRect.top < 0;
      bar.classList.toggle('is-visible', !entry.isIntersecting && isAbove);
    }).observe(heroActions);
  }

  // ---------------------------------------------------------------
  // Revelado al hacer scroll (solo la primera vez)
  // ---------------------------------------------------------------

  function initReveal() {
    var targets = $$('.reveal, .reveal-photo');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (element) { element.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach(function (element) { observer.observe(element); });
  }

  // ---------------------------------------------------------------
  // Diálogos (hoja inferior / modal) accesibles
  // ---------------------------------------------------------------

  /**
   * Controla un <dialog>: apertura animada, cierre con Esc, con el velo o
   * arrastrando el asa (móvil), bloqueo del scroll y retorno del foco.
   * @param {HTMLDialogElement} element
   */
  function DialogController(element) {
    this.element = element;
    this.panel = $('.dialog__panel', element);
    this.returnFocusTo = null;
    this.isClosing = false;

    var self = this;
    element.addEventListener('cancel', function (event) {
      event.preventDefault();
      self.close();
    });
    element.addEventListener('click', function (event) {
      if (event.target.closest('[data-dialog-close]')) self.close();
    });
    this.bindDragToClose();
  }

  DialogController.prototype.open = function (trigger) {
    if (this.element.open) return;
    this.returnFocusTo = trigger || document.activeElement;
    html.classList.add('is-locked');
    this.element.showModal();
    // Fuerza el estado inicial (fuera de pantalla) antes de animar la entrada.
    void this.panel.offsetWidth;
    this.element.classList.add('is-open');
    this.element.dispatchEvent(new CustomEvent('dialog:open'));
  };

  DialogController.prototype.close = function () {
    if (!this.element.open || this.isClosing) return;
    var self = this;
    this.isClosing = true;
    this.element.classList.remove('is-open');
    wait(Fogon.prefersReducedMotion() ? REDUCED_CLOSE_MS : DIALOG_CLOSE_MS).then(function () {
      self.element.close();
      self.isClosing = false;
      if (!$('dialog[open]')) html.classList.remove('is-locked');
      if (self.returnFocusTo && self.returnFocusTo.focus) self.returnFocusTo.focus({ preventScroll: true });
      self.element.dispatchEvent(new CustomEvent('dialog:closed'));
    });
  };

  /** En móvil, arrastrar el asa hacia abajo más de 100 px cierra la hoja. */
  DialogController.prototype.bindDragToClose = function () {
    var handle = $('[data-drag-handle]', this.element);
    if (!handle) return;
    var self = this;
    var startY = 0;
    var deltaY = 0;
    var dragging = false;

    handle.addEventListener('pointerdown', function (event) {
      if (window.innerWidth >= 768) return;
      dragging = true;
      startY = event.clientY;
      deltaY = 0;
      handle.setPointerCapture(event.pointerId);
      self.panel.classList.add('is-dragging');
    });
    handle.addEventListener('pointermove', function (event) {
      if (!dragging) return;
      deltaY = Math.max(0, event.clientY - startY);
      self.panel.style.transform = 'translateY(' + deltaY + 'px)';
    });

    function endDrag() {
      if (!dragging) return;
      dragging = false;
      self.panel.classList.remove('is-dragging');
      self.panel.style.transform = '';
      if (deltaY > DRAG_CLOSE_THRESHOLD_PX) self.close();
    }
    handle.addEventListener('pointerup', endDrag);
    handle.addEventListener('pointercancel', endDrag);
  };

  /** Registro de diálogos por id: Fogon.dialogs.get('dish-dialog'). */
  Fogon.dialogs = {
    controllers: {},
    get: function (id) {
      if (!this.controllers[id]) {
        var element = document.getElementById(id);
        if (!element) return null;
        this.controllers[id] = new DialogController(element);
      }
      return this.controllers[id];
    }
  };

  function initDialogTriggers() {
    document.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-open-dialog]');
      if (trigger) {
        var dialog = Fogon.dialogs.get(trigger.dataset.openDialog);
        if (dialog) dialog.open(trigger);
        return;
      }
      var dishTrigger = event.target.closest('[data-dish]');
      if (dishTrigger && Fogon.dishView) Fogon.dishView.open(dishTrigger.dataset.dish, dishTrigger);
    });

    // En la navegación móvil, un enlace a la misma página solo cierra el menú.
    var navDialog = document.getElementById('nav-dialog');
    if (navDialog) {
      navDialog.addEventListener('click', function (event) {
        if (event.target.closest('a[href^="#"]')) Fogon.dialogs.get('nav-dialog').close();
      });
    }
  }

  // ---------------------------------------------------------------
  // Galerías y visor
  // ---------------------------------------------------------------

  /**
   * Pinta las galerías `<ul data-gallery="ambiente">` desde data.js.
   * data-gallery-layout="mosaic": la primera foto ocupa 2 columnas (y 2
   * filas en escritorio) para romper la cuadrícula con intención.
   */
  function renderGalleries() {
    $$('[data-gallery]').forEach(function (list) {
      var group = list.dataset.gallery;
      var items = Fogon.galleries[group] || [];
      var isMosaic = list.dataset.galleryLayout === 'mosaic';
      list.innerHTML = items.map(function (spec, index) {
        var size = 'aspect-[4/5]';
        if (isMosaic) size = index === 0 ? 'col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-auto' : 'aspect-square lg:aspect-auto';
        return '<li class="reveal ' + size + '" style="--i:' + index + '">' +
          '<button type="button" class="group relative block h-full w-full overflow-hidden rounded-xl" data-lightbox="' + group + '" data-index="' + index + '" aria-haspopup="dialog" ' +
          'aria-label="Ampliar foto ' + (index + 1) + ' de ' + items.length + ': ' + Fogon.escape(spec.label) + '">' +
          Fogon.photoHTML(spec, { tag: 'span', decorative: true, cls: 'absolute inset-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]' }) +
          '</button></li>';
      }).join('');
    });
  }

  function initLightbox() {
    var element = document.getElementById('lightbox-dialog');
    if (!element || !$('[data-lightbox]')) return;

    var dialog = Fogon.dialogs.get('lightbox-dialog');
    var stage = $('.lightbox__stage', element);
    var photo = $('[data-lightbox-photo]', element);
    var caption = $('[data-lightbox-caption]', element);
    var counter = $('[data-lightbox-counter]', element);
    var items = [];
    var index = 0;

    function render() {
      var spec = items[index];
      photo.classList.add('relative');
      // thumb: oculta la etiqueta de la foto porque el pie ya la muestra.
      photo.innerHTML = Fogon.photoHTML(spec, { cls: 'absolute inset-0', thumb: true });
      caption.textContent = spec.label;
      counter.textContent = (index + 1) + ' / ' + items.length;
    }

    function show(nextIndex) {
      index = (nextIndex + items.length) % items.length;
      if (Fogon.prefersReducedMotion()) {
        render();
        return;
      }
      stage.classList.add('is-swapping');
      wait(150).then(function () {
        render();
        stage.classList.remove('is-swapping');
      });
    }

    document.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-lightbox]');
      if (!trigger) return;
      items = Fogon.galleries[trigger.dataset.lightbox] || [];
      index = Number(trigger.dataset.index) || 0;
      render();
      dialog.open(trigger);
    });

    $('[data-lightbox-prev]', element).addEventListener('click', function () { show(index - 1); });
    $('[data-lightbox-next]', element).addEventListener('click', function () { show(index + 1); });

    // Tocar el fondo vacío (no la foto ni los botones) cierra el visor.
    element.addEventListener('click', function (event) {
      if (event.target.hasAttribute('data-lightbox-backdrop')) dialog.close();
    });

    element.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') show(index - 1);
      if (event.key === 'ArrowRight') show(index + 1);
    });

    // Gesto de deslizar en pantallas táctiles.
    var startX = null;
    stage.addEventListener('pointerdown', function (event) { startX = event.clientX; });
    stage.addEventListener('pointerup', function (event) {
      if (startX === null) return;
      var deltaX = event.clientX - startX;
      startX = null;
      if (Math.abs(deltaX) > SWIPE_THRESHOLD_PX) show(index + (deltaX < 0 ? 1 : -1));
    });
  }

  // ---------------------------------------------------------------
  // Carrusel horizontal con indicador de posición (móvil)
  // ---------------------------------------------------------------

  /**
   * Crea los puntos del indicador para un carrusel y los sincroniza.
   * @param {HTMLElement} carousel - Elemento con [data-carousel].
   */
  Fogon.initCarousel = function (carousel) {
    var dots = document.querySelector('[data-dots="' + carousel.id + '"]');
    var items = Array.prototype.slice.call(carousel.children);
    if (!dots || items.length < 2) return;

    dots.innerHTML = items.map(function (item, index) {
      return '<button type="button" class="dots__btn" aria-label="Ver elemento ' + (index + 1) + ' de ' + items.length + '"></button>';
    }).join('');
    var buttons = $$('.dots__btn', dots);

    function activeIndex() {
      var offset = carousel.scrollLeft + parseFloat(getComputedStyle(carousel).paddingLeft);
      var closest = 0;
      items.forEach(function (item, index) {
        if (Math.abs(item.offsetLeft - offset) < Math.abs(items[closest].offsetLeft - offset)) closest = index;
      });
      return closest;
    }

    function sync() {
      var current = activeIndex();
      buttons.forEach(function (button, index) { button.setAttribute('aria-current', String(index === current)); });
    }

    buttons.forEach(function (button, index) {
      button.addEventListener('click', function () {
        var padding = parseFloat(getComputedStyle(carousel).paddingLeft);
        carousel.scrollTo({ left: items[index].offsetLeft - padding, behavior: Fogon.prefersReducedMotion() ? 'auto' : 'smooth' });
      });
    });
    carousel.addEventListener('scroll', function () { requestAnimationFrame(sync); }, { passive: true });
    sync();
  };

  // ---------------------------------------------------------------
  // Aviso descartable de horarios especiales (fricción #20)
  // ---------------------------------------------------------------

  function initAnnouncement() {
    var announcement = Fogon.announcement;
    $$('[data-announcement]').forEach(function (slot) {
      var storageKey = ANNOUNCE_KEY_PREFIX + announcement.id;
      if (safeRead(window.localStorage, storageKey) === '1') return;
      var variant = slot.dataset.announcement === 'photo' ? ' announce--on-photo' : '';
      slot.innerHTML = '<div class="announce' + variant + '" role="note">' +
        Fogon.icon('info') + '<p class="flex-1">' + Fogon.escape(announcement.text) + '</p>' +
        '<button type="button" class="icon-btn" aria-label="Cerrar aviso">' + Fogon.icon('x') + '</button></div>';
      $('button', slot).addEventListener('click', function () {
        var box = $('.announce', slot);
        box.classList.add('is-leaving');
        safeWrite(window.localStorage, storageKey, '1');
        wait(300).then(function () { slot.innerHTML = ''; });
      });
    });
  }

  // ---------------------------------------------------------------
  // Arranque
  // ---------------------------------------------------------------
  Fogon.hydratePhotos();
  renderGalleries();
  initStatus();
  initThemeToggle();
  initDialogTriggers();
  initLightbox();
  initAnnouncement();
  initScrollEffects();
  initBottomBar();
  initReveal();
  $$('[data-carousel]').forEach(Fogon.initCarousel);
  initLoader();
})(window.Fogon);
