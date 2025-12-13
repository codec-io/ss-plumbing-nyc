let mode = 0; // 0 = before, 1 = after, 2 = slider

const beforeImg = "before1.jpg";
const afterImg = "after1.jpg";

const mainImage = document.getElementById("mainImage");
const sliderWrapper = document.getElementById("sliderWrapper");

const beforeTag = document.getElementById("beforeTag");
const afterTag = document.getElementById("afterTag");

// BUTTONS
document.querySelector(".left-btn").addEventListener("click", () => {
  mode = (mode - 1 + 3) % 3;
  updateView();
});

document.querySelector(".right-btn").addEventListener("click", () => {
  mode = (mode + 1) % 3;
  updateView();
});

// UPDATE SCREEN
function updateView() {
  if (mode === 0) {
    // BEFORE
    mainImage.src = beforeImg;
    mainImage.classList.remove("hidden");
    sliderWrapper.classList.add("hidden");

    beforeTag.style.display = "block";
    afterTag.style.display = "none";
  }

  else if (mode === 1) {
    // AFTER
    mainImage.src = afterImg;
    mainImage.classList.remove("hidden");
    sliderWrapper.classList.add("hidden");

    beforeTag.style.display = "none";
    afterTag.style.display = "block";
  }

  else {
    // SLIDER
    mainImage.classList.add("hidden");
    sliderWrapper.classList.remove("hidden");

    beforeTag.style.display = "block";
    afterTag.style.display = "block";
  }
}

updateView();

