// Use a desestruturação para extrair cliente e carro.
// Use o Rest (...) para colocar o resto das chaves (valor, pago, data) em uma variável chamada detalhesFinanceiros.
// Dê um console.log nas três variáveis.

const servico = {
  cliente: 'Marcos Oliveira',
  carro: 'Golf GTI',
  valor: 350,
  pago: true,
  data: '2026-04-14'
};

const {cliente, carro, ...resto} = servico
console.log(cliente)
console.log(carro)
console.log(resto)
