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
        addressInput.value = ''
        cityInput.value = ''
        neighborhoodInput.value = ''
        regionInput.value = ''
        document.querySelector('[cepText]').innerHTML = 'Carregando...'
        setTimeout(() => document.querySelector('[cepText]').innerHTML = 'CEP incorreto', 1000)
        setTimeout(() => {
            document.querySelector('[cepText]').innerHTML = ''
            cepInput.value = ''
            takeOffDisabled('wrong')
        }, 2500)

    } else {
        document.querySelector('[cepText]').innerHTML = 'Carregando...'
        setTimeout(() => {
            addressInput.value = data.logradouro
            cityInput.value = data.localidade
            neighborhoodInput.value = data.bairro
            regionInput.value = data.uf
            document.querySelector('[cepText]').innerHTML = ''
            takeOffDisabled('correct')
        }, 1000)
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

    errors.forEach((item, i) => {
        item.function(inputs[i].value)
    })
  
    const resultForm = document.querySelector('.resultForm')
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
      console.log(cpfValidation)
    let emailValidation = users.some((item)=> {
       return item.email === emailValue.value 
    })


    const apiUrl = `https://viacep.com.br/ws/${cepInput.value}/json/`

    const response = await fetch(apiUrl)

    const data = await response.json()

    if (errorsValidation && inputsValidation && !data.erro && !cpfValidation && !emailValidation) {
        resultForm.innerHTML = 'Cadastro realizado com sucesso!'
        resultForm.classList.remove('error')
        resultForm.classList.add('positive')
        const id = new Date().getTime().toString()
        let users = {
            id: id  
        }
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
        resultForm.innerHTML = 'CPF já cadastrado!'
        resultForm.classList.remove('positive')
        resultForm.classList.add('error')
    } else if(emailValidation){
        resultForm.innerHTML = 'Email já cadastrado!'
        resultForm.classList.remove('positive')
        resultForm.classList.add('error')
    }
    else {
        resultForm.innerHTML = 'Cadastro realizado sem sucesso! Verifique se algo foi preenchido inadequadamente.'
        resultForm.classList.remove('positive')
        resultForm.classList.add('error')
    }
}

buttonSign.addEventListener('click', confirmRegistration)

let addUsers = (user) => {
    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
}
