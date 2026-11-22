import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useState,useEffect,useMemo,useReducer} from 'react';
import { useTodos,useTodosDispatch } from '../contexts/todosContext.js';
import { v4 as uuidv4 } from 'uuid';


//Todos
import Todo from './Todo.js';
import todosReducer from '../reducers/todosReducer.js';





export default function TodoList()
{
  //Reducer
  // const [todos, dispatch] = useReducer(todosReducer, []);
  const [titleInput, setTitleInput] = useState("");
  const [displayTodosType, setDisplayTodosType] = useState("all");
  const todos = useTodos();
  const dispatch = useTodosDispatch();
  


  const [dialogTodo, setDialogTodo] = useState(null);
  const [open, setOpen] = useState(false);
  const [showUpdateDialog, setshowUpdateDialog] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({ title: "", discription: "" });
  const [openSnackBar, setOpenSnackBar] = useState(
    {
      open: false,
      message: "",
      color:"#4caf50",
    }
  )

  
  //filtiration arrays
  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling Completed Todos");
      return t.isCompleted;
    })
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
           console.log("calling not Completed Todos");
           return !t.isCompleted;
     })
  },[todos])




  let todosToBeRender = todos;
  if (displayTodosType === "completed")
  {
    todosToBeRender = completedTodos;
  }
  else if (displayTodosType === "non-completed")
  {
    todosToBeRender = notCompletedTodos;
  }
  

 
  

  



  useEffect(() => {
    dispatch({type:"get"})
  },[])


  //functions
  
  function changeDisplayedType(e)
  {
    setDisplayTodosType(e.target.value);
  }




  function handelAddClick() {
    dispatch({type:"added",payload:{newTitle:titleInput}})
    setTitleInput("");
    setOpenSnackBar({
      open: true,
      message: "تمت الإضافة بنجاح",
      color:"#4caf50",
    })

     setTimeout(() => {
    setOpenSnackBar(prev => ({
      ...prev, open: false
    }))
  }, 3000);
  }
 
  
  function showDeleteDialog(todo)
  {
    setDialogTodo(todo);
    setOpen(true);
  }
 


  function displayUpdateDialog(todo)
  {
    setDialogTodo(todo);
    setUpdateTodo({...todo});
    setshowUpdateDialog(true);
  }



 function handelDeleteConfirm()
 {
   dispatch({type:"delete",payload:dialogTodo})
   setOpen(false);
   setOpenSnackBar({
     open: true,
     message: "تم الحذف بنجاح",
     color:"#f44336",
   })

    setTimeout(() => {
    setOpenSnackBar(prev => ({
      ...prev, open: false
    }))
  }, 3000);
  }


 function handelUpdateConfirm()
  {
    dispatch({type:"update",payload:updateTodo})
    setshowUpdateDialog(false);
    setOpenSnackBar({
     open: true,
     message: "تمت عملية التعديل بنجاح",
     color:"#2196f3",
   })

    setTimeout(() => {
    setOpenSnackBar(prev => ({
      ...prev, open: false
    }))
  }, 3000);
  }


  function handelSnackOfChickClick()
  {
    setOpenSnackBar({
     open: true,
     message: "تمت عملية التعديل بنجاح",
     color:"#2196f3",
   })

    setTimeout(() => {
    setOpenSnackBar(prev => ({
      ...prev, open: false
    }))
  }, 3000);
  }
 





   const todosMap = todosToBeRender.map((t) => {
     return (<Todo key={t.id} todo={t}
       showDialogOfDelete={showDeleteDialog}
       showDialogOfUpdate={displayUpdateDialog}
       checkClick={handelSnackOfChickClick}
     />);
  })
 




  return (
    <>
      {/*DELETE DIALOG*/}
        {open && (
        <div className='overlay'
             onClick={() => {setOpen(false)}}
        >
          <div className='dialog'
               onClick={(e) => {e.stopPropagation()}}
          >
            <h2>حذف مهمة</h2>
            <p>
              هل انت متأكد من حذف هذه المهمة. عند الضغط على حذف فلن تتمكن من استعادة هذه المهمة
            </p>
            <div className='button'>
              <button variant="outlined"
                      onClick={() => {setOpen(false)}}
              >
                تراجع
              </button>
              <button variant="contained"
                className='Delete'
                color="error"
                onClick={() => { handelDeleteConfirm() }}
              >
                حذف
              </button>
              
            </div>
         </div>
        </div>
         )}
      {/*=== DELETE DIALOG ===*/}

      {/*UPDATE DIALOG*/}
          {showUpdateDialog && (
        <div className='overlay'
             onClick={() => {setshowUpdateDialog(false)}}
        >
          <div className='dialogUpdate'
               onClick={(e) => {e.stopPropagation()}}
          >
            <h2>تعديل مهمة</h2>
            <FormControl fullWidth>
               <InputLabel htmlFor="my-input">
                 عنوان المهمة
                </InputLabel>
                <Input 
                id="my-input"
                value={updateTodo.title}
                onChange={(e) => {
                  setUpdateTodo({ ...updateTodo, title: e.target.value });
                }}
                />
               </FormControl>
              <br></br><br></br><br></br>
              <FormControl fullWidth>
              <InputLabel htmlFor="my-input2">
                 التفاصيل
                </InputLabel>
              <Input 
                id="my-input2"
                value={updateTodo.discription}
                onChange={(e) => {
                  setUpdateTodo({ ...updateTodo, discription: e.target.value });
                }}
              
              />
                </FormControl>
              <div className='Updatebuttons'>
                <button
                      onClick={() => {setshowUpdateDialog(false)}}
                >
                  تراجع
                 </button>
              <button
                onClick={handelUpdateConfirm}
                
              >
                  تعديل
                </button>
                
              </div>
             
         </div>
        </div>
          )}
      {/*=== UPDATE DIALOG ===*/}
      
      {/*  SnackBar */}
      {
        openSnackBar.open && (
          <div className='SnackBar'
               style={{backgroundColor:openSnackBar.color}}
          >
            {openSnackBar.message}
          </div>
        )
      }
      {/*  SnackBar */}

      <Container maxWidth="sm">
      <Card  sx={{ 
          minWidth: 275,
          Height: "95vh",
          display: "flex",
          flexDirection: "column",
        }}
        
      >
        <CardContent style={{ 
          display: "flex", 
          flexDirection: "column", 
          height: "100%",
          padding: "16px",
          overflow: "visible",
        }}>
          <div style={{ flexShrink: 0 }}>
          <Typography variant='h2' style={{ fontWeight: "700" }}> مهامي </Typography>
          <Divider />
                    
          {/*FILTER BUTTONS*/}
            <ToggleButtonGroup
                  style={{direction:"ltr",marginTop:"30px"}}
                  value={displayTodosType}
                  exclusive
                  onChange={changeDisplayedType}
                  aria-label="text alignment"
            >
              <ToggleButton value="non-completed"> غير المنجز</ToggleButton>
              <ToggleButton value="completed"> المنجز</ToggleButton>
              <ToggleButton value="all"> الكل</ToggleButton>
            </ToggleButtonGroup>
            </div>
          {/*====FILTER BUTTONS====*/}  
            
          {/*Todos*/}
          <div style={{ 
            height: "430px",  
            overflowY: "auto",
            marginTop: "10px",
            marginBottom: "10px",
            flexShrink: 0,
            paddingBottom: "30px"
          }}>
            {todosMap}
          </div>
          {/*===Todos===*/}

          {/*=== INPUT & ADD BUTTON ===*/}
           <div style={{ flexShrink: 0 }}>
           <Grid container spacing={2} style={{marginTop:"20px"}}>
            <Grid size={8}>
              <FormControl fullWidth>
                <InputLabel htmlFor="my-input">
                  أدخل المهمة
                </InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text"
                  value={titleInput}
                  onChange={(e) => {setTitleInput(e.target.value)}}
                />
              </FormControl>
            </Grid>

            <Grid size={4}>
                <Button variant="contained"
                  sx={{color:"success"}}
                style={{ height: "100%", width: "100%", fontSize: "18px"}}
                onClick={() => {
                  handelAddClick();
                }}

                disabled={titleInput.length === 0}
              >
                إضافة
              </Button>
            </Grid>
            </Grid>
            </div>
          {/*=== // INPUT & ADD BUTTON // ===*/}
        </CardContent>
      </Card>
    </Container> 
    </>
     
    );
}








