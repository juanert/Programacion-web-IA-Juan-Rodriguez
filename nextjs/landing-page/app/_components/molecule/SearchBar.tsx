"use client";
import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  return (
    <>
      <input
        type="text"
        placeholder="Escribe algo..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <p>{search}</p>
    </>
  );
}
