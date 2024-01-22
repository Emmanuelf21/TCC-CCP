// Assuming you have a dropdown element with ID "configDropdown"
const configDropdown = document.getElementById("configDropdown");
const body = document.body; // Using document.body to represent the body element

// Event listener for the dropdown change
configDropdown.addEventListener("change", () => {
  // Get the selected font value
  const selectedFont = configDropdown.value;

  // Apply the selected font to the body
  body.style.fontFamily = selectedFont;

  // Apply the selected font to all headers
  const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  headers.forEach(header => {
    header.style.fontFamily = selectedFont;
  });
});
