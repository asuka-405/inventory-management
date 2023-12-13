let pages
let loader
let root

function initialize(pageList, loaderElement, rootElement) {
  pages = pageList
  loader = loaderElement
  root = rootElement
}

function loadLinks(linkContainer) {
  linkContainer
    .querySelectorAll(".internal-link")
    .forEach((a) => a.addEventListener("click", (e) => linkHandler(e)))
}

function activateLink(element, tab) {
  element.querySelectorAll(".internal-link").forEach((item) => {
    if (item.getAttribute("tab") === tab) {
      item.classList.add("active")
    } else {
      item.classList.remove("active")
    }
  })
}

function linkHandler(e) {
  e = e || window.event
  e.preventDefault()

  console.log("linkHandler", e.target)

  const prevTab = new URLSearchParams(location.search).get("tab")
  const tab = e.target.getAttribute("tab")

  if (tab === prevTab) return

  history.pushState({}, "", `index.html?tab=${tab}`)
  locationHandler(prevTab)
}

function locationHandler(prevTab) {
  if (pages[prevTab] && pages[prevTab].onunmount) {
    pages[prevTab].onunmount()
  }

  const tab = new URLSearchParams(location.search).get("tab")
  if (!tab) {
    history.pushState({}, "", "index.html?tab=home")
    return locationHandler()
  }
  const page = pages[tab] || { url: "./pages/404.htm" }
  root.innerHTML = loader
  fetch(page.url)
    .then((response) => response.text())
    .then((html) => {
      root.innerHTML = html
      if (page.onmount) page.onmount()
      loadLinks(root)
      activateLink(root, tab)
    })

  // Add class active to clicked internal-link and remove from others
  activateLink(document, tab)
}

const Router = {
  loadLinks,
  linkHandler,
  locationHandler,
  initialize,
}

export default Router
