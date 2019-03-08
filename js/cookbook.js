let cardContainer = document.querySelector('#card-container');
let fullRecipeContainer = document.querySelector('#full-recipe-container');
let searchContainer = document.querySelector('#search-container');
let tagContainer = document.querySelector('#tag-container');
let filtersContainer = document.querySelector('#filters');

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
    // Exercise 7 - make the tags clickable
    tagLink.addEventListener('click', function(event) {
      event.preventDefault(); // since it's a link
      // console.log(tag);
      // Exercise 8 
      // let filteredRecipeData = recipeData.filter((r) => r.tags.includes(tag));
      // console.log(filteredRecipeData);
      // !!
      // Exercise 9
      location.hash = `tag/${tag}`;
      // tagContainer.innerHTML = "";
      // filteredRecipeData.forEach((r) => {
        // let filteredCard = createCard(r);
        // tagContainer.appendChild(filteredCard);
      // });
      // !!
    });
    // !!
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
  // Exercise 6 here - add ingredient list
  let h4Ingredients = document.createElement('h4');
  h4Ingredients.innerText = 'Ingredients';
  let ulIngredients = document.createElement('ul');
  recipe.ingredients.forEach((ing) => {
    let li = document.createElement('li');
    li.innerText = ing;
    ulIngredients.appendChild(li);
  });
  // !!
  let p = document.createElement('p');
  p.innerText = recipe.instructions;
  let h4Instructions = document.createElement('h4');
  h4Instructions.innerText = 'Instructions';
  // Exercise 6 - append the new elements here
  contents.appendChild(h4Ingredients);
  contents.appendChild(ulIngredients);
  // !!
  contents.appendChild(h4Instructions);
  contents.appendChild(p);

  card.classList.add('card');
  card.appendChild(cimage);
  card.appendChild(contents);

  wrapper.appendChild(title);
  wrapper.appendChild(card);

  fullRecipeContainer.appendChild(wrapper);
  
  // Exercise 5 here
  // Exercise 5 - add a back "button"
  backBtn = document.createElement('a');
  backBtn.href = '#';
  backBtn.classList.add('waves-effect', 'waves-light', 'btn', 'orange');
  backBtn.text = "Back";
  wrapper.appendChild(backBtn);
  // !!

}

function renderSearch() {
  let input = document.createElement('input');
  let btn = document.createElement('button');

  btn.innerText = 'Search';
  btn.classList.add('waves-effect', 'waves-light', 'btn', 'orange');

  filtersContainer.appendChild(input);
  filtersContainer.appendChild(btn);

  btn.addEventListener('click', (e) => {
    location.hash = `search/${input.value}`;
    input.value = '';
  });
}

renderSearch();

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
    tagContainer.style.display = 'none';
    searchContainer.style.display = 'none';
  } else {
      // Exercise 9
      if (location.hash.includes('tag')) {
        cardContainer.style.display = 'none';
        fullRecipeContainer.style.display = 'none';
        tagContainer.style.display = 'flex';
        searchContainer.style.display = 'none';
        // Exercise 12, 13, 14
        let currentTag = location.hash.split('/')[1];
        let filteredRecipeData = recipeData.filter((r) => r.tags.includes(currentTag));
        tagContainer.innerHTML = "";
        filteredRecipeData.forEach((r) => {
          let filteredCard = createCard(r);
          tagContainer.appendChild(filteredCard);
        });
        // !!
      // !!
      } else if (location.hash.includes('search')) {
        cardContainer.style.display = 'none';
        fullRecipeContainer.style.display = 'none';
        tagContainer.style.display = 'none';
        searchContainer.style.display = 'flex';
        searchContainer.innerHTML = "";
        let currentSearchTerm = location.hash.split('/')[1];
        let filteredRecipeData = recipeData.filter((r) => {
          if (r.tags.includes(currentSearchTerm)) return true;
          if (r.name.includes(currentSearchTerm)) return true;
          if (r.instructions.includes(currentSearchTerm)) return true;
          return false;
        });

        filteredRecipeData.forEach((r) => {
          let filteredCard = createCard(r);
          searchContainer.appendChild(filteredCard);
        });
      } else {
        // this is the individual recipe route
        // Exercise 3 - Render a recipe on screen
        cardContainer.style.display = 'none';
        fullRecipeContainer.style.display = 'flex';
        tagContainer.style.display = 'none';
        searchContainer.style.display = 'none';
        renderRecipe();
      }
  }
  // Exercise 9 - Add a search form

  // Exercise 10 - Make the recipes searchable by the form
}

window.addEventListener('hashchange', handleRoute);
// Exercise 4 - make the same thing happen on the window load event
window.addEventListener('load', handleRoute);

// Exercise 11 - make the logo clickable
document.querySelector('header').addEventListener('click', () => location.hash = '#');