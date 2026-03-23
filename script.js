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
