//pages unique variables
var ingredientInputEl = document.querySelector("input");
var buttonEl = document.querySelector("#btn-search")
// key entered by leah 2/8
var APIKey = "81c6c46f0a9344f2951ce2eff8cef15e";
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
            for (var i = 0; i < 8; i++) {
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
      <div class="card">
        <div class="card-image">
          <img src="${data.image}">
        </div>
        <div class="card-content">
          <p>${data.title}</p>
        </div>
        <div class="card-action">
          <a href="${data.spoonacularSourceUrl}">Get recipe here!</a>
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


// target api

// var that links button id to event listener

var zipBtn = document.querySelector("#zip-button")

// var that links input info with input on HTML

var zipInput = document.querySelector("#zip")

// var that links target container where divs are appended to parent div container

var resultsContainerEl = document.querySelector("#results-container")
    console.log("works")

// Api call function


var targetLocation = function(zip) {
    fetch("https://target-com-store-product-reviews-locations-data.p.rapidapi.com/location/search?zip="+ zip +"&radius=" + "25", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "target-com-store-product-reviews-locations-data.p.rapidapi.com",
            "x-rapidapi-key": "fdaba43e99msh6857b604df1bd9dp17d280jsn82e4062b7f4f"
        }
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            response.json().then(function(data) {
              console.log(data);

            //   location one info

              locationOneAddress = data.locations[0].address.address_line1;

              locationOneCity = data.locations[0].address.city; 

              locationOneState = data.locations[0].address.state;

              locationOneZip = data.locations[0].address.postal_code;

              locationOneDistance = data.locations[0].distance;

              locationOnePhone = data.locations[0].contact_information.telephone_number;

              console.log(locationOneAddress);

              console.log(locationOneCity);

              console.log(locationOnePhone);

            //   location two info


              locationTwoAddress = data.locations[1].address.address_line1;

              locationTwoCity = data.locations[1].address.city;

              locationTwoState = data.locations[1].address.state;

              locationTwoZip = data.locations[1].address.postal_code;

              locationTwoDistance = data.locations[1].distance;

              locationTwoPhone = data.locations[1].contact_information.telephone_number;

              console.log(locationTwoAddress);

              console.log(locationTwoCity);

              console.log(locationTwoPhone);

            //   location 3 info


              locationThreeAddress = data.locations[2].address.address_line1;

              locationThreeCity = data.locations[2].address.city;

              locationThreeState = data.locations[2].address.state;

              locationThreeZip = data.locations[2].address.postal_code;

              locationThreeDistance = data.locations[2].distance;

              locationThreePhone = data.locations[2].contact_information.telephone_number;

              console.log(locationThreeAddress);

              console.log(locationThreeCity);

              console.log(locationThreePhone);


            //   location 4 info


              locationFourAddress = data.locations[3].address.address_line1;

              locationFourCity = data.locations[3].address.city;

              locationFourState = data.locations[3].address.state;

              locationFourZip = data.locations[3].address.postal_code;

              locationFourDistance = data.locations[3].distance;

              locationFourPhone = data.locations[3].contact_information.telephone_number;

              console.log(locationFourAddress);

              console.log(locationFourCity);

              console.log(locationFourPhone);

              // make old store locations not visible

              var childElems = document.getElementsByClassName("child");
              console.log('childElems', childElems);

              if (childElems.length > 0) {
                console.log(childElems.length);

                for (var i=0; i < childElems.length; i++) {
                   console.log("removing", i);
                   childElems[i].style.display = 'none';
                }

                
              }

              console.log(childElems.length)

              //   creation and styling of created elements with store locations

              var storeOne = document.createElement("div");
              storeOne.innerHTML = locationOneAddress + "," + " " + locationOneCity + "," + locationOneState + "," + " " + locationOneZip + "," + "   " + "Distance:" + " " + locationOneDistance + "Miles Away" + "," + "       " + "Phone:" + " " + locationOnePhone;
              storeOne.classList.add("child");

              var storeTwo = document.createElement("div");
              storeTwo.innerHTML = locationTwoAddress + "," + " " + locationTwoCity + "," + locationTwoState + "," + " " + locationTwoZip + "," + "   " + "Distance:" + " " + locationTwoDistance + "Miles Away" + "," + "       " + "Phone:" + " " + locationTwoPhone;
              storeTwo.classList.add("child");

              var storeThree = document.createElement("div");
              storeThree.innerHTML = locationThreeAddress + "," + " " + locationThreeCity + "," + locationThreeState + "," + " " + locationThreeZip + "," + "   " + "Distance:" + " " + locationThreeDistance + "Miles Away" + "," + "       " + "Phone:" + " " + locationThreePhone;
              storeThree.classList.add("child");

              var storeFour = document.createElement("div");
              storeFour.innerHTML = locationFourAddress + "," + " " + locationFourCity + "," + locationFourState + "," + " " + locationFourZip + "," + "   " + "Distance:" + " " + locationFourDistance + "Miles Away" + "," + "       " + "Phone:" + " " + locationFourPhone;
              storeFour.classList.add("child");


             // generated elements are appended to parent container to display to user 

              
              resultsContainerEl.appendChild(storeOne);
              resultsContainerEl.appendChild(storeTwo);
              resultsContainerEl.appendChild(storeThree);
              resultsContainerEl.appendChild(storeFour);


           



            });

            // if user does not input a zip code app replies with alert

            } else {
              alert("No Target Store within 25 mile radius");
            }
          })
    // logs errors on console
    .catch(err => {
        console.error(err);
    });

}

// submission function passed into event listener with user inputed zip code 

var targetSubmit = function(event) {
    event.preventDefault();

    var zip = zipInput.value;

    console.log("zip", zip)


    if (zip) {
        targetLocation(zip);
        
    } else {
        alert("Please enter valid zipcode");
    }
}

// event listener that on click runs input function with zip code to API call to recieve data

zipBtn.addEventListener("click", targetSubmit);