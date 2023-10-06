let currentIndex = 0;
let images = [];

export const setImages = (newImages) => {
  images = newImages;

  scrollImages();
};

export const initializeSlideShow = () => {
  showImages();
};

const showImages = () => {
  const imageContainer = document.getElementById("image-container");
  const imagesHTML = images.map((img) => dogListTmpl(img.imageUrl)).join("");
  imageContainer.innerHTML = imagesHTML;
};

const setEventListeners = () => {
  const leftArrow = document.querySelector(".fa-arrow-left");
  const rightArrow = document.querySelector(".fa-arrow-right");

  if (!leftArrow || !rightArrow) {
    console.error("Arrows not found! Cannot set event listeners.");
    return;
  }

  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    scrollImages();
  });

  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    scrollImages();
  });
};

const scrollImages = () => {
  const imageContainer = document.getElementById("image-container");

  imageContainer.scroll({
    left: currentIndex * imageContainer.querySelector("img").offsetWidth,
    behavior: "smooth",
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setEventListeners();
});
