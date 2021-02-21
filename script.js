const url = new URL('https://api.edamam.com/search');
url.search = new URLSearchParams({
  app_key: '8761472141e119dcc5fa111cc3c1a023',
  app_id: 'a01a93c6',
  q: 'chicken'
});

fetch(url)
  .then(function (response) {
    // parse the response into JSON
    return response.json();
  }).then(function (jsonResponse) {

    const recipes = {};

    //ingredients appended to a ul list and returned into the main loop
    const ingredientLookup = (ingredientList) => {
      let recipeList = document.createElement('ul');
      for (let i = 0; i < ingredientList.length; i++) {
        let recipeItem = document.createElement('li');
        recipeItem.innerText = ingredientList[i];
        recipeList.appendChild(recipeItem);

        console.log(ingredientList[i]);
      };
      return(recipeList);
    } // end of ingredientLookup

    const recipeLookup = () => {
      
      let recipeCount = 0;

      //loop through the list of recipies at jsonResponse.hits
      for (recipeCount = 0; recipeCount < jsonResponse.hits.length; recipeCount++) {

        //recipe container item
        let containerItem = document.createElement('div');
        containerItem.classList.add('recipeContainer');

        // initialize variables for label, image and recipe ingredients list
        let label = jsonResponse.hits[recipeCount].recipe.label;
        
        //target the recipe container to place the info into
        let recipeTitle = document.createElement('h3');
        recipeTitle.innerText = label;
        containerItem.appendChild(recipeTitle);
        
        let infoContainer = document.createElement('div');
        infoContainer.classList.add('infoContainer');

        let imgContainer = document.createElement('div');
        imgContainer.classList.add('imgContainer');

        //attaches the image to the div within recipe container
        let image = jsonResponse.hits[recipeCount].recipe.image;
        let recipePictureEl = document.createElement('img');
        recipePictureEl.src = image;
        imgContainer.appendChild(recipePictureEl);

        infoContainer.appendChild(imgContainer);

        // gets the ingredient list from a function and populates the recipe container
        let ingredientList = jsonResponse.hits[recipeCount].recipe.ingredientLines;
        infoContainer.appendChild(ingredientLookup(ingredientList));

        containerItem.appendChild(infoContainer);
        
        let mainEl = document.querySelector('main');
        mainEl.appendChild(containerItem);






      }; //end of recipeCount loop    

    } // end of recipeLookup

    recipes.init = () => {

      recipeLookup();

    }; //end of recipeLookup init

    recipes.init();

    console.log(jsonResponse);
  });