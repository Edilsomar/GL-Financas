const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
if (!usuarioLogado) window.location.href = 'login.html';

const urlParams = new URLSearchParams(window.location.search);
const salaId = urlParams.get('sala');

if (!salaId) {
    alert("Sala de chat não encontrada.");
    window.location.href = 'index.html';
}

const formChat = document.getElementById('formChat');
const inputMensagem = document.getElementById('inputMensagem');
const boxMensagens = document.getElementById('boxMensagens');

function voltarInteligente() {
    if (document.referrer && (document.referrer.includes('mensagens.html') || document.referrer.includes('produto.html'))) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}

async function carregarCabecalho() {
    try {
        const salaDoc = await db.collection('chats').doc(salaId).get();
        if (salaDoc.exists) {
            const chat = salaDoc.data();
            const outroEmail = chat.participantes.find(e => e !== usuarioLogado.email);

            db.collection('usuarios').where('email', '==', outroEmail).onSnapshot(snap => {
                if (!snap.empty) {
                    const outroDados = snap.docs[0].data();
                    const estaOnline = outroDados.online === true;
                    const corStatus = estaOnline ? "#4CAF50" : "#999";
                    const textoStatus = estaOnline ? "Online" : "Offline";

                    document.getElementById('fotoOutroUsuario').src = chat.produtoFoto || outroDados.foto;
                    document.getElementById('nomeOutroUsuario').textContent = chat.produtoNome || "Chat";
                    document.getElementById('sobreProduto').innerHTML = `
                        <span style="color:${corStatus}; font-size:12px;">●</span> 
                        ${textoStatus} | ${outroDados.nome}
                    `;
                }
            });

            if (chat.donoEmail === usuarioLogado.email && !document.getElementById('btnFin')) {
                const cabecalho = document.getElementById('cabecalho');
                const btnFin = document.createElement('button');
                btnFin.id = "btnFin";
                btnFin.innerText = "Finalizar";
                btnFin.style = "background:#e96e28; color:white; border:none; padding:6px 12px; border-radius:6px; font-size:11px; margin-left:auto; cursor:pointer; font-weight:bold;";
                btnFin.onclick = () => finalizarTroca(chat.produtoIdDB, chat.produtoNome);
                cabecalho.appendChild(btnFin);
            }

            // Inicia a escuta de mensagens passando os dados da sala para checar o filtro
            escutarMensagens(chat);
        }
    } catch (e) { console.error("Erro no cabeçalho:", e); }
}

async function finalizarTroca(idDB, nome) {
    if (idDB && confirm(`Confirmar troca de: ${nome}?`)) {
        try {
            await db.collection('produtos').doc(idDB).update({ status: "trocado" });
            alert("Troca concluída!");
            window.location.href = 'index.html';
        } catch (e) { console.error(e); }
    }
}

function escutarMensagens(dadosSala) {
    // Busca o limite de histórico para o meu usuário (se existir)
    const meuEmailKey = usuarioLogado.email.replace(/\./g, '_');
    const limite = dadosSala[`limiteHistorico_${meuEmailKey}`] || 0;

    db.collection('chats').doc(salaId).collection('mensagens')
      .where('dataEnvio', '>', limite) // SÓ TRAZ MENSAGENS APÓS A ÚLTIMA EXCLUSÃO
      .orderBy('dataEnvio', 'asc')
      .onSnapshot(snap => {
        boxMensagens.innerHTML = "";
        snap.forEach(doc => {
            const m = doc.data();
            const eu = m.remetenteEmail === usuarioLogado.email;
            const hora = new Date(m.dataEnvio).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            boxMensagens.innerHTML += `<div class="balao-msg ${eu ? 'msg-minha' : 'msg-outro'}">${m.texto}<span class="hora-msg">${hora}</span></div>`;
        });
        setTimeout(() => { boxMensagens.scrollTop = boxMensagens.scrollHeight + 100; }, 100);
    });
}

formChat.addEventListener('submit', async (e) => {
    e.preventDefault();
    const txt = inputMensagem.value.trim();
    if (!txt) return;
    inputMensagem.value = "";
    inputMensagem.focus();

    try {
        await db.collection('chats').doc(salaId).collection('mensagens').add({
            texto: txt, remetenteEmail: usuarioLogado.email, dataEnvio: Date.now()
        });
        await db.collection('chats').doc(salaId).update({ 
            ultimaMensagem: txt, ultimoRemetente: usuarioLogado.email, dataAtualizacao: Date.now(), removidoPor: [] 
        });
    } catch (e) { console.error(e); }
});

carregarCabecalho();