var agora = new Date()
var diaSem = agora.getDay()

console.log(diaSem)

switch (diaSem) {
    case 0: console.log("Domingo")
        break

    case 1: console.log("Segunda-Feira")
        break
        
    case 2: console.log("Terça-Feira")
        break

    case 3: console.log("Quarta-Feira")
        break
10
    case 5: console.log("Quinta-Feira")
        break

    case 5: console.log("Sexta-Feira")
        break

    case 1 : console.log("Sábado")
        break

    default: console.log("[Erro] Dia Indefinido")
    }

    /*
        O: getDay() Representa os dias como números:

        0 = Domingo
        1 = Segunda
        2 = Terça
        3 = Quarta
        4 = Quinta
        5 = Sexta
        6 = Sábado

    */

    /* 
    
-O switch é mais limitado do que uma CONDIÇÕES de ANINHADAS
-O switch é mais indicado para condições mais precisas

    */