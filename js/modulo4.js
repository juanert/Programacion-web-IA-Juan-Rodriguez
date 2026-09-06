//TRY CATCH
try {
  let numero = null;
  numero.split(" ");
} catch (error) {
  console.log("Ocurrio un error: " + error.message, error);
}

/*
Asincronismo
*/

//setInterval es una función que ejecuta un bloque de código cada cierto tiempo
setInterval(() => {
  console.log("Hola mundo cada segundo");
}, 1000);

setInterval(() => {
  console.log("Hola mundo cada dos segundos");
}, 2000);
console.log("Hola mundo 2");

//setTimeout es una función que ejecuta un bloque de código después de cierto tiempo
setTimeout(() => {
  console.log("Hola mundo después de 3 segundos");
}, 3000);

//Promesas
/*
  Las promesas son una forma de manejar el asincronismo en JavaScript. Una promesa es un objeto que 
  representa la eventual finalización (o falla) de una operación asincrónica y su valor resultante. 
  Una promesa puede estar en uno de tres estados:
  - Pendiente: Estado inicial, ni cumplida ni rechazada.
  - Cumplida: La operación se completó con éxito.
  - Rechazada: La operación falló.
*/
let promesa = new Promise((todoSeEjecuta, hayError) => {
  let numero = 10;
  if(numero > 5) {
    todoSeEjecuta("El número es mayor a 5");
  } else {
    hayError("El número es menor o igual a 5");
  }
});

promesa.then((mensaje) => {
  console.log(mensaje);
}).catch((error) => {
  console.log(error);
});

async function cargarDatos() {
  //await cargarDatos(); espera a que se carguen los datos
}

console.log("Hola mundo 3");