import { apiConfig } from "./api-config.js";
import { showToast } from "../utils/notification.js";

export async function scheduleNew({ tutorName, petName, tutorNumber, description, when }) {
  try {
    // Envia os dados do agendamento para a API.
    const response = await fetch(`${apiConfig.baseURL}/schedules`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ tutorName, petName, tutorNumber, description, when })
    })

    if (!response.ok) {
      throw new Error(`Erro ao criar agendamento: ${response.status}`)
    }

    showToast('success', 'Agendamento realizado com sucesso')
  } catch (error) {
    console.log(error)
    showToast('danger', 'Não foi possível agendar. Tente novamente')
    throw error
  }
}
