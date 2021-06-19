import styled from 'styled-components'
import WebnarListBox from './WebnarListBox'


const StyledContainer = styled.div`
  width: 100%;
  top: 415px;
  height: 780px;
  padding: 80px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
  background-color: #F2F2F2;
`

const StyledWrapper = styled.div`
  position: relative;
  width: 1180px;
  display: grid;
  /* grid: 300px / auto auto auto; */
  grid-template-columns: 380px 380px 380px;
  grid-template-rows: 300px 300px;
  grid-gap: 20px;
`

const WebnarContainer = () => {
  return (
    <StyledContainer>
       <StyledWrapper>
      <WebnarListBox />
      <WebnarListBox />
      <WebnarListBox />
      <WebnarListBox />
      <WebnarListBox />
      <WebnarListBox />
    </StyledWrapper>
    </StyledContainer>
  )
}

export default WebnarContainer
