import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { select, Selection, scaleLinear, scaleBand, max, axisLeft, axisBottom } from 'd3'

const data = [
  {
    name: 'AAPL',
    number: 11250,
    color: 'springgreen'
  },
  {
    name: 'OEG',
    number: 90500,
    color: 'red'
  },
  {
    name: 'TSLA',
    number: 13255,
    color: 'blue'
  },
  {
    name: 'FCX',
    number: 8736,
    color: 'teal'
  },
  {
    name: 'CAT',
    number: 141343,
    color: 'orange'
  },
]

const dimensions = {
  width: 400,
  height: 600,
  chartWidth: 900,
  chartHeight: 700,
  marginLeft: 100
}

const BarChart1: React.FC = () => {

  const svgRef = useRef<SVGSVGElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const [selection, setSelection] = useState<null | Selection<SVGSVGElement | null, unknown, null, undefined>>(null)

  const y = scaleLinear()
    .domain([0, max(data, d => d.number)!])
    .range([0, dimensions.chartHeight])
  
  const yAxis = axisLeft(y)
    .tickFormat(d => `$${d}`)

  const x = scaleBand()
    .domain(data.map(d => d.name))
    .range([0, dimensions.chartWidth])
    .paddingInner(0.2)
  
  const xAxis = axisBottom(x)
  
  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current))
    }
    else {
      selection
        .append('g')
        .attr('transform', `translate(${dimensions.marginLeft}, ${dimensions.chartHeight})`)
        .call(xAxis)
      
      selection
        .append('g')
        .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
        .call(yAxis)

      selection
        .append('g')
        .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('x', d => x(d.name)!)
        .attr('fill', d => d.color)
        .attr('height', d => y(d.number))
    }
   
  }, [selection, x, y, xAxis, yAxis])

  return (
    <StyledChartWrapper ref={wrapperRef}>
      <StyledSVG ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </StyledSVG>
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
`

const StyledSVG = styled.svg`
  background: #eee;
  overflow: visible;
  display: block;
  width: 100%; 
`