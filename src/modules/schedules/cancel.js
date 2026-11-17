import { scheduleDay } from "./load.js"
import { scheduleLoadByDay } from "./load-by-day.js"
import { showConfirm } from "../../utils/confirm.js"
import { scheduleCancel } from "../../services/schedule-cancel.js"

const periods = document.querySelectorAll('.period')

// Gera evento de click para cada periodo
periods.forEach((period) => {
  // captura o evento de clique na div do periodo
  period.addEventListener('click', async (event) => {
    if (event.target.classList.contains('remove-scheduling')) {
      // obtém o pai do elemento clicado
      const item = event.target.closest('div')
      // pega o id para remover
      const { id } = item.dataset

      // confirma se o id existe
      if (id) {


        // faz a confirmação do cancelamento
        const confirmed = await showConfirm(
          'warning',
          'Deseja realmente cancelar este agendamento?'
        )


        if (!confirmed) return

        console.log(confirmed)
        // confirma se o usuário quer cancelar
        if (confirmed) {
          // faz a requisição na API para cancelar
          await scheduleCancel({ id })

          // recarrega a lista de agendamentos na tela e os horarios disponiveis
          scheduleLoadByDay()
          scheduleDay()
        }
      }
    }

  })
})