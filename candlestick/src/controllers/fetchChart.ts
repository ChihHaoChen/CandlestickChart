import { IData, IChart } from '../model/date.model'
import convertFetchedData from '../utils/convertFetchedData'
import data from '../data/msft_response.json'


const fetchChart = async () => {
  const BASE_URL = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=compact&datatype=json`

  try {
    const response: Response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        "x-rapidapi-key": `${process.env.REACT_APP_RAPID_API_KEY}`,
        "x-rapidapi-host": `${process.env.REACT_APP_RAPID_HOST}`
      }
    })

    const data = await response.json()

    return data
    // const dataConvereted = await convertFetchedData(data)

    // return dataConvereted

  } catch (err) {
    console.log('Error => ', err)
  }
}


export default fetchChart