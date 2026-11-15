const inTutorNumber = document.querySelector('#schedule-tutor-number');
const inDescription = document.querySelector('#schedule-description');
const inTutorName = document.querySelector('#schedule-tutor-name');
const inDates = document.querySelectorAll('input[type="date"]');
const inPetName = document.querySelector('#schedule-pet-name');
const inTime = document.querySelector('#schedule-time');
const inDate = document.querySelector('#schedule-date');
import { hoursLoad } from "./hours-load.js";
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

form.onsubmit = (event) => {
  // evita reload na pagina
  event.preventDefault()

  inTutorName.value = 'asdf'
  inPetName.value = 'asdf'
  inTutorNumber.value = '(32) 9 9999-9999'
  inDescription.value = 'asdf'

  try {

    // recupera o nome do tutor
    const tutorName = inTutorName.value.trim()

    if (!tutorName) {
      alert("Informe o nome do cliente")
    }

    // recupera o nome do pet
    const petName = inPetName.value.trim()

    if (!petName) {
      alert("Informe o nome do pet")
    }

    // recupera o numero de telefone e verifica se é valido
    const tutorNumber = inTutorNumber.value.trim()
    const numberRegex = /^\(?\d{2}\)?\s?9?\s?\d{4}-?\d{4}$/;
    const numberValid = numberRegex.test(tutorNumber);

    if (!numberValid) {
      alert("Informe um número válido, no formato: (99) 9 9999-9999")
    }

    // recupera a descrição do atendimento
    const description = inDescription.value

    if (!description) {
      alert("Informe uma descrição")
    }

    //recupera a hora selecionada
    const hourSelected = inTime.value

    if (!hourSelected) {
      alert("Selecione uma hora")
    }

    //recupera somente a hora 
    const [hour] = hourSelected.split(':')

    // insere a hora na data para salvar
    const when = dayjs(inDate.value).add(hour, "hour")

    // Gera um ID
    const id = new Date().getTime()

    console.log(id)

  } catch (error) {
    alert("Não foi possível realizar o agendamento")
    console.log(error)
  }
}

inDate.addEventListener('change', () => {
  const date = inDate.value
  hoursLoad({ date })
})

// Data atual para o input
const inputToday = dayjs(new Date()).format('YYYY-MM-DD')
const inputMax = dayjs(new Date()).add(2, 'year').format('YYYY-MM-DD')

// Carrega a data atual e define a data mínima e máxima nos inputs date
inDates.forEach((input) => {
  input.value = inputToday;
  input.min = inputToday;
  input.max = inputMax;
});
