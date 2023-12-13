import { setupForm } from "../utils.js"

const Pages = {
  home: {
    url: "/public/pages/home.htm",
  },
  new: {
    url: "/public/pages/product.htm",
  },
  login: {
    url: "/public/pages/login.htm",
    onmount: () => {
      document
        .querySelector("#main form, #mail fetch-req")
        .addEventListener("submit", (e) => {
          setupForm(e.target)
        })
      console.log("login mounted")
    },
  },
  signup: {
    url: "/public/pages/signup.htm",
    onmount: () => {
      document
        .querySelector("#main form, #main fetch-req")
        .addEventListener("submit", (e) => {
          setupForm(e.target)
        })
    },
  },
}

export default Pages
