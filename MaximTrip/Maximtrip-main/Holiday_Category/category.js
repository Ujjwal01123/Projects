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

        // console.log("Selected slug:", item.slug);
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

const toggleBtn = document.getElementById("toggleBtn");
const descText = document.getElementById("descText");
const main = document.querySelector("main");

let expanded = false;

toggleBtn.addEventListener("click", function () {
  if (!expanded) {
    main.style.gridTemplateRows = "70px 3050px repeat(5, 300px) 700px";
    descText.style.height = "2900px";
    toggleBtn.textContent = "Read Less <";
    expanded = true;
  } else {
    main.style.gridTemplateRows = "70px 250px repeat(5, 300px) 700px";
    descText.style.height = "120px";
    toggleBtn.textContent = "Read More >";

    expanded = false;
  }
});

//

const categoryHead = document.getElementById("categoryHead");
const mainImage = document.getElementById("mainImage");
const mainTab = document.getElementById("mainTab");
const faqs = document.getElementById("faqs");
const maxPrice = document.getElementById("maxPrice");
const priceRange = document.getElementById("range-ber");
const mainCard = document.getElementById("packages");
const noResult = document.querySelector(".no_result");

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
}

function getCategory() {
  // Get slug from URL
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("q"); // e.g. "kashmir-tour-packages"

  fetch(`${serverUrl}/v1/api/get-category/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const category = data.dataBySlug;

      // adding meta title and description
      fetchPageData(category.metaTitle, category.metaDiscription);

      window.currentCategory = category.categoryName;
      mainTab.innerText = category.categoryName;

      categoryHead.innerHTML = `${category.categoryName} 
        <span style="color:#E7000B; font-size: 12px; font-weight: 400;">
          <pre>5 Packages</pre>
        </span>`;

      categoryHead.style.fontSize = "20px";
      descText.innerHTML = category.detail;
      mainImage.src = category.image;
      mainImage.alt = category.categoryName;
      faqs.innerHTML = category.subcategoryFAQ;

      mainApiCall();
    })
    .catch((error) => {
      console.error("Error fetching category data:", error);
    });
}

async function mainApiCall() {
  try {
    const response = await fetch(`${serverUrl}/v1/api/get-packeges`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    // keep all packages in memory
    window.allPackages = data.data.filter(
      (pkg) =>
        pkg.isActive === true &&
        pkg.packageCategory?.toLowerCase() ===
          window.currentCategory?.toLowerCase()
    );

    // 👉 update number of packages dynamically
    const count = window.allPackages.length;
    categoryHead.innerHTML = `${window.currentCategory} 
      <span style="color:#E7000B; font-size: 12px; font-weight: 400;">
        ${count} Package${count !== 1 ? "s" : ""}
      </span>`;

    // set slider max dynamically (default 25000 if no valid price)
    const prices = window.allPackages.map((p) => p.bestPrice).filter(Boolean);
    const highest = prices.length ? Math.max(...prices) : 25000;

    priceRange.max = highest;
    priceRange.value = highest;
    maxPrice.textContent = highest;

    renderPackages(window.allPackages);
    setupFilters();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function renderPackages(packages) {
  mainCard.innerHTML = "";
  if (!packages.length) {
    noResult.style.visibility = "visible";
    noResult.innerHTML = "<p>No packages match your filters.</p>";
    return;
  }
  noResult.style.visibility = "hidden";

  packages.forEach((pkg) => {
    const ratingValue = parseInt(pkg.rating.trim(), 10) || 0;
    const stars = "⭐".repeat(ratingValue) + "☆".repeat(5 - ratingValue);
    // console.log(pkg.slug);

    let html = `
      <section class="pack pack-1">
        <div class="image" style="background-image: url(${pkg.featureImage});"></div>
        <div class="img-detail">
          <div class="detail">
            <div class="detail-heading">
              <h3>${pkg.headline}</h3>
              <p>${pkg.days}</p>
            </div>
            <div class="location">
              <img src="icon/red-location.png" alt>
              <p>${pkg.location}</p>
            </div>
            <div class="rating"><p>${stars}</p></div>
            <div class="route"><p>${pkg.cityRoute}</p></div>
            <div class="feature">
              <div class="feature">
                  <div class="features" onclick="showDetail('${pkg.slug}', 'highlights')">
                      <img src="icon/sun.png"><p>Highlights</p>
                  </div>
                  <div class="features" onclick="showDetail('${pkg.slug}', 'meals')">
                    <img src="icon/coffee.png"><p>Meals</p>
                  </div>
                  <div class="features" onclick="showDetail('${pkg.slug}', 'transfer')">
                    <img src="icon/car.png"><p>Transfer</p>
                  </div>
                  <div class="features" onclick="showDetail('${pkg.slug}', 'hotel')">
                    <img src="icon/home.png"><p>Hotel</p>
                  </div>
                  <div class="features" onclick="showDetail('${pkg.slug}', 'sightseeing')">
                    <img src="icon/eye.png"><p>Sightseeing</p>
                  </div>

              </div>
            </div>
          </div>
          <div class="price">
            <h1>₹${pkg.bestPrice}</h1>
            <p>per person</p>
            <button class="select" onclick="window.open('../Holiday_Packages/package.html?q=${pkg.slug}','_self')">Select</button>
            <button class="equire" onclick="categoryCardOpen('${pkg.headline}')">Enquire Now</button>
          </div>
          </div>
          </section>
          <div id="subButton-${pkg.slug}" class="subButton"></div>

    `;
    mainCard.innerHTML += html;
  });
}

function showDetail(slug, type) {
  const subBtn = document.getElementById(`subButton-${slug}`);
  if (!subBtn) return;

  // 1. Close all other open subButtons
  document.querySelectorAll(".subButton.open").forEach((el) => {
    if (el !== subBtn) {
      el.classList.remove("open");
      setTimeout(() => {
        el.innerHTML = "";
      }, 500); // match animation time
    }
  });

  // 2. If this one is already open → close it
  if (subBtn.classList.contains("open")) {
    subBtn.classList.remove("open");
    setTimeout(() => {
      subBtn.innerHTML = "";
    }, 500);
    return;
  }

  // 3. Otherwise → fetch content and open
  fetch(`${serverUrl}/v1/api/get-packeges/${slug}`)
    .then((response) => response.json())
    .then((data) => {
      const pkg = data.dataBySlug;
      let content = "";

      if (type === "highlights") {
        content = pkg.highlights || "<p>No highlights available.</p>";
      } else if (type === "meals") {
        content = pkg.meals || "<p>No meals info available.</p>";
      } else if (type === "transfer") {
        content = pkg.transfer || "<p>No transfer info available.</p>";
      } else if (type === "hotel") {
        content = pkg.hotel || "<p>No hotel info available.</p>";
      } else if (type === "sightseeing") {
        content = pkg.sightseeing || "<p>No sightseeing info available.</p>";
      }

      subBtn.innerHTML = content;

      // Force reflow before adding "open" to trigger animation
      subBtn.offsetHeight;
      subBtn.classList.add("open");
    })
    .catch((err) => {
      console.error("Error fetching details:", err);
      subBtn.innerHTML = "<p>Error loading details.</p>";
      subBtn.offsetHeight;
      subBtn.classList.add("open");
    });
}

//

function setupFilters() {
  // attach event listeners
  priceRange.addEventListener("input", () => {
    maxPrice.textContent = priceRange.value;
    applyFilters();
  });

  document
    .querySelectorAll(".filter input[type=checkbox]")
    .forEach((cb) => cb.addEventListener("change", applyFilters));
}

function applyFilters() {
  let filtered = window.allPackages.slice();

  const max = parseInt(priceRange.value);

  // duration checkboxes
  const durationSelected = Array.from(
    document.querySelectorAll(".checkpoint label input")
  )
    .filter((cb) => cb.checked && cb.parentElement.innerText.includes("Nights"))
    .map((cb) => cb.parentElement.innerText.trim());

  // stars checkboxes
  const starsSelected = Array.from(
    document.querySelectorAll(".checkpoint label input")
  )
    .filter((cb) => cb.checked && cb.parentElement.innerText.includes("Star"))
    .map((cb) => parseInt(cb.parentElement.innerText));

  // route checkboxes
  const routeSelected = Array.from(
    document.querySelectorAll(".checkpoint label input")
  )
    .filter((cb) => cb.checked && cb.parentElement.innerText.includes("to"))
    .map((cb) => cb.parentElement.innerText.split("(")[0].trim());

  // location checkboxes
  const locationSelected = Array.from(
    document.querySelectorAll(".checkpoint label input")
  )
    .filter(
      (cb) =>
        cb.checked &&
        (cb.parentElement.innerText.includes("Kashmir") ||
          cb.parentElement.innerText.includes("Jammu"))
    )
    .map((cb) => cb.parentElement.innerText.split("(")[0].trim());

  filtered = filtered.filter((pkg) => {
    const priceOk = pkg.bestPrice <= max;

    let durationOk = true;
    if (durationSelected.length) {
      durationOk = durationSelected.some((d) => {
        return (
          (d.includes("2 Nights 3 Days") &&
            pkg.days.includes("3 Days") &&
            pkg.days.includes("2 Nights")) ||
          (d.includes("3 Nights 4 Days") &&
            pkg.days.includes("4 Days") &&
            pkg.days.includes("3 Nights")) ||
          (d.includes("4 Nights 5 Days") &&
            pkg.days.includes("5 Days") &&
            pkg.days.includes("4 Nights")) ||
          (d.includes("5 Nights 6 Days") &&
            pkg.days.includes("6 Days") &&
            pkg.days.includes("5 Nights")) ||
          (d.includes("6 Nights 7 Days") &&
            pkg.days.includes("7 Days") &&
            pkg.days.includes("6 Nights")) ||
          (d.includes("7 Nights 8 Days") &&
            pkg.days.includes("8 Days") &&
            pkg.days.includes("7 Nights"))
        );
      });
    }

    const starsOk = starsSelected.length
      ? starsSelected.includes(parseInt(pkg.rating.trim(), 10) || 0)
      : true;

    const routeOk = routeSelected.length
      ? routeSelected.includes(pkg.cityRoute)
      : true;

    const locationOk = locationSelected.length
      ? locationSelected.includes(pkg.location)
      : true;

    return priceOk && durationOk && starsOk && routeOk && locationOk;
  });

  renderPackages(filtered);
}

// Start flow
getCategory();

const pkgBox = document.getElementById("packages");
if (pkgBox.length === 0) {
  pkgBox.innerHTML = `<h1>No packages found in this category.</h1>`;
}

// popup form submission
// // ----------------- POPUP FORM -----------------

document
  .getElementById("popup_expert")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // stop page reload

    const formData = new FormData(this);

    // convert to plain JS object
    const data = Object.fromEntries(formData.entries());

    // 👇 Add h2 innerText as packageName
    data.packageName = this.querySelector("h2").innerText;

    try {
      const res = await fetch(`${serverUrl}/v1/api/create-enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      // console.log(result);

      alert(result.message || "Form submitted successfully");
      document.getElementById("popup_expert").style.display = "none";
      document.getElementById("black").style.display = "none";
      document.getElementById("close").style.display = "none";
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to submit enquiry");
    }
  });

//
//
//

// popup form event
function categoryCardOpen(name) {
  document.getElementById("popup_expert").style.display = "flex";
  document.getElementById("formTitle").innerText = name;
  document.getElementById("close").style.display = "block";
  document.getElementById("close").style.visibility = "visible";
}

document.getElementById("close").onclick = function () {
  document.getElementById("popup_expert").style.display = "none";
  document.getElementById("black").style.display = "none";
  document.getElementById("close").style.display = "none";
};
