document.addEventListener('DOMContentLoaded', () => {
  // 1. Acordeón para grupos del menú lateral
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

  // 2. Filtro en tiempo real del menú lateral
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

  // 3. Atajo de teclado global Ctrl+K
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