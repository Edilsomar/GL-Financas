const ul = document.getElementById('lista')

async function consumirApi(){
    const api = await fetch('https://jsonplaceholder.typicode.com/users')
    const json = await api.json()
    ul.innerHTML = json
    .map(e => `<li style="list-style: none;"> 
        Id: ${e.id}<br>
        Nome: ${e.name}<br> 
        Email: ${e.email}<br>
        Telefone: ${e.phone}<br> 
        Endereço: Rua ${e.address.street} ${e.address.suite} cidade de ${e.address.city}       
        </li>`)
    .join('<br>')
}
consumirApi()