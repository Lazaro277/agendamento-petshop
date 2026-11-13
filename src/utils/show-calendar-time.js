const dateWrappers = document.querySelectorAll('.wrapper-inDate');
const inDates = document.querySelectorAll('input[type="date"]');
const inTime = document.querySelector('input[type="time"]');
const timeWrappers = document.querySelectorAll('.wrapper-inTime');
const dayjs = window.dayjs;

// Coloca o foco no campo e abre o seletor quando suportado.
function openPicker(input) {
  input.focus();

  if (typeof input.showPicker === 'function') {
    input.showPicker();
  }
}

dateWrappers.forEach((dateWrapper) => {
  const input = dateWrapper.querySelector('input[type="date"]');

  // Abre o calendário ao clicar nos ícones ou no espaço do contêiner.
  dateWrapper.addEventListener('click', (event) => {
    if (event.target !== input) {
      openPicker(input);
    }
  });

  // Permite abrir o calendário usando Enter ou Espaço pelo teclado.
  dateWrapper.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPicker(input);
    }
  });
});

timeWrappers.forEach((timeWrapper) => {
  const input = timeWrapper.querySelector('input[type="time"]');

  timeWrapper.addEventListener('click', (event) => {
    if (event.target !== input) {
      openPicker(input);
    }
  });

  timeWrapper.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPicker(input);
    }
  });
});

// Data atual para o input
const inputToday = dayjs(new Date()).format('YYYY-MM-DD')
// Pega a proxima hora disponível para agendamento
const inputTimeNow = dayjs().add(1, 'hour').startOf('hour').format('HH:mm')

// Carrega a data atual e define a data mínima
inDates.forEach((input) => {
  input.value = inputToday;
  input.min = inputToday;
});

inTime.value = inputTimeNow
