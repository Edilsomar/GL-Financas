//SOMAR VALORES POSITIVOS

//Versão iniciante
const valores = [1, 2, -3, 4, 5];
const entradasTotais = document.getElementById('ul');


function soma(){
    let soma = 0;

    for(let i = 0 ; i < valores.length ; i++){
        if(valores[i] > 0){
            soma += valores[i];
        }
    }
    
    entradasTotais.innerHTML = '';

    const li = document.createElement('li')
    li.textContent = soma
    entradasTotais.appendChild(li)
}

//Versão intermediario
const valores = [1, 2, -3, 4, 5];
const entradasTotais = document.getElementById('ul');

function soma(){
    let soma = 0;

    for(let i of valores){
        if(i > 0){
            soma += i;
        }
    }

    entradasTotais.innerHTML = '';

    const li = document.createElement('li')
    li.textContent = soma
    entradasTotais.appendChild(li)
}

//Versão Avançado
const valores = [1, 2, -3, 4, 5];
const entradasTotais = document.getElementById('ul');

function soma(){
    
    const soma = valores
    .filter(n => n > 0)
    .reduce((total, n) => total + n, 0);

    entradasTotais.innerHTML = '';

    const li = document.createElement('li')
    li.textContent = soma
    entradasTotais.appendChild(li)
// SOMAR VALORES POSITIVOS

const valores = [1, 2, -3, 4, 5];
const entradasTotais = document.getElementById('ul');

// 🟢 Versão iniciante
function somaFor(){
    let soma = 0;

    for(let i = 0 ; i < valores.length ; i++){
        if(valores[i] > 0){
            soma += valores[i];
        }
    }

    entradasTotais.innerHTML = '';

    const li = document.createElement('li');
    li.textContent = soma;
    entradasTotais.appendChild(li);
}


// 🟡 Versão intermediário
function somaForOf(){
    let soma = 0;

    for(let i of valores){
        if(i > 0){
            soma += i;
        }
    }

    entradasTotais.innerHTML = '';

    const li = document.createElement('li');
    li.textContent = soma;
    entradasTotais.appendChild(li);
}


// 🔴 Versão avançado
function somaReduce(){
    const soma = valores
        .filter(n => n > 0)
        .reduce((total, n) => total + n, 0);

    entradasTotais.innerHTML = '';

    const li = document.createElement('li');
    li.textContent = soma;
    entradasTotais.appendChild(li);
}

