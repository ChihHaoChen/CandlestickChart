import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ResizeObserver from 'resize-observer-polyfill'
import { select, Selection, BaseType, scaleLinear, scaleBand, axisLeft, axisBottom } from 'd3'
import { Candle as CandleModel} from './Candle'


interface CandleChartProps {
  candles: CandleModel[]
  domain: [number, number]
}


const useResizeObserver = (ref: any) => {
  const [dimensions, setDimensions] = useState<DOMRectReadOnly | null>(null);
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => setDimensions(entry.contentRect));
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};


const CandlestickChartMine = ({ candles, domain }: CandleChartProps) => {

  const svgRef = useRef<SVGSVGElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const dimensions = useResizeObserver(wrapperRef)

  // const dimensions = { width: 1920, height: 1080}

  //const [selection, setSelection] = useState<null | Selection<SVGSVGElement | null, unknown, null, undefined>>(null)
  const svg = select(svgRef.current)
  // const [data, _] = useState(candles)

  useEffect(() => {
    if (!dimensions) return

    const scaleY = scaleLinear()
    .domain(domain)
    .range([dimensions.height, 0])
    .clamp(true)
  
    const yAxis: any = axisLeft(scaleY)
      .tickFormat(d => `$${d}`)
    
    
    const x = scaleBand()
      .domain(candles.map(d => d.date))
      .range([0, dimensions.width])
      .paddingInner(0.5)
    
    const xAxis: any = axisBottom(x)

    const width = dimensions.width / candles.length

    svg
      .selectAll('line')
      .data(candles)
      .join('line')
      .attr('width', x.bandwidth)
      .attr('x1', (_, index) => (index + 0.5) * width)
      .attr('y1', d => scaleY(d.low))
      .attr('x2', (_, index) => (index + 0.5) * width)
      .attr('y2', d => scaleY(d.high))
      .style('stroke', d => d.open < d.close ? ' #01b61a ' : 'red')
      
    svg
      .selectAll('rect')
      .data(candles)
      .join('line')
      .attr('width', x.bandwidth)
      .attr('x1', (_, index) => (index + 0.5) * width)
      .attr('y1', d => scaleY(d.open))
      .attr('x2', (_, index) => (index + 0.5) * width)
      .attr('y2', d => scaleY(d.close))
      .style('stroke', d => d.open < d.close ? ' #01b61a ' : 'red')
      .style('stroke-width', width*0.5)
  
      svg
      .selectAll('.x-axis')
      .data([true])
      .join('g')
      .style("transform", `translateY(${dimensions.height}px)`)
      .attr('class', 'x-axis')
      .call(xAxis)
  
    svg
      .selectAll('.y-axis')
      .join('g')
      // .attr("transform", `translate(${dimensions.width}px, 0)`)
      .attr('class', 'y-axis')
      .call(yAxis)    
   
  }, [candles, dimensions, domain, svg])

  return (
    <StyledChartWrapper ref={wrapperRef}>
      <StyledSVG ref={svgRef} >
        <g className="x-axis" />
        <g className="y-axis" />
      </StyledSVG>
    </StyledChartWrapper>
  )
}

export default CandlestickChartMine


const StyledChartWrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  display: block;
  height: 1080px;
  width: 1920px;
`

const StyledSVG = styled.svg`
  background: #eee;
  overflow: visible;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
`