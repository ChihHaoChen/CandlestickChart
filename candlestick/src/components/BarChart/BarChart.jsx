/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useEffect, useState } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import styled from 'styled-components'

import {
  select,
  scaleBand,
  axisBottom,
  axisRight,
  scaleLinear
} from "d3";


const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};


const BarChart = ({ data }) => {

  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current)

    if (!dimensions) return

    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, dimensions.width])
      .padding(0.5)

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([dimensions.height, 0])
      .clamp(true)

    const colorScale = scaleLinear()
      .domain([0, 150])
      .range(['green', 'orange', 'red'])
      .clamp(true)

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
    svg
      .select(".x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);

    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", `translateX(${dimensions.width}px)`)
      .call(yAxis);

    svg.selectAll(".bar")
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('fill', colorScale)
      .style('transform', 'scale(1, -1)')
      .attr('x', (value, index) => xScale(index) )
      .attr('y', -dimensions.height)
      .attr('width', xScale.bandwidth())
      .on("mouseenter", (event, value) => {
        const index = svg.selectAll('.bar').nodes().indexOf(event.target)
        svg
          .selectAll(".tooltip")
          .data([value])
          .join(enter => enter.append("text").attr("y", yScale(value) - 4))
          .attr("class", "tooltip")
          .text(value)
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(value) - 8)
          .attr("opacity", 1)
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr('fill', colorScale)
      .attr('height', value => dimensions.height - yScale(value))
      
  }, [data, dimensions]);

  return (
    <StyledChartWrapper ref={wrapperRef}>
      <StyledSVG ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </StyledSVG>
    </StyledChartWrapper>
  )
}

export default BarChart


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
