// public/js/script.js

document.addEventListener("DOMContentLoaded", () => {

  /* ================= LOADER ================= */
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.style.display = "none";
    }, 800);
  }

  /* ================= YEAR ================= */
  const yearEl = document.getElementById("nowYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ============ SMOOTH SCROLL ============== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.length > 1) {
        e.preventDefault();
        document.querySelector(targetId)?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  /* ============ THEME TOGGLE (FINAL FIX) ============ */
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  if (themeToggle) {
    const savedTheme = localStorage.getItem("site-theme");

    if (savedTheme === "dark") {
      body.classList.add("dark");
      themeToggle.textContent = "🌙";
    } else {
      themeToggle.textContent = "🌞";
    }

    themeToggle.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark");
      localStorage.setItem("site-theme", isDark ? "dark" : "light");
      themeToggle.textContent = isDark ? "🌙" : "🌞";
    });
  }

  /* ============ CONTACT BUTTON SCROLL ============ */
  const contactBtn = document.getElementById("contactBtn");
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      document.querySelector("#contact")?.scrollIntoView({
        behavior: "smooth"
      });

      setTimeout(() => {
        document.querySelector('#contactForm input[name="name"]')?.focus();
      }, 700);
    });
  }

  /* ============ EMAILJS SAFE INIT ============ */
  if (typeof emailjs !== "undefined") {
    emailjs.init("LsigqU-7PssVcFenI");
  } else {
    console.warn("EmailJS not loaded");
  }

  const form = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");

  if (form && typeof emailjs !== "undefined") {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      formMsg.style.color = "#000";
      formMsg.textContent = "Sending...";

      const templateParams = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value || "Not provided",
        message: form.message.value,
        title: "New Contact Form Message"
      };

      emailjs
        .send("service_ak5cqex", "template_4iss5ps", templateParams)
        .then(() => {
          formMsg.style.color = "green";
          formMsg.textContent = "Message sent successfully! 🎉";
          form.reset();

          setTimeout(() => {
            formMsg.textContent = "";
          }, 3000);
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          formMsg.style.color = "red";
          formMsg.textContent = "Failed to send message 😢";

          setTimeout(() => {
            formMsg.textContent = "";
          }, 4000);
        });
    });
  }

  /* ============ RESUME DOWNLOAD ============ */
  const downloadBtn = document.getElementById("downloadBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      // handled by anchor href
    });
  }

});
