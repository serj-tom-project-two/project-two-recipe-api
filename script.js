// take input from user for food type... AKA - chicken, beef, fish etc...
// append recipes onto  the main div on the page
// appended recipes will show... name, image and list of ingredents


  // creating namespace
  const recipesApp = {};

  // storing the API key and base URL
recipesApp.key = '8761472141e119dcc5fa111cc3c1a023';
recipesApp.baseUrl = 'https://api.edamam.com/search';



recipesApp.getRecipe = (searchValue) => {

  // console.log (searchValue);
  
  // this API has a default search request of 5 searches per minute
  const url = new URL(recipesApp.baseUrl);
    // adding the URL params
  url.search = new URLSearchParams({
    app_key: recipesApp.key,
    app_id: 'a01a93c6',
    q: searchValue
  });
  // console.log (url);
  fetch (url)
    .then ((response) => {
      return response.json();
    }).then((data) => {
      // console.log (data);
      recipesApp.displayRecipe(data);
    })
}; //end of getRecipe

recipesApp.ingredients = (ingredientList) => {
  let recipeList = document.createElement('ul');
  
  for (const ingredient of ingredientList) {
    let recipeItem = document.createElement('li');
    recipeItem.innerText = ingredient;
    recipeList.appendChild(recipeItem);

    // console.log(ingredient);
  };
  return (recipeList);
} // end of ingredientLookup

recipesApp.displayRecipe = (recipieObject) => {

  // console.log (recipieObject);
  const {hits} = recipieObject;
  
  // loop through the list of recipies inside of hits
  for (const element of hits) {
    
    // destructureing the hits element
    const {
      recipe: {label, ingredientLines, image},
    } = element;

    recipesApp.ingredients(ingredientLines);

    // recipe container item
    let containerItem = document.createElement('div');
    containerItem.classList.add('recipeContainer');
    
    //target the recipe container to place the info into
    let recipeTitle = document.createElement('h3');
    recipeTitle.innerText = label;
    containerItem.appendChild(recipeTitle);

    //the total container for each recipe
    let infoContainer = document.createElement('div');
    infoContainer.classList.add('infoContainer');

    let imgContainer = document.createElement('div');
    imgContainer.classList.add('imgContainer');

    //attaches the image to the div within recipe container
    let recipePictureEl = document.createElement('img');
    recipePictureEl.src = image;
    imgContainer.appendChild(recipePictureEl);

    infoContainer.appendChild(imgContainer);

    // gets the ingredient list from a function and populates the recipe container
    infoContainer.appendChild(recipesApp.ingredients(ingredientLines));

    // create the infoContainer <div> inside of the containerItem <div>
    containerItem.appendChild(infoContainer);

    let mainEl = document.querySelector('main');
    mainEl.appendChild(containerItem);
  };
};

recipesApp.getUserChoice = () => {
  
    // add an event listener to the submit button, and prevent its default function
    const formEl = document.querySelector('form');
    formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // clear the main element before appending the new recipes
    let mainDiv = document.querySelector('main');
    mainDiv.innerHTML = "";

    //  get the user choice that was inputted by the user
    const inputEl = document.querySelector('input');
    const task = inputEl.value;

    // check to see if the user has inputted a value of not
    if (task) {
      searchValue = task;
      // console.log (task);

      // if the user has inputted a value get the recipes for that value
      recipesApp.getRecipe(searchValue);

      // clear the search bar of any previous recipe
      inputEl.value = '';
    };

  });
}; // end of getUserChoice

recipesApp.init = () => {
  //default searchValue set to chicken
  let searchValue = 'chicken';
  
  recipesApp.getRecipe(searchValue);
  recipesApp.getUserChoice();

}; // end of init

recipesApp.init();

