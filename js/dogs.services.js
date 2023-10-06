import service from "./data.service.js";
import { dogListTmpl } from "./templates.js";
import { storage } from "./local.storage.js";

let currentIndex = 0;

const dogsList = {};

dogsList.init = async () => {
  const apiOutput = document.querySelector(".output");
  const currentPage = getCurrentPage();

  const [dogsDataApi, dogsDataJson] = await Promise.all([
    service.getDogs(),
    service.getDogInfo(),
  ]);

  const mergedDogsData = dogsDataApi.map((apiDog, index) => {
    return { ...apiDog, ...dogsDataJson[index] };
  });

  if (currentPage === "app.html") {
    showDog(mergedDogsData, 0);
    if (apiOutput) {
      apiOutput.addEventListener("click", function (e) {
        const imageElement = document.querySelector(".image-container img");

        if (e.target && e.target.id === "dislikeBtn") {
          animateImageAndButton(imageElement, e.target);
          setTimeout(() => {
            dogsList.showNextDog(mergedDogsData);
          }, 500);
        }

        if (e.target && e.target.id === "skipBtn") {
          console.log("Skip button clicked!");
          storage.addDogToList(mergedDogsData[currentIndex], "skippedDogs");
          animateImageAndButton(imageElement, e.target);
          setTimeout(() => {
            dogsList.showNextDog(mergedDogsData);
            currentIndex++;
          }, 500);
        }

        if (e.target && e.target.id === "likeBtn") {
          console.log("Like button clicked!");
          storage.addDogToList(mergedDogsData[currentIndex], "likedDogs");
          animateImageAndButton(imageElement, e.target);

          const notification = document.getElementById("matchNotification");
          notification.classList.add("showNotification");
          notification.classList.remove("hidden");

          setTimeout(() => {
            notification.classList.remove("showNotification");
            notification.classList.add("hidden");

            setTimeout(() => {
              dogsList.showNextDog(mergedDogsData);
              currentIndex++;
            }, 100);
          }, 1500);
        }
      });
    }
  } else {
    mergedDogsData.forEach((dogData) => {
      apiOutput.insertAdjacentHTML("beforeend", dogListTmpl(dogData));
    });
  }

  return mergedDogsData;
};

const showDog = (dogsData, index) => {
  const apiOutput = document.querySelector(".output");
  if (dogsData && apiOutput) {
    apiOutput.innerHTML = dogListTmpl(dogsData[index]);
  }
};

dogsList.showNextDog = (dogsData) => {
  currentIndex = (currentIndex + 1) % dogsData.length;
  showDog(dogsData, currentIndex);
};

const getCurrentPage = () => {
  const path = window.location.pathname;
  const currentPage = path.substring(path.lastIndexOf("/") + 1);
  return currentPage;
};

const animateImageAndButton = (imageElement, buttonElement) => {
  if (imageElement && buttonElement) {
    imageElement.classList.add("animate-image");
    buttonElement.classList.add("animate-button");

    setTimeout(() => {
      imageElement.classList.remove("animate-image");
      buttonElement.classList.remove("animate-button");
    }, 500);
  }
};

export default dogsList;
