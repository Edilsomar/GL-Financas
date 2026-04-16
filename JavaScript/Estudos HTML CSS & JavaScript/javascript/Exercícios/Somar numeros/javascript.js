function somar(){
            var n1 = Number(document.getElementById('txtn1').value)
            var n2 = Number(document.getElementById('txtn2').value)
            var res = document.getElementById('res')
            var s = n1 + n2
            res.innerHTML = (`A Soma dos dois números é =  <strong>${s}<strong>!`)
          
}