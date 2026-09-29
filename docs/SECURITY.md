# 🔒 Documentación de Seguridad del Proyecto (Security Specification)

Este documento detalla la arquitectura de seguridad, la matriz de superficie de ataque, las políticas de cabeceras HTTP (CSP) y las directrices de mantenimiento defensivo del proyecto **Portfolio Template**.

---

## 🏗️ 1. Arquitectura del Sistema

```
[ VISITOR ]
     │
     ▼ (HTTPS + TLS 1.3)
[ CLOUDFLARE EDGE ] ─── (WAF, Bot Fight Mode, DDoS Mitigation)
     │
     ▼ (Secure Proxy)
[ VERCEL / NETLIFY / NGINX ] ─── (HTTP Security Headers Injection)
     │
     ▼
[ CLIENT SPA (React 18 / Static Assets) ]
```

- **Modelo de Aplicación:** Client-Side Single Page Application (SPA) estática.
- **Backend / API / BD:** Inexistente en este repositorio.
- **Autenticación:** Inexistente (Todos los recursos son públicos).

---

## 🛡️ 2. Cabeceras HTTP de Seguridad (Security Headers)

Las cabeceras de seguridad están configuradas a nivel de hosting en [`vercel.json`](../vercel.json) y [`public/_headers`](../public/_headers):

| Cabecera | Configuración | Propósito |
| :--- | :--- | :--- |
| **Content-Security-Policy** | Restrictiva por origen | Mitiga vectores XSS e inyección no autorizada de scripts/estilos. |
| **X-Frame-Options** | `DENY` | Evita ataques de Clickjacking prohibiendo la incrustación en iFrames. |
| **X-Content-Type-Options** | `nosniff` | Previene que el navegador interprete archivos con tipos MIME alterados. |
| **Referrer-Policy** | `strict-origin-when-cross-origin` | Evita la fuga de URLs completas e información de origen hacia terceros. |
| **Permissions-Policy** | `camera=(), microphone=(), geolocation=()` | Desactiva el acceso no autorizado a APIs de hardware del dispositivo. |
| **Strict-Transport-Security** | `max-age=31536000; includeSubDomains; preload` | Forzar todas las conexiones del navegador a ser TLS/HTTPS por 1 año. |

---

## 📋 3. Matriz de Fuentes Externas (Content Security Policy)

| Dominio Externo | Recurso Solicitado | Necesario | Política CSP | Evaluación de Riesgo |
| :--- | :--- | :---: | :--- | :--- |
| `fonts.googleapis.com` | Hoja de estilos de fuentes | Sí | `style-src` | Bajo (CDN oficial de Google Fonts) |
| `fonts.gstatic.com` | Archivos de fuentes WOFF2 | Sí | `font-src` | Bajo (Servidor de tipografía oficial) |
| `cdnjs.cloudflare.com` | Font Awesome CSS | Sí | `style-src`, `font-src` | Bajo (CDN de Cloudflare) |
| `api.github.com` | Datos públicos de GitHub | Sí | `connect-src` | Bajo (API REST pública de GitHub) |
| `cal.com` | Enlace de agendamiento | Sí | `frame-src` | Bajo (Servicio de reuniones externo) |

---

## 📦 4. Gestión de Dependencias y Supply Chain

1. **Local Bundling First:** Todos los scripts de componentes principales (React, Lucide icons, Framer Motion) se sirven localmente desglosados en bundles estáticos minificados (`js/contact-cards-bundle.js`, `js/lucide.min.js`).
2. **Prohibición de `@latest`:** No se permiten llamadas a scripts externos CDN con la etiqueta `@latest`.
3. **Auditorías automatizadas:** Ejecutar periódicamente `npm audit` para detectar vulnerabilidades en el árbol de dependencias de Node.js.

---

## ⚠️ 5. Manejo Global de Errores (React Error Boundary)

Toda la hidratación de componentes de React en [`src/main.tsx`](../src/main.tsx) se encuentra envuelta dentro del componente [`ErrorBoundary`](../src/components/ErrorBoundary.tsx).

- **Comportamiento:** En caso de excepción no controlada en tiempo de ejecución, el árbol de renderizado captura el fallo y muestra un aviso seguro al usuario permitiendo la recarga sin exponer stack traces ni rutas internas de compilación.

---

## 📞 6. Plan de Respuesta ante Incidentes Básicos (Incident Response Plan)

1. **Compromiso de CDN / Dominio:** Cambiar inmediatamente los registros DNS en Cloudflare a modo de mantenimiento y revocar claves de API/Tokens si existieran.
2. **Detección de Vulnerabilidad en Dependencia:** Actualizar el paquete específico vía `npm update <package>` o aplicar parches de versión fija en `package.json`.
