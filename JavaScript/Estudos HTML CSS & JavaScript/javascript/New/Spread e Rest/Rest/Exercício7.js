// Use a desestruturação de Objeto para criar a variável nome.
// Use o Rest (...) para criar a variável infoTecnica com o que sobrar.
// Dê um console.log(nome) e um console.log(infoTecnica).

const produto = {
  nome: 'Mussarela',
  preco: 45.90,
  estoque: 12,
  unidade: 'kg'
};

const {nome, ...infoTecnica} = produto
console.log(nome)
console.log(infoTecnica)