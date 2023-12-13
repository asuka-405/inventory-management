const httpMessage = document.querySelector("#http-message")
httpMessage.addEventListener("click", () => {
  httpMessage.style.display = "none"
})

const MSG_TYPE = ["SUCCESS", "ERROR", "WARNING", "INFO"]

export function fetchFromServer(url, method, body) {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => {
      showMessage(MSG_TYPE[res.type], res.message)
    })
}

export function setupForm(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(form) || {}
    const body = {}
    for (let [key, value] of formData.entries()) {
      body[key] = value
    }
    fetchFromServer(form.action, form.method, body)
  })
}

function showMessage(type, message) {
  httpMessage.style.display = "block"
  httpMessage.classList.add(type)
  httpMessage.innerHTML = message
  setTimeout(() => {
    httpMessage.style.display = "none"
    httpMessage.classList.remove(type)
  }, 3000)
}
