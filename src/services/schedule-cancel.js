import { apiConfig } from "./api-config.js";
import { showToast } from "../utils/notification.js";

export async function scheduleCancel({ id }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
      method: "DELETE"
    })

    if (!response.ok) {
      throw new Error(`Erro ao cancelar agendamento: ${response.status}`)
    }

    showToast('success', 'Agendamento cancelado com sucesso!')
  } catch (error) {
    console.log(error)
    showToast('danger', 'Não foi possível cancelar o agendamento.')
    throw error
  }
}