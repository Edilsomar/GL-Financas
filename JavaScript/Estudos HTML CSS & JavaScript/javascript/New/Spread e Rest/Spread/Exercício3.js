//Crie uma variável chamada oficinaCompleta.
//Use o Spread (...) para juntar basicas e novas dentro dessa lista.
//Adicione o item 'Cera' no final da lista.
//Dê um console.log(oficinaCompleta).

const basicas = ['Pano microfibra', 'Balde'];
const novas = ['Politriz', 'Shampoo Neutro'];

const novaLista = [...basicas, ...novas, 'cera']
console.log(novaLista)
