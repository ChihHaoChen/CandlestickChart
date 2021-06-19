import styled from 'styled-components'


const StyledWebnarListContainer = styled.div`
  background: #FFFFFF;
  border: 1px solid #D6D6D6;
  box-sizing: border-box;
  box-shadow: 1px 2px 6px rgba(219, 219, 219, 0.5);
  border-radius: 4px;
  width: 380px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: baseline;
  padding-left: 20px;
  padding-right: 20px;
`

const DateLabel = styled.label`
  position: relative;
  height: 20px;
  margin-top: 20px;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #01254F;
`

const WebnarTitleLabel = styled.label`
  position: relative;
  height: 48px;
  margin-top: 20px;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #01254F;
`

const DescriptionText = styled.p`
  position: relative;
  margin-top: 12px;
  width: 280px;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.65);
`

const TimeLabel = styled.label`
  position: relative;
  height: 20px;
  margin-top: 20px;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.65);
`

const RegisterDiv = styled.div`
  position: relative;
  width: 100%;
  margin-top: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
`

const RegisterLink = styled.a`
  position: relative;
  height: 24px;

  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #6BB718;
`

const NextButton = styled.button`
  width: 22px;
  height: 22px;
  box-sizing: border-box;
  border: 1px solid #6BB718;
  background: white;
  border-radius: 50%;
  color: #6BB718;
`

const WebnarListBox = () => {
  return (
    <StyledWebnarListContainer>
      <DateLabel>31/10/2021</DateLabel>
      <WebnarTitleLabel>A structured approach</WebnarTitleLabel>
      <DescriptionText>Market Scan across FX & Gold to determine sentiment with accuracy.</DescriptionText>
      <TimeLabel>7pm~8:30pm EST</TimeLabel>
      <RegisterDiv onClick={()=>{console.log('Url: /webinar/:id')}}>
        <RegisterLink>Register Now</RegisterLink>
        <NextButton>{">"}</NextButton>
      </RegisterDiv>
    </StyledWebnarListContainer>
  )
}

export default WebnarListBox
