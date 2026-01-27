const PAGES = ["home", "about", "programs", "coaches", "contact"];

const navEl = document.querySelector(".nav");
const menuToggle = document.getElementById("menuToggle");

function closeMenu(){
  if (!navEl || !menuToggle) return;
  navEl.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function toggleMenu(){
  if (!navEl || !menuToggle) return;
  const open = navEl.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
}

if (menuToggle) {
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });
}

// Close when clicking outside
document.addEventListener("click", (e) => {
  if (!navEl) return;
  if (!navEl.contains(e.target)) closeMenu();
});

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});


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
