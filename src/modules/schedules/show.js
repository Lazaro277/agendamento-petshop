import dayjs from "dayjs";

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

    // redenriza os agendamentos por periodo
    dailySchedules.forEach((schedule) => {
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
      scheduleTime.textContent = dayjs(schedule.when).format("HH:mm")
      petName.textContent = schedule.petName
      tutorName.textContent = ' / ' + schedule.tutorName
      description.textContent = schedule.description
      removeScheduling.textContent = 'Remover agendamento'

      scheduleItem.append(scheduleTime, petName, tutorName, firstBrTag, description, secondBrTag, removeScheduling)

      // obtem somente a hora para verificar qual seção será inserido
      const hour = dayjs(schedule.when).hour()

      // adiciona na seção correta
      if (hour <= 12) {
        periodMorning.append(scheduleItem)
      } else if (hour <= 18) {
        periodAfternoon.append(scheduleItem)
      } else {
        periodNight.append(scheduleItem)
      }


    })

  } catch (error) {
    console.log(error)
    alert('Não foi possível exibir os agendamentos')
  }
}