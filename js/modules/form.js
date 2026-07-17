/**
 * Salesforce Web-to-Lead helpers.
 * SITE_ORIGIN / oid must be set in HTML hidden fields (see README).
 */

function getParams() {
  return new URLSearchParams(window.location.search);
}

function fillUtm(form) {
  const params = getParams();
  const map = {
    utm_source: "utm_source",
    utm_medium: "utm_medium",
    utm_campaign: "utm_campaign",
    utm_content: "utm_content",
    utm_term: "utm_term",
  };

  Object.entries(map).forEach(([param, field]) => {
    const input = form.querySelector(`[name="${field}"]`);
    if (input && params.get(param)) input.value = params.get(param);
  });
}

function setError(field, message) {
  const wrap = field.closest(".field") || field.closest(".checkbox");
  if (!wrap) return;
  wrap.classList.add("field--error");
  const err = wrap.querySelector(".field__error");
  if (err && message) err.textContent = message;
}

function clearErrors(form) {
  form.querySelectorAll(".field--error").forEach((el) => el.classList.remove("field--error"));
}

function validate(form) {
  clearErrors(form);
  let ok = true;

  const required = form.querySelectorAll("[required]");
  required.forEach((field) => {
    if (field.type === "checkbox") {
      if (!field.checked) {
        ok = false;
        setError(field, "Veuillez accepter pour continuer.");
      }
      return;
    }

    if (!String(field.value || "").trim()) {
      ok = false;
      setError(field, "Ce champ est requis.");
    }
  });

  const email = form.querySelector('[name="email"]');
  if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    ok = false;
    setError(email, "Entrez une adresse courriel valide.");
  }

  const phone = form.querySelector('[name="phone"]');
  if (phone && phone.value) {
    const digits = phone.value.replace(/\D/g, "");
    if (digits.length < 10) {
      ok = false;
      setError(phone, "Entrez un numéro de téléphone valide.");
    }
  }

  return ok;
}

export function initForms() {
  const forms = document.querySelectorAll('form[data-sf-lead]');
  forms.forEach((form) => {
    fillUtm(form);

    const oid = form.querySelector('[name="oid"]');
    const status = form.querySelector(".form__status");

    form.addEventListener("submit", (event) => {
      const honeypot = form.querySelector('[name="fax_number"]');
      if (honeypot && honeypot.value) {
        event.preventDefault();
        return;
      }

      if (!validate(form)) {
        event.preventDefault();
        if (status) {
          status.dataset.state = "error";
          status.textContent = "Vérifiez les champs en surbrillance.";
        }
        return;
      }

      if (oid && (!oid.value || oid.value.startsWith("REPLACE_ME"))) {
        event.preventDefault();
        if (status) {
          status.dataset.state = "error";
          status.textContent =
            "Le formulaire n’est pas encore connecté à Salesforce (oid manquant). Contactez-nous par téléphone.";
        }
        return;
      }

      if (status) {
        status.dataset.state = "ok";
        status.textContent = "Envoi en cours…";
      }
      // Allow native POST to Salesforce Web-to-Lead
    });
  });
}
