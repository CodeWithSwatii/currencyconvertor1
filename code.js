const currencyData = {
    "USD": "United States Dollar",
    "EUR": "Euro",
    "INR": "Indian Rupee",
    "GBP": "British Pound Sterling",
    "AUD": "Australian Dollar",
    "CAD": "Canadian Dollar",
    "SGD": "Singapore Dollar",
    "CHF": "Swiss Franc",
    "MYR": "Malaysian Ringgit",
    "JPY": "Japanese Yen",
    "CNY": "Chinese Yuan Renminbi",
    // ... (add more currencies as needed, up to 90)
};

const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');

// Populate currency dropdowns
for (const currencyCode in currencyData) {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.value = option2.value = currencyCode;
    option1.text = option2.text = `${currencyCode} - ${currencyData[currencyCode]}`;
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
}

// Currency conversion logic
convertBtn.addEventListener('click', () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = amount.value;
    if (amountValue === '' || isNaN(amountValue)) {
        result.innerText = "Please enter a valid amount.";
        return;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[to];
            const convertedAmount = (amountValue * rate).toFixed(2);
            result.innerText = `${amountValue} ${from} = ${convertedAmount} ${to}`;
        })
        .catch(error => {
            result.innerText = "Error fetching data. Please try again later.";
        });
});
