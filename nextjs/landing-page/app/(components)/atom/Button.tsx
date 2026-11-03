import Link from "next/link";

export default function Button({text, styles = "bg-blue-600", route}: {text: string, styles?: string, route?: string}) {
  if(!route) {
    return(
      <button className={`px-4 py-2 rounded ${styles}`}>
        {text}
      </button>
    )
  }
  return(
    <Link href={route}>
      <button className={`px-4 py-2 rounded ${styles}`}>
        {text}
      </button>
    </Link>
  )
}