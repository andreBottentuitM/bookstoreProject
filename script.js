//CLOSE BUTTON
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


//START COUNTDOWN
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


//NAVBAR TOGGLE
const navToggle = document.querySelector(".button")
const links = document.querySelector(".flex-navbar-two")

navToggle.addEventListener("click", function () {


  links.classList.toggle("expand");
});


//SEARCH WITH CLICK
const firstLupa = document.querySelector('[lupa]')
firstLupa.addEventListener('click', clickSearch)

const secondLupa = document.querySelector('[secondLupa]')
secondLupa.addEventListener('click', clickSearchResponsive)

function clickSearch() {
  const input = document.querySelector('[search]')
  const textInput = input.value.toLowerCase().normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
  const valueOfAttribute = document.querySelector("#books")
  for (di of valueOfAttribute.children) {
    if (di.getAttribute("name").includes(textInput))
      di.style.display = 'block'
    else
      di.style.display = "none"
  }
}

function clickSearchResponsive() {
  const input = document.querySelector('[searchResponsive]')
  const textInput = input.value.toLowerCase().normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
  console.log(textInput)
  const valueOfAttribute = document.querySelector("#books")
  for (di of valueOfAttribute.children) {
    if (di.getAttribute("name").includes(textInput))
      di.style.display = 'block'
    else
      di.style.display = "none"
  }
}


//SEARCH WITH ENTER
const input = document.querySelector('[search]')
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    clickSearch();
  }
});

const inputResponsive = document.querySelector('[searchResponsive]')
inputResponsive.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault()

    clickSearchResponsive();
  }
});