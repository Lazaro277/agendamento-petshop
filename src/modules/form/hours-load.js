import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js";
const inTime = document.querySelector('#schedule-time');
const wrapperInTime = document.querySelector('.wrapper-inTime');

// função para clique no wrapper abrir o calendario
function handleTimeWrapperClick(event) {
  if (event.target === inTime) return

  inTime.focus()

  if (typeof inTime.showPicker === 'function') {
    inTime.showPicker()
  }
}

export function hoursLoad({ date, dailySchedules }) {
  // se exixte um agendamento com a hora, ela não vai ser criada
  // obtem a lista dos horarios ocupados
  const unavailableHours = dailySchedules.map((schedule) => dayjs(schedule.when).format("HH:mm"))

  const opening = openingHours.map((hour) => {
    // adiciona a hora na date e verifica se já passou
    const scheduleDateTime = dayjs(`${date}T${hour}`)
    const isHourPast = scheduleDateTime.isBefore(dayjs())

    const available = !unavailableHours.includes(hour) && !isHourPast

    return {
      hour,
      available
    }
  })

  let countHoursAvailable = false
  inTime.innerHTML = ''
  inTime.disabled = true
  wrapperInTime.removeEventListener('click', handleTimeWrapperClick)

  // crie as options do select com os horarios disponíveis
  opening.forEach(({ hour, available }) => {
    if (available) {
      const option = document.createElement('option');
      option.value = hour;
      option.textContent = hour;
      option.style.color = 'white'
      inTime.append(option);
      countHoursAvailable = true
      inTime.disabled = false

    }

  });

  // cria uma option informando que só estão aparecendo os horarios disponiveis para aquele dia selecionado
  if (countHoursAvailable) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'Horários disponíveis para o dia selecionado:';
    option.disabled = true;
    option.style.color = 'black'
    option.style.backgroundColor = '#9282FA'
    inTime.prepend(option);
  }

  // se não tem nenhum horário aquele dia, mostra essa mensagem e deixa o select disabled
  if (!countHoursAvailable) {
    const option = document.createElement('option');
    option.value = "No available times.";
    option.textContent = "Nenhum horário disponível para esse dia.";
    inTime.append(option);
    inTime.disabled = true
  }

  // só se tiver algum horario, esse evento existe
  if (!inTime.disabled) {
    wrapperInTime.addEventListener('click', handleTimeWrapperClick)
  }


}