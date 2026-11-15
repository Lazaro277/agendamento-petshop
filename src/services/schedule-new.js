import { apiConfig } from "./api-config.js";

export async function scheduleNew({ tutorName, petName, tutorNumber, description, when }) {
  try {
    // faz a requisição para enviar os dados do agendamento
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

    alert('agendamento realizado com sucesso')
  } catch (error) {
    console.log(error)
    alert("Não foi possível agendar. Tente novamente")
  }
}