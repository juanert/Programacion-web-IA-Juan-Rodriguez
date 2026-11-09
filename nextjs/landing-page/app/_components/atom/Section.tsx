"use client";
import { useContext } from "react";
import { ThemeContext } from "../../_context/Theme";

export default function Section({children}: {children: React.ReactNode}) {
  const { theme, toggleTheme }: {theme: string, toggleTheme: () => void } = useContext(ThemeContext);
  return (
    <section className={theme === "light" ? `bg-white min-h-[400px] flex flex-col` : `bg-gray-800 min-h-[400px] flex flex-col`}>
       {children}
       <button onClick={toggleTheme} className="mt-auto p-2 bg-blue-500 text-white rounded">
        Cambiar tema a {theme === "light" ? "oscuro" : "claro"}
      </button>
    </section>
  );
}
