//Operador ternário 

//Nivel iniciante
let span = document.querySelectorAll('.valorTotal')
let lista = [1, 5, 7, 4, 9] 

function valorTotal(){
    let soma = 0

    for(let i of lista){
        soma += i  //se for in é, i é o indice, se for of, o i é o valor q ta dentro do indice
    }
    span.forEach(valor => {
        valor.innerText = `R$ ${soma.toFixed(2)}`
        valor.style.color = soma > 0
        ? 'white'
        : 'red';
    })}

//Nivel avançado
const spans = document.querySelectorAll('.valorTotal');
const lista = [1, 5, -7, 4, 9];

function atualizarPainel() {
    // 1. Calcula a soma em uma linha
    const soma = lista.reduce((acc, val) => acc + val, 0);

    // 2. Aplica em todos os spans
    spans.forEach(el => {
        el.innerText = `R$ ${soma.toFixed(2)}`;
        // Ternário direto na cor
        el.style.color = soma >= 0 ? 'white' : 'red';
    });
}