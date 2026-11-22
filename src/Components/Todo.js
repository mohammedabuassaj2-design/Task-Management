import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTodosDispatch } from '../contexts/todosContext.js';

//Icons
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckIcon from '@mui/icons-material/Check';




export default function Todo({todo,showDialogOfDelete,showDialogOfUpdate,checkClick})
{
  // const { todos, setTodos } = useContext(TodosContext);
  const dispatch = useTodosDispatch();

    function handelCheckClick(todoId)
    {
      dispatch({type:"complet",payload:todo})
      checkClick();
  }


  //functions
  function handelDeleteClick()
  {
    showDialogOfDelete(todo);
  }


  //000000000000
  function handelUpdateClick()
  {
    showDialogOfUpdate(todo);
  }
  //000000000000



 
    



 

  return (
    <>
  
      
      <Card sx={{
              minWidth: 275,
              backgroundColor: "#02403f",
              color: "white",
              marginTop: 5
               }}
             className='TodoCard'
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography variant='h5'
                sx={{ textAlign: "right",textDecoration: todo.isCompleted ? "line-through": "none" }}
              >
                {todo.title}
              </Typography>  
              <Typography variant='h6' sx={{ textAlign: "right" ,fontSize:16}}>
               {todo.discription}
              </Typography>
            </Grid>


            {/* Action Button */}
            <Grid size={4} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems:"center"
            }}>
             <IconButton aria-label="delete"
                         className='iconbutton'
                         style={{
                         color: todo.isCompleted ? "white" :"#8bc34a",
                         backgroundColor: todo.isCompleted ? "#8bc34a" :"white",
                         border:todo.isCompleted ? "solid #e9ebe6 2px":"solid #8bc34a 3px"
                               }}
                onClick={() => { handelCheckClick(); }}
              >
              <CheckIcon />
             </IconButton>
      
             <IconButton aria-label="delete"
                         className='iconbutton'
                         style={{
                         color: "#00866b",
                         backgroundColor: "white",
                         border:"solid #008b6f 3px"
                }}
                        onClick={handelUpdateClick}
              >
              <ModeEditOutlineOutlinedIcon />
             </IconButton>
                            
              <IconButton aria-label="delete"
                         className='iconbutton'
                         style={{
                         color: "#b20000",
                         backgroundColor: "white",
                         border:"solid #b20000 3px"
                }}
                         onClick={handelDeleteClick}
              >
              <DeleteOutlineOutlinedIcon />
             </IconButton>
           
            </Grid>
            {/* =====Action Button =====*/}
            </Grid>    
           
        </CardContent>
      </Card>


    </>
    );
}