const buttonSubmitLogin = document.querySelector('button')
const validationLogin = (e) => {
    e.preventDefault()
    console.log('test')
    let users = JSON.parse(localStorage.getItem('users'))
    const emailInput = document.querySelector('[email]')
    const passwordInput = document.querySelector('[password]')
    let validation = users.some((user)=> {
      return user.email === emailInput.value && user.password === passwordInput.value
    })
    if(!validation || !JSON.parse(localStorage.getItem('users'))){
        document.querySelector('#resultLogin').innerHTML = 'Email, senha ou ambos estão incorretos!'
    }
    users.forEach((data, index) => {
        if (data.email.toLowerCase() === emailInput.value.toLowerCase() && passwordInput.value === data.password) {
            document.querySelector('#resultLogin').innerHTML = `Bem vindo, Sr. ${data.name}!`
        }
    })

    //document.querySelector('#resultLogin').innerHTML = 'Email, senha ou ambos estão incorretos!'
}

buttonSubmitLogin.addEventListener('click', validationLogin)