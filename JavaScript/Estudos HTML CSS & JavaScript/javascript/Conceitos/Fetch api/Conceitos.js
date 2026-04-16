// O Fetch basicamente é um metodo que consume dados que vem de outro lugar atráves de uma api
// Que é um sistema usado para consumir/enviar dados
// Vamos representar um consumo de api de duas principais formas

// Primeira
async function consumirApi(){
    const api = await fetch('https://jsonplaceholder.typicode.com/users/1')
    const json = await api.json()
    console.log(json)
}
consumirApi()

//Segunda

function consumirApi() {
  fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(api => {
      // O primeiro .then recebe a resposta bruta
      return api.json(); 
    })
    .then(json => {
      // O segundo .then recebe o objeto já convertido
      console.log(json);
    });
}

consumirApi();