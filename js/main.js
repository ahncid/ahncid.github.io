import dogsList from "./dogs.services.js";
import { setImages, initializeSlideShow } from "./slide.js";

const app = {};

app.init = async () => {
  const images = await dogsList.init();
  setImages(images);
  initializeSlideShow();
};

app.init();
