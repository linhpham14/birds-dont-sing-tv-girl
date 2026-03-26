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
      y: 100 // Starts 20px lower
    }, 
    {
      opacity: 1, 
      y: 0, // Moves to original position
      duration: 1,
      scrollTrigger: {
        trigger: line,           // The animation starts when this specific line is visible
        start: "top 79%%",        // Start when the top of the line hits 85% of viewport height
        end: "top 69%%",          // End when it hits 60%
        scrub: true,             // Makes the animation "tethered" to the scroll bar
        // markers: true,        // Uncomment this to see the start/end lines while debugging!
      }
    }
  );
});

    
gsap.to("gbird-walk-out", {
    scale: 0.1,
    ease: "power1.in",
    transformOrigin: "center",
    scrollTrigger: {
        trigger: "#if-you-walk-out",
        start: "top 50%",
        end: "bottom 10%",
        scrub: true,
        markers: true,
    }
});




const polasScene = document.querySelector("#polas-scene"); // xac dinh the container for the polas animation    
const [pola1, pola2, pola3] = gsap.utils.toArray(["#pola1", "#pola2", "#pola3"]); //select specific elements for the polas animation

//gsap.utlis.toArray() alf 

gsap.utils.toArray(".pola-card").forEach((card) => {
const flip = gsap.to(card, {
rotateY: 180,
duration: 0.6,
ease: "power2.out",
paused: true,
});
card.addEventListener("mouseenter", () => flip.play());
card.addEventListener("mouseleave", () => flip.reverse());
});
if (polasScene && pola1 && pola2 && pola3) {
gsap.set([pola1, pola2, pola3], { zIndex: (i) => i + 1 });
gsap.timeline({
scrollTrigger: {
trigger: pola1,
start: "center center",
end: "+=250%",
pin: polasScene,
pinSpacing: true,
anticipatePin: 1,
scrub: 1,
invalidateOnRefresh: true,
// markers: true,
},
})
.to(pola2, { y: () => pola1.offsetTop - pola2.offsetTop, ease: "none", duration: 1 })
.to(pola3, { y: () => pola1.offsetTop - pola3.offsetTop, ease: "none", duration: 1 })
.to({}, { duration: 0.8 });
}
