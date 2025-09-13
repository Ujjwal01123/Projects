//
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

        // console.log("Selected slug:", item.slug);
        // Redirect to new page with slug as q
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
//

// const pageTitle = document.getElementById("pageTitle");

const pageTitle = document.getElementById("pageTitle");
const date = document.getElementById("date");
const mainImg = document.getElementById("mainImg");
const choosedPkg = document.getElementById("choosedPkg");
const pkgName = document.getElementById("pkgName");
const contentPara = document.getElementById("contentPara");

// Fetch page data and update meta tags
// function to add meta title and description
function fetchPageData(title, description) {
  // console.log(description);
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

function BlogBySlug() {
  // Get the query string (everything after ?)
  const params = new URLSearchParams(window.location.search);

  // Read the "id" parameter
  const q = params.get("q");

  // Get "q" parameter from URL
  // const params = new URLSearchParams(window.location.search);
  // const slug = params.get("q");

  // if (q) {
  //   // Replace the browser URL with clean slug
  //   window.history.replaceState({}, "", "/" + q);
  // }

  fetch(`${serverUrl}/v1/api/get-page/${q}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.data.metaTitle, data.data.metaDescription);
      fetchPageData(data.data.metaTitle, data.data.metaDescription);
      // console.log("Fetched Data:", data);

      if (data.data) {
        pageTitle.innerText = data.data.title || "Blog Title";
        //

        // Handle empty or missing createdAt
        if (data.data.createdAt) {
          const createdDate = new Date(data.data.createdAt);

          // Format: "08 July 2025"
          const options = { day: "2-digit", month: "long", year: "numeric" };
          const formattedDate = createdDate.toLocaleDateString(
            "en-GB",
            options
          );

          date.innerText = formattedDate;
        } else {
          date.innerText = "No Dates Available";
        }

        //
        mainImg.src = data.data.image || "default-image.jpg";
        choosedPkg.innerText = data.data.title || "Paackages";
        pkgName.innerText = data.data.title || "Package Name";
        contentPara.innerHTML =
          data.data.description || "Blog content goes here.";
      } else {
        console.error("No blog data found for the given ID.");
      }
    })
    .catch((error) => {
      console.error("Error fetching blog data:", error);
    });
}

BlogBySlug();
