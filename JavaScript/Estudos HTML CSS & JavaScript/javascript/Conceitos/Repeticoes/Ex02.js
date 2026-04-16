function tabuada(){
    var numero = document.getElementById('txti')
    res = document.getElementById('lista')

    if(numero.value.length == 0){
        window.alert('[ERRO] campo vazio')
    } else {
        var num = Number(numero.value)
        var multi = 1
        
        res.innerHTML = ''
        while( multi <= 10){
            var option = document.createElement('option')
            option.text = `${num} x ${multi} = ${num * multi}`
            option.value = `tab${multi}`
            res.appendChild(option)
            multi++
           
        }
    }
}