# Prompt — Mockup del catálogo web de un restaurante

> **Cómo usar este archivo**
> 1. Copia todo lo que está debajo de la línea **"COPIAR DESDE AQUÍ"** y pégalo en tu herramienta de IA (Claude, v0, Google Stitch, Figma Make, etc.).
> 2. Los datos marcados como *(ejemplo)* son de relleno: cámbialos por los reales del restaurante (nombre, dirección, teléfono, precios, platos).
> 3. Si la herramienta genera diseños en Figma en vez de código, usa la sección 15 ("Formato de entrega"), opción B.

---

<!-- ======================== COPIAR DESDE AQUÍ ======================== -->

## Rol

Actúa como **diseñador UI/UX senior y desarrollador frontend** especializado en hostelería y marcas gastronómicas premium. Vas a diseñar el **mockup de alta fidelidad, navegable y responsive** del sitio web de un restaurante. El sitio es **solo un catálogo**: muestra la carta, los precios, la historia del restaurante y las formas de contacto. **No vende ni recibe pedidos.**

Antes de diseñar, lee el brief completo. Cada decisión visual debe poder justificarse con las proto personas (sección 3), los puntos de fricción (sección 4), el user journey (sección 5) y el mapa de calor previsto (sección 6).

---

## 1. Brief del proyecto

| Campo | Valor |
| --- | --- |
| Nombre del restaurante | **Fogón** — *Cocina de leña* (ejemplo) |
| Concepto | Cocina venezolana contemporánea hecha a la leña y las brasas, con producto local. Ambiente cálido, íntimo y elegante, sin ser acartonado. |
| Ciudad | Caracas, Venezuela (ejemplo) |
| Rango de precios | $$ – $$$ (platos principales entre $15 y $25) |
| Objetivo del sitio | Que una persona **vea la carta con precios en menos de 10 segundos** y **contacte o llegue al restaurante con un solo toque**. |
| Qué NO es | No es una tienda en línea: **no hay carrito, botón "Agregar", pedidos, checkout ni pagos**. |
| Idioma | Español (`lang="es"`), tono cercano y cuidado, tuteo. |
| Uso dentro del local | La carta también se abre desde un **código QR en la mesa**, con poca luz y conexión móvil irregular. |

### Datos de ejemplo del restaurante

- **Dirección:** Calle París, Las Mercedes, Caracas. Referencia: "a dos cuadras de la plaza" (ejemplo).
- **Teléfono y WhatsApp:** +58 412 000 0000 (ejemplo).
- **Correo:** hola@fogon.example (ejemplo).
- **Instagram:** @fogon.cocinadelena (ejemplo).
- **Horario:** lunes cerrado · martes a jueves 12:00 m – 10:00 p. m. · viernes y sábado 12:00 m – 11:30 p. m. · domingo 12:00 m – 6:00 p. m.
- **Formas de pago aceptadas en el local** (solo informativo): efectivo en USD y Bs., tarjetas de débito y crédito, Pago Móvil, Zelle.
- **Servicios:** reservas por WhatsApp o teléfono, grupos y eventos privados, estacionamiento cercano, acceso con rampa, opciones vegetarianas y sin gluten.

---

## 2. Estilo artístico

**Nombre del estilo:** *Elegancia cálida editorial*.

Debe sentirse como la carta impresa de un buen restaurante convertida en revista digital: sobria, generosa en espacio, con fotografía protagonista y detalles artesanales.

**Sí usar**

- Mucho espacio en blanco (o en negro, en modo oscuro). Composición editorial con cuadrícula clara y algunos elementos que rompen la cuadrícula a propósito (una foto que sangra, un título que se superpone a la imagen).
- **Fotografía de comida y ambiente con luz cálida y lateral**: humo, brasas, texturas de madera y hierro, sombras suaves. Tonos ámbar, sin saturación exagerada. Encuadres cenitales para platos y planos medios para ambiente y personas.
- **Ilustraciones de línea fina** (trazo de 1,5 px) para íconos y detalles: llama, hojas, cubiertos, utensilios de cocina.
- **Filetes dorados** finos (1 px) como separadores, y una **textura sutil de grano de papel** (opacidad ≤ 4 %) en los fondos.
- **Cartas al estilo clásico**: nombre del plato a la izquierda, línea punteada guía y precio a la derecha (en escritorio).
- Titulares grandes con serif; textos en sans-serif limpia.

**No usar**

- Fotos de stock genéricas o que no parezcan del restaurante.
- Degradados chillones, neón, glassmorphism pesado, sombras duras o esquinas muy redondeadas tipo app infantil.
- Más de dos familias tipográficas.
- Carruseles que avanzan solos, videos o música que se reproducen solos, ventanas emergentes.
- Iconos rellenos y pesados, o emojis como íconos.

**Palabras clave del moodboard:** brasa, humo, madera, hierro fundido, lino, latón, papel artesanal, luz de vela, calidez, intimidad, oficio.

---

## 3. Proto personas

Diseña pensando en estas tres personas. En el mockup, incluye una lámina por persona con su ficha.

### 3.1 María Fernanda — "La organizadora de ocasiones"

| Campo | Detalle |
| --- | --- |
| Perfil | 34 años, gerente de proyectos. Organiza cumpleaños, cenas familiares y reuniones del trabajo. |
| Dispositivo y contexto | Laptop en la oficina para investigar; teléfono para confirmar. Compara 3–4 restaurantes antes de decidir. |
| Objetivos | Ver la carta **completa con precios** para calcular un presupuesto por persona; saber si aceptan grupos y eventos privados; encontrar opciones para invitados vegetarianos; reservar rápido. |
| Frustraciones | Cartas en PDF o en fotos de Instagram; precios ocultos o desactualizados; no saber si cobran servicio; tener que llamar para preguntar lo básico. |
| Cita | *"Si no veo los precios, asumo que es caro y paso al siguiente."* |
| Lo que el sitio debe darle | Precios visibles con fecha de actualización y moneda clara, filtros por dieta, sección de **Grupos y eventos**, preguntas frecuentes y un botón de WhatsApp con mensaje prellenado ("Hola, quiero reservar para __ personas el __"). |
| Éxito | Arma su presupuesto y escribe por WhatsApp sin salir del sitio en menos de 3 minutos. |

### 3.2 Andrés — "El explorador gastronómico"

| Campo | Detalle |
| --- | --- |
| Perfil | 27 años, diseñador freelance, *foodie*. Descubre restaurantes en Instagram, TikTok y Google Maps. A veces está de visita en la ciudad. |
| Dispositivo y contexto | Solo móvil, a una mano, en la calle o en el carro, con datos móviles limitados. |
| Objetivos | Ver fotos de los platos firma; saber **si está abierto ahora** y cómo llegar; decidir en segundos. |
| Frustraciones | Sitios lentos, loaders eternos, mapas incrustados pesados, botones pequeños, menús hamburguesa que esconden todo, horarios desactualizados. |
| Cita | *"Si en cinco segundos no sé si está abierto y dónde queda, me voy a otro."* |
| Lo que el sitio debe darle | Indicador **"Abierto ahora · cierra a las 11:30 p. m."** arriba del todo, platos firma con foto en la primera pantalla y media, barra inferior fija con **Cómo llegar / WhatsApp / Llamar**, enlaces directos a Google Maps y Waze, carga rápida. |
| Éxito | Toca "Cómo llegar" en menos de 20 segundos desde que entró. |

### 3.3 Carmen — "La comensal cuidadosa"

| Campo | Detalle |
| --- | --- |
| Perfil | 61 años, docente jubilada, celíaca. Sale a comer con su familia los domingos. |
| Dispositivo y contexto | Tablet en casa y teléfono con el **tamaño de letra del sistema aumentado**. Prefiere llamar antes que escribir. También consulta la carta desde el QR de la mesa, con poca luz. |
| Objetivos | Saber con certeza qué platos son **sin gluten** y qué alérgenos tienen; leer cómodamente; llamar con un toque. |
| Frustraciones | Letra pequeña o gris claro, íconos sin texto, ventanas que no sabe cerrar, textos sobre fotos que no se leen, modo oscuro que deslumbra o es demasiado oscuro. |
| Cita | *"No quiero adivinar qué significa cada dibujito; quiero leerlo claro."* |
| Lo que el sitio debe darle | Íconos de dieta **siempre acompañados de texto**, filtro "Sin gluten", leyenda visible, alérgenos en el detalle del plato, botón **Llamar** grande, contraste AA o mejor, diseño que no se rompe con texto al 200 %. |
| Éxito | Filtra la carta por "Sin gluten" y elige un plato sin pedir ayuda. |

---

## 4. Puntos de fricción típicos y cómo resolverlos

Diseña explícitamente la solución a cada uno. En el mockup, incluye una lámina "Fricciones resueltas" que señale dónde se resuelve cada punto.

| # | Fricción típica en sitios de restaurantes | Solución obligatoria en este diseño |
| --- | --- | --- |
| 1 | La carta es un **PDF o una foto** que no se lee en el móvil. | Carta en HTML, escaneable y con búsqueda. El PDF es opcional y secundario ("Descargar para imprimir"). |
| 2 | **Precios ocultos, ambiguos o desactualizados.** | Todos los platos muestran precio. Nota visible: "Precios en USD · IVA incluido · Servicio no incluido · Actualizados el 01/10/2026". |
| 3 | No se sabe **si está abierto ahora.** | Indicador de estado ("Abierto ahora", "Abre hoy a las 12:00 m", "Cerrado hoy") en el hero, en Contacto y en el pie de página. |
| 4 | La dirección **no abre la app de mapas.** | Botones "Abrir en Google Maps", "Waze" y "Apple Maps". Mapa como imagen estática; el mapa interactivo solo se carga al tocarlo. |
| 5 | El teléfono **no es clicable.** | Enlaces `tel:` y `https://wa.me/` en todos los puntos de contacto. |
| 6 | **Carga lenta** por imágenes y videos pesados. | Imágenes optimizadas (AVIF/WebP), carga diferida, *skeletons* con la proporción final para evitar saltos. |
| 7 | **Loader largo** que hace esperar. | El loader solo aparece en la primera visita de la sesión, dura entre 0,6 y 1,8 s y se omite si la página carga en menos de 300 ms. |
| 8 | **Ventanas emergentes** (boletín, promociones, cookies gigantes). | Ninguna ventana emergente. Aviso de cookies discreto en una franja inferior pequeña, solo si hace falta. |
| 9 | Carta larga **sin forma de navegarla.** | Pestañas de categorías fijas (*sticky*) que resaltan la sección visible, buscador y filtros por dieta. |
| 10 | **Alérgenos y dietas** no informados o con íconos crípticos. | Etiquetas con ícono **y** texto (Vegetariano, Vegano, Sin gluten, Picante, Contiene frutos secos), filtro y leyenda. |
| 11 | **Texto ilegible** sobre fotos, letra pequeña o gris claro. | Texto mínimo de 16 px, capa oscura degradada bajo los textos sobre imágenes, contraste AA en ambos modos. |
| 12 | Confusión: **¿se puede pedir en línea?** | Mensaje claro en la carta: "Esta es nuestra carta de referencia. Para reservar o consultar, escríbenos o llámanos". Ningún botón tipo "Agregar" ni "Comprar". |
| 13 | El menú hamburguesa **esconde lo importante** en el móvil. | Barra inferior fija con las 3 acciones clave; la navegación secundaria va en el menú. |
| 14 | Al cerrar el detalle de un plato **se pierde la posición** en la carta. | El detalle se abre en una hoja inferior (móvil) o un modal (escritorio) que conserva la posición; la URL guarda la categoría (`/menu#parrillas`). |
| 15 | **Carruseles automáticos** que nadie controla. | Galerías manuales con flechas, gestos e indicador de posición. |
| 16 | **Modo oscuro** que deslumbra o es ilegible. | Paleta oscura cálida (no negro puro) y fotos ligeramente atenuadas. |
| 17 | No se encuentra información de **grupos, eventos o reservas.** | Sección "Reservas, grupos y eventos" en Contacto, enlazada desde Inicio, más preguntas frecuentes. |
| 18 | **Moneda ambigua** (¿USD o Bs.?). | Moneda explícita en cada nota de precios y en el pie. Formas de pago del local claramente listadas. |
| 19 | **Foco invisible** o elementos que solo funcionan con el ratón. | Navegación completa por teclado, foco visible, objetivos táctiles de al menos 44 × 44 px. |
| 20 | Horarios especiales (feriados) **no informados.** | Banner discreto y descartable para avisos ("El 24 y 31 de diciembre cerramos a las 6:00 p. m."). |

---

## 5. User journey

### 5.1 Recorrido general

| Etapa | Objetivo del usuario | Punto de contacto | Pensamiento / emoción | Fricción posible | Oportunidad de diseño |
| --- | --- | --- | --- | --- | --- |
| **1. Descubrimiento** | Encontrar dónde comer | Instagram, Google Maps, recomendación, QR en la mesa | Curiosidad 🙂 | Vista previa del enlace pobre | Título, descripción e imagen Open Graph cuidados. |
| **2. Llegada** | Confirmar que es lo que busca | Inicio o enlace directo a `/menu` | Impaciencia 😐 | Loader largo, carga lenta | Loader breve con el logo y hero con mensaje claro, estado de apertura y botón "Ver la carta". |
| **3. Exploración** | Ver platos y precios | Carta: pestañas, buscador, filtros, detalle del plato | Interés 😋 | Carta larga, íconos confusos | Platos firma primero, filtros por dieta, detalle con foto y alérgenos. |
| **4. Evaluación** | Decidir si vale la pena | Nosotros, galería, reseñas, ubicación | Comparación 🤔 | No ver el ambiente ni las reseñas | Galería del ambiente, 3 reseñas destacadas, valoración de Google. |
| **5. Decisión y contacto** | Reservar, preguntar o ir | WhatsApp, Llamar, Cómo llegar | Decisión 😀 | Teléfono no clicable, mapa pesado | Barra inferior fija, mensaje prellenado de WhatsApp, enlaces directos a mapas. |
| **6. Visita** | Consultar la carta en la mesa | QR → `/menu` | Comodidad 😌 | Poca luz, mala conexión | Carga ligera, modo oscuro automático, texto grande, sin loader al entrar por QR. |
| **7. Después de la visita** | Recordar, recomendar, volver | Instagram, reseña en Google | Satisfacción 😍 | No encontrar dónde dejar una reseña | En el pie: "¿Te gustó? Déjanos tu reseña" y enlace a Instagram. |

### 5.2 Caminos principales por persona

- **María Fernanda (escritorio):** Inicio → "Ver la carta" → filtro "Vegetariano" → revisa precios → Contacto → "Reservas, grupos y eventos" → WhatsApp con mensaje prellenado.
- **Andrés (móvil):** Enlace de Instagram a Inicio → ve "Abierto ahora" → desliza los platos firma → abre el detalle de un plato → "Cómo llegar" en la barra inferior → Google Maps.
- **Carmen (tablet / QR):** QR de la mesa → `/menu` (modo oscuro por la poca luz) → filtro "Sin gluten" → detalle del plato con alérgenos → (en casa, otro día) Contacto → "Llamar".

Incluye en el mockup un **diagrama visual del user journey** (las 7 etapas con la curva de emociones) y los 3 caminos por persona dibujados sobre miniaturas de las pantallas.

---

## 6. Diseño guiado por un mapa de calor

Diseña la jerarquía como si ya tuvieras los mapas de calor de clics, movimiento y profundidad de scroll de un sitio de restaurante típico. Aplica estas reglas y entrega una **lámina con la superposición del mapa de calor previsto** (zonas calientes en rojo/naranja, templadas en amarillo y frías en azul) sobre Inicio y Carta, en móvil y escritorio.

### 6.1 Reglas

1. **Primera pantalla = zona más caliente.** Ahí deben estar: qué es el restaurante (titular de 6 palabras como máximo), el estado de apertura, "Ver la carta" y un acceso de contacto.
2. **Patrón en Z en el hero de escritorio:** logo (arriba a la izquierda) → navegación y "Reservar" (arriba a la derecha) → titular → botones de acción (abajo).
3. **Patrón en F en la carta:** nombre del plato alineado a la izquierda y en negrita; precio alineado a la derecha y siempre en la misma columna; descripción de 2 líneas como máximo.
4. **Zona del pulgar en móvil:** las acciones principales van en el tercio inferior de la pantalla (barra fija con Cómo llegar, WhatsApp y Llamar).
5. **Profundidad de scroll:** alrededor de la mitad de los usuarios no pasa de la segunda pantalla. Los platos firma deben aparecer antes de 1,5 pantallas; el contacto se repite en el pie de página y en la barra fija.
6. **Evitar clics muertos:** todo lo que parece clicable debe serlo. Las fotos de los platos abren el detalle; la dirección abre mapas; el horario lleva a Contacto; el teléfono llama.
7. **Evitar clics de frustración (*rage clicks*):** nada de elementos decorativos que parezcan botones, ni textos subrayados que no sean enlaces.
8. **Contenido de baja prioridad, abajo:** historia larga, premios y prensa van más abajo o en "Nosotros".
9. **Un solo botón primario por pantalla visible** para no dividir la atención.

### 6.2 Mapa de zonas de Inicio (móvil, 390 px)

```text
┌──────────────────────────────┐
│ [logo]          [☾] [≡]      │  ← templada (64 px, fija)
│                              │
│  COCINA DE LEÑA · CARACAS    │
│  Sabores que nacen           │  ← CALIENTE: titular
│  del fuego                   │
│  ● Abierto · cierra 11:30 pm │  ← CALIENTE: estado
│  [   Ver la carta   ]        │  ← CALIENTE: botón primario
│  Escríbenos por WhatsApp →   │  ← caliente: acción secundaria
│      (foto de fondo)         │
├──────────────────────────────┤
│ Horario │ Ubicación │ Contacto│ ← templada: datos rápidos
├──────────────────────────────┤
│ Platos firma  ← desliza →    │  ← caliente: fotos y precios
│ [foto][foto][foto]           │
├──────────────────────────────┤
│ Nuestra cocina (intro)       │  ← templada
│ Categorías · Galería         │  ← templada / fría
│ Reseñas · Contacto · Pie     │  ← fría (el contacto se repite)
├──────────────────────────────┤
│ [Cómo llegar][WhatsApp][Llamar] ← CALIENTE: barra fija (zona del pulgar)
└──────────────────────────────┘
```

### 6.3 Medición prevista (para la versión real)

Marca las zonas con atributos `data-zone="hero|signature|menu-tabs|dish-card|contact-bar|footer"` para medirlas después con herramientas como Microsoft Clarity o Hotjar. KPIs:

- % de visitas que llegan a la carta en menos de 10 segundos.
- Clics en WhatsApp, Llamar y Cómo llegar.
- Profundidad de scroll al 50 % y al 75 %.
- Uso del buscador y de los filtros; aperturas del detalle de un plato.
- Uso del cambio de tema claro/oscuro.

---

## 7. Logo (crear) y loader

El restaurante **no tiene logo**: créalo siguiendo estas especificaciones.

### 7.1 Concepto

**Isotipo:** un **aro** (el plato o la boca del fogón) que contiene una **llama estilizada** con una **brasa** en su interior, y debajo una **línea horizontal** que representa la leña o la parrilla. Es geométrico, de trazo limpio, y funciona en tamaños pequeños.

**Logotipo:** "FOGÓN" en la serif de titulares (sección 9), en mayúsculas, peso 500, espaciado entre letras de 0,12 em; debajo, "COCINA DE LEÑA" en la sans-serif, 11–12 px, peso 600, espaciado de 0,3 em.

**Versiones:** horizontal (isotipo + logotipo), apilada, isotipo solo (favicon y loader), monocromo claro y monocromo oscuro.
**Área de respeto:** igual a la altura de la brasa alrededor de todo el logo.
**Tamaño mínimo:** isotipo de 24 px; versión horizontal de 96 px de ancho.

### 7.2 SVG base del isotipo

Úsalo como punto de partida (puedes refinar las curvas, manteniendo la estructura y las clases):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-labelledby="logo-title">
  <title id="logo-title">Fogón — Cocina de leña</title>
  <!-- Aro: el plato / la boca del fogón. Se dibuja en el loader. -->
  <circle class="logo-ring" cx="60" cy="60" r="52" fill="none" stroke="currentColor" stroke-width="3"/>
  <!-- Llama principal, con dos puntas. -->
  <path class="logo-flame" fill="currentColor"
        d="M60 28 C60 28 80 48 80 66 A20 20 0 0 1 40 66 C40 54 48 46 52 40 C53 48 56 52 60 54 C58 44 56 36 60 28 Z"/>
  <!-- Brasa interior en el color de marca. -->
  <path class="logo-ember" fill="var(--color-primary)"
        d="M60 58 C64 64 68 68 68 73 A8 8 0 0 1 52 73 C52 68 56 64 60 58 Z"/>
  <!-- Leña / parrilla. -->
  <line class="logo-grill" x1="46" y1="96" x2="74" y2="96" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
</svg>
```

`currentColor` toma el color del texto principal (carbón en modo claro, crema en modo oscuro); la brasa usa siempre el color primario.

### 7.3 Loader animado con el logo

**Secuencia (total entre 0,6 y 1,8 s):**

| Tiempo | Acción | Easing |
| --- | --- | --- |
| 0 – 900 ms | El **aro se dibuja** desde arriba, en sentido horario (`stroke-dasharray: 327`, `stroke-dashoffset` de 327 a 0). | `cubic-bezier(0.65, 0, 0.35, 1)` |
| 300 – 800 ms | La **línea de leña se dibuja**. | `ease-out` |
| 450 – 1150 ms | La **llama crece** desde su base (`scaleY` de 0 a 1 y opacidad de 0 a 1, origen en `60px 86px`). | `cubic-bezier(0.22, 1, 0.36, 1)` |
| 1000 ms en adelante | La **brasa late** suavemente (opacidad 0,7 ↔ 1, escala 0,94 ↔ 1,04, ciclo de 1,6 s) mientras termina la carga. | `ease-in-out` |
| Al terminar la carga | Aparece el logotipo "FOGÓN" letra por letra (40 ms entre letras). Luego el isotipo **se encoge y viaja a su posición en el encabezado** (técnica FLIP) mientras el fondo del loader se desvanece en 400 ms y el contenido entra con un *fade* suave. | `cubic-bezier(0.22, 1, 0.36, 1)` |

**Reglas del loader:**

- Solo en la **primera visita de la sesión** (`sessionStorage`). No aparece al navegar entre páginas ni al entrar por el QR de la mesa.
- Si la página carga en menos de 300 ms, no se muestra.
- Tiempo máximo de 1,8 s: si la carga tarda más, el loader cede el paso y se muestran *skeletons*.
- Fondo del loader = color de fondo del tema activo (sin destello blanco en modo oscuro).
- Con `prefers-reduced-motion: reduce`: logo estático y un *fade* de 150 ms.
- Accesible: `role="status"` y `aria-label="Cargando Fogón"`.

```css
/* Referencia de animaciones del loader */
.logo-ring  { stroke-dasharray: 327; stroke-dashoffset: 327; transform: rotate(-90deg); transform-origin: 60px 60px;
              animation: draw 900ms cubic-bezier(.65,0,.35,1) forwards; }
.logo-grill { stroke-dasharray: 28; stroke-dashoffset: 28; animation: draw 500ms ease-out 300ms forwards; }
.logo-flame { transform-origin: 60px 86px; transform: scaleY(0); opacity: 0;
              animation: rise 700ms cubic-bezier(.22,1,.36,1) 450ms forwards; }
.logo-ember { transform-origin: 60px 73px; opacity: 0; animation: glow 1600ms ease-in-out 1000ms infinite; }
@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes rise { to { transform: scaleY(1); opacity: 1; } }
@keyframes glow { 0%, 100% { opacity: .7; transform: scale(.94); } 50% { opacity: 1; transform: scale(1.04); } }
@media (prefers-reduced-motion: reduce) { .logo-ring, .logo-grill, .logo-flame, .logo-ember { animation: none; opacity: 1; stroke-dashoffset: 0; transform: none; } }
```

Usa también el isotipo como **favicon**, en el **pie de página** y en la **página 404**.

---

## 8. Colores

Define todos los colores como **variables CSS** (*tokens*) y cambia sus valores entre modo claro y oscuro. Los contrastes indicados son aproximados frente al fondo de cada modo; verifícalos.

### 8.1 Modo claro — "Lino y brasa"

| Token | Hex | Uso | Contraste aprox. sobre fondo |
| --- | --- | --- | --- |
| `--color-bg` | `#FAF6F0` | Fondo general (crema hueso) | — |
| `--color-surface` | `#FFFDF9` | Tarjetas, modales, hojas | — |
| `--color-surface-alt` | `#F2EBE0` | Secciones alternas, pestañas | — |
| `--color-border` | `#E3D9CB` | Bordes y separadores | — |
| `--color-text` | `#1F1A17` | Texto principal (carbón cálido) | ≈ 16:1 |
| `--color-text-muted` | `#5C524A` | Texto secundario, descripciones | ≈ 7:1 |
| `--color-primary` | `#B4472C` | Terracota brasa: botón primario, enlaces, precios destacados | ≈ 5:1 (texto blanco sobre él ≈ 5,4:1) |
| `--color-primary-hover` | `#963A23` | Hover y estado presionado | — |
| `--color-accent` | `#B08D57` | Latón: filetes, íconos decorativos (**no usar para texto**) | ≈ 2,9:1 |
| `--color-accent-text` | `#8A6A3A` | Latón para texto pequeño (subtítulos y etiquetas superiores) | ≈ 4,6:1 |
| `--color-herb` | `#4F5D3A` | Oliva: etiquetas Vegetariano y Vegano | ≈ 6,6:1 |
| `--color-success` | `#2F7D4F` | "Abierto ahora" | ≈ 4,7:1 |
| `--color-danger` | `#B3261E` | "Cerrado", "Picante" | ≈ 6:1 |
| `--color-overlay` | `rgba(20,17,15,0.55)` | Capa degradada sobre fotos con texto | — |

### 8.2 Modo oscuro — "Noche de brasas"

| Token | Hex | Uso | Contraste aprox. sobre fondo |
| --- | --- | --- | --- |
| `--color-bg` | `#14110F` | Fondo general (carbón cálido, **no negro puro**) | — |
| `--color-surface` | `#1E1A17` | Tarjetas | — |
| `--color-surface-alt` | `#28221E` | Secciones alternas, elementos elevados | — |
| `--color-border` | `#3A322C` | Bordes | — |
| `--color-text` | `#F3ECE2` | Texto principal (crema; **no blanco puro**) | ≈ 16:1 |
| `--color-text-muted` | `#B8AC9E` | Texto secundario | ≈ 8:1 |
| `--color-primary` | `#E07A5A` | Terracota clara (texto `#14110F` sobre ella) | ≈ 6,4:1 |
| `--color-primary-hover` | `#EA9174` | Hover | — |
| `--color-accent` | `#D4B483` | Latón claro (decorativo y texto) | ≈ 9,5:1 |
| `--color-accent-text` | `#D4B483` | Igual que el acento | ≈ 9,5:1 |
| `--color-herb` | `#9DB07A` | Oliva clara | ≈ 8:1 |
| `--color-success` | `#6BC38F` | "Abierto ahora" | alto |
| `--color-danger` | `#F2857B` | "Cerrado", "Picante" | alto |
| `--color-overlay` | `rgba(0,0,0,0.55)` | Capa sobre fotos | — |

**Reglas de color**

- En modo oscuro, las fotos se atenúan ligeramente (`filter: brightness(.9)`) y las sombras se sustituyen por bordes sutiles y superficies más claras.
- El color nunca es la única señal: el estado "Abierto" lleva punto, texto e ícono; las dietas llevan ícono y texto.
- Proporción aproximada: 70 % fondo y superficies, 20 % texto, 7 % primario, 3 % acentos.

---

## 9. Tipografía

| Rol | Familia (Google Fonts) | Pesos | Notas |
| --- | --- | --- | --- |
| Titulares y logotipo | **Fraunces** (serif variable) | 400, 500, 600; cursiva 400 | Calidez editorial. Usa el eje óptico `opsz` en tamaños grandes; la cursiva solo para acentos ("desde 2012"). |
| Cuerpo, interfaz y precios | **Inter** (sans-serif) | 400, 500, 600 | Muy legible. Precios con `font-variant-numeric: tabular-nums` para que se alineen. |

- Carga con `font-display: swap`, subconjunto `latin-ext` (tildes y ñ) y precarga de las dos fuentes principales.
- Máximo dos familias. Nada de tipografías script.

### 9.1 Escala tipográfica (fluida, móvil → escritorio)

| Estilo | Familia | Tamaño | Peso | Interlineado | Espaciado |
| --- | --- | --- | --- | --- | --- |
| Display (hero) | Fraunces | `clamp(2.5rem, 1rem + 6vw, 5rem)` → 40–80 px | 500 | 1.05 | −0.02 em |
| H1 (título de página) | Fraunces | `clamp(2rem, 1rem + 3vw, 3.5rem)` → 32–56 px | 500 | 1.1 | −0.015 em |
| H2 (sección) | Fraunces | `clamp(1.75rem, 1rem + 2vw, 2.5rem)` → 28–40 px | 500 | 1.15 | −0.01 em |
| H3 (nombre del plato) | Fraunces | 20 → 22 px | 600 | 1.25 | 0 |
| Etiqueta superior (*eyebrow*) | Inter | 13 px, MAYÚSCULAS | 600 | 1.4 | 0.16 em |
| Cuerpo | Inter | 16 → 17 px | 400 | 1.6 | 0 |
| Descripción de plato | Inter | 15 px (nunca menos) | 400 | 1.5 | 0 |
| Precio | Inter | 18 px | 600 | 1.2 | 0, tabular |
| Botón | Inter | 16 px | 600 | 1 | 0.01 em |
| Texto legal / pie | Inter | 14 px | 400 | 1.5 | 0 |

- Longitud de línea máxima: 65–70 caracteres.
- Usa `rem` para que el sitio respete el tamaño de letra del sistema (persona Carmen).

---

## 10. Tamaños, cuadrícula y espaciado

### 10.1 Marcos (*frames*) del mockup

| Dispositivo | Tamaño del frame |
| --- | --- |
| Móvil | **390 × 844** (verifica también 360 y 430 de ancho) |
| Tablet | **768 × 1024** (vertical) y 1024 × 768 (horizontal) |
| Escritorio | **1440 × 900** (verifica también 1280 y 1920 de ancho) |

**Puntos de quiebre:** 640, 768, 1024, 1280 y 1536 px (*mobile-first*).

### 10.2 Cuadrícula

| Dispositivo | Columnas | Medianil (*gutter*) | Márgenes laterales | Ancho máximo del contenido |
| --- | --- | --- | --- | --- |
| Móvil | 4 | 16 px | 20 px | 100 % |
| Tablet | 8 | 24 px | 32 px | 100 % |
| Escritorio | 12 | 32 px | auto | **1200 px** (las fotos de hero y galería pueden ocupar todo el ancho) |

### 10.3 Espaciado y forma

- **Escala de espaciado (base 4):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 px.
- **Separación vertical entre secciones:** 64 px en móvil · 96 px en tablet · 128 px en escritorio.
- **Radios:** 6 px (etiquetas) · 12 px (tarjetas y botones) · 20 px (modales y hojas inferiores) · completo (*chips* de filtro).
- **Sombras (modo claro):** muy suaves y cálidas, p. ej. `0 1px 2px rgba(31,26,23,.06), 0 8px 24px rgba(31,26,23,.06)`. En modo oscuro, sin sombras: borde más claro.
- **Íconos:** 20 y 24 px, trazo de 1,5 px (estilo Lucide o Phosphor Light).

### 10.4 Componentes clave

| Componente | Medidas |
| --- | --- |
| Encabezado | 64 px de alto en móvil y 80 px en escritorio; al hacer scroll se reduce a 64 px y gana un fondo con ligero desenfoque. |
| Botón | 48 px de alto (mínimo 44), 24 px de relleno horizontal. Variantes: primario (relleno), secundario (borde de 1 px), texto (con flecha). |
| *Chip* de filtro / pestaña | 40 px de alto, 16 px de relleno horizontal. |
| Tarjeta de plato | Imagen 4:3 (o miniatura cuadrada de 96 px en la lista móvil), 16–24 px de relleno; 1 columna en móvil, 2 en tablet y 3 en escritorio. |
| Hero | `88svh` en móvil (usa `svh` para evitar saltos con la barra del navegador), `80vh` en escritorio con un máximo de 820 px. |
| Barra inferior de acciones (móvil) | 64 px + `env(safe-area-inset-bottom)`; 3 botones de igual ancho con ícono y texto. Aparece después de pasar el hero. |
| Hoja inferior (detalle del plato, móvil) | Hasta el 90 % del alto, con asa de arrastre, botón de cierre de 44 px y cierre con gesto o con la tecla Esc. |
| Modal (detalle del plato, escritorio) | 720 px de ancho, imagen a la izquierda y contenido a la derecha. |
| Interruptor de tema | 44 × 44 px, ícono sol/luna con transición entre ambos. |

---

## 11. Páginas

Diseña cada página en **móvil, tablet y escritorio**, y en **modo claro y oscuro**.

### 11.1 Inicio (`/`)

1. **Encabezado:** logo · Carta · Nosotros · Contacto · interruptor de tema · botón "Reservar" (abre las opciones de contacto, no un formulario de pago). En móvil: logo, tema y menú.
2. **Hero:** foto a sangre del plato firma sobre brasas, con capa degradada; etiqueta superior "COCINA DE LEÑA · CARACAS"; titular **"Sabores que nacen del fuego"**; introducción de 1–2 líneas; botón primario **"Ver la carta"**; acción secundaria "Escríbenos por WhatsApp"; indicador **"● Abierto ahora · cierra a las 11:30 p. m."**.
3. **Franja de datos rápidos (3 columnas):** Horario (de hoy) · Ubicación (abre mapas) · Contacto (WhatsApp y teléfono).
4. **Introducción "Nuestra cocina":** 2 párrafos breves, foto del chef o de la cocina y enlace "Conoce nuestra historia →".
5. **Platos firma:** 4–6 tarjetas con foto, nombre, descripción corta y precio. En móvil, desplazamiento horizontal manual con indicador. Enlace "Ver la carta completa".
6. **Explora la carta:** accesos con imagen a Entradas, De la brasa, Postres y Bebidas (cada uno lleva a `/menu#categoria`).
7. **Ambiente:** galería en mosaico de 5 fotos (manual, con visor a pantalla completa).
8. **Lo que dicen:** 3 reseñas breves con nombre e inicial, y la valoración de Google (p. ej. 4,8 ★ de 1.200 reseñas, ejemplo).
9. **Cierre de contacto:** "¿Te esperamos esta noche?" + WhatsApp, Llamar y Cómo llegar + mapa estático.
10. **Pie de página:** isotipo, dirección, horario completo, contactos, redes, formas de pago del local, "Precios en USD · IVA incluido", enlace para dejar una reseña, © y créditos.

### 11.2 Carta (`/menu`)

1. Título **"Nuestra carta"** y nota de precios: "Precios en USD · IVA incluido · Servicio no incluido · Actualizados el 01/10/2026".
2. Aviso: "Esta es nuestra carta de referencia. Para reservar o consultar, escríbenos o llámanos".
3. **Pestañas de categorías fijas** bajo el encabezado, con desplazamiento horizontal en móvil (con desvanecido en los bordes) y resaltado de la categoría visible (*scrollspy*): Entradas · De la brasa · Del mar · Vegetales · Acompañantes · Postres · Bebidas · Cócteles.
4. **Buscador** ("Busca un plato o ingrediente") y **filtros**: Vegetariano · Vegano · Sin gluten · Picante · Recomendado del chef · Para compartir. Con contador de resultados y botón "Limpiar filtros".
5. **Leyenda de etiquetas** siempre accesible.
6. **Secciones por categoría:** título + descripción corta + lista de platos. Cada plato muestra nombre, descripción (máx. 2 líneas), precio, etiquetas y foto opcional. En escritorio, formato de carta clásica con línea punteada entre el nombre y el precio.
7. **Detalle del plato** (hoja inferior en móvil, modal en escritorio): foto grande, nombre, descripción completa, ingredientes, **alérgenos**, tamaño de la porción, precios por variante (media ración / ración completa), maridaje sugerido y el botón **"Preguntar por este plato"** (WhatsApp con mensaje prellenado). **Sin botón de agregar ni de comprar.**
8. **Estado vacío** del buscador: ilustración de línea + "No encontramos ese plato. Prueba con otro ingrediente" + botón "Limpiar búsqueda".
9. Enlace secundario "Descargar la carta en PDF" y botón "Volver arriba".

### 11.3 Nosotros (`/nosotros`)

1. Hero compacto con foto del equipo o del fogón encendido.
2. **Historia:** línea de tiempo breve (2012 · apertura; 2016 · horno de leña; 2020 · huerto propio; hoy; fechas de ejemplo).
3. **El chef:** retrato, nombre, cita en cursiva de Fraunces y párrafo breve.
4. **Filosofía (3 pilares con íconos de línea):** Fuego y leña · Producto local · Hospitalidad.
5. Galería del ambiente y del equipo.
6. Prensa y reconocimientos (logotipos en monocromo, opcional).
7. Llamado final: "Ven a conocernos" → Contacto.

### 11.4 Contacto y ubicación (`/contacto`)

1. **Tarjetas de contacto** de un toque: WhatsApp (principal), Teléfono, Correo e Instagram.
2. **Horario** en tabla, con el día de hoy resaltado, el estado actual y los horarios especiales.
3. **Ubicación:** dirección, referencia, mapa estático con los botones Google Maps, Waze y Apple Maps; estacionamiento y accesibilidad (rampa).
4. **Reservas, grupos y eventos:** cómo reservar, capacidad para grupos, eventos privados y el botón "Consultar por WhatsApp" con mensaje prellenado.
5. **Formas de pago aceptadas en el local** (informativo).
6. **Preguntas frecuentes** (acordeón): ¿Aceptan reservas? ¿Tienen opciones vegetarianas y sin gluten? ¿Hay estacionamiento? ¿Se admiten mascotas? ¿Hacen delivery? ¿Cobran servicio?

### 11.5 Páginas y estados adicionales

- **404:** isotipo con la llama "apagada" (solo el aro y la leña) + "Esta página se nos quemó" + botones "Ir al inicio" y "Ver la carta".
- **Loader** (sección 7.3) en 4 fotogramas clave.
- **Skeletons** de las tarjetas de platos.
- **Estados de los componentes:** reposo, hover, foco, presionado y deshabilitado.

### 11.6 Contenido de ejemplo de la carta (precios en USD)

| Categoría | Plato | Descripción breve | Precio | Etiquetas |
| --- | --- | --- | --- | --- |
| Entradas | Tequeños de queso de año | Masa artesanal, salsa de ajo y cilantro | 6,00 | Vegetariano |
| Entradas | Arepitas de chicharrón | Con nata y ají dulce | 7,00 | — |
| Entradas | Provoleta a la leña | Orégano, aceite de oliva y pan de la casa | 9,00 | Vegetariano · Para compartir |
| Entradas | Ceviche de pesca del día | Leche de tigre de parchita y batata glaseada | 12,00 | Sin gluten · Picante |
| De la brasa | Asado negro a la leña | Puré de plátano maduro y arroz blanco | 18,00 | Recomendado del chef |
| De la brasa | Punta trasera (300 g) | Guasacaca y yuca frita | 22,00 | Sin gluten |
| De la brasa | Pollo marinado en papelón | Naranja, ajo y hierbas, con vegetales asados | 15,00 | Sin gluten |
| De la brasa | Costillas glaseadas | Melao de caña y ensalada de repollo | 19,00 | Para compartir |
| Del mar | Pesca del día a las brasas | Mantequilla de ajoporro y arroz con coco | 20,00 | Sin gluten |
| Vegetales | Risotto de hongos | Queso de cabra y aceite de trufa | 16,00 | Vegetariano · Sin gluten |
| Acompañantes | Plátano maduro con queso | — | 4,00 | Vegetariano |
| Acompañantes | Vegetales a la brasa | Temporada | 5,00 | Vegano · Sin gluten |
| Postres | Quesillo de la abuela | Caramelo oscuro | 6,00 | Vegetariano |
| Postres | Marquesa de chocolate | Cacao venezolano al 70 % | 7,00 | Vegetariano |
| Postres | Tres leches de café | Crema batida y canela | 6,00 | Vegetariano |
| Bebidas | Papelón con limón | Natural | 3,00 | Vegano |
| Bebidas | Café de altura | Espresso o guayoyo | 2,50 | Vegano |
| Cócteles | Ron sour de papelón | Ron añejo, limón y papelón | 9,00 | — |
| Cócteles | Guarapita de parchita | Parchita, aguardiente y hierbabuena | 8,00 | — |

---

## 12. Modo claro y oscuro

- Por defecto se respeta la preferencia del sistema (`prefers-color-scheme`); el interruptor permite cambiarla y la elección se guarda en `localStorage`.
- **Sin destello del tema equivocado:** el tema se aplica con un script en línea en el `<head>` antes de pintar la página.
- **Transición elegante al cambiar:** revelado circular desde el botón del tema usando la View Transitions API (con un *fade* de 300 ms como alternativa), y el ícono sol ↔ luna se transforma con rotación y cambio de forma.
- Al entrar por el QR de la mesa entre las 6:00 p. m. y las 6:00 a. m., se sugiere el modo oscuro (respetando siempre la elección manual).
- Ambos modos deben estar **igual de cuidados**: entrega todas las pantallas en los dos.
- El logo cambia automáticamente gracias a `currentColor`; la brasa conserva el color primario.

---

## 13. Animaciones suaves y elegantes

**Principios:** lentas pero no perezosas, sutiles, con propósito. Nada de rebotes ni efectos elásticos. Solo se animan `opacity` y `transform` (60 fps).

| Token | Valor |
| --- | --- |
| `--ease-out` (entradas) | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--ease-in-out` (transiciones) | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--duration-fast` | 150 ms (hover, foco) |
| `--duration-base` | 300 ms (tema, pestañas, botones) |
| `--duration-slow` | 600 ms (revelados, imágenes) |

| Elemento | Animación |
| --- | --- |
| Revelado al hacer scroll | *Fade* + desplazamiento de 16 px hacia arriba, 600 ms; elementos en grupo escalonados 60 ms. Solo la primera vez que entran en pantalla. |
| Imágenes al aparecer | Escala de 1,04 a 1 y opacidad de 0 a 1, 800 ms. |
| Hover en tarjeta de plato (escritorio) | La imagen escala a 1,03 en 600 ms; la tarjeta sube 2 px y su sombra crece. |
| Botones | Cambio de color en 150 ms; la flecha de los enlaces avanza 4 px. |
| Pestañas de categorías | El subrayado se desliza a la pestaña activa en 300 ms. |
| Detalle del plato | La hoja sube desde abajo (móvil) o el modal aparece con escala de 0,98 a 1 y *fade* (escritorio), en 300 ms; el fondo se oscurece. |
| Encabezado | Se compacta suavemente al hacer scroll. |
| Navegación entre páginas | *Cross-fade* de 250 ms con View Transitions API; el logo se mantiene fijo. |
| Hero | Parallax muy leve en la foto (máx. 8 %), solo en escritorio. |
| Indicador "Abierto ahora" | El punto verde late suavemente cada 2 s. |
| Loader | Ver sección 7.3. |

**Prohibido:** secuestrar el scroll (*scroll-jacking*), animaciones de más de 1 s fuera del loader, textos que se escriben letra por letra en el contenido, movimiento continuo que distraiga de la lectura.

**Accesibilidad:** con `prefers-reduced-motion: reduce` se eliminan desplazamientos, escalas y parallax; solo quedan *fades* de 150 ms como máximo.

---

## 14. Accesibilidad y rendimiento (requisitos mínimos)

- **WCAG 2.2 AA:** contraste ≥ 4,5:1 en texto normal; foco visible (contorno de 2 px en el color primario con 2 px de separación); objetivos táctiles de al menos 44 × 44 px; navegación completa por teclado; enlace "Saltar al contenido"; *landmarks* semánticos (`header`, `nav`, `main`, `footer`); texto alternativo descriptivo en cada foto de plato; el diseño no se rompe con zoom al 200 %.
- Los modales y hojas atrapan el foco, se cierran con Esc y devuelven el foco al elemento que los abrió.
- **Rendimiento:** imágenes AVIF/WebP con `srcset` y carga diferida, salvo la del hero (con prioridad alta); fuentes precargadas; sin librerías pesadas; mapa interactivo solo al tocarlo. Objetivos: LCP < 2,5 s en 4G, CLS < 0,1.
- **Privacidad y SEO básico:** metadatos `title` y `description` por página, etiquetas Open Graph con una foto atractiva y datos estructurados `Restaurant` (schema.org) con horario, dirección, teléfono y `hasMenu`.

---

## 15. Formato de entrega

**Opción A (por defecto): prototipo navegable en código**

- HTML5 semántico + **Tailwind CSS** + JavaScript vanilla (sin frameworks pesados).
- Las 4 páginas enlazadas entre sí, con el loader, el cambio de tema, las pestañas con *scrollspy*, el buscador y los filtros de la carta funcionando, el detalle del plato y la barra inferior móvil.
- Tokens de color, tipografía, espaciado y animación como variables CSS en un único lugar.
- Imágenes de marcador de posición con la proporción correcta y un `alt` que describa la foto deseada (dirección fotográfica de la sección 2).

**Opción B: frames de diseño (Figma u otra herramienta)**

- Una página del archivo por cada sección: Portada · Proto personas · User journey · Fricciones resueltas · Mapa de calor previsto · Sistema de diseño (colores, tipografía, espaciado, componentes y sus estados) · Logo y loader (fotogramas) · Páginas en móvil/tablet/escritorio × claro/oscuro · Prototipo con interacciones.

**En ambas opciones, entrega además:**

1. Las 3 fichas de proto personas.
2. El diagrama del user journey con los caminos de cada persona.
3. La lámina de fricciones resueltas (número de fricción → dónde se resuelve).
4. La superposición del mapa de calor previsto en Inicio y Carta (móvil y escritorio).
5. El logo en todas sus versiones y la animación del loader.
6. Una breve justificación (5–10 líneas) de las decisiones principales.

---

## 16. Criterios de aceptación (lista de verificación)

- [ ] El usuario ve la carta con precios en **menos de 10 segundos** y en un máximo de **1 toque** desde Inicio.
- [ ] Contactar (WhatsApp o Llamar) o abrir "Cómo llegar" toma **1 toque** desde cualquier pantalla en móvil.
- [ ] El estado "Abierto / Cerrado" es visible en la primera pantalla.
- [ ] **No existe** ningún carrito, botón de agregar, checkout ni elemento de compra.
- [ ] Todas las etiquetas de dieta tienen ícono **y** texto; el filtro "Sin gluten" funciona.
- [ ] Todas las páginas están en modo claro y oscuro, sin destello al cargar, y cumplen el contraste AA.
- [ ] El logo existe en todas sus versiones y el loader cumple las reglas de duración, primera visita y movimiento reducido.
- [ ] Las animaciones usan los tokens definidos y desaparecen con `prefers-reduced-motion`.
- [ ] El diseño funciona sin scroll horizontal en 360, 390, 430, 768, 1024, 1280, 1440 y 1920 px de ancho.
- [ ] Se entregan las proto personas, el user journey, las fricciones resueltas y el mapa de calor previsto.

<!-- ======================== FIN DEL PROMPT ======================== -->
