const buttonSubmitLogin = document.querySelector('#submit')

const validationLogin = (e) => {
    e.preventDefault()
    buttonSubmitLogin.innerHTML = '<div class="loader"></div>'
    let users = JSON.parse(localStorage.getItem('users'))
    const emailInput = document.querySelector('[email]')
    const passwordInput = document.querySelector('[password]')

    if(!users){
      setTimeout(() => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email ou senha incorretos!',
          })
          buttonSubmitLogin.innerHTML = 'ENTRAR'
        }, 1000)
    }
    
      let validation = users.some((user)=> {
        return user.email === emailInput.value && user.password === passwordInput.value
      })

    if(!validation){
      
      setTimeout(() => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email ou senha incorretos!',
          })
          buttonSubmitLogin.innerHTML = 'ENTRAR'
        }, 1000)
        document.querySelector('#resultLogin').innerHTML = 'Email, senha ou ambos estão incorretos!'
    }
    users.forEach((data, index) => {
        if (data.email.toLowerCase() === emailInput.value.toLowerCase() && passwordInput.value === data.password) {
          setTimeout(() => {
          Swal.fire({
                icon: 'success',
                title: `Bem-vindo(a), ${data.name}`,
                showConfirmButton: false,
                footer:'<a href="./index.html">Vamos as compras!</a>'
              })
              buttonSubmitLogin.innerHTML = 'ENTRAR'
            }, 1000)
        }
    })

    //document.querySelector('#resultLogin').innerHTML = 'Email, senha ou ambos estão incorretos!'
}

buttonSubmitLogin.addEventListener('click', validationLogin)

