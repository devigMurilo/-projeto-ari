/* ==========================================================================
   Portal da Prefeitura de São Tomé/RN - Protótipo de alta fidelidade
   Script compartilhado: injeta o cabeçalho/rodapé padrão em todas as páginas
   e ativa os componentes interativos (menu, acessibilidade, abas, filtros).
   Cada página identifica-se com <body data-page="chave-da-rota">.
   ========================================================================== */
(function () {
  'use strict';

  /* ----------------------------- Rotas ---------------------------------- */
  var NAV = [
    { key: 'index',         href: 'index.html',         label: 'Início' },
    { key: 'municipio',     href: 'municipio.html',     label: 'Município' },
    { key: 'secretarias',   href: 'secretarias.html',   label: 'Secretarias' },
    { key: 'transparencia', href: 'transparencia.html', label: 'Transparência' },
    { key: 'legislacao',    href: 'legislacao.html',    label: 'Legislação' },
    { key: 'camara',        href: 'camara.html',        label: 'Câmara Municipal' },
    { key: 'ouvidoria',     href: 'ouvidoria.html',     label: 'Ouvidoria' }
  ];

  var FOOTER = [
    {
      title: 'Institucional',
      links: [
        { href: 'municipio.html', label: 'O Município' },
        { href: 'secretarias.html', label: 'Secretarias' },
        { href: 'camara.html', label: 'Câmara Municipal' },
        { href: 'noticias.html', label: 'Notícias' }
      ]
    },
    {
      title: 'Transparência',
      links: [
        { href: 'transparencia.html', label: 'Portal da Transparência' },
        { href: 'https://www.diariomunicipal.com.br/femurn/', label: 'Diário Oficial', external: true },
        { href: 'licitacoes.html', label: 'Licitações e Editais' },
        { href: 'legislacao.html', label: 'Legislação' }
      ]
    },
    {
      title: 'Atendimento',
      links: [
        { href: 'ouvidoria.html', label: 'Ouvidoria' },
        { href: 'servicos.html', label: 'Central de Serviços' },
        { href: 'unidades-saude.html', label: 'Unidades de Saúde' },
        { href: 'contato.html', label: 'Contato e Acessibilidade' }
      ]
    }
  ];

  var SOCIAL = [
    { label: 'Facebook', href: 'https://www.facebook.com/prefeituramunsaotome', icon: 'facebook' },
    { label: 'Instagram', href: 'https://www.instagram.com/governomunicipalsaotome/', icon: 'instagram' },
    { label: 'YouTube', href: 'https://www.youtube.com/@prefeituramunicipaldesaoto2815', icon: 'youtube' }
  ];

  /* ----------------------------- Ícones --------------------------------- */
  var ICONS = {
    facebook: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z"/></svg>',
    instagram: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
    youtube: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.5v-7l6.3 3.5-6.3 3.5z"/></svg>',
    mail: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
    phone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>',
    search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path stroke-linecap="round" d="M21 21l-4.3-4.3"/></svg>',
    menu: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>',
    brasao: '<img src="assets/img/brasao-sao-tome.png" alt="Brasão do município de São Tomé/RN" width="48" height="48">',
    libras: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M9.5 9.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-2.5 2-2.5 3.5m0 3.5h.01"/></svg>'
  };

  function navLinks(active, extraClass) {
    return NAV.map(function (item) {
      var cls = 'nav-link' + (item.key === active ? ' is-active' : '') + (extraClass ? ' ' + extraClass : '');
      var current = item.key === active ? ' aria-current="page"' : '';
      return '<a class="' + cls + '" href="' + item.href + '"' + current + '>' + item.label + '</a>';
    }).join('');
  }

  function searchForm(id, extraClass) {
    return '' +
      '<form class="search' + (extraClass ? ' ' + extraClass : '') + '" role="search" data-site-search>' +
        '<label class="sr-only" for="' + id + '">Buscar no site</label>' +
        ICONS.search +
        '<input id="' + id + '" type="search" name="q" placeholder="Buscar no site...">' +
      '</form>';
  }

  /* --------------------------- Cabeçalho -------------------------------- */
  function headerHTML(active) {
    return '' +
    '<a class="skip-link" href="#conteudo">Pular para o conteúdo principal</a>' +
    '<div class="topbar">' +
      '<div class="container topbar__inner">' +
        '<div class="topbar__contacts">' +
          '<a class="topbar__link" href="contato.html">' + ICONS.mail + ' gabinete@saotome.rn.gov.br</a>' +
          '<a class="topbar__link" href="contato.html">' + ICONS.phone + ' (84) 3333-0000</a>' +
        '</div>' +
        '<div class="topbar__tools">' +
          '<div class="topbar__social">' +
            SOCIAL.map(function (s) {
              return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.label + '">' + ICONS[s.icon] + '</a>';
            }).join('') +
          '</div>' +
          '<div class="a11y" role="group" aria-label="Ajustes de acessibilidade">' +
            '<button class="a11y__btn" data-font="base" aria-pressed="false" aria-label="Fonte padrão">A</button>' +
            '<button class="a11y__btn" data-font="font-lg" aria-pressed="false" aria-label="Aumentar fonte">A+</button>' +
            '<button class="a11y__btn" data-font="font-xl" aria-pressed="false" aria-label="Aumentar mais a fonte">A++</button>' +
            '<a class="a11y__btn a11y__btn--wide" href="contato.html#acessibilidade">Libras</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<header class="site-header">' +
      '<div class="container">' +
        '<div class="site-header__inner">' +
          '<a class="brand" href="index.html">' +
            '<span class="brand__mark">' + ICONS.brasao + '</span>' +
            '<span>' +
              '<span class="brand__name">Prefeitura de São Tomé</span><br>' +
              '<span class="brand__sub">Estado do Rio Grande do Norte</span>' +
            '</span>' +
          '</a>' +
          '<nav class="nav" aria-label="Menu principal">' + navLinks(active) + '</nav>' +
          '<div class="header__actions">' +
            searchForm('busca-desktop', 'search--inline') +
            '<button class="icon-btn icon-btn--search" type="button" data-search-toggle aria-controls="searchPanel" aria-expanded="false" aria-label="Abrir busca">' + ICONS.search + '</button>' +
            '<button class="icon-btn icon-btn--mobile" type="button" data-menu-toggle aria-controls="mobileMenu" aria-expanded="false" aria-label="Abrir menu">' + ICONS.menu + '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="search-panel" id="searchPanel" hidden>' +
        '<div class="container">' + searchForm('busca-painel', 'search--panel') + '</div>' +
      '</div>' +
      '<nav class="mobile-menu" id="mobileMenu" aria-label="Menu principal (mobile)">' +
        navLinks(active) +
        '<a class="nav-link" href="servicos.html">Serviços</a>' +
        '<a class="nav-link" href="noticias.html">Notícias</a>' +
        '<a class="nav-link" href="contato.html">Contato</a>' +
      '</nav>' +
    '</header>';
  }

  /* ----------------------------- Rodapé --------------------------------- */
  function footerHTML() {
    return '' +
    '<footer class="site-footer">' +
      '<div class="container">' +
        '<div class="site-footer__grid">' +
          '<div>' +
            '<div class="site-footer__brand">' +
              '<span class="brand__mark">' + ICONS.brasao + '</span>' +
              '<p>Prefeitura de São Tomé/RN</p>' +
            '</div>' +
            '<p class="small">Praça Antônio Assunção, 276 — Centro<br>São Tomé/RN — CEP 59.400-000<br>Atendimento: 7h30 às 11h30 e 13h às 17h</p>' +
            '<div class="social">' +
              SOCIAL.map(function (s) {
                return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.label + '">' + ICONS[s.icon] + '</a>';
              }).join('') +
            '</div>' +
          '</div>' +
          FOOTER.map(function (col) {
            return '<div>' +
              '<p class="site-footer__title">' + col.title + '</p>' +
              '<ul>' + col.links.map(function (l) {
                var attrs = l.external ? ' target="_blank" rel="noopener"' : '';
                return '<li><a href="' + l.href + '"' + attrs + '>' + l.label + '</a></li>';
              }).join('') + '</ul>' +
            '</div>';
          }).join('') +
        '</div>' +
        '<div class="site-footer__bottom">' +
          '<p>&copy; <span data-year></span> Prefeitura Municipal de São Tomé/RN — Todos os direitos reservados.</p>' +
        '</div>' +
      '</div>' +
    '</footer>' +
    '<button class="fab" type="button" aria-label="Acessibilidade e Libras" data-fab>' + ICONS.libras + '</button>';
  }

  /* --------------------------- Acessibilidade --------------------------- */
  function applyFont(size) {
    var root = document.documentElement;
    root.classList.remove('font-lg', 'font-xl');
    if (size && size !== 'base') root.classList.add(size);
    try { localStorage.setItem('pmst:font', size || 'base'); } catch (e) {}
    document.querySelectorAll('[data-font]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.font === (size || 'base')));
    });
  }

  function initA11y() {
    var font = 'base';
    try {
      font = localStorage.getItem('pmst:font') || 'base';
      localStorage.removeItem('pmst:contrast');
    } catch (e) {}
    applyFont(font);

    document.addEventListener('click', function (ev) {
      var fontBtn = ev.target.closest('[data-font]');
      if (fontBtn) { applyFont(fontBtn.dataset.font); return; }
      var fab = ev.target.closest('[data-fab]');
      if (fab) { window.location.href = 'contato.html#acessibilidade'; }
    });
  }

  /* ------------------------------ Menu ---------------------------------- */
  function initMenu() {
    var toggle = document.querySelector('[data-menu-toggle]');
    var menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      if (open) closeSearchPanel();
    });
  }

  /* -------- Ajuste do cabeçalho: campo de busca inline x lupa ----------- */
  function fitHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var inner = header.querySelector('.site-header__inner');
    var nav = header.querySelector('.nav');
    if (!inner || !nav) return;

    header.classList.remove('has-inline-search', 'nav-collapsed');
    if (window.innerWidth < 1024) return;

    var overflows = function () {
      return nav.scrollWidth > nav.clientWidth + 1 || inner.scrollWidth > inner.clientWidth + 1;
    };

    // 1ª tentativa: menu + campo de busca inline na mesma linha
    header.classList.add('has-inline-search');
    if (!overflows()) return;

    // 2ª: mantém o menu, busca vira botão de lupa
    header.classList.remove('has-inline-search');
    if (!overflows()) return;

    // 3ª: nem o menu cabe — recolhe tudo no hambúrguer
    header.classList.add('nav-collapsed');
    closeSearchPanel();
  }

  function initHeaderFit() {
    var timer;
    var lastWidth = document.documentElement.clientWidth;

    // Duas passadas: a primeira medição logo após um resize pode pegar o
    // layout no meio da troca de media query.
    function fitTwice() {
      fitHeader();
      requestAnimationFrame(function () { requestAnimationFrame(fitHeader); });
    }

    function schedule() {
      clearTimeout(timer);
      timer = setTimeout(fitTwice, 120);
    }

    fitTwice();
    window.addEventListener('resize', schedule);

    // Observa a largura do documento: cobre casos em que o evento resize
    // não chega (janela embutida, zoom, mudança de escala de fonte).
    if (window.ResizeObserver) {
      new ResizeObserver(function (entries) {
        var w = Math.round(entries[0].contentRect.width);
        if (w === lastWidth) return;
        lastWidth = w;
        schedule();
      }).observe(document.documentElement);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitHeader);
    }
  }

  /* ------------------- Painel de busca (telas estreitas) ---------------- */
  function closeSearchPanel() {
    var panel = document.getElementById('searchPanel');
    var toggle = document.querySelector('[data-search-toggle]');
    if (!panel || !toggle) return;
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir busca');
  }

  function initSearchPanel() {
    var panel = document.getElementById('searchPanel');
    var toggle = document.querySelector('[data-search-toggle]');
    var menu = document.getElementById('mobileMenu');
    if (!panel || !toggle) return;

    toggle.addEventListener('click', function () {
      var open = panel.hidden;
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar busca' : 'Abrir busca');
      if (open) {
        if (menu) { menu.classList.remove('is-open'); }
        var menuToggle = document.querySelector('[data-menu-toggle]');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        panel.querySelector('input').focus();
      }
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && !panel.hidden) { closeSearchPanel(); toggle.focus(); }
    });
  }

  /* ------------------------------ Busca --------------------------------- */
  function initSearch() {
    document.querySelectorAll('[data-site-search]').forEach(function (form) {
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var q = form.querySelector('input[name="q"]').value.trim();
        window.location.href = 'servicos.html' + (q ? '?q=' + encodeURIComponent(q) : '');
      });
    });
  }

  /* ------------------------------ Abas ---------------------------------- */
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (group) {
      var tabs = group.querySelectorAll('.tab');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          tabs.forEach(function (t) {
            var selected = t === tab;
            t.setAttribute('aria-selected', String(selected));
            var panel = document.getElementById(t.getAttribute('aria-controls'));
            if (panel) panel.hidden = !selected;
          });
        });
      });
    });
  }

  /* ------------------------- Filtros de listas -------------------------- */
  function runFilter(scope) {
    var input = scope.querySelector('[data-filter-input]');
    var activeChip = scope.querySelector('.chip[aria-pressed="true"]');
    var term = (input ? input.value : '').trim().toLowerCase();
    var cat = activeChip ? (activeChip.dataset.filter || 'all') : 'all';
    var visible = 0;

    scope.querySelectorAll('[data-item]').forEach(function (item) {
      var matchCat = cat === 'all' || (item.dataset.category || '').split(' ').indexOf(cat) > -1;
      var matchTerm = !term || item.textContent.toLowerCase().indexOf(term) > -1;
      var show = matchCat && matchTerm;
      item.classList.toggle('hide', !show);
      if (show) visible++;
    });

    var empty = scope.querySelector('.empty-state');
    if (empty) empty.classList.toggle('is-visible', visible === 0);
    var counter = scope.querySelector('[data-filter-count]');
    if (counter) counter.textContent = String(visible);
  }

  function initFilters() {
    document.querySelectorAll('[data-filter-scope]').forEach(function (scope) {
      var input = scope.querySelector('[data-filter-input]');
      if (input) {
        input.addEventListener('input', function () { runFilter(scope); });
        var form = input.closest('form');
        if (form) form.addEventListener('submit', function (ev) { ev.preventDefault(); });
      }
      scope.querySelectorAll('.chip').forEach(function (chip) {
        chip.addEventListener('click', function () {
          scope.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
          chip.setAttribute('aria-pressed', 'true');
          runFilter(scope);
        });
      });

      // Pré-preenche a busca vinda do cabeçalho: pagina.html?q=termo
      var q = new URLSearchParams(window.location.search).get('q');
      if (q && input) input.value = q;
      runFilter(scope);
    });
  }

  /* --------------------------- Copiar link ------------------------------ */
  function initCopyLink() {
    document.querySelectorAll('[data-copy-link]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var url = btn.dataset.copyLink;
        var status = document.querySelector('[data-copy-status]');
        var done = function (ok) {
          if (status) status.textContent = ok ? 'Link copiado.' : 'Não foi possível copiar: ' + url;
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(function () { done(true); }, function () { done(false); });
        } else {
          done(false);
        }
      });
    });
  }

  /* --------------------- Formulários (somente protótipo) ---------------- */
  function initForms() {
    document.querySelectorAll('[data-mock-form]').forEach(function (form) {
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var status = form.querySelector('.form-status');
        if (status) {
          var protocolo = new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 90000) + 10000);
          status.textContent = 'Protótipo: nenhum dado foi enviado. Protocolo simulado ' + protocolo + '.';
          status.classList.add('is-visible');
          status.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        form.reset();
      });
    });
  }

  /* ------------------------------ Boot ---------------------------------- */
  function boot() {
    var page = document.body.dataset.page || '';
    document.body.insertAdjacentHTML('afterbegin', headerHTML(page));
    document.body.insertAdjacentHTML('beforeend', footerHTML());
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
    initA11y();
    initHeaderFit();
    initMenu();
    initSearchPanel();
    initSearch();
    initTabs();
    initFilters();
    initCopyLink();
    initForms();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
