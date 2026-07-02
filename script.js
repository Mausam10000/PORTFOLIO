// ================= TYPING EFFECT =================

const words = [
  "BIT Student",
  "Python Learner",
  "Django Learner",
  "Backend Enthusiast"
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

  setTimeout(typeEffect, deleting ? 60 : 100);
}

typeEffect();



// ================= CUSTOM CURSOR =================

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {

  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

});



// ================= CURSOR HOVER EFFECT =================

const hoverElements = document.querySelectorAll(
  "a, button, .skill-card, .project-card, .interest-card"
);

hoverElements.forEach((element) => {

  element.addEventListener("mouseenter", () => {

    cursor.style.transform =
      "translate(-50%, -50%) scale(2)";

  });

  element.addEventListener("mouseleave", () => {

    cursor.style.transform =
      "translate(-50%, -50%) scale(1)";

  });

});



// ================= REVEAL ANIMATION =================

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



// ================= NAVBAR SCROLL EFFECT =================

window.addEventListener("scroll", () => {

  const nav = document.querySelector("nav");

  if (window.scrollY > 50) {

    nav.style.background = "rgba(10,15,25,0.85)";
    nav.style.padding = "14px 35px";
    nav.style.boxShadow =
      "0 0 20px rgba(0,212,255,0.06)";

  }

  else {

    nav.style.background =
      "rgba(255,255,255,0.03)";

    nav.style.padding = "18px 35px";

    nav.style.boxShadow = "none";

  }

});



// ================= SMOOTH NAVIGATION =================

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



// ================= BUTTON CLICK SCROLL =================

const buttons = document.querySelectorAll("button");

buttons[0].addEventListener("click", () => {

  document.querySelector("#about").scrollIntoView({
    behavior: "smooth"
  });

});

buttons[1].addEventListener("click", () => {

  document.querySelector("#projects").scrollIntoView({
    behavior: "smooth"
  });

});



// ================= CONSOLE SIGNATURE =================

console.log("================================");
console.log("Portfolio Website - Mausam");
console.log("Python | Django | BIT Student");
console.log("================================");
