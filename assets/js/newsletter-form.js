// Based on: https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget

const processNewsletterForm = form => {
  const data = new FormData(form);
  data.append("form-name", "newsletter");
  fetch("/", {
    method: "POST",
    body: data,
  })
    .then(() => {
      form.innerHTML = `
<div class="rounded-sm bg-primary-300 px-4 py-2 dark:bg-primary-400">Success 🙂! A confirmation should be on it's way.</div>
`;
    })
    .catch(error => {
      form.innerHTML = `
<div class="rounded-sm bg-primary-300 px-4 py-2 dark:bg-primary-400">Something went wrong 🙁: ${error}</div>
`;
    })
}

const emailForm = document.querySelector(".email-form");
if (emailForm) {
  emailForm.addEventListener("submit", e => {
    e.preventDefault();
    processNewsletterForm(emailForm);
  })
}
