document.addEventListener('DOMContentLoaded', () => {
  // 1. Control del Menú Hamburguesa para Móviles
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.querySelector('.sidebar');

  if (mobileMenuBtn && sidebar) {
    // Abrir / cerrar al tocar el botón ☰
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('is-open');
    });

    // Cerrar el menú automáticamente si se toca fuera de él en el celular
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('is-open')) {
        if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          sidebar.classList.remove('is-open');
        }
      }
    });

    // Cerrar el menú al presionar un enlace de navegación
    const navLinks = sidebar.querySelectorAll('.nav-subitems a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('is-open');
        }
      });
    });
  }

  // 2. Acordeón para grupos del menú lateral (Colapsar / Desplegar)
  const toggles = document.querySelectorAll('.group-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetList = document.getElementById(targetId);
      const arrow = btn.querySelector('.arrow');

      if (targetList) {
        const isHidden = targetList.style.display === 'none';
        targetList.style.display = isHidden ? 'block' : 'none';
        if (arrow) {
          arrow.textContent = isHidden ? '▼' : '▶';
        }
      }
    });
  });

  // 3. Filtro en tiempo real del menú lateral
  const sidebarSearch = document.getElementById('sidebarSearch');
  if (sidebarSearch) {
    sidebarSearch.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const navItems = document.querySelectorAll('.nav-subitems li');

      navItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(term) ? 'block' : 'none';
      });
    });
  }

  // 4. Atajo de teclado global Ctrl+K (Buscador superior)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const globalInput = document.getElementById('globalSearch');
      if (globalInput) {
        globalInput.focus();
        globalInput.select();
      }
    }
  });
});

// Activar / Desactivar Modo Oscuro
const themeToggleBtn = document.getElementById('themeToggleBtn');

if (themeToggleBtn) {
  const themeIcon = themeToggleBtn.querySelector('.theme-icon');

  // Comprobar preferencia guardada
  if (localStorage.getItem('dsi_theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeIcon) themeIcon.textContent = '☀️';
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    if (themeIcon) {
      themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
    
    localStorage.setItem('dsi_theme', isDark ? 'dark' : 'light');
  });
}