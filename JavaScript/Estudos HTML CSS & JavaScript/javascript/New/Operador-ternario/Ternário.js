//Operador ternário 

//Nivel iniciante
let span = document.querySelectorAll('.valorTotal') //pegando todos os spans no html com essa classe
let lista = [1, 5, 7, 4, 9] 

function valorTotal(){
    let soma = 0

    for(let i of lista){ //Percorrendo todos os valores da lista
        soma += i  
    }
    span.forEach(valor => {
        valor.innerText = `R$ ${soma.toFixed(2)}` 
        valor.style.color = soma > 0 ? 'white' : 'red'; // O resultado condição do ternário vai decidir a cor
    })}

//Nivel avançado
const spans = document.querySelectorAll('.valorTotal');
const lista = [1, 5, -7, 4, 9];

function valorTotal() {
    const soma = lista.reduce((acc, val) => acc + val, 0);

    spans.forEach(el => {
        el.innerText = `R$ ${soma.toFixed(2)}`;
        el.style.color = soma >= 0 ? 'white' : 'red';
    });
}