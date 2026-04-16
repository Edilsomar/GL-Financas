// Crie uma variável chamada clienteAtualizado.
// Use o Spread (...) para copiar todos os dados do cliente.
// Na mesma linha, atualize o telefone para '1111-2222'.
// Adicione uma nova chave chamada status com o valor 'VIP'.
// Dê um console.log(clienteAtualizado)

const cliente = {
  nome: 'Ricardo Silva',
  carro: 'Civic G10',
  telefone: '9999-8888'
};

const clienteAtualizado = {...cliente, telefone : '1111-4444', status : 'VIP'}
console.log(clienteAtualizado)

// Nesse exercicios criamos uma constante spread e além disso atualizamos os valores que já existia na constante antigo 
// além de implemetar mais um dado nela