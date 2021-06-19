import { useRef } from "react"
import styled from 'styled-components'


const StyledForm = styled.form`
  width: 90%;
  max-width: 40rem;
  margin: 2rem auto;
`

const FormWrapperDiv = styled.div`
  margin-bottom: 1rem;
`


const StyledLabel = styled.label`
  display: block;
  width: 100%;
  font-weight: bold;
`


const StyledInput = styled.input`
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.25rem;
  &:focus {
    outline: none;
    border-color: #50005a;
  }
`

const StyledButton = styled.button`
  background: #50005a;
  border: 1px solid #50005a;
  color: white;
  padding: 0.5rem 1.5rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:hover :active {
  background: #6a0a77;
  border-color: #6a0a77;
  }
`

type NewTodoProps = {
  onAddTodo: (todoText: string) => void
}

const NewTodo: React.FC<NewTodoProps> = (props) => {

  const textInputRef = useRef<HTMLInputElement>(null)

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    const enteredText = textInputRef.current!.value
    console.log(enteredText)
    props.onAddTodo(enteredText)
  }

  return (
    <StyledForm onSubmit={todoSubmitHandler}>
      <FormWrapperDiv>
        <StyledLabel htmlFor="todo-text">Todo Text</StyledLabel>
        <StyledInput type='text' id='todo-text' ref={textInputRef} />
      </FormWrapperDiv>
      <StyledButton type='submit'>Add Todo</StyledButton>
    </StyledForm>
  )
}

export default NewTodo
