# Personalizar textos

La plantilla incluye **textos de ejemplo**. Sustitúyelos por los tuyos antes de publicar.

## Archivos principales

| Qué cambiar | Dónde |
|-------------|--------|
| Nombre, email, GitHub, LinkedIn, ciudad | `site.config.ts` (copia desde `site.config.example.ts`) |
| Hero, about, **habilidades** (tarjetas en `#skills`), footer | `index.html` |
| Proyectos | `js/projects.js` |
| Experiencia y formación (timelines) | `data/career.json` → luego `npm run build` |
| Tarjetas de competencias | `components/ui/competencies-cards.tsx` → luego `npm run build` |
| Contacto flotante / dock | `components/ui/floating-contact-cards.tsx` |
| Sección “Trabajemos juntos” | `components/ui/lets-work-section.tsx` |

## Habilidades (cualquier sector)

La sección **Habilidades** no trae stack de informática fijo: verás `[Categoría N]` y `[Habilidad o herramienta]`. Sustituye categorías (p. ej. «Atención al cliente», «Diseño», «Idiomas») y cada viñeta por lo tuyo. Puedes duplicar o borrar tarjetas `.skill-card` en `index.html`.

Los **filtros de proyectos** (`destacado`, `creativo`, `otro`) también son genéricos; renómbralos en `index.html` y usa las mismas claves en `category` dentro de `js/projects.js`.

## Placeholders habituales

En `index.html` y legales verás marcadores como:

- `[NOMBRE_COMPLETO]`, `[TU_CIUDAD]`, `[TU_PAÍS]`
- `[DOMICILIO]`, `[NIF_CIF]`, `[TELEFONO]`
- `[URL_WEB]`, `[NOMBRE_DOMINIO]`
- `[AUTORIDAD_DATOS]`, `[URL_AUTORIDAD_DATOS]`

## Páginas legales

Las pestañas **Aviso legal**, **Privacidad** y **Cookies** son una **base genérica** con huecos. No están ligadas a una ciudad concreta. Adapta el texto a tu país o elimina esas secciones del menú si no las necesitas.

## Idioma de la interfaz

El HTML está en español por defecto. Puedes traducir `index.html` y las etiquetas en `site.config.ts` / componentes React a cualquier idioma.
