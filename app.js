const PAGES = ["home", "about", "programs", "coaches", "contact"];

function getPageFromHash() {
  const hash = (window.location.hash || "").replace("#", "").trim();
  return PAGES.includes(hash) ? hash : "home";
}

function setActivePage(page) {
  document.querySelectorAll(".page").forEach((sec) => {
    sec.hidden = sec.dataset.page !== page;
  });

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    const isCurrent = btn.dataset.route === page;
    btn.setAttribute("aria-current", isCurrent ? "page" : "false");
  });

  if (window.location.hash !== `#${page}`) {
    history.replaceState(null, "", `#${page}`);
  }

  document.getElementById("main").scrollIntoView({ block: "start", behavior: "smooth" });
}

document.querySelectorAll("[data-route]").forEach((el) => {
  el.addEventListener("click", () => setActivePage(el.dataset.route));
});

const brand = document.querySelector(".brand");
if (brand) {
  brand.addEventListener("click", () => setActivePage("home"));
  brand.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") setActivePage("home");
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
setActivePage(getPageFromHash());

window.addEventListener("hashchange", () => setActivePage(getPageFromHash()));
