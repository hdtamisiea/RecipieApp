//pages unique variables
var ingredientInputEl = document.querySelector("input");
var buttonEl = document.querySelector("#btn-search")
var ingredientFormEl = document.querySelector("#ingredient-form");
// key entered by leah 2/8
var APIKey = "79f553ecde4b4d43809e9db33715eeca";
var recipeContainer = $("#recipe-container");
// create an array to store searched ingredients. They will load right away if stored.  If none stored, the container will be empty.
var saveIngredientArr = JSON.parse(localStorage.getItem("savedIngredients")) || [];

console.log(saveIngredientArr)
loadLocalStorage()
function loadLocalStorage() {
  let count = {}
  saveIngredientArr.forEach((element) => {
    count[element] = (count[element] || 0) + 1
  })
  console.log(count)
  let countArr = Object.entries(count)
  let empty = []
  console.log(countArr)
  countArr.forEach((element) => {
    empty.push(element[0])
  })
  saveIngredientArr = empty
  console.log(empty, saveIngredientArr)

  loadRecent(saveIngredientArr)
}

function loadRecent(searchArr) {
  for (i = 0; i < searchArr.length; i++) {
    let value = searchArr[i]

    var recentSearchBtn = document.createElement("button");
    recentSearchBtn.textContent = value.toUpperCase();
    document.querySelector(".recent-searches").append(recentSearchBtn);
    recentSearchBtn.setAttribute("class", "btn-large");
    recentSearchBtn.setAttribute("id", value);
    recentSearchBtn.setAttribute("onclick", "getRecipes(event)");
    recentSearchBtn.setAttribute("type", "submit");
  }
}

//recipes search function
var getRecipes = function (e) {
  e.preventDefault()
  console.log(e.target.id, e.target.innerHTML);
  if (e.target.id == "btn-search") {
    console.log("hello");
    var value = ingredientInputEl.value
  } else {
    var value = e.target.innerHTML.toLowerCase()
    console.log(e.target.value, e.target)
  }

  recipeContainer.children().remove()
 
  //fetch API from spoonacular
  fetch("https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + value + "&apiKey=" + APIKey + "&number=1")
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return // call function her for modal
      }
    })

    .then(data => {
      if (e.target.id == "btn-search") {
        saveIngredientArr.push(document.querySelector("#ingredient").value)
        localStorage.setItem("savedIngredients", JSON.stringify(saveIngredientArr));
        createRecent(document.querySelector("#ingredient").value);
      }
      //  else {
      //   var value = e.target.innerHTML.toLowerCase()
      //   console.log(e.target.value, e.target)
      // }

      console.log(data)
      for (var i = 0; i < data.length; i++) {
        let recipeId = data[i].id
        console.log(recipeId, i)
        getRecipeId(recipeId)
      }
    })
}

var getRecipeId = function (id) {

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

// Create a new button for every new ingredient entered, this will be saved to local storage.  User can either type a new ingredient or choose a recent search button.
var createRecent = function (value) {
  var recentSearchBtn = document.createElement("button");

  // set text contet of recent search button to be the ingredient typed by user - list in uppercase
  recentSearchBtn.textContent = value.toUpperCase();

  // Set attributes and append new search buttons
  document.querySelector(".recent-searches").append(recentSearchBtn);
  recentSearchBtn.setAttribute("class", "btn-large");
  recentSearchBtn.setAttribute("id", value);
  recentSearchBtn.setAttribute("onclick", "getRecipes(event)");
  recentSearchBtn.setAttribute("type", "submit");
}

var formSubmitHandler = function (event) {
  event.preventDefault();

  ingredientFormEl.addEventListener("submit", formSubmitHandler)
}

// target api

// var that links button id to event listener

var zipBtn = document.querySelector("#zip-button")

// var that links input info with input on HTML

var zipInput = document.querySelector("#zip")

// var that links target container where divs are appended to parent div container

var resultsContainerEl = document.querySelector("#results-container")
console.log("works")

// Api call function


var targetLocation = function (zip) {
  fetch("https://target-com-store-product-reviews-locations-data.p.rapidapi.com/location/search?zip=" + zip + "&radius=" + "25", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "target-com-store-product-reviews-locations-data.p.rapidapi.com",
      "x-rapidapi-key": "fdaba43e99msh6857b604df1bd9dp17d280jsn82e4062b7f4f"
    }
  })
    .then(response => {
      console.log(response);
      if (response.ok) {
        response.json().then(function (data) {
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

            for (var i = 0; i < childElems.length; i++) {
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

var targetSubmit = function (event) {
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