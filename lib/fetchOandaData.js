export async function getOandaPrices() {
  const accountId = 'YOUR_ACCOUNT_ID';  // replace with your account ID
  const apiKey = 'YOUR_API_KEY';        // replace with your API key
  const instruments = 'EUR_USD,USD_JPY,GBP_USD,USD_CHF,AUD_USD,CAD_USD,NZD_USD,USD_JPY,USD_CAD'; // Add more if needed

  const url = `https://api-fxpractice.oanda.com/v3/accounts/${accountId}/pricing?instruments=${instruments}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
