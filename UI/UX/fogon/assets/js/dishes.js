/**
 * dishes.js — Plantillas de platos y detalle del plato.
 *
 * Lo usan Inicio (platos firma y accesos a categorías) y la Carta (lista
 * completa). Mantener las plantillas aquí garantiza que un plato se vea y
 * cueste lo mismo en todas partes.
 *
 * Importante (brief §1 y fricción #12): no existe ningún botón de
 * "Agregar" ni de "Comprar". La única acción es preguntar por WhatsApp.
 */
(function defineDishes(Fogon) {
  'use strict';

  var escape = Fogon.escape;

  /** Índices para buscar platos y categorías por id en O(1). */
  var dishById = {};
  Fogon.dishes.forEach(function (dish) { dishById[dish.id] = dish; });

  var categoryById = {};
  Fogon.categories.forEach(function (category) { categoryById[category.id] = category; });

  Fogon.dishById = function (id) { return dishById[id]; };
  Fogon.categoryById = function (id) { return categoryById[id]; };

  // ---------------------------------------------------------------
  // Fragmentos
  // ---------------------------------------------------------------

  /**
   * Etiqueta de dieta: ícono + texto, nunca solo el ícono.
   * @param {string} key - Clave de Fogon.tags.
   * @returns {string} HTML de la etiqueta.
   */
  Fogon.tagHTML = function (key) {
    var tag = Fogon.tags[key];
    if (!tag) return '';
    return '<span class="tag tag--' + tag.tone + '">' + Fogon.icon(tag.icon, { size: 16 }) + tag.label + '</span>';
  };

  function tagsHTML(keys, extraClass) {
    if (!keys.length) return '';
    return '<span class="flex flex-wrap gap-1.5 ' + (extraClass || '') + '">' + keys.map(Fogon.tagHTML).join('') + '</span>';
  }

  /** Línea secundaria con los precios por porción ("Media ración: $8,00"). */
  function variantsNote(dish) {
    if (!dish.variants) return '';
    var others = dish.variants.filter(function (variant) { return variant.price !== dish.price; });
    if (!others.length) return '';
    return '<span class="block mt-1 text-sm text-muted">' + others.map(function (variant) {
      return escape(variant.label) + ': ' + Fogon.priceText(variant.price);
    }).join(' · ') + '</span>';
  }

  /** Nombre accesible del botón que abre el detalle. */
  function detailLabel(dish) {
    return 'Ver detalle de ' + dish.name + ', ' + Fogon.priceText(dish.price);
  }

  // ---------------------------------------------------------------
  // Tarjeta de plato firma (Inicio)
  // ---------------------------------------------------------------

  /**
   * Tarjeta con foto 4:3, nombre, descripción, precio y etiquetas.
   * El envoltorio lleva el revelado; el botón, el hover (no se pisan).
   * @param {object} dish - Plato de Fogon.dishes.
   * @param {number} index - Posición, para escalonar la animación.
   * @returns {string} HTML.
   */
  Fogon.dishCardHTML = function (dish, index) {
    return '<div class="reveal h-full" style="--i:' + index + '">' +
      '<button type="button" class="dish-card" data-dish="' + dish.id + '" aria-haspopup="dialog" aria-label="' + escape(detailLabel(dish)) + '">' +
      Fogon.photoHTML(dish.photo, { tag: 'span', decorative: true }) +
      '<span class="flex flex-1 flex-col gap-2 p-5">' +
      '<span class="flex items-baseline justify-between gap-3"><span class="text-h3">' + escape(dish.name) + '</span>' + Fogon.priceHTML(dish.price) + '</span>' +
      '<span class="text-muted text-[0.9375rem] leading-normal">' + escape(dish.description) + '</span>' +
      tagsHTML(dish.tags, 'mt-auto pt-2') +
      '</span></button></div>';
  };

  /**
   * Pinta los platos firma en un contenedor (carrusel en móvil).
   * @param {HTMLElement} container
   */
  Fogon.renderSignatureDishes = function (container) {
    container.innerHTML = Fogon.dishes
      .filter(function (dish) { return dish.signature; })
      .map(Fogon.dishCardHTML)
      .join('');
  };

  /**
   * Accesos con imagen a categorías de la carta (Inicio → /menu#categoria).
   * @param {HTMLElement} container
   * @param {string[]} ids - Categorías a mostrar.
   */
  Fogon.renderCategoryTiles = function (container, ids) {
    container.innerHTML = ids.map(function (id, index) {
      var category = categoryById[id];
      return '<a href="menu.html#' + id + '" class="reveal group relative block overflow-hidden rounded-xl aspect-[4/5] md:aspect-[3/4]" style="--i:' + index + '">' +
        Fogon.photoHTML(category.photo, { cls: 'absolute inset-0', decorative: true, thumb: true }) +
        '<span class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></span>' +
        '<span class="absolute inset-x-0 bottom-0 p-4 md:p-5 text-cream">' +
        '<span class="block font-display text-xl md:text-2xl font-medium">' + escape(category.name) + '</span>' +
        '<span class="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-cream/90">Ver platos ' +
        Fogon.icon('arrowRight', { size: 16, cls: 'transition-transform duration-150 group-hover:translate-x-1' }) + '</span>' +
        '</span></a>';
    }).join('');
  };

  // ---------------------------------------------------------------
  // Fila de plato (Carta, formato de carta clásica)
  // ---------------------------------------------------------------

  /**
   * Fila escaneable (patrón en F): nombre a la izquierda y precio a la
   * derecha, siempre en la misma columna; descripción de máx. 2 líneas.
   * @param {object} dish
   * @param {{thumb?: boolean}} [options] - Miniatura de 96 px en móvil/tablet.
   * @returns {string} HTML del <li>.
   */
  Fogon.dishRowHTML = function (dish, options) {
    var opts = options || {};
    var thumb = opts.thumb ? Fogon.photoHTML(dish.photo, { tag: 'span', decorative: true, thumb: true, cls: 'dish-row__thumb' }) : '';
    return '<li data-dish-item="' + dish.id + '">' +
      '<button type="button" class="dish-row" data-dish="' + dish.id + '" aria-haspopup="dialog" aria-label="' + escape(detailLabel(dish)) + '">' +
      thumb +
      '<span class="dish-row__body">' +
      '<span class="dish-row__head">' +
      '<span class="dish-row__name">' + escape(dish.name) + '</span>' +
      '<span class="dish-row__leader" aria-hidden="true"></span>' +
      '<span class="dish-row__price">' + Fogon.priceHTML(dish.price) + '</span>' +
      '</span>' +
      '<span class="dish-row__desc">' + escape(dish.description) + '</span>' +
      variantsNote(dish) +
      tagsHTML(dish.tags, 'dish-row__tags') +
      '</span></button></li>';
  };

  // ---------------------------------------------------------------
  // Detalle del plato (hoja inferior / modal)
  // ---------------------------------------------------------------

  function allergensHTML(dish) {
    if (!dish.allergens.length) {
      return '<p>Sin alérgenos principales declarados. Si tienes una alergia, avísanos al llegar.</p>';
    }
    return '<span class="flex flex-wrap gap-1.5">' + dish.allergens.map(function (allergen) {
      return '<span class="tag tag--ink">' + Fogon.icon('info', { size: 16 }) + 'Contiene ' + escape(allergen.toLowerCase()) + '</span>';
    }).join('') + '</span>';
  }

  function pricesHTML(dish) {
    var rows = dish.variants || [{ label: dish.portion || 'Ración', price: dish.price }];
    return rows.map(function (row) {
      return '<div class="flex items-baseline gap-3 py-1.5">' +
        '<span>' + escape(row.label) + '</span>' +
        '<span class="flex-1 border-b border-dotted border-brass -translate-y-1" aria-hidden="true"></span>' +
        Fogon.priceHTML(row.price) + '</div>';
    }).join('');
  }

  function detailField(label, value) {
    if (!value) return '';
    return '<div><dt class="eyebrow">' + label + '</dt><dd class="mt-1.5">' + value + '</dd></div>';
  }

  /**
   * Contenido del detalle: foto, descripción, ingredientes, alérgenos,
   * porción, maridaje, precios por variante y consulta por WhatsApp.
   * @param {object} dish
   * @returns {string} HTML.
   */
  Fogon.dishDetailHTML = function (dish) {
    var category = categoryById[dish.category];
    var question = 'Hola, quiero preguntar por el plato «' + dish.name + '» de la carta de Fogón.';
    return '<article class="dish-detail">' +
      Fogon.photoHTML(dish.photo, { cls: 'dish-detail__media aspect-[4/3] md:aspect-auto' }) +
      '<div class="dish-detail__body p-6 md:p-8">' +
      '<p class="eyebrow">' + escape(category.name) + '</p>' +
      '<h2 id="dish-title" class="mt-1 pr-12 font-display text-[1.75rem] md:text-[2rem] leading-tight font-medium">' + escape(dish.name) + '</h2>' +
      tagsHTML(dish.tags, 'mt-3') +
      '<p class="mt-4">' + escape(dish.details) + '</p>' +
      '<dl class="mt-6 grid gap-5">' +
      detailField('Ingredientes', '<span class="text-muted">' + escape(dish.ingredients.join(', ')) + '</span>') +
      detailField('Alérgenos', allergensHTML(dish)) +
      '<div class="grid grid-cols-2 gap-4">' +
      detailField('Porción', escape(dish.portion)) +
      detailField('Maridaje sugerido', dish.pairing ? escape(dish.pairing) : '') +
      '</div></dl>' +
      '<div class="mt-6 rounded-xl bg-sand p-4">' + pricesHTML(dish) +
      '<p class="mt-2 text-sm text-muted">' + Fogon.restaurant.priceNote + '</p></div>' +
      '<a class="btn btn-primary btn-block mt-6" href="' + Fogon.links.whatsapp(question) + '" target="_blank" rel="noopener">' +
      Fogon.icon('whatsapp') + 'Preguntar por este plato</a>' +
      '<p class="mt-3 text-center text-sm text-muted">Carta de referencia: no se hacen pedidos en línea.</p>' +
      '</div></article>';
  };

  /** Abre el detalle de un plato conservando la posición de la página. */
  Fogon.dishView = {
    open: function (id, trigger) {
      var dish = dishById[id];
      var dialog = Fogon.dialogs && Fogon.dialogs.get('dish-dialog');
      if (!dish || !dialog) return;
      var content = Fogon.$('[data-dish-content]', dialog.element);
      content.innerHTML = Fogon.dishDetailHTML(dish);
      var scroller = Fogon.$('.dialog__scroll', dialog.element);
      if (scroller) scroller.scrollTop = 0;
      dialog.open(trigger);
    }
  };
})(window.Fogon);
