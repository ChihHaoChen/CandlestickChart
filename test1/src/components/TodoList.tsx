import React from 'react'
import styled from 'styled-components'


const StyledUl = styled.ul`
  list-style: none;
  width: 90%;
  max-width: 40rem;
  margin: 2rem auto;
  padding: 0;
`

const StyledLi = styled.li`
  margin: 1rem 0;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

interface TodoListProps {
  items: { id: string, text: string }[];
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {

  return (
  <StyledUl>
      {
        props.items.map((todo) => (
          <StyledLi key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={props.onDeleteTodo.bind(null, todo.id)}>DELETE</button>
          </StyledLi>
        ))
      }
  </StyledUl>
  )
}

export default TodoList
