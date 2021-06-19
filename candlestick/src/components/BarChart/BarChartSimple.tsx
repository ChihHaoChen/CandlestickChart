import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { select, Selection } from 'd3'

const data = [
  {
    units: 150,
    color: 'springgreen'
  },
  {
    units: 200,
    color: 'red'
  },
  {
    units: 250,
    color: 'blue'
  },
  {
    units: 120,
    color: 'teal'
  },
  {
    units: 90,
    color: 'orange'
  },
]

const BarChart1: React.FC = () => {

  const svgRef = useRef<SVGSVGElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const [selection, setSelection] = useState<null | Selection<SVGSVGElement | null, unknown, null, undefined>>(null)

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current))
    }
    else {
      const rects =selection
        .selectAll('rect')
        .data(data)
        .attr('width', 100)
        .attr('height', d => d.units)
        .attr('fill', d => d.color)
        .attr('x', (_, i) => 100 * i)
      
      rects
        .enter()
        .append('rect')
        .attr('width', 100)
        .attr('height', d => d.units)
        .attr('fill', d => d.color)
        .attr('x', (_, i) => 100 * i)
    }
   
  }, [selection])

  return (
    <StyledChartWrapper ref={wrapperRef}>
      <StyledSVG ref={svgRef}>
        <rect />
        <rect />
        <rect />
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