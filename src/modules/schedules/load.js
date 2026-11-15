import { hoursLoad } from "../form/hours-load.js"
import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js"

// seleciona o input de date
const scheduleDate = document.querySelector('#schedule-date')

export async function scheduleDay() {
  // obtem a data do input
  const date = scheduleDate.value
  const dailySchedules = await scheduleFetchByDay({ dateSelected: date })

  // redenriza as horas disponiveis
  hoursLoad({ date, dailySchedules })
}