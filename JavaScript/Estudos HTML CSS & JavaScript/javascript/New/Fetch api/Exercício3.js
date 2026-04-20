// Pegue sua função consumirApi.
// Coloque todo o código (o fetch, o json e os logs) dentro de um bloco try { ... }.
// Adicione o bloco catch (error) { ... } logo abaixo para capturar qualquer falha.
// Dentro do catch, exiba uma mensagem amigável: console.log("Ops, houve um erro ao buscar os dados!").

async function consumirApi(){
  try{
    const api = await fetch('https://jsonplaceholdfsdfer.typicode.com/user/')
    const json = await api.json()
    console.log(json)
  } catch (erro) {
    console.log("Ops, houve um erro ao buscar os dados!")
  }
}
consumirApi()

async function consumirApi() {
  try {
    const api = await fetch("https://jsonplaceholdfsdfer.typicode.com/user/")
    const json = await api.json()
    console.log(json)
  } catch (error) {
    return console.log('errhbjh')
  }
}

consumirApi()