/**
 * layout.js — Partes comunes a todas las páginas.
 *
 * Por qué se renderizan con JS: el mockup es HTML estático sin servidor.
 * Así el encabezado, el pie, la barra inferior y los diálogos existen en un
 * solo lugar (DRY) en vez de copiarse en cada página.
 *
 * Por qué de forma síncrona: este script se ejecuta al inicio del <body> e
 * inserta el loader y el encabezado justo después de sí mismo, ANTES de que
 * el navegador pinte. Así no hay parpadeo ni salto del encabezado.
 *
 * La página indica su identidad en el <body>:
 *   data-page="inicio|carta|nosotros|contacto|proceso|error"
 *   data-header="overlay" → encabezado transparente sobre el hero.
 */
(function defineLayout(Fogon) {
  'use strict';

  var body = document.body;
  var page = body.dataset.page || '';
  var isOverlayHeader = body.dataset.header === 'overlay';
  var restaurant = Fogon.restaurant;
  var links = Fogon.links;

  /** Navegación principal (Inicio se alcanza desde el logo en escritorio). */
  var NAV_ITEMS = [
    { href: 'index.html', label: 'Inicio', page: 'inicio', desktop: false },
    { href: 'menu.html', label: 'Carta', page: 'carta', desktop: true },
    { href: 'nosotros.html', label: 'Nosotros', page: 'nosotros', desktop: true },
    { href: 'contacto.html', label: 'Contacto', page: 'contacto', desktop: true }
  ];

  var RESERVE_MESSAGE = 'Hola, quiero reservar una mesa en Fogón. ¿Tienen disponibilidad?';

  /** Atributo aria-current para el enlace de la página activa. */
  function currentAttr(item) {
    return item.page === page ? ' aria-current="page"' : '';
  }

  /** Logotipo horizontal: isotipo + "FOGÓN" + "COCINA DE LEÑA". */
  function brandHTML() {
    return '<a href="index.html" class="brand" aria-label="Fogón, cocina de leña. Ir al inicio">' +
      '<span class="brand-mark">' + Fogon.logoMark() + '</span>' +
      '<span class="brand-word" aria-hidden="true"><span class="brand-name">FOGÓN</span><span class="brand-tag">COCINA DE LEÑA</span></span>' +
      '</a>';
  }

  // ---------------------------------------------------------------
  // Parte superior: enlace de salto, loader y encabezado
  // ---------------------------------------------------------------

  function skipLinkHTML() {
    return '<a class="skip-link" href="#contenido">Saltar al contenido</a>';
  }

  /** Loader: isotipo que se dibuja + logotipo letra por letra. */
  function loaderHTML() {
    var letters = 'FOGÓN'.split('').map(function (letter, index) {
      return '<span style="--i:' + index + '">' + letter + '</span>';
    }).join('');
    return '<div class="loader" role="status" aria-label="Cargando Fogón">' +
      '<div class="loader__bg"></div>' +
      '<div class="loader__content">' +
      '<div class="loader__mark">' + Fogon.logoMark() + '</div>' +
      '<div class="loader__word" aria-hidden="true">' + letters + '</div>' +
      '<div class="loader__tag" aria-hidden="true">COCINA DE LEÑA</div>' +
      '</div></div>';
  }

  function themeToggleHTML() {
    return '<button type="button" class="icon-btn theme-toggle" data-theme-toggle aria-label="Cambiar a modo oscuro">' +
      Fogon.icon('sun', { cls: 'icon-sun' }) + Fogon.icon('moon', { cls: 'icon-moon' }) +
      '</button>';
  }

  function headerHTML() {
    var desktopLinks = NAV_ITEMS.filter(function (item) { return item.desktop; }).map(function (item) {
      return '<a class="nav-link" href="' + item.href + '"' + currentAttr(item) + '>' + item.label + '</a>';
    }).join('');

    return '<header class="site-header' + (isOverlayHeader ? ' site-header--overlay' : '') + '" data-zone="header">' +
      '<div class="site-header__inner wrap">' +
      brandHTML() +
      '<nav class="ml-auto hidden md:flex items-center gap-6 lg:gap-8" aria-label="Principal">' + desktopLinks + '</nav>' +
      '<div class="ml-auto md:ml-2 flex items-center gap-1 md:gap-2">' +
      themeToggleHTML() +
      '<button type="button" class="btn btn-header hidden md:inline-flex" data-open-dialog="reserve-dialog">Reservar</button>' +
      '<button type="button" class="icon-btn md:hidden" data-open-dialog="nav-dialog" aria-label="Abrir menú">' + Fogon.icon('menu', { size: 24 }) + '</button>' +
      '</div></div></header>';
  }

  /**
   * Inserta loader y encabezado justo después del script que se está
   * ejecutando (por eso debe llamarse durante la carga del documento).
   * @param {HTMLScriptElement} anchor - Script a partir del cual insertar.
   */
  function renderTop(anchor) {
    anchor.insertAdjacentHTML('afterend', skipLinkHTML() + loaderHTML() + headerHTML());
  }

  // ---------------------------------------------------------------
  // Parte inferior: pie, barra de acciones, diálogos y "volver arriba"
  // ---------------------------------------------------------------

  /**
   * Agrupa días consecutivos con el mismo horario (lun → dom).
   * Ej.: "Mar – Jue · 12:00 m. – 10:00 p. m."
   * @returns {Array<{label: string, range: string, days: number[]}>}
   */
  Fogon.groupedSchedule = function () {
    var order = [1, 2, 3, 4, 5, 6, 0];
    var groups = [];
    order.forEach(function (dayIndex) {
      var day = Fogon.schedule[dayIndex];
      var range = Fogon.dayRange(day);
      var last = groups[groups.length - 1];
      if (last && last.range === range) {
        last.days.push(dayIndex);
      } else {
        groups.push({ range: range, days: [dayIndex] });
      }
    });
    groups.forEach(function (group) {
      var first = Fogon.schedule[group.days[0]].name;
      var lastDay = Fogon.schedule[group.days[group.days.length - 1]].name;
      group.label = group.days.length === 1 ? first : first + ' a ' + lastDay.toLowerCase();
    });
    return groups;
  };

  function footerHoursHTML() {
    var today = Fogon.now().day;
    return Fogon.groupedSchedule().map(function (group) {
      var isToday = group.days.indexOf(today) !== -1;
      return '<li class="flex justify-between gap-4 py-1' + (isToday ? ' font-semibold text-ink' : '') + '">' +
        '<span>' + group.label + (isToday ? ' <span class="sr-only">(hoy)</span>' : '') + '</span>' +
        '<span class="text-right">' + group.range + '</span></li>';
    }).join('');
  }

  function contactListHTML() {
    var items = [
      { href: links.whatsapp(), icon: 'whatsapp', label: 'WhatsApp ' + restaurant.phoneDisplay, external: true },
      { href: links.tel, icon: 'phone', label: 'Llamar al ' + restaurant.phoneDisplay },
      { href: links.mail, icon: 'mail', label: restaurant.email },
      { href: links.instagram, icon: 'instagram', label: '@' + restaurant.instagram, external: true }
    ];
    return items.map(function (item) {
      var target = item.external ? ' target="_blank" rel="noopener"' : '';
      return '<li><a class="inline-flex items-center gap-3 min-h-11 hover:text-brand transition-colors" href="' + item.href + '"' + target + '>' +
        Fogon.icon(item.icon) + '<span>' + Fogon.escape(item.label) + '</span></a></li>';
    }).join('');
  }

  function footerHTML() {
    var navLinks = NAV_ITEMS.concat([{ href: 'proceso.html', label: 'Proceso de diseño', page: 'proceso' }]).map(function (item) {
      return '<li><a class="inline-flex items-center min-h-11 hover:text-brand transition-colors" href="' + item.href + '"' + currentAttr(item) + '>' + item.label + '</a></li>';
    }).join('');

    return '<footer class="site-footer bg-sand text-[0.9375rem]" data-zone="footer">' +
      '<div class="wrap py-16 md:py-20">' +
      '<div class="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">' +

      '<div class="lg:col-span-4">' +
      '<a href="index.html" class="inline-flex flex-col items-start gap-3" aria-label="Fogón, ir al inicio">' +
      '<span class="block w-14 h-14">' + Fogon.logoMark() + '</span>' +
      '<span class="brand-word" aria-hidden="true"><span class="brand-name text-2xl">FOGÓN</span><span class="brand-tag">COCINA DE LEÑA</span></span>' +
      '</a>' +
      '<p class="mt-5 text-muted measure">Cocina venezolana contemporánea hecha a la leña, en Las Mercedes <em class="font-display">desde 2012</em>.</p>' +
      '<a class="link-arrow mt-3" href="' + links.review + '" target="_blank" rel="noopener">' + Fogon.icon('star') + '<span>¿Te gustó? Déjanos tu reseña</span></a>' +
      '</div>' +

      '<div class="lg:col-span-3">' +
      '<h2 class="eyebrow mb-4">Visítanos</h2>' +
      '<a class="inline-flex items-start gap-3 hover:text-brand transition-colors" href="' + links.googleMaps + '" target="_blank" rel="noopener">' +
      Fogon.icon('mapPin', { cls: 'mt-1' }) + '<span>' + restaurant.address + '<br><span class="text-muted">' + restaurant.reference + '</span></span></a>' +
      '<div class="mt-4" data-status></div>' +
      '<ul class="mt-3 text-muted" aria-label="Horario">' + footerHoursHTML() + '</ul>' +
      '</div>' +

      '<div class="lg:col-span-3">' +
      '<h2 class="eyebrow mb-4">Contacto</h2>' +
      '<ul class="space-y-1">' + contactListHTML() + '</ul>' +
      '</div>' +

      '<nav class="lg:col-span-2" aria-label="Pie de página">' +
      '<h2 class="eyebrow mb-4">Explora</h2>' +
      '<ul>' + navLinks + '</ul>' +
      '</nav>' +
      '</div>' +

      '<hr class="rule-brass my-10">' +
      '<div class="flex flex-col gap-3 text-sm text-muted lg:flex-row lg:items-center lg:justify-between">' +
      '<p class="inline-flex items-start gap-2">' + Fogon.icon('creditCard', { cls: 'mt-0.5' }) + '<span><b class="text-ink font-semibold">Pagos en el local:</b> ' + restaurant.payments.join(' · ') + '</span></p>' +
      '<p>' + restaurant.priceNote + '</p>' +
      '</div>' +
      '<p class="mt-6 text-sm text-muted">© 2026 Fogón · Mockup con datos de ejemplo. Este sitio es un catálogo informativo: no se realizan pedidos ni pagos en línea.</p>' +
      '</div></footer>';
  }

  /** Barra inferior fija en móvil: las 3 acciones clave en la zona del pulgar. */
  function bottomBarHTML() {
    return '<nav class="bottom-bar" aria-label="Acciones rápidas" data-zone="contact-bar">' +
      '<a class="bottom-bar__item" href="' + links.googleMaps + '" target="_blank" rel="noopener">' + Fogon.icon('navigation') + '<span>Cómo llegar</span></a>' +
      '<a class="bottom-bar__item bottom-bar__item--accent" href="' + links.whatsapp() + '" target="_blank" rel="noopener">' + Fogon.icon('whatsapp') + '<span>WhatsApp</span></a>' +
      '<a class="bottom-bar__item" href="' + links.tel + '">' + Fogon.icon('phone') + '<span>Llamar</span></a>' +
      '</nav>';
  }

  function backToTopHTML() {
    return '<button type="button" class="back-to-top" data-back-to-top aria-label="Volver arriba">' + Fogon.icon('arrowUp') + '</button>';
  }

  /** Estructura común de diálogo: velo, panel, asa de arrastre y cerrar. */
  function dialogShell(id, options) {
    var opts = options || {};
    var labelAttr = opts.labelledBy ? ' aria-labelledby="' + opts.labelledBy + '"' : ' aria-label="' + Fogon.escape(opts.label || '') + '"';
    return '<dialog class="dialog ' + (opts.cls || '') + '" id="' + id + '"' + labelAttr + '>' +
      '<div class="dialog__scrim" data-dialog-close></div>' +
      '<div class="dialog__panel">' +
      '<div class="dialog__handle-zone" data-drag-handle><span class="dialog__handle"></span></div>' +
      '<button type="button" class="dialog__close" data-dialog-close aria-label="' + (opts.closeLabel || 'Cerrar') + '">' + Fogon.icon('x') + '</button>' +
      '<div class="dialog__scroll">' + (opts.content || '') + '</div>' +
      '</div></dialog>';
  }

  /** Diálogo "Reservar": abre opciones de contacto, nunca un pago. */
  function reserveDialogHTML() {
    var content = '<div class="p-6 pt-4 md:p-8">' +
      '<p class="eyebrow">Reservas</p>' +
      '<h2 id="reserve-title" class="font-display text-[1.75rem] leading-tight font-medium mt-1 pr-12">¿Cómo prefieres reservar?</h2>' +
      '<p class="mt-3 text-muted">Te respondemos en horario de atención. No necesitas pagar nada por adelantado.</p>' +
      '<div class="mt-6 grid gap-3">' +
      '<a class="btn btn-primary btn-block" href="' + links.whatsapp(RESERVE_MESSAGE) + '" target="_blank" rel="noopener">' + Fogon.icon('whatsapp') + 'Escribir por WhatsApp</a>' +
      '<a class="btn btn-secondary btn-block" href="' + links.tel + '">' + Fogon.icon('phone') + 'Llamar al ' + restaurant.phoneDisplay + '</a>' +
      '</div>' +
      '<div class="mt-5" data-status></div>' +
      '<a class="link-arrow mt-2" href="contacto.html#reservas"><span>Grupos, eventos y preguntas frecuentes</span>' + Fogon.icon('arrowRight') + '</a>' +
      '</div>';
    return dialogShell('reserve-dialog', { cls: 'dialog--sm', labelledBy: 'reserve-title', content: content });
  }

  /** Navegación móvil a pantalla completa. */
  function navDialogHTML() {
    var items = NAV_ITEMS.concat([{ href: 'proceso.html', label: 'Proceso de diseño', page: 'proceso', small: true }]).map(function (item, index) {
      var size = item.small ? 'text-lg text-muted' : 'font-display text-[2rem] leading-tight';
      return '<li class="reveal-nav" style="--i:' + index + '"><a class="flex items-center justify-between min-h-14 ' + size + '" href="' + item.href + '"' + currentAttr(item) + '>' +
        item.label + Fogon.icon('arrowRight', { cls: 'text-brass' }) + '</a></li>';
    }).join('');

    return '<dialog class="dialog dialog--nav" id="nav-dialog" aria-label="Menú de navegación">' +
      '<div class="dialog__panel">' +
      '<div class="wrap flex items-center justify-between h-16 flex-none">' + brandHTML() +
      '<button type="button" class="icon-btn" data-dialog-close aria-label="Cerrar menú">' + Fogon.icon('x', { size: 24 }) + '</button></div>' +
      '<div class="dialog__scroll"><div class="wrap pt-6 pb-10">' +
      '<nav aria-label="Principal (móvil)"><ul class="divide-y divide-line border-y border-line">' + items + '</ul></nav>' +
      '<div class="mt-8" data-status></div>' +
      '<p class="mt-2 text-muted">' + restaurant.address + '</p>' +
      '<div class="mt-6 grid grid-cols-2 gap-3">' +
      '<a class="btn btn-primary" href="' + links.whatsapp() + '" target="_blank" rel="noopener">' + Fogon.icon('whatsapp') + 'WhatsApp</a>' +
      '<a class="btn btn-secondary" href="' + links.tel + '">' + Fogon.icon('phone') + 'Llamar</a>' +
      '</div>' +
      '<a class="link-arrow mt-4" href="' + links.googleMaps + '" target="_blank" rel="noopener">' + Fogon.icon('navigation') + '<span>Cómo llegar</span></a>' +
      '</div></div></div></dialog>';
  }

  /** Detalle del plato: hoja inferior en móvil y modal en escritorio. */
  function dishDialogHTML() {
    return dialogShell('dish-dialog', { labelledBy: 'dish-title', closeLabel: 'Cerrar detalle del plato', content: '<div data-dish-content></div>' });
  }

  /** Visor de galería con flechas, gestos, teclado y contador. */
  function lightboxHTML() {
    return '<dialog class="dialog dialog--lightbox" id="lightbox-dialog" aria-label="Galería de fotos">' +
      '<div class="dialog__scrim"></div>' +
      '<div class="dialog__panel flex flex-col" data-lightbox-backdrop>' +
      '<div class="flex items-center justify-between h-16 px-4 md:px-8 flex-none">' +
      '<p class="font-semibold tabular-nums" data-lightbox-counter aria-live="polite"></p>' +
      '<button type="button" class="icon-btn" data-dialog-close aria-label="Cerrar galería">' + Fogon.icon('x', { size: 24 }) + '</button>' +
      '</div>' +
      '<div class="relative flex-1 flex items-center justify-center px-4 md:px-20 pb-10" data-lightbox-backdrop>' +
      '<button type="button" class="icon-btn absolute left-2 md:left-6 z-10 bg-black/30" data-lightbox-prev aria-label="Foto anterior">' + Fogon.icon('chevronLeft', { size: 24 }) + '</button>' +
      '<figure class="lightbox__stage w-full">' +
      '<div class="rounded-xl overflow-hidden mx-auto aspect-[3/2]" style="width:min(100%, calc((100svh - 190px) * 1.5))" data-lightbox-photo></div>' +
      '<figcaption class="mt-4 text-center text-cream/90" data-lightbox-caption></figcaption>' +
      '</figure>' +
      '<button type="button" class="icon-btn absolute right-2 md:right-6 z-10 bg-black/30" data-lightbox-next aria-label="Foto siguiente">' + Fogon.icon('chevronRight', { size: 24 }) + '</button>' +
      '</div></div></dialog>';
  }

  /**
   * Inserta pie, barra inferior, botón "volver arriba" y diálogos.
   * @param {HTMLScriptElement} anchor - Script a partir del cual insertar.
   */
  function renderBottom(anchor) {
    anchor.insertAdjacentHTML('afterend',
      footerHTML() + bottomBarHTML() + backToTopHTML() +
      reserveDialogHTML() + navDialogHTML() + dishDialogHTML() + lightboxHTML());
  }

  Fogon.layout = { renderTop: renderTop, renderBottom: renderBottom };

  // Este archivo se incluye al inicio del <body>: pinta la parte superior ya.
  renderTop(document.currentScript);
})(window.Fogon);
