# Koi Labs Solutions SpA — Landing Page

Landing page profesional para **Koi Labs Solutions SpA**, hecha con Next.js 14, Tailwind CSS y TypeScript. Lista para publicar en Vercel.

---

## 🚀 Puesta en marcha (local)

Necesitas tener **Node.js 18.17 o superior** instalado ([descargar aquí](https://nodejs.org)).

```bash
# 1. Instalar dependencias (solo la primera vez)
npm install

# 2. Levantar el sitio en modo desarrollo
npm run dev
```

Luego abre **http://localhost:3000** en tu navegador. Los cambios se ven al instante.

---

## ✏️ Lo primero que debes editar

Todos los datos de la empresa están en **un solo archivo**:

### `lib/site.ts`

Ahí cambias (los valores actuales son de ejemplo):

| Campo             | Qué es                                             |
| ----------------- | -------------------------------------------------- |
| `whatsapp`        | ⚠️ Tu número de WhatsApp **real** (ver formato abajo) |
| `email`           | Correo de contacto de la empresa                   |
| `phoneDisplay`    | Cómo se muestra el teléfono en pantalla            |
| `location`        | Ciudad / país                                      |
| `social`          | Links de Instagram, LinkedIn, GitHub (opcional)    |
| `whatsappMessage` | Mensaje que aparece prellenado al escribir         |

**Formato del WhatsApp:** solo números, sin `+`, espacios ni guiones.
Ejemplo Chile: si tu número es +56 9 8765 4321 → escribe `56987654321`.

---

## 🎨 Personalizar

- **Colores / estilos globales:** `tailwind.config.ts` y `app/globals.css`
- **Textos de cada sección:** están dentro de cada componente en `components/`
  - `Hero.tsx` — titular principal y métricas
  - `Services.tsx` — los 6 servicios
  - `Tech.tsx` — el stack de tecnologías
  - `About.tsx` — sección "Nosotros"
  - `Process.tsx` — pasos de trabajo
  - `Contact.tsx` — formulario y datos de contacto
  - `Footer.tsx` — pie de página

---

## ☁️ Publicar en Vercel

1. Sube este proyecto a un repositorio en GitHub.
2. Entra a [vercel.com](https://vercel.com) e inicia sesión con GitHub.
3. **Add New → Project** → selecciona el repositorio.
4. Vercel detecta Next.js automáticamente. Haz clic en **Deploy**.
5. ¡Listo! En unos segundos tendrás tu URL en vivo.

> Cada vez que hagas `git push`, Vercel actualiza el sitio solo.

---

## 📁 Estructura

```
app/
  layout.tsx      → configuración global, fuentes, SEO
  page.tsx        → arma todas las secciones
  globals.css     → estilos base y utilidades
components/        → cada sección de la landing
lib/
  site.ts         → ⭐ datos de la empresa (edita aquí)
```

---

Hecho con Next.js · Koi Labs Solutions SpA · 2026
