"use client";
import { useState, useEffect } from "react";

export function useFetch(url: string, options?: RequestInit){
  // Inicializar estados para la data, cargando y error
  let [data, setData] = useState(null);
  //este estado me servira para saber si la data esta cargando o no, para mostrar un spinner mientras se carga la data
  let [loading, setLoading] = useState(true);
  //este estado me servira para saber si hubo un error al cargar la data, para mostrar un mensaje de error
  let [error, setError] = useState(null);  

  //usamos useEffect para hacer la peticion a la API cuando el componente se monta
  useEffect(() => {
    //funcion asincrona para hacer la peticion a la API
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        //si la respuesta no es ok, lanzamos un error con el status de la respuesta
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        //si la respuesta es ok, convertimos la respuesta a json y la guardamos en el estado data
        const result = await response.json();
        //guardamos la data en el estado data
        setData(result);
      } catch (err:any) {
        //si hay un error, lo guardamos en el estado error
        setError(err);
      } finally {
        //cuando termina la peticion, cambiamos el estado loading a false
        setLoading(false);
      }
    }
    //llamamos a la funcion fetchData para hacer la peticion a la API
    fetchData();
  }, [url, options]); //dependencias del useEffect, se ejecutara cada vez que cambie la url o las opciones de la peticion
  //retornamos un objeto con la data, el estado loading y el estado error
  return { data, loading, error };
}