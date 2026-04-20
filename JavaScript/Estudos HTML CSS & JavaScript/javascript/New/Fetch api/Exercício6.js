async function buscarUsuario(id){
    try{
        const api = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        if (!api.ok){
            console.log('Dados não encontrados')
            return
        }
        const json = await api.json()
        const {name, email} = json
        console.log(`Usuário: ${name} Contato: ${email}`)
    } catch (erro) {
        console.log('Erro 404')
    }
}
buscarUsuario(1)
buscarUsuario(2)