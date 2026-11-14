import { hoursLoad } from "../form/hours-load.js"

// seleciona o input de date
const selectedDate = document.querySelector('#schedule-date')

export function scheduleDay() {
  const date = selectedDate.value
  hoursLoad({ date })
}