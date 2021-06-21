import { IData, IChart } from '../model/date.model'

const convertFetchedData = (dataObj: any) => {
  const metaData: IData = {
    symbol: dataObj[`Meta Data`][`2. Symbol`],
    timeZone: dataObj[`Meta Data`][`5. Time Zone`]
  }

  let chartDataArr: IChart[] = []

  Object.entries(dataObj[`Time Series (Daily)`]).slice(0).reverse().map(([key, value]: any) => {
    chartDataArr = [...chartDataArr, {
      date: key,
      open: value[`1. open`],
      high: value[`2. high`],
      low: value[`3. low`],
      close: value[`4. close`],
      volume: value[`5. volume`]
    }]
  }
    
  )
      
  return { meta: metaData, dataArr: chartDataArr }
}


export default convertFetchedData