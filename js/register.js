// set variable 
let allInputElem = document.querySelectorAll('.requird')
let fristNameElem = document.querySelector('#f-name');
let lastNameElem = document.querySelector('#l-name');
let emailElem = document.querySelector('#email')
let passwordElem = document.querySelector('#password')
let confPasswordElem = document.querySelector('#c-password')
let dateElem = document.querySelector('#date')
let registerElem = document.querySelector('#register')
registerElem.addEventListener('click', (e)=>{
    e.preventDefault()
    if (fristNameElem.value == "" || lastNameElem.value == "" || emailElem.value == "" || passwordElem.value == "" || confPasswordElem == "" || dateElem.value == ""){
        allInputElem.forEach(input=>{
            if (input.value == "") {
                input.style.border = "1px solid red"
                input.placeholder = 'This filed is required'
            }else{
                input.style.border = "1px solid #002c3e7e"
            }
        })  
    }else if(passwordElem.value.length > 20){
        passwordElem.value = ""
        confPasswordElem.value = ""
        passwordElem.style.border = "1px solid red"
        passwordElem.placeholder = 'Your password muste be less than 20 char'
    }else if(passwordElem.value !== confPasswordElem.value){
        passwordElem.value = ""
        passwordElem.placeholder = 'Not matched'
        confPasswordElem.value = ""
        confPasswordElem.placeholder = 'Not matched'
    }else{
        localStorage.setItem('user', fristNameElem.value)
        localStorage.setItem('email', emailElem.value)
        localStorage.setItem('password', passwordElem.value)
        window.location = 'login.html'  
    }
});

allInputElem.forEach(input=>{
    input.addEventListener('focus', (e)=>{
        e.target.style.border = ' 1px solid #002c3ea8';
        e.target.placeholder = e.target.type[0].toUpperCase() + e.target.type.slice(1).toLowerCase()
    })
    input.addEventListener('blur', (e)=>{
        if (e.target.value == '') {
            e.target.style.border = ' 1px solid red'
        }else{
            e.target.style.border = ' 1px solid #002c3ea8'
        }
    })
});
