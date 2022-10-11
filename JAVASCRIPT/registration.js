const cepInput = document.querySelector('#cep')
const addressInput = document.querySelector('#street')
const neighborhoodInput = document.querySelector('#neighborhood')
const cityInput = document.querySelector('#city')
const regionInput = document.querySelector('#region')

//Patterns to inputs
const masks = {
    cpf (value) {
        console.log(value)
        return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    },
    phone (value) {
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


document.querySelectorAll('input').forEach($input => {
   const field = $input.dataset.js

   $input.addEventListener('input', (e) => {
    e.target.value = masks[field](e.target.value)
    console.log(e.target.value.length)
   }, false)
})

cepInput.addEventListener("keyup", (e) =>{
    const inputValue = e.target.value.replace('-', '')
    if(inputValue.length === 8) {
        getAddress(inputValue)
    }
})

const getAddress = async (cep) => {
    cepInput.blur()

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`

    const response = await fetch(apiUrl)

    const data = await response.json()

    if(data.erro === 'true'){
        addressInput.value = ''
        cityInput.value = ''
        neighborhoodInput.value = ''
        regionInput.value = ''

    }else{
    addressInput.value = data.logradouro
    cityInput.value = data.localidade
    neighborhoodInput.value = data.bairro
    regionInput.value = data.uf}

}



