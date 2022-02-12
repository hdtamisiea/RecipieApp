//pages unique variables
var ingredientInputEl = document.querySelector("input");
var buttonEl = document.querySelector("#btn-search")
var ingredientFormEl = document.querySelector("#ingredient-form");
// key entered by leah 2/8
var APIKey = "f03e3391435141c3b9c073918195393b";
var recipeContainer = $("#recipe-container");
// create an array to store searched ingredients. They will load right away if stored.  If none stored, the container will be empty.
var saveIngredientArr = JSON.parse(localStorage.getItem("savedIngredients")) || [];
var flag = 0;
// Function to set load local storage info into our recent search array
loadLocalStorage()
function loadLocalStorage() {
  let count = {}
  saveIngredientArr.forEach((element) => {
    count[element] = (count[element] || 0) + 1
  })
  let countArr = Object.entries(count)
  let empty = []
  countArr.forEach((element) => {
    empty.push(element[0])
  })
  saveIngredientArr = empty

  loadRecent(saveIngredientArr)
}

// Function to load search buttons based on local storage 
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

//recipes search by ingredient function
var getRecipes = function (e) {
  e.preventDefault()
  if (e.target.id == "btn-search") {
    var value = ingredientInputEl.value
  } else {
    var value = e.target.innerHTML.toLowerCase()
  }

  // Clear recipe container before adding a new ingredient's recipes
  recipeContainer.children().remove()

  //fetch API from spoonacular by ingredient which provides the id number needed to get the actual recipes
  fetch("https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + value + "&apiKey=" + APIKey + "&number=3")
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return
      }
    })

    .then(data => {

      if (data.length > 0) {
        console.log(data)
        if (e.target.id == "btn-search") {
          saveIngredientArr.push(document.querySelector("#ingredient").value)
          localStorage.setItem("savedIngredients", JSON.stringify(saveIngredientArr));
          createRecent(document.querySelector("#ingredient").value);
        }

        for (var i = 0; i < data.length; i++) {
          let recipeId = data[i].id
          getRecipeId(recipeId)
        }
      } else {
        ModalWindow.openModal({
          title: "Please try again.",
          content: "Not a valid search term."
        });
      }
    }
    )
}

// Function to get recipes using id generated in getRecipes function
var getRecipeId = function (id) {

  var url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKey}`

  fetch(url)
    .then(response =>
      response.json()
    )
    .then(data => {

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

// Create a recent search button for every new ingredient entered.
var createRecent = function (value) {
  var recentSearchBtn = document.createElement("button");
  recentSearchBtn.textContent = value.toUpperCase();
  document.querySelector(".recent-searches").append(recentSearchBtn);
  recentSearchBtn.setAttribute("class", "btn-large col");
  recentSearchBtn.setAttribute("id", value);
  recentSearchBtn.setAttribute("onclick", "getRecipes(event)");
  recentSearchBtn.setAttribute("type", "submit");
}

// target api

// var that links button id to event listener
var zipBtn = document.querySelector("#zip-button")

// var that links input info with input on HTML
var zipInput = document.querySelector("#zip")

// var that links target container where divs are appended to parent div container
var resultsContainerEl = document.querySelector("#results-container")

// Api call function
var targetLocation = function (zip) {
  if (zip.length < 5) {
    ModalWindow.openModal({
      title: "Please re-enter",
      content: "That is an invalid zip code."
    });
    return
  } else 
  fetch("https://target-com-store-product-reviews-locations-data.p.rapidapi.com/location/search?zip=" + zip + "&radius=" + "25", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "target-com-store-product-reviews-locations-data.p.rapidapi.com",
      "x-rapidapi-key": "fbe244902emshcd73a928933abd7p1da1cdjsna4f2adc4134e"
    }
  })
    .then(response => {
      if (response.ok) {
        response.json().then(function (data) {
          if (data.locations.length < 1) {
            ModalWindow.openModal({
              title: "Please re-enter",
              content: "That is an invalid zip code."
            });
            return
          }

          //   location one info
          locationOneAddress = data.locations[0].address.address_line1;
          locationOneCity = data.locations[0].address.city;
          locationOneState = data.locations[0].address.state;
          locationOneZip = data.locations[0].address.postal_code;
          locationOneDistance = data.locations[0].distance;
          locationOnePhone = data.locations[0].contact_information.telephone_number;

          //   location two info
          locationTwoAddress = data.locations[1].address.address_line1;
          locationTwoCity = data.locations[1].address.city;
          locationTwoState = data.locations[1].address.state;
          locationTwoZip = data.locations[1].address.postal_code;
          locationTwoDistance = data.locations[1].distance;
          locationTwoPhone = data.locations[1].contact_information.telephone_number;

          //   location 3 info
          locationThreeAddress = data.locations[2].address.address_line1;
          locationThreeCity = data.locations[2].address.city;
          locationThreeState = data.locations[2].address.state;
          locationThreeZip = data.locations[2].address.postal_code;
          locationThreeDistance = data.locations[2].distance;
          locationThreePhone = data.locations[2].contact_information.telephone_number;

          //   location 4 info
          locationFourAddress = data.locations[3].address.address_line1;
          locationFourCity = data.locations[3].address.city;
          locationFourState = data.locations[3].address.state;
          locationFourZip = data.locations[3].address.postal_code;
          locationFourDistance = data.locations[3].distance;
          locationFourPhone = data.locations[3].contact_information.telephone_number;

          // make old store locations not visible
          var childElems = document.getElementsByClassName("child");

          if (childElems.length > 0) {

            for (var i = 0; i < childElems.length; i++) {
              childElems[i].style.display = 'none';
            }
          }

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
        ModalWindow.openModal({
          title: "Please try again.",
          content: "No Target Store within 25 mile radius."
        });
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

  if (zip) {
    targetLocation(zip);

  } else {
    ModalWindow.openModal({
      title: "Please re-enter",
      content: "That is an invalid zip code."
    });
  }
}

// event listener that on click runs input function with zip code to API call to recieve data
zipBtn.addEventListener("click", targetSubmit);

// Modal window javascript
const ModalWindow = {
  init() {
      document.body.addEventListener("click", e => {
        if (e.target.classList.contains("modal__close")) {
          this.closeModal(e.target);
        }
      });
      this.openModal();
  },

  getHtmlTemplate(modalOptions) {
    return `
          <div class="modal__overlay">
              <div class="modal__window">
                  <div class="modal__titlebar">
                      <span class="modal__title">${modalOptions.title}</span>
                      <button class="modal__close material-icons">close</button>
                  </div>
                  <div class="modal__content">
                      ${modalOptions.content}
                  </div>
              </div>
          </div>
      `;
  },

  openModal(modalOptions = {}) {
    if (flag == 0) {
    flag = 1;
    } else {
    modalOptions = Object.assign({
      title: 'Close this box when you are ready to begin!',
      content: 'You can search recipes for any ingredient!  Just type it into the yellow box and click "Get Recipes"!  Find a local grocery store by entering your zip code into the red box!'
    }, modalOptions);

    const modalTemplate = this.getHtmlTemplate(modalOptions);
    document.body.insertAdjacentHTML("afterbegin", modalTemplate);
  }
  },

  closeModal(closeButton) {
    const modalOverlay = closeButton.parentElement.parentElement.parentElement;
    document.body.removeChild(modalOverlay);
  }
};

document.addEventListener("DOMContentLoaded", () => ModalWindow.init());