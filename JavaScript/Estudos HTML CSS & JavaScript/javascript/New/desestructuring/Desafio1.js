// Use a desestruturação para criar as variáveis nome e idade em uma única linha.
// Agora, em outra linha, use a desestruturação para extrair o github de dentro da chave social.
// Dê um console.log mostrando o nome e o github.

const dev = {
  nome: 'Lucas Oliveira',
  idade: 22,
  tecnologias: ['JavaScript', 'Flutter', 'Node.js'],
  social: {
    github: 'lucasdev',
    linkedin: 'lucas-oliveira'
  }
};
const {nome, idade, social : {github}} = dev
console.log(`Candidato ${nome} idade : ${idade} linguagens: ${dev.tecnologias} github ${github}`)

