document.addEventListener("DOMContentLoaded", function() {
  // Initialize Flatpickr for departure and return dates
  flatpickr("#departure-date", {});
  flatpickr("#return-date", {});

  // Handle trip type selection (One Way, Round Trip, Multi City)
  const tripButtons = document.querySelectorAll(".trip-btn");
  const returnDateGroup = document.querySelector(".return-date-group");
  
  tripButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Deactivate all trip type buttons
      tripButtons.forEach(btn => btn.classList.remove("active"));
      
      // Activate the clicked button
      button.classList.add("active");

      // Toggle the visibility of the return date input based on selected trip type
      returnDateGroup.style.display = button.dataset.type === "round-trip" ? "block" : "none";
    });
  });

  // Handle swapping "From" and "To" inputs
  const swapButton = document.getElementById("swap-btn");
  const fromInput = document.getElementById("from");
  const toInput = document.getElementById("to");
  
  swapButton.addEventListener("click", () => {
    const temp = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = temp;
  });

  // Handle form submission
  const flightSearchForm = document.getElementById("flight-search-form");
  flightSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get selected trip type and form input values
    const tripType = document.querySelector(".trip-btn.active").dataset.type;
    const from = fromInput.value;
    const to = toInput.value;
    const departureDate = document.getElementById("departure-date").value;
    const returnDate = document.getElementById("return-date").value;
    const travelers = document.getElementById("travelers").value;
    const travelClass = document.getElementById("class").value;

    // Validate required fields
    if (!from || !to || !departureDate) {
      alert("Please fill in all required fields.");
      return;
    }

    // If round trip, validate return date
    if (tripType === "round-trip" && !returnDate) {
      alert("Please select a return date for round trips.");
      return;
    }

    // Output search criteria for demonstration
    alert(`Searching for ${tripType} flights from ${from} to ${to} on ${departureDate}${returnDate ? `, returning on ${returnDate}` : ''} with ${travelers} traveler(s) in ${travelClass} class.`);
  });
});
