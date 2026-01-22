// public/js/script.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ script.js loaded");

  /* ---------------- LOADER ------------------- */
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.style.display = "none";
    }, 800);
  }

  /* ---------------- YEAR ------------------- */
  const yearEl = document.getElementById("nowYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

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

  /* ---------------- CONTACT BUTTON ------------------- */
  const contactBtn = document.getElementById("contactBtn");
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      document.getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ---------------- EMAILJS ------------------- */
  if (typeof emailjs !== "undefined") {
    emailjs.init("LsigqU-7PssVcFenI");
    console.log("✅ EmailJS initialized");
  }

  const form = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      formMsg.innerText = "Sending...";

      emailjs.send("service_ak5cqex", "template_4iss5ps", {
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
