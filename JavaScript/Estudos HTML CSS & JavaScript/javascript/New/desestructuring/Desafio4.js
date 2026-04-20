//Desestruture o objeto config.
//Mude o nome de nome_do_sistema para apenas nome.
//Mude o nome de versao_atual para apenas versao.
//Dê um console.log(nome, versao).

const config = {
  nome_do_sistema: 'Gestão Pro',
  versao_atual: '1.0.5'
};
const {nome_do_sistema : nome, versao_atual : versao} = config
console.log(nome, versao)
