// Toggles the responsive class for the navbar when the hamburger icon is clicked
function myFunction() {
  const nav = document.getElementById("myTopnav");
  nav.classList.toggle("responsive");
}

// Get the canvas container for fog effect
let canvas = document.getElementById("canvas");

// Define the Fog particle class
class Fog {
    constructor(x, y, tamanho, direction, velocity) {
        this.x = x; // starting x-position
        this.y = y; // starting y-position
        this.width = tamanho.w; // width of the fog element
        this.height = tamanho.h; // height of the fog element
        this.direction = direction; // direction of movement: 0 = left, 1 = right
        this.velocity = velocity; // speed of fog movement
        this.me = document.createElement("div"); // create fog div element
    }

    // Initialize and style the fog element
    create() {
        this.me.style.width = this.width + "px";
        this.me.style.height = this.height + "px";
        this.me.style.backgroundColor = "rgba(180, 180, 180, 0.35)"; // light gray fog
        this.me.style.position = "absolute";
        this.me.style.zIndex = Math.random() > 0.5 ? "4" : "6"; // random depth layering
        this.me.style.opacity = 0.85; // visible but not too opaque
        this.me.style.filter = "blur(25px)"; // soft blur effect
        this.me.style.borderRadius = "50%"; // circular fog shape
        canvas.appendChild(this.me); // add fog to the canvas
    }

    // Animate fog movement across screen
    animation() {
        this.me.style.left = this.x + "px";
        this.me.style.top = this.y + "px";

        switch (this.direction) {
            case 0: // move left
                this.x -= this.velocity;
                if (this.x + this.width < 0) {
                    // Reset fog to the right when it goes off screen
                    this.x = canvas.clientWidth + this.width;
                }
                break;

            case 1: // (not used but reserved) move right
                this.x += this.velocity;
                if (this.x + this.width > canvas.clientWidth) {
                    this.me.style.left = -this.width + "px";
                }
                break;
        }
    }
}

// Create an array of fog objects
const fogCount = 20; // number of fog particles
const array = [];

for (let i = 0; i < fogCount; i++) {
  const size = {
    w: Math.floor(Math.random() * 150 + 80),  // width between 80–230px
    h: Math.floor(Math.random() * 150 + 80),  // height between 80–230px
  };

  const x = Math.floor(Math.random() * window.innerWidth);  // random starting X
  const y = Math.floor(Math.random() * window.innerHeight); // random starting Y
  const velocity = Math.random() * 1.8 + 1.2; // random speed between 1.2–3.0

  array.push(new Fog(x, y, size, 0, velocity)); // all fog moves left
}

// Main animation loop to create and animate fog
function CreateNeb() {
  array.forEach((ele) => {
    ele.create();
    ele.animation();
  });
  requestAnimationFrame(CreateNeb); // repeat animation on next frame
}

CreateNeb(); // start fog animation loop


// Select HTML elements for audio and quiz UI
const audio = document.getElementById("story-audio");
const popup = document.getElementById("quiz-popup");
const feedback = document.getElementById("quiz-feedback");

// Control flags
let userAnswer = null;         // stores user's selected answer
let quizAsked = false;         // flag: has quiz been shown yet?
let feedbackShown = false;     // flag: has result been shown?

// Listen for time changes in the audio
audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;

  // ⚡ Add flicker just before quiz appears at 1:36 (96 sec)
  if (Math.floor(currentTime) === 95) {
    audio.classList.add('flicker');
  }

  // At 1:36 (96 sec), pause and ask quiz question
  if (!quizAsked && currentTime >= 96) {
    quizAsked = true;
    audio.pause(); // pause story
    popup.classList.remove("hidden"); // show quiz popup
    audio.classList.remove('flicker'); // remove flicker effect
  }

  // At 1:59 (119 sec), show feedback result
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

    // Hide feedback after 7 seconds and reset quiz state
    setTimeout(() => {
      feedback.classList.add("hidden");
      quizAsked = false;
      feedbackShown = false;
      userAnswer = null;
    }, 7000);
  }
});

// Called when user selects a quiz answer
function selectAnswer(answer) {
  userAnswer = answer;
  popup.classList.add("hidden"); // hide question

  feedback.textContent = "Let's find out...";
  feedback.classList.remove("hidden"); // suspense text

  // Show suspense for 2 seconds, then resume audio
  setTimeout(() => {
    feedback.classList.add("hidden");
    audio.play(); // resume playback
  }, 2000);
}
