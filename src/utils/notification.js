const toastElement = document.querySelector('#liveToast')
const toastBody = document.querySelector('#toast-body')
const toast = bootstrap.Toast.getOrCreateInstance(toastElement, {
  delay: 3000
})

export function showToast(bgColor, text) {
  toastBody.textContent = text
  toastBody.parentElement.className = `d-flex rounded-3 bg-${bgColor}`
  toast.show()
}