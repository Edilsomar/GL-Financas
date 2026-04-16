// Você está criando variáveis e quer "juntar" ou "recolher" o que sobrou em uma gaveta só.

const [primeira, ...resto] = ['Maçã', 'Uva', 'Banana']; 
// Rest: 'primeira' pegou a Maçã
// resto = ['Uva', 'Banana']

// se fosse

const [primeira, segunda, ...resto] = ['Maçã', 'Uva', 'Banana']; 
// Rest: 'primeira' pegou a Maçã
// resto = ['Banana']