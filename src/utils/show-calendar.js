const dateWrappers = document.querySelectorAll('.wrapper-inDate');

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
