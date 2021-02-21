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

    //ingredients returned in a list
    const ingredientLookup = (ingredientList) => {
      for (let i = 0; i < ingredientList.length; i++) {
        console.log(ingredientList[i]);
      };
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
        
        let image = jsonResponse.hits[recipeCount].recipe.image;
        let recipePictureEl = document.createElement('img');
        recipePictureEl.src = image;
        containerItem.appendChild(recipePictureEl);

        let mainEl = document.querySelector('main');
        mainEl.appendChild(containerItem);



        let ingredientList = jsonResponse.hits[recipeCount].recipe.ingredientLines;
        ingredientLookup(ingredientList);
      }; //end of recipeCount loop    

    } // end of recipeLookup

    recipes.init = () => {

      recipeLookup();

    }; //end of recipeLookup init

    recipes.init();

    console.log(jsonResponse);
  });