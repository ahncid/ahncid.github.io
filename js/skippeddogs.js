import { storage } from "./local.storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const skippedDogsOutput = document.getElementById("skippedDogsOutput");
  const searchInput = document.getElementById("searchInput");
  let skippedDogs = storage.getDogs("skippedDogs");

  function displayDogs(dogs) {
    skippedDogsOutput.innerHTML = "";
    dogs.forEach((dog) => {
      const dogElement = document.createElement("div");
      dogElement.classList.add("dog-container");
      dogElement.innerHTML = `
        <h2>${dog.name}, ${dog.age} years</h2>
        <img src="${dog.imageUrl}" alt="${dog.name}">
        <button class="removeDogBtn" data-dog-id="${dog.id}">Remove</button>
        <p class="dog-interests">${dog.interests
          .map((interest) => `<span class="interest">${interest}</span>`)
          .join(" ")}</p>

        <p class="dog-description">${dog.description}</p> 
      `;

      const removeButton = dogElement.querySelector(".removeDogBtn");
      removeButton.addEventListener("click", () => {
        removeDogFromSkipped(dog.id);
        dogElement.remove();
      });

      skippedDogsOutput.appendChild(dogElement);
    });
  }

  function removeDogFromSkipped(dogId) {
    skippedDogs = skippedDogs.filter((dog) => dog.id !== dogId);
    storage.clearList("skippedDogs");
    skippedDogs.forEach((dog) => storage.addDogToList(dog, "skippedDogs"));
    updateDisplayBasedOnSearch(); // Opdater visningen, når en hund fjernes
  }

  function updateDisplayBasedOnSearch() {
    const query = searchInput.value.toLowerCase();
    const filteredDogs = skippedDogs.filter((dog) => {
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

  displayDogs(skippedDogs);
});
