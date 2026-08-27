# Sitio web — IE Bicentenario 1267 "La Campiña"

Sitio web institucional reconstruido para la Institución Educativa Bicentenario 1267 - La Campiña
(Lurigancho, Lima), en reemplazo del sitio original que quedó sin acceso ni repositorio.

## Stack

- React 18 + Vite
- React Router (navegación entre páginas)
- Tailwind CSS (estilos)
- lucide-react (iconos)

## Páginas

- `/` — Inicio
- `/nosotros` — Historia, equipo directivo, misión/visión/valores, propuesta pedagógica y de gestión
- `/infraestructura` — Niveles educativos y espacios especializados
- `/noticias` — Espacio para noticias (actualmente vacío; antes dependía de un Supabase que ya no existe)
- `/admision` — Proceso de admisión y formulario de solicitud (envía por correo vía `mailto:`)
- `/contacto` — Datos de contacto, mapa y formulario (envía por correo vía `mailto:`)

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
```

Esto genera la carpeta `dist/` lista para servir de forma estática.

## Despliegue en EasyPanel (VPS del colegio)

Este repo incluye un `Dockerfile` que compila el proyecto y lo sirve con nginx.

1. En EasyPanel, crea un nuevo servicio de tipo **App** (o "Git-based service").
2. Conéctalo a este repositorio de GitHub.
3. EasyPanel detectará el `Dockerfile` automáticamente y lo usará para el build y despliegue.
4. Configura el dominio del colegio apuntando al servicio (registro A del DNS hacia la IP del VPS,
   o el subdominio que EasyPanel asigne).
5. Activa SSL (Let's Encrypt) desde el propio panel de EasyPanel.

Cada vez que se haga `git push` a la rama principal, se puede configurar el auto-deploy en
EasyPanel para que el sitio se actualice solo.

## Notas importantes

- El módulo de **Noticias** y el **login (/auth)** del sitio original dependían de un proyecto de
  Supabase que ya no existe. Este sitio nuevo NO reconstruye esa parte de backend todavía: hay que
  decidir si se necesita realmente (paso siguiente sugerido: evaluar si "Noticias" e "Iniciar
  Sesión" son necesarios, y si sí, levantar un backend propio bajo control de la empresa/colegio,
  no de una cuenta personal).
- Los formularios de Admisión y Contacto actualmente abren el cliente de correo del usuario
  (`mailto:`) con los datos precargados, para que funcionen sin backend. Se puede reemplazar más
  adelante por un servicio como Formspree, EmailJS, o un endpoint propio si se prefiere que el
  envío sea automático sin depender del cliente de correo del visitante.
- Contenido e imágenes se extrajeron del sitio anterior (aún visible en
  https://www.ie1267bicentenario.edu.pe/) ya que no había acceso al código ni repositorio
  original.
