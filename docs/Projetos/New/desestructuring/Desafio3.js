// Primeiro, desestruture o objeto curso para extrair o titulo e o array de alunos.
// Depois, em outra linha, desestruture o array alunos (que você acabou de extrair) para criar as variáveis primeiroAluno e segundaAluna.
// Dê um console.log(titulo, primeiroAluno, segundaAluna).

const curso = {
  titulo: 'Lógica de Programação',
  alunos: ['Carlos', 'Ana', 'Ricardo']
};

const {titulo, alunos} = curso
const [primeiroAluno, segundoAluno, terceiroAluno] = alunos

console.log(`Curso: ${titulo}. Alunos: ${primeiroAluno}, ${segundoAluno}`)

//ou

const {titulo, alunos: [primeiroAluno, segundoAluno, terceiroAluno]} = curso

console.log(`Curso: ${titulo}. Alunos: ${primeiroAluno}, ${segundoAluno}`)

//const [primeiro, , terceiro] = alunos; 
// A vírgula vazia diz ao JS: "Pule o segundo item"