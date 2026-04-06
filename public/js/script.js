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

  /* ---------------- THEME TOGGLE ------------------- */
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
      localStorage.setItem("theme", theme);
    });
  }

  /* ---------------- TYPING ANIMATION ------------------- */
  const typedSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");
  const words = ["Full Stack Developer", "AI Enthusiast", "Problem Solver"];
  const typingDelay = 150;
  const erasingDelay = 80;
  const newWordDelay = 2000;
  let wordIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < words[wordIndex].length) {
      if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedSpan.textContent += words[wordIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newWordDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedSpan.textContent = words[wordIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      wordIndex++;
      if (wordIndex >= words.length) wordIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }

  if (typedSpan) {
    setTimeout(type, newWordDelay + 250);
  }
});
