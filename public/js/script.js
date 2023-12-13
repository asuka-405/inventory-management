import { setupForm } from "./utils.js"

document.querySelectorAll("form, fetch-req").forEach((form) => {
  setupForm(form)
})
