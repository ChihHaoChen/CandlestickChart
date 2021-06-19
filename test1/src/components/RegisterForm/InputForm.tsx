import styled from 'styled-components'
import InputSelect from './InputSelect'


const FormWrapper = styled.div`
  width: 580px;
  margin-top: 40px;
  margin-bottom: 80px;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledInputLabel = styled.label`
  width: 82px;
  height: 22px;
  margin-top: 20px;
  margin-bottom: 8px;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #4A4A4A;
`

const StyledInput = styled.input`
  width: 580px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #C6C6C6;
  box-sizing: border-box;
  border-radius: 4px;
`

const StyledRegisterButton = styled.button`
  width: 580px;
  height: 48px;
  margin-top: 20px;
  background: #E9E9E9;
  border-radius: 4px;
`

const StyledButtonLabel = styled.label`
  width: 64px;
  height: 22px;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #D1D1D1;
`

const InputForm = () => {
  return (
    <FormWrapper>
      <StyledForm>
        <StyledInputLabel>
          {"Topic"}      
        </StyledInputLabel>
        <select id="Select1">
          <option>Option1</option>
          <option>Option2</option>
        </select>
        <InputSelect />
        <StyledInputLabel>
          {"First Name"}      
        </StyledInputLabel>
        <StyledInput type="text" name="firstName" />
        <StyledInputLabel>
          {"Last Name"}      
        </StyledInputLabel>
        <StyledInput type="text" name="lastName" />
        <StyledInputLabel>
          {"Email"}      
        </StyledInputLabel>
        <StyledInput type="email" name="email" />
        
        <StyledRegisterButton>
          <StyledButtonLabel>
          {"Register"}
          </StyledButtonLabel>
        </StyledRegisterButton>
      </StyledForm>
    </FormWrapper>
  )
}

export default InputForm
