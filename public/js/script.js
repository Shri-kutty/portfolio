// public/js/script.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ script.js loaded");

  /* ---------------- LOADER ------------------- */
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => (loader.style.display = "none"), 800);
  }

  /* ---------------- YEAR ------------------- */
  const yearEl = document.getElementById("nowYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- SMOOTH SCROLL ------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ==================================================
     🌙 THEME TOGGLE — FINAL & DEBUGGED
  ================================================== */
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  console.log("Theme toggle button:", themeToggle);

  if (!themeToggle) {
    console.error("❌ themeToggle button NOT FOUND in HTML");
    return;
  }

  // Load saved theme
  const savedTheme = localStorage.getItem("site-theme");
  console.log("Saved theme:", savedTheme);

  if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "🌙";
  } else {
    themeToggle.textContent = "🌞";
  }

  // Toggle on click
  themeToggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark");
    localStorage.setItem("site-theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "🌙" : "🌞";

    console.log("Theme changed →", isDark ? "dark" : "light");
  });

  /* ---------------- CONTACT BUTTON ------------------- */
  const contactBtn = document.getElementById("contactBtn");
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ==================================================
     📧 EMAILJS (SAFE – WILL NOT BREAK TOGGLE)
  ================================================== */
  if (typeof emailjs !== "undefined") {
    emailjs.init("LsigqU-7PssVcFenI");
    console.log("✅ EmailJS loaded");
  } else {
    console.warn("⚠️ EmailJS NOT loaded");
  }

  const form = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      if (typeof emailjs === "undefined") {
        formMsg.innerText = "Email service unavailable";
        return;
      }

      formMsg.innerText = "Sending...";

      emailjs
        .send("service_ak5cqex", "template_4iss5ps", {
          name: form.name.value,
          email: form.email.value,
          phone: form.phone.value || "Not provided",
          message: form.message.value
        })
        .then(() => {
          formMsg.innerText = "Message sent successfully 🎉";
          form.reset();
        })
        .catch(err => {
          console.error("EmailJS error:", err);
          formMsg.innerText = "Failed to send message 😢";
        });
    });
  }
});
