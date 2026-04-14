const clienteApi = {
  client_full_name: 'Marcos Oliveira',
  total_spent_value: 450
};
 
const { client_full_name : nome, total_spent_value : total} = clienteApi
console.log(` O cliente ${nome} comprou um produto no valor de :${total.toLocaleString('PT-BR', {style : 'currency', currency :'BRL'})}`)