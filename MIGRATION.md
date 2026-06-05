# Migración Netlify + Cloudinary → Cloudflare ($0/mes objetivo)

Estado: **Fase 1 (hosting) implementada en código.** Fases 2–3 (media → R2) documentadas, pendientes de ejecutar.

---

## Resumen ejecutivo

| Área | Antes | Después | Costo |
|------|-------|---------|-------|
| Hosting | Netlify (Next runtime, plugin) | **Cloudflare Pages** (export estático) | $0 — sin límite de banda/deploys |
| Imágenes | Cloudinary (271 refs, `f_auto,q_auto`) | **Cloudflare R2** + optimizadas en build | $0 egress |
| Videos | Cloudinary + algunos en `/public` | **Cloudflare R2** directo | $0 egress |
| **Total estimado** | **~$35/mes** | **~$0/mes** (ver detalle abajo) | |

### Estado actual de la migración de media (verificado por curl contra R2)

Bucket real: **`cswebsite`** · Public Access **Enabled** · Base: `https://pub-c45392de4794447390623deb4dca4edd.r2.dev`
Estructura: `PROJECTS/<FOLDER>/IMGS/WEBp/[CARROUSEL|CARROUSEL N|PORTADAS|]/<stem>-<name>.webp`

| Proyecto | Estado | Nota |
|----------|--------|------|
| design-week-mexico | ✅ 100% en R2 | 18/18 assets → HTTP 200 |
| eco-al-infinito | ✅ 100% en R2 | 38 imgs + 11 carouseles + 2 portadas → 200 (videos Vimeo intactos) |
| mas-alla-del-infinito | ✅ R2 salvo img6/img12 | esos 2 son GIFs animados → siguen en Cloudinary |
| alterego | ✅ imágenes en R2 | 17 imgs + 2 portadas → 200. **Videos v1-v7 siguen en Cloudinary** (no están en R2). ⚠️ se perdieron los transforms `w_400…w_2000`: R2 sirve full-size → pendiente generar variantes responsive |
| mutek | 🟡 parcial en R2 | img1 + 7 carouseles en R2; img2-11, hero GIF y mp4 siguen en Cloudinary (no están en R2) |

Pendiente de subir a R2: imágenes faltantes de Mutek (img2-11) + hero GIF + mp4, todos los VIDEOS (mutek, alterego v1-v7, túnel), variantes responsive de alterego, los ~60 del carousel de Perfil, fondo del NavMenu, los 2 GIFs de mas-alla.

---

## Por qué este sitio puede ser 100% estático

Auditoría del código (no suposiciones):

- **App Router (Next 16.1.6)**, sin `middleware`, sin `app/api`, sin route handlers, sin server actions, sin `fetch` de datos en servidor, sin ISR.
- `generateMetadata` y `app/sitemap.ts` corren **en build** → compatibles con export.
- `/project/[slug]` sale de un **registry fijo de 5 proyectos** (`src/projects/registry.ts`).
- Las páginas son client components (`'use client'`) con GSAP / Three.js / Lenis — todo client-side.

→ `output: 'export'` es viable. Único bloqueante encontrado: `[slug]` no tenía `generateStaticParams` (ya resuelto).

---

## FASE 1 — Hosting a Cloudflare Pages (implementada)

### Cambios de código aplicados

1. **`next.config.ts`**
   - `output: 'export'` → build genera `./out` (estático).
   - `images.unoptimized: true` → no hay servidor de optimización en estático; Cloudinary/R2 ya sirven optimizado.
2. **`app/project/[slug]/layout.tsx`**
   - `generateStaticParams()` → pre-renderiza 1 HTML por proyecto.
   - `export const dynamicParams = false` → slugs desconocidos → 404.
3. **`public/_headers`** → cacheo de Pages (assets hasheados `immutable`, media 7 días, headers de seguridad).
4. **`netlify.toml`** → ajustado a estático (`publish = "out"`, sin plugin runtime) como fallback durante el cutover. **Borrar tras el cutover.**

### Configuración de Cloudflare Pages (dashboard)

Conectar el repo de GitHub en **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git** y usar:

| Setting | Valor |
|---------|-------|
| Framework preset | **Next.js (Static HTML Export)** |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | `/` |
| Node version | `20` (variable de entorno `NODE_VERSION=20`) |

> El proyecto usa **pnpm** (`pnpm-lock.yaml`). Cloudflare detecta pnpm por el lockfile y corre `pnpm install` automáticamente. El build command `npm run build` igual funciona (ejecuta el script); si preferís consistencia, usá `pnpm build`.

### Variables de entorno (Pages → Settings → Environment variables)

Para Fase 1 (assets siguen en Cloudinary) **no hace falta ninguna**. Para Fase 2/3:

```
NEXT_PUBLIC_ASSET_PROVIDER = r2
NEXT_PUBLIC_R2_BASE        = https://<bucket-public-id>.r2.dev/cs-assets
```

(`.env*` está gitignoreado → estas variables se cargan en el dashboard, no en el repo.)

### Incompatibilidades / pasos manuales

- **Netlify Functions:** ✅ No existe ninguna (no hay carpeta `functions/` ni `netlify/functions`). **Nada que portar a Workers.**
- **Redirects/`_redirects`:** ✅ No había ninguno en Netlify. No se necesita en Pages (sitio multipágina; el 404 lo maneja `out/404.html` que Pages usa automáticamente).
- **`next/image`:** con `unoptimized: true` se sirve la URL tal cual. Los 3 usos (`ComingSoon`, `Navbar`, `NavMenu`) son simples (sin `placeholder="blur"` ni imports estáticos) → sin impacto visual.
- **Google Analytics (`gtag`):** carga client-side (`afterInteractive`) → funciona igual en estático.
- **Verificación local antes de deploy:** `npm run build` y servir `out/` (ej. `npx serve out`). Revisar que `/`, `/profile`, `/contact` y los 5 `/project/<slug>` rendericen.

### Cutover de DNS

1. Deploy en Pages, validar en `*.pages.dev`.
2. En Cloudflare Pages → **Custom domains** → agregar `constanzaschwartz.com` + `www`.
3. Mover el DNS del dominio a Cloudflare (o apuntar CNAME a `*.pages.dev`).
4. Validado el dominio en Pages → **eliminar el sitio de Netlify** y borrar `netlify.toml`.

---

## FASE 2 — Switch de provider de assets (pendiente)

El `.env.example` ya preveía esto (`NEXT_PUBLIC_ASSET_PROVIDER=cloudinary|r2`), pero `src/utils/cloudinary.ts` está hardcodeado a Cloudinary. Plan:

1. Renombrar/crear `src/utils/assets.ts` con un resolver que lea `NEXT_PUBLIC_ASSET_PROVIDER`:
   - `cloudinary` → comportamiento actual (`cldImg/cldVideo/cldGif`).
   - `r2` → arma URL `${NEXT_PUBLIC_R2_BASE}/<path>` apuntando a variantes ya optimizadas.
2. Mantener la **misma firma** (`cldImg(publicId, transforms)`) para no tocar los 267 call-sites, o exponer `assetImg/assetVideo` y migrar imports gradualmente.
3. Default `cloudinary` → permite hacer rollback con una env var.

> Beneficio del diseño: con el switch, se puede migrar y volver atrás sin tocar código, solo cambiando `NEXT_PUBLIC_ASSET_PROVIDER` en Pages.

---

## FASE 3 — Migrar media a R2 (pendiente, por tandas)

### Crear el bucket R2

1. Cloudflare → **R2 → Create bucket** → `cs-assets`.
2. Habilitar **acceso público** (R2.dev subdomain) o, mejor, conectar un dominio/CDN custom (`cdn.constanzaschwartz.com`) para cacheo en el edge.
3. R2 **no cobra egress** → la banda de servir imágenes/videos es $0. Solo se paga almacenamiento ($0.015/GB-mes; 10 GB gratis).

### Optimizar antes de subir (clave para performance y peso)

Pipeline recomendado (script de build/CLI con `sharp` o `cwebp`/`avifenc`):

- **Imágenes:** generar **AVIF + WebP** y variantes responsive (ej. 480 / 960 / 1440 / 1920 px de ancho). Servir con `srcset`/`sizes`.
- **GIFs animados** (ej. `IMG_GIF1/2` de mas-alla, portada Mutek): convertir a **MP4/WebM** (10–20× más livianos que GIF) y usar `<video autoplay muted loop playsinline>`.
- **Videos:** re-encodear a **H.264/AAC MP4** (y opcional **WebM/VP9**) a bitrate web. Ya hay versiones `_mobile_opt` en `/public` como referencia.

### Prioridad (atacar primero lo que más banda/transformaciones consume en Cloudinary)

1. **Videos** (`mutek vid1`, `alterego` vids) — el video es lo más caro en créditos de Cloudinary.
2. **GIFs animados** — pesados y con transformación `fl_animated`.
3. **Imágenes de proyecto y carouseles** (la mayoría de las 271 refs).
4. Backgrounds y perfil.

> Tenés los assets en Drive + las URLs públicas → se pueden bajar los originales, optimizar localmente y subir a R2 con `wrangler r2 object put` o `rclone`.

### Fuente de los IDs

Todos los `publicId` de Cloudinary están centralizados en:
- `src/utils/cloudinary.ts` (helpers)
- `src/projects/*/assets.ts`, `src/projects/*/gallery.ts`, `src/projects/*/meta.ts`
- `src/components/profile/ProfilePage.tsx` (carouseles de perfil — ~60 imágenes)
- `src/components/layout/NavMenu.tsx`
- `src/projects/mas-alla-del-infinito/index.tsx` (2 GIFs literales)

---

## Post-migración: CORS (portadas) + UX del carousel

### CORS — OBLIGATORIO para las portadas
La home renderiza las portadas como **texturas WebGL** (`crossOrigin='anonymous'`). R2 r2.dev no manda `Access-Control-Allow-Origin` por default → el browser bloquea la textura y la portada no aparece. **Acción manual** en R2 → bucket `cswebsite` → **Settings → CORS Policy**:

```json
[
  {
    "AllowedOrigins": ["https://constanzaschwartz.com", "https://www.constanzaschwartz.com", "http://localhost:3000"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```
(Las `<img>` normales no necesitan CORS; solo canvas/WebGL.)

### Carousel — LQIP + preload eager
- `scripts/gen-lqip.mjs` (devDep `sharp`) genera placeholders borrosos minúsculos de las 50 imágenes de carousel → `src/data/lqip.ts`. Regenerar tras cambiar carouseles: `pnpm gen:lqip`.
- `Carousel.tsx`: muestra el LQIP al instante (imagen borrosa con el aspect real → se mueve desde el frame 1, nunca negro), la imagen full fadea encima al decodificar. `rootMargin` 800px + prop `priority` en el primer carousel de cada proyecto.

## Detalle de costos esperados

- **Cloudflare Pages (free):** builds 500/mes, banda **ilimitada**, requests ilimitados → **$0**.
- **Cloudflare R2 (free tier):** 10 GB almacenamiento, 1M class-A ops/mes, 10M class-B ops/mes, **egress $0**.
  - El catálogo entero (imágenes optimizadas + videos web) debería entrar holgado en 10 GB. Si se pasa: **$0.015/GB-mes** (ej. 20 GB ≈ $0.15/mes).
- **Cloudinary:** se elimina (o queda como fallback gratis bajo 25 créditos si se deja el switch en `cloudinary`).

**Total esperado: $0/mes** (peor caso, si R2 supera 10 GB, centavos por GB extra).

---

## Checklist de cutover

- [ ] `npm run build` local OK, `out/` sirve bien las 8 rutas.
- [ ] Pages conectado al repo, build verde, preview en `*.pages.dev` OK.
- [ ] Custom domain + DNS en Cloudflare.
- [ ] (Fase 2) `src/utils/assets.ts` con switch de provider.
- [ ] (Fase 3) Bucket R2 + assets optimizados subidos por tanda.
- [ ] `NEXT_PUBLIC_ASSET_PROVIDER=r2` en Pages, validar visualmente.
- [ ] Apagar Netlify + borrar `netlify.toml`.
- [ ] Bajar/eliminar plan pago de Cloudinary.
