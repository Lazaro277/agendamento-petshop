import dayjs from "dayjs"
import { apiConfig } from "./api-config"
import { showToast } from "../utils/notification.js";

export async function scheduleFetchByDay({ dateSelected }) {
  try {
    // faz a requisição
    const response = await fetch(`${apiConfig.baseURL}/schedules`)

    // converte para json
    const data = await response.json()

    // filtra os agendamentos pelo dia selecionado
    const dailySchedules = data.filter((schedule) => dayjs(dateSelected).isSame(schedule.when, "day"))

    return dailySchedules
  } catch (error) {
    console.log(error)
    showToast('danger', 'Não foi possível buscar os agendamentos do dia selecionado')
  }
}
