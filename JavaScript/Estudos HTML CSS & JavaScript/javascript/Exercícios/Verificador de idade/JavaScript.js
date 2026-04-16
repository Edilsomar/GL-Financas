function verificar() {
    var data = new Date()
    var ano = data.getFullYear()
    var fano = document.getElementById('nasc')
    var res = document.getElementById('res')

    if (fano.value.length == 0 || Number(fano.value) > ano) {
        window.alert('[ERRO] verifique os dados e tente novamente!')

    } else {
        var fsex = document.getElementsByName('radsex')
        var idade = ano - Number(fano.value)
        var genero = ''
        var img = document.createElement('img')
        img.setAttribute('id', 'img')

    } if (fsex[0].checked){
        genero = 'Homem'
        if (idade >= 0 && idade < 10) {
            img.setAttribute('src', 'menino.jpg')
        } else if (idade < 21) {
            img.setAttribute('src', 'jovemH.jpg')
        } else if (idade < 50) {
            img.setAttribute('src', 'adultoH.jpg')
        } else {
            img.setAttribute('src', 'idosoH.jpg')
        }

    } else {
        genero = 'Mulher'
        if (idade >= 0 && idade < 10) {
            img.setAttribute('src', 'menina.jpg')
        } else if (idade < 21) {
            img.setAttribute('src', 'jovemM.jpg')
        } else if (idade < 50) {
            img.setAttribute('src', 'adultoM.jpg')
        } else {
            img.setAttribute('src', 'idosoM.jpg')
        }
    }

    res.innerHTML = `Detectamos ${genero} com ${idade} Anos`
    res.appendChild(img)

}

