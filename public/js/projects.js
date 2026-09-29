/* ==========================================================================
   PORTFOLIO — PROJECTS DATA (plantilla con ejemplos)
   Personaliza con tus trabajos, piezas o proyectos reales.
   category: destacado | creativo | otro  (filtros en index.html)
   ========================================================================== */

/** Texto del botón de enlace en cada tarjeta (GitHub, Behance, PDF, etc.) */
const PROJECTS_LINK_LABEL = 'Ver enlace';

const PROJECTS_DATA = [
  {
    id: 1,
    category: 'destacado',
    title: '[Nombre del proyecto 1]',
    subtitle: '[Tipo de trabajo — campaña, obra, servicio, etc.]',
    image: 'https://placehold.co/800x450/1a1a2e/a5b4fc?text=Proyecto+1',
    description:
      'Descripción breve de ejemplo. Sustituye por un resumen claro de tu trabajo.',
    fullDescription:
      'Texto largo para el modal: contexto, tu rol y el resultado. Todo vive en js/projects.js.',
    codeSnippet: `[Detalle, cita o fragmento opcional del proyecto]`,
    tech: ['[Etiqueta 1]', '[Etiqueta 2]', '[Etiqueta 3]'],
    demoUrl: 'https://ejemplo.com/proyecto-atlas',
    githubUrl: 'https://github.com/tu-usuario/proyecto-atlas',
    highlights: [
      'Entrada de ejemplo — cambia título, imagen y enlaces',
      'Usa capturas propias en lugar de placehold.co',
      'Ajusta `tech` a lo que encaje con tu sector',
    ],
  },
  {
    id: 2,
    category: 'creativo',
    title: '[Nombre del proyecto 2]',
    subtitle: '[Subtítulo — colección, serie, colaboración]',
    image: 'https://placehold.co/800x450/0f172a/38bdf8?text=Proyecto+2',
    description:
      'Otro proyecto ficticio para mostrar el layout. Sirve para portfolio creativo o mixto.',
    fullDescription:
      'Amplía aquí la historia del proyecto. Puedes enlazar a Behance, Drive, PDF o tu web.',
    codeSnippet: `[Fragmento o nota representativa]`,
    tech: ['[Etiqueta A]', '[Etiqueta B]'],
    demoUrl: 'https://ejemplo.com/serie-horizonte',
    githubUrl: 'https://github.com/tu-usuario/serie-horizonte',
    highlights: [
      'Categoría `creativo` en el filtro',
      'Si no usas GitHub, cambia el texto del botón en la plantilla',
      'Duplica el objeto para añadir más proyectos',
    ],
  },
  {
    id: 3,
    category: 'otro',
    title: '[Nombre del proyecto 3]',
    subtitle: '[Subtítulo breve]',
    image: 'https://placehold.co/800x450/18181b/fbbf24?text=Proyecto+3',
    description:
      'Tercer ejemplo en categoría «otro». Personaliza o elimina entradas que no necesites.',
    fullDescription:
      'Describe objetivos, duración, equipo o lo que quieras destacar.',
    codeSnippet: `[Nota opcional]`,
    tech: ['[Etiqueta]'],
    demoUrl: 'https://ejemplo.com/iniciativa-mesa',
    githubUrl: 'https://github.com/tu-usuario/iniciativa-mesa',
    highlights: [
      'Filtros: destacado, creativo, otro',
      'Sin referencia a un sector concreto',
      'Añade tantos proyectos como quieras',
    ],
  },
];

document.addEventListener('DOMContentLoaded', () => {
  renderProjects(PROJECTS_DATA);
  initProjectFilters();
  initProjectModal();
});

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeHttpUrl(value) {
  try {
    const url = new URL(String(value ?? ''), window.location.origin);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return '#';
    return url.href;
  } catch {
    return '#';
  }
}

function renderProjects(projects) {
  const container = document.getElementById('projectsContainer');
  if (!container) return;

  container.innerHTML = '';

  const categoryNames = {
    destacado: '[Filtro 1]',
    creativo: '[Filtro 2]',
    otro: '[Filtro 3]',
  };

  projects.forEach((project) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-id', project.id);
    card.setAttribute('data-category', project.category);

    const techBadges = (project.tech || [])
      .slice(0, 4)
      .map((t) => `<span class="badge">${escapeHtml(t)}</span>`)
      .join('');
    const catBadge = escapeHtml(categoryNames[project.category] || 'Proyecto');

    card.innerHTML = `
      <div class="project-thumb">
        <img src="${escapeHtml(safeHttpUrl(project.image))}" alt="${escapeHtml(project.title)}" loading="lazy">
        <div class="project-badge-overlay">${catBadge}</div>
      </div>
      <div class="project-info">
        <h3 class="project-name">${escapeHtml(project.title)}</h3>
        <p class="project-summary">${escapeHtml(project.description)}</p>
        <div class="project-tags">${techBadges}</div>
        <div class="project-actions">
          <a href="${escapeHtml(safeHttpUrl(project.githubUrl))}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm project-github-btn" title="Enlace externo">
            <i data-lucide="external-link" aria-hidden="true"></i>
            ${escapeHtml(PROJECTS_LINK_LABEL)}
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      if (filter === 'all') {
        renderProjects(PROJECTS_DATA);
      } else {
        const filtered = PROJECTS_DATA.filter((p) => p.category === filter);
        renderProjects(filtered);
      }
    });
  });
}

function initProjectModal() {
  const modalBackdrop = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContainer = document.getElementById('modalContentContainer');

  if (!modalBackdrop || !modalCloseBtn || !modalContainer) return;

  document.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;

    const card = e.target.closest('.project-card');
    if (card) {
      const projectId = parseInt(card.getAttribute('data-id'), 10);
      const project = PROJECTS_DATA.find((p) => p.id === projectId);
      if (project) {
        openModal(project);
        return;
      }
    }

    const btn = e.target.closest('.open-modal-btn');
    if (btn) {
      const projectId = parseInt(btn.getAttribute('data-id'), 10);
      const project = PROJECTS_DATA.find((p) => p.id === projectId);
      if (project) openModal(project);
    }
  });

  modalCloseBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) closeModal();
  });

  function openModal(project) {
    const allTech = (project.tech || [])
      .map((t) => `<span class="badge">${escapeHtml(t)}</span>`)
      .join('');
    const highlightsList = (project.highlights || [])
      .map(
        (h) =>
          `<li style="display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem;"><i data-lucide="check" style="color: var(--accent-primary); width: 16px; height: 16px; margin-top: 3px;"></i><span>${escapeHtml(h)}</span></li>`,
      )
      .join('');

    modalContainer.innerHTML = `
      <img src="${escapeHtml(safeHttpUrl(project.image))}" alt="${escapeHtml(project.title)}" class="modal-img">
      <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.25rem; color: var(--text-main);">${escapeHtml(project.title)}</h2>
      <p style="color: var(--accent-primary); font-weight: 700; font-size: 0.95rem; margin-bottom: 1rem;">${escapeHtml(project.subtitle)}</p>
      
      <p style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6; font-size: 0.95rem;">${escapeHtml(project.fullDescription)}</p>

      <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-main);">Detalle (opcional):</h4>
      <div class="modal-code-snippet">${escapeHtml(project.codeSnippet)}</div>

      <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-main);">Destacados:</h4>
      <ul style="margin-bottom: 1.5rem; color: var(--text-main); font-size: 0.9rem;">
        ${highlightsList}
      </ul>

      <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-main);">Etiquetas:</h4>
      <div class="project-tags" style="margin-bottom: 2rem;">${allTech}</div>

      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <a href="${escapeHtml(safeHttpUrl(project.demoUrl))}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <i data-lucide="external-link"></i> Ver enlace
        </a>
        <a href="${escapeHtml(safeHttpUrl(project.githubUrl))}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          <i data-lucide="github"></i> Enlace secundario
        </a>
      </div>
    `;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}
