import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Candle } from './components/CandlestickChart/Candle'
import { IChart, IData, IChartArr } from '../model/date.model'
import convertFetchedData from '../utils/convertFetchedData'
import fetchChart from '../controllers/fetchChart'
import CandlestickChartMine from './components/CandlestickChart/CandlestickChartMine'



import data from '../data/msft_response.json'

const PADDING_HEIGHT = 20
// const candles = data

const getDomain = (rows: IChart[]): [number, number] => {
  const values = rows.map(({high, low}:any) => [high, low]).flat()
  return [Math.min(...values) - PADDING_HEIGHT, Math.max(...values) + PADDING_HEIGHT]
}


// const domain = getDomain(candles)


const App = () => {
  const [chartData, setChartData] = useState(data)
  const [chartCandles, setChartCandles] = useState(convertFetchedData(chartData))
  const [domain, setDomain] = useState<[number, number]>(getDomain(chartCandles['dataArr']))

  
  useEffect(() => {
    setChartCandles(convertFetchedData(chartData))
    setDomain(getDomain(chartCandles['dataArr']))
  }, [chartData])

  return (
    <>
      <CandlestickChartMine domain={domain} chartCandles={chartCandles} />
      <StyledButton>
        Update data
      </StyledButton>
      <StyledButton>
        Filter data
      </StyledButton>
      <StyledButton>
        Add data
      </StyledButton>
      <GlobalStyle />
    </>
  )
}

export default App;


const StyledButton = styled.button`
border: 1px solid black;
width: 100px;
margin: 0 auto 5px;
`

const GlobalStyle = createGlobalStyle`
  body {
    display: block;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    height: 1080px;
    padding: 0 50px;
  }
`
