const users= JSON.parse(localStorage.getItem('users')) || []
function signup(){
    
    const allInputs = document.getElementsByTagName('input');
    const fullName = allInputs[0]
    const email = allInputs[1]
    const password = allInputs[2]
    const confirmPassword = allInputs[3] 

if(fullName.value ==='' || email.value ==='' || password.value === '' || confirmPassword.value === ''){
    alert('Please fill all the input fields!');
    return;
} 

if(fullName.value.length === 1){
    alert('Please enter your full name with minimum of 2 letters!')
    return;
}

if (!email.value.includes('@')) {
    alert('Email must include @ in the format!');
    return;
}

if ((email.value.match(/\d/g) || []).length < 3) {
    alert('Email must include at least three numeric digits in the format!');
    return;
}

if (password.value.length < 8) {
    alert('Please enter a password with a minimum of 8 characters!');
    return;
}  

if(password.value != confirmPassword.value){
    alert('Password does not match with confirm password!');
    return;
}

const user = {
    fullName:fullName.value,
    email:email.value,
    password:password.value,
}
users.push(user);

localStorage.setItem('users',JSON.stringify(users));

alert('Signed up succesfully!')

for(var i=0; i<allInputs.length; i++){
    allInputs[i].value = '';
}

window.location.href='../login/index.html';

}