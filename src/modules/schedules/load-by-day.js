import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js"
import { schedulesShow } from "./show.js"

// seleciona o input da data que o usuário seleciona para filtrar por ela
const selectedDate = document.querySelector('#appointment-date')

export async function scheduleLoadByDay() {
  // obtem a data do input
  const dateSelected = selectedDate.value

  try {
    // busca na API os agendamentos
    const dailySchedules = await scheduleFetchByDay({ dateSelected })

    // exibe os agendamentos
    schedulesShow({ dailySchedules })

    return dailySchedules

  } catch (error) {
    // informa que não foi possível carregar os agendamentos
    const periodBodies = document.querySelectorAll('.period-body')

    periodBodies.forEach((period) => {
      period.textContent = 'Não foi possível carregar os agendamentos. Verifique a conexão com o servidor.'
      period.style.textAlign = 'center'
    })
  }
}