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

        const recipeLookup = {};

        recipeLookup.init = () => {

          //loop through the list of recipies at jsonResponse.hits
          for (let recipeCount =0; recipeCount < jsonResponse.hits.length; recipeCount++) {
            
            // initialize variables for label, image and recipe ingredients
                let label = jsonResponse.hits[recipeCount].recipe.label;
                // console.log(label);

                let image = jsonResponse.hits[recipeCount].recipe.image;

                for (let i = 0; i < jsonResponse.hits[recipeCount].recipe.ingredientLines.length; i++) {
                    console.log(jsonResponse.hits[recipeCount].recipe.ingredientLines[i]);
                };

            }; //end of recipeCount loop

        }; //end of recipeLookup init

        recipeLookup.init();

        console.log(jsonResponse);
    });