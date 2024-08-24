(function move_newsletter_signup_above_footnotes() {
  function get_footnotes() {
    const referencesSection = document.querySelector("#referenzen") || document.querySelector("#references");
    if (referencesSection) return referencesSection;

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
    const parentOfFootnotes = footnotes.parentNode;
    parentOfFootnotes.insertBefore(signupForm, footnotes);
  }
})()
