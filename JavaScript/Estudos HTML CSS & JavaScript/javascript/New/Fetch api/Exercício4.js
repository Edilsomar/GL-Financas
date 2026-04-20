// Crie a função async function pegarPostPorId(id). (Note que agora ela recebe um id como parâmetro).
// Dentro do try, no fetch, use Template Strings (aquelas com crase `) para colocar o id no final da URL.
// Exemplo: `https://jsonplaceholder.typicode.com/posts/${id}`
// Mantenha o restante (converter para JSON e dar o console.log no título).
// No final, chame a função passando um número, por exemplo: pegarPostPorId(5).

async function  pegarPostPorId(id) {
    try{
        const api = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        const json = await api.json()
        const {title} = json
        console.log(title)
    } catch(erro) {
        console.log('Erro 404!')
    }
}
pegarPostPorId(1)
pegarPostPorId(2)
pegarPostPorId(5)

