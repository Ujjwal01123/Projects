function searchRecipes() {
  const searchInput = document.getElementById("searchInput").value;
  const recipesDiv = document.getElementById("recipes");
  const notfoundDiv = document.getElementById("notfound");

  recipesDiv.innerHTML = "<p id='wait'>Please wait.....</p>";
  notfoundDiv.style.display = "none";

  if (searchInput.trim() === "") {
    recipesDiv.innerHTML = "";
    notfoundDiv.innerHTML = "Please enter a recipe";
    notfoundDiv.style.display = "block";
    return;
  }

  // api calling by name
  apiByName().then((data) => {
    if (!data.meals) {
      recipesDiv.innerHTML = "";
      notfoundDiv.innerHTML = "Recipe not found!Please search nother recipe..";
      notfoundDiv.style.display = "block";
    } else {
      recipesDiv.innerHTML = "";
      data.meals.forEach((meal) => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");
        card.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strCategory}</p>
                <button onclick="viewRecipe('${meal.idMeal}')">View Recipes</button>
            `;
        recipesDiv.appendChild(card);
      });
    }
  });
}

function viewRecipe(mealId) {
  const popupCard = document.getElementById("popupCard");
  const recipeTitle = document.getElementById("recipeTitle");
  const recipeDetails = document.getElementById("recipeDetails");
  const ytlink = document.getElementById("ytlink");
  const list = document.getElementById("list");
  const list2 = document.getElementById("list2");
  apiByID(mealId).then((data) => {
    const meal = data.meals[0];
    recipeTitle.innerText = meal.strMeal;
    recipeDetails.innerText = meal.strInstructions;
    ytlink.innerHTML = `<a href=${meal.strYoutube}>Click here</a>`;
    popupCard.style.display = "block";
    for (i = 1; i <= 20; i++) {
      const listItem = document.createElement("li");
      let ingredientKey = `strIngredient${i}`;
      let mealK = meal[ingredientKey];
      if (mealK) {
        listItem.textContent = `${mealK}`;
        list.appendChild(listItem);
      }
    }
    for (i = 1; i <= 20; i++) {
      const listItem2 = document.createElement("li");
      let measuresKey = `strMeasure${i}`;
      let ingredientKey = `strIngredient${i}`;
      let measuresK = meal[measuresKey];
      let mealK = meal[ingredientKey];
      if (measuresK) {
        listItem2.textContent = `Take ${measuresK} : ${mealK}`;
        list2.appendChild(listItem2);
      }
    }
  });
}

// api calling by id
const apiByID = async (mealId) => {
  const prom = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const resp = await prom.json();
  return resp;
};

const apiByName = async () => {
  const value = document.getElementById("searchInput").value;
  const promise = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
  );
  const response = await promise.json();
  return response;
};

// close button
function closeRecipe() {
  const popupCard = document.getElementById("popupCard");
  popupCard.style.display = "none";
}
