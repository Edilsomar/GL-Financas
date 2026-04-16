// Spread vem de espalhar então espalhamos os conteúdos dentro de uma outra caixa!
// Usamos o spread para juntar multiplas listas em uma só !
// basicamente usamos ...NomeDalista na nova constante para chamar, e os dados irão ser configurados na ordem !
// Podemos também adicionar um dado extra, nessa nova lista ex const novaLista = [...lista1, ...lista2, 'dadoNovo']

const frutas = ['Maçã', 'Banana'];
const legumes = ['Cenoura', 'Batata'];

//Juntatndo as listas !
const feira = [...frutas, ...legumes, 'ovo'] //aqui eu to basicamente dizendo, jogue frutas e legumes dentro de feira e no final boto um ovo :D
console.log(feira)

