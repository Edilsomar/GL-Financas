// ==========================================
// VARIÁVEIS GLOBAIS E INICIALIZAÇÃO
// ==========================================
let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')); 
const feed = document.getElementById('feed-produtos');
const containerBusca = document.getElementById('container-busca');
const campoBusca = document.getElementById('campoBusca');
const overlay = document.getElementById('overlay');

const IMGBB_API_KEY = 'e78808d57f0cf6f6fabe4a68aec3890f';

let abaAtual = 'tudo'; 
let fotosTempEdicao = []; 
let produtosGlobaisNaNuvem = []; 

if (!usuarioLogado) window.location.href = 'login.html';

// ==========================================
// CONEXÃO COM O FIREBASE (TEMPO REAL)
// ==========================================
auth.onAuthStateChanged(async (user) => {
    if (user) {
        let userRef = db.collection('usuarios').doc(user.uid);
        let doc = await userRef.get();
        
        if (!doc.exists) {
            const snapEmail = await db.collection('usuarios').where('email', '==', user.email).get();
            if (!snapEmail.empty) {
                userRef = db.collection('usuarios').doc(snapEmail.docs[0].id);
                usuarioLogado = snapEmail.docs[0].data();
            }
        } else {
            usuarioLogado = doc.data();
        }

        if (usuarioLogado) {
            usuarioLogado.uid = userRef.id;
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            
            // ATUALIZA PARA ONLINE AO CARREGAR QUALQUER PÁGINA QUE TENHA O ABRIRMENU
            await userRef.update({ online: true });
            
            atualizarInterfaceUsuario();
        }
        
        escutarProdutosNaNuvem();
        monitorarMensagensNovas(); 
        
    } else {
        localStorage.clear();
        window.location.href = 'login.html';
    }
});

// REMOVIDO O beforeunload DAQUI PARA NÃO FICAR OFFLINE AO CLICAR NO CHAT

// ==========================================
// VIGIA DE MENSAGENS NOVAS (NOTIFICAÇÃO)
// ==========================================
function monitorarMensagensNovas() {
    const dot = document.getElementById('dotNotificacao');
    if (!dot) return;

    db.collection('chats')
      .where('participantes', 'array-contains', usuarioLogado.email)
      .onSnapshot(snapshot => {
          let temMensagemNova = false;
          const ultimaVista = parseInt(localStorage.getItem('ultimaVezVistoMensagens')) || 0;

          snapshot.forEach(doc => {
              const chat = doc.data();
              if (chat.ultimoRemetente && chat.ultimoRemetente !== usuarioLogado.email) {
                  if (chat.dataAtualizacao > ultimaVista) {
                      temMensagemNova = true;
                  }
              }
          });

          dot.style.display = temMensagemNova ? 'block' : 'none';
      });
}

function atualizarInterfaceUsuario() {
    if(document.getElementById('nomeUsuarioMenu')) document.getElementById('nomeUsuarioMenu').textContent = usuarioLogado.nome;
    if(document.getElementById('enderecoUsuarioMenu')) document.getElementById('enderecoUsuarioMenu').textContent = usuarioLogado.endereco || "Localização";
    if(document.getElementById('fotoPerfilMenu')) document.getElementById('fotoPerfilMenu').src = usuarioLogado.foto;
    
    const btnFoto = document.getElementById('fotoPerfilMenu');
    if(btnFoto) btnFoto.onclick = (e) => { e.stopPropagation(); abrirMenuPerfil(); };
    
    const btnPerf = document.getElementById('btnPerfilFooter');
    if(btnPerf) btnPerf.onclick = (e) => { e.stopPropagation(); abrirMenuPerfil(); };
}

function escutarProdutosNaNuvem() {
    db.collection('produtos').orderBy('id', 'desc').onSnapshot(snapshot => {
        produtosGlobaisNaNuvem = snapshot.docs.map(doc => ({ 
            idDB: doc.id, 
            ...doc.data() 
        }));
        renderizarProdutos(abaAtual); 
    });
}

// ==========================================
// FUNÇÕES DE FOTO E PERFIL
// ==========================================
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

async function salvarPerfil() {
    const btn = document.querySelector('#modalEditarUsuario button');
    btn.innerText = "Salvando...";
    btn.disabled = true;
    
    let fotoAtual = document.getElementById('preFotoP').src;
    const fotoInput = document.getElementById('inFotoPerfil');

    if (fotoInput && fotoInput.files[0]) {
        const formData = new FormData();
        formData.append('image', fotoInput.files[0]);
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: 'POST', body: formData });
        const json = await res.json();
        fotoAtual = json.data.url;
    }
    
    usuarioLogado.nome = document.getElementById('edNomeU').value;
    usuarioLogado.telefone = document.getElementById('edTelU').value;
    usuarioLogado.endereco = document.getElementById('edEndU').value;
    usuarioLogado.foto = fotoAtual; 

    try {
        await db.collection('usuarios').doc(usuarioLogado.uid).update(usuarioLogado);
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

        const updates = produtosGlobaisNaNuvem
            .filter(p => p.donoEmail === usuarioLogado.email)
            .map(p => db.collection('produtos').doc(p.idDB).update({
                donoNome: usuarioLogado.nome,
                donoFoto: usuarioLogado.foto,
                donoEndereco: usuarioLogado.endereco
            }));
        await Promise.all(updates);

        alert("Perfil atualizado!");
        location.reload();
    } catch (e) { alert(e.message); btn.disabled = false; }
}

// ==========================================
// GESTÃO DE ANÚNCIOS
// ==========================================
function abrirModalEdicaoAnuncio(idDB) {
    const p = produtosGlobaisNaNuvem.find(item => item.idDB === idDB);
    if (!p) return;
    document.getElementById('edAnunId').value = p.idDB;
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
        const formData = new FormData();
        formData.append('image', input.files[0]);
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: 'POST', body: formData });
        const json = await res.json();
        fotosTempEdicao.push(json.data.url);
        atualizarGridFotos();
    }
}

function removerFotoTemp(index) {
    if (fotosTempEdicao.length <= 1) return alert("Mínimo 1 foto!");
    fotosTempEdicao.splice(index, 1);
    atualizarGridFotos();
}

async function salvarEdicaoAnuncio() {
    const idDB = document.getElementById('edAnunId').value;
    await db.collection('produtos').doc(idDB).update({
        nome: document.getElementById('edAnunNome').value,
        descricao: document.getElementById('edAnunDesc').value,
        fotos: fotosTempEdicao,
        foto: fotosTempEdicao[0]
    });
    fecharModaisEdicao();
}

async function marcarComoTrocado(idDB) {
    if (confirm("Marcar como trocado?")) await db.collection('produtos').doc(idDB).update({ status: "trocado" });
}

async function excluirProduto(idDB) {
    if (confirm("Excluir anúncio?")) await db.collection('produtos').doc(idDB).delete();
}

// ==========================================
// FEED E RENDERIZAÇÃO
// ==========================================
function criarCardHTML(p) {
    const favs = JSON.parse(localStorage.getItem('meusFavoritos')) || [];
    const ehFav = favs.includes(String(p.id));
    const ehMeu = p.donoEmail === usuarioLogado.email;
    const estaTrocado = p.status === "trocado";

    return `
        <div class="conteiner_produto" style="${estaTrocado ? 'opacity: 0.6;' : ''}">
            <div class="produto_imgEdescri" onclick="window.location.href='produto.html?id=${p.id}'">
                <button class="btn-favoritar" onclick="event.stopPropagation(); alternarFavorito('${p.id}')">${ehFav ? '❤️' : '🤍'}</button>
                <img class="img_produto" src="${p.fotos ? p.fotos[0] : p.foto}">
                <div class="descricao_produto">
                    <span style="font-size:10px; background:#eee; padding:2px 6px; border-radius:4px;">${p.categoria}</span>
                    <h2 class="nome_produto">${p.nome} ${estaTrocado ? '<small>(TROCADO)</small>' : ''}</h2>
                    <p class="paragrafo_produto">${p.descricao.substring(0, 45)}...</p>
                    ${ehMeu ? `
                        <div style="display:flex; gap:10px; margin-top:10px;">
                            <button onclick="event.stopPropagation(); abrirModalEdicaoAnuncio('${p.idDB}')">✏️</button>
                            ${!estaTrocado ? `<button onclick="event.stopPropagation(); marcarComoTrocado('${p.idDB}')">✔️</button>` : ''}
                            <button onclick="event.stopPropagation(); excluirProduto('${p.idDB}')">🗑️</button>
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
                    ${ehMeu ? `<span style="font-size:12px; color:#999;">Meu Item</span>` 
                    : `<button class="botao_trocar" onclick="event.stopPropagation(); window.location.href='produto.html?id=${p.id}'">Trocar</button>`}
                </div>
            </div>
        </div>`;
}

function renderizarProdutos(filtro = null) {
    if (filtro) abaAtual = filtro;
    if (!feed) return;
    feed.innerHTML = "";
    let exibir = [...produtosGlobaisNaNuvem];
    if (abaAtual === 'meus') exibir = exibir.filter(p => p.donoEmail === usuarioLogado.email);
    else if (abaAtual === 'favoritos') {
        const favs = JSON.parse(localStorage.getItem('meusFavoritos')) || [];
        exibir = exibir.filter(p => favs.includes(String(p.id)));
    } else {
        exibir = exibir.filter(p => p.status !== "trocado");
        if (abaAtual !== 'tudo' && abaAtual !== 'Ver Tudo') exibir = exibir.filter(p => p.categoria === abaAtual);
    }
    if (exibir.length === 0) {
        feed.innerHTML = `<p style="text-align:center; padding:50px; color:#999;">Nenhum item encontrado.</p>`;
        return;
    }
    exibir.forEach(p => feed.innerHTML += criarCardHTML(p));
}

function alternarFavorito(id) {
    let f = JSON.parse(localStorage.getItem('meusFavoritos')) || [];
    f = f.includes(String(id)) ? f.filter(i => i !== String(id)) : [...f, String(id)];
    localStorage.setItem('meusFavoritos', JSON.stringify(f));
    renderizarProdutos(abaAtual); 
}

// ==========================================
// EVENTOS E UI
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('btnAdicionar')) document.getElementById('btnAdicionar').onclick = () => location.href = 'cadastrar-produto.html';
    if(document.getElementById('btnMenu')) document.getElementById('btnMenu').onclick = () => { document.getElementById('menuLateral').classList.add('aberto'); overlay.style.display='block'; };
    
    const btnBusca = document.getElementById('btnBuscaFooter');
    if(btnBusca) btnBusca.onclick = alternarBusca;

    const btnChat = document.getElementById('btnChatFooter');
    if(btnChat) btnChat.onclick = () => location.href = 'mensagens.html';
    
    overlay.onclick = fecharTudo;

    document.querySelectorAll('.cat-item').forEach(cat => {
        cat.onclick = () => { renderizarProdutos(cat.innerText); fecharTudo(); };
    });

    if(campoBusca) campoBusca.oninput = (e) => {
        const t = e.target.value.toLowerCase();
        const filtrados = produtosGlobaisNaNuvem.filter(p => p.status !== "trocado" && (p.nome.toLowerCase().includes(t) || p.descricao.toLowerCase().includes(t)));
        feed.innerHTML = "";
        filtrados.forEach(p => feed.innerHTML += criarCardHTML(p));
    };
});

function alternarBusca() {
    containerBusca.style.display = (containerBusca.style.display === 'none') ? 'block' : 'none';
    if(containerBusca.style.display === 'block') { campoBusca.focus(); overlay.style.display='block'; }
}

function fecharModaisEdicao() {
    if(document.getElementById('modalEditarUsuario')) document.getElementById('modalEditarUsuario').style.display = 'none';
    if(document.getElementById('modalEditarAnuncio')) document.getElementById('modalEditarAnuncio').style.display = 'none';
    if(document.getElementById('overlayPerfil')) document.getElementById('overlayPerfil').style.display = 'none';
}

function fecharTudo() {
    if(document.getElementById('menuLateral')) document.getElementById('menuLateral').classList.remove('aberto');
    overlay.style.display = 'none';
    if(containerBusca) containerBusca.style.display = 'none';
    fecharMenuPerfil();
    fecharModaisEdicao();
}

function mostrarMeusAnuncios() { abaAtual = 'meus'; renderizarProdutos(); fecharTudo(); }
function mostrarFavoritos() { abaAtual = 'favoritos'; renderizarProdutos(); fecharTudo(); }

if(document.getElementById('btnSair')) {
    document.getElementById('btnSair').onclick = () => { 
        if(usuarioLogado && usuarioLogado.uid) {
            db.collection('usuarios').doc(usuarioLogado.uid).update({ online: false }).then(() => {
                auth.signOut().then(() => { localStorage.clear(); location.href = 'login.html'; });
            });
        }
    };
}