import { apiConfig } from "./api-config"
import { showToast } from "../utils/notification.js";
import { scheduleDate } from "../utils/schedule-date-time.js";

export async function scheduleFetchByDay({ dateSelected }) {
  try {
    // faz a requisição
    const response = await fetch(`${apiConfig.baseURL}/schedules`)

    if (!response.ok) {
      throw new Error(`Erro ao buscar agendamentos: ${response.status}`)
    }

    // converte para json
    const data = await response.json()

    // filtra os agendamentos pelo dia selecionado
    const dailySchedules = data.filter((schedule) => scheduleDate(schedule.when) === dateSelected)

    return dailySchedules
  } catch (error) {
    console.log(error)
    showToast('danger', 'Não foi possível buscar os agendamentos do dia selecionado')
    throw error
  }
}
