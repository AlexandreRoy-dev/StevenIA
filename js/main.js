import { initNav } from "./modules/nav.js";
import { initScrollReveal } from "./modules/scroll-reveal.js";
import { initForms } from "./modules/form.js";
import { initAnalytics, trackLead } from "./modules/analytics.js";

initNav();
initScrollReveal();
initForms();
initAnalytics();

if (document.body.dataset.page === "merci") {
  trackLead();
}
