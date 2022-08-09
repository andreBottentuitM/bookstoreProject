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
const limitData = new Date(currentYear, currentMonth, currentDay + 10, 23, 59, 59)
const limitYear = limitData.getFullYear()
const limitHours = limitData.getHours()
const limitMinutes = limitData.getMinutes()
const limitDay = limitData.getDate()
let limitMonth = limitData.getMonth()
limitMonth = month[limitMonth]

//PUTTING THE LIMIT
deadline.textContent = `até ${limitDay}/${limitMonth}/${limitYear}.`;

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
  console.log(dateFormatArray)

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