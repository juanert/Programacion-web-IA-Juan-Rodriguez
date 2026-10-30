/**
 * home.js — Contenido dinámico de Inicio.
 * Pinta desde data.js lo que debe coincidir con la Carta (platos firma,
 * categorías) y los datos que cambian con la hora (horario de hoy).
 */
(function defineHomePage(Fogon) {
  'use strict';

  var $ = Fogon.$;

  /** Estrellas de valoración (decorativas: el número ya se lee como texto). */
  function starsHTML(count) {
    var stars = '';
    for (var index = 0; index < count; index += 1) {
      stars += Fogon.icon('star', { size: 16, filled: true });
    }
    return '<span class="inline-flex gap-0.5 text-brass" aria-hidden="true">' + stars + '</span>';
  }

  function renderReviews(container) {
    container.innerHTML = Fogon.reviews.map(function (review, index) {
      return '<li class="reveal flex flex-col rounded-xl bg-paper p-6 md:p-8 shadow-[var(--shadow-card)]" style="--i:' + index + '">' +
        '<figure class="flex h-full flex-col">' +
        starsHTML(5) +
        '<blockquote class="mt-4 flex-1 font-display text-lg leading-relaxed italic">“' + Fogon.escape(review.text) + '”</blockquote>' +
        '<figcaption class="mt-5 text-sm font-semibold">' + Fogon.escape(review.name) + ' <span class="font-normal text-muted">· Reseña en Google</span></figcaption>' +
        '</figure></li>';
    }).join('');
  }

  var signature = $('#signature-list');
  if (signature) Fogon.renderSignatureDishes(signature);

  var tiles = $('#category-tiles');
  if (tiles) Fogon.renderCategoryTiles(tiles, ['entradas', 'de-la-brasa', 'postres', 'bebidas']);

  var reviews = $('#reviews-list');
  if (reviews) renderReviews(reviews);

  var todayRange = $('[data-today-range]');
  if (todayRange) todayRange.textContent = Fogon.dayRange(Fogon.schedule[Fogon.now().day]);

  var stars = $('[data-rating-stars]');
  if (stars) stars.innerHTML = starsHTML(5);
})(window.Fogon);
