// The install buttons, as in the other addons: Stremio opens a stremio:// address only over https, so over http, as on this computer, there is
// only Stremio Web's install and the link to copy. Over https the link opens the app or, with none, as on an iPhone, nothing: if the page is
// still here, in sight, 2 seconds on, what's offered is Stremio Web's install instead. It gives the way to change the address, as it changes with the groups chosen
function wireInstall(getManifestPath) {
  const install = document.getElementById("install")
  const installWeb = document.getElementById("install-web")
  const copy = document.getElementById("copy")
  const secure = location.protocol === "https:"
  install.hidden = !secure
  installWeb.hidden = secure

  // The address is where the page is, as the site is in a folder of its own: `lsoares.github.io/fireplace/`
  const manifestAt = () => new URL(getManifestPath(), location.href)

  function refresh() {
    install.href = "stremio://" + manifestAt().host + manifestAt().pathname
    installWeb.href = "https://web.stremio.com/#/addons?addon=" + encodeURIComponent(manifestAt().href)
  }

  install.addEventListener("click", () => {
    install.textContent = "Opening Stremio…"
    let left = false
    const gone = () => { left = true }
    addEventListener("blur", gone, { once: true })
    document.addEventListener("visibilitychange", gone, { once: true })
    setTimeout(() => {
      install.textContent = "Install in Stremio"
      if (left) return
      install.hidden = true
      installWeb.hidden = false
    }, 2000)
  })

  copy.addEventListener("click", async () => {
    await navigator.clipboard.writeText(manifestAt().href)
    copy.textContent = "Copied ✓"
    setTimeout(() => (copy.textContent = "Copy link"), 1500)
  })

  refresh()
  return refresh
}
