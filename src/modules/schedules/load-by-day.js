import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js"
import { schedulesShow } from "./show.js"

// seleciona o input da data que o usuário seleciona para filtrar por ela
const selectedDate = document.querySelector('#appointment-date')

export async function scheduleLoadByDay() {
  // obtem a data do input
  const dateSelected = selectedDate.value

  // busca na API os agendamentos
  const dailySchedules = await scheduleFetchByDay({ dateSelected })

  // exibe os agendamentos
  schedulesShow({ dailySchedules })

  return dailySchedules
}