//SOMAR VALORES DE UM ARRAY

//Versão iniciante
const valores = [-1, 2, -3, 4, 5];
const valorTotal = document.getElementById('ul');

function soma(){
    const soma = 0;

    for(let i = 0 ; i < valores.length ; i++){
        soma += valores[i];
    }
    const li = document.createElement('li')
    li.innerHTML = soma
    valorTotal.appendChild(li)
}

//Versão intermediario
const valores = [1, 2, -3, 4, 5];
const valorTotal = document.getElementById('ul');

function soma(){
    const soma = 0;

    for(let i of valores){
        soma += i;
    }
    const li = document.createElement('li')
    li.innerHTML = soma
    valorTotal.appendChild(li)
}

//Versão Avançado
const valores = [1, 2, -3, 4, 5];
const valorTotal = document.getElementById('ul');

function soma(){
    const soma = valores.reduce((total, n) => total + n, 0);

    const li = document.createElement('li')
    li.innerHTML = soma
    valorTotal.appendChild(li)
}
