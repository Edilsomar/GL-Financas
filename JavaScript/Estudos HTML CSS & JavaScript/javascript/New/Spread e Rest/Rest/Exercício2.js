// Use a desestruturação de array para criar a variável lider.
// Use o Rest (...) para criar a variável demaisMarcas.
// lider deve ficar com 'Honda' e demaisMarcas com todo o resto da lista.
// Dê um console.log(lider) e um console.log(demaisMarcas).

const marcas = ['Honda', 'Toyota', 'Chevrolet', 'Ford', 'Fiat'];
const [lider, ...demaisMarcas] = marcas

console.log(lider)
console.log(demaisMarcas)


