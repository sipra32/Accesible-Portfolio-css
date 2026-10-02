document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  if (toggle && nav) {
    toggle.setAttribute("aria-label", "Open navigation");
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      toggle.setAttribute("aria-label", !expanded ? "Close navigation" : "Open navigation");
      nav.classList.toggle("open", !expanded);
    });
  }

  const form = document.querySelector("#contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = [
      { id: "name", message: "Please enter your name." },
      { id: "email", message: "Please enter a valid email address." },
      { id: "message", message: "Please enter a message." }
    ];
    let valid = true;

    fields.forEach(({id, message}) => {
      const input = document.getElementById(id);
      const error = document.getElementById(`${id}-error`);
      error.textContent = "";
      input.removeAttribute("aria-invalid");

      if (!input.value.trim() || (id === "email" && !input.validity.valid)) {
        valid = false;
        error.textContent = message;
        input.setAttribute("aria-invalid", "true");
      }
    });

    const status = document.getElementById("form-status");
    if (valid) {
      status.textContent = "Thanks! Your message has been validated. Connect this form to a server or form service to send it.";
      form.reset();
    } else {
      status.textContent = "Please correct the highlighted fields.";
      const firstInvalid = form.querySelector("[aria-invalid='true']");
      if (firstInvalid) firstInvalid.focus();
    }
  });
});
