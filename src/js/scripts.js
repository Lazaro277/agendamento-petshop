const dateWrapper = document.querySelector('.wrapper-inDate');
const inDate = document.querySelector('#appointment-date');

function openDatePicker() {
  inDate.focus();

  if (typeof inDate.showPicker === 'function') {
    inDate.showPicker();
  }
}

dateWrapper.addEventListener('click', (event) => {
  if (event.target !== inDate) {
    openDatePicker();
  }
});

dateWrapper.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openDatePicker();
  }
});
