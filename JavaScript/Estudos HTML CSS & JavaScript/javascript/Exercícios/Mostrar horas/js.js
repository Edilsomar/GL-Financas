
function carregar() {
    var hora = document.getElementById('hora')
    var data = new Date() /*Vai pegar a data de hoje*/ 
    var hour = data.getHours() /* vai pegar da data de hoje a hora*/
    var minute = data.getMinutes()
    var imagem = document.getElementById('principal')
    hora.innerHTML = `${hour}:${minute}`

    if (hour >= 6 && hour < 12) {
        imagem.style.backgroundImage = 'url("img/manha.jpg")'
        document.body.style.backgroundColor = '#bbc6f8'

    } else if (hour >= 12 && hour < 18) {
        imagem.style.backgroundImage = 'url("img/tarde.jpg")'
        document.body.style.backgroundColor = '#A0BE9D'
        document.getElementById('cabecalho').style.backgroundColor = '#052B02'

    } else {
        imagem.style.backgroundImage = 'url("img/noite.jpg")'
        hora.style.backgroundColor = 'rgba(255, 255, 255, 0.100)'
        hora.style.color = 'rgb(122, 9, 9)'
        document.body.style.backgroundColor = '#151419'
        document.getElementById('cabecalho').style.backgroundColor = "#050507"
    }
}