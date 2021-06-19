import styled from 'styled-components'
import YoutubeFrame from './YoutubeFrame'

const StyledContainer = styled.div`
  width: 100%;
  top: 415px;
  padding: 166px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
`

const StyledIntroWrapper = styled.div`
  position: relative;
  width: 1180px;
  padding: 0px;
  margin: 0px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const IntroDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const YoutubeVideoDiv = styled.div`
  position: relative;
  display: block;
`

const IntroLabel = styled.label`
  position: relative;
  height: 30px;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 30px;
  color: #01254F;
`

const IntroDescription = styled.p`
  width: 481px;
  height: 288px;
  margin-top: 20px;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.65);
`

const SeeMoreButton = styled.button`
  position: relative;
  width: auto;
  max-width: 100px;
  height: 24px;

  font-family: SF Pro Display;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  border: none;
  color: rgba(0, 0, 0, 0.65);
  background-color: white;
`

const HostIntroBlock = () => {
  return (
    <StyledContainer>
      <StyledIntroWrapper>
        <IntroDiv>
          <IntroLabel>Meet Your Host - AliStair Schultz</IntroLabel>
          <IntroDescription>
            {
              "With more than 15 years of experience covering both the FX and CFD markets, Alistair has extensive knowledge covering algorithmic trading, market analysis & an impressive educational background. As the author of ‘Essentials for Trading Students – An Overview of the Basics for Aspiring Traders’, which was released in 2017, Alistair will take any aspiring trader from the basics right through to advanced analytics used in institutional funds. At the core of Alistair’s teachings is the ability to help each trader uncover their ‘Trading DNA', helping them flourish with the skills and timeframes that work best for them."
            }
          </IntroDescription>
          <SeeMoreButton>{"See More >"}</SeeMoreButton>
        </IntroDiv>
        <YoutubeVideoDiv>
          <YoutubeFrame />
        </YoutubeVideoDiv>
      </StyledIntroWrapper>
    </StyledContainer>
  )
}

export default HostIntroBlock
