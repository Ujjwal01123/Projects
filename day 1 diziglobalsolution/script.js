// Get the buttons and the mobile menu overlay
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const mobileMenu = document.getElementById("mobile-menu");

// Function to open the mobile menu
function openMenu() {
  mobileMenu.classList.add("active");
}

// Function to close the mobile menu
function closeMenu() {
  mobileMenu.classList.remove("active");
}

// Add event listeners to the buttons
menuBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);

// Optional: Close the menu if a link is clicked
const mobileLinks = mobileMenu.querySelectorAll("a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});
