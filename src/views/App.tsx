import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import convertFetchedData from '../utils/convertFetchedData'
// import getYDomain from '../utils/getYDomain'

import fetchChart from '../controllers/fetchChart'
import CandlestickChart from './components/CandlestickChart/CandlestickChart'


import data from '../data/msft_response.json'


const App = () => {
  const [chartData, setChartData] = useState(data)
  const [chartCandles, setChartCandles] = useState(convertFetchedData(chartData))
  // const [domain, setDomain] = useState<[number, number]>(getYDomain(chartCandles['dataArr']))
  const [stockSymbol, setStockSymbol] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event?.preventDefault()
    setStockSymbol(event.target.value)
  }
  
  useEffect(() => {
    setChartCandles(convertFetchedData(chartData))
    // setDomain(getYDomain(chartCandles['dataArr']))
  }, [chartData])

  return (
    <>
      <StyledLabel>{chartCandles['meta'].symbol}</StyledLabel>
      <CandlestickChart chartCandles={chartCandles} />
      <StyledInputDiv onChange={onChange}>
        <StyledInput />
        <StyledButton onClick={async () => {
          const data = await (fetchChart(stockSymbol))
          
          setChartData(data)
          // setChartCandles(convertFetchedData(chartData))
          // setDomain(getYDomain(chartCandles['dataArr']))
        }}>
          Search
        </StyledButton>
      </StyledInputDiv>
      <GlobalStyle />
    </>
  )
}

export default App;


const StyledButton = styled.button`
width: 100px;
height: 100%;
box-sizing: border-box;
cursor: pointer

`

const StyledLabel = styled.label`
  color: green;
  font-size: 1.5rem;
  width: 100px;
  height: auto;
  text-align: center;
  display: inline-flex;
  font-style: bold;
  margin-left: 25px;
`

const GlobalStyle = createGlobalStyle`
  body {
    display: block;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 0 50px;
  }
`

const StyledInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  height: 20px;
  width: 25%;
  margin-left: 1rem;
`

const StyledInput = styled.input`
  height: 100%;
  box-sizing: border-box;
  margin-right: 15px;
`