//ES6 
let carros = ["chevrolet", "hyundai", "mazda"];
let carrosConNombresLargos = carros.map(
  (carro) => {
    return carro.toUpperCase();
  }
);

//destructuracion

let [car1, car2, car3, car4] = carros; //["chevrolet", "hyundai", "mazda"]
console.log(car1);

let { nombre, apellido } = { nombre: "juan", apellido: "rodriguez" };
console.log(nombre, apellido)

//spread operator (Llama a todos los valores y/o propiedades de un array o objeto)
let carrosNuevo = [...carros, "lamborghini"] // ["chevrolet", "hyundai", "mazda","lamborghini"]
console.log(carrosNuevo)
let persona = { nombre: "juan", apellido: "rodriguez" };
let nuevaPersona = { ...persona, edad: 29 }


/*
  REGEX (REGULAR EXPRESSIONS) O EXPRESIONES REGULARES

  ## 🗺️ Anclas y Posiciones
  Indican dónde debe ocurrir la coincidencia dentro del texto.

  * ^ (Inicio): El texto debe empezar justo después de este símbolo.
  * $ (Final): El texto debe terminar justo antes de este símbolo.
  * \b (Límite de palabra): Marca el inicio o el final de una palabra completa (evita que coincida si está dentro de otra palabra). Ej: \bcan\b coincide con "can" pero no con "canasta".

  ## 📦 Conjuntos y Clases de Caracteres
  Definen qué tipo de caracteres estás buscando.

  * [...] (Grupo positivo): Coincide con cualquier carácter individual que esté dentro de los corchetes. Ej: [aeiou] busca cualquier vocal.
  * [^...] (Grupo negativo): Coincide con cualquier carácter que NO esté dentro de los corchetes. Ej: [^0-9] busca cualquier cosa que no sea un número.
  * - (Rango): Define un rango de caracteres dentro de un grupo. Ej: [0-9] (todos los números), [A-Z] (mayúsculas), [a-z] (minúsculas).

  ## ⚡ Atajos (Metacaracteres comunes)
  Equivalentes rápidos para los conjuntos de caracteres más usados.

  * . (Punto): Coincide con cualquier carácter excepto un salto de línea.
  * \s (Espacio): Coincide con cualquier espacio en blanco (espacios, tabulaciones, saltos de línea).
  * \S (No espacio): Coincide con cualquier carácter que no sea un espacio.
  * \d (Dígito): Equivale a [0-9]. Busca cualquier número.
  * \D (No dígito): Equivale a [^0-9]. Busca cualquier letra o símbolo que no sea un número.
  * \w (Palabra): Equivale a [a-zA-Z0-9_]. Busca letras, números y el guion bajo. Nota: No incluye la Ñ ni acentos por defecto.
  * \W (No palabra): Busca cualquier carácter especial o espacio (lo opuesto a \w).

  ## 🔢 Cuantificadores
  Indican cuántas veces se debe repetir el carácter o grupo anterior.

  * * (Cero o más veces): El carácter anterior puede no estar o repetirse infinitamente. Ej: ao* coincide con "a", "ao", "aooo".
  * + (Una o más veces): El carácter anterior debe aparecer al menos una vez. Ej: ao+ coincide con "ao", "aooo" pero no con "a".
  * ? (Opcional): El carácter anterior puede aparecer 0 o 1 vez. Ej: colou?r coincide con "color" y "colour".
  * {n} (Exactamente N veces): Ej: \d{4} busca exactamente un número de 4 dígitos.
  * {n,} (N o más veces): Ej: \w{3,} busca texto de 3 o más letras.
  * {n,m} (Entre N y M veces): Ej: [a-z]{2,5} busca cadenas de texto de mínimo 2 letras y máximo 5.

  ## 👥 Grupos y Alternancias
  Sirven para agrupar patrones o crear condiciones lógicas.

  * (...) (Grupo de captura): Agrupa varios caracteres para tratarlos como una sola unidad o extraer su contenido. Ej: (abc)+ busca "abc", "abcabc", etc.
  * | (Operador OR / O): Permite elegir entre dos o más opciones. Ej: gato|perro coincide con "gato" o con "perro".

  ## 🛡️ Carácter de Escape

  * \ (Barra invertida): Se usa para anular el significado especial de un símbolo y buscarlo de forma literal. Si quieres buscar un punto real, un signo de interrogación o un asterisco en el texto, debes anteponer la barra: \., \?, \*.

*/

const patronNombre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const nombrePrueba = " María José ";
const patronCedula = /^v-\d{6,8}$/
const cedula = "v-12345678"


if (patronCedula.test(cedula)) {
  console.log("exito");
}

if (patronNombre.test(nombrePrueba)) {
  console.log("El nombre es válido.");
} else {
  console.log("El nombre contiene caracteres no válidos.");
}