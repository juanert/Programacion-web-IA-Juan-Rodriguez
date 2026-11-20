# Ejemplo Login

Ejemplo de Next.js con App Router, TypeScript y Tailwind CSS. La autenticación es una simulación local para practicar con el almacenamiento del navegador.

## Ejecutar

Desde `nextjs/ejemplo-login`, con Node.js 20.9 o posterior:

```bash
npm ci
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). El registro usa Web Crypto y requiere `localhost` o HTTPS.

## Flujo

- `/` abre `/login`. En `/register` puedes crear una cuenta local. El navegador guarda el nombre, el correo y un derivado de la contraseña con sal en `localStorage`.
- Al ingresar, `sessionStorage` guarda la sesión de la pestaña. Una cookie de sesión guarda el identificador que también puede leer Next.js. Hay una sesión activa por navegador y origen. Iniciar sesión en otra pestaña reemplaza la anterior.
- `src/proxy.ts` y `src/app/(protected)/template.tsx` comprueban el formato del identificador de la cookie. `src/app/(protected)/home/page.tsx` lo compara con la sesión de la pestaña y verifica que la cuenta siga en `localStorage`. Si falla alguna comprobación, el usuario va a `/404`.
- Cerrar sesión elimina el identificador de la pestaña y la cookie. La cuenta queda disponible para volver a iniciar sesión.

Como el cliente controla todos los datos, este flujo solo sirve como ejemplo didáctico. Usa credenciales de prueba.

## Atomic Design

Los átomos (`atoms`) son los controles básicos. Las moléculas (`molecules`) agrupan controles y etiquetas. Los organismos (`organisms`) componen el formulario y el resumen de cuenta. Las plantillas (`templates`) definen la distribución de las vistas y las páginas de `src/app` completan la composición de cada ruta.
