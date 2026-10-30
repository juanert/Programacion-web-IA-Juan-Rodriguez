/**
 * menu.js — Página de la Carta.
 *
 *   - Pinta las categorías y los platos desde data.js (sustituye los skeletons).
 *   - Pestañas fijas con scrollspy: resaltan la categoría visible (fricción #9).
 *   - Buscador sin tildes y filtros por dieta con contador de resultados.
 *   - Guarda búsqueda, filtros y categoría en la URL para compartir y
 *     para no perder la posición al volver (fricción #14).
 */
(function defineMenuPage(Fogon) {
  'use strict';

  var $ = Fogon.$;
  var $$ = Fogon.$$;

  var root = $('#menu-root');
  if (!root) return;

  var track = $('#menu-tabs-track');
  var filtersContainer = $('#menu-filters');
  var searchInput = $('#menu-search');
  var clearSearchButton = $('[data-clear-search]');
  var counter = $('#menu-count');
  var clearFiltersButton = $('[data-clear-filters]');
  var emptyState = $('#menu-empty');
  var filterBadge = $('[data-filter-badge]');

  /** Categorías sin miniatura: en bebidas la lista clásica se lee mejor. */
  var NO_THUMB_CATEGORIES = ['bebidas', 'cocteles'];
  var SEARCH_DEBOUNCE_MS = 200;
  var CLICK_SCROLL_LOCK_MS = 800;

  var state = { query: '', tags: [] };
  var activeCategory = null;
  var spyLockedUntil = 0;
  var userHasScrolled = false;

  // ---------------------------------------------------------------
  // Renderizado
  // ---------------------------------------------------------------

  function dishesOf(categoryId) {
    return Fogon.dishes.filter(function (dish) { return dish.category === categoryId; });
  }

  function sectionHTML(category, index) {
    var dishes = dishesOf(category.id);
    var withThumb = NO_THUMB_CATEGORIES.indexOf(category.id) === -1;
    var rows = dishes.map(function (dish) { return Fogon.dishRowHTML(dish, { thumb: withThumb }); }).join('');
    var number = String(index + 1).padStart(2, '0');
    return '<section id="' + category.id + '" class="menu-section pt-8 pb-10 md:py-16 border-b border-line" data-category="' + category.id + '" aria-labelledby="cat-' + category.id + '">' +
      '<div class="lg:grid lg:grid-cols-12 lg:gap-8">' +
      '<header class="lg:col-span-4">' +
      '<div class="lg:sticky lg:top-[calc(var(--header-compact-h)_+_var(--tabs-h)_+_32px)]">' +
      '<p class="eyebrow">' + number + ' · ' + dishes.length + ' platos</p>' +
      '<h2 id="cat-' + category.id + '" class="text-h2 mt-1">' + Fogon.escape(category.name) + '</h2>' +
      '<p class="mt-3 text-muted measure">' + Fogon.escape(category.description) + '</p>' +
      Fogon.photoHTML(category.photo, { cls: 'hidden lg:block mt-6 rounded-xl aspect-[4/5] reveal-photo' }) +
      '</div></header>' +
      '<ul class="lg:col-span-8 mt-2 lg:mt-0" role="list">' + rows + '</ul>' +
      '</div></section>';
  }

  function renderSections() {
    root.innerHTML = Fogon.categories.map(sectionHTML).join('');
  }

  function renderTabs() {
    track.innerHTML = Fogon.categories.map(function (category) {
      return '<a class="menu-tab" href="#' + category.id + '" data-tab="' + category.id + '">' + Fogon.escape(category.name) + '</a>';
    }).join('') + '<span class="menu-tabs__indicator" aria-hidden="true"></span>';
  }

  function renderFilters() {
    filtersContainer.innerHTML = Fogon.filters.map(function (key) {
      var tag = Fogon.tags[key];
      return '<button type="button" class="chip" aria-pressed="false" data-filter="' + key + '">' + Fogon.icon(tag.icon, { size: 16 }) + tag.label + '</button>';
    }).join('');
  }

  // ---------------------------------------------------------------
  // Filtros y búsqueda
  // ---------------------------------------------------------------

  /**
   * ¿El plato cumple TODOS los filtros activos y la búsqueda?
   * "Vegetariano" incluye también los platos veganos.
   * @param {object} dish
   * @returns {boolean}
   */
  function matches(dish) {
    var passesTags = state.tags.every(function (tag) {
      if (tag === 'vegetariano') return dish.tags.indexOf('vegetariano') !== -1 || dish.tags.indexOf('vegano') !== -1;
      return dish.tags.indexOf(tag) !== -1;
    });
    if (!passesTags) return false;
    if (!state.query) return true;
    var haystack = Fogon.normalize([dish.name, dish.description, dish.ingredients.join(' '), Fogon.categoryById(dish.category).name].join(' '));
    return haystack.indexOf(Fogon.normalize(state.query)) !== -1;
  }

  function applyFilters() {
    var visibleTotal = 0;

    Fogon.categories.forEach(function (category) {
      var section = document.getElementById(category.id);
      var visibleInCategory = 0;
      dishesOf(category.id).forEach(function (dish) {
        var isVisible = matches(dish);
        $('[data-dish-item="' + dish.id + '"]', section).hidden = !isVisible;
        if (isVisible) visibleInCategory += 1;
      });
      section.hidden = visibleInCategory === 0;
      var tab = $('[data-tab="' + category.id + '"]', track);
      tab.setAttribute('aria-disabled', String(visibleInCategory === 0));
      tab.tabIndex = visibleInCategory === 0 ? -1 : 0;
      visibleTotal += visibleInCategory;
    });

    var isFiltering = state.tags.length > 0 || state.query !== '';
    counter.textContent = isFiltering
      ? 'Mostrando ' + visibleTotal + ' de ' + Fogon.dishes.length + ' platos'
      : Fogon.dishes.length + ' platos en la carta';
    clearFiltersButton.hidden = !isFiltering;
    clearSearchButton.hidden = state.query === '';
    emptyState.hidden = visibleTotal > 0;
    filterBadge.textContent = state.tags.length ? String(state.tags.length) : '';
    filterBadge.hidden = state.tags.length === 0;

    $$('[data-filter]', filtersContainer).forEach(function (chip) {
      chip.setAttribute('aria-pressed', String(state.tags.indexOf(chip.dataset.filter) !== -1));
    });

    syncUrl();
    updateSpy(true);
  }

  /** Guarda búsqueda y filtros en la URL sin crear entradas de historial. */
  function syncUrl() {
    var params = new URLSearchParams(window.location.search);
    if (state.query) params.set('q', state.query); else params.delete('q');
    if (state.tags.length) params.set('f', state.tags.join(',')); else params.delete('f');
    var query = params.toString();
    history.replaceState(null, '', window.location.pathname + (query ? '?' + query : '') + window.location.hash);
  }

  function readUrl() {
    var params = new URLSearchParams(window.location.search);
    state.query = params.get('q') || '';
    state.tags = (params.get('f') || '').split(',').filter(function (key) { return Fogon.filters.indexOf(key) !== -1; });
    searchInput.value = state.query;
  }

  function clearAll() {
    state.query = '';
    state.tags = [];
    searchInput.value = '';
    applyFilters();
    searchInput.focus();
  }

  function bindFilters() {
    filtersContainer.addEventListener('click', function (event) {
      var chip = event.target.closest('[data-filter]');
      if (!chip) return;
      var key = chip.dataset.filter;
      var position = state.tags.indexOf(key);
      if (position === -1) state.tags.push(key); else state.tags.splice(position, 1);
      applyFilters();
    });

    var debounceTimer = null;
    searchInput.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        state.query = searchInput.value.trim();
        applyFilters();
      }, SEARCH_DEBOUNCE_MS);
    });

    clearSearchButton.addEventListener('click', function () {
      state.query = '';
      searchInput.value = '';
      applyFilters();
      searchInput.focus();
    });

    clearFiltersButton.addEventListener('click', clearAll);
    $$('[data-clear-all]').forEach(function (button) { button.addEventListener('click', clearAll); });

    $('[data-filter-jump]').addEventListener('click', function () {
      $('#buscar').scrollIntoView({ behavior: Fogon.prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
      setTimeout(function () { searchInput.focus({ preventScroll: true }); }, 400);
    });

    $('[data-print-menu]').addEventListener('click', function () { window.print(); });
  }

  // ---------------------------------------------------------------
  // Pestañas fijas + scrollspy
  // ---------------------------------------------------------------

  /** Mueve el subrayado a la pestaña activa (solo transform). */
  function moveIndicator(tab) {
    var indicator = $('.menu-tabs__indicator', track);
    if (!tab || !indicator) return;
    indicator.style.transform = 'translateX(' + tab.offsetLeft + 'px) scaleX(' + tab.offsetWidth + ')';
  }

  function setActive(categoryId, options) {
    var opts = options || {};
    if (categoryId === activeCategory && !opts.force) return;
    activeCategory = categoryId;
    var activeTab = null;
    $$('[data-tab]', track).forEach(function (tab) {
      var isActive = tab.dataset.tab === categoryId;
      tab.setAttribute('aria-current', String(isActive));
      if (isActive) activeTab = tab;
    });
    moveIndicator(activeTab);
    if (activeTab) {
      var left = activeTab.offsetLeft - track.clientWidth / 2 + activeTab.offsetWidth / 2;
      track.scrollTo({ left: left, behavior: Fogon.prefersReducedMotion() ? 'auto' : 'smooth' });
    }
    if (userHasScrolled && categoryId) {
      history.replaceState(null, '', window.location.pathname + window.location.search + '#' + categoryId);
    }
  }

  /** La categoría activa es la última cuya cabecera ya pasó bajo las pestañas. */
  function updateSpy(force) {
    if (!force && performance.now() < spyLockedUntil) return;
    var offset = 64 + 56 + 24;
    var visibleSections = $$('.menu-section:not([hidden])', root);
    if (!visibleSections.length) return;
    var current = visibleSections[0].dataset.category;
    visibleSections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= offset) current = section.dataset.category;
    });
    setActive(current, { force: force });
  }

  function bindTabs() {
    track.addEventListener('click', function (event) {
      var tab = event.target.closest('[data-tab]');
      if (!tab) return;
      event.preventDefault();
      var section = document.getElementById(tab.dataset.tab);
      if (!section || section.hidden) return;
      userHasScrolled = true;
      spyLockedUntil = performance.now() + CLICK_SCROLL_LOCK_MS;
      setActive(tab.dataset.tab);
      section.scrollIntoView({ behavior: Fogon.prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    });

    var ticking = false;
    window.addEventListener('scroll', function () {
      userHasScrolled = true;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        updateSpy(false);
        ticking = false;
      });
    }, { passive: true });

    window.addEventListener('resize', function () {
      moveIndicator($('[data-tab][aria-current="true"]', track));
    });
  }

  /** Si la URL trae una categoría (#de-la-brasa), se lleva allí al cargar. */
  function scrollToHashOnLoad() {
    var id = window.location.hash.slice(1);
    var section = id && document.getElementById(id);
    if (!section || !section.classList.contains('menu-section') || section.hidden) return;
    requestAnimationFrame(function () {
      section.scrollIntoView({ behavior: 'auto', block: 'start' });
      setActive(id, { force: true });
    });
  }

  // ---------------------------------------------------------------
  // Arranque
  // ---------------------------------------------------------------
  renderSections();
  renderTabs();
  renderFilters();
  readUrl();
  bindFilters();
  bindTabs();
  applyFilters();
  scrollToHashOnLoad();
  // Las fuentes web cambian el ancho de las pestañas: recoloca el subrayado.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { moveIndicator($('[data-tab][aria-current="true"]', track)); });
  }
})(window.Fogon);
