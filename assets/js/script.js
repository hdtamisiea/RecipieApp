//pages unique variables
var ingredientInputEl = document.querySelector("input");
var buttonEl = document.querySelector("#btn-search")
var APIKey = " 80830b42e37b4c419acf7e905fe77297";
var recipeContainer = $("#recipe-container");

//recipes search function

var getRecipes = function (value) {
    //     var ingredient = document.getElementById("ingredient").value;
    // console.log(ingredient)
    var getResults;
    console.log("searching recipes " + value);
    //fetch API from spoonacular

    fetch("https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + value + "&apiKey="+ APIKey)
        .then(response =>
            response.json()
        )
        .then(data => {
            for (var i = 0; i < data.length; i++) {

                let recipeId = data[i].id
                getRecipeId(recipeId)

            }
        })
}

var getRecipeId = function(id){
    console.log(id)
    var url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKey}`

    fetch(url)
    .then(response =>
        response.json()
    )
    .then(data => {
    console.log(data)


    //put recipe in cards
    recipeContainer.append(`
    <div class="row">
    <div class="col s12 m7">
      <div class="card">
        <div class="card-image">
          <img src="${data.image}">
          <span class="card-title">${data.title}</span>
        </div>
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
          <a href="${data.sourceurl}">Get recipe here!</a>
        </div>
      </div>
    </div>
  </div>
    `)


    })
}
var getUsedIngredients = function (data) {
    data.forEach((element) => {
        if (element.name) {
            console.log(element.name)
        }
    })
}
buttonEl.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(ingredientInputEl)
    var userInput = ingredientInputEl.value
    getRecipes(userInput)
})