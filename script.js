const portfolioData = {
  skills: [
    { title: 'Programming Languages', icon: '01', items: ['Java', 'Python', 'JavaScript'] },
    { title: 'Web Development', icon: '</>', items: ['HTML', 'CSS', 'JavaScript'] },
    { title: 'Backend', icon: 'API', items: ['Spring Boot', 'REST API'] },
    { title: 'Database', icon: 'DB', items: ['MySQL', 'DBMS'] },
    { title: 'Tools', icon: '⌘', items: ['Git', 'GitHub', 'VS Code', 'IntelliJ IDEA'] },
    { title: 'Core CS & Soft Skills', icon: 'DS', items: ['Data Structures & Algorithms', 'Problem Solving', 'Communication', 'Leadership'] }
  ],
  projects: [
    {
      title: 'Digital Health Record Management System',
      category: ['web', 'java'],
      image: 'assets/images/projects/health-records.svg',
      alt: 'Digital Health Record Management System project preview',
      description: 'A secure web-based healthcare management system designed to digitally maintain and manage the medical information of migrant workers in Kerala. The system supports registration, login, health profiles, medical records, authorized healthcare access, and administration.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Java', 'Spring Boot', 'MySQL', 'REST API', 'Postman', 'VS Code'],
      features: ['Worker registration and login', 'Digital health records and medical history management', 'Doctor / healthcare professional access', 'Secure authentication and data management', 'Admin dashboard with worker record search', 'Responsive web interface', 'Future multilingual support, AI-based health prediction and QR-code health card']
    }
  ],
  certificates: [
    { name: 'Python Foundation Certification', organization: 'Infosys / Springboard', date: 'August 9, 2026', image: 'assets/images/certificates/certificate-1.jpg', link: '' },
    { name: 'Python Developer Intern', organization: 'Codec Technologies Pvt. Ltd.', date: '13/06/2025 – 13/07/2025', image: 'assets/images/certificates/certificate-2.jpg', link: '' },
    { name: 'Git & GitHub: Using GitHub for Source Code Management', organization: 'Infosys / Springboard', date: 'July 6, 2026', image: 'assets/images/certificates/certificate-3.jpg', link: '' },
    { name: 'Web Development Internship', organization: 'Vaizai Solutions', date: '01/06/2026 – 30/06/2026', image: 'assets/images/certificates/certificate-4.jpg', link: '' }
  ]
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function renderSkills() {
  $('#skills-grid').innerHTML = portfolioData.skills.map(skill => `
    <article class="skill-card reveal">
      <div class="skill-head"><div class="skill-icon" aria-hidden="true">${skill.icon}</div><h3>${skill.title}</h3></div>
      <div class="skill-list">${skill.items.map(item => `<span>${item}</span>`).join('')}</div>
    </article>
  `).join('');
}

function renderProjects() {
  $('#projects-grid').innerHTML = portfolioData.projects.map((project, index) => `
    <article class="project-card reveal" data-categories="${project.category.join(' ')}">
      <div class="project-image"><img src="${project.image}" alt="${project.alt}" width="1200" height="700" loading="lazy"></div>
      <div class="project-body">
        <span class="project-meta">PROJECT ${String(index + 1).padStart(2, '0')}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tag-row">${project.technologies.map(tech => `<span>${tech}</span>`).join('')}</div>
        <div class="feature-list">${project.features.slice(0, 4).map((feature, i) => `<div><b>${String(i + 1).padStart(2, '0')}</b><span>${feature}</span></div>`).join('')}</div>

      </div>
    </article>
  `).join('');
}

function renderCertificates() {
  $('#certificates-grid').innerHTML = portfolioData.certificates.map(cert => `
    <article class="cert-card reveal">
      <button class="cert-image" type="button" data-image="${cert.image}" data-alt="${cert.name} certificate preview" aria-label="Open ${cert.name} certificate preview">
        <img src="${cert.image}" alt="${cert.name} certificate placeholder" width="1000" height="700" loading="lazy">
      </button>
      <div class="cert-body">
        <span class="cert-date">${cert.date}</span>
        <h3>${cert.name}</h3>
        <p>Issued by <strong>${cert.organization}</strong>.</p>
        ${cert.link ? `<a class="cert-link" href="${cert.link}" target="_blank" rel="noopener noreferrer">View Credential ↗</a>` : `<button class="cert-link cert-view" type="button" data-image="${cert.image}" data-alt="${cert.name} certificate preview">View Certificate ↗</button>`}
      </div>
    </article>
  `).join('');
}

function setupTheme() {
  const toggle = $('.theme-toggle');
  const saved = localStorage.getItem('portfolio-theme');
  if (saved) document.documentElement.dataset.theme = saved;
  const update = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    $('.theme-icon').textContent = dark ? '☀' : '☾';
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  };
  update();
  toggle.addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    if (dark) delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = 'dark';
    localStorage.setItem('portfolio-theme', dark ? 'light' : 'dark');
    update();
  });
}

function setupMobileNav() {
  const button = $('.nav-toggle');
  const menu = $('.nav-menu');
  const close = () => { menu.classList.remove('open'); button.setAttribute('aria-expanded', 'false'); };
  button.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
  $$('.nav-link').forEach(link => link.addEventListener('click', close));
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !button.contains(e.target)) close();
  });
}

function setupScrollUI() {
  const header = $('.site-header');
  const back = $('#back-to-top');
  const links = $$('.nav-link');
  const sections = $$('main section[id]');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
    back.classList.toggle('visible', window.scrollY > 550);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
  back.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function setupReveal() {
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window)) { items.forEach(item => item.classList.add('in-view')); return; }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } });
  }, { threshold: .12 });
  items.forEach(item => observer.observe(item));
}

function setupProjectFilters() {
  $$('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
    $$('.filter-btn').forEach(item => item.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    $$('.project-card').forEach(card => card.classList.toggle('hidden', filter !== 'all' && !card.dataset.categories.split(' ').includes(filter)));
  }));
}

function setupLightbox() {
  const lightbox = $('#lightbox');
  const image = $('#lightbox-image');
  const close = () => { lightbox.hidden = true; document.body.classList.remove('no-scroll'); };
  $$('.cert-image, .cert-view').forEach(button => button.addEventListener('click', () => {
    image.src = button.dataset.image;
    image.alt = button.dataset.alt;
    lightbox.hidden = false;
    document.body.classList.add('no-scroll');
  }));
  $('#lightbox-close').addEventListener('click', close);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lightbox.hidden) close(); });
}

function setupContactForm() {
  $('#contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const message = $('#message').value.trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:maragatham2007dgl@gmail.com?subject=${subject}&body=${body}`;
  });
}

function init() {
  renderSkills(); renderProjects(); renderCertificates();
  setupTheme(); setupMobileNav(); setupScrollUI(); setupProjectFilters(); setupLightbox(); setupContactForm(); setupReveal();
  $('#year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', init);
