(function move_newsletter_signup_above_footnotes() {
  function get_footnotes() {
    return document.querySelector(".footnotes");
  }
  function get_last_newsletter_signup() {
    const forms = Array.from( document.querySelectorAll(".newsletter-signup") );
    const lastForm = forms[forms.length-1];
    try {
      if ( lastForm.classList.contains("allow-to-be-moved") )
        return lastForm;
    } catch {}
  }

  const footnotes = get_footnotes();
  const signupForm = get_last_newsletter_signup();

  if (footnotes && signupForm) {
    // insert between hr and first footnote
    const elementAfterHr = footnotes.children[1];
    footnotes.insertBefore(signupForm, elementAfterHr);
  }
})()
