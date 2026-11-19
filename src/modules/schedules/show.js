import { showToast } from "../../utils/notification.js";
import { scheduleHour, scheduleTime as formatScheduleTime } from "../../utils/schedule-date-time.js";

// seleciona as seções
const periodMorning = document.querySelector('#period-morning .period-body')
const periodAfternoon = document.querySelector('#period-afternoon .period-body')
const periodNight = document.querySelector('#period-night .period-body')

export function schedulesShow({ dailySchedules }) {
  try {
    // limpa o conteudo das divs
    periodMorning.innerHTML = ''
    periodAfternoon.innerHTML = ''
    periodNight.innerHTML = ''

    // ordena os agendamentos pelo horário
    const orderedSchedules = [...dailySchedules].sort(
      (a, b) => new Date(a.when).getTime() - new Date(b.when).getTime()
    )

    // renderiza os agendamentos por periodo
    orderedSchedules.forEach((schedule) => {
      // cria os elementos
      const scheduleItem = document.createElement('div')
      const scheduleTime = document.createElement('span')
      const petName = document.createElement('span')
      const tutorName = document.createElement('span')
      const description = document.createElement('span')
      const removeScheduling = document.createElement('span')
      const firstBrTag = document.createElement('br')
      const secondBrTag = document.createElement('br')

      // adiciona respectivas classes
      scheduleItem.classList.add('schedule-item')
      scheduleTime.classList.add('scheduling-time')
      petName.classList.add('pet-name')
      tutorName.classList.add('tutor-name')
      description.classList.add('scheduling-description')
      removeScheduling.classList.add('remove-scheduling')

      // adicionando id em cada item
      scheduleItem.setAttribute("data-id", schedule.id)

      // adicionando as informações
      scheduleTime.textContent = formatScheduleTime(schedule.when)
      petName.textContent = schedule.petName
      tutorName.textContent = ' / ' + schedule.tutorName
      description.textContent = schedule.description
      removeScheduling.textContent = 'Remover agendamento'

      scheduleItem.append(scheduleTime, petName, tutorName, firstBrTag, description, secondBrTag, removeScheduling)

      // obtem somente a hora para verificar qual seção será inserido
      const hour = scheduleHour(schedule.when)

      // adiciona na seção correta
      if (hour <= 12) {
        periodMorning.append(scheduleItem)
      } else if (hour <= 18) {
        periodAfternoon.append(scheduleItem)
      } else {
        periodNight.append(scheduleItem)
      }
    })


    const createNoAppointment = () => {
      const noAppointment = document.createElement('div')
      noAppointment.classList.add('text-center', 'text-secondary')
      noAppointment.textContent = 'Nenhum agendamento.'
      return noAppointment
    }

    if (periodMorning.innerHTML == '') {
      periodMorning.append(createNoAppointment())
    }
    if (periodAfternoon.innerHTML == '') {
      periodAfternoon.append(createNoAppointment())
    }
    if (periodNight.innerHTML == '') {
      periodNight.append(createNoAppointment())
    }

  } catch (error) {
    console.log(error)
    showToast('danger', 'Não foi possível exibir os agendamentos')
  }
}