"use client";
import { useState, useRef } from "react";

/*
  Hook useRef.
  Este hook nos permite crear una referencia a un elemento del DOM 
  o a un valor que queremos mantener entre renderizados sin que cause una re-renderización.
*/
export default function SearchBarWithButton() {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const showInputValue = () => {
    if (inputRef.current) {
      setSearch(inputRef.current.value);
    }
  };
  return (
    <>
      <input type="text" placeholder="Escribe algo..." ref={inputRef} />
      <button className="bg-white rounded-md px-2 p-y text-black cursor-pointer" onClick={showInputValue}>
        Mostrar en parrafo
      </button>
      <p>{search}</p>
    </>
  );
}
