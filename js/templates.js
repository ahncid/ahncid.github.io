export const dogListTmpl = (dog) => `
  <div class="img-wrapper">
 <div class="name-age-wrapper"> <p class="dog-name">${dog.name},</p><p class="dog-age">${dog.age} years</p></div>
    <img class="template-img" src="${dog.imageUrl}" alt="">
    <div class="template-absolute">100% match!</div>
  <div class="interests-container">  <p class="dog-interests">${dog.interests}</p></div>
    <p class="dog-description">${dog.description}</p>
    <div class="dislike-like"><i class="fa-solid fa-x" id="dislikeBtn"></i><a class="skip" id="skipBtn">skip</a><i class="fa-solid fa-heart" id="likeBtn"></i></div>
  </div>
`;
