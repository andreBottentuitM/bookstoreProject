
/*--------------------------------CLOSE BUTTON-----------------------------------*/
const closeButton = document.querySelector('.closed')
const transparency = document.querySelector('.transparent')
closeButton.addEventListener('click', closePromotion)
transparency.addEventListener('click', closePromotion)

function closePromotion() {
  closeButton.style.display = 'none'
  transparency.style.display = 'none'
  document.querySelector('.container-one').style.display = 'none'
  document.querySelector('[page]').style.background = 'rgb(250, 243, 243)'
  document.querySelector('body').classList.add('addOverflow')
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
      let container = document.querySelector('.flex-container-books')
      let totalNone = 0
      for (di of valueOfAttribute.children) {
        let textInput = input.value.toLowerCase().normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
        if (di.getAttribute("name").includes(textInput)){
          di.style.display = 'block'
        }else{
          di.style.display = "none"
          totalNone += 1
        }
        }
        if(totalNone == 16){
          
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

//INPUT BOOKS IN THE PAGE

function startingPage() {

  let container = document.querySelector('.flex-container-books')
  let promotion = `<section id="book-promotion" name="guerraepaz lievtolstoi" lecture="Literatura Russa">
  <article>
      <div class="flex-book">
          <img src="./IMAGES/guerra e paz.jpg" alt="Guerra e paz">
          <div class="flex-content-promotion-book">
              <p class="promotion">PROMOÇÃO</p>
              <p>Guerra e paz</p>
              <p>Autor: Liev Tolstói</p>
              <p>Formato: Capa dura</p>
              <p>DE: <span id="old-price">R$67.99</span></p>
              <P>POR: <span>R$30.00</span></P>
              <button button-shop="0">
                  <i button-shop="0" class="fa-solid fa-cart-shopping"></i>
                  Carrinho</button>
          </div>
      </div>
  </article>
</section>`

  container.innerHTML = promotion

  booksList.forEach(item => {

    let element = document.createElement('section')
    if (item.id != 0) {
      element.setAttribute('name', item.filter)
      element.setAttribute('lecture', item.lecture)
      element.innerHTML = `<article>
   <div class="flex-book">
       <img src="${item.img}" alt="${item.name}">
       <div class="flex-content-book">
           <p>${item.name}</p>
           <p>Autor: ${item.autor}</p>
           <p>Formato: ${item.format}</p>
           <P>POR: <span>R$${item.price.toFixed(2)}</span></P>
           <button button-shop="${item.id}">
               <i button-shop="${item.id}" class="fa-solid fa-cart-shopping"></i>
               Carrinho</button>
       </div>
   </div>
</article>`

      container.appendChild(element)

    }
  })

}

startingPage()

//BUTTON INPUT BOOK TO CART
const allButtonsCart = document.querySelectorAll('#books button')
allButtonsCart.forEach((button) => button.addEventListener('click', inputBookCart))
const totalShopCart = document.querySelector('#numberCart')
const totalShopCartResponsive = document.querySelector('#numberCartResponsive')
const allBooksInCart = document.querySelector('.container-all-sections')


let totalInputs = []

const sectionsContainer = document.querySelector('.container-all-sections')

function inputBookCart(e) {
  let id = e.target.getAttribute('button-shop')
  let checkingEverySections = totalInputs.every(item => {
    return parseInt(id) != item
  })
   
  if (checkingEverySections) {
    

    let element = document.createElement('section')

    element.classList.add('style-books-cart')
    
    const optionsUnits = [1,2,3,4,5,6,7,8,9,10]
    let units = ''
    optionsUnits.forEach(item => {
      units += `<option value="${item}">${item}</option>`
    })

    element.innerHTML = `
  <img src="${booksList[id].img}" alt="${booksList[id].name}">
  <div class="flex-center-content-books-cart">
  <span class="name">${booksList[id].name}</span>
  <span class="priceCart">R$ ${booksList[id].price.toFixed(2)}</span>
  <label for="quantidade">Quantidade: <select key=${id}>
    ${units}
  </select> <i class="fa-solid fa-trash-can delete"></i></label>
</div>`

const deleteButton = element.querySelector('.delete')
deleteButton.addEventListener('click', deleteItem)
sectionsContainer.appendChild(element)

totalInputs.push(id)
totalShopCart.innerHTML = totalInputs.length
totalShopCartResponsive.innerHTML = totalInputs.length

gettingTotalValue()
const allSelects = document.querySelectorAll('select')
allSelects.forEach(item => item.addEventListener('click', gettingTotalValue))
}
}


const totalBooks = document.querySelector('.totalValue span')

function gettingTotalValue () {
  const allSelects = document.querySelectorAll('select')
  let valueTotalBooks = 0
  allSelects.forEach(item => {
    let idBook = item.getAttribute('key')
    let units = item.options[item.selectedIndex].value
    let price = booksList[idBook].price

    valueTotalBooks += units * price
  })
  totalBooks.innerHTML = ` R$${valueTotalBooks.toFixed(2)}`
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
  gettingTotalValue()
}


