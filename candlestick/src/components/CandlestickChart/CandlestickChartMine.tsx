import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ResizeObserver from 'resize-observer-polyfill'
import { select, Selection, scaleLinear, scaleBand, axisLeft, axisBottom } from 'd3'
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

  const [selection, setSelection] = useState<null | Selection<SVGSVGElement | null, unknown, null, undefined>>(null)
  // const [data, _] = useState(candles)

  useEffect(() => {
    if (!dimensions) return

    const scaleY = scaleLinear()
    .domain(domain)
    .range([dimensions.height, 0])
    .clamp(true)
  
    const yAxis = axisLeft(scaleY)
      .tickFormat(d => `$${d}`)
    
    
    const x = scaleBand()
      .domain(candles.map(d => d.date))
      .range([0, dimensions.width])
      .paddingInner(0.5)
    
    const xAxis = axisBottom(x)

    const width = dimensions.width / candles.length

    if (!selection) {
      setSelection(select(svgRef.current))
    }
    else {
      selection
        .append('g')
        .style("transform", `translateY(${dimensions.height}px)`)
        .call(xAxis)
   
      selection
        .append('g')
        // .attr("transform", `translate(${dimensions.width}px, 0)`)
        .call(yAxis)

      selection
        .selectAll('rect')
        .data(candles)
        .enter()
        .append('line')
        .attr('width', x.bandwidth)
        .attr('x1', (_, index) => (index + 0.5) * width)
        .attr('y1', d => scaleY(d.low))
        .attr('x2', (_, index) => (index + 0.5) * width)
        .attr('y2', d => scaleY(d.high))
        .style('stroke', d => d.open < d.close ? ' #01b61a ' : 'red')
        
      selection
        .selectAll('rect')
        .data(candles)
        .enter()
        .append('line')
        .attr('width', x.bandwidth)
        .attr('x1', (_, index) => (index + 0.5) * width)
        .attr('y1', d => scaleY(d.open))
        .attr('x2', (_, index) => (index + 0.5) * width)
        .attr('y2', d => scaleY(d.close))
        .style('stroke', d => d.open < d.close ? ' #01b61a ' : 'red')
        .style('stroke-width', x.bandwidth)
    }
    
   
  }, [selection, candles, dimensions, domain])

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
  height: 90vh;
  width: 100%;
`

const StyledSVG = styled.svg`
  background: #eee;
  overflow: visible;
  display: block;
  width: 100%; 
`