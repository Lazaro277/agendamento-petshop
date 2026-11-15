import { scheduleDay } from "../schedules/load";
import { scheduleLoadByDay } from "../schedules/load-by-day";

const inDate = document.querySelector('#schedule-date');

// seleciona o input da data que o usuário seleciona para filtrar por ela
const selectedDate = document.querySelector('#appointment-date')

// recarrega os horarios quando o dia mudar
inDate.onchange = () => scheduleDay()
selectedDate.onchange = () => scheduleLoadByDay()