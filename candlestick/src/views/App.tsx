import { extent, NumberValue } from 'd3'
import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Candle } from './components/CandlestickChart/Candle'

import CandlestickChartMine from './components/CandlestickChart/CandlestickChartMine'



import data from '../data/data.json'

const PADDING_HEIGHT = 20
const candles = data.slice(0, 40)

const getDomain = (rows: Candle[]): [number, number] => {
  const values = rows.map(({high, low}) => [high, low]).flat()
  return [Math.min(...values) - PADDING_HEIGHT, Math.max(...values) + PADDING_HEIGHT]
}


const domain = getDomain(candles)


const App = () => (
  <React.Fragment>
    <CandlestickChartMine {...{ candles, domain }} />
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
  </React.Fragment>
)

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
