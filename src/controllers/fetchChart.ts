
const fetchChart = async (symbol: string) => {
  const BASE_URL = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&datatype=json`

  try {
    const response: Response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        "x-rapidapi-key": `${process.env.REACT_APP_RAPID_API_KEY}`,
        "x-rapidapi-host": `${process.env.REACT_APP_RAPID_HOST}`
      }
    })
    return await response.json()

  } catch (err) {
    console.log('Error => ', err)
  }
}


export default fetchChart