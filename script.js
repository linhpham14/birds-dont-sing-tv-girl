const audio = document.getElementById("bg-music");
const musicButton = document.getElementById("music-button");


async function playAudio() {
    if (!audio) return;
    return audio.play();
}

function pauseAudio() {
    if (!audio) return;
    audio.pause();
}

async function toggleAudio() {
    if (!audio) return;

    if (audio.paused) {
        try {
            await playAudio();
        } catch (error) {
            console.error("Audio could not start:", error);
        }
    } else {
        pauseAudio();
    }
}

if (musicButton) {
    // Prevent drag behavior from stealing clicks on image buttons.
    musicButton.draggable = false;

    musicButton.addEventListener("click", toggleAudio);
    musicButton.addEventListener("touchend", (event) => {
        event.preventDefault();
        toggleAudio();
    }, { passive: false });

    musicButton.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleAudio();
        }
    });
}

window.playAudio = playAudio;
window.pauseAudio = pauseAudio;




// Lenis smooth scrolling https://github.com/darkroomengineering/lenis
        // Initialize Lenis 
       // const lenis = new Lenis({
       // autoRaf: true,
       // });

        // Listen for the scroll event and log the event data
       // lenis.on('scroll', (e) => {
       // console.log(e);
       // });


// SCrollTrigger plugin from GSAP
gsap.registerPlugin(ScrollTrigger);

// Select all elements with class="scroll-line"
const lines = document.querySelectorAll('.scroll-line');

// Animation, each line fade up as it enters viewport
lines.forEach((line) => {
  gsap.fromTo(line, 
    { 
      opacity: 0, 
      y: 20 // Starts 20px lower
    }, 
    {
      opacity: 1, 
      y: 0, // Moves to original position
      duration: 1,
      scrollTrigger: {
        trigger: line,           // The animation starts when this specific line is visible
        start: "top 85%",        // Start when the top of the line hits 85% of viewport height
        end: "top 60%",          // End when it hits 60%
        scrub: true,             // Makes the animation "tethered" to the scroll bar
        // markers: true,        // Uncomment this to see the start/end lines while debugging!
      }
    }
  );
});

    gsap.to("#window-bird-fall", {
        scale: 2,
        ease: "power1.inOut",
        transformOrigin: "to left",
        scrollTrigger: {
            trigger: "#if-walk-out",
            start: "top 85%",
            end: "bottom 15%",
            scrub: true,
            markers: true,
        },
    });
