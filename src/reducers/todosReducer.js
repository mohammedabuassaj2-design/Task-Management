import { v4 as uuidv4 } from 'uuid';

export default function reducer(currentTodos, action)
{
    switch (action.type)
    {
        case "added":
            {
                const newTodo = {
                     id: uuidv4(),
                     title: action.payload.newTitle,
                     discription: " ",
                     isCompleted: false,
                                }
                const updateTodo = [...currentTodos, newTodo];
                
                 localStorage.setItem("todos", JSON.stringify(updateTodo))
      
                 return updateTodo;
    
            }



        case "delete":
            {
                const updateTodos = currentTodos.filter((t) => {
                return t.id !== action.payload.id;
                })
                
                localStorage.setItem("todos", JSON.stringify(updateTodos));
                return updateTodos;
                
            }



        case "update":
            {
              const updateTodos = currentTodos.map((t) => {
                if (t.id === action.payload.id)
                {
                  return {...t,title:action.payload.title, discription:action.payload.discription}
                }
               else {
                 return t
                    }
      
                      })
                localStorage.setItem("todos", JSON.stringify(updateTodos));

                return updateTodos;
               
               
            }




        case "get":
            {
                
               const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
                return storageTodos;
            }



        case "complet":
            {
                const updateTodos = currentTodos.map((t) => {
                  if (t.id === action.payload.id)
                  {
                      const updatedTodo = {
                          ...t,isCompleted: !t.isCompleted 
                      }
                      return updatedTodo;
                   }
                  return t;
                })
                localStorage.setItem("todos", JSON.stringify(updateTodos));
                return updateTodos;
                 
            }

        default:
            {
                throw Error("Unknown action " + action.type)
            }
    }


    return [];
}