/**
 * contact.js — Página de Contacto y ubicación.
 *
 *   - Tabla de horario con el día de hoy resaltado.
 *   - Generador de mensaje de reserva para WhatsApp (persona María Fernanda:
 *     "Hola, quiero reservar para __ personas el __"). Es contacto, no compra.
 *   - Mapa interactivo que solo se carga al tocarlo (fricción #4 y rendimiento).
 */
(function defineContactPage(Fogon) {
  'use strict';

  var $ = Fogon.$;

  var MIN_PEOPLE = 1;
  var MAX_PEOPLE = 40;
  var SLOT_MINUTES = 30;
  var LAST_SEATING_BEFORE_CLOSE = 60;
  var DEFAULT_TIME = 1200; // 8:00 p. m.

  // ---------------------------------------------------------------
  // Horario
  // ---------------------------------------------------------------

  function renderHoursTable() {
    var body = $('#hours-body');
    if (!body) return;
    var today = Fogon.now().day;
    var weekOrder = [1, 2, 3, 4, 5, 6, 0];
    body.innerHTML = weekOrder.map(function (dayIndex) {
      var day = Fogon.schedule[dayIndex];
      var isToday = dayIndex === today;
      var badge = isToday ? ' <span class="ml-2 rounded-md bg-brand px-2 py-0.5 text-xs font-semibold text-on-brand">Hoy</span>' : '';
      return '<tr class="border-b border-line' + (isToday ? ' bg-sand font-semibold' : '') + '"' + (isToday ? ' aria-current="date"' : '') + '>' +
        '<th scope="row" class="py-3 pl-4 pr-4 text-left font-medium">' + day.name + badge + '</th>' +
        '<td class="py-3 pr-4 text-right tabular-nums ' + (day.closed ? 'text-alert' : '') + '">' + Fogon.dayRange(day) + '</td></tr>';
    }).join('');
  }

  // ---------------------------------------------------------------
  // Generador de mensaje de reserva
  // ---------------------------------------------------------------

  /** Fecha de hoy en Caracas como "AAAA-MM-DD" (para el mínimo del input). */
  function todayInCaracas() {
    return new Intl.DateTimeFormat('en-CA', { timeZone: Fogon.config.timeZone }).format(new Date());
  }

  /**
   * Convierte "2026-10-30" en { weekday, text: "viernes 30 de octubre" }.
   * Se usa UTC para que la zona horaria del dispositivo no mueva el día.
   */
  function describeDate(value) {
    var parts = value.split('-').map(Number);
    var date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
    var text = new Intl.DateTimeFormat('es-VE', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(date);
    return { weekday: date.getUTCDay(), text: text.replace(',', '') };
  }

  /** Plural del día en minúsculas: "Lunes" → "lunes", "Sábado" → "sábados". */
  function pluralDay(name) {
    var lower = name.toLowerCase();
    return /s$/.test(lower) ? lower : lower + 's';
  }

  /** Horas disponibles para un día (cada 30 min hasta 1 h antes del cierre). */
  function timeSlots(day) {
    var slots = [];
    if (!day || day.closed) return slots;
    for (var minutes = day.open; minutes <= day.close - LAST_SEATING_BEFORE_CLOSE; minutes += SLOT_MINUTES) {
      slots.push(minutes);
    }
    return slots;
  }

  function initReservationBuilder() {
    var form = $('#reserve-form');
    if (!form) return;

    var peopleInput = $('#reserve-people', form);
    var dateInput = $('#reserve-date', form);
    var timeSelect = $('#reserve-time', form);
    var occasionSelect = $('#reserve-occasion', form);
    var dateHint = $('#reserve-date-hint', form);
    var preview = $('#reserve-preview', form);
    var sendLink = $('#reserve-send', form);

    dateInput.min = todayInCaracas();

    function fillTimes(day) {
      var previous = Number(timeSelect.value) || DEFAULT_TIME;
      var slots = timeSlots(day || { open: 720, close: 1320 });
      timeSelect.innerHTML = slots.map(function (minutes) {
        return '<option value="' + minutes + '">' + Fogon.formatTime(minutes) + '</option>';
      }).join('');
      var best = slots.indexOf(previous) !== -1 ? previous : slots[slots.length - 1];
      if (best !== undefined) timeSelect.value = String(best);
      timeSelect.disabled = slots.length === 0;
    }

    function update() {
      var people = Math.min(MAX_PEOPLE, Math.max(MIN_PEOPLE, Number(peopleInput.value) || 2));
      peopleInput.value = people;
      var message = 'Hola, quiero reservar para ' + people + (people === 1 ? ' persona' : ' personas');
      var isClosedDay = false;

      if (dateInput.value) {
        var info = describeDate(dateInput.value);
        var day = Fogon.schedule[info.weekday];
        isClosedDay = Boolean(day.closed);
        dateHint.textContent = isClosedDay ? 'Los ' + pluralDay(day.name) + ' estamos cerrados. Elige otro día.' : 'Ese día abrimos de ' + Fogon.dayRange(day) + '.';
        dateHint.className = 'mt-1.5 text-sm ' + (isClosedDay ? 'text-alert font-semibold' : 'text-muted');
        fillTimes(day);
        message += ' el ' + info.text;
      } else {
        dateHint.textContent = 'Elige la fecha para ver las horas disponibles.';
        dateHint.className = 'mt-1.5 text-sm text-muted';
        fillTimes(null);
      }

      if (!timeSelect.disabled && timeSelect.value) message += ' a las ' + Fogon.formatTime(Number(timeSelect.value));
      if (occasionSelect.value) message += ' (' + occasionSelect.value.toLowerCase() + ')';
      // Si la frase ya termina en punto ("8:00 p. m."), no se duplica.
      message += (/\.$/.test(message) ? ' ' : '. ') + '¿Tienen disponibilidad?';

      preview.textContent = '«' + message + '»';
      sendLink.href = Fogon.links.whatsapp(message);
      sendLink.setAttribute('aria-disabled', String(isClosedDay));
      sendLink.tabIndex = isClosedDay ? -1 : 0;
    }

    form.addEventListener('click', function (event) {
      var stepper = event.target.closest('[data-step]');
      if (!stepper) return;
      peopleInput.value = (Number(peopleInput.value) || 2) + Number(stepper.dataset.step);
      update();
    });
    form.addEventListener('input', update);
    form.addEventListener('change', update);
    form.addEventListener('submit', function (event) { event.preventDefault(); });
    sendLink.addEventListener('click', function (event) {
      if (sendLink.getAttribute('aria-disabled') === 'true') event.preventDefault();
    });

    update();
  }

  // ---------------------------------------------------------------
  // Mapa: imagen estática; el interactivo solo al tocarlo
  // ---------------------------------------------------------------

  function initLazyMap() {
    var button = $('[data-load-map]');
    if (!button) return;
    button.addEventListener('click', function () {
      var frame = $('[data-map-frame]');
      frame.innerHTML = '<iframe class="absolute inset-0 h-full w-full border-0" src="' + Fogon.links.mapEmbed + '" title="Mapa interactivo de Fogón en Google Maps" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
      button.hidden = true;
    });
  }

  renderHoursTable();
  initReservationBuilder();
  initLazyMap();
})(window.Fogon);
