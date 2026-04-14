// Crie uma variável chamada itemAtualizado.
// Use o Spread (...) para copiar tudo de itemEstoque.
// Na mesma linha, mude o preco para 29.90.
// Adicione uma nova chave chamada ultimaAtualizacao com o valor 'Hoje'.
// Dê um console.log(itemAtualizado).

const itemEstoque = {
  produto: 'Calabresa',
  preco: 25.00,
  quantidade: 5
};

const itemAtualizado = {...itemEstoque, preco : 29.00 , ultimaAtulização : 'hoje'}
console.log(itemAtualizado)