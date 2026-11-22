import './App.css';
import TodoList from "./Components/TodoList";
import { TodosContext } from './contexts/todosContext';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import TodosProvider from './contexts/todosContext';


const initialTodos = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    discription: "قراءة صفحتان لإنجاز مهارة القراءة",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    discription:"قراءة صفحتان لإنجاز مهارة القراءة",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    discription: "قراءة صفحتان لإنجاز مهارة القراءة",
    isCompleted: false,
  },
]


function App() {
  
  const [todos, setTodos] = useState(initialTodos);


  return (
    <TodosProvider>
      <div className="App" style={{
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         height: "100vh",
         backgroundColor: "#102d59",
         direction:"rtl"
         }}>

      

         
           <TodoList />
        
      
      
      </div>

    </TodosProvider>
  );
}

export default App;
