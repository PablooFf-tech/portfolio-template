# Auditoría de datos sensibles (plantilla)

Revisión orientativa del contenido **publicable** en `portfolio-template/` (sin `node_modules/`).

## Resultado

| Comprobación | Estado |
|--------------|--------|
| Claves API (`sk-`, `ghp_`, `AIza…`, tokens Bearer, etc.) | No encontradas en fuentes editables |
| Archivos `.env` / secretos locales | No incluidos; `.env*` en `.gitignore` |
| `site.config.ts` con datos personales | En `.gitignore`; en repo solo `site.config.example.ts` con placeholders |
| Email / contacto en plantilla | `contacto@ejemplo.com`, `tu-usuario`, `tu-perfil` |
| URLs externas | GitHub/LinkedIn/Cal.com de ejemplo, placehold.co, `ejemplo.com` |
| Carpeta `.vercel/` | Ignorada (no se sube al fork) |

## Qué debes configurar tú (nunca subir al repo público)

- Copia `site.config.example.ts` → `site.config.ts` y pon **tu** email, GitHub y LinkedIn.
- No commitees `.env`, claves de Analytics, Stripe, etc.
- Si añades Google Analytics u otro script, usa variables de entorno en Vercel, no las pegues en el HTML del repo.

## Cómo repetir la búsqueda

```bash
cd portfolio-template
rg -i "ghp_|sk-[a-z]|AIzaSy|xox[baprs]-|pablo|zyra" \
  --glob '!node_modules/**' --glob '!dist/**' \
  --glob '!**/contact-cards-bundle.js' --glob '!**/main-bundle.js'
```

Si aparece algo en bundles minificados, suele ser código de React (`SECRET_INTERNALS`), no tus credenciales.
