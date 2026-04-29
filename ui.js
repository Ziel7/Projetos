// ============================================================
// ui.js — Funções de renderização e interface
// ============================================================

/**
 * Renderiza o badge de posição no ranking com estilo especial para top 3
 */
function renderBadge(pos) {
  if (pos === 1) return `<span class="badge badge--gold">🥇 #1</span>`;
  if (pos === 2) return `<span class="badge badge--silver">🥈 #2</span>`;
  if (pos === 3) return `<span class="badge badge--bronze">🥉 #3</span>`;
  return `<span class="badge">#${pos}</span>`;
}

/**
 * Renderiza estrelas de acordo com a nota (0–10 → 0–5 estrelas)
 */
function renderStars(nota) {
  const stars = Math.round(nota / 2);
  return Array.from({ length: 5 }, (_, i) =>
    `<span class="star ${i < stars ? 'star--on' : ''}">${i < stars ? '★' : '☆'}</span>`
  ).join('');
}

/**
 * Renderiza as tags de gênero
 */
function renderGeneros(generos) {
  return generos.map(g => `<span class="tag">${g}</span>`).join('');
}

/**
 * Cria o HTML de um card de anime para o grid de ranking
 */
function criarCardAnime(anime, posicao) {
  const favs = JSON.parse(localStorage.getItem('favs') || '[]');
  const isFav = favs.includes(anime.id);
  const userVotos = JSON.parse(localStorage.getItem('userVotes') || '{}');
  const jaVotou = userVotos[anime.id] !== undefined;

  return `
    <article class="card ${posicao <= 3 ? 'card--top' : ''}" data-id="${anime.id}" tabindex="0" aria-label="Abrir detalhes de ${anime.nome}">
      <div class="card__rank">${renderBadge(posicao)}</div>
      <div class="card__thumb">
        <img src="${anime.imagem}" alt="${anime.nome}" loading="lazy" onerror="this.src='https://via.placeholder.com/225x320/1a1a2e/9b59b6?text=Anime'">
        <div class="card__overlay">
          <button class="btn-fav ${isFav ? 'btn-fav--active' : ''}" onclick="toggleFav(event, ${anime.id})" aria-label="Favoritar">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
      <div class="card__info">
        <h3 class="card__nome">${anime.nome}</h3>
        <div class="card__meta">
          <span class="card__nota">${anime.nota.toFixed(1)}</span>
          <div class="card__stars">${renderStars(anime.nota)}</div>
        </div>
        <div class="card__generos">${renderGeneros(anime.genero.slice(0, 2))}</div>
        <p class="card__episodios">📺 ${anime.episodios} eps</p>
        <button class="btn btn--primary card__detalhes" onclick="abrirModal(event, ${anime.id})">
          Ver Detalhes
        </button>
      </div>
    </article>
  `;
}

/**
 * Cria o HTML de um card da seção trending (mais compacto)
 */
function criarCardTrending(anime, posicao) {
  return `
    <div class="trending-card" data-id="${anime.id}" onclick="abrirModal(event, ${anime.id})">
      <img src="${anime.imagem}" alt="${anime.nome}" loading="lazy" onerror="this.src='https://via.placeholder.com/80x110/1a1a2e/9b59b6?text=+'">
      <div class="trending-card__info">
        <span class="trending-card__rank">#${posicao}</span>
        <h4 class="trending-card__nome">${anime.nome}</h4>
        <span class="trending-card__nota">⭐ ${anime.nota.toFixed(1)}</span>
      </div>
    </div>
  `;
}

/**
 * Cria o HTML do modal de detalhes de um anime
 */
function criarModalAnime(anime) {
  const userVotos = JSON.parse(localStorage.getItem('userVotes') || '{}');
  const minhaVota = userVotos[anime.id];
  const favs = JSON.parse(localStorage.getItem('favs') || '[]');
  const isFav = favs.includes(anime.id);
  const lista = JSON.parse(localStorage.getItem('lista') || '[]');
  const naLista = lista.includes(anime.id);

  const starsHTML = Array.from({ length: 10 }, (_, i) => `
    <button class="vote-star ${minhaVota !== undefined && i < minhaVota ? 'vote-star--on' : ''}"
      data-val="${i + 1}" onclick="votar(${anime.id}, ${i + 1})" aria-label="Nota ${i + 1}">★</button>
  `).join('');

  const comentarios = JSON.parse(localStorage.getItem(`comments_${anime.id}`) || '[]');
  const commentsHTML = comentarios.length
    ? comentarios.map(c => `
        <div class="comment">
          <span class="comment__autor">${c.autor}</span>
          <p class="comment__texto">${c.texto}</p>
        </div>
      `).join('')
    : `<p class="comment-empty">Seja o primeiro a comentar!</p>`;

  return `
    <div class="modal__inner">
      <button class="modal__close" onclick="fecharModal()" aria-label="Fechar">✕</button>

      <div class="modal__hero">
        <img src="${anime.imagem}" alt="${anime.nome}" class="modal__img" onerror="this.src='https://via.placeholder.com/225x320/1a1a2e/9b59b6?text=Anime'">
        <div class="modal__header">
          <h2 class="modal__titulo">${anime.nome}</h2>
          <div class="modal__generos">${renderGeneros(anime.genero)}</div>
          <div class="modal__stats">
            <div class="stat-box">
              <span class="stat-box__val">${anime.nota.toFixed(1)}</span>
              <span class="stat-box__label">Nota Média</span>
            </div>
            <div class="stat-box">
              <span class="stat-box__val">${anime.votos.toLocaleString('pt-BR')}</span>
              <span class="stat-box__label">Votos</span>
            </div>
            <div class="stat-box">
              <span class="stat-box__val">${anime.episodios}</span>
              <span class="stat-box__label">Episódios</span>
            </div>
          </div>
          <div class="modal__acoes">
            <button class="btn btn--outline ${isFav ? 'btn--fav-active' : ''}" onclick="toggleFav(event, ${anime.id}); atualizarBotoesModal(${anime.id})">
              ${isFav ? '❤️ Favoritado' : '🤍 Favoritar'}
            </button>
            <button class="btn btn--outline ${naLista ? 'btn--lista-active' : ''}" onclick="toggleLista(event, ${anime.id}); atualizarBotoesModal(${anime.id})">
              ${naLista ? '✅ Na sua lista' : '➕ Minha Lista'}
            </button>
          </div>
        </div>
      </div>

      <div class="modal__body">
        <section class="modal__section">
          <h3 class="section-title">Sinopse</h3>
          <p class="modal__sinopse">${anime.sinopse}</p>
        </section>

        <section class="modal__section">
          <h3 class="section-title">Trailer</h3>
          <div class="modal__trailer">
            <iframe src="${anime.trailer}" title="Trailer ${anime.nome}" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen loading="lazy"></iframe>
          </div>
        </section>

        <section class="modal__section">
          <h3 class="section-title">Avalie este anime</h3>
          ${minhaVota !== undefined
            ? `<p class="vote-feito">Você votou: <strong>${minhaVota}/10</strong> ⭐</p>`
            : `<div class="vote-stars" id="vote-stars-${anime.id}">${starsHTML}</div>`
          }
        </section>

        <section class="modal__section">
          <h3 class="section-title">Comentários</h3>
          <div class="comments-list" id="comments-list-${anime.id}">${commentsHTML}</div>
          <div class="comment-form">
            <input type="text" id="comment-autor" class="input" placeholder="Seu apelido" maxlength="30">
            <textarea id="comment-texto" class="input textarea" placeholder="Escreva seu comentário..." maxlength="300" rows="3"></textarea>
            <button class="btn btn--primary" onclick="adicionarComentario(${anime.id})">Comentar</button>
          </div>
        </section>

        <section class="modal__section">
          <h3 class="section-title">Recomendações por gênero</h3>
          <div class="rec-grid" id="recomendacoes-${anime.id}"></div>
        </section>
      </div>
    </div>
  `;
}

/**
 * Renderiza uma mensagem de "nenhum resultado" para buscas
 */
function renderVazio(mensagem = 'Nenhum anime encontrado.') {
  return `
    <div class="empty-state">
      <span class="empty-state__icon">🔍</span>
      <p>${mensagem}</p>
    </div>
  `;
}

/**
 * Exibe um toast de notificação temporário
 */
function showToast(mensagem, tipo = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast--${tipo}`;
  toast.textContent = mensagem;
  container.appendChild(toast);

  // Animar entrada
  requestAnimationFrame(() => toast.classList.add('toast--visible'));

  // Remover após 3s
  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Expor funções globalmente
window.renderBadge = renderBadge;
window.renderStars = renderStars;
window.renderGeneros = renderGeneros;
window.criarCardAnime = criarCardAnime;
window.criarCardTrending = criarCardTrending;
window.criarModalAnime = criarModalAnime;
window.renderVazio = renderVazio;
window.showToast = showToast;
