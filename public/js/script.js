// public/js/script.js
document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- LOADER ------------------- */
  const loader = document.getElementById('loader');
  if (loader) setTimeout(() => loader.style.display = 'none', 800);

  /* ---------------- YEAR SET ------------------ */
  document.getElementById('nowYear').textContent = new Date().getFullYear();

  /* -------- SMOOTH SCROLLING ANCHOR LINKS ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------------- THEME TOGGLE (FIXED) -------------- */
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('site-theme');
if (savedTheme === 'dark') {
  body.classList.add('dark');
  if (themeToggle) themeToggle.textContent = '🌙';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark');

    localStorage.setItem('site-theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '🌙' : '🌞';
  });
}


  /* ---------------- CONTACT BUTTON ------------- */
  const contactBtn = document.getElementById('contactBtn');
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        document.querySelector('#contactForm input[name="name"]')?.focus();
      }, 800);
    });
  }

  /* ======================================================
       EMAILJS CONTACT FORM — FINAL WORKING VERSION
     ====================================================== */

  // Initialize EmailJS ONLY ONCE
  emailjs.init("LsigqU-7PssVcFenI");

  const form = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      formMsg.style.color = "black";
      formMsg.innerText = "Sending...";

      const templateParams = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value || "Not provided",
        message: form.message.value,
        title: "New Contact Form Message"
      };

      emailjs.send("service_ak5cqex", "template_4iss5ps", templateParams)
        .then(() => {
          formMsg.style.color = "green";
          formMsg.innerText = "Message sent successfully! 🎉";
          form.reset();

          setTimeout(() => formMsg.innerText = "", 3000);
        })
        .catch((error) => {
          formMsg.style.color = "red";
          formMsg.innerText = "Failed to send message. Please try again 😢";
          console.error("EmailJS Error:", error);

          setTimeout(() => formMsg.innerText = "", 4000);
        });
    });
  }

  /* ---------------- RESUME DOWNLOAD ------------- */
  const downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      // anchor triggers backend download automatically
    });
  }

});
