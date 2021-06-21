import styled from 'styled-components'


interface LineProps {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
}


const StyledLine = styled.line`
  stroke: ${props => props.color ? props.color : 'black'};
  stroke-width: 2;
`

const Line = ({ x1, y1, x2, y2, color }: LineProps) => {

  return (
    <svg>
      <StyledLine
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        color={color}
      />
    </svg>
  )
}

export default Line
