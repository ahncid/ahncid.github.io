export const storage = {
  getDogs: (listName) => {
    return JSON.parse(localStorage.getItem(listName)) || [];
  },

  addDogToList: (dog, listName) => {
    let dogsList = JSON.parse(localStorage.getItem(listName)) || [];
    dogsList.push(dog);
    localStorage.setItem(listName, JSON.stringify(dogsList));
  },

  clearList: (listName) => {
    localStorage.setItem(listName, JSON.stringify([]));
  },
};

export const saveSkippedDog = (dog) => {
  storage.addDogToList(dog, "skippedDogs");
};

export const saveMatchedDog = (dog) => {
  storage.addDogToList(dog, "matchedDogs");
};
