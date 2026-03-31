var email = document.getElementById('email') 
var password= document.getElementById('password')
email.focus()

function login(){
    if(email.value.length == 0 || password.value.length == 0){
        window.alert("[ERROR] The field 'Email' or 'Password' is empty!")
    } else{
        window.alert('Login successful!')
        email.value =''
        password.value = ''
        email.focus()
    }
}