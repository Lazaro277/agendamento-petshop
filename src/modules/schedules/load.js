import { hoursLoad } from "../form/hours-load.js"
import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js"

// seleciona o input de date
const scheduleDate = document.querySelector('#schedule-date')

export async function scheduleDay() {
  // obtem a data do input
  const date = scheduleDate.value

  try {
    const dailySchedules = await scheduleFetchByDay({ dateSelected: date })

    // renderiza as horas disponíveis
    hoursLoad({ date, dailySchedules })

    return true

  } catch (error) {
    const inTime = document.querySelector('#schedule-time')

    inTime.innerHTML = ''

    const option = document.createElement('option')
    option.value = ''
    option.textContent = 'Não foi possível carregar os horários.'

    inTime.append(option)
    inTime.disabled = true

    return false
  }
}