// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Theme toggle
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// Counter animation
function animateCount(el, target, duration = 900) {
  const startTime = performance.now();
  const start = 0;

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(start + (target - start) * progress);
    el.textContent = value;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counters = [...document.querySelectorAll("[data-count]")];
let started = false;

function startCountersOnce() {
  if (started) return;
  started = true;
  counters.forEach((el) => {
    const target = parseInt(el.getAttribute("data-count") || "0", 10);
    animateCount(el, target);
  });
}

// Start counters when hero card is visible (or immediately if unsupported)
const heroCard = document.querySelector(".hero__card");
if ("IntersectionObserver" in window && heroCard) {
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      startCountersOnce();
      observer.disconnect();
    }
  }, { threshold: 0.25 });
  observer.observe(heroCard);
} else {
  startCountersOnce();
}

// Simple form validation (front-end only)
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

function setMsg(text, ok = false) {
  formMsg.textContent = text;
  formMsg.style.opacity = "1";
  formMsg.style.filter = ok ? "none" : "none";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name) return setMsg("Please enter your name.");
  if (!email || !email.includes("@")) return setMsg("Please enter a valid email address.");
  if (message.length < 8) return setMsg("Message should be at least 8 characters.");

  setMsg("Message sent! (Demo only)", true);
  form.reset();
});
