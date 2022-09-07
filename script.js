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
const buttonClosedCart = document.querySelector('[closed-cart]')
const cartShopping = document.querySelector('[cart-shopping]')
const cart = document.querySelector('[openCart]')
buttonClosedCart.addEventListener('click', closedCart)
cartShopping.addEventListener('click', openCart)

function openCart() {
  document.querySelector('.container-books-cart').style.display = 'grid'
  setTimeout(() => cart.style.width = '29rem', 200)
}

function closedCart() {
  cart.style.width = '0rem'
}

//BUTTON INPUT BOOK TO CART
const amountIcon = document.querySelector('[amountIcon]')
const allBooksCart = document.querySelectorAll('[openCart] section')
const amount = document.querySelectorAll('[amount]')
const allButtonsCart = document.querySelectorAll('#books button')
allButtonsCart.forEach((button) => button.addEventListener('click', inputBookCart))
const totalShopCart = document.querySelector('.numberCart')


function inputBookCart(e) {
  let id = e.target.getAttribute('button-shop')
  
  amount.forEach((item, i) => {
    if (i == id) {
      allBooksCart[i].style.display = 'flex'
      amount[i].value = 1
    }
  })
}


const deleteCart = document.querySelectorAll('.delete')
deleteCart.forEach(button => button.addEventListener('click', deleteBookCart))

function deleteBookCart(e) {
  let id = e.target.getAttribute('button-delete')
  amount.forEach((item, i) => {
    if (i == id) {
      allBooksCart[i].style.display = 'none'
    }
  })
}

setInterval(() => {
  let totalShop = 0
  allBooksCart.forEach((item, i) => {
    if(allBooksCart[i].style.display == 'flex'){
      totalShop += 1
    }
  }
  
)
totalShopCart.innerHTML = totalShop})

//NUMBER LIMIT AT INPUT
amount.forEach(input => input.addEventListener('keyup',limitNumber))
function limitNumber(e) {
  let input = e.target;
  if(input.value > 10){
      let adjusting = 10;
      input.value = parseInt(adjusting)
  }
  if(input.value <= 0){
    let adjusting = 1;
      input.value = parseInt(adjusting)
  }
};


/*--------------------------------TOTAL VALUE-----------------------------------*/
const totalBooks = document.querySelector('[totalBooks]')



setInterval(() => {
  let total = 0
  amount.forEach((item, i) => {
    let valueBook = item.getAttribute('valueBook')
    let units = item.value
    if (units > 10) {
      units = 10
    }
    if (units < 0) {
      units = 0
    }
    
    if (allBooksCart[i].style.display == 'flex') {
      total += valueBook * units
    }
  })
  totalBooks.innerHTML = ` R$${total.toFixed(2)}`
}, 300)