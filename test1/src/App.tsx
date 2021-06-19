import React, { useState } from 'react';
import styled from 'styled-components'


import TodoList from './components/TodoList'
import NewTodo from './components/NewTodo'
import WebnarContainer from './components/Webnar/WebnarContainer'
import HostIntroBlock from './components/IntroHost/HostIntroBlock';
import RegisterContainer from './components/RegisterForm/RegisterContainer';
import { Todo } from './todo.model'


const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
`

const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([])

  const todoAddHandler = (text: string) => {
    setTodos(prevTodos => [...prevTodos, {id: Math.random().toString(), text: text}])
  }

  const todoDeleteHandler = (todoId: string) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== todoId)
    })
  }

  return (
    <TopContainer className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
      <WebnarContainer />
      <HostIntroBlock />
      <RegisterContainer />
    </TopContainer>
  );
}

export default App;




