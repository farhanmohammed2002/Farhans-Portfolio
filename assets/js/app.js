/**
 * Farhan Mohammad - Engineering Portfolio Application Logic
 * Modular, Accessible, Responsive, Interactive
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initTheme();
  initMobileMenu();
  initScrollSpy();
  initBackToTop();
  renderHeroStats();
  renderEducation();
  renderSkills();
  renderProjects();
  renderResearch();
  renderExperience();
  renderLeadership();
  renderCertifications();
  initProjectModal();
  initContactForm();

  // Re-run icon replacement after dynamic render
  if (window.lucide) {
    setTimeout(() => window.lucide.createIcons(), 50);
  }
});

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      if (window.lucide) window.lucide.createIcons();
    });
  }
}

/* ==========================================================================
   MOBILE MENU
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileToggle || !mobileDrawer) return;

  mobileToggle.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('hidden');
    const isExpanded = !isOpen;
    mobileToggle.setAttribute('aria-expanded', isExpanded.toString());
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.add('hidden');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   SCROLL SPY & BACK TO TOP
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.scrollY;

    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    desktopLinks.forEach(link => {
      link.classList.remove('text-cyan-400', 'font-semibold');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('text-cyan-400', 'font-semibold');
      }
    });
  });
}

function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   HERO STATS
   ========================================================================== */
function renderHeroStats() {
  const container = document.getElementById('hero-metrics-container');
  if (!container || !PORTFOLIO_DATA.about.keyMetrics) return;

  container.innerHTML = PORTFOLIO_DATA.about.keyMetrics.map(m => `
    <div class="glass-card p-4 text-center">
      <div class="text-xl md:text-2xl font-bold font-heading text-cyan-400">${m.value}</div>
      <div class="text-xs font-semibold text-slate-300 mt-1">${m.label}</div>
      <div class="text-[11px] text-slate-400 mt-0.5">${m.note}</div>
    </div>
  `).join('');
}

/* ==========================================================================
   EDUCATION
   ========================================================================== */
function renderEducation() {
  const container = document.getElementById('education-list');
  if (!container || !PORTFOLIO_DATA.education) return;

  container.innerHTML = PORTFOLIO_DATA.education.map((edu, idx) => `
    <div class="timeline-stem relative pb-8 ${idx === PORTFOLIO_DATA.education.length - 1 ? 'pb-0' : ''}">
      <div class="timeline-dot"></div>
      <div class="glass-card p-6 ml-2">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-white/10 pb-3 mb-4">
          <div>
            <h3 class="text-lg font-bold text-slate-100 font-heading">${edu.degree}</h3>
            <p class="text-cyan-400 font-medium text-sm mt-0.5">${edu.institution}</p>
            <p class="text-xs text-slate-400">${edu.campus}</p>
          </div>
          <div class="flex flex-col md:items-end">
            <span class="badge-tech">${edu.period}</span>
            <span class="text-xs text-emerald-400 font-mono mt-1">${edu.status}</span>
          </div>
        </div>
        <p class="text-sm text-slate-300 mb-4 leading-relaxed">${edu.details}</p>
        
        ${edu.relevantCourses ? `
          <div class="mb-3">
            <span class="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">Core Engineering Modules:</span>
            <div class="flex flex-wrap gap-1.5">
              ${edu.relevantCourses.map(c => `<span class="badge-outline text-xs">${c}</span>`).join('')}
            </div>
          </div>
        ` : ''}

        ${edu.activities ? `
          <div>
            <span class="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">Societies & Activities:</span>
            <div class="flex flex-wrap gap-1.5">
              ${edu.activities.map(a => `<span class="badge-tech text-xs bg-slate-800/60 border-slate-700 text-slate-300">${a}</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   SKILLS MATRIX WITH CATEGORY TABS
   ========================================================================== */
function renderSkills() {
  const container = document.getElementById('skills-container');
  const tabsContainer = document.getElementById('skills-tabs');
  if (!container || !PORTFOLIO_DATA.skillsCategories) return;

  // Render Category Tabs
  if (tabsContainer) {
    const tabs = [
      { id: 'all', label: 'All Domains' },
      ...PORTFOLIO_DATA.skillsCategories.map(cat => ({ id: cat.id, label: cat.category }))
    ];

    tabsContainer.innerHTML = tabs.map((t, idx) => `
      <button class="filter-btn ${idx === 0 ? 'active' : ''}" data-skill-tab="${t.id}">
        ${t.label}
      </button>
    `).join('');

    const tabButtons = tabsContainer.querySelectorAll('button[data-skill-tab]');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const selectedId = btn.getAttribute('data-skill-tab');
        filterSkills(selectedId);
      });
    });
  }

  function renderCategoryCards(categories) {
    container.innerHTML = categories.map(cat => `
      <div class="glass-card p-6 flex flex-col justify-between" data-category-id="${cat.id}">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <i data-lucide="${cat.icon || 'code'}" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-100 font-heading">${cat.category}</h3>
              <p class="text-xs text-slate-400 mt-0.5">${cat.description}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
            ${cat.skills.map(s => `
              <div class="p-2.5 rounded-md bg-slate-800/40 border border-white/5 flex items-center justify-between gap-2 hover:border-cyan-500/30 transition-colors">
                <span class="text-xs text-slate-200 font-medium">${s.name}</span>
                <span class="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40 shrink-0">${s.level}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function filterSkills(catId) {
    if (catId === 'all') {
      renderCategoryCards(PORTFOLIO_DATA.skillsCategories);
    } else {
      const filtered = PORTFOLIO_DATA.skillsCategories.filter(c => c.id === catId);
      renderCategoryCards(filtered);
    }
  }

  renderCategoryCards(PORTFOLIO_DATA.skillsCategories);
}

/* ==========================================================================
   PROJECTS MATRIX & FILTERING
   ========================================================================== */
function renderProjects() {
  const container = document.getElementById('projects-grid');
  const filterTabsContainer = document.getElementById('project-filters');
  if (!container || !PORTFOLIO_DATA.projects) return;

  const categories = [
    { id: 'all', label: 'All Projects (9)' },
    { id: 'power-energy', label: 'Power & Energy' },
    { id: 'embedded-robotics', label: 'Embedded & Robotics' },
    { id: 'electronics-pcb', label: 'Electronics & PCB' },
    { id: 'networking-security', label: 'Network & Security' },
    { id: 'sustainable-systems', label: 'Sustainable Systems' }
  ];

  if (filterTabsContainer) {
    filterTabsContainer.innerHTML = categories.map((cat, idx) => `
      <button class="filter-btn ${idx === 0 ? 'active' : ''}" data-project-filter="${cat.id}">
        ${cat.label}
      </button>
    `).join('');

    const buttons = filterTabsContainer.querySelectorAll('button[data-project-filter]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-project-filter');
        filterProjects(filter);
      });
    });
  }

  function renderCards(projects) {
    container.innerHTML = projects.map(p => `
      <article class="glass-card p-6 flex flex-col justify-between group cursor-pointer" onclick="openProjectModal('${p.id}')">
        <div>
          <div class="flex items-start justify-between gap-2 mb-3">
            <span class="badge-tech">${p.categoryLabel}</span>
            <span class="text-[11px] font-mono text-slate-400">${p.period}</span>
          </div>

          <h3 class="text-lg font-bold text-slate-100 font-heading group-hover:text-cyan-400 transition-colors mb-2">
            ${p.title}
          </h3>

          <div class="mb-3">
            <span class="inline-block text-xs font-mono font-medium text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-800/40">
              ⚡ ${p.badge}
            </span>
          </div>

          <p class="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
            ${p.summary}
          </p>
        </div>

        <div>
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${p.technologies.slice(0, 4).map(t => `<span class="badge-outline text-[11px]">${t}</span>`).join('')}
            ${p.technologies.length > 4 ? `<span class="badge-outline text-[11px] text-cyan-400">+${p.technologies.length - 4}</span>` : ''}
          </div>

          <button type="button" class="w-full py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-cyan-600 hover:text-white border border-white/10 text-xs font-medium text-slate-300 flex items-center justify-center gap-2 transition-all">
            <span>View Architecture & Technical Specs</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </article>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  function filterProjects(category) {
    if (category === 'all') {
      renderCards(PORTFOLIO_DATA.projects);
    } else {
      const filtered = PORTFOLIO_DATA.projects.filter(p => p.category === category);
      renderCards(filtered);
    }
  }

  renderCards(PORTFOLIO_DATA.projects);
}

/* ==========================================================================
   PROJECT DETAIL MODAL
   ========================================================================== */
function initProjectModal() {
  const backdrop = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!backdrop) return;

  const closeModal = () => {
    backdrop.classList.remove('open');
    document.body.style.overflow = 'auto';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeModal();
    }
  });

  window.openProjectModal = function(projectId) {
    const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
    if (!project) return;

    const modalBody = document.getElementById('modal-body-content');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div class="border-b border-white/10 pb-5 mb-6">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span class="badge-tech text-xs">${project.categoryLabel}</span>
          <span class="text-xs font-mono text-slate-400">${project.period}</span>
        </div>
        <h2 class="text-xl md:text-2xl font-bold text-slate-100 font-heading mb-2">${project.title}</h2>
        <div class="text-xs text-slate-300 flex flex-wrap items-center gap-x-4 gap-y-1">
          ${project.module ? `<span><strong>Module:</strong> ${project.module}</span>` : ''}
          <span><strong>Affiliation:</strong> ${project.affiliation}</span>
          ${project.team ? `<span><strong>Team:</strong> ${project.team}</span>` : ''}
        </div>
        <div class="mt-3">
          <span class="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded border border-emerald-800/40">
            ⚡ ${project.badge}
          </span>
        </div>
      </div>

      <div class="space-y-6 text-sm">
        <div>
          <h4 class="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1.5">Problem Statement</h4>
          <p class="text-slate-300 leading-relaxed bg-slate-900/50 p-3.5 rounded-lg border border-white/5">${project.problem}</p>
        </div>

        <div>
          <h4 class="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1.5">Engineering Solution & Architecture</h4>
          <p class="text-slate-300 leading-relaxed bg-slate-900/50 p-3.5 rounded-lg border border-white/5">${project.solution}</p>
        </div>

        <div>
          <h4 class="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">Key Technical Implementations</h4>
          <ul class="space-y-2">
            ${project.technicalHighlights.map(h => `
              <li class="flex items-start gap-2.5 text-slate-300">
                <span class="text-cyan-400 mt-1 shrink-0">•</span>
                <span>${h}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">Technologies, Protocols & Components</h4>
          <div class="flex flex-wrap gap-2">
            ${project.technologies.map(t => `<span class="badge-outline text-xs px-2.5 py-1">${t}</span>`).join('')}
          </div>
        </div>

        <div>
          <h4 class="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1.5">Verified Results & Impact</h4>
          <p class="text-emerald-300 bg-emerald-950/20 border border-emerald-800/30 p-3.5 rounded-lg">${project.outcomes}</p>
        </div>
      </div>
    `;

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (window.lucide) window.lucide.createIcons();
  };
}

/* ==========================================================================
   RESEARCH & TECHNICAL INSIGHTS
   ========================================================================== */
function renderResearch() {
  const container = document.getElementById('research-list');
  if (!container || !PORTFOLIO_DATA.research) return;

  container.innerHTML = PORTFOLIO_DATA.research.map(r => `
    <div class="glass-card p-6 flex flex-col justify-between">
      <div>
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span class="badge-tech">${r.badge}</span>
          <span class="text-xs font-mono text-slate-400">${r.organization}</span>
        </div>

        <h3 class="text-lg font-bold text-slate-100 font-heading mb-1.5">${r.title}</h3>
        <p class="text-xs text-cyan-400 font-medium mb-3">${r.context}</p>

        <p class="text-xs text-slate-300 leading-relaxed mb-4">${r.summary}</p>

        <div class="space-y-1.5 mb-4">
          <span class="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Key Engineering Findings:</span>
          ${r.keyObservations.map(o => `
            <div class="flex items-start gap-2 text-xs text-slate-300">
              <span class="text-cyan-400 shrink-0">•</span>
              <span>${o}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="pt-3 border-t border-white/5">
        <p class="text-[11px] text-slate-400 italic font-mono">
          <strong class="text-cyan-400">Research Relevance:</strong> ${r.relevance}
        </p>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   PROFESSIONAL EXPERIENCE
   ========================================================================== */
function renderExperience() {
  const container = document.getElementById('experience-list');
  if (!container || !PORTFOLIO_DATA.experience) return;

  container.innerHTML = PORTFOLIO_DATA.experience.map(exp => `
    <div class="timeline-stem relative pb-6">
      <div class="timeline-dot"></div>
      <div class="glass-card p-6 ml-2">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-white/10 pb-3 mb-4">
          <div>
            <h3 class="text-lg font-bold text-slate-100 font-heading">${exp.role}</h3>
            <p class="text-cyan-400 font-medium text-sm mt-0.5">${exp.company} • ${exp.location}</p>
          </div>
          <div class="flex flex-col md:items-end">
            <span class="badge-tech">${exp.period}</span>
            <span class="text-xs text-amber-400 font-mono mt-1">🏆 ${exp.badge}</span>
          </div>
        </div>

        <p class="text-sm text-slate-300 mb-4 leading-relaxed">${exp.summary}</p>

        <div class="mb-4">
          <span class="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">Core Contributions & Responsibilities:</span>
          <ul class="space-y-2">
            ${exp.responsibilities.map(res => `
              <li class="flex items-start gap-2 text-xs text-slate-300">
                <span class="text-cyan-400 mt-0.5 shrink-0">•</span>
                <span>${res}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div>
          <span class="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">Competencies Applied:</span>
          <div class="flex flex-wrap gap-1.5">
            ${exp.skillsGained.map(s => `<span class="badge-outline text-xs">${s}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   LEADERSHIP & ACTIVITIES
   ========================================================================== */
function renderLeadership() {
  const container = document.getElementById('leadership-grid');
  if (!container || !PORTFOLIO_DATA.leadership) return;

  container.innerHTML = PORTFOLIO_DATA.leadership.map(l => `
    <div class="glass-card p-5 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="badge-tech text-[11px]">${l.institution}</span>
          <span class="text-[11px] font-mono text-slate-400">${l.period}</span>
        </div>
        <h3 class="text-base font-bold text-slate-100 font-heading mb-1">${l.role}</h3>
        <p class="text-xs text-cyan-400 font-medium mb-3">${l.organization}</p>
        <p class="text-xs text-slate-300 leading-relaxed">${l.description}</p>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   CERTIFICATIONS & HONORS
   ========================================================================== */
function renderCertifications() {
  const certContainer = document.getElementById('certifications-grid');
  const honorsContainer = document.getElementById('honors-grid');

  if (certContainer && PORTFOLIO_DATA.certifications) {
    certContainer.innerHTML = PORTFOLIO_DATA.certifications.map(c => `
      <div class="glass-card p-5 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="badge-tech text-[11px]">${c.badge}</span>
            <span class="text-[11px] font-mono text-slate-400">${c.date}</span>
          </div>
          <h3 class="text-sm font-bold text-slate-100 font-heading mb-1">${c.name}</h3>
          <p class="text-xs text-cyan-400 font-medium mb-2">${c.issuer}</p>
          <div class="flex flex-wrap gap-1 mb-3">
            ${c.skills.map(s => `<span class="badge-outline text-[10px]">${s}</span>`).join('')}
          </div>
        </div>

        <div class="pt-3 border-t border-white/5 flex items-center justify-between">
          <span class="text-[10px] font-mono text-slate-400">ID: ${c.credentialId}</span>
          <button type="button" class="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1" onclick="navigator.clipboard.writeText('${c.credentialId}').then(() => alert('Credential ID copied: ${c.credentialId}'))">
            <i data-lucide="copy" class="w-3 h-3"></i>
            <span>Copy ID</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  if (honorsContainer && PORTFOLIO_DATA.honors) {
    honorsContainer.innerHTML = PORTFOLIO_DATA.honors.map(h => `
      <div class="glass-card p-5 flex flex-col justify-between border-amber-500/20">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="badge-tech text-[11px] bg-amber-500/10 text-amber-400 border-amber-500/30">🏆 Academic & Professional Honor</span>
            <span class="text-[11px] font-mono text-slate-400">${h.date}</span>
          </div>
          <h3 class="text-sm font-bold text-slate-100 font-heading mb-1">${h.title}</h3>
          <p class="text-xs text-amber-400 font-medium mb-2">${h.issuer}</p>
          <p class="text-xs text-slate-300 leading-relaxed">${h.description}</p>
        </div>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const subject = form.elements['subject'].value.trim();
    const message = form.elements['message'].value.trim();

    if (!name || !email || !subject || !message) {
      showFeedback('Please fill out all fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback('Please provide a valid email address.', 'error');
      return;
    }

    // Prepare mailto link trigger
    const mailtoLink = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent('[Portfolio Inquiry] ' + subject)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;

    showFeedback('Message ready! Launching your email client to send directly to Farhan...', 'success');

    setTimeout(() => {
      window.location.href = mailtoLink;
      form.reset();
    }, 1000);
  });

  function showFeedback(msg, type) {
    if (!alertBox) return;
    alertBox.textContent = msg;
    alertBox.classList.remove('hidden', 'bg-emerald-950/60', 'text-emerald-300', 'border-emerald-700/50', 'bg-red-950/60', 'text-red-300', 'border-red-700/50');

    if (type === 'success') {
      alertBox.classList.add('bg-emerald-950/60', 'text-emerald-300', 'border', 'border-emerald-700/50');
    } else {
      alertBox.classList.add('bg-red-950/60', 'text-red-300', 'border', 'border-red-700/50');
    }
  }
}
