// ----------------- SEARCH SUGGESTIONS + ANIMATION -----------------
const serverUrl = "http://localhost:7000";

// console.log("Using server URL:", serverUrl);
// texts and suggestions array for search input animation and text
let texts = [];
let suggestionsData = [];

const searchInput = document.getElementById("animatedInput");
const suggestionsBox = document.getElementById("suggestionsBox");

// Fetch categories and fill texts + suggestions
async function fetchCategories() {
  try {
    const response = await fetch(`${serverUrl}/v1/api/get-category`);
    if (!response.ok) throw new Error("Network response was not ok");

    const result = await response.json();
    const categories = result.data;

    // Store both name + slug
    suggestionsData = categories.map((cat) => ({
      name: cat.categoryName,
      slug: cat.Slug, // make sure your backend sends slug
    }));

    // Update texts for typing animation
    texts = suggestionsData.map((cat) => `Search "${cat.name}"`);

    if (texts.length > 0) {
      typeEffect();
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// show suggestions as user types
searchInput.addEventListener("input", () => {
  const input = searchInput.value.toLowerCase();
  suggestionsBox.innerHTML = ""; // clear old results

  if (input) {
    const filtered = suggestionsData.filter((item) =>
      item.name.toLowerCase().includes(input)
    );

    filtered.forEach((item) => {
      const div = document.createElement("div");
      div.textContent = item.name;

      div.addEventListener("click", () => {
        searchInput.value = item.name; // set selected value
        suggestionsBox.innerHTML = ""; // clear suggestions

        console.log("Selected slug:", item.slug);
        // 🔥 Redirect to new page with slug as q
        window.location.href = `../Holiday_Category/category.html?q=${item.slug}`;
      });

      suggestionsBox.appendChild(div);
    });
  }
});

// Typing animation
let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const fullText = texts[textIndex];
  const displayText = fullText.replace(/^Search\s*/, "Search ");
  let currentText;

  if (!deleting) {
    currentText = displayText.substring(0, charIndex);
    searchInput.setAttribute("placeholder", currentText + "|");

    if (charIndex < displayText.length) {
      charIndex++;
      setTimeout(typeEffect, 60);
    } else {
      setTimeout(() => {
        deleting = true;
        typeEffect();
      }, 1200);
    }
  } else {
    currentText = displayText.substring(0, charIndex);
    searchInput.setAttribute("placeholder", currentText + "|");

    if (charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 40);
    } else {
      deleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeEffect, 400);
    }
  }
}

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (!suggestionsBox.contains(e.target) && e.target !== searchInput) {
    suggestionsBox.innerHTML = "";
  }
});

// Call API to load categories + start animation
fetchCategories();

//
async function destinationApiCall() {
  try {
    const response = await fetch(`${serverUrl}/v1/api/get-destination`);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    const Data = data.data;

    // target <main> element
    const main = document.querySelector("main");

    Data.forEach((data) => {
      let html = `
        <div class="destination-card" onclick="window.open('../Popular_Destinations/destination.html?q=${data.slug}','_self')">
          <div class="card-content">
            <img src="${data.image}" alt="${data.metaTitle}">
            <div class="blackgrd"></div>
            <h3>${data.metaTitle}</h3>
            <p>${data.metaDescription}</p>
          </div>
        </div>
      `;
      main.insertAdjacentHTML("beforeend", html);
    });
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

destinationApiCall();
