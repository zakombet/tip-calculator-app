// Retrieve references to form elements
// Get references to form elements
const billInput = document.getElementById("BillInput");
const tipButtons = document.querySelectorAll(".btn-primary");
const customTipInput = document.getElementById("custom-tip-input");
const peopleInput = document.getElementById("NumberOfPeopleInput");
const tipAmountDisplay = document.getElementById("tip-amount-per-person-display");
const totalAmountDisplay = document.getElementById("total-amount-per-person-display");
const resetButton = document.querySelector(".btn-secondary");

// Function to calculate and update results
function calculateTip() {
    // Parse input values
    const bill = parseFloat(billInput.value) || 0;
    const people = parseInt(peopleInput.value) || 1;
    let tipPercentage = parseFloat(customTipInput.value);

    // If no custom tip is entered, get the selected button's value
    if (!tipPercentage || tipPercentage <= 0) {
        const selectedTipButton = document.querySelector(".btn-primary.active");
        tipPercentage = selectedTipButton ? parseFloat(selectedTipButton.value) : 0;
    }

    // Validate inputs
    if (bill <= 0 || people <= 0) {
        tipAmountDisplay.textContent = "$0.00";
        totalAmountDisplay.textContent = "$0.00";
        return;
    }

    // Calculate tip and total amounts
    const tipAmount = (bill * tipPercentage) / 100;
    const totalAmount = bill + tipAmount;
    const tipPerPerson = tipAmount / people;
    const totalPerPerson = totalAmount / people;

    // Update display
    tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
}

// Add event listeners
billInput.addEventListener("input", calculateTip);
customTipInput.addEventListener("input", () => {
    tipButtons.forEach((button) => button.classList.remove("active"));
    calculateTip();
});
peopleInput.addEventListener("input", calculateTip);

// Handle tip percentage button clicks
tipButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        // Remove active state from all buttons
        tipButtons.forEach((btn) => btn.classList.remove("active"));
        // Add active state to clicked button
        e.target.classList.add("active");
        // Clear custom input
        customTipInput.value = "";
        calculateTip();
    });
});

// Reset button functionality
resetButton.addEventListener("click", () => {
    billInput.value = "";
    customTipInput.value = "";
    peopleInput.value = "";
    tipButtons.forEach((button) => button.classList.remove("active"));
    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";
});
