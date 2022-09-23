/*--------------------------------CLOSE BUTTON-----------------------------------*/
const closeButton = document.querySelector('.closed')
const transparency = document.querySelector('.transparent')
closeButton.addEventListener('click', closePromotion)


function closePromotion(e) {
  closeButton.style.display = 'none'
  transparency.style.display = 'none'
  document.querySelector('.container-one').style.display = 'none'
  document.querySelector('[page]').style.background = 'white'
  document.querySelector('body').style.overflow = 'scroll'
}


/*--------------------------------START COUNTDOWN-----------------------------------*/
const days = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado'
]

const month = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12'
]

//CREATING VARIABLES
const deadline = document.querySelector('.limit')
const countdown = document.querySelectorAll('.time')
const day = document.querySelector('.day')
const end = document.querySelector('.container-one')

//GETTING THE CURRENT DATE 
const currentDate = new Date
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth()
const currentDay = currentDate.getDate()

//GETTING THE LIMIT DATE 
const limitData = new Date(currentYear, currentMonth, currentDay + 5, 23, 59, 59)
const limitYear = limitData.getFullYear()
const limitHours = limitData.getHours()
const limitMinutes = limitData.getMinutes()
const limitDay = limitData.getDate()
let limitMonth = limitData.getMonth()
limitMonth = month[limitMonth]

//PUTTING THE LIMIT
deadline.textContent = limitDay >= 10 ? `até ${limitDay}/${limitMonth}/${limitYear}.` : `até 0${limitDay}/${limitMonth}/${limitYear}.`;

const limitMilliseconds = limitData.getTime()


//RUNNING TIME
function takeTheTime() {

  const currentDateMilliseconds = new Date().getTime()
  let timeLeft = limitMilliseconds - currentDateMilliseconds

  const dayInMilliseconds = 24 * 60 * 60 * 1000
  let daysRemaining = Math.floor(timeLeft / dayInMilliseconds)

  const hourInMilliseconds = 60 * 60 * 1000
  let hoursRemaining = Math.floor((timeLeft % dayInMilliseconds) / hourInMilliseconds)

  const minuteInMilliseconds = 60 * 1000
  let minutesRemaining = Math.floor((timeLeft % hourInMilliseconds) / minuteInMilliseconds)

  const secondInMilliseconds = 1000
  let secondsRemaining = Math.floor((timeLeft % minuteInMilliseconds) / secondInMilliseconds)

  let dateFormatArray = [hoursRemaining, minutesRemaining, secondsRemaining]

  day.textContent = daysRemaining

  countdown.forEach((item, i) => {
    if (dateFormatArray[i] < 10) {
      return item.innerHTML = `0${dateFormatArray[i]}`
    } else {}
    return item.innerHTML = dateFormatArray[i]
  })

  if (timeLeft < 0) {
    clearInterval(start)
    end.style.display = 'none'
  }

}

let start = setInterval(takeTheTime, 1000)
takeTheTime()


/*--------------------------------NAV TOGGLE-----------------------------------*/
const navToggle = document.querySelector(".button")
const links = document.querySelector(".flex-navbar-two")

navToggle.addEventListener("click", function () {


  links.classList.toggle("expand");
});


/*--------------------------------GETTING SEARCH-----------------------------------*/
function GettingSearch(input, valueOfAttribute) {
  this.clickSearch = function () {
    for (di of valueOfAttribute.children) {
      let textInput = input.value.toLowerCase().normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
      if (di.getAttribute("name").includes(textInput))
        di.style.display = 'block'
      else
        di.style.display = "none"
    }
  }
  this.enterSearch = function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      for (di of valueOfAttribute.children) {
        let textInput = input.value.toLowerCase().normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
        if (di.getAttribute("name").includes(textInput))
          di.style.display = 'block'
        else
          di.style.display = "none"
      }
    }
  }
}

const input = document.querySelector('[search]')
const responsiveInput = document.querySelector('[searchResponsive]')
const valueOfAttribute = document.querySelector("#books")
const search = new GettingSearch(input, valueOfAttribute)
const searchResponsive = new GettingSearch(responsiveInput, valueOfAttribute)
const firstLupa = document.querySelector('[lupa]')
const secondLupa = document.querySelector('[secondLupa]')

//GETTING SEARCH WITH CLICK
firstLupa.addEventListener('click', search.clickSearch)
secondLupa.addEventListener('click', searchResponsive.clickSearch)

//GETTING SEARCH WITH ENTER
input.addEventListener("keypress", search.enterSearch)
responsiveInput.addEventListener("keypress", searchResponsive.enterSearch)


/*--------------------------------LINKS LECTURE-----------------------------------*/
function searchForLecture(e) {
  const allBooks = document.querySelectorAll('[lecture]')
  let lectureType = e.target.innerHTML
  allBooks.forEach(item => {
    if (item.getAttribute("lecture") == lectureType) {
      item.style.display = 'block'
    } else {
      item.style.display = 'none'
    }
  })
}

const linksLectures = document.querySelectorAll('.lecture')
linksLectures.forEach(item => item.addEventListener('click', searchForLecture))


/*--------------------------------TOGGLE BUTTON SHOP CART-----------------------------------*/

const buttonClosedCart = document.querySelector('.closed-cart')
const cartShopping = document.querySelector('[cart-shopping]')
const cartShoppingResponsive = document.querySelector('[cart-shopping-responsive]')
const cart = document.querySelector('[openCart]')
buttonClosedCart.addEventListener('click', closedCart)
cartShopping.addEventListener('click', openCart)
cartShoppingResponsive.addEventListener('click', openCartResponsive)



function openCart() {


  document.querySelector('.container-books-cart').style.display = 'grid'

  setTimeout(() => cart.style.width = '25%', 50)
  setTimeout(() => document.querySelector('body').style.width = `75%`, 50)
  setTimeout(() => document.querySelector('.nav-header').style.width = `75%`, 50)

}

function openCartResponsive() {
  document.querySelector('.container-books-cart').style.display = 'grid'

  setTimeout(() => cart.style.width = '25rem', 50)
}

function closedCart() {
  cart.style.width = '0rem'
  document.querySelector('body').style.width = '100%'
  document.querySelector('.nav-header').style.width = '100%'
}

//BUTTON INPUT BOOK TO CART
const amountIcon = document.querySelector('[amountIcon]')
const allButtonsCart = document.querySelectorAll('#books button')
allButtonsCart.forEach((button) => button.addEventListener('click', inputBookCart))
const totalShopCart = document.querySelector('#numberCart')
const totalShopCartResponsive = document.querySelector('#numberCartResponsive')
const allBooksInCart = document.querySelector('.container-all-sections')
const testtt = document.querySelector('.container-all-sections section')


let totalInputs = []
let totalValueBooks = 0
const sectionsContainer = document.querySelector('.container-all-sections')

function inputBookCart(e) {
  let id = e.target.getAttribute('button-shop')
  let checkingEverySections = totalInputs.every(item => {
    return parseInt(id) != item
  })

  if (checkingEverySections) {

    let element = document.createElement('section')
    element.classList.add('style-books-cart')

    element.innerHTML = `
  <img src="${booksList[id].img}" alt="${booksList[id].name}">
  <div class="flex-center-content-books-cart">
  <span class="name">${booksList[id].name}</span>
  <span class="priceCart">R$ ${booksList[id].price.toFixed(2)}</span>
  <label for="quantidade">Quantidade: <input key="${id}" type="number" min="1" max="10" value="1"><i class="fa-solid fa-trash-can delete"></i></label>
</div>`

    const deleteButton = element.querySelector('.delete')
    deleteButton.addEventListener('click', deleteItem)
    sectionsContainer.appendChild(element)

    totalInputs.push(id)
    totalShopCart.innerHTML = totalInputs.length
    totalShopCartResponsive.innerHTML = totalInputs.length
  }
}

const deleteItem = (e) => {
  const itemDelete = e.currentTarget.parentElement.parentElement.parentElement
  const gettingInput = e.target.previousElementSibling
  const gettingId = gettingInput.getAttribute('key')
  const gettingIndex = totalInputs.indexOf(gettingId)
  totalInputs.splice(gettingIndex, 1)
  sectionsContainer.removeChild(itemDelete)
  totalShopCart.innerHTML = totalInputs.length
  totalShopCartResponsive.innerHTML = totalInputs.length
}

/*--------------------------------TOTAL VALUE-----------------------------------*/
const totalBooks = document.querySelector('.totalBooks')

setInterval(() => {
  const allInputs = document.querySelectorAll('[key]')
  let total = 0
  allInputs.forEach((item) => {
    let id = item.getAttribute('key')
    let units = item.value

    if (units > 10) {
      item.value = 10
    }
    if (units < 1) {
      item.value = 1
    }

    total += booksList[id].price * units

  })
  totalBooks.innerHTML = ` R$${total.toFixed(2)}`
}, 300)