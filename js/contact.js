const btnSend = document.getElementById("form")

const expresiones = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  tel: /^[+]?[\d\s-]{8,20}$/
}

btnSend.addEventListener("submit", (e) => {
  e.preventDefault()

  const inputs = document.getElementsByTagName('input')

  const textarea = document.querySelector('textarea')
  textarea.classList.remove('error')

  let isValid = true

  for (let i = 0; i < inputs.length; i++) {
    const element = inputs[i];
    inputs[i].classList.remove("error")
    if (element.name == "name" && element.value === "") {
      element.classList.add("error")
      isValid = false
    }
    if (element.name === "tel" && !expresiones.tel.test(element.value)) {
      element.classList.add("error")
      isValid = false
    }
    if (element.name === "email" && !expresiones.email.test(element.value)) {
      element.classList.add("error")
      isValid = false
    }
  }
  if (textarea.value === "") {
    textarea.classList.add("error")
    isValid = false
  }
  if (isValid) {
    console.log("se envio");
    btnSend.submit()
  }
})