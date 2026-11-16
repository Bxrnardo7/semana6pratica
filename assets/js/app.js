const dados = {
    responsavel: {
        nome: "Bernardo Almeida Andrade",
        descricao: "O Ipatinga Tour é um guia para conhecer lugares, histórias e experiências de Ipatinga. Explore cada destino e encontre inspiração para seu próximo passeio."
    },
    lugares: [
        {
            id: 1,
            nome: "Parque Ipanema",
            categoria: "Natureza e lazer",
            localizacao: "Ipatinga, Minas Gerais",
            experiencia: "Passeio ao ar livre",
            destaque: true,
            descricao: "Um dos principais cartões-postais da cidade, com lago, áreas verdes e espaços para atividades ao ar livre.",
            conteudo: "Projetado por Roberto Burle Marx, o Parque Ipanema reúne paisagismo, áreas de convivência e opções de lazer em meio à natureza. É um convite para caminhar, relaxar e aproveitar um dos espaços mais conhecidos de Ipatinga.",
            imagemPrincipal: "images/parqueipanema.png",
            atracoes: [
                {
                    id: 1,
                    nome: "Lago do Parque",
                    descricao: "Um cenário tranquilo para apreciar a paisagem e fazer uma pausa durante o passeio.",
                    imagem: "images/lake.png"
                },
                {
                    id: 2,
                    nome: "Áreas verdes",
                    descricao: "Espaços abertos que convidam a caminhar e aproveitar o ambiente ao ar livre.",
                    imagem: "images/parqueipanema.png"
                },
                {
                    id: 3,
                    nome: "Paisagismo",
                    descricao: "Jardins e caminhos que fazem do parque um dos cartões-postais da cidade.",
                    imagem: "images/parqueipanema.png"
                }
            ]
        },
        {
            id: 2,
            nome: "Estação Memória",
            categoria: "História e cultura",
            localizacao: "Centro de Ipatinga, Minas Gerais",
            experiencia: "Passeio cultural",
            destaque: false,
            descricao: "Um espaço para conhecer histórias e lembranças que ajudam a contar a trajetória de Ipatinga.",
            conteudo: "A Estação Memória preserva fotografias, documentos e objetos ligados à história da cidade e à formação do Vale do Aço. Uma visita ao espaço aproxima o público das memórias de quem participou do desenvolvimento da região.",
            imagemPrincipal: "images/espacomemoria.png",
            atracoes: [
                {
                    id: 1,
                    nome: "Memória da cidade",
                    descricao: "Registros e imagens que apresentam momentos importantes da história local.",
                    imagem: "images/espacomemoria.png"
                },
                {
                    id: 2,
                    nome: "Acervo histórico",
                    descricao: "Documentos e objetos que preservam lembranças de diferentes épocas.",
                    imagem: "images/espacomemoria.png"
                }
            ]
        },
        {
            id: 3,
            nome: "Clube Usipa",
            categoria: "Esporte e lazer",
            localizacao: "Ipatinga, Minas Gerais",
            experiencia: "Atividades para toda a família",
            destaque: true,
            descricao: "Um complexo tradicional da cidade, conhecido por suas atividades esportivas, lazer e contato com a natureza.",
            conteudo: "Fundada por trabalhadores da Usiminas, a Usipa reúne espaços dedicados ao esporte, à convivência e ao lazer. O complexo oferece diferentes ambientes para atividades ao ar livre e momentos em família.",
            imagemPrincipal: "images/clubeusipa.png",
            atracoes: [
                {
                    id: 1,
                    nome: "Estrutura esportiva",
                    descricao: "Espaços para a prática de esportes e atividades físicas.",
                    imagem: "images/clubeusipa.png"
                },
                {
                    id: 2,
                    nome: "Lazer ao ar livre",
                    descricao: "Áreas para descansar, passear e aproveitar o ambiente do clube.",
                    imagem: "images/clubeusipa.png"
                }
            ]
        }
    ]
};

function escaparHtml(valor) {
    return String(valor).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

function linkDetalhes(lugar) {
    return `detalhes.html?id=${encodeURIComponent(lugar.id)}`;
}

function renderizarDestaques() {
    const carousel = document.getElementById("carousel-destaques");

    if (!carousel) {
        return;
    }

    const destaques = dados.lugares.filter(lugar => lugar.destaque);

    if (destaques.length === 0) {
        carousel.innerHTML = '<p class="empty-results">Em breve, novos lugares em destaque.</p>';
        return;
    }

    const indicadores = destaques.map((lugar, indice) => `
        <button type="button" data-bs-target="#carousel-destaques" data-bs-slide-to="${indice}"${indice === 0 ? ' class="active" aria-current="true"' : ""} aria-label="Mostrar ${escaparHtml(lugar.nome)}"></button>
    `).join("");

    const slides = destaques.map((lugar, indice) => `
        <div class="carousel-item${indice === 0 ? " active" : ""}">
            <a class="featured-slide" href="${linkDetalhes(lugar)}" aria-label="Conheça ${escaparHtml(lugar.nome)}">
                <img src="${escaparHtml(lugar.imagemPrincipal)}" alt="${escaparHtml(lugar.nome)}" ${indice === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>
                <div class="featured-caption">
                    <p class="place-category">${escaparHtml(lugar.categoria)}</p>
                    <h3>${escaparHtml(lugar.nome)}</h3>
                    <p>${escaparHtml(lugar.descricao)}</p>
                </div>
            </a>
        </div>
    `).join("");

    carousel.innerHTML = `
        <div class="carousel-indicators">${indicadores}</div>
        <div class="carousel-inner">${slides}</div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-destaques" data-bs-slide="prev" aria-label="Lugar em destaque anterior">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel-destaques" data-bs-slide="next" aria-label="Próximo lugar em destaque">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
    `;

    if (destaques.length < 2) {
        carousel.querySelectorAll(".carousel-control-prev, .carousel-control-next, .carousel-indicators").forEach(controle => controle.remove());
    }
}

function renderizarLugares(lugares) {
    const container = document.getElementById("cards-container");
    const contador = document.getElementById("contador-lugares");

    if (!container || !contador) {
        return;
    }

    contador.textContent = `${lugares.length} ${lugares.length === 1 ? "lugar encontrado" : "lugares encontrados"}`;

    if (lugares.length === 0) {
        container.innerHTML = '<div class="col-12"><p class="empty-results mb-0">Nenhum lugar encontrado. Tente outra busca ou categoria.</p></div>';
        return;
    }

    container.innerHTML = lugares.map(lugar => `
        <div class="col-sm-6 col-lg-4">
            <article class="place-card">
                <a class="place-card-image" href="${linkDetalhes(lugar)}" aria-label="Ver detalhes de ${escaparHtml(lugar.nome)}">
                    <img src="${escaparHtml(lugar.imagemPrincipal)}" alt="${escaparHtml(lugar.nome)}" loading="lazy">
                </a>
                <div class="place-card-content">
                    <p class="place-category">${escaparHtml(lugar.categoria)}</p>
                    <h3><a href="${linkDetalhes(lugar)}">${escaparHtml(lugar.nome)}</a></h3>
                    <p class="place-card-description">${escaparHtml(lugar.descricao)}</p>
                    <a class="place-card-link" href="${linkDetalhes(lugar)}">Conheça o lugar <span aria-hidden="true">→</span></a>
                </div>
            </article>
        </div>
    `).join("");
}

function normalizarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function configurarBusca() {
    const busca = document.getElementById("busca-lugares");
    const categoria = document.getElementById("filtro-categoria");

    if (!busca || !categoria) {
        return;
    }

    [...new Set(dados.lugares.map(lugar => lugar.categoria))]
        .sort((a, b) => a.localeCompare(b, "pt-BR"))
        .forEach(nomeCategoria => {
            const opcao = document.createElement("option");
            opcao.value = nomeCategoria;
            opcao.textContent = nomeCategoria;
            categoria.append(opcao);
        });

    const filtrar = () => {
        const termo = normalizarTexto(busca.value);
        const categoriaSelecionada = categoria.value;
        const resultados = dados.lugares.filter(lugar => {
            const textoLugar = normalizarTexto(`${lugar.nome} ${lugar.categoria} ${lugar.localizacao} ${lugar.descricao}`);
            return textoLugar.includes(termo) && (!categoriaSelecionada || lugar.categoria === categoriaSelecionada);
        });

        renderizarLugares(resultados);
    };

    busca.addEventListener("input", filtrar);
    categoria.addEventListener("change", filtrar);
    renderizarLugares(dados.lugares);
}

function renderizarSobre() {
    const container = document.getElementById("sobre-container");

    if (!container) {
        return;
    }

    container.innerHTML = `
        <div class="about-content">
            <div>
                <p class="eyebrow eyebrow-dark">Feito para explorar</p>
                <h2 id="about-title">A cidade vista de perto.</h2>
                <p>${escaparHtml(dados.responsavel.descricao)}</p>
            </div>
            <div class="author-card">
                <span>Desenvolvido por</span>
                <strong>${escaparHtml(dados.responsavel.nome)}</strong>
            </div>
        </div>
    `;
}

function renderizarRodape() {
    const rodape = document.getElementById("rodape-container");

    if (!rodape) {
        return;
    }

    rodape.innerHTML = `
        <div class="container footer-content">
            <div>
                <p class="footer-brand">ipatingatour</p>
                <p class="footer-copy">© ${new Date().getFullYear()} Ipatinga Tour · Um guia para explorar a cidade.</p>
            </div>
            <ul class="footer-links">
                <li><a href="index.html">Início</a></li>
                <li><a href="index.html#lugares">Lugares</a></li>
                <li><a href="index.html#sobre">Sobre o projeto</a></li>
            </ul>
        </div>
    `;
}

function renderizarDetalhes() {
    const container = document.getElementById("detalhes-container");

    if (!container) {
        return;
    }

    const parametros = new URLSearchParams(window.location.search);
    const id = Number(parametros.get("id"));
    const lugar = dados.lugares.find(item => item.id === id);

    if (!lugar) {
        container.innerHTML = `
            <section class="not-found" aria-labelledby="not-found-title">
                <p class="eyebrow eyebrow-dark">Página não encontrada</p>
                <h1 id="not-found-title">Não encontramos esse lugar.</h1>
                <p>Confira o endereço ou volte para explorar todos os destinos.</p>
                <a class="btn" href="index.html#lugares">Voltar aos lugares</a>
            </section>
        `;
        return;
    }

    const atracoes = lugar.atracoes.map(atracao => `
        <div class="col-sm-6 col-lg-4">
            <article class="gallery-card">
                <img src="${escaparHtml(atracao.imagem)}" alt="${escaparHtml(atracao.nome)}" loading="lazy">
                <h3>${escaparHtml(atracao.nome)}</h3>
            </article>
        </div>
    `).join("");

    container.innerHTML = `
        <a class="back-link" href="index.html#lugares"><span aria-hidden="true">←</span> Voltar para todos os lugares</a>
        <article class="detail-overview">
            <div class="row g-0">
                <div class="col-lg-6">
                    <img class="detail-cover" src="${escaparHtml(lugar.imagemPrincipal)}" alt="${escaparHtml(lugar.nome)}">
                </div>
                <div class="col-lg-6">
                    <div class="detail-copy">
                        <p class="place-category">${escaparHtml(lugar.categoria)}</p>
                        <h1>${escaparHtml(lugar.nome)}</h1>
                        <p class="detail-summary">${escaparHtml(lugar.descricao)}</p>
                        <p class="detail-description">${escaparHtml(lugar.conteudo)}</p>
                        <div class="detail-facts" aria-label="Informações do lugar">
                            <div class="detail-fact"><span>Categoria</span><strong>${escaparHtml(lugar.categoria)}</strong></div>
                            <div class="detail-fact"><span>Localização</span><strong>${escaparHtml(lugar.localizacao)}</strong></div>
                            <div class="detail-fact"><span>Experiência</span><strong>${escaparHtml(lugar.experiencia)}</strong></div>
                            <div class="detail-fact"><span>No guia</span><strong>${lugar.destaque ? "Lugar em destaque" : "Destino para descobrir"}</strong></div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <section class="gallery-section" aria-labelledby="gallery-title">
            <div class="gallery-heading">
                <p class="eyebrow eyebrow-dark">Um pouco mais para conhecer</p>
                <h2 id="gallery-title">Fotos e atrações</h2>
            </div>
            <div class="row g-4">${atracoes}</div>
        </section>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarDestaques();
    configurarBusca();
    renderizarSobre();
    renderizarDetalhes();
    renderizarRodape();
});
