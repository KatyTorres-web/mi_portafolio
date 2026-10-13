"use strict";

const footer = document.querySelector("#siteFooter");
if (footer) {
  const year = new Date().getFullYear();
  footer.innerHTML = `<small>© ${year} TORRES AMBROSIO KATHERINE MEDALLY · Ingeniería de Sistemas · UNCP</small>`;
}
