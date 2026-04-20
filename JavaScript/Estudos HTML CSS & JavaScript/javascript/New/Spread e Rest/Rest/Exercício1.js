// Use a desestruturação de Objeto para criar a variável nome e pegar o primeiro objeto
// Use o operador Rest (...) para criar uma variável chamada detalhes que deve conter todo o resto (preço, quantidade e categoria).
// Dê um console.log(nome) e um console.log(detalhes).

const produto = {
  nome: 'Bacon extra',
  preco: 15.50,
  quantidade: 10,
  categoria: 'Frios'
};

const {nome, ...resto} = produto 
console.log(resto)
