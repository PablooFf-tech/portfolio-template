/**
 * Copia este archivo como `site.config.ts` y personaliza los valores.
 * `site.config.ts` está en .gitignore de la plantilla para evitar subir datos personales por error.
 */
export const siteConfig = {
  fullName: 'Tu Nombre Apellido',
  shortName: 'Tu Nombre',
  heroTagline:
    '[Tu profesión o titular] — <strong>[Especialidad 1]</strong> & <strong>[Especialidad 2]</strong>.',
  location: '[Tu ciudad, país]',
  email: 'contacto@ejemplo.com',
  mailtoSubject: 'Propuesta de trabajo / Reunión',
  github: {
    username: 'tu-usuario',
    url: 'https://github.com/tu-usuario',
    label: 'GitHub personal (tu-usuario)',
  },
  /** Segundo enlace GitHub (organización o cuenta secundaria). Pon `enabled: false` para ocultarlo. */
  githubSecondary: {
    enabled: true,
    username: 'tu-organizacion',
    url: 'https://github.com/tu-organizacion',
    displayName: 'Tu Organización',
    description: 'Cuenta GitHub de ejemplo',
    panelLabel: 'GitHub organización',
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/tu-perfil/',
    headline: '[Tu titular profesional]',
    subtitle: '[Tu ciudad, país] · Disponible',
  },
  calBookingUrl: 'https://cal.com/tu-usuario',
  meta: {
    description:
      'Portfolio profesional de ejemplo. Personaliza meta descripción y palabras clave según tu sector.',
    keywords: 'Portfolio, [tu profesión], [ciudad], [servicios o especialidades]',
  },
  legal: {
    city: '[TU_CIUDAD]',
    country: '[TU_PAÍS]',
    jurisdictionCity: '[TU_CIUDAD]',
    contactEmail: 'contacto@ejemplo.com',
    dataProtectionAuthority: '[AUTORIDAD_DATOS]',
    dataProtectionAuthorityUrl: 'https://ejemplo.org/autoridad-datos',
  },
  copyrightYear: '2026',
} as const;

export type SiteConfig = typeof siteConfig;
