import styled from 'styled-components'


interface RectProps {
  x1: number
  y1: number
  width: number
  height: number
  color: string
}


const StyledRect = styled.rect`
  stroke: ${props => props.color ? props.color : 'black'};
  fill: ${props => props.color ? props.color : 'black'};
  opacity: 0.85;
`

const Rect = ({ x1, y1, width, height, color }: RectProps) => {

  return (
    <svg>
      <StyledRect
        x1={x1}
        y1={y1}
        width={width}
        height={height}
        color={color}
      />
    </svg>
  )
}

export default Rect
