// ============================================================
// script.js — Lógica principal da aplicação
// ============================================================

// ── Estado global ────────────────────────────────────────────
let animes = [];          // cópia mutável dos dados
let filtroGenero = 'Todos';
let filtroNota = 0;
let filtroOrdem = 'ranking';
let termoBusca = '';
let modalAtivo = null;

// ── Inicialização ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Carregar dados da memória + localStorage (notas salvas)
  animes = carregarAnimes();

  renderizarTudo();
  inicializarBusca();
  inicializarFiltros();
  inicializarNavScroll();
  renderizarTrending();
  renderizarMaisPopulares();
  renderizarMelhorAvaliados();

  // Fechar modal ao clicar fora
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') fecharModal();
  });

  // Fechar modal com Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();
  });
});

// ── Carregar e persistir animes ───────────────────────────────

/**
 * Carrega os animes mesclando dados base com avaliações salvas no localStorage
 */
function carregarAnimes() {
  const salvas = JSON.parse(localStorage.getItem('animes_notas') || '{}');
  return ANIMES_DB.map(a => ({
    ...a,
    nota: salvas[a.id]?.nota ?? a.nota,
    votos: salvas[a.id]?.votos ?? a.votos
  }));
}

/**
 * Persiste notas e votos no localStorage
 */
function salvarAnimes() {
  const salvas = {};
  animes.forEach(a => { salvas[a.id] = { nota: a.nota, votos: a.votos }; });
  localStorage.setItem('animes_notas', JSON.stringify(salvas));
}

// ── Ranking ───────────────────────────────────────────────────

/**
 * Ordena os animes por nota (desc) e em caso de empate, por votos (desc)
 */
function ordenarPorRanking(lista) {
  return [...lista].sort((a, b) => b.nota - a.nota || b.votos - a.votos);
}

/**
 * Filtra e ordena os animes conforme estado atual
 */
function getAnimesFiltrados() {
  let resultado = [...animes];

  if (termoBusca.trim()) {
    const t = termoBusca.toLowerCase();
    resultado = resultado.filter(a =>
      a.nome.toLowerCase().includes(t) ||
      a.genero.some(g => g.toLowerCase().includes(t))
    );
  }

  if (filtroGenero !== 'Todos') {
    resultado = resultado.filter(a => a.genero.includes(filtroGenero));
  }

  if (filtroNota > 0) {
    resultado = resultado.filter(a => a.nota >= filtroNota);
  }

  if (filtroOrdem === 'az') {
    resultado.sort((a, b) => a.nome.localeCompare(b.nome));
  } else {
    resultado = ordenarPorRanking(resultado);
  }

  return resultado;
}

// ── Renderização principal ────────────────────────────────────

function renderizarTudo() {
  const lista = getAnimesFiltrados();
  const grid = document.getElementById('ranking-grid');
  const counter = document.getElementById('result-counter');

  counter.textContent = `${lista.length} anime${lista.length !== 1 ? 's' : ''}`;

  if (lista.length === 0) {
    grid.innerHTML = renderVazio();
    return;
  }

  grid.innerHTML = lista.map((anime, i) => criarCardAnime(anime, i + 1)).join('');

  // Stagger de entrada nos cards
  requestAnimationFrame(() => {
    const cards = grid.querySelectorAll('.card');
    cards.forEach((c, i) => {
      c.style.animationDelay = `${i * 40}ms`;
      c.classList.add('card--entrada');
    });
  });
}

function renderizarTrending() {
  // Trending = top 6 por votos na semana (simulado: maiores votos)
  const trending = [...animes]
    .sort((a, b) => b.votos - a.votos)
    .slice(0, 6);

  document.getElementById('trending-list').innerHTML =
    trending.map((a, i) => criarCardTrending(a, i + 1)).join('');
}

function renderizarMaisPopulares() {
  const populares = [...animes]
    .sort((a, b) => b.votos - a.votos)
    .slice(0, 5);

  document.getElementById('populares-list').innerHTML =
    populares.map((a, i) => `
      <div class="rank-item" onclick="abrirModal(event, ${a.id})">
        <span class="rank-item__pos">${i + 1}</span>
        <img src="${a.imagem}" alt="${a.nome}" loading="lazy">
        <div class="rank-item__info">
          <span class="rank-item__nome">${a.nome}</span>
          <span class="rank-item__sub">${a.votos.toLocaleString('pt-BR')} votos</span>
        </div>
        <span class="rank-item__nota">${a.nota.toFixed(1)}</span>
      </div>
    `).join('');
}

function renderizarMelhorAvaliados() {
  const top = ordenarPorRanking(animes).slice(0, 5);

  document.getElementById('top-avaliados-list').innerHTML =
    top.map((a, i) => `
      <div class="rank-item" onclick="abrirModal(event, ${a.id})">
        <span class="rank-item__pos">${i + 1}</span>
        <img src="${a.imagem}" alt="${a.nome}" loading="lazy">
        <div class="rank-item__info">
          <span class="rank-item__nome">${a.nome}</span>
          <span class="rank-item__sub">${renderStars(a.nota)}</span>
        </div>
        <span class="rank-item__nota">${a.nota.toFixed(1)}</span>
      </div>
    `).join('');
}

// ── Modal ─────────────────────────────────────────────────────

function abrirModal(e, id) {
  e.stopPropagation();
  const anime = animes.find(a => a.id === id);
  if (!anime) return;

  modalAtivo = id;
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  content.innerHTML = criarModalAnime(anime);
  overlay.classList.add('modal--open');
  document.body.style.overflow = 'hidden';

  // Renderizar recomendações
  const recs = animes
    .filter(a => a.id !== id && a.genero.some(g => anime.genero.includes(g)))
    .sort((a, b) => b.nota - a.nota)
    .slice(0, 4);

  const recEl = document.getElementById(`recomendacoes-${id}`);
  if (recEl) {
    recEl.innerHTML = recs.map(r => `
      <div class="rec-card" onclick="abrirModal(event, ${r.id})">
        <img src="${r.imagem}" alt="${r.nome}" loading="lazy">
        <span>${r.nome}</span>
      </div>
    `).join('');
  }
}

function fecharModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('modal--open');
  document.body.style.overflow = '';
  modalAtivo = null;
}

function atualizarBotoesModal(id) {
  // Re-renderiza apenas o modal aberto
  if (modalAtivo === id) {
    const overlay = document.getElementById('modal-overlay');
    const wasOpen = overlay.classList.contains('modal--open');
    if (wasOpen) {
      const e = { stopPropagation: () => {} };
      fecharModal();
      setTimeout(() => abrirModal(e, id), 50);
    }
  }
}

// ── Avaliação ─────────────────────────────────────────────────

/**
 * Registra o voto do usuário, atualiza média e persiste
 */
function votar(id, nota) {
  const userVotos = JSON.parse(localStorage.getItem('userVotes') || '{}');
  if (userVotos[id] !== undefined) {
    showToast('Você já avaliou este anime!', 'warning');
    return;
  }

  const anime = animes.find(a => a.id === id);
  if (!anime) return;

  // Calcular nova média ponderada
  const totalNota = anime.nota * anime.votos + nota;
  anime.votos += 1;
  anime.nota = Math.round((totalNota / anime.votos) * 10) / 10;

  // Salvar
  userVotos[id] = nota;
  localStorage.setItem('userVotes', JSON.stringify(userVotos));
  salvarAnimes();

  showToast(`Você avaliou ${anime.nome} com ${nota}/10! ⭐`);

  // Atualizar UI
  renderizarTudo();
  renderizarMaisPopulares();
  renderizarMelhorAvaliados();

  // Atualizar modal aberto
  atualizarBotoesModal(id);
}

// ── Favoritos e Lista ─────────────────────────────────────────

function toggleFav(e, id) {
  e.stopPropagation();
  const favs = JSON.parse(localStorage.getItem('favs') || '[]');
  const idx = favs.indexOf(id);

  if (idx === -1) {
    favs.push(id);
    showToast('Adicionado aos favoritos! ❤️');
  } else {
    favs.splice(idx, 1);
    showToast('Removido dos favoritos.');
  }

  localStorage.setItem('favs', JSON.stringify(favs));
  renderizarTudo();
}

function toggleLista(e, id) {
  e.stopPropagation();
  const lista = JSON.parse(localStorage.getItem('lista') || '[]');
  const idx = lista.indexOf(id);

  if (idx === -1) {
    lista.push(id);
    showToast('Adicionado à sua lista! ✅');
  } else {
    lista.splice(idx, 1);
    showToast('Removido da sua lista.');
  }

  localStorage.setItem('lista', JSON.stringify(lista));
}

// ── Comentários ───────────────────────────────────────────────

function adicionarComentario(id) {
  const autor = document.getElementById('comment-autor').value.trim() || 'Anon';
  const texto = document.getElementById('comment-texto').value.trim();

  if (!texto) {
    showToast('Escreva um comentário!', 'warning');
    return;
  }

  const comentarios = JSON.parse(localStorage.getItem(`comments_${id}`) || '[]');
  comentarios.unshift({ autor, texto, data: new Date().toLocaleDateString('pt-BR') });
  localStorage.setItem(`comments_${id}`, JSON.stringify(comentarios.slice(0, 20)));

  showToast('Comentário adicionado! 💬');

  const listEl = document.getElementById(`comments-list-${id}`);
  if (listEl) {
    listEl.innerHTML = comentarios.map(c => `
      <div class="comment">
        <span class="comment__autor">${c.autor}</span>
        <p class="comment__texto">${c.texto}</p>
      </div>
    `).join('');
  }

  document.getElementById('comment-autor').value = '';
  document.getElementById('comment-texto').value = '';
}

// ── Busca ─────────────────────────────────────────────────────

function inicializarBusca() {
  const input = document.getElementById('search-input');
  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      termoBusca = input.value;
      renderizarTudo();
    }, 250);
  });
}

// ── Filtros ───────────────────────────────────────────────────

function inicializarFiltros() {
  // Montar lista de gêneros únicos
  const generos = ['Todos', ...new Set(ANIMES_DB.flatMap(a => a.genero))].sort();
  const select = document.getElementById('filtro-genero');
  select.innerHTML = generos.map(g => `<option value="${g}">${g}</option>`).join('');

  select.addEventListener('change', () => {
    filtroGenero = select.value;
    renderizarTudo();
  });

  document.getElementById('filtro-nota').addEventListener('input', (e) => {
    filtroNota = parseFloat(e.target.value) || 0;
    document.getElementById('nota-val').textContent = filtroNota > 0 ? `${filtroNota}+` : 'Todas';
    renderizarTudo();
  });

  document.getElementById('filtro-ordem').addEventListener('change', (e) => {
    filtroOrdem = e.target.value;
    renderizarTudo();
  });
}

// ── Navegação scroll ──────────────────────────────────────────

function inicializarNavScroll() {
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 50);
  });
}

// ── Navegação abas laterais ───────────────────────────────────

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Expor funções usadas inline no HTML
window.abrirModal = abrirModal;
window.fecharModal = fecharModal;
window.votar = votar;
window.toggleFav = toggleFav;
window.toggleLista = toggleLista;
window.adicionarComentario = adicionarComentario;
window.atualizarBotoesModal = atualizarBotoesModal;
window.scrollToSection = scrollToSection;
