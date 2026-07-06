# 📊 Análisis de Rendimiento — Koi Labs Landing

Medición realizada sobre el build de producción (`npm run build`) con **Next.js 16.2.9 + React 19**.

## Resumen ejecutivo

> **Veredicto: rendimiento excelente para una landing.** Todo el sitio se genera
> como HTML estático (SSG), lo que en Vercel se sirve desde CDN con carga casi
> instantánea. La carga inicial pesa ~**120 KB comprimidos**, muy por debajo del
> promedio de la web (~2 MB).

## Peso real por página (transferido al usuario, gzip)

| Recurso                     | Sin comprimir | Comprimido (gzip) |
| --------------------------- | ------------- | ----------------- |
| HTML inicio (`/`)           | 78.5 KB       | **13.3 KB**       |
| CSS global (todo el sitio)  | 27.1 KB       | **5.9 KB**        |
| JavaScript de carga inicial | ~430 KB       | ~**100 KB**       |
| **Total primera visita**    | —             | **≈ 120 KB**      |

> A partir de la 2.ª visita, JS y CSS quedan cacheados: cada página nueva pesa
> solo unos pocos KB de HTML.

## Páginas y estrategia de render

| Ruta                        | Tipo             | Peso HTML (gzip) |
| --------------------------- | ---------------- | ---------------- |
| `/`                         | ○ Estática (SSG) | 13.3 KB          |
| `/politica-de-privacidad`   | ○ Estática (SSG) | ~6 KB            |
| `/terminos-y-condiciones`   | ○ Estática (SSG) | ~6 KB            |

`○ Estática` = pre-generada en el build. No hay servidor calculando nada en cada
visita → respuesta inmediata y costo de hosting mínimo.

## Optimizaciones ya aplicadas ✅

- **Renderizado estático (SSG):** las 3 páginas se sirven como HTML plano.
- **Fuentes optimizadas:** Inter y Space Grotesk vía `next/font` (autoalojadas,
  sin peticiones a Google, con `display: swap` para evitar texto invisible).
- **CSS mínimo:** Tailwind purga las clases no usadas → un único archivo de 6 KB.
- **JS bien dividido (code-splitting):** solo los componentes interactivos
  (menú, formulario, animaciones) cargan JavaScript; el resto es HTML puro.
- **Animaciones eficientes:** solo `transform`/`opacity` (aceleradas por GPU) y
  reveal por `IntersectionObserver` (no bloquea el hilo principal).
- **Accesibilidad de movimiento:** respeta `prefers-reduced-motion`.
- **Imágenes:** cero imágenes pesadas — el logo y todos los íconos son SVG
  vectoriales embebidos (nítidos y livianos).
- **SEO:** metadatos, Open Graph, `lang="es"` y títulos por página.

## Métricas Core Web Vitals esperadas

Al ser estático y liviano, se esperan valores en verde:

- **LCP** (carga del contenido principal): < 1.5 s ✅
- **CLS** (estabilidad visual): ~0 ✅ (fuentes con swap + layout reservado)
- **INP** (interactividad): bajo ✅ (poco JS)
- **Lighthouse estimado:** 95–100 en Performance para la mayoría de conexiones.

## Cómo medirlo tú mismo

```bash
# 1. Build + servidor de producción
npm run build
npm run start

# 2. En Chrome, abre http://localhost:3000
#    → F12 → pestaña "Lighthouse" → "Analyze page load"
```

O en producción, usa **https://pagespeed.web.dev** con la URL de Vercel.

## Recomendaciones a futuro (opcional)

1. **Imagen Open Graph:** agregar un `opengraph-image.png` (1200×630) para que
   el sitio se vea atractivo al compartirlo en redes/WhatsApp.
2. **Analítica ligera:** si quieren medir visitas, usar Vercel Analytics o
   Plausible (mínimo impacto en rendimiento).
3. **Dominio propio + HTTPS:** Vercel lo entrega automáticamente; solo apuntar
   el dominio `koilabs.cl`.
4. **`sitemap.xml` y `robots.txt`:** fáciles de añadir en Next para mejorar SEO
   cuando el sitio esté en su dominio final.

---

_Medido el 1 de julio de 2026 sobre el build local._
