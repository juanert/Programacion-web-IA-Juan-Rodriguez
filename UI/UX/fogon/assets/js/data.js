/**
 * data.js — Contenido del restaurante (DATOS DE EJEMPLO).
 *
 * Por qué separar los datos: la carta, los precios y el horario cambian a
 * menudo. Tenerlos en un solo archivo evita precios distintos en Inicio y
 * en la Carta (fricción #2) y permite reemplazarlos sin tocar la interfaz.
 *
 * Todo lo que hay aquí es de relleno: cámbialo por la información real.
 */
window.Fogon = window.Fogon || {};

(function defineData(Fogon) {
  'use strict';

  /**
   * Configuración del mockup.
   * loaderMode:
   *   - 'mockup': el loader se muestra completo en la primera visita para
   *     poder evaluarlo (en local la página carga en milisegundos).
   *   - 'production': respeta la regla real: si la página carga en menos
   *     de 300 ms, el loader no llega a mostrarse.
   */
  Fogon.config = {
    loaderMode: 'mockup',
    loaderMinMs: 1300,
    loaderMaxMs: 1800,
    loaderSkipIfFasterThanMs: 300,
    closingSoonMinutes: 45,
    timeZone: 'America/Caracas'
  };

  /** Datos de contacto y servicio. */
  Fogon.restaurant = {
    name: 'Fogón',
    tagline: 'Cocina de leña',
    city: 'Caracas',
    address: 'Calle París, Las Mercedes, Caracas',
    addressShort: 'Las Mercedes, Caracas',
    reference: 'A dos cuadras de la plaza',
    phoneDisplay: '+58 412 000 0000',
    phoneE164: '+584120000000',
    whatsappNumber: '584120000000',
    email: 'hola@fogon.example',
    instagram: 'fogon.cocinadelena',
    mapsQuery: 'Calle París, Las Mercedes, Caracas, Venezuela',
    priceNote: 'Precios en USD · IVA incluido · Servicio no incluido',
    pricesUpdatedAt: '01/10/2026',
    rating: { score: '4,8', count: '1.200' },
    capacity: { tables: 18, maxGroup: 40, privateRoom: 24 },
    payments: ['Efectivo en USD', 'Efectivo en Bs.', 'Tarjeta de débito', 'Tarjeta de crédito', 'Pago Móvil', 'Zelle'],
    services: [
      { icon: 'calendar', title: 'Reservas', text: 'Por WhatsApp o por teléfono.' },
      { icon: 'users', title: 'Grupos y eventos', text: 'Hasta 40 personas; salón privado para 24.' },
      { icon: 'car', title: 'Estacionamiento', text: 'Estacionamiento vigilado a 50 m.' },
      { icon: 'accessibility', title: 'Accesible', text: 'Entrada con rampa y baño adaptado.' }
    ]
  };

  /**
   * Horario semanal. day: 0 = domingo … 6 = sábado (igual que Date#getDay).
   * Los minutos se cuentan desde la medianoche: 720 = 12:00 m.
   */
  Fogon.schedule = [
    { day: 0, name: 'Domingo', open: 720, close: 1080 },
    { day: 1, name: 'Lunes', closed: true },
    { day: 2, name: 'Martes', open: 720, close: 1320 },
    { day: 3, name: 'Miércoles', open: 720, close: 1320 },
    { day: 4, name: 'Jueves', open: 720, close: 1320 },
    { day: 5, name: 'Viernes', open: 720, close: 1410 },
    { day: 6, name: 'Sábado', open: 720, close: 1410 }
  ];

  Fogon.specialHours = [
    { date: '24 y 31 de diciembre', hours: '12:00 m. – 6:00 p. m.' },
    { date: '1 de enero', hours: 'Cerrado' }
  ];

  /** Aviso descartable (fricción #20). Cambia el id para volver a mostrarlo. */
  Fogon.announcement = {
    id: 'diciembre-2026',
    text: 'El 24 y 31 de diciembre cerramos a las 6:00 p. m.'
  };

  /**
   * Etiquetas de dieta. Siempre se muestran con ícono Y texto (persona Carmen).
   * tone: color semántico de la etiqueta.
   */
  Fogon.tags = {
    vegetariano: { label: 'Vegetariano', icon: 'leaf', tone: 'herb' },
    vegano: { label: 'Vegano', icon: 'sprout', tone: 'herb' },
    'sin-gluten': { label: 'Sin gluten', icon: 'wheatOff', tone: 'ink' },
    picante: { label: 'Picante', icon: 'flame', tone: 'danger' },
    chef: { label: 'Recomendado del chef', icon: 'chefHat', tone: 'primary' },
    compartir: { label: 'Para compartir', icon: 'users', tone: 'muted' },
    'frutos-secos': { label: 'Contiene frutos secos', icon: 'nut', tone: 'muted' }
  };

  /** Filtros disponibles en la carta (en este orden). */
  Fogon.filters = ['vegetariano', 'vegano', 'sin-gluten', 'picante', 'chef', 'compartir'];

  /** Categorías de la carta con su dirección fotográfica. */
  Fogon.categories = [
    { id: 'entradas', name: 'Entradas', description: 'Para abrir la mesa y compartir mientras se enciende la conversación.', photo: { art: 'plate', bg: 'wood', food: '#c9893f', label: 'Tequeños y arepitas sobre tabla de madera' } },
    { id: 'de-la-brasa', name: 'De la brasa', description: 'Carnes y aves cocinadas despacio sobre leña de guayabo.', photo: { art: 'plate', bg: 'iron', food: '#4a2316', label: 'Corte a la brasa sobre plancha de hierro' } },
    { id: 'del-mar', name: 'Del mar', description: 'Pesca del día de nuestras costas, al carbón y con sabores del Caribe.', photo: { art: 'plate', bg: 'linen', food: '#e8d2b0', garnish: '#7a8a52', label: 'Pescado a las brasas sobre mantel de lino' } },
    { id: 'vegetales', name: 'Vegetales', description: 'Platos protagonistas de la huerta, ahumados y llenos de sabor.', photo: { art: 'bowl', bg: 'olive', food: '#b6a37a', label: 'Risotto de hongos, plano cenital' } },
    { id: 'acompanantes', name: 'Acompañantes', description: 'Los clásicos que completan cualquier plato.', photo: { art: 'plate', bg: 'wood', food: '#e0b25a', label: 'Plátano maduro y yuca frita' } },
    { id: 'postres', name: 'Postres', description: 'Recetas de casa con cacao y frutas venezolanas.', photo: { art: 'dessert', bg: 'linen', food: '#b8742c', label: 'Quesillo con caramelo oscuro' } },
    { id: 'bebidas', name: 'Bebidas', description: 'Jugos naturales, café de altura y bebidas para acompañar.', photo: { art: 'glass', bg: 'wood', liquid: '#d9a441', label: 'Papelón con limón en vaso de vidrio' } },
    { id: 'cocteles', name: 'Cócteles', description: 'Coctelería con ron venezolano y frutas de temporada.', photo: { art: 'glass', bg: 'ember', liquid: '#e9b04a', label: 'Ron sour de papelón en la barra' } }
  ];

  /**
   * Platos. Campos:
   *   price: precio base en USD · variants: precios por porción (opcional)
   *   tags: claves de Fogon.tags · allergens: alérgenos declarados
   *   signature: aparece en "Platos firma" de Inicio
   *   photo: dirección de arte del placeholder
   */
  Fogon.dishes = [
    // Entradas
    { id: 'tequenos', category: 'entradas', name: 'Tequeños de queso de año', description: 'Masa artesanal, salsa de ajo y cilantro.', details: 'Masa estirada a mano cada mañana, rellena de queso de año y frita al momento. Se sirven con nuestra salsa de ajo y cilantro.', ingredients: ['Harina de trigo', 'Queso de año', 'Mantequilla', 'Ajo', 'Cilantro'], allergens: ['Gluten', 'Lácteos', 'Huevo'], portion: '6 unidades', price: 6, variants: [{ label: '6 unidades', price: 6 }, { label: '12 unidades', price: 11 }], pairing: 'Papelón con limón', tags: ['vegetariano'], photo: { art: 'plate', bg: 'wood', food: '#d39a4c', rotate: 10, label: 'Tequeños dorados, cenital' } },
    { id: 'arepitas', category: 'entradas', name: 'Arepitas de chicharrón', description: 'Con nata y ají dulce.', details: 'Arepitas de maíz pilado con chicharrón crujiente por dentro, servidas con nata fresca y encurtido de ají dulce.', ingredients: ['Maíz', 'Chicharrón de cerdo', 'Nata', 'Ají dulce'], allergens: ['Lácteos'], portion: '8 arepitas pequeñas', price: 7, pairing: 'Cerveza artesanal', tags: [], photo: { art: 'plate', bg: 'wood', food: '#e1b968', rotate: -20, label: 'Arepitas con nata, cenital' } },
    { id: 'provoleta', category: 'entradas', name: 'Provoleta a la leña', description: 'Orégano, aceite de oliva y pan de la casa.', details: 'Queso provolone fundido en sartén de hierro directamente sobre las brasas. Llega burbujeando a la mesa.', ingredients: ['Queso provolone', 'Orégano', 'Aceite de oliva', 'Pan de masa madre'], allergens: ['Lácteos', 'Gluten'], portion: 'Para 2–3 personas', price: 9, pairing: 'Copa de vino tinto', tags: ['vegetariano', 'compartir'], photo: { art: 'plate', bg: 'iron', food: '#e7c272', rotate: 40, label: 'Provoleta en sartén de hierro' } },
    { id: 'ceviche', category: 'entradas', name: 'Ceviche de pesca del día', description: 'Leche de tigre de parchita y batata glaseada.', details: 'Pesca del día curada en leche de tigre de parchita, con cebolla morada, ají picante y batata glaseada en papelón.', ingredients: ['Pescado del día', 'Parchita', 'Limón', 'Cebolla morada', 'Ají', 'Batata'], allergens: ['Pescado'], portion: 'Ración completa: 220 g', price: 12, variants: [{ label: 'Media ración', price: 8 }, { label: 'Ración completa', price: 12 }], pairing: 'Guarapita de parchita', tags: ['sin-gluten', 'picante'], photo: { art: 'bowl', bg: 'linen', food: '#f0d9b5', garnish: '#b34a6a', label: 'Ceviche en bol de cerámica' } },

    // De la brasa
    { id: 'asado-negro', category: 'de-la-brasa', name: 'Asado negro a la leña', description: 'Puré de plátano maduro y arroz blanco.', details: 'Nuestro plato insignia: muchacho redondo caramelizado en papelón y cocinado durante seis horas junto al fogón. Se sirve en lonjas con su salsa oscura.', ingredients: ['Muchacho redondo', 'Papelón', 'Vino tinto', 'Cebolla', 'Ají dulce', 'Plátano maduro', 'Arroz'], allergens: ['Lácteos'], portion: '280 g de carne', price: 18, pairing: 'Copa de vino tinto', tags: ['chef'], signature: true, photo: { art: 'plate', bg: 'wood', food: '#4b2014', sauce: '#2c120b', rotate: 0, label: 'Asado negro en lonjas, plano cenital' } },
    { id: 'punta-trasera', category: 'de-la-brasa', name: 'Punta trasera (300 g)', description: 'Guasacaca y yuca frita.', details: 'Corte madurado y sellado a la leña, terminado a fuego indirecto. Se sirve al punto que prefieras.', ingredients: ['Punta trasera de res', 'Sal de Araya', 'Guasacaca', 'Yuca'], allergens: [], portion: '300 g', price: 22, pairing: 'Copa de vino tinto', tags: ['sin-gluten'], signature: true, photo: { art: 'plate', bg: 'iron', food: '#6a2a1a', sauce: '#3b7a3a', rotate: 25, label: 'Punta trasera fileteada sobre tabla' } },
    { id: 'pollo-papelon', category: 'de-la-brasa', name: 'Pollo marinado en papelón', description: 'Naranja, ajo y hierbas, con vegetales asados.', details: 'Medio pollo de granja marinado 24 horas en papelón, naranja agria y ajo, asado lentamente a la leña.', ingredients: ['Pollo de granja', 'Papelón', 'Naranja agria', 'Ajo', 'Hierbas', 'Vegetales de temporada'], allergens: [], portion: 'Medio pollo', price: 15, pairing: 'Cerveza artesanal', tags: ['sin-gluten'], photo: { art: 'plate', bg: 'wood', food: '#b8642c', rotate: -35, label: 'Pollo dorado con vegetales asados' } },
    { id: 'costillas', category: 'de-la-brasa', name: 'Costillas glaseadas', description: 'Melao de caña y ensalada de repollo.', details: 'Costillas de cerdo ahumadas tres horas y glaseadas con melao de caña y ajonjolí tostado.', ingredients: ['Costillas de cerdo', 'Melao de caña', 'Ajonjolí', 'Repollo', 'Zanahoria'], allergens: ['Sésamo'], portion: 'Ración completa: 600 g', price: 19, variants: [{ label: 'Media ración', price: 12 }, { label: 'Ración completa', price: 19 }], pairing: 'Ron sour de papelón', tags: ['compartir'], photo: { art: 'plate', bg: 'iron', food: '#7a3418', rotate: 60, label: 'Costillas glaseadas, luz lateral' } },

    // Del mar
    { id: 'pesca-brasa', category: 'del-mar', name: 'Pesca del día a las brasas', description: 'Mantequilla de ajoporro y arroz con coco.', details: 'Filete de la pesca del día cocinado sobre carbón, bañado en mantequilla de ajoporro y acompañado de arroz con coco.', ingredients: ['Pescado del día', 'Mantequilla', 'Ajoporro', 'Arroz', 'Coco'], allergens: ['Pescado', 'Lácteos'], portion: '250 g de pescado', price: 20, pairing: 'Copa de vino blanco (consultar)', tags: ['sin-gluten'], signature: true, photo: { art: 'plate', bg: 'linen', food: '#e9cfa6', garnish: '#6f8a4a', sauce: '#d8b24a', rotate: -10, label: 'Pescado a las brasas, cenital' } },
    { id: 'pulpo', category: 'del-mar', name: 'Pulpo a la brasa', description: 'Papas criollas y alioli de ají dulce.', details: 'Pulpo cocido lentamente y terminado sobre la parrilla, con papas criollas y alioli de ají dulce.', ingredients: ['Pulpo', 'Papa criolla', 'Ají dulce', 'Ajo', 'Aceite de oliva', 'Huevo'], allergens: ['Moluscos', 'Huevo'], portion: '220 g', price: 21, pairing: 'Copa de vino blanco (consultar)', tags: ['sin-gluten'], photo: { art: 'plate', bg: 'iron', food: '#8e3b44', rotate: 15, label: 'Pulpo a la brasa con papas' } },
    { id: 'camarones', category: 'del-mar', name: 'Camarones al ajillo de leña', description: 'Ajo confitado, guindilla y pan tostado.', details: 'Camarones salteados en cazuela de barro junto al fuego, con ajo confitado y guindilla. Pan tostado para mojar.', ingredients: ['Camarones', 'Ajo', 'Guindilla', 'Aceite de oliva', 'Pan'], allergens: ['Crustáceos', 'Gluten'], portion: '12 camarones', price: 17, pairing: 'Mojito de hierbabuena', tags: ['picante'], photo: { art: 'bowl', bg: 'iron', food: '#e07a4a', label: 'Camarones en cazuela de barro' } },

    // Vegetales
    { id: 'risotto', category: 'vegetales', name: 'Risotto de hongos', description: 'Queso de cabra y aceite de trufa.', details: 'Arroz cremoso con hongos ahumados a la leña, terminado con queso de cabra y unas gotas de aceite de trufa.', ingredients: ['Arroz arborio', 'Hongos', 'Queso de cabra', 'Aceite de trufa', 'Caldo de vegetales'], allergens: ['Lácteos'], portion: '320 g', price: 16, pairing: 'Copa de vino blanco (consultar)', tags: ['vegetariano', 'sin-gluten'], photo: { art: 'bowl', bg: 'olive', food: '#c8b48a', garnish: '#5e4632', label: 'Risotto de hongos, plano cenital' } },
    { id: 'berenjena', category: 'vegetales', name: 'Berenjena ahumada', description: 'Tahini de merey, granada y hierbas.', details: 'Berenjena entera asada en las brasas hasta quedar sedosa, con tahini de merey, granada y hierbas frescas.', ingredients: ['Berenjena', 'Merey', 'Ajonjolí', 'Granada', 'Hierbas frescas'], allergens: ['Frutos secos', 'Sésamo'], portion: '1 berenjena entera', price: 13, pairing: 'Jugo natural del día', tags: ['vegano', 'sin-gluten', 'frutos-secos'], photo: { art: 'plate', bg: 'olive', food: '#5a3550', garnish: '#c23b4b', rotate: 70, label: 'Berenjena ahumada con granada' } },
    { id: 'pabellon-huerta', category: 'vegetales', name: 'Pabellón de la huerta', description: 'Caraotas negras, plátano, arroz y vegetales asados.', details: 'Nuestra versión vegetal del plato nacional: caraotas negras, tajadas de plátano maduro, arroz y vegetales asados a la leña.', ingredients: ['Caraotas negras', 'Plátano maduro', 'Arroz', 'Pimentón', 'Calabacín'], allergens: [], portion: '350 g', price: 14, pairing: 'Papelón con limón', tags: ['vegano', 'sin-gluten', 'chef'], photo: { art: 'plate', bg: 'wood', food: '#2b2523', garnish: '#e2a33f', rotate: -50, label: 'Pabellón vegetal, cenital' } },

    // Acompañantes
    { id: 'platano-queso', category: 'acompanantes', name: 'Plátano maduro con queso', description: 'Horneado en las brasas con queso blanco rallado.', details: 'Plátano maduro asado en su concha sobre las brasas y cubierto con queso blanco.', ingredients: ['Plátano maduro', 'Queso blanco'], allergens: ['Lácteos'], portion: '1 plátano', price: 4, tags: ['vegetariano'], photo: { art: 'plate', bg: 'wood', food: '#d9a03c', rotate: 30, label: 'Plátano maduro con queso' } },
    { id: 'vegetales-brasa', category: 'acompanantes', name: 'Vegetales a la brasa', description: 'Vegetales de temporada con aceite de hierbas.', details: 'Selección de vegetales de temporada asados a la leña con aceite de hierbas.', ingredients: ['Vegetales de temporada', 'Aceite de oliva', 'Hierbas'], allergens: [], portion: '200 g', price: 5, tags: ['vegano', 'sin-gluten'], photo: { art: 'plate', bg: 'olive', food: '#8a9a4a', garnish: '#c9542f', rotate: 5, label: 'Vegetales asados de temporada' } },
    { id: 'yuca', category: 'acompanantes', name: 'Yuca frita con guasacaca', description: 'Crujiente por fuera y suave por dentro.', details: 'Yuca cocida y frita al momento, servida con guasacaca de la casa.', ingredients: ['Yuca', 'Aguacate', 'Cilantro', 'Ají dulce'], allergens: [], portion: '200 g', price: 4, tags: ['vegano', 'sin-gluten'], photo: { art: 'plate', bg: 'wood', food: '#ecd28e', garnish: '#5c7a32', rotate: -15, label: 'Yuca frita con guasacaca' } },
    { id: 'arroz-coco', category: 'acompanantes', name: 'Arroz con coco', description: 'Al estilo de la costa, con un toque de papelón.', details: 'Arroz cocido en leche de coco con un toque de papelón, como en la costa oriental.', ingredients: ['Arroz', 'Leche de coco', 'Papelón'], allergens: [], portion: '180 g', price: 3, tags: ['vegano', 'sin-gluten'], photo: { art: 'bowl', bg: 'linen', food: '#efe3c8', label: 'Arroz con coco en bol' } },

    // Postres
    { id: 'quesillo', category: 'postres', name: 'Quesillo de la abuela', description: 'Caramelo oscuro.', details: 'La receta de siempre: suave, con sus ojitos y un caramelo oscuro con notas amargas.', ingredients: ['Huevo', 'Leche condensada', 'Leche', 'Azúcar'], allergens: ['Huevo', 'Lácteos'], portion: '1 porción', price: 6, pairing: 'Café de altura', tags: ['vegetariano'], photo: { art: 'dessert', bg: 'linen', food: '#c68433', label: 'Quesillo con caramelo, luz natural' } },
    { id: 'marquesa', category: 'postres', name: 'Marquesa de chocolate', description: 'Cacao venezolano al 70 %.', details: 'Capas de galleta y crema de chocolate con cacao venezolano al 70 %, terminada con cacao en polvo.', ingredients: ['Cacao venezolano', 'Galleta María', 'Mantequilla', 'Huevo', 'Crema'], allergens: ['Gluten', 'Lácteos', 'Huevo'], portion: '1 porción', price: 7, pairing: 'Café de altura', tags: ['vegetariano'], signature: true, photo: { art: 'dessert', bg: 'iron', food: '#3b2015', label: 'Marquesa de chocolate, corte lateral' } },
    { id: 'tres-leches', category: 'postres', name: 'Tres leches de café', description: 'Crema batida y canela.', details: 'Bizcocho empapado en tres leches con café de altura, crema batida y canela.', ingredients: ['Harina de trigo', 'Huevo', 'Leche', 'Café', 'Crema', 'Canela'], allergens: ['Gluten', 'Lácteos', 'Huevo'], portion: '1 porción', price: 6, pairing: 'Café de altura', tags: ['vegetariano'], photo: { art: 'dessert', bg: 'linen', food: '#e8d4b4', label: 'Tres leches de café' } },
    { id: 'helado-parchita', category: 'postres', name: 'Helado artesanal de parchita', description: 'Con crocante de merey.', details: 'Helado hecho en casa con parchita fresca y un crocante de merey tostado.', ingredients: ['Parchita', 'Leche', 'Azúcar', 'Merey'], allergens: ['Lácteos', 'Frutos secos'], portion: '2 bolas', price: 5, tags: ['vegetariano', 'sin-gluten', 'frutos-secos'], photo: { art: 'bowl', bg: 'linen', food: '#f2c94c', label: 'Helado de parchita en copa' } },

    // Bebidas
    { id: 'papelon', category: 'bebidas', name: 'Papelón con limón', description: 'Natural, preparado en casa.', details: 'Papelón disuelto en agua fría con limón recién exprimido.', ingredients: ['Papelón', 'Limón', 'Agua'], allergens: [], portion: '400 ml', price: 3, tags: ['vegano', 'sin-gluten'], photo: { art: 'glass', bg: 'wood', liquid: '#c98a2e', label: 'Papelón con limón, luz natural' } },
    { id: 'jugo', category: 'bebidas', name: 'Jugo natural del día', description: 'Parchita, guanábana o mora.', details: 'Jugo de fruta natural del día. Pregunta por los sabores disponibles.', ingredients: ['Fruta de temporada', 'Agua'], allergens: [], portion: '400 ml', price: 3.5, tags: ['vegano', 'sin-gluten'], photo: { art: 'glass', bg: 'linen', liquid: '#f2b134', label: 'Jugo de parchita' } },
    { id: 'cafe', category: 'bebidas', name: 'Café de altura', description: 'Espresso o guayoyo.', details: 'Café venezolano de altura, tostado en pequeños lotes. Leche a petición.', ingredients: ['Café'], allergens: [], portion: 'Taza', price: 2.5, tags: ['vegano', 'sin-gluten'], photo: { art: 'cup', bg: 'wood', liquid: '#3a2316', label: 'Taza de café, cenital' } },
    { id: 'cerveza', category: 'bebidas', name: 'Cerveza artesanal', description: 'Rubia o tostada, de productores locales.', details: 'Cervezas de productores artesanales venezolanos. Pregunta por la selección del mes.', ingredients: ['Malta de cebada', 'Lúpulo'], allergens: ['Gluten'], portion: '355 ml', price: 5, tags: [], photo: { art: 'glass', bg: 'iron', liquid: '#d9922a', label: 'Cerveza artesanal en vaso' } },
    { id: 'vino', category: 'bebidas', name: 'Copa de vino tinto', description: 'Pregunta por la selección de la casa.', details: 'Selección de tintos para acompañar las carnes a la brasa.', ingredients: ['Uva'], allergens: ['Sulfitos'], portion: '150 ml', price: 8, tags: ['vegano', 'sin-gluten'], photo: { art: 'glass', bg: 'ember', liquid: '#6e1b25', label: 'Copa de vino tinto junto al fuego' } },

    // Cócteles
    { id: 'ron-sour', category: 'cocteles', name: 'Ron sour de papelón', description: 'Ron añejo, limón y papelón.', details: 'Ron añejo venezolano, limón, papelón y clara de huevo batida.', ingredients: ['Ron añejo', 'Limón', 'Papelón', 'Clara de huevo'], allergens: ['Huevo'], portion: '180 ml', price: 9, tags: [], photo: { art: 'glass', bg: 'ember', liquid: '#e2a64a', label: 'Ron sour en la barra' } },
    { id: 'guarapita', category: 'cocteles', name: 'Guarapita de parchita', description: 'Parchita, aguardiente y hierbabuena.', details: 'Clásico de la costa con parchita fresca, aguardiente, azúcar y hierbabuena.', ingredients: ['Parchita', 'Aguardiente', 'Azúcar', 'Hierbabuena'], allergens: [], portion: '200 ml', price: 8, tags: ['vegano', 'sin-gluten'], photo: { art: 'glass', bg: 'dusk', liquid: '#f0b52f', label: 'Guarapita de parchita al atardecer' } },
    { id: 'mojito', category: 'cocteles', name: 'Mojito de hierbabuena', description: 'Ron blanco, lima, hierbabuena y papelón.', details: 'Mojito con ron blanco venezolano, lima, hierbabuena fresca y papelón.', ingredients: ['Ron blanco', 'Lima', 'Hierbabuena', 'Papelón', 'Soda'], allergens: [], portion: '250 ml', price: 8, tags: ['vegano', 'sin-gluten'], photo: { art: 'glass', bg: 'olive', liquid: '#d8e3a4', label: 'Mojito con hierbabuena' } }
  ];

  /** Dirección de arte de las fotos fijas de las páginas. */
  Fogon.photos = {
    hero: { art: 'hero', bg: 'ember', label: 'Asado negro sobre brasas, luz lateral cálida y humo leve' },
    kitchen: { art: 'fire', bg: 'ember', label: 'Chef frente al fogón de leña' },
    chef: { art: 'chef', bg: 'ember', label: 'Retrato de la chef en la cocina' },
    team: { art: 'team', bg: 'iron', label: 'Equipo de cocina, plano medio' },
    aboutHero: { art: 'fire', bg: 'ember', label: 'El fogón encendido al iniciar el servicio' },
    garden: { art: 'garden', bg: 'olive', label: 'Huerto propio en Galipán' },
    map: { art: 'map', bg: 'linen', label: 'Mapa estático de Las Mercedes' }
  };

  /** Galerías del visor (Inicio: Ambiente · Nosotros: Equipo). */
  Fogon.galleries = {
    ambiente: [
      { art: 'room', bg: 'ember', label: 'Salón principal con lámparas cálidas' },
      { art: 'fire', bg: 'ember', label: 'El fogón de leña encendido' },
      { art: 'bar', bg: 'iron', label: 'Barra de cócteles' },
      { art: 'terrace', bg: 'dusk', label: 'Terraza al atardecer' },
      { art: 'table', bg: 'wood', label: 'Mesa preparada para grupos' }
    ],
    equipo: [
      { art: 'team', bg: 'iron', label: 'Equipo de cocina antes del servicio' },
      { art: 'chef', bg: 'ember', label: 'La chef emplatando' },
      { art: 'garden', bg: 'olive', label: 'Cosecha en el huerto' },
      { art: 'room', bg: 'ember', label: 'Sala lista para abrir' }
    ]
  };

  /** Reseñas destacadas (ejemplo). */
  Fogon.reviews = [
    { name: 'Daniela R.', text: 'El asado negro es de otro nivel. Atención cálida y el ambiente perfecto para una cena especial.' },
    { name: 'Luis M.', text: 'Fuimos 14 personas para un cumpleaños: nos organizaron todo por WhatsApp en minutos.' },
    { name: 'Carmen P.', text: 'Me explicaron qué platos eran sin gluten sin dudar. Por fin un lugar donde como tranquila.' }
  ];
})(window.Fogon);
