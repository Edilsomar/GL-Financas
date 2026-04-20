// Use a desestruturação de array para criar a variável maisBarato.
// Use o Rest (...) para criar a variável outrosPrecos.
// maisBarato deve pegar o primeiro valor (150) e outrosPrecos deve pegar todos os demais.
// Dê um console.log nas duas variáveis.

const precos = [150, 250, 400, 80, 120];

const [maisBarato, ...demaisValores] = precos
console.log(maisBarato)
console.log(demaisValores)