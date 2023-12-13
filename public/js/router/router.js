import Pages from "./pages.js"
import Router from "./router_utils.js"

const loader = `<div class="loader-wrapper">
  <div class="loader"></div>
</div>
`

Router.initialize(Pages, loader, document.querySelector("#main"))

window.addEventListener("popstate", Router.locationHandler)
Router.loadLinks(document)
Router.locationHandler()
