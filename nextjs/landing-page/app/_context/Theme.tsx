"use client";
import { useState, useEffect, createContext } from "react";

/*
  Creamos el contexto para el tema de la aplicación, con un valor inicial de "light" y una función para alternar entre "light" y "dark".
*/
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

//Este es el proveedor del contexto, que envuelve a los componentes hijos y les proporciona acceso al tema y a la función para alternar el tema.
export const ThemeProvider = ({ children }: any) => {
  // Creamos un estado para el tema, con un valor inicial de "light".
  // Servidor y cliente arrancan igual, así se evita el error de hidratación.
  const [theme, setTheme] = useState("light");

  //Cargar el tema en localStorage si existe, de lo contrario usar el tema por defecto "light".
  // useEffect solo se ejecuta en el navegador, después de la hidratación, así que aquí ya no hace falta validar typeof window.
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  //Funcion que alterna entre el tema claro y oscuro, y guarda la preferencia en localStorage para que se mantenga entre sesiones.
  // La función toggleTheme alterna entre "light" y "dark" cuando se llama.
  const toggleThemeFunction = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // Guardamos el tema en localStorage para que se mantenga entre sesiones.
    // Esta función solo se llama desde un click, que siempre ocurre en el navegador, por eso tampoco necesita la validación.
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => toggleThemeFunction() }}>
      {/* Renderizamos los componentes hijos dentro del proveedor del contexto, para que puedan acceder al tema y a la función toggleTheme.*/}
      {children}
    </ThemeContext.Provider>
  );
};