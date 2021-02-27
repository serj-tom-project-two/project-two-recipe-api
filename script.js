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
  fetch(url)
    .then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      recipesApp.displayRecipe(data);
      recipesApp.healthInfo();
      // recipesApp.healthInfo(recipesApp.labelList(healthLabels));
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

recipesApp.labelList = (labelInfo) => {
  let healthList = document.createElement('ul');
  // healthList.id = 'hidden';

  for (const label of labelInfo) {
    let healthItem = document.createElement('li');
    healthItem.innerText = label;
    // healthList.appendChild(healthItem);
  }
  return healthList;

  // let nutritionList = document.createElement('ul');

  // for (const label of labelInfo) {

  //

}

recipesApp.displayRecipe = (recipeObject) => {

  // console.log (recipeObject);
  const { hits } = recipeObject;

  // loop through the list of recipies inside of hits
  for (const element of hits) {

    // destructureing the hits element
    const {
      recipe: { label, ingredientLines, image, healthLabels, totalNutrients },
    } = element;

    // recipesApp.healthInfo(recipesApp.labelList(healthLabels));

    // console.log (totalNutrients);

    const { CA, CHOLE, FAT, FE, SUGAR } = totalNutrients;

    // console.log (CA.label, CA.quantity);


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

    //hidden div containing the healthLabels and the nutritional info
    let healthInfoItem = document.createElement('div');
    healthInfoItem.id = "health";

    //appending health labels and nutritional info

    //  recipesApp.healthInfo(recipesApp.labelList);
    healthInfoItem.appendChild(recipesApp.labelList(healthLabels));


    // healthInfoItem.appendChild(nutritionList);

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
      // console.log (task);

      // if the user has inputted a value get the recipes for that value
      recipesApp.getRecipe(searchValue);

      // clear the search bar of any previous recipe
      inputEl.value = '';
    };

  });
}; // end of getUserChoice

recipesApp.healthInfo = (healthLabels) => {

  let healthEl = document.getElementsByClassName("recipeContainer");

   console.log(healthEl);

  //loop through all recipe container objects and add Event Listener
  for (let i = 0; i < healthEl.length; i++) {

    healthEl[i].addEventListener("click", function () {
      //create an array of objects with the ID of health
      let healthContainerEl = document.querySelectorAll('#health');
      healthContainerEl[i].classList.toggle("healthContainer");

      // let healthList = document.querySelector('#hidden');
      // healthList.classList.toggle('active');
      //healthEl[i].innerText = healthList.appendChild(healthLabels);

      //healthContainerEl[i].appendChild(recipesApp.labelList(healthLabels));

      //healthList.appendChild(healthItem);
      // healthList.appendChild(healthItem);

      //console.log("The element Num: ", i);
    });

  };
};

// ^ we need to make each div also have a div with the respoective health text in it, position it to overlay the main divs. and set opasity to 0.

// after an element is clicked, we need to make the div with that element number visiable

recipesApp.init = (labelList) => {
  //default searchValue set to chicken
  let searchValue = 'chicken';

  recipesApp.getRecipe(searchValue);
  recipesApp.getUserChoice();
  // recipesApp.healthInfo(labelList);
  
  
}; // end of init

recipesApp.init();

