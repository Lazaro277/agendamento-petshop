const modal = document.querySelector('#modal-new-scheduling')
const btnNewScheduling = document.querySelector('#new-scheduling-button')
const closeModal = document.querySelector('#close-modal')

// abre o modal clicando em novo agendamento
btnNewScheduling.addEventListener('click', () => {
  modal.classList.remove('modal-hide')
})

// fecha o modal clicando no 'x'
closeModal.addEventListener('click', () => {
  modal.classList.add('modal-hide')
})

// fecha o modal clicando fora do body
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.add('modal-hide')
  }
})

// fecha o modal apertando Esc
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modal.classList.add('modal-hide')
  }
})