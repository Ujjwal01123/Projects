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
//

const placeToVisitText = document.getElementById("placeToVisitText");
const imagePlace = document.getElementById("imagePlace");
const datePlace = document.getElementById("datePlace");
const metaTitlePlace = document.getElementById("metaTitlePlace");
const descriptionPlace = document.getElementById("descriptionPlace");

// Fetch page data and update meta tags
// function to add meta title and description
function fetchPageData(title, description) {
  console.log(description);
  if (title) {
    document.title = title;
  }
  if (description) {
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement("meta");
      descTag.name = "description";
      document.head.appendChild(descTag);
    }
    descTag.content = description;
  }
  if (!description) {
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement("meta");
      descTag.name = "description";
      document.head.appendChild(descTag);
    }
    descTag.content = title;
  }
}
//
//

function PlaceWithSlug() {
  // Get the query string (everything after ?)
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q"); // Get the value of the 'id' parameter

  // Fetch data from your API using the id
  fetch(`${serverUrl}/v1/api/get-destination/${q}`)
    .then((res) => res.json())
    .then((data) => {
      fetchPageData(data.data.metaTitle, data.data.metaDescription);
      console.log(data.data.metaTitle, data.data.metaDescription);
      // console.log("Place data:", data.data);
      placeToVisitText.innerText = data.data.title;
      imagePlace.innerHTML = `<img src="${data.data.image}" alt="${data.data.title}" />`;
      // Handle empty or missing createdAt
      if (data.data.createdAt) {
        const createdDate = new Date(data.data.createdAt);

        // Format date in Month name format (e.g., "July 8, 2025")
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = createdDate.toLocaleDateString("en-US", options);

        datePlace.innerText = formattedDate;
      } else {
        datePlace.innerText = "No date available";
      }

      metaTitlePlace.innerText = data.data.metaTitle;
      descriptionPlace.innerHTML = data.data.description;
      // you can now display data in your HTML
    })
    .catch((err) => console.error(err));
}

PlaceWithSlug();
