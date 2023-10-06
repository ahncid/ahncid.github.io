import { storage } from "./local.storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const likedDogsOutput = document.getElementById("likedDogsOutput");
  const searchInput = document.getElementById("searchInput");
  let likedDogs = storage.getDogs("likedDogs");

  function displayDogs(dogs) {
    likedDogsOutput.innerHTML = "";
    dogs.forEach((dog) => {
      const dogElement = document.createElement("div");
      dogElement.classList.add("dog-container");
      dogElement.innerHTML = `
        <h2>${dog.name}, ${dog.age} years</h2>
        <img src="${dog.imageUrl}" alt="${dog.name}">
        <button class="removeDogBtn" data-dog-id="${dog.id}">Remove</button>
        <div class="container-interests"><p class="dog-interests">${dog.interests}</p></div>
        <p class="dog-description">${dog.description}</p> 
      `;

      const removeButton = dogElement.querySelector(".removeDogBtn");
      removeButton.addEventListener("click", () => {
        removeDogFromLiked(dog.id);
        dogElement.remove();
      });

      likedDogsOutput.appendChild(dogElement);
    });
  }

  function removeDogFromLiked(dogId) {
    likedDogs = likedDogs.filter((dog) => dog.id !== dogId);
    storage.clearList("likedDogs");
    likedDogs.forEach((dog) => storage.addDogToList(dog, "likedDogs"));
    updateDisplayBasedOnSearch();
  }

  function updateDisplayBasedOnSearch() {
    const query = searchInput.value.toLowerCase();
    const filteredDogs = likedDogs.filter((dog) => {
      const matchesName = dog.name.toLowerCase().includes(query);

      const matchesInterest =
        Array.isArray(dog.interests) &&
        dog.interests.some((interest) =>
          interest.toLowerCase().includes(query)
        );

      const matchesAge = dog.age.toString().includes(query);

      return matchesName || matchesInterest || matchesAge;
    });
    displayDogs(filteredDogs);
  }

  searchInput.addEventListener("input", updateDisplayBasedOnSearch);

  displayDogs(likedDogs);
});
