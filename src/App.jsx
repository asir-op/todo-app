import React, { useEffect, useState } from 'react'
import { TodoProvider } from './context/TodoContext';
import { ToDoForm, ToDoItem } from './components';

function App() {

  const [todos, setTodos] = useState([]);
  const addToDo = (todo) => {
    setTodos((prev) => [{id: Date.now(),...todo},...prev])
  }
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((e) => (
      e.id === id ? todo : e
    )))
   }
   const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((e) => e.id !== id))
   } 
   const toggleComplete = (id) => {
    setTodos((prev) => prev.map((e) => e.id === id ? {...e, completed: !e.completed} : e ))
   }
   useEffect(() => {
      const todos = JSON.parse(localStorage.getItem("todos"))
      if(todos && todos.length > 0){
        setTodos(todos)
      }
   },[])
   useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
   },[todos])

  return (
    <TodoProvider value={{todos, addToDo, updateTodo, deleteTodo, toggleComplete}}>

    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <ToDoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id} className='w-full'>
                            <ToDoItem todo={todo}/>
                            
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App