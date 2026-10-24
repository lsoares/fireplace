// The install button, with the other ways in the menu of its arrow: the link to copy and Stremio Web's install. Stremio opens a stremio:// address only over https,
// so over http, as on this computer, the button is the link to copy and the menu only has Stremio Web's install.
// Over https the link opens the app or, with none, as on an iPhone, nothing: if the page is still here, in sight, 2 seconds on, the menu opens.
// It gives the way to change the address, as it changes with the groups chosen
function wireInstall(getManifestPath) {
  const install = document.getElementById("install")
  const installWeb = document.getElementById("install-web")
  const copy = document.getElementById("copy")
  const more = document.querySelector(".more")
  const secure = location.protocol === "https:"

  // The address is where the page is, as the site is in a folder of its own: `lsoares.github.io/fireplace/`
  const manifestAt = () => new URL(getManifestPath(), location.href)

  function refresh() {
    install.href = "stremio://" + manifestAt().host + manifestAt().pathname
    installWeb.href = "https://web.stremio.com/#/addons?addon=" + encodeURIComponent(manifestAt().href)
  }

  document.addEventListener("click", event => {
    if (!more.contains(event.target)) more.open = false
  })
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") more.open = false
  })

  async function copyLink(button) {
    await navigator.clipboard.writeText(manifestAt().href)
    button.textContent = "Copied ✓"
    setTimeout(() => {
      button.textContent = "Copy link"
      more.open = false
    }, 1200)
  }

  if (secure) {
    copy.addEventListener("click", () => copyLink(copy))
    install.addEventListener("click", () => {
      install.textContent = "Opening Stremio…"
      let left = false
      const gone = () => { left = true }
      addEventListener("blur", gone, { once: true })
      document.addEventListener("visibilitychange", gone, { once: true })
      setTimeout(() => {
        install.textContent = "Install in Stremio"
        if (!left) more.open = true
      }, 2000)
    })
  } else {
    copy.hidden = true
    install.textContent = "Copy link"
    install.setAttribute("role", "button")
    install.tabIndex = 0
    install.addEventListener("click", event => {
      event.preventDefault()
      copyLink(install)
    })
    install.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        install.click()
      }
    })
  }

  refresh()
  return refresh
}
