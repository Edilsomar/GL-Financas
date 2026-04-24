const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
const feed = document.getElementById('feed-produtos');
const containerBusca = document.getElementById('container-busca');
const campoBusca = document.getElementById('campoBusca');
const overlay = document.getElementById('overlay');

let abaAtual = 'tudo'; 
let fotosTempEdicao = []; 

if (!usuarioLogado) window.location.href = 'login.html';

const toBase64 = file => new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res(reader.result);
    reader.onerror = e => rej(e);
});

async function previewImagem(input, imgId) {
    if (input.files && input.files[0]) {
        const b64 = await toBase64(input.files[0]);
        document.getElementById(imgId).src = b64;
    }
}

// ==========================================
// GESTÃO DE PERFIL
// ==========================================
function abrirMenuPerfil() {
    document.getElementById('fotoPerfilOpcoes').src = usuarioLogado.foto;
    document.getElementById('nomePerfilOpcoes').textContent = usuarioLogado.nome;
    document.getElementById('menuPerfil').classList.add('ativo');
    document.getElementById('overlayPerfil').style.display = 'block';
}

function fecharMenuPerfil() {
    document.getElementById('menuPerfil').classList.remove('ativo');
    document.getElementById('overlayPerfil').style.display = 'none';
}

function abrirModalUsuario() {
    fecharMenuPerfil();
    document.getElementById('preFotoP').src = usuarioLogado.foto;
    document.getElementById('edNomeU').value = usuarioLogado.nome;
    document.getElementById('edTelU').value = usuarioLogado.telefone || "";
    document.getElementById('edEndU').value = usuarioLogado.endereco || "";
    document.getElementById('modalEditarUsuario').style.display = 'block';
    document.getElementById('overlayPerfil').style.display = 'block';
}

function salvarPerfil() {
    const nomeAntigo = usuarioLogado.nome;
    const emailRef = usuarioLogado.email;

    usuarioLogado.nome = document.getElementById('edNomeU').value;
    usuarioLogado.telefone = document.getElementById('edTelU').value;
    usuarioLogado.endereco = document.getElementById('edEndU').value;
    usuarioLogado.foto = document.getElementById('preFotoP').src;

    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

    // CORREÇÃO AQUI: Salva na chave 'usuarios' igual o login.js usa!
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.map(u => {
        if (u.email === emailRef) {
            return { ...u, ...usuarioLogado };
        }
        return u;
    });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    let produtos = JSON.parse(localStorage.getItem('bancoProdutos')) || [];
    produtos = produtos.map(p => {
        if ((emailRef && p.donoEmail === emailRef) || p.donoNome === nomeAntigo) {
            p.donoNome = usuarioLogado.nome;
            p.donoFoto = usuarioLogado.foto;
            p.donoEndereco = usuarioLogado.endereco;
        }
        return p;
    });
    localStorage.setItem('bancoProdutos', JSON.stringify(produtos));
    
    alert("Perfil atualizado com sucesso!");
    location.reload();
}

// ==========================================
// GESTÃO DE ANÚNCIOS E FOTOS
// ==========================================
function abrirModalEdicaoAnuncio(id) {
    const produtos = JSON.parse(localStorage.getItem('bancoProdutos')) || [];
    const p = produtos.find(item => String(item.id) === String(id));
    if (!p) return;

    document.getElementById('edAnunId').value = p.id;
    document.getElementById('edAnunNome').value = p.nome;
    document.getElementById('edAnunDesc').value = p.descricao;
    fotosTempEdicao = p.fotos ? [...p.fotos] : [p.foto];
    
    atualizarGridFotos();
    document.getElementById('modalEditarAnuncio').style.display = 'block';
    document.getElementById('overlayPerfil').style.display = 'block';
}

function atualizarGridFotos() {
    const grid = document.getElementById('gridFotosEdit');
    grid.innerHTML = "";
    fotosTempEdicao.forEach((foto, index) => {
        grid.innerHTML += `
            <div class="item-foto-edit">
                <button class="btn-remover-foto" onclick="removerFotoTemp(${index})">X</button>
                <img src="${foto}">
            </div>`;
    });
    for (let i = fotosTempEdicao.length; i < 3; i++) {
        grid.innerHTML += `
            <div class="item-foto-edit">
                <button class="btn-add-foto" onclick="document.getElementById('inAddFotoAnun').click()">+</button>
            </div>`;
    }
}

async function addFotoAoAnuncio(input) {
    if (input.files && input.files[0]) {
        const b64 = await toBase64(input.files[0]);
        fotosTempEdicao.push(b64);
        atualizarGridFotos();
        input.value = "";
    }
}

function removerFotoTemp(index) {
    if (fotosTempEdicao.length <= 1) return alert("Mínimo de 1 foto!");
    fotosTempEdicao.splice(index, 1);
    atualizarGridFotos();
}

function salvarEdicaoAnuncio() {
    const id = document.getElementById('edAnunId').value;
    let produtos = JSON.parse(localStorage.getItem('bancoProdutos')) || [];
    produtos = produtos.map(p => {
        if (String(p.id) === String(id)) {
            p.nome = document.getElementById('edAnunNome').value;
            p.descricao = document.getElementById('edAnunDesc').value;
            p.fotos = fotosTempEdicao;
            p.foto = fotosTempEdicao[0];
        }
        return p;
    });
    localStorage.setItem('bancoProdutos', JSON.stringify(produtos));
    fecharModaisEdicao();
    atualizarTelaAposAcao();
}

function marcarComoTrocado(id) {
    if (confirm("Marcar como trocado? Ele sairá do feed principal.")) {
        let produtos = JSON.parse(localStorage.getItem('bancoProdutos')) || [];
        produtos = produtos.map(p => {
            if (String(p.id) === String(id)) p.status = "trocado";
            return p;
        });
        localStorage.setItem('bancoProdutos', JSON.stringify(produtos));
        atualizarTelaAposAcao();
    }
}

// ==========================================
// FUNÇÃO DE CRIAÇÃO DO CARD (MOLDE)
// ==========================================
function criarCardHTML(p) {
    const favs = JSON.parse(localStorage.getItem('meusFavoritos')) || [];
    const ehFav = favs.map(String).includes(String(p.id));
    const ehMeu = (p.donoEmail && p.donoEmail === usuarioLogado.email) || p.donoNome === usuarioLogado.nome;
    const estaTrocado = p.status === "trocado";

    return `
        <div class="conteiner_produto" style="${estaTrocado ? 'opacity: 0.7; border: 1px solid #ccc;' : ''}">
            <div class="produto_imgEdescri" onclick="window.location.href='produto.html?id=${p.id}'">
                <button class="btn-favoritar" onclick="event.stopPropagation(); alternarFavorito(${p.id})">${ehFav ? '❤️' : '🤍'}</button>
                <img class="img_produto" src="${p.fotos ? p.fotos[0] : p.foto}">
                <div class="descricao_produto">
                    <span style="font-size:10px; background:#eee; padding:2px 6px; border-radius:4px;">${p.categoria}</span>
                    <h2 class="nome_produto">${p.nome} ${estaTrocado ? '<span style="color:green;">(TROCADO)</span>' : ''}</h2>
                    <p class="paragrafo_produto">${p.descricao.substring(0, 50)}...</p>
                    ${ehMeu ? `
                        <div style="display:flex; gap:10px; margin-top:10px; flex-wrap:wrap;">
                            <button onclick="event.stopPropagation(); abrirModalEdicaoAnuncio(${p.id})" style="color:#e96e28; border:none; background:none; font-weight:bold; cursor:pointer; font-size:12px;">✏️ Editar</button>
                            ${!estaTrocado ? `<button onclick="event.stopPropagation(); marcarComoTrocado(${p.id})" style="color:green; border:none; background:none; font-weight:bold; cursor:pointer; font-size:12px;">✔️ Trocado</button>` : ''}
                            <button onclick="event.stopPropagation(); excluirProduto(${p.id})" style="color:red; border:none; background:none; font-weight:bold; cursor:pointer; font-size:12px;">🗑️ Apagar</button>
                        </div>
                    ` : ''}
                </div>
            </div>
            <div class="conteiner_usuarioEbotao_trocar">
                <div class="conteiner_usuario">
                    <img class="img_usuario" src="${p.donoFoto}">
                    <div class="conteiner_usuario_dados"><h3>${p.donoNome}</h3></div>
                </div>
                <div class="conteiner_botao">
                    ${ehMeu ? `<span style="color:#999; font-weight:bold; font-size:12px;">Seu Anúncio</span>` 
                    : `<button class="botao_trocar" onclick="event.stopPropagation(); alert('Interesse enviado!')">Trocar agora</button>`}
                </div>
            </div>
        </div>`;
}

// ==========================================
// FUNÇÕES DE FILTRO E FEED
// ==========================================
function renderizarProdutos(filtro = null) {
    abaAtual = filtro || 'tudo';
    const todos = JSON.parse(localStorage.getItem('bancoProdutos')) || [];
    if (!feed) return;
    feed.innerHTML = "";
    
    let exibir = todos.filter(p => p.status !== "trocado");
    
    if (filtro && filtro !== "Ver Tudo") {
        exibir = exibir.filter(p => p.categoria === filtro);
        feed.innerHTML = `<h2 style="padding:15px; color:#e96e28; text-align:center;">${filtro}</h2>`;
    }

    if (exibir.length === 0) feed.innerHTML = `<p style="text-align:center; margin-top:20px;">Nenhum item encontrado.</p>`;
    exibir.reverse().forEach(p => feed.innerHTML += criarCardHTML(p));
}

function mostrarMeusAnuncios() {
    abaAtual = 'meus';
    const todos = JSON.parse(localStorage.getItem('bancoProdutos')) || [];
    const meus = todos.filter(p => (p.donoEmail && p.donoEmail === usuarioLogado.email) || p.donoNome === usuarioLogado.nome);
    
    feed.innerHTML = `<h2 style="padding:15px; color:#e96e28; text-align:center;">Meus Anúncios 📦</h2>`;
    
    if (meus.length === 0) {
        feed.innerHTML += `<p style="text-align:center; margin-top:20px;">Você ainda não tem anúncios.</p>`;
    } else {
        meus.reverse().forEach(p => feed.innerHTML += criarCardHTML(p));
    }
    fecharTudo();
}

function mostrarFavoritos() {
    abaAtual = 'favoritos';
    const ids = (JSON.parse(localStorage.getItem('meusFavoritos')) || []).map(String);
    const todos = JSON.parse(localStorage.getItem('bancoProdutos')) || [];
    const favs = todos.filter(p => ids.includes(String(p.id)));
    
    feed.innerHTML = `<h2 style="padding:15px; color:#e96e28; text-align:center;">Meus Favoritos ❤️</h2>`;
    
    if (favs.length === 0) {
        feed.innerHTML += `<p style="text-align:center; margin-top:20px;">Sua lista está vazia.</p>`;
    } else {
        favs.reverse().forEach(p => feed.innerHTML += criarCardHTML(p));
    }
    fecharTudo();
}

// ==========================================
// SINCRONIA IMEDIATA DE TELA
// ==========================================
function alternarFavorito(id) {
    let f = JSON.parse(localStorage.getItem('meusFavoritos')) || [];
    const sId = String(id);
    if (f.map(String).includes(sId)) {
        f = f.filter(i => String(i) !== sId);
    } else {
        f.push(sId);
    }
    localStorage.setItem('meusFavoritos', JSON.stringify(f));
    atualizarTelaAposAcao(); 
}

function atualizarTelaAposAcao() {
    if (abaAtual === 'favoritos') mostrarFavoritos();
    else if (abaAtual === 'meus') mostrarMeusAnuncios();
    else if (abaAtual === 'tudo') renderizarProdutos();
    else renderizarProdutos(abaAtual); 
}

function excluirProduto(id) {
    if (confirm("Apagar anúncio?")) {
        let p = JSON.parse(localStorage.getItem('bancoProdutos')) || [];
        localStorage.setItem('bancoProdutos', JSON.stringify(p.filter(i => String(i.id) !== String(id))));
        atualizarTelaAposAcao();
    }
}

// ==========================================
// INTERFACE E EVENTOS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nomeUsuarioMenu').textContent = usuarioLogado.nome;
    document.getElementById('enderecoUsuarioMenu').textContent = usuarioLogado.endereco || "Localização";
    document.getElementById('fotoPerfilMenu').src = usuarioLogado.foto;
    document.getElementById('fotoPerfilMenu').onclick = (e) => { e.stopPropagation(); abrirMenuPerfil(); };

    document.getElementById('btnPerfilFooter').onclick = (e) => { e.stopPropagation(); abrirMenuPerfil(); };
    document.getElementById('btnBuscaFooter').onclick = alternarBusca;
    document.getElementById('btnAdicionar').onclick = () => location.href = 'cadastrar-produto.html';
    document.getElementById('btnMenu').onclick = () => { document.getElementById('menuLateral').classList.add('aberto'); overlay.style.display='block'; };
    
    overlay.onclick = fecharTudo;

    document.querySelectorAll('.cat-item').forEach(cat => {
        cat.onclick = () => { renderizarProdutos(cat.innerText); fecharTudo(); };
    });

    campoBusca.oninput = (e) => {
        const t = e.target.value.toLowerCase();
        const todos = JSON.parse(localStorage.getItem('bancoProdutos')) || [];
        feed.innerHTML = "";
        const filtrados = todos.filter(p => p.status !== "trocado" && (p.nome.toLowerCase().includes(t) || p.descricao.toLowerCase().includes(t)));
        filtrados.reverse().forEach(p => feed.innerHTML += criarCardHTML(p));
    };

    renderizarProdutos();
});

function fecharModaisEdicao() {
    document.getElementById('modalEditarUsuario').style.display = 'none';
    document.getElementById('modalEditarAnuncio').style.display = 'none';
    document.getElementById('overlayPerfil').style.display = 'none';
}

function fecharTudo() {
    document.getElementById('menuLateral').classList.remove('aberto');
    overlay.style.display = 'none';
    containerBusca.style.display = 'none';
    fecharMenuPerfil();
    fecharModaisEdicao();
}

function alternarBusca() {
    containerBusca.style.display = (containerBusca.style.display === 'none') ? 'block' : 'none';
    if(containerBusca.style.display === 'block') { campoBusca.focus(); overlay.style.display='block'; }
}

function excluirMinhaConta() {
    if(confirm("Apagar conta e todos os anúncios permanentemente?")) {
        localStorage.clear();
        location.href = 'login.html';
    }
}

document.getElementById('btnSair').onclick = () => { localStorage.removeItem('usuarioLogado'); location.href = 'login.html'; };