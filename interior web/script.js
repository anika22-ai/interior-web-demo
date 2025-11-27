// Small interactive bits: mobile nav, form mock submit, year
document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
navToggle &&
  navToggle.addEventListener("click", () => {
    const nav = document.querySelector(".nav");
    if (!nav) return;
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
  });

// Fake form submit (frontend only). To connect to real backend, replace with fetch() to your API.
function submitContact(e) {
  e.preventDefault();
  const note = document.getElementById("formNote");
  note.textContent = "Sending…";
  // Simulate send
  setTimeout(() => {
    note.textContent =
      "Thanks! Your message was sent. We will reply within 48 hours.";
    e.target.reset();
  }, 900);
}

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (ev) => {
    const href = a.getAttribute("href");
    if (href === "#") return;
    const el = document.querySelector(href);
    if (el) {
      ev.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
const baContainer = document.querySelector(".ba-image-wrapper");
const baResize = document.querySelector(".ba-resize");
const baHandle = document.querySelector(".ba-handle");

let isDragging = false;

baHandle.addEventListener("mousedown", () => (isDragging = true));
window.addEventListener("mouseup", () => (isDragging = false));
window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  let rect = baContainer.getBoundingClientRect();
  let x = e.clientX - rect.left;

  // Clamp within bounds
  if (x < 0) x = 0;
  if (x > rect.width) x = rect.width;

  baResize.style.width = x + "px";
  baHandle.style.left = x + "px";
});

// Mobile support
baHandle.addEventListener("touchstart", () => (isDragging = true));
window.addEventListener("touchend", () => (isDragging = false));
window.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  let rect = baContainer.getBoundingClientRect();
  let x = e.touches[0].clientX - rect.left;

  if (x < 0) x = 0;
  if (x > rect.width) x = rect.width;

  baResize.style.width = x + "px";
  baHandle.style.left = x + "px";
});
const quizForm = document.getElementById("quizForm");
const quizResult = document.getElementById("quizResult");

quizForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Collect answers
  const formData = new FormData(quizForm);
  let scores = {
    Scandinavian: 0,
    Minimalist: 0,
    Boho: 0,
    Luxury: 0,
  };

  for (let [key, value] of formData.entries()) {
    scores[value]++;
  }

  // Find highest score
  let bestStyle = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  // Show result
  let descriptions = {
    Scandinavian:
      "You love warmth, light wood, and cozy vibes — the Scandinavian style suits you best.",
    Minimalist:
      "You thrive in clutter-free, simple, and sleek spaces — Minimalist is your match.",
    Boho: "You’re free-spirited and love colors, textures, and nature — Boho interiors reflect your soul.",
    Luxury:
      "You enjoy elegance and drama — Luxury interiors with plush finishes are your style.",
  };

  quizResult.innerHTML = `
    <h3>Your Style: ${bestStyle}</h3>
    <p>${descriptions[bestStyle]}</p>
  `;
  quizResult.classList.remove("hidden");
  quizForm.reset();
});
let currentIndex = 0;
const testimonials = document.querySelectorAll(".testimonial");

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.remove("active");
    if (i === index) t.classList.add("active");
  });
}

function nextTestimonial() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
}

// Auto-rotate every 5 seconds
setInterval(nextTestimonial, 5000);

// Show the first one initially
showTestimonial(currentIndex);
document.getElementById("moodForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const room = document.getElementById("room").value;
  const style = document.getElementById("style").value;

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `
    <h3>Suggested Moodboard for ${room} (${style} Style)</h3>
    <p><strong>Color Palette:</strong> ${getColors(style)}</p>
    <p><strong>Furniture Ideas:</strong> ${getFurniture(style)}</p>
  `;
});

// Dummy AI functions
function getColors(style) {
  if (style.toLowerCase().includes("modern"))
    return "White, Black, Grey, Metallics";
  if (style.toLowerCase().includes("minimalist"))
    return "Beige, Soft Grey, Light Wood, White";
  if (style.toLowerCase().includes("bohemian"))
    return "Earthy Tones, Mustard, Teal, Deep Red";
  return "Neutral Tones with Accent Colors";
}

function getFurniture(style) {
  if (style.toLowerCase().includes("modern"))
    return "Glass coffee table, sleek sofa, wall art";
  if (style.toLowerCase().includes("minimalist"))
    return "Simple wooden table, white shelves, plants";
  if (style.toLowerCase().includes("bohemian"))
    return "Rattan chairs, colorful rugs, hanging plants";
  return "Mix of comfort + elegance furniture";
}
document.getElementById("costForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const roomType = document.getElementById("roomType").value;
  const size = parseInt(document.getElementById("size").value);
  const budget = document.getElementById("budget").value;
  const resultDiv = document.getElementById("result");

  if (!roomType || !size || !budget) {
    resultDiv.style.display = "block";
    resultDiv.textContent = "⚠️ Please fill in all fields.";
    return;
  }

  // Base cost per sqft
  let baseCost = 0;
  if (roomType === "living") baseCost = 1200;
  if (roomType === "bedroom") baseCost = 1000;
  if (roomType === "kitchen") baseCost = 1500;
  if (roomType === "office") baseCost = 1300;

  // Budget multiplier
  let multiplier = 1;
  if (budget === "basic") multiplier = 1;
  if (budget === "standard") multiplier = 1.5;
  if (budget === "luxury") multiplier = 2.5;

  // Final estimate
  const estimate = baseCost * size * multiplier;

  resultDiv.style.display = "block";
  resultDiv.textContent = `💰 Estimated Cost: ₹${estimate.toLocaleString()}`;
});
document.querySelectorAll(".wishlist-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    let card = this.closest(".property-card");
    let property = {
      id: card.dataset.id,
      name: card.dataset.name,
      img: card.dataset.img,
    };

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Check if already added
    let exists = wishlist.some((item) => item.id === property.id);

    if (!exists) {
      wishlist.push(property);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      this.querySelector("i").classList.replace("fa-regular", "fa-solid");
      this.querySelector("i").style.color = "red";
      alert("Added to Wishlist ❤️");
    } else {
      alert("Already in Wishlist!");
    }
  });
});
// Update wishlist count
function updateWishlistCount() {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let countElement = document.getElementById("wishlist-count");
  if (countElement) {
    countElement.textContent = wishlist.length;
  }
}

// Call it when page loads
updateWishlistCount();
