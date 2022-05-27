// set varilble
let allInputElem = document.querySelectorAll('.requird')
let emailElem = document.querySelector('#email');
let passwordElem = document.querySelector('#password');
let loginElem = document.querySelector('#login')
let registerElem = document.querySelector('#register');
let formElem = document.querySelector('#form');
loginElem.addEventListener('click', (e)=>{
    e.preventDefault()
    if (emailElem.value == "" || passwordElem.value == "") {
        allInputElem.forEach(input=>{
            if (input.value == "") {
                input.style.border = "1px solid red"
                input.placeholder = 'This filed is required'
            }else{
                input.style.border = "1px solid #002c3e7e"
            }
         })  
    }else{
        let email = localStorage.getItem('email');
        let password = localStorage.getItem('password')
        if (email != null && password != null) {
            if (emailElem.value != email) {
                emailElem.value = ""
                emailElem.style.border = "1px solid red"
                emailElem.placeholder = 'This Email not Exist'
            }else if(passwordElem.value != password){
                passwordElem.value = ""
                passwordElem.style.border = "1px solid red"
                passwordElem.placeholder = 'Worng Password'
            }else{
                window.location = 'index.html'
            }
        }else{
            emailElem.value = ""
            emailElem.style.border = "1px solid red"
            emailElem.placeholder = 'This Email not Exist'
            passwordElem.value = ""
            passwordElem.style.border = "1px solid red"
            passwordElem.placeholder = 'Worng Password'
        }
    }
})
registerElem.addEventListener('click', (e)=>{
    e.preventDefault()
    window.location = 'register.html'
})
allInputElem.forEach(input=>{
    input.addEventListener('focus', (e)=>{
        e.target.style.border = ' 1px solid #002c3ea8'
        e.target.placeholder = e.target.type[0].toUpperCase() + e.target.type.slice(1).toLowerCase();
    })
    input.addEventListener('blur', (e)=>{
        if (e.target.value == '') {
            e.target.style.border = ' 1px solid red'
        }else{
            e.target.style.border = ' 1px solid #002c3ea8'
        }
    })
});
