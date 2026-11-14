import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js";
const inTime = document.querySelector('#schedule-time');
const wrapperInTime = document.querySelector('.wrapper-inTime');

export function hoursLoad({ date }) {
  const opening = openingHours.map((hour) => {
    // recupera somente a hora
    const [scheduleHour] = hour.split(":")

    // adiciona a hora na date e verifica se já passou
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isAfter(dayjs())

    return {
      hour,
      available: isHourPast
    }
  })

  let countHoursAvailable = false
  inTime.innerHTML = ''
  // crie as options do select com os horarios disponíveis
  opening.forEach(({ hour, available }) => {
    if (available) {
      const option = document.createElement('option');
      option.value = hour;
      option.textContent = hour;
      inTime.append(option);
      countHoursAvailable = true
      inTime.disabled = false

    }

  });

  if (!countHoursAvailable) {
    const option = document.createElement('option');
    option.value = "No available times.";
    option.textContent = "Nenhum horário disponível para esse dia.";
    inTime.append(option);
    inTime.disabled = true
  }

  if (!inTime.disabled) {
    console.log('aui')
    wrapperInTime.addEventListener('click', (event) => {
      if (event.target === inTime) return

      inTime.focus()

      if (typeof inTime.showPicker === 'function') {
        inTime.showPicker()
      }
    })
  }

}