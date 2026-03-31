var email = document.getElementById('email')
var senha = document.getElementById('senha')
email.focus()

function login(){
    if(email.value.length == 0){
        window.alert('[ERRO] O Campo "Email" está vazio!')
        email.focus()
    }else if(senha.value.length == 0){
        window.alert('[ERRO] O Campo "Senha" está vazio')
        senha.focus()
    }else{
        window.alert('Login realizado com sucesso!')
        email.value = ''
        senha.value = ''
        email.focus()
    }
}
function esqueceu(){
    window.prompt('Digite o seu Email!')
}

