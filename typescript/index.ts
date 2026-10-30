//let nombre = "Juan";
let nombre:string = "juan";
let edad:number = 30;
let casado:boolean = false;
let fechaNacimiento:Date = new Date("1993-01-01");
let sueldo:number = 1234.5;
let hobbies:string[] = ["programar", "leer", "correr"];
let direccion:{calle:string, ciudad:string, pais:string} = {
    calle: "Calle Falsa 123",
    ciudad: "Ciudad Falsa",
    pais: "Pais Falso"
};
let nulo:null = null;
let indefinido:undefined = undefined;
let elementoHtml:HTMLElement = document.getElementById("app")!;
let sumar = (a:number, b:number):number => a + b;
let cualquierDato:any = "Hola";
let expresionRegular:RegExp = /\w+/g;

//interfaces
interface Auto {
  nombre: string;
  anio: number;
}

let miAuto: Auto = {
  nombre: "Toyota",
  anio: 2020
};


/*
  Crea una pagina HTML con un formulario que tenga los siguientes campos:
  - correo
  - contraseña

  Con typescript toma los valores de los inputs, guardalos en un objeto llamado usuario 
  y luego imprime el objeto en consola.
*/