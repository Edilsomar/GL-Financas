const produtos = [
{nome : 'camisa', preco : 100},
{nome : 'tenis', preco : 200}]

const lista = document.getElementById('lista')

lista.innerHTML = produtos
.map(p => `<li> O Produto ${p.nome} custa ${p.preco.toLocaleString('PT-BR', {style : 'currency' , currency : 'BRL'})} </li>`)
.join('')

