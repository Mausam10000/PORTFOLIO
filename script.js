// typing effect

const words = [
"Full Stack Developer",
"Creative Designer",
"Problem Solver",
"Tech Enthusiast"
];

let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function type(){

currentWord = words[i];

if(isDeleting){
j--;
}else{
j++;
}

document.getElementById("typing").textContent =
currentWord.substring(0,j);

if(!isDeleting && j === currentWord.length){
isDeleting = true;
setTimeout(type,1000);
return;
}

if(isDeleting && j === 0){
isDeleting = false;
i++;

if(i === words.length){
i = 0;
}
}

setTimeout(type,isDeleting ? 60 : 120);
}

type();


// reveal animation

window.addEventListener("scroll",()=>{

let reveals = document.querySelectorAll(".reveal");

reveals.forEach(el=>{

let windowHeight = window.innerHeight;
let top = el.getBoundingClientRect().top;

if(top < windowHeight - 100){
el.classList.add("active");
}

});

});


// custom cursor

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove",(e)=>{

cursor.style.left = e.clientX + "px";
cursor.style.top = e.clientY + "px";

});