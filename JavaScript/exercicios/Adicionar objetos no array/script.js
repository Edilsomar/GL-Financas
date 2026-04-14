let lista = []
let id = 1

function adicionar(){
    let input = document.getElementById('input')

    lista.push({
        id: id,
        nome : input.value
    })

    id++
    input.value = ''
}
