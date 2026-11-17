const btnConfirm = document.querySelector('#btn-confirm')
const btnCancel = document.querySelector('#btn-cancel')
const toastElement = document.querySelector('#toastConfirm')
const toastBody = document.querySelector('#toastConfirm .toast-body')
const toastMessage = document.querySelector('#toast-confirm-message')

const toast = bootstrap.Toast.getOrCreateInstance(toastElement, {
  autohide: false
})

export async function showConfirm(bgColor, text) {
  return new Promise((resolve) => {
    toastMessage.textContent = text
    toastBody.parentElement.className = `toast position-absolute top-0 start-50 translate-middle-x mt-3 rounded-3 bg-${bgColor}`
    toast.show()
    btnConfirm.onclick = () => {
      toast.hide()
      resolve(true)
    }

    btnCancel.onclick = () => {
      toast.hide()
      resolve(false)
    }
  })
}