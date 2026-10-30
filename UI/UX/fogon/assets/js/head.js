/**
 * head.js — Se carga de forma SÍNCRONA dentro del <head> de cada página.
 *
 * Por qué aquí y no al final del <body>: el tema y el loader se deben
 * decidir ANTES de que el navegador pinte. Si se hiciera después, la
 * persona vería un destello del tema equivocado o el contenido asomando
 * bajo el loader (fricción #16 y regla del loader en la sección 7.3).
 *
 * Responsabilidades:
 *   1. Marcar que hay JavaScript (clase `js`) para activar animaciones.
 *   2. Aplicar el tema claro/oscuro guardado, el del sistema o el nocturno del QR.
 *   3. Decidir si se muestra el loader (solo primera visita de la sesión).
 *   4. Registrar los tokens de diseño en Tailwind (CDN v4).
 */
(function bootstrapHead() {
  'use strict';

  var html = document.documentElement;
  var params = new URLSearchParams(window.location.search);

  /** Claves de almacenamiento compartidas con ui.js. */
  var THEME_KEY = 'fogon:theme';
  var LOADER_KEY = 'fogon:loader-shown';

  /** Colores de la barra del navegador móvil para cada tema. */
  var THEME_COLORS = { light: '#FAF6F0', dark: '#14110F' };

  // `?embed` (capturas y miniaturas de documentación): sin loader y sin
  // animaciones de entrada, para que todo el contenido se vea de inmediato.
  var isEmbedded = params.has('embed');
  if (!isEmbedded) html.classList.add('js');

  /**
   * Lee un valor de almacenamiento sin romper la página si el navegador
   * lo bloquea (modo privado, cookies desactivadas, etc.).
   * @param {Storage} storage - localStorage o sessionStorage.
   * @param {string} key - Clave a leer.
   * @returns {string|null} Valor guardado o null.
   */
  function safeRead(storage, key) {
    try {
      return storage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  /**
   * Hora actual en Caracas (0–23). Se usa para sugerir el modo oscuro
   * cuando la carta se abre desde el QR de la mesa de noche.
   * @returns {number} Hora local de America/Caracas.
   */
  function caracasHour() {
    var formatter = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Caracas', hour: 'numeric', hourCycle: 'h23' });
    return Number(formatter.format(new Date()));
  }

  // ---------------------------------------------------------------
  // 1. Tema: elección manual > QR de noche > preferencia del sistema.
  // ---------------------------------------------------------------
  var storedTheme = safeRead(window.localStorage, THEME_KEY);
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var entersFromTableQr = params.has('mesa');
  var hour = caracasHour();
  var isNight = hour >= 18 || hour < 6;

  // `?tema=oscuro|claro` permite revisar el mockup en un tema sin guardarlo.
  var themeParam = { oscuro: 'dark', claro: 'light' }[params.get('tema')];

  var theme = themeParam || storedTheme;
  if (!theme) {
    theme = (entersFromTableQr && isNight) || prefersDark ? 'dark' : 'light';
  }

  html.dataset.theme = theme;

  var themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) themeColorMeta.setAttribute('content', THEME_COLORS[theme]);

  // ---------------------------------------------------------------
  // 2. Loader: solo en la primera visita de la sesión, nunca al entrar
  //    por el QR de la mesa ni dentro de un iframe de documentación.
  //    `?loader=1` lo fuerza para poder revisarlo en el mockup.
  // ---------------------------------------------------------------
  var alreadyShown = safeRead(window.sessionStorage, LOADER_KEY) === '1';
  var isForced = params.get('loader') === '1';

  if (isForced || (!alreadyShown && !entersFromTableQr && !isEmbedded)) {
    html.classList.add('has-loader');
  }

  // ---------------------------------------------------------------
  // 3. Tokens para Tailwind v4 (CDN). Se inyectan aquí, antes de que
  //    se cargue el script de Tailwind, para no repetirlos en cada HTML.
  //    `inline` hace que cada utilidad lea la variable CSS en el
  //    elemento, así el cambio de tema funciona sin recompilar.
  // ---------------------------------------------------------------
  var tailwindTheme = [
    '@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));',
    '@theme inline {',
    '  --color-canvas: var(--color-bg);',
    '  --color-paper: var(--color-surface);',
    '  --color-sand: var(--color-surface-alt);',
    '  --color-line: var(--color-border);',
    '  --color-ink: var(--color-text);',
    '  --color-muted: var(--color-text-muted);',
    '  --color-brand: var(--color-primary);',
    '  --color-brand-hover: var(--color-primary-hover);',
    '  --color-on-brand: var(--color-on-primary);',
    '  --color-brass: var(--color-accent);',
    '  --color-brass-text: var(--color-accent-text);',
    '  --color-olive: var(--color-herb);',
    '  --color-ok: var(--color-success);',
    '  --color-alert: var(--color-danger);',
    '  --color-cream: #F3ECE2;',
    '  --color-coal: #14110F;',
    '  --font-display: "Fraunces", Georgia, "Times New Roman", serif;',
    '  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;',
    '  --ease-elegant: cubic-bezier(0.22, 1, 0.36, 1);',
    '}'
  ].join('\n');

  document.head.insertAdjacentHTML('beforeend', '<style type="text/tailwindcss">' + tailwindTheme + '</style>');
})();
