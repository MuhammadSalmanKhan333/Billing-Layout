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
const billContainer = document.getElementById("bill-total");
const splitElement = document.querySelector(".split-total");
const form = document.querySelector(".billing-form");
const messageEl = document.createElement("p");
// Append the message element to the form
messageEl.classList.add("error-message");
messageEl.style.color = "red";
form.appendChild(messageEl);
messageEl.textContent = "";

// Function to update the calculations
function calculateTotal() {
  const billTotal = parseFloat(billField.value) || 0;

  if (billTotal === 0) {
    messageEl.textContent = "Please enter a value in the Bill Total field.";
    disableInputs(true); // Disable radio buttons and select field
    return;
  } else {
    messageEl.textContent = "";
    disableInputs(false);
  }
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

function disableInputs(disable) {
  tipOptions.forEach((option) => {
    option.disabled = disable;
  });

  let tipFields = document.querySelectorAll(".radio-label");
  tipFields.forEach((fields) => {
    fields.style.opacity = disable ? "0.5" : "1";
  });
  selectPerson.disabled = disable;
  if (selectPerson.disabled) {
    splitElement.style.setProperty("--after-opacity", 0.5);
  } else {
    splitElement.style.setProperty("--after-opacity", 1);
  }
}
// Event listeners
billField.addEventListener("input", calculateTotal);
tipOptions.forEach((option) =>
  option.addEventListener("change", calculateTotal)
);
selectPerson.addEventListener("change", calculateTotal);

// Reset button functionality
resetBtn.addEventListener("click", () => {
  document.getElementById("billingForm").reset();
  baseAmountEl.textContent = "$0.00";
  tipAmountEl.textContent = "$0.00";
  personNumberEl.textContent = "$0.00";
  totalAmountEl.textContent = "$0.00";
  disableInputs(true);
  messageEl.textContent = "";
});

for (let i = 1; i <= 20; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = `${i}`;
  select.appendChild(option);
}

disableInputs(true);
