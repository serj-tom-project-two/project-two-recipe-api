//MVP
// take input from user for food type... AKA - chicken, beef, fish etc...
// append recipes onto  the main div on the page
// appended recipes will show... name, image and list of ingredents

// Stretch Goals 
//Add nutritional Info as a clickable info Panel associated with the Recipe Panel

//Technical Challenges
// Make the healthInfo hidden Div inline with the other column (Any targeting of created elements)

// creating namespace
const recipesApp = {};

// storing the API key and base URL
recipesApp.key = '8761472141e119dcc5fa111cc3c1a023';
recipesApp.baseUrl = 'https://api.edamam.com/search';

recipesApp.getRecipe = (searchValue) => {

  // this API has a default search request of 5 searches per minute
  const url = new URL(recipesApp.baseUrl);
  // adding the URL params
  url.search = new URLSearchParams({
    app_key: recipesApp.key,
    app_id: 'a01a93c6',
    q: searchValue
  });

  fetch(url)
    .then((response) => {
      return response.json();
    }).then((data) => {

      recipesApp.displayRecipe(data);
      recipesApp.healthInfo();
    })
}; //end of getRecipe

recipesApp.ingredients = (ingredientList) => {
  let recipeList = document.createElement('ul');

  for (const ingredient of ingredientList) {
    let recipeItem = document.createElement('li');
    recipeItem.innerText = ingredient;
    recipeList.appendChild(recipeItem);
  };
  return (recipeList);
} // end of ingredients

//Gets the important info about the Nutrients contained in the recipe object
recipesApp.nutrients = (totalNutrients) =>{
  let recipeNutrients = document.createElement('ul');
  
  let nutrientsTitle = document.createElement('h3');
  nutrientsTitle.innerText = "Nutritional Facts";
  recipeNutrients.appendChild(nutrientsTitle);

  recipeNutrients.classList.add('nutrientLi');

  // need an array of nutrient property names
  const nutrientNames = ['CA', 'CHOLE', 'FAT', 'FE', 'SUGAR'];

  // loop through each nutrient
  for (nutrientName of nutrientNames) {
    // get the nutrient, destructure if you want
    const { label, quantity, unit } = totalNutrients[nutrientName];

    // create an element and append for each nutrient
    let element = document.createElement('li');
    element.innerText = `${Math.floor(quantity)} ${unit} of ${label}`;
    recipeNutrients.appendChild(element);
  } // end of for loop

  return(recipeNutrients);
} // end of nutrients

recipesApp.labelList = (labelInfo, totalNutrients) => {
  let healthList = document.createElement('ul');
  healthList.classList.add('healthLi');

  let healthTitle = document.createElement('h3');
  healthTitle.innerText = "Health Info";
  healthList.appendChild(healthTitle);

  for (const label of labelInfo) {
    let healthItem = document.createElement('li');
    healthItem.innerText = label;
    healthList.appendChild(healthItem);
  };

  const nutrientList = recipesApp.nutrients(totalNutrients);

  healthList.appendChild(nutrientList);
  return healthList;

}; // end of labelList

recipesApp.displayRecipe = (recipeObject) => {

  const { hits } = recipeObject;

  // loop through the list of recipies inside of hits
  for (const element of hits) {

    // destructureing the hits element
    const {
      recipe: { label, ingredientLines, image, healthLabels, totalNutrients },
    } = element;

    // <div> with a class of recipeContainer for each recipe
    let containerItem = document.createElement('div');
    containerItem.classList.add('recipeContainer');

    //target the recipe container to place the recipe name into it
    let recipeTitle = document.createElement('h2');
    recipeTitle.innerText = label;
    containerItem.appendChild(recipeTitle);

    //<div> with a class of inforContainer for each recipe... this will have all the info for each recipe
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

    //hidden div containing the healthLabels and the nutritional info
    let healthInfoItem = document.createElement('div');
    healthInfoItem.id = "health";

    //appending health labels and nutritional info
    healthInfoItem.appendChild(recipesApp.labelList(healthLabels, totalNutrients));

    containerItem.appendChild(healthInfoItem);

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

      // if the user has inputted a value get the recipes for that value
      recipesApp.getRecipe(searchValue);

      // clear the search bar of any previous recipe
      inputEl.value = '';
    };

  });
}; // end of getUserChoice

recipesApp.healthInfo = () => {

  let healthEl = document.getElementsByClassName("recipeContainer");

  //loop through all recipe container objects and add Event Listener
  for (let i = 0; i < healthEl.length; i++) {

    healthEl[i].addEventListener("click", function () {
      //create an array of objects with the ID of health
      let healthContainerEl = document.querySelectorAll('#health');
      healthContainerEl[i].classList.toggle("healthContainer");

      let healthListEl = document.querySelectorAll('ul.healthLi');
      healthListEl[i].classList.toggle('active');

    }); // end of eventListener

  }; // end of for loop

}; // end of heathInfo

recipesApp.init = () => {
  //default searchValue set to chicken
  let searchValue = 'chicken';

  recipesApp.getRecipe(searchValue);
  recipesApp.getUserChoice();

}; // end of init

recipesApp.init();

