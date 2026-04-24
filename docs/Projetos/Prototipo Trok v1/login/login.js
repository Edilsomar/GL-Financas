// Seleção de elementos
const telaLogin = document.getElementById('tela-login');
const telaCadastro = document.getElementById('tela-cadastro');
const irParaCadastro = document.getElementById('irParaCadastro');
const irParaLogin = document.getElementById('irParaLogin');

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

// LÓGICA DE CADASTRO COM FOTO
document.getElementById('formCadastro').addEventListener('submit', function(e) {
    e.preventDefault();

    const fotoInput = document.getElementById('cadFoto');
    const arquivo = fotoInput.files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        const base64Foto = reader.result; // Imagem convertida em texto

        const novoUsuario = {
            nome: document.getElementById('cadNome').value,
            telefone: document.getElementById('cadTelefone').value,
            foto: base64Foto,
            endereco: document.getElementById('cadEndereco').value,
            email: document.getElementById('cadEmail').value,
            senha: document.getElementById('cadSenha').value
        };

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        if (usuarios.find(u => u.email === novoUsuario.email)) {
            alert("E-mail já cadastrado!");
        } else {
            usuarios.push(novoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            localStorage.setItem('usuarioLogado', JSON.stringify(novoUsuario));
            
            alert("Conta criada com sucesso!");
            window.location.href = 'index.html';
        }
    };

    if (arquivo) {
        reader.readAsDataURL(arquivo); // Inicia a conversão da imagem
    }
});

// LÓGICA DE LOGIN
document.getElementById('formLogin').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;
    
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const user = usuarios.find(u => u.email === email && u.senha === senha);

    if (user) {
        localStorage.setItem('usuarioLogado', JSON.stringify(user));
        window.location.href = 'index.html';
    } else {
        alert("E-mail ou senha incorretos!");
    }
});