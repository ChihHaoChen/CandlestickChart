import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import convertFetchedData from '../utils/convertFetchedData'
import getYDomain from '../utils/getYDomain'

import fetchChart from '../controllers/fetchChart'
import CandlestickChart from './components/CandlestickChart/CandlestickChart'


import data from '../data/msft_response.json'


const App = () => {
  const [chartData, setChartData] = useState(data)
  const [chartCandles, setChartCandles] = useState(convertFetchedData(chartData))
  const [domain, setDomain] = useState<[number, number]>(getYDomain(chartCandles['dataArr']))

  
  useEffect(() => {
    setChartCandles(convertFetchedData(chartData))
    setDomain(getYDomain(chartCandles['dataArr']))
  }, [chartData])

  return (
    <>
      <CandlestickChart domain={domain} chartCandles={chartCandles} />
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
