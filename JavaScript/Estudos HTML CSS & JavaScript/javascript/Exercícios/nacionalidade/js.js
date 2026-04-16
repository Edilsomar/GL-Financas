
function nacionalidade(){
    var pais = document.getElementById('pais').value
    var naci = document.getElementById('nac')

    if (pais.toLowerCase() == "brasil"){ 
        naci.innerHTML = `Uau você é Brasileiro(a)!`
    }else {
        naci.innerHTML = ` Nossa. você é estrangeiro e está visitando o Brasil!`
    }
}