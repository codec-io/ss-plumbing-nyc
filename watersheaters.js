// --- MEDIA LIST (5 ITEMS) ---
const gallery = [
  "before2.MOV",
  "after2.jpg",
  "work3.jpg",
  "work4.MOV",
  "work5.jpg"
];

let index = 0;

// DOM elements
const mediaDisplay = document.getElementById("mediaDisplay");
const playBtn = document.getElementById("playBtn");

// Load media into the viewer
function loadMedia() {
  const file = gallery[index];
  mediaDisplay.innerHTML = "";

  // VIDEO FILE
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
  }

  // IMAGE FILE
  else {
    const img = document.createElement("img");
    img.src = file;
    mediaDisplay.appendChild(img);

    playBtn.classList.add("hidden");
  }
}

loadMedia();

// ARROWS
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

// PLAY BUTTON
playBtn.onclick = () => {
  const video = document.getElementById("galleryVideo");
  if (!video) return;

  video.play();
  playBtn.classList.add("hidden");
};

// --- SWIPE SUPPORT ---
let startX = 0;

mediaDisplay.addEventListener("touchstart", e => {
  startX = e.changedTouches[0].clientX;
});

mediaDisplay.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;

  if (endX - startX > 50) {
    // Swipe Right
    document.querySelector(".left-btn").click();
  } else if (startX - endX > 50) {
    // Swipe Left
    document.querySelector(".right-btn").click();
  }
});

