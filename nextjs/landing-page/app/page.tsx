import Image from "next/image";
import Button from "./_components/atom/Button";
import SearchBar from "./_components/molecule/SearchBar";
import Section from "./_components/atom/Section";
import SearchBarWithButton from "./_components/molecule/SearchBarWithButton";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-cente font-sans">
      <SearchBar />
      <Section>
        <p>Contenido de la sección</p>
      </Section>
      <SearchBarWithButton />
    </div>
  );
}
