"use client";
import { useState, useEffect } from "react";

export default function Api() {
  const [data, setData]: any = useState(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  }, [page]);

  if (!data) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Personajes de Rick and Morty</h1>
      <div className="p-8 grid grid-cols-3 gap-4">
        {data.results.map((character: any) => {
          return (
            //Card del personaje
            <div
              key={character.id}
              className="flex flex-col gap-2 bg-blue-600 p-4 rounded border border-white/50"
            >
              <h2>{character.name}</h2>
              <img src={character.image} alt={character.name} />
            </div>
          );
        })}
      </div>
      <div>
        <button
          className="disabled:bg-gray-600 bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={() => {setPage(page - 1)}}
          disabled={!data.info.prev}
        >
          Anterior
        </button>
        <p>Pagina {page} de {data.info.pages}</p>
        <button
          className="disabled:bg-gray-600 bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={() => {setPage(page + 1)}}
          disabled={!data.info.next}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
