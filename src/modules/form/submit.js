const inTutorNumber = document.querySelector('#schedule-tutor-number');
const inDescription = document.querySelector('#schedule-description');
const inTutorName = document.querySelector('#schedule-tutor-name');
const inDates = document.querySelectorAll('input[type="date"]');
const inPetName = document.querySelector('#schedule-pet-name');
import { scheduleNew } from "../../services/schedule-new.js";
import { scheduleLoadByDay } from "../schedules/load-by-day.js";
const inTime = document.querySelector('#schedule-time');
const inDate = document.querySelector('#schedule-date');
import { scheduleDay } from "../schedules/load.js";
import { showToast } from "../../utils/notification.js";
const form = document.querySelector("form")
import dayjs from "dayjs";

// valida e formata o input do número de telefone
inTutorNumber.addEventListener('input', (event) => {
  const input = event.currentTarget
  const digits = input.value.replace(/\D/g, '').slice(0, 11)

  if (digits.length > 10) {
    input.value = `(${digits.slice(0, 2)}) ${digits[2]} ${digits.slice(3, 7)}-${digits.slice(7)}`
  } else if (digits.length > 6) {
    input.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  } else if (digits.length > 2) {
    input.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  } else {
    input.value = digits
  }
})

form.onsubmit = async (event) => {
  // evita reload na pagina
  event.preventDefault()

  try {
    let isValid = true

    // recupera o nome do tutor
    const tutorName = inTutorName.value.trim()

    // recupera o nome do pet
    const petName = inPetName.value.trim()

    // recupera o numero de telefone e verifica se é valido
    const tutorNumber = inTutorNumber.value.trim()
    const numberRegex = /^\(?\d{2}\)?\s?9?\s?\d{4}-?\d{4}$/;
    const numberValid = numberRegex.test(tutorNumber);

    // recupera a descrição do atendimento
    const description = inDescription.value

    //recupera a hora selecionada
    const hourSelected = inTime.value


    // verifica os campos do form
    if (!tutorName) {
      showToast('danger', 'Informe o nome do cliente')
      isValid = false
    } else if (!petName) {
      showToast('danger', 'Informe o nome do pet')
      isValid = false
    } else if (!numberValid) {
      showToast('danger', 'Informe um número válido, no formato: (99) 9 9999-9999')
      isValid = false
    } else if (!description) {
      showToast('danger', 'Informe uma descrição')
      isValid = false
    } else if (!hourSelected) {
      showToast('danger', 'Selecione uma hora')
      isValid = false
    }

    if (isValid) {

      //recupera somente a hora 
      const [hour] = hourSelected.split(':')

      // combina a data e o horário selecionados no fuso local
      const when = dayjs(`${inDate.value}T${hourSelected}`)

      // envias o agendamento para a api
      await scheduleNew({ tutorName, petName, tutorNumber, description, when })

      // recarrega datas e horarios
      await scheduleDay()
      await scheduleLoadByDay()

      // limpa os inputs
      inTutorName.value = ''
      inPetName.value = ''
      inTutorNumber.value = ''
      inDescription.value = ''


      // Data atual para o input
      const inputToday = dayjs(new Date()).format('YYYY-MM-DD')
      inDate.value = inputToday;
    }

  } catch (error) {
    showToast('danger', 'Não foi possível realizar o agendamento')
    console.log(error)
  }
}

// Data atual para o input
const inputToday = dayjs(new Date()).format('YYYY-MM-DD')
const inputMax = dayjs(new Date()).add(2, 'year').format('YYYY-MM-DD')

// Carrega a data atual e define a data mínima e máxima nos inputs date
inDates.forEach((input) => {
  input.value = inputToday;
  input.min = inputToday;
  input.max = inputMax;
});
