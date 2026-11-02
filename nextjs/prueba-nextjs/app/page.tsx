import Link from "next/link";
import Image  from "next/image";

export default function Home() {
  return (
    <>
      <p className="text-red-600">Hola</p>
      <p>Mundo</p>
      <div className="flex flex-col gap-4 p-8">
        <Boton texto="hola" bgColor="bg-red-600"></Boton>
        <Boton texto="presioname" bgColor="bg-blue-600"></Boton>
        <Boton texto="mundo"></Boton>
        <Boton texto="Haz click aqui"></Boton>
        <Boton texto="hola"></Boton>
        <Titular texto="Ejemplo"></Titular>
        <Titular texto="Ejemplo"></Titular>
        <Titular texto="Ejemplo"></Titular>
        <Link href="/contacto"> Ir a pagina de contacto</Link>
        <a href="https://www.youtube.com" target="_blank">
          Ir a youtube
        </a>
        <Image
          src="/zufoto_logo_transp_yellow.png"
          alt="Logo"
          width={200}
          height={200}
        />
      </div>
    </>
  );
}

/*
  Abstraccion, una forma simplificada de pasar valores de propiedades a variables individuales
  En el ejemplo uno para llamar a texto tendria que escribir propiedades.texto
  1)let propiedades = {texto: "hola", bgColor: "blue"}
  Pero en este segundo ejemplo estoy guardando la propiedad texto en una variable con el mismo nombre y se puede utilizar como una variable normal
  es decir, para llamar a texto solo tendria que escribir "texto"
  2){texto, bgColor} = {texto: "hola", bgColor: "blue"}
*/

function Boton({
  texto,
  bgColor = "bg-green-600",
}: {
  texto: string;
  bgColor?: string;
}) {
  return (
    <button className={`${bgColor} px-4 py-2 rounded-md text-white`}>
      {texto}
    </button>
  );
}

function Titular({ texto }: { texto: string }) {
  return <h1 className="font-bold text-4xl ">{texto}</h1>;
}

/*
  Realiza un componente llamado titular que reciba un texto como
  parametro. Y que sirve para mostrar siempre un texto como un titular con los mismos estilos

  Usa este componente 3 veces con distintos valores dentro del componente Home
*/
