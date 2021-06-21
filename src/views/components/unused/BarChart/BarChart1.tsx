import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ResizeObserver from 'resize-observer-polyfill'
import { select, Selection, scaleLinear, scaleBand, max, axisLeft, axisBottom } from 'd3'


type Idata = {
  name: string
  number: number
  color: string
}


interface BarChartProps {
  initialData: Idata[]
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


const BarChart1 = ({ initialData }: BarChartProps) => {

  const svgRef = useRef<SVGSVGElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const dimensions = useResizeObserver(wrapperRef)

  const [selection, setSelection] = useState<null | Selection<SVGSVGElement | null, unknown, null, undefined>>(null)
  const [data, setData] = useState(initialData)

  
  useEffect(() => {
    if (!dimensions) return

    const y = scaleLinear()
    .domain([0, max(data, d => d.number)!])
    .range([dimensions.height, 0])
    .clamp(true)
  
    const yAxis = axisLeft(y)
      .tickFormat(d => `$${d}`)

    const x = scaleBand()
      .domain(data.map(d => d.name))
      .range([0, dimensions.width])
      .paddingInner(0.2)
    
    const xAxis = axisBottom(x)

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
        .attr("transform", `translate(${dimensions.width}px, 0)`)
        .call(yAxis)

      selection
        .append('g')
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .style('transform', 'scale(1, -1)')
        .attr('width', x.bandwidth)
        .attr('x', d => x(d.name)!)
        .attr('y', d => -dimensions.height)
        .transition()
        .attr('fill', d => d.color)
        .attr('height', d => dimensions.height - y(d.number))
    }
    
   
  }, [selection, data, dimensions])

  return (
    <StyledChartWrapper ref={wrapperRef}>
      <StyledSVG ref={svgRef} />
    </StyledChartWrapper>
  )
}

export default BarChart1


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