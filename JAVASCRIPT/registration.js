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
    }
)

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

const inputs = document.querySelectorAll('input')
inputs.forEach(input => input.addEventListener('keypress', verificationInput))
inputs.forEach(input => input.addEventListener('keyup', verificationInput))

    function verificationInput(e) {
        errors.forEach((item) => {
            if (e.target.id == item.input) {
                item.function(e.target.value)
            }
        })
    }

const confirmRegistration = async (e) => {
    e.preventDefault()

    /*try{const apiUrl = `https://viacep.com.br/ws/${cepInput.value}/json/`

    const response = await fetch(apiUrl)

    const data = await response.json()}
    catch(error){console.log(error)}*/
    const allErrors = document.querySelectorAll('p')
    const allErrorsToArray = Array.prototype.slice.call(allErrors)
    const allInputsToArray = Array.prototype.slice.call(inputs)
    const resultForm = document.querySelector('.resultForm')
    let errorsValidation = allErrorsToArray.every(item => {
       return item.innerHTML == ''
    })
 
    let inputsValidation = allInputsToArray.every(item => {
        return item.value != ''
    })

    
        if(errorsValidation && inputsValidation){
            resultForm.innerHTML = 'Cadastro realizado com sucesso!'
            resultForm.style.color = 'green'
            resultForm.style.background = 'rgb(209, 247, 209)'
            console.log('Sucesso!')
        }else{
           resultForm.innerHTML = 'Cadastro realizado sem sucesso! Verifique se algo foi preenchido inadequadamente.'
            resultForm.style.color = 'red'
            resultForm.style.background = 'rgb(245, 194, 194)'
            console.log('Sem sucesso!')
        }
        
}

buttonSign.addEventListener('click', confirmRegistration)
