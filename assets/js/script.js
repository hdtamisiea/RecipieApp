//pages unique variables
var ingredientInputEl= document.querySelector("input");
var buttonEl = document.querySelector("#btn-search")

var APIKey = "df6099c2176b4b1f92093d07eb64bc0b";

//recipes search function

var getRecipes = function(value){
//     var ingredient = document.getElementById("ingredient").value;
// console.log(ingredient)
    var getResults;
    console.log("searching recipes " + value);
    //fetch API from spoonacular

    fetch("https://api.spoonacular.com/recipes/findByIngredients?ingredients="+ value + "&apiKey=df6099c2176b4b1f92093d07eb64bc0b")
    .then(response =>
        response.json()
        )
        .then(data =>{
            console.log(data)
        })
}

//put recipe in cards

buttonEl.addEventListener("click", (e)=> {
    e.preventDefault()
    console.log(ingredientInputEl)
    var userInput = ingredientInputEl.value
    getRecipes(userInput)
})