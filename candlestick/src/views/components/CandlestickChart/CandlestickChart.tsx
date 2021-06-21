import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ResizeObserver from 'resize-observer-polyfill'
import { select, Selection, BaseType, scaleLinear, scaleBand, axisLeft, axisBottom, max, axisRight, zoom, zoomTransform } from 'd3'
import { IData, IChart } from '../../../model/date.model'


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



const CandlestickChart = ({ chartCandles, domain }:any) => {

  const svgAxisRef = useRef(null)
  const svgVolumeAxisRef = useRef(null)
  const svgCandlesticksRef = useRef(null)

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const wrapperVolumeRef = useRef<HTMLDivElement | null>(null)

  const dimensions = useResizeObserver(wrapperRef)
  const dimensionsVolumeSVG = useResizeObserver(wrapperVolumeRef)

  const candles:IChart[] = chartCandles['dataArr']


  const [panSlide, setPanSlide] = useState(0)
  const [currentZoomState, setCurrentZoomState] = useState({})
  
  const svgVolumeAxis = select(svgVolumeAxisRef.current)
  const svgCandlesticks = select(svgCandlesticksRef.current)
  const svgAxis = select(svgAxisRef.current)

  useEffect(() => {
    if (!dimensions || !dimensionsVolumeSVG) return
    
    const { width, height } = dimensions || wrapperRef.current?.getBoundingClientRect()
    
    const candlesChopped = ((panSlide + 30) < candles.length) ?  candles.slice(panSlide, 30 + panSlide) : candles
    
    const scaleY = scaleLinear()
    .domain(domain)
    .range([dimensions.height, 0])
    .clamp(true)
  
    const yAxis: any = axisLeft(scaleY)
      .tickFormat(d => `$${d}`)
    
    const scaleVolume = scaleLinear()
      .domain([0, max(candles, d => d.volume)!])
      .range([dimensions.height*0.2, 0])
      .clamp(true)
    
    const volumeAxis: any = axisRight(scaleVolume)
      .tickFormat(d => `${d}`)
      
    
    const x = scaleBand()
      .domain(candles.map(d => d.date))
      .range([0, dimensions.width])
      .paddingInner(0.5)
   
    
    const xAxis: any = axisBottom(x)
      
    const widthCandelstick = width / candles.length

    
    svgCandlesticks
      .selectAll('line')
      .data(candles)
      .join('line')
      .attr('width', 1)
      .attr('x1', (_, index) => (index + 0.5) * widthCandelstick)
      .attr('y1', d => scaleY(d.low))
      .attr('x2', (_, index) => (index + 0.5) * widthCandelstick)
      .attr('y2', d => scaleY(d.high))
      .style('stroke', d => d.open < d.close ? ' #01b61a ' : 'red')
      
      
    svgCandlesticks
      .selectAll('rect')
      .data(candles)
      .join('line')
      .attr('width', 1)
      .attr('x1', (_, index) => (index + 0.5) * widthCandelstick)
      .attr('y1', d => scaleY(d.open))
      .attr('x2', (_, index) => (index + 0.5) * widthCandelstick)
      .attr('y2', d => scaleY(d.close))
      .style('stroke', d => d.open < d.close ? ' #01b61a ' : 'red')
      .style('stroke-width', widthCandelstick * 0.5)
      
    
    svgVolumeAxis
      .selectAll('rect')
      .data(candles)
      .join('rect')
      .style('transform', 'scale(1, -1)')
      .attr('width', x.bandwidth)
      .attr('x', d => x(d.date)!)
      .attr('y', d => -dimensionsVolumeSVG.height)
      .transition()
      .attr('fill', d => d.open < d.close ? ' #01b61a ' : 'red')
      .attr('height', d => dimensionsVolumeSVG.height - scaleVolume(d.volume))
      .style('opacity', 0.5)
      
    
    svgAxis
    .select('.x-axis')
    .style('transform', `translateY(${dimensions.height}px)`)
    .attr('class', 'x-axis')
    .call(xAxis)
    
  
    svgAxis
      .select('.y-axis')
      .join('g')
      .attr('class', 'y-axis')
      .call(yAxis)
    
    
    svgVolumeAxis
      .select('.yVolume-axis')
      .join('g')
      .style("transform", `translateX(${dimensions.width}px)`)
      .attr('class', 'yVolume-axis')
      .call(volumeAxis)
    


    const zoomBehavior: any = zoom()
      .scaleExtent([0.5, 5])
      .translateExtent([[0, 0], [width, height]]).on("zoom", () => {
        
        const zoomState = zoomTransform(svgCandlesticks.node() as unknown as Element)
        
        setCurrentZoomState(zoomState)      
      })

    svgCandlesticks.call(zoomBehavior)

  }, [candles, dimensions, domain, dimensionsVolumeSVG, currentZoomState])

  return (
    <StyledChartWrapper ref={wrapperRef}>
      {/* Axis SVG */}
      <StyledSVG ref={svgAxisRef} >
        <g className="x-axis" />
        <g className="y-axis" />
      </StyledSVG>
      <StyledCandlesticksSVG ref={svgCandlesticksRef} />
      {/* Volume Div Box */}
      <StyledVolumeSVGWrapper ref={wrapperVolumeRef}>
        {/* Volume Axis and Data SVG */}
        <StyledVolumeSVG ref={svgVolumeAxisRef}>
          <g className="yVolume-axis" />
        </StyledVolumeSVG>
      </StyledVolumeSVGWrapper>
     
    </StyledChartWrapper>
  )
}

export default CandlestickChart


const StyledChartWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: bottom;
  display: block;
  height: 90vh;
  margin: 2rem;
  
`

const StyledSVG = styled.svg`
  position: absolute;
  bottom: 0;
  top: 0;
  display: block;
  overflow: visible;
  width: 100%;
  height: 100%;
`

const StyledVolumeSVG = styled.svg`
  position: absolute;
  position: absolute;
  bottom: 0;
  top: 0;
  display: block;
  overflow: visible;
  width: 100%;
  height: 100%;
`

const StyledVolumeSVGWrapper = styled.div`
  position: absolute;
  bottom: 0;
  overflow: visible;
  display: block;
  width: 100%;
  height: 20%;
`

const StyledCandlesticksSVG = styled.svg`
  position: relative;
  bottom: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  overflow: scroll;
`