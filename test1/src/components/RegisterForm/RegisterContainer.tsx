import styled from 'styled-components'
import InputForm from './InputForm'

const RegisterWrapper = styled.div`
  position: relative;
  width: 1180px;
  height: auto;
  margin-top: 160px;
  margin-bottom: 144px;
  background: #FFFFFF;
  border: 1px solid #DBDBDB;
  box-sizing: border-box;
  box-shadow: 0px 4px 14px rgba(132, 132, 132, 0.5);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const FormTitle = styled.label`
  width: auto;
  height: 30px;
  margin-top: 80px;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 30px;
  text-align: center;
  color: #01254F;
`

const FormSubtitle = styled.label`
  width: 580px;
  height: 48px;
  left: 392px;
  margin-top: 20px;
  font-family: SF Pro Display;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;

  /* or 150% */
  text-align: center;

  color: rgba(0, 0, 0, 0.65);
`


const RegisterContainer = () => {
  return (
    <RegisterWrapper>
      <FormTitle>{"Register for a Webnar now"}</FormTitle>
      <FormSubtitle>{"Please fill in the form below and you will be contacted by one of our professional business experts."}</FormSubtitle>
      <InputForm />
    </RegisterWrapper>
  )
}

export default RegisterContainer
