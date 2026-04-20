// Use sua função async function buscarDados().
// Busque o usuário 3: https://jsonplaceholder.typicode.com/users/3.
// Na hora de desestruturar o json, pegue o name do usuário e o name que está dentro de company.
// Exiba no console: "O [nome] trabalha na empresa [nomeEmpresa]".

async function buscarDados(){
    const api = await fetch('https://jsonplaceholder.typicode.com/users/1')
    const json = await api.json()
    const {name, email, company: {name : nomeEmpresa}} = json

    console.log(`Usuário: ${name} Email: ${email} Empresa: ${nomeEmpresa}`)
}
buscarDados()


// company: { ... } → "JavaScript, entre na chave company".
// name: nomeEmpresa → "Pegue o name que está lá dentro e salve em uma variável chamada nomeEmpresa" 
// (precisamos renomear porque a variável name já existe para o usuário).