document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("removeAll").addEventListener("click", function () {
    const path = window.location.pathname;
    const currentPage = path.substring(path.lastIndexOf("/") + 1);

    if (confirm("Are you sure you want to remove all dogs?")) {
      if (currentPage === "skips.html") {
        localStorage.removeItem("skippedDogs");
        document.querySelector(".output").innerHTML = "";
      } else if (currentPage === "matches.html") {
        localStorage.removeItem("likedDogs");
        document.querySelector(".output").innerHTML = "";
      }
    }
  });

  document.querySelector(".output").addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("removeDogBtn")) {
      const dogElement = e.target.closest(".dog");
      const dogId = dogElement.getAttribute("data-dog-id");

      removeDogFromView(dogId);
      removeDogFromStorage(dogId, currentPage);
    }
  });
});

const removeDogFromView = (dogId) => {
  const dogElement = document.querySelector(`.dog[data-dog-id="${dogId}"]`);
  if (dogElement) dogElement.remove();
};

const removeDogFromStorage = (dogId, currentPage) => {
  const listName = currentPage === "skips.html" ? "skippedDogs" : "likedDogs";
  let dogsList = JSON.parse(localStorage.getItem(listName)) || [];
  dogsList = dogsList.filter((dog) => dog.id !== dogId);
  localStorage.setItem(listName, JSON.stringify(dogsList));
};
