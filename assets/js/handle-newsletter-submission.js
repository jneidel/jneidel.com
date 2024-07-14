const emailForm = document.querySelector(".email-form");

if (emailForm) {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const stylingClasses="rounded-sm bg-primary-300 px-4 py-2 dark:bg-primary-400"

  emailForm.addEventListener("submit", () => {
    delay(500).then( () => {
      if (emailForm.classList.contains("form-lang-en")) {
        emailForm.innerHTML = `<div class="${stylingClasses}">Success!🙂 A confirmation is on it's way.</div>`
      } else if (emailForm.classList.contains("form-lang-de")) {
        emailForm.innerHTML = `<div class="${stylingClasses}">Das hat geklappt!🙂 Eine Bestätigung ist auf dem Weg.</div>`
      }
    })
  })
}
