const amount = document.getElementById('amount');
const fromCurrency = document.getElementById('from');
const toCurrency = document.getElementById('to');
const convertBtn = document.getElementById('convert-btn');
const resultText = document.getElementById('result-text');

const API_KEY = '8e6c9e834230aa60319a433e'; // Your API key
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

let currencies = [];

// Fetch currencies from API
async function fetchCurrencies() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    currencies = Object.keys(data.conversion_rates);
    populateDropdowns();
  } catch (error) {
    console.error('Error fetching currencies:', error);
  }
}

// Populate dropdowns with currencies
function populateDropdowns() {
  currencies.forEach(currency => {
    const option1 = document.createElement('option');
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });
}

// Convert currency
async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amountValue = amount.value;

  if (!amountValue || amountValue < 0) {
    alert('Please enter a valid amount');
    return;
  }

  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amountValue}`);
    const data = await response.json();
    const result = data.conversion_result;
    resultText.textContent = `Result: ${result.toFixed(2)} ${to}`;
  } catch (error) {
    console.error('Error converting currency:', error);
  }
}

// Event Listeners
convertBtn.addEventListener('click', convertCurrency);

// Initialize
fetchCurrencies();