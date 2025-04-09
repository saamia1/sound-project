
function myFunction() {
  const nav = document.getElementById("myTopnav");
  nav.classList.toggle("responsive");
}

// this is for the creation of the fog effect
let canvas = document.getElementById("canvas");
class Fog {
    constructor(x, y, tamanho, direction, velocity) {
        this.x = x;
        this.y = y;
        this.width = tamanho.w;
        this.height = tamanho.h;
        this.me = document.createElement("div");
        this.direction = direction;
        this.velocity = velocity;
    }
    create() {
        this.me.style.width = this.width + "px";
        this.me.style.height = this.height + "px";
        this.me.style.backgroundColor = "rgba(180, 180, 180, 0.35)"; // more solid gray fog
        this.me.style.position = "absolute";
        this.me.style.zIndex = Math.random() > 0.5 ? "4" : "6"; // behind or in front of text
        this.me.style.opacity = 0.85; // stronger!
        this.me.style.filter = "blur(25px)"; // tighter fog — more visible
        this.me.style.borderRadius = "50%";
        canvas.appendChild(this.me);
    }      
    animation() { // in this function, the fog moves by shifting the left and top properties
        this.me.style.left = this.x + "px";
        this.me.style.top = this.y + "px";
        switch (this.direction) {
            case 0: // left
                this.x -= this.velocity;
                if (this.x + this.width < 0) {
                    this.x = canvas.clientWidth + this.width;
                }
                break;
            case 1: // up
                this.x += this.velocity;
                if (this.x + this.width > canvas.width) {
                    this.me.style.left = -this.width + "px";
                }
                break;
        }
    }
}
const fogCount = 20;
const array = [];

for (let i = 0; i < fogCount; i++) { // create 20 fogs
  const size = {
    w: Math.floor(Math.random() * 150 + 80),
    h: Math.floor(Math.random() * 150 + 80)
  };

  const x = Math.floor(Math.random() * window.innerWidth);
  const y = Math.floor(Math.random() * window.innerHeight);
  const velocity = Math.random() * 1.8 + 1.2;

  array.push(new Fog(x, y, size, 0, velocity));
}

function CreateNeb() { // this function creates the fog by calling the create and animation functions
  array.forEach((ele) => {
    ele.create();
    ele.animation();
  });
  requestAnimationFrame(CreateNeb);
}

CreateNeb();

// this is for the quiz functionality 
const audio = document.getElementById("story-audio");
const popup = document.getElementById("quiz-popup");
const feedback = document.getElementById("quiz-feedback");

let userAnswer = null;
let quizAsked = false;
let feedbackShown = false;

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;

  // Flicker effect just before quiz
  if (Math.floor(currentTime) === 95) {
    audio.classList.add('flicker');
  }

  // Pause and show quiz at 1:36
  if (!quizAsked && currentTime >= 96) {
    quizAsked = true;
    audio.pause();
    popup.classList.remove("hidden");
    audio.classList.remove('flicker');
  }

  // Show result at end
  if (!feedbackShown && currentTime >= 119) {
    feedbackShown = true;

    let message = "Let's see... ";

    if (userAnswer === "cat") {
      message += "You were right! 🐈 It was the cat all along.";
    } else {
      message += "Wrong guess. It was the cat! 🐈";
    }

    feedback.textContent = message;
    feedback.classList.remove("hidden");

    // ⏱ Auto-hide result after 7 seconds
    setTimeout(() => {
      feedback.classList.add("hidden");
      // Allow replay from beginning if user wants
      quizAsked = false;
      feedbackShown = false;
      userAnswer = null;
    }, 7000);
  }
});

function selectAnswer(answer) {
  userAnswer = answer;
  popup.classList.add("hidden");

  feedback.textContent = "Let's find out...";
  feedback.classList.remove("hidden");

  setTimeout(() => {
    feedback.classList.add("hidden");
    audio.play();
  }, 2000);
}
