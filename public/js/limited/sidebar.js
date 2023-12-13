const sidebar = document.querySelector(".sidebar")
const toggleBtn = document.querySelector(".sidebar__toggle")
const sidebarTitle = document.querySelector(".sidebar-title")
const sidebarHeadLogo = document.querySelector(".sidebar-head-logo")
const pushedBySidebar = document.querySelectorAll(".pushed-by-sidebar")

sidebar.querySelectorAll(".sidebar-actions > *").forEach((action) => {
  action.setAttribute("tabindex", "0")
})

toggleBtn.addEventListener("click", (e) => {
  let marginLeft
  let delay
  if (sidebar.classList.contains("collapse")) {
    // toggleBtn.querySelector(".icon").src = "./assets/close.svg"
    marginLeft = "15rem"
    delay = "0.3s"
  } else {
    // toggleBtn.querySelector(".icon").src = "./assets/menu.svg"
    marginLeft = "5rem"
    delay = "0s"
  }
  if (window.innerWidth > 768)
    pushedBySidebar.forEach((element) => {
      element.style.marginLeft = marginLeft
    })
  sidebarTitle.style.transitionDelay = delay
  sidebarHeadLogo.style.transitionDelay = delay
  sidebar.classList.toggle("collapse")
})

if (window.innerWidth <= 768) {
  pushedBySidebar.forEach((element) => {
    element.style.marginLeft = "0"
  })
}
