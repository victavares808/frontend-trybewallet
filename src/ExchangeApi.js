async function exchangeData() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const requestData = await fetch(url);
  const responseData = await requestData.json();
  return responseData;
}

export async function moneySpecific(moeda) {
  const url = `https://economia.awesomeapi.com.br/json/last/${moeda}`;
  const request = await fetch(url);
  const response = request.json();
  return response;
}

export default exchangeData;
