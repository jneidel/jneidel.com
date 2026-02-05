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
})();

/* Lightbox (click on images to zoom in) */
(function image_lightbox() {
    const contentRoot = document.querySelector("#content");
    const images = Array.from((contentRoot || document).querySelectorAll("img"));
    if (images.length == 0)
        return;

    let overlay;
    let overlayImg;
    let overlayCaption;
    let closeButton;
    let lastActiveElement;

    function buildOverlay() {
        overlay = document.createElement("div");
        overlay.className = "image-lightbox";
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.setAttribute("aria-hidden", "true");
        overlay.hidden = true;

        closeButton = document.createElement("button");
        closeButton.className = "image-lightbox__close";
        closeButton.type = "button";
        closeButton.setAttribute("aria-label", "Close image");
        closeButton.textContent = "×";

        const figure = document.createElement("figure");
        figure.className = "image-lightbox__figure";

        overlayImg = document.createElement("img");
        overlayImg.className = "image-lightbox__img";
        overlayImg.alt = "";
        overlayImg.decoding = "async";
        overlayImg.loading = "eager";

        overlayCaption = document.createElement("figcaption");
        overlayCaption.className = "image-lightbox__caption";

        figure.appendChild(overlayImg);
        figure.appendChild(overlayCaption);

        overlay.appendChild(closeButton);
        overlay.appendChild(figure);

        overlay.addEventListener("click", (event) => {
            if (event.target === overlay) closeLightbox();
        });
        figure.addEventListener("click", (event) => {
            event.stopPropagation();
        });
        overlayImg.addEventListener("click", (event) => {
            event.stopPropagation();
            closeLightbox();
        });
        closeButton.addEventListener("click", closeLightbox);

        (contentRoot || document.body).appendChild(overlay);
    }

    function getCaptionHtml(img) {
        const figure = img.closest("figure");
        if (figure) {
            const figcaption = figure.querySelector("figcaption");
            if (figcaption && figcaption.innerHTML.trim()) {
                return figcaption.innerHTML.trim();
            }
        }
        const title = img.getAttribute("title");
        if (title && title.trim()) return title.trim();
        return "";
    }

    function openLightbox(img) {
        if (!overlay) buildOverlay();
        const src = img.currentSrc || img.src;
        if (!src) return;
        lastActiveElement = document.activeElement;
        overlayImg.hidden = false;
        overlayImg.src = src;
        overlayImg.alt = img.getAttribute("alt") || "";
        const caption = getCaptionHtml(img);
        overlayCaption.innerHTML = caption;
        overlayCaption.hidden = caption == "";
        overlay.hidden = false;
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("image-lightbox-open");
        document.documentElement.classList.add("image-lightbox-open");
        closeButton.focus();
    }

    function closeLightbox() {
        if (!overlay || overlay.hidden) return;
        overlay.hidden = true;
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("image-lightbox-open");
        document.documentElement.classList.remove("image-lightbox-open");
        overlayImg.removeAttribute("src");
        overlayImg.hidden = true;
        overlayCaption.hidden = true;
        if (lastActiveElement && typeof lastActiveElement.focus === "function") {
            lastActiveElement.focus();
        }
    }

    images.forEach((img) => {
        if (img.closest(".image-lightbox")) return;
        img.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            openLightbox(img);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && document.body.classList.contains("image-lightbox-open")) {
            closeLightbox();
        }
    });
})();
