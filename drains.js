// --- MEDIA LIST ---
const gallery = [
  "before2.MOV",
"after2.jpg",
  "drain_work2.MOV",
  "drain_work3.jpg"
];

let index = 0;

// DOM
const mediaDisplay = document.getElementById("mediaDisplay");
const playBtn = document.getElementById("playBtn");

function loadMedia() {
  const file = gallery[index];
  mediaDisplay.innerHTML = "";

  if (file.toLowerCase().endsWith(".mov") || file.toLowerCase().endsWith(".mp4")) {
    const video = document.createElement("video");
    video.src = file;
    video.id = "galleryVideo";
    video.controls = false;
    video.preload = "auto";
    mediaDisplay.appendChild(video);

    playBtn.classList.remove("hidden");

    video.onended = () => {
      playBtn.textContent = "▶ Replay";
      playBtn.classList.remove("hidden");
    };
  } else {
    const img = document.createElement("img");
    img.src = file;
    mediaDisplay.appendChild(img);
    playBtn.classList.add("hidden");
  }
}

loadMedia();

// NAV
document.querySelector(".right-btn").onclick = () => {
  index = (index + 1) % gallery.length;
  playBtn.textContent = "▶ Play";
  loadMedia();
};

document.querySelector(".left-btn").onclick = () => {
  index = (index - 1 + gallery.length) % gallery.length;
  playBtn.textContent = "▶ Play";
  loadMedia();
};

// PLAY
playBtn.onclick = () => {
  const video = document.getElementById("galleryVideo");
  if (!video) return;
  video.play();
  playBtn.classList.add("hidden");
};

// SWIPE
let startX = 0;

mediaDisplay.addEventListener("touchstart", e => {
  startX = e.changedTouches[0].clientX;
});

mediaDisplay.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;

  if (endX - startX > 50) {
    document.querySelector(".left-btn").click();
  } else if (startX - endX > 50) {
    document.querySelector(".right-btn").click();
  }
});
