// Get references to HTML elements
const currentDateParagraph = document.getElementById("current-date");
const dateOptionsSelectElement = document.getElementById("date-options");

// Get current date and time components
const date = new Date();
const day = date.getDate(); // Get day of the month
const month = date.getMonth() + 1; // Get month (Note: January is 0)
const year = date.getFullYear(); // Get full year
const hours = date.getHours(); // Get hours (24-hour format)
const minutes = date.getMinutes(); // Get minutes

// Format the current date as "day-month-year"
const formattedDate = `${day}-${month}-${year}`;
// Display the formatted date in the paragraph
currentDateParagraph.innerText = formattedDate;

// Add event listener to the dropdown for changes
dateOptionsSelectElement.addEventListener("change", () => {
  // Switch based on the selected option's value
  switch (dateOptionsSelectElement.value) {
    // If "yyyy-mm-dd" option is selected
    case "yyyy-mm-dd":
      // Reverse the order of day, month, and year and display in paragraph
      currentDateParagraph.innerText = formattedDate
        .split("-")
        .reverse()
        .join("-");
      break;
    // If "mm-dd-yyyy-h-mm" option is selected
    case "mm-dd-yyyy-h-mm":
      // Display month, day, year, hours, and minutes in paragraph
      currentDateParagraph.innerText = `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`;
      break;
    // For any other option, display the default formatted date
    default:
      currentDateParagraph.textContent = formattedDate;
      break;
  }
});
