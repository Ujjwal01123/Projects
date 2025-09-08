// ----------------- SEARCH SUGGESTIONS + ANIMATION -----------------
const serverUrl = "http://localhost:7000";

// texts and suggestions array for search input animation and text

// main.js
// import { API_URL } from "./config.js";
// console.log("Using server URL:", serverUrl);

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

// ----------------- HERO SLIDER -----------------
let currentIndex = 0;
const slides = document.querySelectorAll(".slide-image");
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  showSlide(currentIndex);
}

showSlide(currentIndex);
setInterval(nextSlide, 5000);

document.querySelector("#btn-2").addEventListener("click", nextSlide);
document.querySelector("#btn-1").addEventListener("click", prevSlide);

// ----------------- POPUP EXPERT -----------------
document.getElementById("expert").onclick = function () {
  document.getElementById("popup_expert").style.display = "flex";
  document.getElementById("formTitle").innerText = "Quick Enquiry";
  document.getElementById("black").style.display = "block";
  document.getElementById("black").style.visibility = "visible";
  document.getElementById("close").style.display = "block";
  document.getElementById("close").style.visibility = "visible";
};

document.getElementById("close").onclick = function () {
  document.getElementById("popup_expert").style.display = "none";
  document.getElementById("black").style.display = "none";
  document.getElementById("close").style.display = "none";
};

// Utility function to get width of first card, fallback to 220
function getCardWidth(selector) {
  const el = document.querySelector(selector);
  return el ? el.offsetWidth + 20 : 220;
}

// ----------------- HOLIDAY CATEGORY SLIDER -----------------
const cardContainer = document.getElementById("category-card");
const leftBtn = document.getElementById("left-button");
const rightBtn = document.getElementById("right-button");
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  const clone = card.cloneNode(true);
  cardContainer.appendChild(clone);
});
const cardWidth = getCardWidth(".card");

function scrollRight() {
  cardContainer.scrollBy({ left: cardWidth, behavior: "smooth" });
  if (cardContainer.scrollLeft >= cardContainer.scrollWidth / 2) {
    cardContainer.scrollTo({ left: 0, behavior: "instant" });
  }
}

function scrollLeft() {
  cardContainer.scrollBy({ left: -cardWidth, behavior: "smooth" });
  if (cardContainer.scrollLeft <= 0) {
    cardContainer.scrollTo({
      left: cardContainer.scrollWidth / 2,
      behavior: "instant",
    });
  }
}

rightBtn.addEventListener("click", () => {
  scrollRight();
  resetAutoScroll();
});

leftBtn.addEventListener("click", () => {
  scrollLeft();
  resetAutoScroll();
});

let autoScroll;
function startAutoScroll() {
  autoScroll = setInterval(scrollRight, 5000);
}
function resetAutoScroll() {
  clearInterval(autoScroll);
  startAutoScroll();
}
startAutoScroll();

// ----------------- HOLIDAY PACKAGE SLIDER -----------------
const packageContainer = document.getElementById("packages-card");
const leftPackageBtn = document.getElementById("left-package");
const rightPackageBtn = document.getElementById("right-package");
const packageCards = document.querySelectorAll(".pack-card");
packageCards.forEach((card) => {
  const clone = card.cloneNode(true);
  packageContainer.appendChild(clone);
});
const packageWidth = getCardWidth(".pack-card");

function scrollRightPackages() {
  packageContainer.scrollBy({ left: packageWidth, behavior: "smooth" });
  if (packageContainer.scrollLeft >= packageContainer.scrollWidth / 2) {
    packageContainer.scrollTo({ left: 0, behavior: "instant" });
  }
}
function scrollLeftPackages() {
  packageContainer.scrollBy({ left: -packageWidth, behavior: "smooth" });
  if (packageContainer.scrollLeft <= 0) {
    packageContainer.scrollTo({
      left: packageContainer.scrollWidth / 2,
      behavior: "instant",
    });
  }
}

rightPackageBtn.addEventListener("click", () => {
  scrollRightPackages();
  resetAutoScrollPackages();
});

leftPackageBtn.addEventListener("click", () => {
  scrollLeftPackages();
  resetAutoScrollPackages();
});

let autoScrollPackages;
function startAutoScrollPackages() {
  autoScrollPackages = setInterval(scrollRightPackages, 3000);
}
function resetAutoScrollPackages() {
  clearInterval(autoScrollPackages);
  startAutoScrollPackages();
}
startAutoScrollPackages();

// ----------------- DESTINATION SLIDER -----------------
const destinationContainer = document.getElementById("destination-slider");
const leftDestinationBtn = document.getElementById("left-destionation");
const rightDestinationBtn = document.getElementById("right-destionation");
const destinationCards = document.querySelectorAll(".destination-card");
destinationCards.forEach((card) => {
  const clone = card.cloneNode(true);
  destinationContainer.appendChild(clone);
});
const destinationWidth = getCardWidth(".destination-card");

function scrollRightDestination() {
  destinationContainer.scrollBy({ left: destinationWidth, behavior: "smooth" });
  if (destinationContainer.scrollLeft >= destinationContainer.scrollWidth / 2) {
    destinationContainer.scrollTo({ left: 0, behavior: "instant" });
  }
}

function scrollLeftDestination() {
  destinationContainer.scrollBy({
    left: -destinationWidth,
    behavior: "smooth",
  });
  if (destinationContainer.scrollLeft <= 0) {
    destinationContainer.scrollTo({
      left: destinationContainer.scrollWidth / 2,
      behavior: "instant",
    });
  }
}

rightDestinationBtn.addEventListener("click", () => {
  scrollRightDestination();
  resetAutoScrollDestination();
});

leftDestinationBtn.addEventListener("click", () => {
  scrollLeftDestination();
  resetAutoScrollDestination();
});

let autoScrollDestination;
function startAutoScrollDestination() {
  autoScrollDestination = setInterval(scrollRightDestination, 3000);
}
function resetAutoScrollDestination() {
  clearInterval(autoScrollDestination);
  startAutoScrollDestination();
}
startAutoScrollDestination();

// ----------------- BLOG SLIDER -----------------
const blogContainer = document.getElementById("blog-slider");
const leftBlogBtn = document.getElementById("left-travel");
const rightBlogBtn = document.getElementById("right-travel");
const blogCards = document.querySelectorAll(".blog-card");
blogCards.forEach((card) => {
  const clone = card.cloneNode(true);
  blogContainer.appendChild(clone);
});
const blogWidth = getCardWidth(".blog-card");

function scrollRightBlog() {
  blogContainer.scrollBy({ left: blogWidth, behavior: "smooth" });
  if (blogContainer.scrollLeft >= blogContainer.scrollWidth / 2) {
    blogContainer.scrollTo({ left: 0, behavior: "instant" });
  }
}

function scrollLeftBlog() {
  blogContainer.scrollBy({ left: -blogWidth, behavior: "smooth" });
  if (blogContainer.scrollLeft <= 0) {
    blogContainer.scrollTo({
      left: blogContainer.scrollWidth / 2,
      behavior: "instant",
    });
  }
}

rightBlogBtn.addEventListener("click", () => {
  scrollRightBlog();
  resetAutoScrollBlog();
});

leftBlogBtn.addEventListener("click", () => {
  scrollLeftBlog();
  resetAutoScrollBlog();
});

let autoScrollBlog;
function startAutoScrollBlog() {
  autoScrollBlog = setInterval(scrollRightBlog, 3000);
}
function resetAutoScrollBlog() {
  clearInterval(autoScrollBlog);
  startAutoScrollBlog();
}
startAutoScrollBlog();

// ----------------- API CALLS -----------------
async function mainApiCall() {
  try {
    const response = await fetch(`${serverUrl}/v1/api/get-packeges`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    const Data = data.data;
    const mainCard = document.getElementById("hero-section");

    Data.forEach((data) => {
      if (data.showInSlider === "Yes") {
        let html = `
          <div class="slide-image" style="background-image: url(${data.featureImage});">
            <div class="slide-card">
              <h1>${data.headline}</h1>
              <h3>${data.days}</h3>
              <p>₹${data.bestPrice} 
                <span style="text-decoration: line-through; color: #cccccc; font-weight: 400;">
                  ₹${data.maxPrice}
                </span>
              </p>
            </div>
          </div>
        `;
        mainCard.insertAdjacentHTML("beforeend", html);
      }
    });

    initHeroSlider();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function initHeroSlider() {
  let currentIndex = 0;
  const slides = document.querySelectorAll(".slide-image");
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  }

  showSlide(currentIndex);
  setInterval(nextSlide, 5000);

  document.querySelector("#btn-2").addEventListener("click", nextSlide);
  document.querySelector("#btn-1").addEventListener("click", prevSlide);
}

async function categoryApiCall() {
  try {
    const response = await fetch(`${serverUrl}/v1/api/get-category`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    const Data = data.data;
    const categoryCard = document.getElementById("category-card");
    Data.forEach((data) => {
      // console.log(data._id);
      // const id = data._id;
      let html = `
    <div class="card">
      <div class="img-card" style="background-image: url(${data.image});" onclick="window.open('Holiday_Category/category.html?q=${data.Slug}','_self')"></div>
      <h2 class="card-name" onclick="window.open('Holiday_Category/category.html?q=${data.Slug}','_self')">${data.categoryName}</h2>
      <div class="call-request">
        <img src="https://img.icons8.com/?size=100&id=2olGSGqpqGWD&format=png&color=d13c3d" alt="Call">
        <button onclick="categoryCardOpen('${data.Slug}')">Request Callback</button>
      </div>
    </div>
    
    `;
      categoryCard.insertAdjacentHTML("beforeend", html);
    });
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

async function holidayApiCall() {
  try {
    const response = await fetch(`${serverUrl}/v1/api/get-packeges`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    const Data = data.data;
    const holidayCard = document.getElementById("packages-card");
    Data.forEach((data) => {
      let html = `
                        <div class="pack-card">
                        <div class="pack-img" id="package-img1" style="background-image: url(${data.featureImage});" onclick="window.open('Holiday_Packages/package.html?q=${data.slug}','_self')"></div>
                        <h3 class="pack-name" onclick="window.open('Holiday_Packages/package.html?q=${data.slug}','_self')">${data.headline}</h3>
                        <div class="time" onclick="window.open('Holiday_Packages/package.html?q=${data.slug}','_self')">
                            <img src="icon/clock.png" alt="Clock">
                            <p>${data.days}</p>
                        </div>
                        <div class="location onclick="window.open('Holiday_Packages/package.html?q=${data.slug}','_self')"
                            <img src="icon/location.png" alt="Location">
                            <p>${data.location}</p>
                        </div>
                        <div class="box" onclick="window.open('Holiday_Packages/package.html?q=${data.slug}','_self')">
                            <div class="sub-box">
                                <p>${data.bestPrice}</p>
                            </div>
                            <div class="sub-box">
                                <p style="color: #a4a4a4; font-weight: 500;">View More</p>
                            </div>
                        </div>
                        <div class="call-request-1">
                            <img src="https://img.icons8.com/?size=100&id=2olGSGqpqGWD&format=png&color=d13c3d"
                                alt="Call">
                            <button onclick="categoryCardOpen('${data.Slug}')">Request Callback</button>
                        </div>
                    </div>
    `;
      holidayCard.insertAdjacentHTML("beforeend", html);
    });
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

async function destinationApiCall() {
  try {
    const response = await fetch(`${serverUrl}/v1/api/get-destination`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    const Data = data.data;
    const destinationCard = document.getElementById("destination-slider");
    Data.forEach((data) => {
      let html = `
                   <div class="destination-card" id="des-card-1" onclick="window.open('Popular_Destinations/destination.html?q=${data.slug}','_self')">
                        <div class="card-content">
                            <img src=${data.image} alt="Srinagar">
                            <div class="blackgrd"></div>
                            <h3>${data.metaTitle}</h3>
                            <p>${data.metaDescription}</p>
                        </div>
                    </div>
    `;
      destinationCard.insertAdjacentHTML("beforeend", html);
    });
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

async function blogApiCall() {
  try {
    const response = await fetch(`${serverUrl}/v1/api/get-blog`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    const Data = data.data;
    const blogCard = document.getElementById("blog-slider");
    Data.forEach((data) => {
      let html = `
                  <div class="blog-card" id="des-card-1" onclick="window.open('Travel_Blogs/travel.html?q=${data.slug}','_self')">
                        <div class="travel-card">
                            <img src="${data.image}" alt="Kashmir Tour">
                            <div class="blackgrd"></div>
                            <h3>${data.title}</h3>
                        </div>
                    </div>
    `;
      blogCard.insertAdjacentHTML("beforeend", html);
    });
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

mainApiCall();
categoryApiCall();
holidayApiCall();
destinationApiCall();
blogApiCall();

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
//
// ----------------- POPUP REQUEST -----------------

function categoryCardOpen(slug) {
  document.getElementById("popup_expert").style.display = "flex";
  document.getElementById("formTitle").innerText = "Request Callback";
  document.getElementById("close").style.display = "block";
  document.getElementById("close").style.visibility = "visible";
}

document.getElementById("close").onclick = function () {
  document.getElementById("popup_expert").style.display = "none";
  document.getElementById("black").style.display = "none";
  document.getElementById("close").style.display = "none";
};

// }
// ----------------- POPUP EXPERT -----------------
