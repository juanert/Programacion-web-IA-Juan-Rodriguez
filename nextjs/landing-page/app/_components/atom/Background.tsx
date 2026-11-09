"use client";
import { useContext } from "react";
import { ThemeContext } from "../../_context/Theme";

export default function Background({children}: {children: React.ReactNode}) {
  const { theme, toggleTheme }: {theme: string, toggleTheme: () => void } = useContext(ThemeContext);
  return (
    <div className={theme === "light" ? `bg-white min-h-[400px] flex flex-col` : `bg-gray-800 min-h-[400px] flex flex-col`}>
       {children}
       <button onClick={toggleTheme} className="mt-auto p-2 bg-blue-500 text-white rounded">
        Cambiar tema a {theme === "light" ? "oscuro" : "claro"}
      </button>
    </div>
  );
}