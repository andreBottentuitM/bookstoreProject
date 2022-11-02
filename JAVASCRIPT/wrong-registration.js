const errors = [{
        input: 'name',
        function: (text) => {
            if (text.length < 3) {
                document.querySelector('[nameText]').innerHTML = 'Deve-se ter no mínimo 3 caracteres.'
            } else {
                document.querySelector('[nameText]').innerHTML = ""
            }
        }
    },
    {
        input: 'cpf',
        function: (text) => {
            if (text.length < 14) {
                document.querySelector('[cpfText]').innerHTML = 'O CPF deve conter 11 dígitos.'
            } else {
                document.querySelector('[cpfText]').innerHTML = ""
            }
        }
    },
    {
        input: 'data',
        function: (text) => {
            const currentlyDate = new Date()
            const currentlyYear = currentlyDate.getFullYear()
            const inputYear = text.split('-')
            if (text.length < 10 || parseInt(inputYear[0]) > currentlyYear || parseInt(inputYear[0]) < 1910) {
                document.querySelector('[dateText]').innerHTML = 'Data de nascimento incorreta.'
            } else {
                document.querySelector('[dateText]').innerHTML = ""
            }
        }
    },
    {
        input: 'tel',
        function: (text) => {
            if (text.length < 15) {
                document.querySelector('[phoneText]').innerHTML = 'O telefone deve ter o DDD mais 9 dígitos.'
            } else {
                document.querySelector('[phoneText]').innerHTML = ""
            }
        }
    },
    {
        input: 'email',
        function: (text) => {
            const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            if (!emailRegex.test(text)) {
                document.querySelector('[emailText]').innerHTML = 'O email está incorreto.'
            } else {
                document.querySelector('[emailText]').innerHTML = ""
            }
        }
    },
    {
        input: 'password',
        function: (text) => {
            const confirm = document.querySelector('#confirm')
            if (text.length < 6) {
                document.querySelector('[passwordText]').innerHTML = 'Sua senha tem que ter no mínimo 6 dígitos'
            } else {
                document.querySelector('[passwordText]').innerHTML = ''
            }
            if ((confirm.value != text.value && confirm.value.length != 0)) {
                document.querySelector('[confirmText]').innerHTML = "A confirmação de senha não confere."
            } else {
                document.querySelector('[confirmText]').innerHTML = ''
            }
        }
    },
    {
        input: 'confirm',
        function: (text) => {
            const password = document.querySelector('#password')
            if (password.value != text) {
                document.querySelector('[confirmText]').innerHTML = 'A confirmação de senha não confere.'
            } else {
                document.querySelector('[confirmText]').innerHTML = ""
            }
        }
    },
    {
        input: 'cep',
        error: 'CEP inexistente.',
        function: (text) => {
            if (text.length < 9) {
                takeOffDisabled('wrong')
                document.querySelector('[cepText]').innerHTML = 'O CEP deve ter 8 dígitos.'
                addressInput.value = ''
                cityInput.value = ''
                neighborhoodInput.value = ''
                regionInput.value = ''
            } else {
                document.querySelector('[cepText]').innerHTML = ""
            }
        }
    },
]