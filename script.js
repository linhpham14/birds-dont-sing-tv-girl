// ============================================================================
// AUDIO CONTROL SYSTEM
// ============================================================================

const audio = document.getElementById("bg-music");
const musicButton = document.getElementById("music-button");
const musicIcon = document.getElementById("dont-music");


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

if (musicIcon) {
    musicIcon.addEventListener("click", toggleAudio);
}

window.playAudio = playAudio;
window.pauseAudio = pauseAudio;

// ============================================================================
// SCROLL TEXT ANIMATION
// ============================================================================
gsap.registerPlugin(ScrollTrigger);

// Select all elements with class="scroll-line"
const lines = document.querySelectorAll('.scroll-line');
const textScrollTrigger = {
        start: "top 79%",
        end: "top 69%",
        scrub: true,
        invalidateOnRefresh: false,
};

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
        ...textScrollTrigger,
        // markers: true,        // Uncomment this to see the start/end lines while debugging!
      }
    }
  );
});

window.addEventListener("load", () => {
        ScrollTrigger.refresh();
});
// ============================================================================
// BIRD HOVERING CHANGING TEXTS
// ============================================================================
const leftBird = document.getElementById("she-said-anim-gb");
const rightBird = document.getElementById("she-said-anim-rb");
const textContainer = document.getElementById("text-after-she-said"); // Fixed Typo

// Store the original HTML so we can restore it later
const originalContent = textContainer.innerHTML;

const blahContent = `
    <span class="blah-text">"blah blah blah blah blah blah blah blah<br><br>
    blah blah<br>
    blah blah blah blah blah blah blah blah<br>
    blah<br><br>
    blah blah blah blah blah blah blah blah<br>
    blah blah blah blah blah blah<br><br>
    blah blah blah blah blah blah blah blah<br>
    blah blah blah"</span>
`;

let fontTimeline;

// LEFT BIRD: Font Switching & Uppercase
leftBird.addEventListener("mouseenter", () => {
    gsap.set(textContainer, { textTransform: "uppercase" });

    // Create a flickering font effect
    fontTimeline = gsap.timeline({ repeat: -1 });
    fontTimeline
        .set(textContainer, { fontFamily: "'Rock Salt', cursive" }, 0.15)
        .set(textContainer, { fontFamily: "'Indie Flower', cursive" }, 0.3);
});

leftBird.addEventListener("mouseleave", () => {
    if (fontTimeline) fontTimeline.kill(); 
    gsap.set(textContainer, { 
        textTransform: "none", 
        fontFamily: "'Indie Flower', cursive" 
    });
});

// RIGHT BIRD: Blah Blah replacement
rightBird.addEventListener("mouseenter", () => {
    textContainer.innerHTML = blahContent;
    gsap.fromTo(".blah", { opacity: 0 }, { opacity: 1, duration: 0.3 });
});

rightBird.addEventListener("mouseleave", () => {
    textContainer.innerHTML = originalContent;
    
    // IMPORTANT: Because we replaced the HTML, we must tell GSAP 
    // to re-animate the new ".scroll-line" elements.
    const newLines = textContainer.querySelectorAll('.scroll-line');
    newLines.forEach((line) => {
        gsap.fromTo(line, 
            { opacity: 0, y: 50 }, 
            {
                opacity: 1, y: 0,
                scrollTrigger: {
                    trigger: line,
                    start: "top 85%",
                    end: "top 70%",
                    scrub: true,
                }
            }
        );
    });
});


// ============================================================================
// PHONE CLICK - GOODBYE 
// ============================================================================

const phone = document.getElementById("phone");

function spawnGoodbyeFromPhone() {
    if (!phone) return;

    const rect = phone.getBoundingClientRect();
    const word = document.createElement("span");
    word.className = "goodbye-fly";
    word.textContent = "Goodbye";
    word.style.left = `${rect.left + rect.width / 2}px`;
    word.style.top = `${rect.top + rect.height / 2}px`;
    document.body.appendChild(word);

    const xDrift = gsap.utils.random(-180, 180);
    const yDrift = gsap.utils.random(-260, -120);

    gsap.fromTo(
        word,{ 
            opacity: 1,
            scale: 0.8, 
            rotate: gsap.utils.random(-12, 12) },
            {
            x: xDrift,
            y: yDrift,
            opacity: 0,
            scale: gsap.utils.random(1.2, 2),
            rotate: gsap.utils.random(-35, 35),
            duration: 1.1,
            ease: "power2.out",
            onComplete: () => word.remove(),}
    );
}

if (phone) {
    phone.style.cursor = "pointer";
    phone.addEventListener("click", spawnGoodbyeFromPhone);
}

// ============================================================================
// WINDOW BIRD FALL 
// ============================================================================

//const dùng để đặt tên đại diện cho ptu trong HTML để dễ dàng thao tác với JavaScript.
//--WINDOW_BIRD_FALL animation---
const windowBirdFall = document.getElementById("window-bird-fall");
const nothingToDiscuss = document.getElementById("nothing-to-discuss");
const smallWindowLeft = document.getElementById("small-window-left");

if (windowBirdFall && nothingToDiscuss) {//Check: Are both the Bird and the Text on the page? If yes, start.
    const syncWindowStartY = () => {
        if (!smallWindowLeft) return; // If left window is missing, give up.

        // Align initial vertical position with small-window-left before scroll-triggered zoom starts.
        const sourceRect = smallWindowLeft.getBoundingClientRect(); // Measure position of left window.
        const targetRect = windowBirdFall.getBoundingClientRect();
        gsap.set(windowBirdFall, { y: sourceRect.top - targetRect.top });// Snap the to same height as left window.
    };

    syncWindowStartY();
    window.addEventListener("resize", syncWindowStartY);

    gsap.to(windowBirdFall, {
        scale: 1.7,
        x: () => {//Left/Right: MATH to pull the Bird to the exact horizontal center
            const rect = windowBirdFall.getBoundingClientRect();
            return window.innerWidth / 2 - (rect.left + rect.width / 2);
        },
        y: () => {//Up/Down: MATH to pull the Bird higher, closer to "they just fall from the sky" text
            const rect = windowBirdFall.getBoundingClientRect();
            return window.innerHeight * 0.51 - (rect.top + rect.height / 2);
        },
        ease: "none",
        transformOrigin: "center center",//Grow from the middle of the picture (not the corner).
        scrollTrigger: {
            trigger: nothingToDiscuss,
            //nothingToDiscuss is the VARIABLE 
            // Because (const nothingToDiscuss = ...) found "Bob" and are holding him by the hand.
            //so it's like handing the actual person directly to GSAP.
            start: "top 50%",
            end: "bottom 10%",
            scrub: true,
            invalidateOnRefresh: true,
            //markers: true,
        },
    });
}

// ============================================================================
// WALK OUT ANIMATION
// ============================================================================

gsap.to("#gbird-walk-out", {
    y: -200,           // Move up into the door
    scale: 0.1,        // Shrink into the distance
    opacity: 0.2,        // Fade away as it leaves
    ease: "power1.in",
    scrollTrigger: {
        trigger: "#if-walk-out", // Use the whole scene as the trigger
        start: "top 40%",           // Animation starts when scene is near middle
        end: "bottom 20%",          // Ends near the bottom
        scrub: 1,                   // Smoothly tied to scroll
    }
});

// ============================================================================
// DONT MUSIC & DONT BED
// ============================================================================

// SHOW ICON AFTER SHELF SCENE
gsap.to("#dont-music", {
    opacity: 1,
    pointerEvents: "auto",
    scrollTrigger: {
        trigger: "#shelf-scene",
        start: "bottom center", // Appears ưhen scroll past the shelf
        toggleActions: "play none none reverse", // Fades out ì scroll back up
    }
});

// THE ZOOM-IN & BED ANIMATION
const musicTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: "#many-dont-scene",
        start: "top top",      
        end: "+=250%",         
        pin: true,             
        scrub: 1,              
    }
});

musicTimeline
    // ZOOM TO CENTER
    .to("#dont-music", { 
        left: "50%", 
        bottom: "50%", 
        xPercent: -50, 
        yPercent: 50, // Move to center screen
        width: "70vw", // Scale up
        duration: 1,
        ease: "power2.inOut"
    })
    
    // PAUSE IN CENTER
    .to({}, { duration: 0.5 }) 

    // GO BACK TO CORNER
    .to("#dont-music", { 
        left: "3%", 
        bottom: "5%", 
        xPercent: 0, 
        yPercent: 0, 
        width: "8%", 
        opacity: 1, 
        duration: 1,
        ease: "power2.inOut"
    })
    .from("#dont-bed", { 
        y: "100vh", 
        scale: 0.2, 
        duration: 1 
    }, "<"); // Bed moves up exactly as music moves back to corner              

// ============================================================================
// BLANKET SQUISH
// ============================================================================
const blanket = document.getElementById("blanket");
const bedText = document.getElementById("dont-bed-text");
let isSquished = false; 

if (blanket) {
    blanket.addEventListener("click", () => {
        if (!isSquished) {
            // SQUISH DOWN
            gsap.to(blanket, {
                scaleY: 0.15,
                duration: 1,
            });
            
            gsap.to(bedText, {
                opacity: 0,
                duration: 0.5,
                pointerEvents: "none"
            });
            isSquished = true;
        } else {
            // RETURN TO NORMAL
            gsap.to(blanket, {
                scaleY: 1,
                duration: 1,
                ease: "back.out(1.7)"
            });
            
            gsap.to(bedText, {
                opacity: 1,
                duration: 0.8,
                pointerEvents: "auto"
            });
            isSquished = false;
        }
    });
}

// ============================================================================
// POLAS SCENE ANIMATION - FLIP & STACKING
// ============================================================================

const polasScene = document.querySelector("#polas-scene"); // xac dinh the container for the polas animation    
const [pola1, pola2, pola3] = gsap.utils.toArray(["#pola1", "#pola2", "#pola3"]); //select specific elements for the polas animation

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

// ============================================================================
// RBHEAD ROLLING ANIMATION
// ============================================================================
const rbHead = document.getElementById("rbhead");
const endScene = document.getElementById("end-scene");
const theEndBtn = document.getElementById("the-end");

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#end-scene",
        start: "top 40%",
        end: "bottom top",
        scrub: 1, // Follows the scrollbar
        invalidateOnRefresh: true,
    }
});

// --- o-o1
tl.to("#rbhead", { left: "12%", top: "10%", rotation: 90 })  // Peak of jump
  .to("#rbhead", { left: "20%", top: "25%", rotation: 180 }) // Landing

// --- o-o3
tl.to("#rbhead", { left: "35%", top: "35%", rotation: 270 })  // Peak
  .to("#rbhead", { left: "50%", top: "50%", rotation: 360, xPercent: -50 }) // Landing

// --- o-o4
tl.to("#rbhead", { left: "57%", top: "60%", rotation: 450, xPercent: 0 }) // Peak
  .to("#rbhead", { left: "65%", top: "75%", rotation: 540 }) // Landing

// --- o-o5
tl.to("#rbhead", { left: "75%", top: "80%", rotation: 630 })  // Peak
  .to("#rbhead", { left: "85%", top: "90%", rotation: 720 }) // Landing

// --- o-o6
tl.to("#rbhead", { left: "78%", top: "95%", rotation: 630 })  // Peak
  .to("#rbhead", { left: "85%", top: "100%", rotation: 720 }) // Landing

// --- 0-o7
tl.to("#rbhead", { left: "57%", top: "105%", rotation: 810 })  // Peak
  .to("#rbhead", { left: "85%", top: "110%", rotation: 900 }) // Landing

// --- o-o8
tl.to("#rbhead", { left: "35%", top: "115%", rotation: 990, xPercent: 0 }) // Peak
  .to("#rbhead", { left: "85%", top: "120%", rotation: 1080, xPercent: -50 }) // Landing

// --- 0-09
tl.to("#rbhead", { left: "20%", top: "125%", rotation: 1170 })  // Peak
  .to("#rbhead", { left: "85%", top: "130%", rotation: 1260 }) // Landing



// --- FINAL FALL ---
tl.to("#rbhead", { 
    left: () => {
        if (!rbHead || !endScene || !theEndBtn) return "85%";

        const sceneRect = endScene.getBoundingClientRect();
        const endRect = theEndBtn.getBoundingClientRect();
        const headRect = rbHead.getBoundingClientRect();

        const desiredLeft = (endRect.left - sceneRect.left) + (endRect.width * 0.5) - (headRect.width * 0.5);
        const maxLeft = Math.max(0, sceneRect.width - headRect.width);
        const clampedLeft = gsap.utils.clamp(0, maxLeft, desiredLeft);
        return `${clampedLeft}px`;
    },
    top: () => {
        if (!rbHead || !endScene || !theEndBtn) return "130%";

        const sceneRect = endScene.getBoundingClientRect();
        const endRect = theEndBtn.getBoundingClientRect();
        const headRect = rbHead.getBoundingClientRect();

        // Keep rbhead resting above "The End" and never below it.
        const ceilingY = (endRect.top - sceneRect.top) - (headRect.height * 0.88);
        return `${Math.max(0, ceilingY)}px`;
    },
    x: 0,
    y: 0,
    xPercent: 0,
    rotation: 1440, //spins
    ease: "none",
});


// ============================================================================
// Text ScrollTrigger for TEXTS FROM "CAUSE..."
// ============================================================================
const causeLines = document.querySelectorAll('.scroll-line');
const causeTextScrollTrigger = {
        start: "top 79%",
        end: "top 69%",
        scrub: true,
        invalidateOnRefresh: true,
};

causeLines.forEach((line) => {
  gsap.fromTo(line, 
    { 
      opacity: 0, 
      y: 100 
    }, 
    {
      opacity: 1, 
      y: 0, 
      duration: 1,
      scrollTrigger: {
        trigger: line,           
        ...causeTextScrollTrigger, // Use the same scroll trigger settings for consistency
      }
    }
  );
});

window.addEventListener("load", () => {
        ScrollTrigger.refresh();
});
// ============================================================================
// RB & GB GUIDES
// ============================================================================
gsap.to(["#gb-guide", "#gb-guide-text"], {
    // Stop the guide before reaching pola1, keeping about a 5% viewport gap.
    y: () => {
        const guide = document.querySelector("#gb-guide");
        const target = document.querySelector("#pola1");
        if (!guide || !target) return 0;

        const guideRect = guide.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const gap = window.innerHeight * 0.05;
        const travel = (targetRect.top - guideRect.bottom) - gap;

        return Math.max(0, travel);
    },
    ease: "none",
    scrollTrigger: {
        trigger: "#gb-guide", // Start when the guide itself enters the viewport
        start: "top center", 
        endTrigger: "#polas-scene",
        end: "top center",
        scrub: true, // Link movement to scroll speed
        marker: true,
    }
});

// ============================================================================
// END SCENE
// ============================================================================
const deadGb = document.getElementById("dead-gb");
const yesText = document.getElementById("yes-reveal");

if (deadGb && yesText) {
    deadGb.style.cursor = "pointer";
    deadGb.addEventListener("click", () => {
        gsap.to(yesText, { opacity: 1, duration: 0.2, pointerEvents: "auto" });
        setTimeout(() => {
            gsap.to(yesText, { opacity: 0, duration: 0.5, ease: "power2.out", pointerEvents: "none" });
        }, 1000);
    });
}

if (theEndBtn) {
    theEndBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
//ENSURING SCROLL ANIMATIONS R STILL CORRECT AFTER RESTART
window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});