let num = [8, 1, 7, 4, 2, 9,]

for(let nome in num){
    num.sort()
    console.log(num[nome])
}
/*
-O FOR IN ler todos os elementos da variável desde a primeiro até a último  

-Nesse caso o NOME começa no indice 0 

-É como se for(let... tivesse dizendo "NOME vá do primeiro até o ultimo elemento de NUM" por conta do in

-O Console.log(num[nome]) vai fazer ele exibir o valor do elemento que ele está atualmente

*/ 
