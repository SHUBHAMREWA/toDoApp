 
 import { Box ,Stack ,FormControlLabel,  TextField, Button,  Checkbox, Grid, Drawer } from "@mui/material";

import { useEffect, useState } from "react";

 const App =()=>{ 

      const [todoAllTask , setTodoAllTask]  =   useState([])  ; 
      const [inputVal ,setInputVal]               =   useState("")   ; 
      const [edit ,  setEdit]                 =   useState(false) ;
      const [editIndex ,setEditIndex]         =  useState(null) ; 
      const [removeTask ,setRemoveTask]       =  useState([]) ;
      const [removeShow , setRemoveShow]      =  useState(false); 
      const [showAll    , setShowAll]         =  useState(true); 
      const allDatas                          =   [...removeTask , ...todoAllTask] ;
      const [allData , setAllData]            = useState([]);
      

      useEffect(()=>{ 
           
            if(localStorage.getItem("allTask") !== null){
      
                  let data  = localStorage.getItem("allTask")
                       setTodoAllTask(JSON.parse(data))
            }
      
      
            } , [])


   
      useEffect(()=>{ 

               if(todoAllTask.length > 0){
            localStorage.setItem("allTask" , JSON.stringify(todoAllTask))
                } ;
      
          
      } , [todoAllTask])

      
  


    


    
      // Edit Fun 
      const EditFun =(el ,index)=>{
            
            return (
             setInputVal(el)  ,
             setEdit(true) ,
             setEditIndex(index)
            )
      }

      // save Edit fun   

      const saveEdit =(e)=>{
             e.preventDefault()
              let data = [...todoAllTask] ;

               data[editIndex]  = inputVal

               return (
                   setTodoAllTask(data)  ,
                   setEditIndex(null) ,
                   setEdit(false)
               )

      }


      // input set 
       const changeIn = (e)=>{
             setInputVal(e.target.value) 
       }


      //  delete Fun 
       const deleteFun = (index) => {
           let allData = [...todoAllTask] ;
           let removedData =  allData.splice(index ,1) ; 

           return ( 
              setRemoveTask([...removeTask , ...removedData , ]) ,
              setTodoAllTask(allData)  

           )
     }

  
      const getTask =(e)=>{

              e.preventDefault()

              let data  =    e.target.todoName.value ;

              if( todoAllTask.length >= 1 ? todoAllTask.includes(data) : false){
                   alert(`taks ${data} already asigned`)
              }
              else {
                  return ( 
                              setTodoAllTask((oldData)=>{
                                    return  ( [...oldData, 
                                                data
                                          ] 
                                    )
                              }))
                  }

                }

       const ShowTask =({el, index})=>{
            return  (
                  <>
                       <li style={{ 
                                  display  : "flex" ,
                                  justifyContent : "space-between",
                                  alignItems   :   "center" ,
                                  boxShadow    : "2px 2px 4px #0000009b" ,
                                  padding      : "4px"
                        }}> 
                          <span> {index+1}. &nbsp; &nbsp;{el}</span>  
                          <Box >
                           <Button onClick={()=>EditFun(el , index)}  sx={{
                                          backgroundColor:  `#cbcb0e`, 
                                          color: 'white' ,
                                          m  : 1
                                          }} 
                           > Edit</Button>
                           <Button onClick={()=> deleteFun(index)}  sx={{
                                          backgroundColor: '#ae1658', 
                                          color: 'white' ,
                                          m : 1
                                          }}
                                          >Delete</Button>
                           </Box>
                        </li>
                  </>
            )
       }   
       
       
       const ShowRemoveTask =({ el, index})=>{
            return  (
                  <>
                       <li style={{ 
                                  display  : "flex" ,
                                  justifyContent : "space-between",
                                  alignItems   :   "center" ,
                                  boxShadow    : "2px 2px 4px #0000009b" ,
                                  padding      : "4px"
                        }}> 
                          <span> {index+1}. &nbsp; &nbsp;{el}</span>  
                        </li>
                  </>
            )
       }       


       const ShowAllData =({el , index})=>{

              return (
                  <>
                        <li style={{ 
                                  display  : "flex" ,
                                  justifyContent : "space-between",
                                  alignItems   :   "center" ,
                                  boxShadow    : "2px 2px 4px #0000009b" ,
                                  padding      : "4px"
                        }}> 
                            <span> {index+1}. &nbsp; &nbsp;{el}</span> 
                          </li>
                  </>
              )
       }



       
     const toDoDesign = (

          <>
          
              <Box sx={{textAlign  : "center" ,
                        width      : "100%" ,
                        margin      : "auto"
                       }}>
                 <h1>ToDo List</h1>
                <Stack>

                  {/* Form Elemts  */}

                      <Box 
                        component="form"
                        onSubmit={edit ?  saveEdit :  getTask}
                        sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: {xs :1 , md : 2}, // spacing between elements 
                        // border: "2px solid red" ,
                        width : {xs: "90%" , md :"50%"} , 
                        margin : "auto"
                        }}
                        >
                        <TextField 
                        name="todoName"
                        label="Add To do Task"
                        variant="outlined"  
                        value={inputVal}
                        onInput={changeIn}
                        sx={{
                            width :  "30rem" 
                        }}
                        />

                       {  
                        edit ?  
                         <Button
                         sx={{
                            padding :{ sx: "0px" , md: "15px"}
                         }}
                         type="submit"  variant="contained" color="secondary">Save Edit</Button>  
                         :
                         <Button
                        sx={{
                           padding :{ sx: "0px" , md: "15px"}
                        }}
                         type="submit" variant="contained">Add Task</Button> 
                       }
                        
                        </Box>

        
        {/* show Task Elements */}
                   <Box  
                    boxShadow={10}
                       sx={{
                        width: {md : "50%" , xs: "80%"} ,
                        height: "450px",
                        margin: "auto",
                        my : 2,
                        p : 3,
                        borderRadius : "10px",
                        backgroundColor : "#ffebcd" , 
                        overflow : "scroll" , 

                       }}>
                  <ul 
                style={{
                    listStyle: "none" ,
                    width :  "100%" ,
                    padding :  "0"
                   
                }}   
            >
                      {
                        todoAllTask.map((el ,index)=>{
                            return <ShowTask el ={el} key={index} index={index} />
                        })
                  }
                      
                  </ul>
                       

                
                          
                       </Box>


                 <Grid container  
                    sx={{
                        width: {
                          xs: "100%",  // 📱 for mobile
                          sm: "80%",   // 🧑‍💻 for tablet
                          md: "60%",   // 💻 for desktop
                          lg: "50%",   // 🖥️ for large screen ,
                          cursor  : "pointer"
                        },
                        margin: "auto",
                      }}
                    
                   >
                      <Grid size={{xs: 12 , md : 4}}>

                          <p onClick={()=> { return(setShowAll(!showAll) , setAllData(allDatas) )}}>All</p>
                      </Grid>

                      <Grid size={{xs: 12 , md : 4}}>
                        
                          <p>Active</p>
                      </Grid>

                      <Grid size={{xs: 12 , md : 4}}>
                          <p  onClick={()=>setRemoveShow(!removeShow)} >Complete</p>
                      </Grid>
                 </Grid>


                </Stack> 

                         {  
                         removeShow ?    <Box 
                           
                              sx={{
                                    width: "50%",       // ✅ will now work
                                    height: "auto",
                                    background: "#c9c9c957" ,
                                    margin : "auto" ,
                                    p : 3
                              }}
                              >

                              <ul 
                              style={{
                                    listStyle: "none" ,
                                    width :  "100%" ,
                                    padding :  "0"
                                    
                              }}   
                              >

                                    <h1>Completed Task</h1>
                                    {
                                          removeTask.map((el ,index)=>{
                                          return <ShowRemoveTask el ={el} key={index} index={index} />
                                          })
                                    }
                                          
                                       </ul>  


                              </Box> :
                              null
                         }
                             
                         {  
                          showAll ?  
                            <Box 
                                    sx={{
                                    width: "50%",       // ✅ will now work
                                    height: "auto",
                                    background: "#c9c9c957" ,
                                    margin : "auto" ,
                                    p : 3
                              }}
                              >
                              <ul 
                                    style={{
                                          listStyle: "none" ,
                                          width :  "100%" ,
                                          padding :  "0"
                                          
                                    }}   
                                    >
                                    <h1>All Tasks</h1>
                                    {
                                         allData.map((el, index)=>{
                                                return <ShowAllData el={el} key={index} index={index}/>
                                         })
                                    }  
                                  </ul>  
                              </Box> :
                              null
                         }

                </Box>
          </>
     )
   
      return toDoDesign ;

}

export default App ;