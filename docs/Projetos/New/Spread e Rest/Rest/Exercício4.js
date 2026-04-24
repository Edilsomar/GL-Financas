// Use a desestruturação para criar as variáveis urgente1 e urgente2.
// Use o Rest (...) para criar a variável filaDeEspera com o que sobrou.
// No final, urgente1 deve ser 'Lavar Civic', urgente2 deve ser 'Polir Fusion' e a filaDeEspera deve conter os outros 3 itens.
// Dê um console.log nas três variáveis.

const tarefas = ['Lavar Civic', 'Polir Fusion', 'Limpar estoque', 'Organizar chaves', 'Lavar panos'];
const [urgente1, urgente2, ...filaDeEspera] = tarefas

console.log(urgente1)
console.log(urgente2)
console.log(filaDeEspera)


