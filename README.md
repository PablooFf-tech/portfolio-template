# Plantilla de portfolio web

Portfolio por **pestañas** (Inicio, Sobre mí, Habilidades, Proyectos, Trayectoria, Contacto) con HTML/CSS/JS, componentes React embebidos (Vite), tema claro/oscuro, galería con modal, timelines y dock de contacto.

Está pensada para **cualquier profesión**: textos, habilidades, proyectos y experiencia son **placeholders** que sustituyes tú. No incluye datos reales ni claves de servicios.

Licencia **MIT** — ver [LICENSE](./LICENSE).

---

## Vista previa por secciones

| Sección | Captura |
|---------|---------|
| **Inicio** — hero, CTAs y accesos rápidos | ![Inicio](./docs/screenshots/01-inicio.png) |
| **Sobre mí** — bio, competencias y metodología opcional | ![Sobre mí](./docs/screenshots/02-sobre-mi.png) |
| **Habilidades** — tarjetas editables en HTML | ![Habilidades](./docs/screenshots/03-habilidades.png) |
| **Proyectos** — grid, filtros y modal (datos en JS) | ![Proyectos](./docs/screenshots/04-proyectos.png) |
| **Trayectoria** — experiencia y formación (JSON) | ![Trayectoria](./docs/screenshots/05-trayectoria.png) |
| **Contacto** — “Trabajemos juntos” + dock flotante | ![Contacto](./docs/screenshots/06-contacto.png) |

---

## Requisitos

- **Node.js** 20 LTS o superior  
- **npm** 9+

No hace falta base de datos ni variables de entorno para el funcionamiento básico.

---

## Instalación paso a paso

### 1. Obtener el código

```bash
git clone https://github.com/TU-USUARIO/TU-REPO-PLANTILLA.git mi-portfolio
cd mi-portfolio
```

(O copia la carpeta `portfolio-template` y renómbrala.)

### 2. Configuración del sitio (obligatorio)

```bash
cp site.config.example.ts site.config.ts
```

Edita `site.config.ts`: nombre, email, GitHub, LinkedIn, Cal.com, meta SEO y bloque legal.  
`site.config.ts` está en **`.gitignore`** para que no subas tus datos por error.

### 3. Dependencias

```bash
npm install
```

### 4. Desarrollo local

```bash
npm run dev
```

Abre la URL que muestra Vite (normalmente `http://localhost:5173`). Los cambios en React recargan solos; cambios en `index.html` / `js/*.js` recarga la página.

### 5. Build de producción

```bash
npm run build
npm run preview
```

El sitio servido en preview sale de **`dist/`** (es lo que despliegas).

---

## Personalización rápida

| Qué cambiar | Archivo |
|-------------|---------|
| Hero, habilidades, títulos de sección, footer, legales | [`index.html`](./index.html) |
| Contacto, GitHub, LinkedIn, SEO | [`site.config.ts`](./site.config.ts) |
| Proyectos, filtros, modal | [`js/projects.js`](./js/projects.js) + botones en `index.html` |
| Experiencia laboral y formación | [`data/career.json`](./data/career.json) → luego **`npm run build`** |
| Competencias (tarjetas en Sobre mí) | [`components/ui/competencies-cards.tsx`](./components/ui/competencies-cards.tsx) → **`npm run build`** |
| Dock flotante | [`components/ui/floating-contact-cards.tsx`](./components/ui/floating-contact-cards.tsx) |
| Bloque “Trabajemos juntos” | [`components/ui/lets-work-section.tsx`](./components/ui/lets-work-section.tsx) |

Guía detallada: [`docs/CUSTOMIZE-TEXT.md`](./docs/CUSTOMIZE-TEXT.md).

### Habilidades

En `index.html`, sección `#skills`: cambia `[Categoría N]` y cada `[Habilidad o herramienta]`. Puedes añadir o quitar tarjetas `.skill-card`.

### Proyectos

1. En `js/projects.js`, edita el array `PROJECTS_DATA` (títulos, imágenes, enlaces, etiquetas).  
2. Las claves `category` deben coincidir con `data-filter` de los botones en `index.html` (`destacado`, `creativo`, `otro` por defecto — renómbralos si quieres).  
3. Constante `PROJECTS_LINK_LABEL` = texto del botón de enlace en cada tarjeta.

### Experiencia laboral y formación

Edita **`data/career.json`** (arrays `work` y `education`). Solo texto y fechas; no toques React salvo que quieras cambiar el diseño del timeline.

Después:

```bash
npm run build
```

---

## Despliegue en Vercel

1. Sube el proyecto a GitHub (raíz del repo = esta carpeta).  
2. En [Vercel](https://vercel.com) → **Add New Project** → importa el repo.  
3. Ajustes recomendados:
   - **Framework Preset:** Vite  
   - **Build Command:** `npm run build`  
   - **Output Directory:** `dist`  
4. En el panel de Vercel, define variables de entorno **solo si** integras servicios (Analytics, etc.). La plantilla base no las necesita.  
5. Tras el deploy, sustituye en `index.html` los placeholders legales `[URL_WEB]` y `[NOMBRE_DOMINIO]`.

Opcional: [`vercel.json`](./vercel.json) y [`docs/CLOUDFLARE.md`](./docs/CLOUDFLARE.md).

---

## Regenerar capturas del README (mantenedores)

Con el preview en marcha:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
# otra terminal:
npm run screenshots
```

---

## Seguridad y privacidad

- [`docs/SECURITY.md`](./docs/SECURITY.md) — CSP, cabeceras, buenas prácticas.  
- [`docs/AUDITORIA-DATOS.md`](./docs/AUDITORIA-DATOS.md) — comprobación de que la plantilla no trae API keys ni datos personales.

**No subas:** `.env`, `site.config.ts` con tu email real en repos públicos (ya ignorado), tokens de Vercel/GitHub en el código.

---

## Scripts npm

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo Vite |
| `npm run build` | Typecheck + build → `dist/` + copia de `js/`/`css/` |
| `npm run preview` | Sirve `dist/` localmente |
| `npm run screenshots` | Capturas en `docs/screenshots/` (Playwright) |

---

## Estructura resumida

```text
portfolio-template/
├── index.html          # Contenido principal y pestañas
├── site.config.example.ts
├── data/career.json    # Experiencia y formación
├── js/projects.js      # Galería de proyectos
├── css/                # Estilos estáticos
├── components/ui/      # React (timelines, contacto, etc.)
├── src/main.tsx        # Entrada del bundle React
├── docs/screenshots/   # Imágenes del README
└── dist/               # Generado (no commitear)
```

---

## Qué no incluye el repositorio

- `node_modules/` — `npm install`  
- `dist/` — `npm run build`  
- `.vercel/` — al vincular CLI  
- Datos personales del autor — solo placeholders y `site.config.example.ts`
