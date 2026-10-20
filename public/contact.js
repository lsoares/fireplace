// The message goes to Web3Forms, which has the address it's sent to; with no script, the form is sent as it is
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
