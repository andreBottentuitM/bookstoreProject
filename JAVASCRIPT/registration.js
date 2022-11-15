const cepInput = document.querySelector('#cep')
const addressInput = document.querySelector('#street')
const neighborhoodInput = document.querySelector('#neighborhood')
const cityInput = document.querySelector('#city')
const regionInput = document.querySelector('#region')
const buttonSign = document.querySelector('#submit')

//Patterns to inputs
const masks = {
    cpf(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    },
    phone(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
            .replace(/(-\d{5})\d+?$/, '$1')
    },
    cep(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
    }
}

document.querySelectorAll('input').forEach(input => {
    const field = input.dataset.js
    input.addEventListener('input', (e) => {
        e.target.value = masks[field](e.target.value)
    }, false)
})

cepInput.addEventListener("keyup", (e) => {
    const inputValue = e.target.value.replace('-', '')
    if (inputValue.length === 8) {
        getAddress(inputValue)

    }
})

const getAddress = async (cep) => {
    cepInput.blur()

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`

    const response = await fetch(apiUrl)

    const data = await response.json()


    if (data.erro) {
        document.querySelector('.container-circles').innerHTML = `
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        `
        setTimeout(() => {
            document.querySelector('.container-circles').innerHTML = ''
            document.querySelector('[cepText]').innerHTML = 'CEP incorreto'
        }, 3000)
        setTimeout(() => {
            document.querySelector('[cepText]').innerHTML = ''
            cepInput.value = ''
            addressInput.value = ''
        cityInput.value = ''
        neighborhoodInput.value = ''
        regionInput.value = ''
            takeOffDisabled('wrong')
        }, 4000)

    } else {
        document.querySelector('.container-circles').innerHTML = `
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        `
        setTimeout(() => {
            document.querySelector('.container-circles').innerHTML= ''
            addressInput.value = data.logradouro
            cityInput.value = data.localidade
            neighborhoodInput.value = data.bairro
            regionInput.value = data.uf
            document.querySelector('[cepText]').innerHTML = ''
            takeOffDisabled('correct')
        }, 3000)
    }
    return data
}

function takeOffDisabled(item) {
    const inputsWithDisabled = document.querySelectorAll('.validation')
    inputsWithDisabled.forEach(input => {

        if (cepInput.value != '' && item == 'correct') {
            input.removeAttribute('disabled')
        } else if (item == 'wrong') {
            input.setAttribute('disabled', 'disabled')
        }
    })
}

const inputs = document.querySelectorAll('.validationForm')
inputs.forEach(input => input.addEventListener('blur', verificationInput))

function verificationInput(e) {
    errors.forEach((item) => {
        if (e.target.id == item.input) {
            item.function(e.target.value)
        }
    })
}

let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem('users')) : []
const confirmRegistration = async (e) => {
    e.preventDefault()
    buttonSign.innerHTML ='<div class="loader"></div>'
    
    setTimeout(() => {
    errors.forEach((item, i) => {
        item.function(inputs[i].value)
    })
    buttonSign.innerHTML = 'CADASTRAR'
}, 1500)
  
    const allErrors = document.querySelectorAll('p')
    const allErrorsToArray = Array.prototype.slice.call(allErrors)
    const allInputsToArray = Array.prototype.slice.call(inputs)
    let errorsValidation = allErrorsToArray.every(item => {
        return item.innerHTML == ''
    })

    let inputsValidation = allInputsToArray.every(item => {
        return item.value != ''
    })

    const cpfValue = document.querySelector('#cpf')
    const emailValue = document.querySelector('#email')
    let cpfValidation = users.some((item)=> {
       return item.cpf === cpfValue.value 
    })
    let emailValidation = users.some((item)=> {
       return item.email === emailValue.value 
    })


    const apiUrl = `https://viacep.com.br/ws/${cepInput.value}/json/`

    const response = await fetch(apiUrl)

    const data = await response.json()

    if (errorsValidation && inputsValidation && !data.erro && !cpfValidation && !emailValidation) {
        console.log('test')
        const id = new Date().getTime().toString()
        let users = {
            id: id  
        }
        setTimeout(() => {
        Swal.fire({
            icon: 'success',
            title: `Cadastro realizado com sucesso!`,
            showConfirmButton: false,
            footer:'<a href="./login.html">Efetuar login!</a>'
          }
          
          )
          buttonSign.innerHTML = 'CADASTRAR'
        }, 1500)
          
        document.querySelectorAll('input').forEach((input, index)=>{
           switch(input.name){
            case 'name':
                users.name = input.value
                break
            case 'cpf':
                users.cpf = input.value
                break
            case 'date':
                users.date = input.value   
                break
            case 'phone':
                users.phone = input.value
                break
            case 'email':
                users.email = input.value   
                break 
            case 'password':
                users.password = input.value
                break
            case 'cep':
                users.cep = input.value   
                break
            case 'rua':
                users.rua = input.value  
                break 
            case 'number':
                users.number = input.value  
                break   
            case 'complemento':
                users.complemento = input.value  
                break
            case 'bairro':
                users.bairro = input.value 
                break
            case 'cidade':
                users.cidade = input.value  
                break 
            case 'estado':
                users.estado = input.value                       
            }
        })
        addUsers(users)
    } else if(cpfValidation){
        setTimeout(() => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'CPF já cadastrado!',
          })
          buttonSign.innerHTML = 'CADASTRAR'
        }, 1500)
          
    } else if(emailValidation){
        setTimeout(() => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email já cadastrado!',
          })
          buttonSign.innerHTML = 'CADASTRAR'
        }, 1500)
          
    }
    else {
        setTimeout(() => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo deu errado! Por favor, verique as informações preenchidas novamente!',
          })
          buttonSign.innerHTML = 'CADASTRAR'
        }, 1500)
          
    }
}

buttonSign.addEventListener('click', confirmRegistration)

let addUsers = (user) => {
    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
}


console.log(JSON.parse(localStorage.getItem('users')))
