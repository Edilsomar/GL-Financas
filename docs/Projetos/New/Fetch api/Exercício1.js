// Crie a função async function buscarDados().
// Busque o usuário 3 nesta URL: https://jsonplaceholder.typicode.com/users/3
// Converta para JSON.
// Use a desestruturação para extrair as chaves name e username.
// Dê um console.log mostrando: "Nome: [name] | Apelido: [username]".

async function buscarDados(){
    const api = await fetch('https://jsonplaceholder.typicode.com/users/3')
    const json = await api.json()
    const {name, username} = json
    console.log(`Olá ${name} ${username}`)
}
buscarDados()