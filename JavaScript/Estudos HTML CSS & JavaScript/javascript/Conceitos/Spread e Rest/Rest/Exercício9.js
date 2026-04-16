const computador = {
  marca: 'Sony VAIO',
  ano: 2008,
  hd: '500GB',
  ram: '4GB',
  ssd: '240GB'
};
const {marca, ano, ...resto} = computador
console.log(marca)
console.log(ano)
console.log(resto)
