// Seleção de elementos
const telaLogin = document.getElementById('tela-login');
const telaCadastro = document.getElementById('tela-cadastro');
const irParaCadastro = document.getElementById('irParaCadastro');
const irParaLogin = document.getElementById('irParaLogin');

// Sua Chave da API do ImgBB
const IMGBB_API_KEY = 'e78808d57f0cf6f6fabe4a68aec3890f';

// Alternar entre Telas
irParaCadastro.addEventListener('click', (e) => {
    e.preventDefault();
    telaLogin.style.display = 'none';
    telaCadastro.style.display = 'block';
});

irParaLogin.addEventListener('click', (e) => {
    e.preventDefault();
    telaCadastro.style.display = 'none';
    telaLogin.style.display = 'block';
});

// FUNÇÃO NINJA: Fazer upload da foto pro ImgBB
async function fazerUploadImgBB(arquivo) {
    const formData = new FormData();
    formData.append('image', arquivo);

    try {
        const resposta = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData
        });
        const dados = await resposta.json();
        return dados.data.url; // Retorna o link curtinho e leve da imagem!
    } catch (erro) {
        console.error("Erro ao subir a imagem:", erro);
        alert("Erro ao enviar a foto. Tente novamente.");
        return null;
    }
}

// ==========================================
// LÓGICA DE CADASTRO (FIREBASE + IMGBB)
// ==========================================
document.getElementById('formCadastro').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Muda o texto do botão pra pessoa saber que tá carregando
    const btnSubmit = e.target.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.innerText;
    btnSubmit.disabled = true;
    btnSubmit.innerText = "Preparando foto...";

    const fotoInput = document.getElementById('cadFoto');
    const arquivo = fotoInput.files[0];
    
    const nome = document.getElementById('cadNome').value;
    const telefone = document.getElementById('cadTelefone').value;
    const endereco = document.getElementById('cadEndereco').value;
    const email = document.getElementById('cadEmail').value;
    const senha = document.getElementById('cadSenha').value;

    try {
        let urlFoto = "https://i.ibb.co/7QJY5T8/default-avatar.png"; // Avatar padrão
        
        // 1. Sobe a foto pro ImgBB
        if (arquivo) {
            const urlUpload = await fazerUploadImgBB(arquivo);
            if (urlUpload) urlFoto = urlUpload;
        }

        // 2. Cria a conta de verdade no Firebase Auth
        btnSubmit.innerText = "Criando conta na nuvem...";
        const credencial = await auth.createUserWithEmailAndPassword(email, senha);
        const uid = credencial.user.uid;

        const novoUsuario = {
            uid: uid,
            nome: nome,
            telefone: telefone,
            endereco: endereco,
            email: email,
            foto: urlFoto
        };

        // 3. Salva os dados no banco Firestore
        await db.collection('usuarios').doc(uid).set(novoUsuario);

        // 4. Mantém no localStorage pra não quebrar o seu menu atual
        localStorage.setItem('usuarioLogado', JSON.stringify(novoUsuario));

        alert("Conta criada com sucesso na nuvem!");
        window.location.href = 'index.html';

    } catch (erro) {
        console.error(erro);
        if (erro.code === 'auth/email-already-in-use') {
            alert("Este e-mail já está cadastrado!");
        } else if (erro.code === 'auth/weak-password') {
            alert("A senha deve ter pelo menos 6 caracteres.");
        } else {
            alert("Erro ao cadastrar: " + erro.message);
        }
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerText = textoOriginal;
    }
});

// ==========================================
// LÓGICA DE LOGIN (FIREBASE)
// ==========================================
document.getElementById('formLogin').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btnSubmit = e.target.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.innerText;
    btnSubmit.disabled = true;
    btnSubmit.innerText = "Autenticando...";

    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;
    
    try {
        // 1. Faz o login no Firebase Auth
        const credencial = await auth.signInWithEmailAndPassword(email, senha);
        const uid = credencial.user.uid;

        // 2. Busca os dados completos do usuário no Firestore
        btnSubmit.innerText = "Baixando perfil...";
        const doc = await db.collection('usuarios').doc(uid).get();
        
        if (doc.exists) {
            const dadosUsuario = doc.data();
            
            // 3. Salva no localStorage pro app usar
            localStorage.setItem('usuarioLogado', JSON.stringify(dadosUsuario));
            window.location.href = 'index.html';
        } else {
            alert("Dados do usuário não encontrados no banco de dados.");
        }
    } catch (erro) {
        console.error(erro);
        if (erro.code === 'auth/invalid-credential' || erro.code === 'auth/user-not-found' || erro.code === 'auth/wrong-password') {
            alert("E-mail ou senha incorretos ou voce ainda não tem uma conta!");
        } else {
            alert("Erro ao fazer login: " + erro.message);
        }
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerText = textoOriginal;
    }
});

// ==========================================
// RECUPERAÇÃO DE SENHA (FIREBASE)
// ==========================================
const btnEsqueciSenha = document.getElementById('btnEsqueciSenha');

if (btnEsqueciSenha) {
    btnEsqueciSenha.addEventListener('click', async (e) => {
        e.preventDefault();
        
        // Abre uma caixinha pedindo o e-mail
        const email = prompt("Digite o e-mail da sua conta para redefinir a senha:");
        
        // Se a pessoa clicou em "Cancelar" ou deixou em branco, a gente para por aqui
        if (!email) return; 

        try {
            // Essa linha mágica do Firebase faz todo o trabalho de enviar o e-mail!
            await auth.sendPasswordResetEmail(email);
            alert("E-mail de recuperação enviado! Verifique sua caixa de entrada (e a pasta de Spam).");
        } catch (erro) {
            console.error("Erro ao recuperar senha:", erro);
            
            // Tratamento de erros para avisar o usuário do que deu errado
            if (erro.code === 'auth/user-not-found') {
                alert("Não encontramos nenhuma conta com este e-mail.");
            } else if (erro.code === 'auth/invalid-email') {
                alert("Por favor, digite um formato de e-mail válido.");
            } else {
                alert("Erro ao enviar e-mail: " + erro.message);
            }
        }
    });
}