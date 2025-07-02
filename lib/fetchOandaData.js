export async function getOandaPrices() {
  const accountId = '101-004-24967441-004';  // replace with your account ID
  const apiKey = '794a86b4a02c0aa8ac03a5ab6f7b5877-5c5334db95f75e0258b7f7d02e0b1f3a
';        // replace with your API key
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
