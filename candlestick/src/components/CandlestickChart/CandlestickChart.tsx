import { useRef, useEffect, useState } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import styled from 'styled-components'
import { select,Selection,  scaleLinear, scaleBand, max, axisLeft, axisBottom, ScaleLinear } from "d3";
import Candle, { Candle as CandleModel } from './Candle'


const useResizeObserver = (ref: any) => {
  const [dimensions, setDimensions] = useState<DOMRectReadOnly | null>(null);
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => { setDimensions(entry.contentRect) });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};


interface DimensionsProps {
  width: number
  height: number
}


interface CandleStickChartProps {
  candles: CandleModel[]
  domain: [number, number]
}


export let dimensionWidth: number, dimensionHeight: number


const CandlestickChart = ({ candles, domain }: CandleStickChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const dimensions = useResizeObserver(wrapperRef)

  let scaleY: ScaleLinear<number, number>;
  let scaleBody: ScaleLinear<number, number>;
  let width: number

  useEffect(() => {
    if (!dimensions) return
    
    width = dimensions.width / candles.length
    scaleY = scaleLinear().domain(domain).range([width, 0]);
    scaleBody = scaleLinear()
      .domain([0, Math.max(...domain) - Math.min(...domain)])
      .range([0, width]);
    
    
  }, [dimensions])
  
  
  
  return (
    <StyledChartWrapper ref={wrapperRef}>
      <StyledSVG ref={svgRef}>
      {/* {
          candles.map((candle, index) => (
            <Candle
              key={candle.date}
              {...{ candle, index, width, scaleY, scaleBody }}
            />
          ))
        } */}
      Test
      </StyledSVG>
    </StyledChartWrapper>
  )
}

export default CandlestickChart


const StyledChartWrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 90vh;
`

const StyledSVG = styled.svg`
  background: #eee;
  overflow: visible;
  display: block;
  width: 100%; 
`