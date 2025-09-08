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
        //  Redirect to new page with slug as q
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

//Button-1
document.getElementById("btn-1").onclick = function () {
  document.getElementById("btn-1").style.color = "#CE3C3D";
  document.getElementById("btn-2").style.color = "#6A7282";
  document.getElementById("btn-3").style.color = "#6A7282";
  document.getElementById("btn-4").style.color = "#6A7282";
  document.getElementById("btn-5").style.color = "#6A7282";

  document.getElementById("btn-1").style.borderBottom = "3.5px solid #CE3C3D";
  document.getElementById("btn-2").style.borderBottom = "none";
  document.getElementById("btn-3").style.borderBottom = "none";
  document.getElementById("btn-4").style.borderBottom = "none";
  document.getElementById("btn-5").style.borderBottom = "none";

  document.getElementById("desc1").style.zIndex = "2";
  document.getElementById("desc2").style.zIndex = "1";
  document.getElementById("desc3").style.zIndex = "1";
  document.getElementById("desc4").style.zIndex = "1";
  document.getElementById("desc5").style.zIndex = "1";
};
//Button-2
document.getElementById("btn-2").onclick = function () {
  document.getElementById("btn-1").style.color = "#6A7282";
  document.getElementById("btn-2").style.color = "#CE3C3D";
  document.getElementById("btn-3").style.color = "#6A7282";
  document.getElementById("btn-4").style.color = "#6A7282";
  document.getElementById("btn-5").style.color = "#6A7282";

  document.getElementById("btn-1").style.borderBottom = "none";
  document.getElementById("btn-2").style.borderBottom = "3.5px solid #CE3C3D";
  document.getElementById("btn-3").style.borderBottom = "none";
  document.getElementById("btn-4").style.borderBottom = "none";
  document.getElementById("btn-5").style.borderBottom = "none";

  document.getElementById("desc1").style.zIndex = "1";
  document.getElementById("desc2").style.zIndex = "2";
  document.getElementById("desc3").style.zIndex = "1";
  document.getElementById("desc4").style.zIndex = "1";
  document.getElementById("desc5").style.zIndex = "1";
};

document.getElementById("btn-3").onclick = function () {
  document.getElementById("btn-1").style.color = "#6A7282";
  document.getElementById("btn-2").style.color = "#6A7282";
  document.getElementById("btn-3").style.color = "#CE3C3D";
  document.getElementById("btn-4").style.color = "#6A7282";
  document.getElementById("btn-5").style.color = "#6A7282";

  document.getElementById("btn-1").style.borderBottom = "none";
  document.getElementById("btn-2").style.borderBottom = "none";
  document.getElementById("btn-3").style.borderBottom = "3.5px solid #CE3C3D";
  document.getElementById("btn-4").style.borderBottom = "none";
  document.getElementById("btn-5").style.borderBottom = "none";

  document.getElementById("desc1").style.zIndex = "1";
  document.getElementById("desc2").style.zIndex = "1";
  document.getElementById("desc3").style.zIndex = "2";
  document.getElementById("desc4").style.zIndex = "1";
  document.getElementById("desc5").style.zIndex = "1";
};

document.getElementById("btn-4").onclick = function () {
  document.getElementById("btn-1").style.color = "#6A7282";
  document.getElementById("btn-2").style.color = "#6A7282";
  document.getElementById("btn-3").style.color = "#6A7282";
  document.getElementById("btn-4").style.color = "#CE3C3D";
  document.getElementById("btn-5").style.color = "#6A7282";

  document.getElementById("btn-1").style.borderBottom = "none";
  document.getElementById("btn-2").style.borderBottom = "none";
  document.getElementById("btn-3").style.borderBottom = "none";
  document.getElementById("btn-4").style.borderBottom = "3.5px solid #CE3C3D";
  document.getElementById("btn-5").style.borderBottom = "none";

  document.getElementById("desc1").style.zIndex = "1";
  document.getElementById("desc2").style.zIndex = "1";
  document.getElementById("desc3").style.zIndex = "1";
  document.getElementById("desc4").style.zIndex = "2";
  document.getElementById("desc5").style.zIndex = "1";
};

document.getElementById("btn-5").onclick = function () {
  document.getElementById("btn-1").style.color = "#6A7282";
  document.getElementById("btn-2").style.color = "#6A7282";
  document.getElementById("btn-3").style.color = "#6A7282";
  document.getElementById("btn-4").style.color = "#6A7282";
  document.getElementById("btn-5").style.color = "#CE3C3D";

  document.getElementById("btn-1").style.borderBottom = "none";
  document.getElementById("btn-2").style.borderBottom = "none";
  document.getElementById("btn-3").style.borderBottom = "none";
  document.getElementById("btn-4").style.borderBottom = "none";
  document.getElementById("btn-5").style.borderBottom = "3.5px solid #CE3C3D";

  document.getElementById("desc1").style.zIndex = "1";
  document.getElementById("desc2").style.zIndex = "1";
  document.getElementById("desc3").style.zIndex = "1";
  document.getElementById("desc4").style.zIndex = "1";
  document.getElementById("desc5").style.zIndex = "2";
};

const headlineText = document.getElementById("headlineText");
const headlineText2 = document.getElementById("headlineText2");
const imagePkg = document.getElementById("imagePkg");
const overviewTxt = document.getElementById("overviewTxt");
const tourTxt = document.getElementById("tourTxt");
const exclusionTxt = document.getElementById("exclusionTxt");
const inclusionTxt = document.getElementById("inclusionTxt");
const termsTxt = document.getElementById("termsTxt");

function PackageWithId() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("q"); // e.g. "kashmir-tour-packages"

  fetch(`${serverUrl}/v1/api/get-packeges/${slug}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log("Package data:", data.dataBySlug.headline);
      headlineText.innerText = data.dataBySlug.headline;
      headlineText2.innerText = data.dataBySlug.headline;
      imagePkg.style.backgroundImage = `url(${data.dataBySlug.featureImage})`;
      // Handle overview safely
      overviewTxt.innerText = data.dataBySlug.overview
        ? data.dataBySlug.overview
        : "No overview available";
      // Inclusions
      const validInclusions = (data.dataBySlug.inclusions || []).filter(
        (item) => item.trim() !== ""
      );
      inclusionTxt.innerText =
        validInclusions.length > 0
          ? validInclusions.join("\n")
          : "No inclusions available";

      // Exclusions
      const validExclusions = (data.dataBySlug.exclusions || []).filter(
        (item) => item.trim() !== ""
      );
      exclusionTxt.innerText =
        validExclusions.length > 0
          ? validExclusions.join("\n")
          : "No exclusions available";

      // Itinerary
      const validItinerary = (data.dataBySlug.itinerary || []).filter(
        (item) => item.trim() !== ""
      );
      tourTxt.innerText =
        validItinerary.length > 0
          ? validItinerary.join("\n")
          : "No tour itinerary available";

      // Handle termsAndConditions safely
      termsTxt.innerText = data.dataBySlug.termsAndConditions
        ? data.dataBySlug.termsAndConditions
        : "No termsAndConditions available";
      // you can now display data in your HTML
    })
    .catch((err) => console.error(err));
}

PackageWithId();

// package form data fetch
document
  .getElementById("page_enquiry_form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // 👇 add packageName from headlineText2
    data.packageName = document
      .getElementById("headlineText2")
      .innerText.trim();

    try {
      const res = await fetch(`${serverUrl}/v1/api/create-enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      // console.log(result);

      alert(result.message || "Form submitted successfully");

      // reset form
      this.reset();
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to submit enquiry");
    }
  });
