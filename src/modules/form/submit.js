import dayjs from "dayjs";
import { hoursLoad } from "./hours-load.js";
const form = document.querySelector("form")
const inDates = document.querySelectorAll('input[type="date"]');
const inDate = document.querySelector('#schedule-date');

form.onsubmit = (event) => {
  // evita reload na pagina
  event.preventDefault()
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
