//pages unique variables
var ingredientInputEl = document.querySelector("input");
var buttonEl = document.querySelector("#btn-search")

var APIKey = "df6099c2176b4b1f92093d07eb64bc0b";

//recipes search function

var getRecipes = function (value) {
    //     var ingredient = document.getElementById("ingredient").value;
    // console.log(ingredient)
    var getResults;
    console.log("searching recipes " + value);
    //fetch API from spoonacular

    fetch("https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + value + "&apiKey=df6099c2176b4b1f92093d07eb64bc0b")
        .then(response =>
            response.json()
        )
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                console.log(data[i])

                let recipeImage = data[i].image;
                getRecipeImage(recipeImage)
                let UsedIngredients = data[i].usedIngredients;
                getUsedIngredients(UsedIngredients)

                let missingIngredients = data[i].missedIngredients;
                getMissingIngredients(missingIngredients)

                let recipeTitle = data[i].title;
                getRecipeTitle(recipeTitle)

                let unusedIngredents = data[i].unusedIngredents
                getUnusedIngredients(unusedIngredents)

                let recipeId = data[i].id
                getRecipeId(recipeId)

            }
        })
}
var getUnusedIngredients = function (data) {
    console.log(data)
}
var getRecipeId = function(data){
    console.log(data)
}
var getRecipeImage = function (data) {
    console.log(data)
}
var getRecipeTitle = function (data) {
    console.log(data)
}
var getMissingIngredients = function (data) {
    data.forEach((element) => {
        if (element.name) {
            console.log(element.name);
        }
    });
}
var getUsedIngredients = function (data) {
    data.forEach((element) => {
        if (element.name) {
            console.log(element.name)
        }
    })
}



//put recipe in cards

buttonEl.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(ingredientInputEl)
    var userInput = ingredientInputEl.value
    getRecipes(userInput)
})