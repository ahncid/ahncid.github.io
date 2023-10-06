const service = {};

service.getDogs = async () => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random/50");
    const dogs = await response.json();

    if (dogs.message && Array.isArray(dogs.message)) {
      const imageObjects = dogs.message.map((imageUrl) => ({ imageUrl }));

      localStorage.setItem("dogImages", JSON.stringify(imageObjects));

      return imageObjects;
    }
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
  return [];
};

service.getDogInfo = async () => {
  try {
    const response = await fetch("./data/images.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching local JSON data:", error);
  }
  return [];
};

export default service;
