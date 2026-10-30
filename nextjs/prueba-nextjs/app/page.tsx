export default function Home() {
  return (
    <>
      <p className="text-red-600">Hola</p>
      <p>Mundo</p>
      <div className="flex flex-col gap-4 p-8">
        <Boton texto="hola" bgColor="bg-red-600"></Boton>
        <Boton texto="presioname"></Boton>
        <Boton texto="mundo"></Boton>
        <Boton texto="Haz click aqui"></Boton>
        <Boton texto="hola"></Boton>
      </div>
    </>
  );
}

function Boton(
  propiedades: { texto: string; bgColor?: string }
) {
  return (
    <button
      className={`${propiedades.bgColor} px-4 py-2 rounded-md text-white`}
    >
      {propiedades.texto}
    </button>
  );
}

/*
  Realiza un componente llamado titular que reciba un texto como
  parametro. Y que sirv apara mostrar siempre un texto como un titular con los mismos estilos

  Usa este componente 3 veces con distintos valores dentro del componente Home
*/
