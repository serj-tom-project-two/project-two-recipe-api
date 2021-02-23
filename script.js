let searchValue = 'chicken';

// this API has a default search request of 5 searches per munite
const url = new URL('https://api.edamam.com/search');
url.search = new URLSearchParams({
  app_key: '8761472141e119dcc5fa111cc3c1a023',
  app_id: 'a01a93c6',
  q: searchValue
});


const recipes = {};

//ingredients appended to a ul list and returned into the main loop
const ingredientLookup = (ingredientList) => {
  let recipeList = document.createElement('ul');
  
  for (const ingredient of ingredientList) {
    let recipeItem = document.createElement('li');
    recipeItem.innerText = ingredient;
    recipeList.appendChild(recipeItem);

    //console.log(ingredientList[i]);
  };
  return (recipeList);
} // end of ingredientLookup

const recipeLookup = (jsonResponse) => {

  const {hits} = jsonResponse;

  //loop through the list of recipies at jsonResponse.hits
  for (const hit of hits) {
    const {
      recipe: {label, ingredientLines, image},
    } = hit;

    //recipe container item
    let containerItem = document.createElement('div');
    containerItem.classList.add('recipeContainer');
    
    //target the recipe container to place the info into
    let recipeTitle = document.createElement('h3');
    recipeTitle.innerText = label;
    containerItem.appendChild(recipeTitle);

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
    infoContainer.appendChild(ingredientLookup(ingredientLines));

    containerItem.appendChild(infoContainer);

    let mainEl = document.querySelector('main');
    mainEl.appendChild(containerItem);

  }; //end of recipeCount loop    

} // end of recipeLookup

recipes.init = (jsonResponse) => {

console.log(jsonResponse);
  recipeLookup(jsonResponse);

}; //end of recipeLookup init

fetch(url)
  .then(function (response) {
    // parse the response into JSON
    return response.json();
  }).then(function (jsonResponse) {

    recipes.init(jsonResponse);

    console.log(jsonResponse);
  });

const formEl = document.querySelector('form');
formEl.addEventListener('submit', function (e) {
  e.preventDefault();
  
  //set main element back to empty
  let mainDiv = document.querySelector('main');
  mainDiv.innerHTML = "";

  const inputEl = document.querySelector('input');
  const task = inputEl.value;

  if (task) {
    searchValue = task;

    url.search = new URLSearchParams({
      app_key: '8761472141e119dcc5fa111cc3c1a023',
      app_id: 'a01a93c6',
      q: searchValue
    });
    console.log(url.search);
    console.log(searchValue);

    fetch(url)
      .then(function (response) {
        // parse the response into JSON
        return response.json();
      }).then(function (jsonResponse) {

        recipes.init(jsonResponse);

        console.log(jsonResponse);
      });

  };
}); //end of event listener

