/**
 * core.js — Utilidades compartidas por todas las páginas.
 *
 *   - Selectores y helpers de texto (escape, normalización, precios).
 *   - Íconos de línea (trazo 1,5 px, estilo Lucide) como SVG en línea.
 *   - Enlaces de contacto (WhatsApp, teléfono, mapas).
 *   - Horario y estado de apertura en la zona horaria de Caracas.
 *   - Logo (isotipo) e ilustraciones de los placeholders de fotografía.
 *
 * Se carga como script clásico (no módulo) para que el mockup funcione
 * también abriendo el HTML con doble clic (file://), donde los módulos ES
 * están bloqueados por CORS.
 */
window.Fogon = window.Fogon || {};

(function defineCore(Fogon) {
  'use strict';

  // ---------------------------------------------------------------
  // 1. Selectores y texto
  // ---------------------------------------------------------------

  /** Primer elemento que coincide con el selector. */
  Fogon.$ = function (selector, root) {
    return (root || document).querySelector(selector);
  };

  /** Todos los elementos que coinciden, como arreglo. */
  Fogon.$$ = function (selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  };

  /**
   * Escapa texto para insertarlo en HTML de forma segura.
   * @param {string} value - Texto sin escapar.
   * @returns {string} Texto con &, <, >, " y ' escapados.
   */
  Fogon.escape = function (value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  };

  /**
   * Normaliza texto para búsquedas: minúsculas y sin tildes.
   * Por qué: "pabellon" debe encontrar "Pabellón".
   * @param {string} value - Texto original.
   * @returns {string} Texto normalizado.
   */
  Fogon.normalize = function (value) {
    return String(value).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  };

  /** Indica si la persona pidió reducir el movimiento. */
  Fogon.prefersReducedMotion = function () {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  /**
   * Precio en texto plano con coma decimal: 18 → "$18,00".
   * @param {number} amount - Monto en USD.
   * @returns {string} Precio formateado.
   */
  Fogon.priceText = function (amount) {
    return '$' + amount.toFixed(2).replace('.', ',');
  };

  /**
   * Precio en HTML con el símbolo atenuado y cifras tabulares.
   * @param {number} amount - Monto en USD.
   * @returns {string} Fragmento HTML.
   */
  Fogon.priceHTML = function (amount) {
    return '<span class="price"><span class="price__currency" aria-hidden="true">$</span>' +
      '<span class="sr-only">USD </span>' + amount.toFixed(2).replace('.', ',') + '</span>';
  };

  // ---------------------------------------------------------------
  // 2. Íconos (viewBox 24, trazo 1,5 px)
  // ---------------------------------------------------------------
  var ICON_PATHS = {
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    arrowUp: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    menu: '<path d="M4 8h16"/><path d="M4 16h16"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    mapPin: '<path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
    whatsapp: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.2-1.8-1-1 .8a4 4 0 0 1-2.5-2.5l.8-1-1-1.8Z"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    navigation: '<path d="M3 11 22 2l-9 19-2-8-8-2Z"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"/>',
    sprout: '<path d="M7 20h10"/><path d="M12 20v-8"/><path d="M12 12c0-3.3-2.7-6-6-6H4v1c0 2.8 2.2 5 5 5Z"/><path d="M12 12c0-3.3 2.7-6 6-6h2v1c0 2.8-2.2 5-5 5Z"/>',
    wheatOff: '<path d="m2 2 20 20"/><path d="M12 22V12"/><path d="M8.5 6.5 12 10l3.5-3.5L12 3Z"/><path d="M7 11c0 1.9 2.2 3.5 5 3.5"/><path d="M17 11c0 1.9-2.2 3.5-5 3.5"/><path d="M7 15.5c0 1.9 2.2 3.5 5 3.5"/><path d="M17 15.5c0 1.9-2.2 3.5-5 3.5"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4.1 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3a2.5 2.5 0 0 0 2.5 2.5Z"/>',
    chefHat: '<path d="M17 21a1 1 0 0 0 1-1v-5.4c0-.4.3-.8.7-1A4 4 0 0 0 16.6 6a5 5 0 0 0-9.2 0 4 4 0 0 0-2.1 7.6c.4.2.7.6.7 1V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
    nut: '<path d="M12 4V2"/><path d="M5 10v4a7 7 0 0 0 14 0v-4"/><path d="M12 4c-4 0-7.5 2-8 4-.2 1-.9 2-2 3 1.3-.1 2-.3 3-1 .5.9 1 1.4 2 2 1.5-.6 2-1.1 2.5-2 .6 1 1.2 1.4 2.5 2 1.3-.6 1.9-1.1 2.5-2 .6 1 1.2 1.4 2.5 2 1.2-.5 1.7-1 2-2 1 .9 1.7 1.2 3 1-1.3-1-1.8-2-2-3-.5-2-4-4-8-4Z"/>',
    star: '<path d="M11.5 2.3a.5.5 0 0 1 1 0l2.3 4.7a2 2 0 0 0 1.6 1.2l5.2.7a.5.5 0 0 1 .3.9l-3.8 3.7a2 2 0 0 0-.6 1.9l.9 5.1a.5.5 0 0 1-.8.6l-4.6-2.4a2 2 0 0 0-2 0L6.4 21a.5.5 0 0 1-.8-.6l.9-5.1a2 2 0 0 0-.6-1.9L2.2 9.8a.5.5 0 0 1 .3-.9l5.1-.7a2 2 0 0 0 1.6-1.2Z"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
    accessibility: '<circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.4 3.5"/><path d="M4.2 14.5a5 5 0 0 0 6.9 6"/><path d="M13.8 17.5a5 5 0 0 0-6.9-6"/>',
    creditCard: '<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    printer: '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    wine: '<path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z"/><circle cx="12" cy="13" r="3"/>',
    minus: '<path d="M5 12h14"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    sliders: '<path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M2 14h4"/><path d="M10 8h4"/><path d="M18 16h4"/>',
    bookOpen: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3Z"/>',
    home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .7-1.5l7-6a2 2 0 0 1 2.6 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
    externalLink: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    scale: '<path d="M12 3v18"/><path d="M5 7h14"/><path d="m5 7-3 7a3 3 0 0 0 6 0Z"/><path d="m19 7-3 7a3 3 0 0 0 6 0Z"/>',
    sparkle: '<path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="m6 6 2 2"/><path d="m16 16 2 2"/><path d="m6 18 2-2"/><path d="m16 8 2-2"/>'
  };

  /**
   * Devuelve un ícono SVG en línea.
   * @param {string} name - Clave de ICON_PATHS.
   * @param {{size?: 16|20|24, cls?: string, label?: string, filled?: boolean}} [options]
   *        label: si se indica, el ícono deja de ser decorativo y se anuncia.
   * @returns {string} Marcado SVG.
   */
  Fogon.icon = function (name, options) {
    var opts = options || {};
    var classes = ['icon'];
    if (opts.size === 24) classes.push('icon--24');
    if (opts.size === 16) classes.push('icon--16');
    if (opts.filled) classes.push('icon--filled');
    if (opts.cls) classes.push(opts.cls);
    var a11y = opts.label ? 'role="img" aria-label="' + Fogon.escape(opts.label) + '"' : 'aria-hidden="true" focusable="false"';
    return '<svg class="' + classes.join(' ') + '" viewBox="0 0 24 24" ' + a11y + '>' + (ICON_PATHS[name] || '') + '</svg>';
  };

  // ---------------------------------------------------------------
  // 3. Enlaces de contacto (fricciones #4 y #5)
  // ---------------------------------------------------------------
  var restaurant = Fogon.restaurant;
  var mapsQuery = encodeURIComponent(restaurant.mapsQuery);

  Fogon.links = {
    /** Enlace a WhatsApp con mensaje prellenado. */
    whatsapp: function (message) {
      var text = message || 'Hola, tengo una consulta sobre Fogón.';
      return 'https://wa.me/' + restaurant.whatsappNumber + '?text=' + encodeURIComponent(text);
    },
    tel: 'tel:' + restaurant.phoneE164,
    mail: 'mailto:' + restaurant.email,
    instagram: 'https://instagram.com/' + restaurant.instagram,
    googleMaps: 'https://www.google.com/maps/search/?api=1&query=' + mapsQuery,
    waze: 'https://waze.com/ul?q=' + mapsQuery + '&navigate=yes',
    appleMaps: 'https://maps.apple.com/?q=' + mapsQuery,
    mapEmbed: 'https://www.google.com/maps?q=' + mapsQuery + '&output=embed',
    review: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Fogón cocina de leña Las Mercedes Caracas')
  };

  // ---------------------------------------------------------------
  // 4. Horario y estado de apertura (fricción #3)
  // ---------------------------------------------------------------
  var WEEKDAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  /**
   * Momento actual en Caracas como { day, minutes }.
   * Para revisar los estados en el mockup se puede forzar la hora con
   * `?ahora=2026-10-23T22:30` (se interpreta como hora de Caracas).
   * @returns {{day: number, minutes: number, isOverride: boolean}}
   */
  Fogon.now = function () {
    var override = new URLSearchParams(window.location.search).get('ahora');
    var match = override && override.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
    if (match) {
      var weekday = new Date(Date.UTC(+match[1], +match[2] - 1, +match[3])).getUTCDay();
      return { day: weekday, minutes: +match[4] * 60 + +match[5], isOverride: true };
    }
    var parts = {};
    new Intl.DateTimeFormat('en-US', {
      timeZone: Fogon.config.timeZone, weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
    }).formatToParts(new Date()).forEach(function (part) { parts[part.type] = part.value; });
    return { day: WEEKDAYS[parts.weekday], minutes: (+parts.hour % 24) * 60 + +parts.minute, isOverride: false };
  };

  /**
   * Formatea minutos desde medianoche al estilo venezolano.
   * 720 → "12:00 m." · 1320 → "10:00 p. m." · 1410 → "11:30 p. m."
   * @param {number} minutes - Minutos desde las 00:00.
   * @returns {string} Hora legible.
   */
  Fogon.formatTime = function (minutes) {
    var hours = Math.floor(minutes / 60) % 24;
    var mins = String(minutes % 60).padStart(2, '0');
    if (hours === 12 && mins === '00') return '12:00 m.';
    var suffix = hours < 12 ? 'a. m.' : 'p. m.';
    return (hours % 12 || 12) + ':' + mins + ' ' + suffix;
  };

  /**
   * Rango de un día del horario: "12:00 m. – 11:30 p. m." o "Cerrado".
   * @param {{closed?: boolean, open?: number, close?: number}} day
   * @returns {string}
   */
  Fogon.dayRange = function (day) {
    return day.closed ? 'Cerrado' : Fogon.formatTime(day.open) + ' – ' + Fogon.formatTime(day.close);
  };

  /**
   * Calcula el estado de apertura en un momento dado.
   * @param {{day: number, minutes: number}} [moment] - Por defecto, ahora.
   * @returns {{state: 'open'|'soon'|'closed', title: string, detail: string}}
   */
  Fogon.openStatus = function (moment) {
    var now = moment || Fogon.now();
    var today = Fogon.schedule[now.day];
    var isOpen = !today.closed && now.minutes >= today.open && now.minutes < today.close;

    if (isOpen) {
      var minutesLeft = today.close - now.minutes;
      if (minutesLeft <= Fogon.config.closingSoonMinutes) {
        return { state: 'soon', title: 'Cierra pronto', detail: 'a las ' + Fogon.formatTime(today.close) };
      }
      return { state: 'open', title: 'Abierto ahora', detail: 'cierra a las ' + Fogon.formatTime(today.close) };
    }

    if (!today.closed && now.minutes < today.open) {
      return { state: 'closed', title: 'Cerrado', detail: 'abre hoy a las ' + Fogon.formatTime(today.open) };
    }

    // Busca el siguiente día con servicio (como máximo, una semana).
    for (var offset = 1; offset <= 7; offset += 1) {
      var next = Fogon.schedule[(now.day + offset) % 7];
      if (!next.closed) {
        var when = offset === 1 ? 'mañana' : 'el ' + next.name.toLowerCase();
        return {
          state: 'closed',
          title: today.closed ? 'Cerrado hoy' : 'Cerrado',
          detail: 'abre ' + when + ' a las ' + Fogon.formatTime(next.open)
        };
      }
    }
    return { state: 'closed', title: 'Cerrado', detail: '' };
  };

  /**
   * Indicador de estado con punto, ícono y texto (el color nunca va solo).
   * @param {{compact?: boolean}} [options] - compact: solo el título.
   * @returns {string} HTML del indicador.
   */
  Fogon.statusHTML = function (options) {
    var opts = options || {};
    var status = Fogon.openStatus();
    var detail = opts.compact || !status.detail ? '' : ' · ' + Fogon.escape(status.detail);
    return '<span class="status status--' + status.state + '">' +
      '<span class="status__dot" aria-hidden="true"></span>' +
      Fogon.icon('clock', { size: 16 }) +
      '<span class="status__text"><b>' + Fogon.escape(status.title) + '</b>' + detail + '</span>' +
      '</span>';
  };

  // ---------------------------------------------------------------
  // 5. Logo
  // ---------------------------------------------------------------

  /**
   * Isotipo de Fogón: aro (plato / boca del fogón), llama con brasa y leña.
   * Usa currentColor, así cambia solo con el tema; la brasa usa el primario.
   * @param {{title?: string, extinguished?: boolean, mono?: boolean}} [options]
   *        extinguished: sin llama (página 404) · mono: brasa del mismo color.
   * @returns {string} SVG del isotipo.
   */
  Fogon.logoMark = function (options) {
    var opts = options || {};
    var a11y = opts.title
      ? 'role="img" aria-label="' + Fogon.escape(opts.title) + '"'
      : 'aria-hidden="true" focusable="false"';
    var emberFill = opts.mono ? 'currentColor' : 'var(--color-primary)';
    var flame = opts.extinguished ? '' :
      '<path class="logo-flame" fill="currentColor" d="M60 28 C60 28 80 48 80 66 A20 20 0 0 1 40 66 C40 54 48 46 52 40 C53 48 56 52 60 54 C58 44 56 36 60 28 Z"/>' +
      '<path class="logo-ember" fill="' + emberFill + '" d="M60 58 C64 64 68 68 68 73 A8 8 0 0 1 52 73 C52 68 56 64 60 58 Z"/>';
    return '<svg viewBox="0 0 120 120" ' + a11y + '>' +
      '<circle class="logo-ring" cx="60" cy="60" r="52" fill="none" stroke="currentColor" stroke-width="3"/>' +
      flame +
      '<line class="logo-grill" x1="46" y1="96" x2="74" y2="96" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' +
      '</svg>';
  };

  // ---------------------------------------------------------------
  // 6. Ilustraciones de los placeholders de fotografía
  //    Composiciones simples (plato cenital, vaso, fogón, salón…) que
  //    sugieren la foto final sin pretender serlo.
  // ---------------------------------------------------------------
  var artCounter = 0;

  /** Sombra suave reutilizable (gradiente radial con id único). */
  function softShadow(id) {
    return '<radialGradient id="' + id + '"><stop offset="55%" stop-color="#000" stop-opacity=".38"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>';
  }

  /** Brillo cálido reutilizable. */
  function warmGlow(id, color) {
    return '<radialGradient id="' + id + '"><stop offset="0%" stop-color="' + color + '" stop-opacity=".9"/><stop offset="100%" stop-color="' + color + '" stop-opacity="0"/></radialGradient>';
  }

  function wrapArt(viewBox, defs, body) {
    return '<svg class="ph__art" viewBox="' + viewBox + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' +
      '<defs>' + defs + '</defs>' + body + '</svg>';
  }

  var ART = {
    /** Plato cenital con guarnición. */
    plate: function (o, uid) {
      var food = o.food || '#7a3b22';
      var garnish = o.garnish || '#6f7d4a';
      var sauce = o.sauce || 'rgba(110,40,20,.55)';
      return wrapArt('0 0 400 300', softShadow('s' + uid),
        '<circle cx="214" cy="166" r="150" fill="url(#s' + uid + ')"/>' +
        '<circle cx="200" cy="150" r="122" fill="#efe7da"/>' +
        '<circle cx="200" cy="150" r="98" fill="#f8f3ea"/>' +
        '<circle cx="200" cy="150" r="98" fill="none" stroke="rgba(176,141,87,.35)" stroke-width="1.5"/>' +
        '<g transform="rotate(' + (o.rotate || 0) + ' 200 150)">' +
        '<path d="M140 170 C130 196 166 214 198 206" stroke="' + sauce + '" stroke-width="9" stroke-linecap="round" fill="none"/>' +
        '<path d="M152 142 C156 112 204 100 238 112 C270 124 268 168 240 184 C214 200 168 194 156 176 C150 166 150 154 152 142 Z" fill="' + food + '"/>' +
        '<path d="M172 128 C194 116 224 118 240 132" stroke="rgba(255,255,255,.28)" stroke-width="5" stroke-linecap="round" fill="none"/>' +
        '<circle cx="252" cy="194" r="8" fill="' + garnish + '"/><circle cx="266" cy="180" r="5" fill="' + garnish + '"/>' +
        '<circle cx="146" cy="120" r="4.5" fill="' + garnish + '"/><circle cx="236" cy="104" r="3.5" fill="' + garnish + '"/>' +
        '</g>');
    },

    /** Bol hondo (ceviche, risotto, helado). */
    bowl: function (o, uid) {
      var food = o.food || '#c8b48a';
      var garnish = o.garnish || '#6f7d4a';
      return wrapArt('0 0 400 300', softShadow('s' + uid),
        '<circle cx="214" cy="166" r="140" fill="url(#s' + uid + ')"/>' +
        '<circle cx="200" cy="150" r="114" fill="#e4d9c6"/>' +
        '<circle cx="200" cy="150" r="114" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="3"/>' +
        '<circle cx="200" cy="150" r="88" fill="' + food + '"/>' +
        '<circle cx="200" cy="150" r="88" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="8"/>' +
        '<circle cx="178" cy="132" r="7" fill="' + garnish + '"/><circle cx="222" cy="168" r="6" fill="' + garnish + '"/>' +
        '<circle cx="200" cy="118" r="4" fill="' + garnish + '"/><circle cx="168" cy="174" r="5" fill="' + garnish + '"/>' +
        '<circle cx="232" cy="130" r="9" fill="rgba(255,255,255,.35)"/><circle cx="190" cy="186" r="6" fill="rgba(255,255,255,.25)"/>');
    },

    /** Postre: porción en plato pequeño con caramelo. */
    dessert: function (o, uid) {
      var food = o.food || '#c68433';
      return wrapArt('0 0 400 300', softShadow('s' + uid),
        '<circle cx="212" cy="164" r="130" fill="url(#s' + uid + ')"/>' +
        '<circle cx="200" cy="150" r="108" fill="#efe7da"/>' +
        '<circle cx="200" cy="150" r="86" fill="#f8f3ea"/>' +
        '<ellipse cx="206" cy="166" rx="66" ry="34" fill="rgba(120,60,20,.35)"/>' +
        '<path d="M164 172 L246 118 A96 96 0 0 1 258 190 Z" fill="' + food + '"/>' +
        '<path d="M164 172 L246 118" stroke="rgba(60,25,10,.55)" stroke-width="9" stroke-linecap="round"/>' +
        '<path d="M178 170 L250 132" stroke="rgba(255,255,255,.18)" stroke-width="4" stroke-linecap="round"/>' +
        '<circle cx="146" cy="128" r="5" fill="#6f7d4a"/><circle cx="154" cy="120" r="3.5" fill="#8d9a5b"/>');
    },

    /** Vaso visto de lado (bebidas y cócteles). */
    glass: function (o, uid) {
      var liquid = o.liquid || '#d9a441';
      return wrapArt('0 0 400 300', warmGlow('g' + uid, '#ffd9a0'),
        '<circle cx="200" cy="150" r="150" fill="url(#g' + uid + ')" opacity=".25"/>' +
        '<ellipse cx="200" cy="260" rx="74" ry="10" fill="rgba(0,0,0,.28)"/>' +
        '<path d="M150 56 H250 L237 246 Q236 256 226 256 H174 Q164 256 163 246 Z" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.6)" stroke-width="2"/>' +
        '<path d="M155 108 H245 L236 244 Q235 251 227 251 H173 Q165 251 164 244 Z" fill="' + liquid + '" opacity=".9"/>' +
        '<rect x="174" y="118" width="26" height="24" rx="4" fill="rgba(255,255,255,.35)" transform="rotate(-12 187 130)"/>' +
        '<rect x="206" y="132" width="24" height="22" rx="4" fill="rgba(255,255,255,.28)" transform="rotate(14 218 143)"/>' +
        '<path d="M214 34 L198 210" stroke="#f1e6d2" stroke-width="5" stroke-linecap="round"/>' +
        '<circle cx="248" cy="60" r="20" fill="#a9c25a" stroke="#eef3cf" stroke-width="3"/>' +
        '<path d="M248 42 V78 M230 60 H266" stroke="#eef3cf" stroke-width="1.5"/>' +
        '<path d="M164 70 L174 236" stroke="rgba(255,255,255,.35)" stroke-width="4" stroke-linecap="round"/>');
    },

    /** Taza de café cenital. */
    cup: function (o, uid) {
      var liquid = o.liquid || '#3a2316';
      return wrapArt('0 0 400 300', softShadow('s' + uid),
        '<circle cx="212" cy="164" r="128" fill="url(#s' + uid + ')"/>' +
        '<circle cx="200" cy="150" r="104" fill="#f1ebe1"/>' +
        '<path d="M262 150 h30 a15 15 0 0 1 0 30 h-12" fill="none" stroke="#fbf8f2" stroke-width="12" stroke-linecap="round"/>' +
        '<circle cx="200" cy="150" r="66" fill="#fbf8f2"/>' +
        '<circle cx="200" cy="150" r="54" fill="' + liquid + '"/>' +
        '<circle cx="200" cy="150" r="50" fill="none" stroke="#b07a46" stroke-width="6" opacity=".55"/>' +
        '<rect x="110" y="200" width="70" height="8" rx="4" fill="#cfc6b8" transform="rotate(-28 145 204)"/>');
    },

    /** Composición del hero: plato insignia sobre brasas con humo. */
    hero: function (o, uid) {
      var sparks = '';
      var sparkSpots = [[260, 860, 3], [420, 780, 2], [610, 900, 3], [820, 840, 2], [980, 930, 3], [1340, 880, 2], [1500, 820, 3], [180, 700, 2], [700, 720, 2], [1460, 640, 2]];
      sparkSpots.forEach(function (s) { sparks += '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="' + s[2] + '" fill="#f6b26b" opacity=".85"/>'; });
      return wrapArt('0 0 1600 1000',
        softShadow('s' + uid) + warmGlow('g' + uid, '#e9733f') +
        '<filter id="b' + uid + '"><feGaussianBlur stdDeviation="14"/></filter>',
        '<ellipse cx="800" cy="1010" rx="900" ry="260" fill="url(#g' + uid + ')" opacity=".75"/>' +
        '<ellipse cx="1120" cy="560" rx="440" ry="440" fill="url(#s' + uid + ')"/>' +
        '<circle cx="1080" cy="520" r="360" fill="#b9aa94"/>' +
        '<circle cx="1080" cy="520" r="290" fill="#cbbda7"/>' +
        '<circle cx="1080" cy="520" r="290" fill="none" stroke="rgba(176,141,87,.4)" stroke-width="3"/>' +
        '<path d="M900 600 C880 690 1000 740 1110 720" stroke="#2c120b" stroke-width="26" stroke-linecap="round" fill="none" opacity=".8"/>' +
        '<g transform="rotate(-18 1080 520)">' +
        '<rect x="930" y="430" width="300" height="70" rx="30" fill="#4b2014"/>' +
        '<rect x="950" y="490" width="290" height="70" rx="30" fill="#5a2818"/>' +
        '<rect x="940" y="550" width="270" height="66" rx="30" fill="#4b2014"/>' +
        '<path d="M960 450 C1040 436 1120 440 1200 452" stroke="rgba(255,255,255,.25)" stroke-width="8" stroke-linecap="round" fill="none"/>' +
        '</g>' +
        '<ellipse cx="1240" cy="420" rx="80" ry="54" fill="#e2b25a"/>' +
        '<ellipse cx="1250" cy="410" rx="52" ry="30" fill="#efc977"/>' +
        '<circle cx="900" cy="400" r="14" fill="#6f7d4a"/><circle cx="930" cy="380" r="9" fill="#8d9a5b"/><circle cx="1260" cy="640" r="12" fill="#6f7d4a"/>' +
        '<g filter="url(#b' + uid + ')" fill="none" stroke="rgba(255,240,225,.10)" stroke-width="34" stroke-linecap="round">' +
        '<path d="M560 980 C520 820 640 760 600 620 C570 520 650 440 620 320"/>' +
        '<path d="M760 990 C800 860 700 780 760 660"/>' +
        '</g>' + sparks);
    },

    /** Fogón con leña y llamas. */
    fire: function (o, uid) {
      return wrapArt('0 0 400 300', warmGlow('g' + uid, '#f08a3c') +
        '<linearGradient id="f' + uid + '" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#e2582a"/><stop offset=".6" stop-color="#f29b3c"/><stop offset="1" stop-color="#ffd27a"/></linearGradient>',
        '<ellipse cx="200" cy="230" rx="190" ry="120" fill="url(#g' + uid + ')" opacity=".7"/>' +
        '<path d="M150 236 C120 180 160 150 168 108 C188 140 186 160 200 170 C202 130 220 100 214 60 C252 100 262 150 248 200 C262 186 266 170 264 156 C292 190 286 226 262 240 Z" fill="url(#f' + uid + ')"/>' +
        '<path d="M178 236 C170 206 190 190 196 170 C206 192 214 198 220 204 C226 190 230 182 230 172 C246 196 242 222 226 238 Z" fill="#ffe2a3" opacity=".85"/>' +
        '<rect x="90" y="232" width="220" height="26" rx="13" fill="#3b2418" transform="rotate(-8 200 245)"/>' +
        '<rect x="100" y="238" width="210" height="24" rx="12" fill="#4a2e1f" transform="rotate(9 205 250)"/>' +
        '<circle cx="120" cy="120" r="2.5" fill="#ffc27a"/><circle cx="290" cy="96" r="2" fill="#ffc27a"/><circle cx="250" cy="60" r="2" fill="#ffd9a0"/>');
    },

    /** Salón con lámparas colgantes. */
    room: function (o, uid) {
      var lamps = '';
      [100, 200, 300].forEach(function (x, index) {
        var drop = 70 + (index % 2) * 18;
        lamps += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="' + drop + '" stroke="rgba(255,230,200,.35)" stroke-width="1.5"/>' +
          '<circle cx="' + x + '" cy="' + (drop + 18) + '" r="60" fill="url(#g' + uid + ')" opacity=".55"/>' +
          '<path d="M' + (x - 22) + ' ' + (drop + 16) + ' Q' + x + ' ' + (drop - 8) + ' ' + (x + 22) + ' ' + (drop + 16) + ' Z" fill="#c9a46a"/>' +
          '<circle cx="' + x + '" cy="' + (drop + 18) + '" r="5" fill="#fff1cf"/>';
      });
      return wrapArt('0 0 400 300', warmGlow('g' + uid, '#ffcf8a'),
        lamps +
        '<rect x="40" y="214" width="320" height="10" rx="5" fill="#5b3a26"/>' +
        '<rect x="70" y="224" width="8" height="60" fill="#4a2e1f"/><rect x="322" y="224" width="8" height="60" fill="#4a2e1f"/>' +
        '<path d="M60 284 V236 Q60 226 70 226" stroke="#2c1d15" stroke-width="10" fill="none"/>' +
        '<path d="M340 284 V236 Q340 226 330 226" stroke="#2c1d15" stroke-width="10" fill="none"/>' +
        '<circle cx="150" cy="208" r="10" fill="#f1e6d2"/><circle cx="250" cy="208" r="10" fill="#f1e6d2"/>' +
        '<rect x="196" y="190" width="8" height="18" rx="2" fill="#f8e7c3"/><circle cx="200" cy="186" r="10" fill="url(#g' + uid + ')"/>');
    },

    /** Barra de cócteles con botellas. */
    bar: function (o, uid) {
      var bottles = '';
      var colors = ['#c98a2e', '#6e1b25', '#9db07a', '#e2a64a', '#3d2a1f', '#d4b483', '#8e3b44'];
      for (var i = 0; i < 7; i += 1) {
        var x = 52 + i * 46;
        var h = 54 + (i % 3) * 12;
        bottles += '<rect x="' + x + '" y="' + (120 - h) + '" width="22" height="' + h + '" rx="4" fill="' + colors[i] + '" opacity=".85"/>' +
          '<rect x="' + (x + 7) + '" y="' + (108 - h) + '" width="8" height="14" rx="2" fill="' + colors[i] + '" opacity=".85"/>';
      }
      return wrapArt('0 0 400 300', warmGlow('g' + uid, '#ffcf8a'),
        '<circle cx="200" cy="60" r="160" fill="url(#g' + uid + ')" opacity=".35"/>' +
        bottles +
        '<rect x="30" y="120" width="340" height="6" fill="#6b4a33"/>' +
        '<rect x="0" y="210" width="400" height="90" fill="#2a1b13"/>' +
        '<rect x="0" y="204" width="400" height="10" fill="#7a5236"/>' +
        '<path d="M150 204 L156 170 H178 L184 204 Z" fill="rgba(255,255,255,.25)" stroke="rgba(255,255,255,.5)"/>' +
        '<path d="M154 190 H180" stroke="#e2a64a" stroke-width="10"/>' +
        '<path d="M232 204 L228 176 H252 L248 204 Z" fill="rgba(255,255,255,.25)" stroke="rgba(255,255,255,.5)"/>');
    },

    /** Terraza al atardecer. */
    terrace: function (o, uid) {
      return wrapArt('0 0 400 300', warmGlow('g' + uid, '#ffd08a'),
        '<circle cx="290" cy="170" r="46" fill="#ffd08a" opacity=".9"/>' +
        '<circle cx="290" cy="170" r="120" fill="url(#g' + uid + ')" opacity=".5"/>' +
        '<path d="M0 200 Q100 180 200 196 T400 190 V300 H0 Z" fill="#3c2a2c" opacity=".75"/>' +
        '<path d="M0 222 H400" stroke="#2a1d1f" stroke-width="4"/><path d="M0 250 H400" stroke="#2a1d1f" stroke-width="3"/>' +
        '<path d="M40 222 V300 M120 222 V300 M200 222 V300 M280 222 V300 M360 222 V300" stroke="#2a1d1f" stroke-width="3"/>' +
        '<path d="M30 300 C20 240 50 200 70 170 C80 210 70 250 60 300 Z" fill="#2f3a24"/>' +
        '<path d="M60 300 C70 230 110 210 130 190 C120 240 100 270 90 300 Z" fill="#3d4a2c"/>' +
        '<rect x="232" y="236" width="80" height="6" rx="3" fill="#1d1416"/>' +
        '<path d="M252 236 L250 216 H262 L260 236 Z" fill="rgba(255,255,255,.3)"/><path d="M284 236 L282 214 H294 L292 236 Z" fill="rgba(255,255,255,.3)"/>');
    },

    /** Mesa para grupos vista desde arriba. */
    table: function (o, uid) {
      var settings = '';
      [[110, 100], [200, 90], [290, 100], [110, 210], [200, 220], [290, 210]].forEach(function (p) {
        settings += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="30" fill="#f4ede2"/><circle cx="' + p[0] + '" cy="' + p[1] + '" r="22" fill="#fbf7f0"/>' +
          '<circle cx="' + (p[0] + 34) + '" cy="' + (p[1] - 22) + '" r="9" fill="rgba(255,255,255,.4)" stroke="rgba(255,255,255,.7)"/>';
      });
      return wrapArt('0 0 400 300', warmGlow('g' + uid, '#ffd08a'),
        '<rect x="50" y="50" width="300" height="200" rx="16" fill="rgba(0,0,0,.18)"/>' +
        settings +
        '<circle cx="200" cy="155" r="40" fill="url(#g' + uid + ')"/>' +
        '<circle cx="200" cy="155" r="8" fill="#f8e7c3"/>');
    },

    /** Retrato de la chef (silueta con luz de borde). */
    chef: function (o, uid) {
      return wrapArt('0 0 400 300', warmGlow('g' + uid, '#f08a3c'),
        '<circle cx="320" cy="250" r="160" fill="url(#g' + uid + ')" opacity=".55"/>' +
        '<path d="M110 300 C110 230 150 200 200 196 C250 200 290 230 290 300 Z" fill="#e9e0d2"/>' +
        '<path d="M200 196 L186 300 M200 196 L214 300" stroke="rgba(0,0,0,.12)" stroke-width="2"/>' +
        '<circle cx="192" cy="232" r="3" fill="#b9ab96"/><circle cx="192" cy="256" r="3" fill="#b9ab96"/>' +
        '<rect x="186" y="170" width="28" height="34" rx="10" fill="#3a2a22"/>' +
        '<ellipse cx="200" cy="132" rx="42" ry="50" fill="#3a2a22"/>' +
        '<path d="M236 104 C250 124 250 150 236 170" stroke="rgba(255,190,130,.6)" stroke-width="4" fill="none" stroke-linecap="round"/>' +
        '<path d="M158 112 C150 90 176 70 204 74 C232 76 246 96 240 116 C226 98 186 92 158 112 Z" fill="#20160f"/>' +
        '<path d="M300 150 C290 130 312 116 302 96" stroke="rgba(255,240,225,.18)" stroke-width="6" fill="none" stroke-linecap="round"/>');
    },

    /** Equipo de cocina (tres siluetas). */
    team: function (o, uid) {
      var people = '';
      [[110, 0.85], [200, 1], [290, 0.85]].forEach(function (p) {
        var x = p[0];
        var s = p[1];
        people += '<g transform="translate(' + x + ' 300) scale(' + s + ') translate(-' + x + ' -300)">' +
          '<path d="M' + (x - 62) + ' 300 C' + (x - 62) + ' 240 ' + (x - 34) + ' 214 ' + x + ' 210 C' + (x + 34) + ' 214 ' + (x + 62) + ' 240 ' + (x + 62) + ' 300 Z" fill="#e9e0d2"/>' +
          '<ellipse cx="' + x + '" cy="160" rx="32" ry="38" fill="#3a2a22"/>' +
          '<rect x="' + (x - 10) + '" y="190" width="20" height="24" rx="8" fill="#3a2a22"/></g>';
      });
      return wrapArt('0 0 400 300', warmGlow('g' + uid, '#ffcf8a'),
        '<circle cx="200" cy="40" r="170" fill="url(#g' + uid + ')" opacity=".35"/>' + people);
    },

    /** Huerto propio. */
    garden: function (o, uid) {
      var rows = '';
      for (var r = 0; r < 4; r += 1) {
        var y = 150 + r * 38;
        for (var c = 0; c < 9; c += 1) {
          var x = 20 + c * 46 + (r % 2) * 20;
          rows += '<path d="M' + x + ' ' + y + ' C' + (x - 14) + ' ' + (y - 18) + ' ' + (x - 6) + ' ' + (y - 30) + ' ' + x + ' ' + (y - 34) + ' C' + (x + 6) + ' ' + (y - 30) + ' ' + (x + 14) + ' ' + (y - 18) + ' ' + x + ' ' + y + ' Z" fill="' + (c % 2 ? '#a8bb76' : '#7f9450') + '"/>';
        }
      }
      return wrapArt('0 0 400 300', warmGlow('g' + uid, '#fff3c4'),
        '<circle cx="320" cy="40" r="120" fill="url(#g' + uid + ')" opacity=".6"/>' +
        '<path d="M0 120 Q200 90 400 120 V300 H0 Z" fill="#5b4a33" opacity=".55"/>' + rows);
    },

    /** Mapa estático de Las Mercedes con el pin del restaurante. */
    map: function (o, uid) {
      return wrapArt('0 0 400 300', '',
        '<rect width="400" height="300" fill="#e9e1d3"/>' +
        '<rect x="20" y="20" width="110" height="80" rx="6" fill="#ddd2c0"/><rect x="160" y="20" width="90" height="80" rx="6" fill="#ddd2c0"/>' +
        '<rect x="280" y="20" width="100" height="80" rx="6" fill="#ddd2c0"/><rect x="20" y="132" width="110" height="60" rx="6" fill="#ddd2c0"/>' +
        '<rect x="160" y="132" width="90" height="60" rx="6" fill="#c9d3b0"/><rect x="280" y="132" width="100" height="60" rx="6" fill="#ddd2c0"/>' +
        '<rect x="20" y="224" width="110" height="60" rx="6" fill="#ddd2c0"/><rect x="160" y="224" width="220" height="60" rx="6" fill="#ddd2c0"/>' +
        '<path d="M0 116 H400 M0 208 H400 M145 0 V300 M265 0 V300" stroke="#fffaf2" stroke-width="14"/>' +
        '<path d="M0 116 H400" stroke="#f3d9a6" stroke-width="14"/>' +
        '<text x="30" y="112" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#6b5d4f">CALLE PARÍS</text>' +
        '<text x="176" y="166" font-family="Inter, sans-serif" font-size="10" fill="#5f6b48">PLAZA</text>' +
        '<ellipse cx="300" cy="120" rx="14" ry="5" fill="rgba(0,0,0,.25)"/>' +
        '<path d="M300 118 C300 118 278 94 278 78 A22 22 0 0 1 322 78 C322 94 300 118 300 118 Z" fill="#B4472C"/>' +
        '<circle cx="300" cy="78" r="8" fill="#FAF6F0"/>');
    }
  };

  /**
   * Contenido interno de un placeholder: ilustración + etiqueta de la foto.
   * @param {{art: string, label?: string}} spec - Dirección de arte.
   * @returns {string} HTML interno.
   */
  Fogon.photoInner = function (spec) {
    artCounter += 1;
    var draw = ART[spec.art] || ART.plate;
    var label = spec.label
      ? '<span class="ph__label" aria-hidden="true">' + Fogon.icon('camera', { size: 16 }) + Fogon.escape(spec.label) + '</span>'
      : '';
    return draw(spec, 'a' + artCounter) + label;
  };

  /**
   * Placeholder completo con su texto alternativo.
   * @param {{art: string, bg?: string, label?: string}} spec - Dirección de arte.
   * @param {{cls?: string, alt?: string, thumb?: boolean, decorative?: boolean, tag?: string}} [options]
   *        decorative: se oculta a lectores de pantalla (p. ej. dentro de un
   *        botón que ya tiene nombre) · tag: 'span' para usarlo dentro de <button>.
   * @returns {string} HTML del placeholder.
   */
  Fogon.photoHTML = function (spec, options) {
    var opts = options || {};
    var tag = opts.tag || 'div';
    var classes = ['ph', 'ph--' + (spec.bg || 'ember')];
    if (opts.thumb) classes.push('ph--thumb');
    if (opts.cls) classes.push(opts.cls);
    var a11y = opts.decorative
      ? 'aria-hidden="true"'
      : 'role="img" aria-label="' + Fogon.escape(opts.alt || 'Foto: ' + (spec.label || 'Fogón')) + '"';
    return '<' + tag + ' class="' + classes.join(' ') + '" ' + a11y + '>' + Fogon.photoInner(spec) + '</' + tag + '>';
  };

  /**
   * Rellena los elementos con `data-photo="clave"` usando Fogon.photos.
   * El elemento conserva sus clases de tamaño y proporción.
   * @param {ParentNode} [root]
   */
  Fogon.hydratePhotos = function (root) {
    Fogon.$$('[data-photo]', root).forEach(function (element) {
      var spec = Fogon.photos[element.dataset.photo];
      if (!spec) return;
      element.classList.add('ph', 'ph--' + (spec.bg || 'ember'));
      if (!element.hasAttribute('role')) element.setAttribute('role', 'img');
      if (!element.hasAttribute('aria-label')) element.setAttribute('aria-label', 'Foto: ' + spec.label);
      element.insertAdjacentHTML('afterbegin', Fogon.photoInner(spec));
    });
  };
})(window.Fogon);
