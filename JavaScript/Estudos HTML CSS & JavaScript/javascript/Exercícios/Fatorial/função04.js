function fatorial(n){
    let fat = 1
    for( let c = n; c > 1; c--){ /*tire um de c (c--) enquanto c for maior que 1 (c > 1)*/
        fat *= c  /*multiplique fat por c*/
        console.log(c)
    }
    return fat
}

console.log(fatorial(10)) 