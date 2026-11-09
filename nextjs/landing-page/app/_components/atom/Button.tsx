"use client";
import Link from "next/link";
import { useState } from "react";
/*
  Hooks. (Ganchos)
  Los hooks son funciones especiales de React que permiten "engancharse" a las características de React. 
  A diferencia de los componentes, los hooks siempre retornan logica y un HTML.
  Sirven para manejar el estado, efectos secundarios, referencias y contexto en componentes funcionales.

  En palabras mas sencillas. Debido a que react debe de llevar seguimiento de todo constantemente. Tiene su propia manera de manejar
  los elementos en la interfaz. Los hooks son la manera de decirle a react que algo cambio y que debe de actualizarse.

  Los hooks tienen ciertas reglas reglas como:
  - Solo se pueden usar en componentes funcionales.
  - Solo se pueden usar en el nivel superior del componente. No se pueden usar dentro de ciclos, condicionales o funciones anidadas.
  - Solo se pueden usar en componentes de React. No se pueden usar en funciones normales de JavaScript.
  - Los hooks siempre deben de empezar con la palabra "use". Esto es para que React pueda identificar que es un hook y aplicarle las reglas correspondientes.

  Nuestro primer HOOK, useState. Este hook nos permite manejar el estado de un componente funcional. 
  El estado es una manera de almacenar información que puede cambiar a lo largo del tiempo y que afecta la renderización del componente.

  */

/**
 * @component Button
 * @description A reusable button component that can be styled and optionally linked to a route.
 * @param {string} text - The text to display on the button.
 * @param {string} [styles] - Optional additional styles for the button.
 * @param {string} [route] - Optional route to navigate to when the button is clicked.
 * @returns {JSX.Element} The rendered button component.
 */
export default function Button({text, styles = "bg-blue-600", route}: {text: string, styles?: string, route?: string}) {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
  }

  if(!route) {
    return(
      <button
        onClick={handleClick} 
        className={`px-4 py-2 rounded ${styles}`}
      >
        {text} - {counter}
      </button>
    )
  }
  return(
    <Link href={route}>
      <button 
        onClick={handleClick} 
        className={`px-4 py-2 rounded ${styles}`}
      >
        {text} - {counter}
      </button>
    </Link>
  )
}

/*
  Practica del Hook useState.
  Crea un componente llamado searchBar, este componente debe de tener un input y un parrafo abajo.

  Cada vez que escribas en input el parrafo debe de actualizarse con el valor del input.

  Es decir, debes de tener un estado que contenga el valor del input y cada vez que el input cambie, el estado debe de actualizarse 
  y el parrafo debe de mostrar el valor del estado.

*/