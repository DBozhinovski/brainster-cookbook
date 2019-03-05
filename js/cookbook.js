let cardContainer = document.querySelector('#card-container');
let fullRecipeContainer = document.querySelector('#full-recipe-container');
let searchContainer = document.querySelector('#search-container');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createCard(cardData) {
  let card = document.createElement('div');
  let cimage = document.createElement('div');
  let title = document.createElement('h5');
  let contents = document.createElement('div');
  let actions = document.createElement('div');

  card.classList.add('card');

  cimage.classList.add('card-image');
  let img = document.createElement('img');
  img.src = './images/' + getRandomInt(1, 29) + '.jpg';
  cimage.appendChild(img);

  title.innerText = cardData.name;

  contents.classList.add('card-content');
  contents.appendChild(title);
  
  cardData.tags.forEach((tag) => {
    let tagLink = document.createElement('a');
    tagLink.innerText = '#' + tag;
    contents.appendChild(tagLink);
  });

  actions.classList.add('card-action');
  let link = document.createElement('a');
  link.innerText = "Open Recipe";
  link.classList.add('waves-effect', 'waves-light', 'btn', 'orange');
  link.href = '#' + cardData.id;
  actions.appendChild(link);

  card.appendChild(cimage);
  card.appendChild(contents);
  card.appendChild(actions);

  // Exercise 6 - make the tags clickable
  // !!

  return card;
};

function renderRecipe() {
  let id = location.hash.replace('#', '');
  let recipe = recipeData.find(r => r.id === id);
  fullRecipeContainer.innerHTML = '';
  
  let wrapper = document.createElement('div');
  let card = document.createElement('div');
  let cimage = document.createElement('div');
  let title = document.createElement('h3');
  let contents = document.createElement('div');

  wrapper.classList.add('full-recipe-wrapper');

  title.innerText = recipe.name;

  cimage.classList.add('card-image');
  let img = document.createElement('img');
  img.src = './images/' + getRandomInt(1, 29) + '.jpg';
  cimage.appendChild(img);
  
  contents.classList.add('card-content');
  let p = document.createElement('p');
  p.innerText = recipe.instructions;
  let h4 = document.createElement('h4');
  h4.innerText = 'Instructions';
  contents.appendChild(h4);
  contents.appendChild(p);

  card.classList.add('card');
  card.appendChild(cimage);
  card.appendChild(contents);

  wrapper.appendChild(title);
  wrapper.appendChild(card);

  fullRecipeContainer.appendChild(wrapper);
  
  // Exercise 4 here
  // Exercise 4 - add a back "button"
  backBtn = document.createElement('a');
  backBtn.href = '#';
  backBtn.classList.add('waves-effect', 'waves-light', 'btn', 'orange');
  backBtn.text = "Back";
  // !!

  // Exercise 5 - add ingredients list
  // Exercise 5 here
  // !!

  wrapper.appendChild(backBtn);

}

// Exercise 1 - draw cards on screen using the
// createCard function.
recipeData.forEach(recipe => {
  let newCard = createCard(recipe);
  cardContainer.appendChild(newCard);
});

// Exercise 2 - create a basic router
function handleRoute(event) {
  // Prevent autoscrolling
  if (event) {
    event.preventDefault();
  }
  
  // this is the "home" route
  if (location.hash === "") {
    cardContainer.style.display = 'flex';
    fullRecipeContainer.style.display = 'none';
    searchContainer.style.display = 'none';
  } else {
    // this is the individual recipe route
    cardContainer.style.display = 'none';
    fullRecipeContainer.style.display = 'flex';
    searchContainer.style.display = 'none';
    renderRecipe();
  }
  // Exercise 7 - Add routing for tags // need tags container

  // Exercise 8 - Add a search form

  // Exercise 9 - Make the recipes searchable by the form
}

window.addEventListener('hashchange', handleRoute);
// Exercise 3 - make the same thing happen on the window load event
window.addEventListener('load', handleRoute);