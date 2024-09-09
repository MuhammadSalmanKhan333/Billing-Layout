// Select DOM elements
const select = document.getElementById("selectPerson");
const billField = document.querySelector(".billField");
const tipOptions = document.querySelectorAll(".radio-input");
const selectPerson = document.querySelector("#selectPerson");
const baseAmountEl = document.querySelector(".base-amount");
const tipAmountEl = document.querySelector(".tip-amount");
const personNumberEl = document.querySelector(".person-number");
const totalAmountEl = document.querySelector(".total-amount");
const resetBtn = document.querySelector("#resettbn");

// Function to update the calculations
function calculateTotal() {
  // Get the bill total
  const billTotal = parseFloat(billField.value) || 0;

  // Get the selected tip percentage
  let selectedTipPercentage = 0;
  tipOptions.forEach((option) => {
    if (option.checked) {
      selectedTipPercentage = parseFloat(option.value);
    }
  });

  // Calculate tip amount
  const tipAmount = (billTotal * selectedTipPercentage) / 100;

  // Get the number of people to split by
  const splitBy = parseInt(selectPerson.value) || 1; // Default to 1 if not selected

  // Calculate total amount
  const totalAmount = billTotal + tipAmount;

  // Calculate per person share
  const perPersonAmount = totalAmount / splitBy;

  // Display the calculated values
  baseAmountEl.textContent = `$${billTotal.toFixed(2)}`;
  tipAmountEl.textContent = `$${tipAmount.toFixed(2)}`;
  personNumberEl.textContent = `$${perPersonAmount.toFixed(2)}`;
  totalAmountEl.textContent = `$${totalAmount.toFixed(2)}`;
}

// Event listeners
billField.addEventListener("input", calculateTotal);
tipOptions.forEach((option) =>
  option.addEventListener("change", calculateTotal)
);
selectPerson.addEventListener("change", calculateTotal);

for (let i = 1; i <= 20; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = `${i}`;
  select.appendChild(option);
}
