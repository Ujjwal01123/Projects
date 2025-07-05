# Projects
This repository serves as a centralized hub for all my personal and academic projects. Here you'll find a diverse collection of my work, showcasing my skills and interests in various technologies and domains. Feel free to explore, provide feedback, or even contribute!

# 1. Project Name : Joke Danger Meter

## Joke Danger Meter
This repository features the Joke Danger Meter, an interactive web application designed for entertainment purposes to playfully assess the "risk" level of your jokes. It presents various joke categories, allows you to indicate their presence in your humor, and then calculates an arbitrary "chances of jail" percentage.

Disclaimer: This project is for entertainment purposes only and should not be taken seriously. Jokes are subjective, and legal consequences for humor vary widely by context and jurisdiction. Always exercise good judgment and be mindful of your audience!

## ✨ Features
Categorized Joke Types: A list of common joke categories (e.g., Dark Humor, Political, Offensive, Puns, Observational, Self-Deprecating, Sarcasm, Slapstick).

Intuitive Yes/No Interface: Simple selection for each joke type.

"Check Result" Button: Triggers the playful "danger" assessment.

"Chances of Jail" Output: Provides a percentage-based (and purely arbitrary) "risk" score.

## 💻 Technologies Used
HTML5

CSS3 (Tailwind CSS)

JavaScript

## 🚀 Getting Started
Clone the repository:

git clone https://github.com/Ujjwal01123/Projects

Navigate to the project directory:

cd projects/tree/main/joke%20danger%20meter 

Open index.html: Simply open the index.html file in your preferred web browser.

## 💡 Usage
Select "Yes" or "No" for each joke type that applies to your joke.

Click "Check Result" to see your playful "Chances of Jail" percentage.

Use the "Reset" option to clear selections and try again.

## 🛣️ Future Enhancements
More granular control over joke type intensity.

Humorous explanations for the score.

Shareable results.

User-defined joke types.

Improved UI/UX.

# 🤝 Contributing
Contributions are welcome! Please fork the repository, create a branch, make your changes, commit, push, and open a Pull Request.

#
#
#


# 2. Project Name : Currency Converter App

## Currency Converter App
This repository hosts a simple yet functional Currency Converter web application. It allows users to convert amounts between different currencies using real-time exchange rates fetched from an external API. Whether you're planning a trip, managing international finances, or just curious about exchange rates, this tool provides quick and easy conversions.

## ✨ Features
Real-time Exchange Rates: Fetches up-to-date currency exchange rates from a reliable API.

Multiple Currency Support: Allows conversion between a wide range of global currencies.

Intuitive User Interface: A clean and easy-to-use interface for selecting currencies and entering amounts.

Instant Conversion: Displays the converted amount as soon as the input or currency selection changes.

## ⚙️ How It Works (Conceptually)
The Currency Converter application works by:

User Input: Taking an amount and two currency codes (e.g., USD to EUR) from the user.

API Call: Making a fetch request to an external currency exchange rate API ( Note: You'll need to find a free and reliable API and potentially register for an API key.).

Data Retrieval: Receiving a JSON response containing the latest exchange rates.

Calculation: Using the fetched exchange rate to calculate the converted amount.

Display Result: Showing the calculated converted amount to the user.

## 💻 Technologies Used
HTML5: For structuring the web page content.

CSS3 (Tailwind CSS): For styling the application, ensuring a responsive and modern look.

JavaScript: For handling user input, making API calls, processing data, and dynamically updating the UI.

External API: An external service to provide real-time currency exchange rates.

## 🚀 Getting Started
To run the Currency Converter locally, follow these steps:

Clone the repository:

git clone https://github.com/Ujjwal01123/Projects

Navigate to the project directory:

cd projects/tree/main/currency-converter

Obtain an API Key (if required):

Find a free currency exchange rate API (e.g., ExchangeRate-API, Open Exchange Rates, Fixer.io).

Register on their website to obtain your API key.

You will need to integrate this API key into your JavaScript code where the API call is made.

Open index.html: Simply open the index.html file in your preferred web browser.

## 💡 Usage
Select the "From" currency from the first dropdown.

Enter the amount you wish to convert in the input field.

Select the "To" currency from the second dropdown.

The converted amount will be displayed automatically.

## 🛣️ Future Enhancements
Historical Data: Display charts or graphs of historical exchange rates.

Offline Support: Implement caching for basic functionality when offline.

Error Handling: More robust error handling for API failures or invalid inputs.

Visual Enhancements: Add animations or more polished design elements.

Currency Search/Filter: Allow users to search for currencies in the dropdowns.

Favorites: Let users save their most frequently used currency pairs.

## 🤝 Contributing
Contributions are welcome! If you have ideas for new features, bug fixes, or improvements, feel free to:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature-name).

Make your changes.

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature/your-feature-name).

Open a Pull Request.

#
#
#

# 3. Project Name : Image Compressor Project

## Image Compressor App
This repository contains the Image Compressor web application, a user-friendly tool designed to reduce the file size of images directly in your browser. With a focus on a clean and intuitive user interface, this app helps you optimize your images for web use, faster loading times, or simply to save storage space without significant loss in visual quality.

## ✨ Features
Client-Side Compression: All image processing happens directly in your browser, ensuring privacy and speed without uploading files to a server.

Intuitive User Interface: A clean, modern, and responsive design built with Tailwind CSS for an excellent user experience on any device.

Easy Image Upload: Simple drag-and-drop or file selection for uploading images.

Adjustable Quality (Conceptual): (If implemented) Allows users to control the compression level to balance file size and image quality.

Instant Preview: (If implemented) Shows a preview of the compressed image before download.

Download Compressed Image: Provides an easy way to download the optimized image.

## ⚙️ How It Works (Conceptually)
The Image Compressor application operates entirely on the client side:

User Upload: The user selects or drags and drops an image file into the application.

Canvas Rendering: The selected image is loaded onto an HTML <canvas> element.

Compression Logic: JavaScript code then re-renders the image from the canvas, typically reducing its quality or dimensions (or both) when converting it back to a data URL (e.g., JPEG or PNG format). This process effectively compresses the image.

Display & Download: The compressed image (or its size information) is displayed, and the user is provided with an option to download it.

## 💻 Technologies Used
HTML5: For the fundamental structure and content of the web page.

CSS3 (Tailwind CSS): For all styling, ensuring a responsive, modern, and aesthetically pleasing user interface.

JavaScript: For handling file input, image manipulation (using the Canvas API), compression logic, and dynamic UI updates.

## 🚀 Getting Started
To run the Image Compressor locally, follow these simple steps:

Clone the repository:

git clone https://github.com/Ujjwal01123/Projects

Navigate to the project directory:

cd projects/tree/main/img%20compressor

Open index.html: Simply open the index.html file in your preferred web browser.

That's it! The application should load directly in your browser, ready for use.

## 💡 Usage
Upload Image: Click the "Upload Image" button or drag and drop an image file into the designated area.

Adjust Settings (if applicable): If quality or dimension controls are available, adjust them to your preference.

View Compressed Image: The compressed image (or its details) will appear.

Download: Click the "Download Compressed Image" button to save the optimized file to your device.

## 🛣️ Future Enhancements
Batch Compression: Allow users to upload and compress multiple images simultaneously.

Format Selection: Provide options to convert images to different output formats (e.g., WebP, PNG, JPEG).

Resizing Options: Enable users to specify exact dimensions or percentage-based resizing.

Progress Indicator: Show a loading or progress bar during compression for larger files.

Drag-and-Drop Improvements: Enhance the drag-and-drop experience with visual feedback.

Advanced Settings: Offer more granular control over compression algorithms or metadata removal.

## 🤝 Contributing
Contributions are welcome! If you have ideas for new features, bug fixes, or improvements, feel free to:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature-name).

Make your changes.

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature/your-feature-name).

Open a Pull Request.
