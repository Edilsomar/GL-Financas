// Crie duas variáveis chamadas campeao e vice usando a desestruturação de Array (usando [ ]).
// A variável campeao deve receber o primeiro nome, e a vice o segundo.
// Dê um console.log com os dois.

const podio = ['Max Verstappen', 'Lewis Hamilton', 'Lando Norris'];

const [campeao, vice, terceiro] = podio
console.log(`Terceiro lugar: ${terceiro} Segundo lugar: ${vice} Primeiro lugar: ${campeao}`)



//Quando a variavel é um array para fazer uma desestruturação é necessario dar nomes aos indices em sua respectiva ordem
//Quando a variavel contem um objeto, temos que pegar o nome do item especifico dentro do objeto

