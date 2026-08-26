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
