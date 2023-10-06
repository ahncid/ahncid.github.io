document.addEventListener("DOMContentLoaded", function () {
  const outputContainer = document.querySelector("#likedDogsOutput");

  document
    .querySelector(".view-toggle1")
    .addEventListener("click", function () {
      outputContainer.style.flexDirection = "row";
      outputContainer.style.flexWrap = "wrap";

      const images = outputContainer.querySelectorAll("img");
      images.forEach((img) => {
        img.style.width = "150px";
        img.style.height = "150px";
      });
    });
  document
    .querySelector(".view-toggle2")
    .addEventListener("click", function () {
      outputContainer.style.flexDirection = "column";

      const images = outputContainer.querySelectorAll("img");
      images.forEach((img) => {
        img.style.width = "350px";
        img.style.height = "480px";
      });
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const outputContainer = document.querySelector("#skippedDogsOutput");

  document
    .querySelector(".view-toggle1")
    .addEventListener("click", function () {
      outputContainer.style.flexDirection = "row";
      outputContainer.style.flexWrap = "wrap";

      const images = outputContainer.querySelectorAll("img");
      images.forEach((img) => {
        img.style.width = "150px";
        img.style.height = "150px";
      });
    });
  document
    .querySelector(".view-toggle2")
    .addEventListener("click", function () {
      outputContainer.style.flexDirection = "column";

      const images = outputContainer.querySelectorAll("img");
      images.forEach((img) => {
        img.style.width = "350px";
        img.style.height = "480px";
      });
    });
});
