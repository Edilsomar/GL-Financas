let num = document.getElementById('num')
let lista = document.getElementById('flista')
let res = document.getElementById('res')
let valores = []

function isNumero(n) {                     // Essa funcao o cria um variavel chamada N, essa variavel vai receber algum valor. repare na linha 24, isNumero(num.value), ou seja o n vai receber o valor da variável NUM
    if(Number(n) >= 1 && Number(n) < 100){ // e retornar um valor boleano para isNumero
        return true
    } else{
        return false
    }
}

function inLista(n, l){ //vamos supor que  (l.indiceDe(10)) é diferente de -1(ou seja se existe) 
    if (l.indexOf(Number(n)) != -1){ //se  o indice de L (l.indexOf) do numero tal (Number(n))          
        return true  //pense sempre que tudo o q ta dentro de parenteses vai trazer um resultado
    } else{
        return false
    } 
}

function adicionar(){
    if(isNumero(num.value) && !inLista(num.value, valores)){                                                                          
        valores.push(Number(num.value))                      
        let item = document.createElement('option')
        item.text =` Valor ${num.value} adicionado`
        lista.appendChild(item) 
        res.innerHTML = '' 
    } else{
        window.alert('[ERRO] Campo vazio, valor inválido ou já encontrado na lista.')
    }
    num.value = ''
    num.focus()
}
function finalizar(){
    if(valores.length == 0){
        window.alert('[ERRO] Lista vazía!')
    } else{
        let tot = valores.length 
        let maior = valores[0] 
        let menor = valores[0]
        let soma = 0 
        let media = 0
        // var valores = [10, 20, 30]
        for(let pos in valores){ // para cada indice dentro do array valores é tipo fazer algo enquanto nn chegar ao ultimo valor do array
            soma += valores[pos] //aqui soma passa a ter outro valor q é soma + valor do indice atual q é o pos
            if(valores[pos] > maior)  // se 1 é maior q 0, 0 agora é 1
                maior = valores[pos]
            if(valores[pos] < menor) // menor só é o valor atual se o valor atual for menor q o primeiro
                menor = valores[pos]
        }
        media = soma / tot
        res.innerHTML = ''
        res.innerHTML += `<p>Ao todo, temos ${tot} números cadastrados.</p>`
        res.innerHTML += `<p>O Maior valor informado foi ${maior}.</p>`
        res.innerHTML += `<p>O Menor valor informado foi ${menor}.</p>`
        res.innerHTML += `<p>A Soma de todos os valores é ${soma}.</p>`
        res.innerHTML += `<p>A Média dos valores é ${media}.</p>`
    }
}