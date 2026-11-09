"use client";
import { useFetch } from "../../_hooks/useFetch";
import { useState } from "react";

export default function ApiHook() {
  const [page, setPage] = useState(1);

  const { data, loading, error } = useFetch(
    `https://rickandmortyapi.com/api/character?page=${page}`,
  );

  //DRY
  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
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
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={!data.info.prev}
        >
          Anterior
        </button>
        <p>
          Pagina {page} de {data.info.pages}
        </p>
        <button
          className="disabled:bg-gray-600 bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={!data.info.next}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
