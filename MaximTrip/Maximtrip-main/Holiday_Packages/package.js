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

function PackageWithId() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("q"); // e.g. "kashmir-tour-packages"

  fetch(`${serverUrl}/v1/api/get-packeges/${slug}`)
    .then((res) => res.json())
    .then((data) => {
      // Set meta title & description
      fetchPageData(data.dataBySlug.headline, data.dataBySlug.metaDescription);

      // Headline & Image
      headlineText.innerText = data.dataBySlug.headline;
      headlineText2.innerText = data.dataBySlug.headline;
      imagePkg.style.backgroundImage = `url(${data.dataBySlug.featureImage})`;

      // Overview
      overviewTxt.innerHTML = data.dataBySlug.overview
        ? data.dataBySlug.overview
        : "<p>No overview available</p>";

      // Inclusions
      if (data.dataBySlug.inclusions) {
        let inclusions = data.dataBySlug.inclusions;

        // If it's not an array, turn comma-separated string into array
        if (typeof inclusions === "string") {
          inclusions = inclusions.split(",");
        }

        inclusionTxt.innerHTML = `
    <ul>
      ${inclusions
        .map(
          (item) =>
            `<li style="color:#333; margin-bottom:5px; list-style:none;">
              <span style="color:green; font-weight:bold;">✔</span> ${item.trim()}
            </li>`
        )
        .join("")}
    </ul>
  `;
      } else {
        inclusionTxt.innerHTML = "<p>No inclusions available</p>";
      }

      // Exclusions
      if (data.dataBySlug.exclusions) {
        let exclusions = data.dataBySlug.exclusions;

        // If it's not an array, turn comma-separated string into array
        if (typeof exclusions === "string") {
          exclusions = exclusions.split(",");
        }

        exclusionTxt.innerHTML = `
    <ul>
      ${exclusions
        .map(
          (item) =>
            `<li style="color:#333; margin-bottom:5px; list-style:none;">
              <span style="color:red; font-weight:bold;">✘</span> ${item.trim()}
            </li>`
        )
        .join("")}
    </ul>
  `;
      } else {
        exclusionTxt.innerHTML = "<p>No exclusions available</p>";
      }

      // Itinerary (accordion style)
      if (
        Array.isArray(data.dataBySlug.itinerary) &&
        data.dataBySlug.itinerary.length > 0
      ) {
        tourTxt.innerHTML = data.dataBySlug.itinerary
          .map(
            (item, index) => `
      <details class="day-block" data-index="${index}">
        <summary>
          <span class="day-number">${index + 1}</span>
          <span class="day-title">${item.title}</span>
          <span class="arrow">&#9662;</span> <!-- ▼ Down arrow -->
        </summary>
        <div class="day-details">
          <p>${item.description}</p>
          ${
            item.activities && item.activities.length > 0
              ? `<p><strong>Activities:</strong> ${item.activities.join(
                  ", "
                )}</p>`
              : ""
          }
          ${
            item.meals && item.meals.length > 0
              ? `<p><strong>Meals:</strong> ${item.meals.join(", ")}</p>`
              : ""
          }
          ${
            item.accommodation
              ? `<p><strong>Accommodation:</strong> ${item.accommodation}</p>`
              : ""
          }
        </div>
      </details>
    `
          )
          .join("");

        // Accordion behavior: only one open at a time
        const allDetails = tourTxt.querySelectorAll("details");
        allDetails.forEach((detail) => {
          detail.addEventListener("toggle", () => {
            if (detail.open) {
              allDetails.forEach((other) => {
                if (other !== detail) other.removeAttribute("open");
              });
            }
          });
        });
      } else {
        tourTxt.innerHTML = "<p>No tour itinerary available</p>";
      }

      // Terms & Conditions
      termsTxt.innerHTML = data.dataBySlug.termsAndConditions
        ? data.dataBySlug.termsAndConditions
        : "<p>No terms and conditions available</p>";
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

//
//
// Get all buttons and description sections
const buttons = document.querySelectorAll(".title-section ul li button");
const descriptions = document.querySelectorAll(".description");

// Loop through buttons
buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    // Reset all buttons
    buttons.forEach((b) => {
      b.style.color = "#6A7282";
      b.style.borderBottom = "none";
    });

    // Highlight the active button
    btn.style.color = "#CE3C3D";
    btn.style.borderBottom = "3.5px solid #CE3C3D";

    // Hide all descriptions
    descriptions.forEach((desc) => {
      desc.style.display = "none";
    });

    // Show only the selected description
    descriptions[index].style.display = "block";
  });
});

// On page load, show only the first description (Overview)
if (descriptions.length > 0 && buttons.length > 0) {
  descriptions.forEach((desc) => (desc.style.display = "none")); // hide all
  descriptions[0].style.display = "block"; // show Overview
  buttons[0].style.color = "#CE3C3D"; // active color
  buttons[0].style.borderBottom = "3.5px solid #CE3C3D"; // active underline
}
