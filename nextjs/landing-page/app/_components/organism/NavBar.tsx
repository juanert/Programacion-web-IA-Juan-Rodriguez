import Button from "../atom/Button";

export default function NavBar() {
  return (
    <nav className="p-4">
      <p className="text-white text-lg font-bold">Mi sitio web</p>
      <Button
        text="Ir a contacto"
        styles="bg-green-500 hover:bg-green-600"
        route="/contacto"
      />
    </nav>
  );
}

export function ButtonExample() {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Click me
    </button>
  );
}
