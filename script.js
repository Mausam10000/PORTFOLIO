// ================= LOADER =================

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }, 1800);
});


// ================= TYPING EFFECT =================

const words = [
  "Backend Developer",
  "Python Engineer",
  "Django Developer",
  "AI Enthusiast",
  "Future Full Stack Engineer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

  const currentWord = words[wordIndex];
  const typing = document.getElementById("typing");

  if (!deleting) {
    charIndex++;
  } else {
    charIndex--;
  }

  typing.textContent = currentWord.substring(0, charIndex);

  if (!deleting && charIndex === currentWord.length) {
    deleting = true;

    setTimeout(typeEffect, 1200);
    return;
  }

  if (deleting && charIndex === 0) {
    deleting = false;

    wordIndex++;

    if (wordIndex === words.length) {
      wordIndex = 0;
    }
  }

  setTimeout(typeEffect, deleting ? 60 : 110);
}

typeEffect();



// ================= SCROLL REVEAL =================

function revealElements() {

  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {

    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }

  });
}

window.addEventListener("scroll", revealElements);
revealElements();



// ================= CUSTOM CURSOR =================

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {

  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

});



// ================= CURSOR EXPAND ON HOVER =================

const hoverItems = document.querySelectorAll(
  "a, button, .project-card, .skill-card, .stat-box"
);

hoverItems.forEach((item) => {

  item.addEventListener("mouseenter", () => {

    cursor.style.transform = "translate(-50%, -50%) scale(2)";

  });

  item.addEventListener("mouseleave", () => {

    cursor.style.transform = "translate(-50%, -50%) scale(1)";

  });

});



// ================= NAVBAR SCROLL EFFECT =================

window.addEventListener("scroll", () => {

  const nav = document.querySelector("nav");

  if (window.scrollY > 80) {

    nav.style.padding = "14px 40px";
    nav.style.background = "rgba(8,12,20,0.9)";
    nav.style.boxShadow = "0 0 20px rgba(0,212,255,0.08)";

  }

  else {

    nav.style.padding = "18px 40px";
    nav.style.background = "rgba(255,255,255,0.03)";
    nav.style.boxShadow = "none";

  }

});



// ================= COUNTER ANIMATION =================

const counters = document.querySelectorAll(".stat-box h2");

let counterStarted = false;

function runCounter() {

  if (counterStarted) return;

  const stats = document.querySelector(".stats");

  const statsTop = stats.getBoundingClientRect().top;

  if (statsTop < window.innerHeight - 100) {

    counterStarted = true;

    counters.forEach((counter) => {

      const target = parseInt(counter.innerText);

      let count = 0;

      const update = () => {

        if (count < target) {

          count++;

          counter.innerText = count + "+";

          requestAnimationFrame(update);

        }

        else {

          if (target === 1) {
            counter.innerText = "1";
          }

        }

      };

      update();

    });

  }
}

window.addEventListener("scroll", runCounter);



// ================= HERO PARALLAX =================

window.addEventListener("mousemove", (e) => {

  const hero = document.querySelector(".hero-right");

  const x = (window.innerWidth - e.pageX * 2) / 80;
  const y = (window.innerHeight - e.pageY * 2) / 80;

  hero.style.transform =
    "translateX(" + x + "px) translateY(" + y + "px)";

});



// ================= MAGNETIC BUTTON EFFECT =================

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {

  button.addEventListener("mousemove", (e) => {

    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform =
      "translate(" + x * 0.15 + "px," + y * 0.15 + "px)";

  });

  button.addEventListener("mouseleave", () => {

    button.style.transform = "translate(0px,0px)";

  });

});



// ================= FLOATING CODE WINDOW =================

const codeWindow = document.querySelector(".code-window");

let angle = 0;

function floatCode() {

  angle += 0.01;

  const y = Math.sin(angle) * 8;

  codeWindow.style.transform =
    "translateY(" + y + "px)";

  requestAnimationFrame(floatCode);
}

floatCode();



// ================= SMOOTH SCROLL FOR NAV =================

document.querySelectorAll("nav a").forEach((anchor) => {

  anchor.addEventListener("click", function (e) {

    e.preventDefault();

    const target = document.querySelector(
      this.getAttribute("href")
    );

    target.scrollIntoView({
      behavior: "smooth"
    });

  });

});



// ================= CONSOLE SIGNATURE =================

console.log("====================================");
console.log("Portfolio Developed by Mausam");
console.log("Backend Developer | Python | Django");
console.log("====================================");
