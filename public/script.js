// Handle form submission
const form = document.getElementById('flight-search-form');
const resultsContainer = document.getElementById('search-results');
const tog = document.getElementById('tog');

// form.addEventListener('submit', function (e) {
//     returnDateInput.disabled = false;
//     // document.getElementById("return-date").reset();

// });


// JavaScript code to toggle the "disabled" attribute of the return date input
const tripTypeRadios = document.querySelectorAll('input[name="trip-type"]');
const returnDateInput = document.getElementById('return-date');

// Function to handle radio button change event
function handleTripTypeChange() {


    if (this.value === "One Way") {
        returnDateInput.disabled = true; // Disable if "One Way" is selected
        console.log("one way selected")
    } else {
        returnDateInput.disabled = false; // Enable for other options
    }

}

// Add change event listener to each radio button
tripTypeRadios.forEach(radio => {
    radio.addEventListener('change', handleTripTypeChange);
});

window.addEventListener('pageshow', function (event) {
    var form = document.getElementById('flight-search-form');
    form.reset();

    // Clear the radio buttons by unchecking all of them
    var radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(function (radio) {
        radio.checked = false;
    });
});

