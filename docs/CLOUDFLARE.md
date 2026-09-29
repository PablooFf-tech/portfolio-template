# ☁️ Guía de Configuración y Despliegue con Cloudflare

Este documento detalla los pasos exactos para configurar **Cloudflare** como capa externa de DNS, CDN, WAF, SSL y mitigación de amenazas sobre el portfolio web.

---

## 🌐 1. Configuración de DNS y Proxy Mode

1. En el panel de Cloudflare, accede a **DNS** -> **Records**.
2. Configura los registros apuntando a tu hosting (Vercel / Netlify / Servidor):
   - **Registro A / CNAME (Raíz `@`):** Apuntando al CNAME de Vercel (`cname.vercel-dns.com`) o IP del hosting.
   - **Registro CNAME (`www`):** Apuntando a `@` o dominio principal.
3. **Estado de Proxy (Naranja):** Asegúrate de que el icono de nube esté en **Proxied (Naranja 🟧)** para forzar que todo el tráfico pase a través de los servidores Edge de Cloudflare.

---

## 🔒 2. Configuración SSL/TLS

1. Ve a **SSL/TLS** -> **Overview**.
2. Selecciona la opción **Full (strict)**.
   - *Nota:* Esta opción garantiza cifrado de extremo a extremo (Visor ↔ Cloudflare ↔ Hosting de Origen) verificando el certificado SSL del servidor de origen.
3. En **SSL/TLS** -> **Edge Certificates**:
   - Activa **Always Use HTTPS** (On).
   - Activa **Automatic HTTPS Rewrites** (On).
   - Ajusta **Minimum TLS Version** a **TLS 1.2**.
   - Activa **HTTP Strict Transport Security (HSTS)** tras verificar que el sitio carga correctamente sobre HTTPS.

---

## 🛡️ 3. Reglas de WAF (Web Application Firewall)

En **Security** -> **WAF** -> **Custom rules**:

### Reglas Conservadoras Recomendadas para Portfolio Estático:
1. **Managed WAF Rules:** Activar las reglas gestionadas de OWASP Core Ruleset (en modo defensivo / recomendadas por Cloudflare).
2. **Bot Management:** En **Security** -> **Bots**, activar **Bot Fight Mode** para desafiar o bloquear automáticamente scrapers maliciosos y bots automáticos.
3. **Bloqueo por ASN / IPs Sospechosas (Opcional):** Si se detecta tráfico malicioso recurrente desde proxies/VPNs maliciosas.

---

## ⚡ 4. Rate Limiting (Planes Futuros con Backend)

Actualmente la web es 100% estática en frontend. Si en el futuro se añade un backend (ej. `/api/*` o `/contact`):

1. Ir a **Security** -> **WAF** -> **Rate limiting rules**.
2. **Crear Regla:**
   - **Matching URL:** `concat(http.request.full_uri, "/api/*")`
   - **Límite:** 10 peticiones por 1 minuto por dirección IP.
   - **Acción:** Block o Managed Challenge.

---

## 🤖 5. Integración de Cloudflare Turnstile (Formularios Futuros)

Si en el futuro se añade un formulario de contacto backend real:

1. Registrar el sitio en **Turnstile** en el panel de Cloudflare.
2. Añadir el widget de Turnstile en el frontend React.
3. **MANDATORIO:** Validar el token enviado en el servidor backend contra la API de Cloudflare (`https://challenges.cloudflare.com/turnstile/v0/siteverify`).

---

## 🛡️ 6. Protección de Origen (Origin Shield & Direct Access Prevention)

Para evitar que un atacante descubra la IP o dominio directo del hosting de origen y se salte Cloudflare:

1. Si utilizas Vercel / Netlify: Vercel gestiona las IPs automáticamente; asegúrate de configurar tu dominio personalizado únicamente a través de Cloudflare.
2. Si utilizas un servidor propio (VPS/Nginx):
   - Configura el firewall del servidor (`ufw` / `iptables`) para permitir únicamente tráfico entrante en los puertos 80/443 desde los [Rangos de IP Oficiales de Cloudflare](https://www.cloudflare.com/ips/).
   - Rechaza todo el resto de peticiones entrantes directamente en el puerto HTTPS.

---

## 📄 7. API Shield (Arquitectura Futura)

Si se expande la aplicación con una API REST:

1. Definir el esquema OpenAPI (`swagger.yaml` / `openapi.json`).
2. Subir el esquema en **Security** -> **API Shield**.
3. Activar la validación de esquema en tiempo de ejecución para bloquear peticiones con JSONs o parámetros maliciosos antes de llegar al servidor.
