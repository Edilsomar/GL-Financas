// O que fazer:
// Crie uma variável chamada relatorioDiario.
// Use o Spread (...) para colocar todos os itens de manha e todos os de tarde dentro dessa nova lista.
// Adicione manualmente o item 'Revisão Final' no final dessa lista.
// Dê um console.log(relatorioDiario).

const manha = ['Lavagem Premium', 'Polimento'];
const tarde = ['Higienização Interna', 'Cera de Carnaúba'];

const relatorioDiario = [...manha, ...tarde, "Revisão Final"]
console.log(relatorioDiario)
