const dateWrapper = document.querySelector('.wrapper-inDate');
const inDate = document.querySelector('#appointment-date');
const dayjs = window.dayjs;

// Coloca o foco no campo e abre o seletor de data quando suportado.
function openDatePicker() {
  inDate.focus();

  if (typeof inDate.showPicker === 'function') {
    inDate.showPicker();
  }
}

// Abre o calendário ao clicar nos ícones ou no espaço do contêiner.
dateWrapper.addEventListener('click', (event) => {
  if (event.target !== inDate) {
    openDatePicker();
  }
});

// Permite abrir o calendário usando Enter ou Espaço pelo teclado.
dateWrapper.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openDatePicker();
  }
});


// Data atual para o input
const inputToday = dayjs(new Date()).format('YYYY-MM-DD')
console.log(inputToday)

// Carrega a data atual e define a data mínima
inDate.value = inputToday
inDate.min = inputToday
