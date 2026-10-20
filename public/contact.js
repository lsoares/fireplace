// In a block of its own, as the scripts of a page share their names: what is declared here is not seen by the others
{
// The message goes to Web3Forms, which has the address it's sent to; with no script, the form is sent as it is
const dialog = document.getElementById("contact-dialog")
document.querySelector(".open-contact").addEventListener("click", () => dialog.showModal())
dialog.querySelector(".dialog-x").addEventListener("click", () => dialog.close())
dialog.addEventListener("click", event => event.target === dialog && dialog.close())
const form = document.getElementById("contact")
form.addEventListener("submit", async event => {
  event.preventDefault()
  const status = document.getElementById("contact-status")
  status.textContent = "Sending…"
  try {
    const response = await fetch(form.action, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) })
    if (!(await response.json()).success) throw new Error("not sent")
    form.reset()
    status.textContent = "Message sent. Thank you!"
  } catch {
    status.textContent = "Couldn't send it. Try again later."
  }
})
}
