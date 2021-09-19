import logo from './logo.svg';
import './App.css';
import Header from './Component/Header'
import Tasks from './Component/Tasks'
import AddTask from './Component/AddTask'
import LoginHeaderWrapper from './Component/LoginHeaderWrapper';
import { useState } from "react"
import { BrowserRouter as Router, Redirect} from 'react-router-dom'
import { Route, Switch} from 'react-router-dom'
import MainPage from './Component/MainPage';
//import { useState, useEffect } from 'react';

import {Deploy} from './Component/Deploy/Deploy'
function App() {
  const [signIn, setSignIn] = useState(false)
  // const [showAddTask,setShowAddTask] = useState(false)
  // const [tasks,setTasks] = useState([
  //     {
  //         id:1,
  //         text: 'Doctors Appointment',
  //         day: 'Feb 5th at 2:30pm',
  //         reminder: true,
  //     },
  //     {
  //         id:2,
  //         text: 'Meeting at school',
  //         day: 'Feb 6th at 1:30pm',
  //         reminder: true,
  //     },
  //     {
  //         id:3,
  //         text: 'Food shopping',
  //         day: 'Feb 6th at 2:30pm',
  //         reminder: false,
  //     }
  // ])

  // //Delete task
  // const deleteTask = (id) => {
  //   setTasks(tasks.filter((task)=>task.id!==id))
  // }

  // //togle reminder
  // const toggleReminder = (id) => {
  //   setTasks(tasks.map((task) => task.id===id 
  //   ? {...task, reminder: !task.reminder} 
  //   : task)
  //   )
  // }

  // //add task
  // const addTask = (task) => {
  //   const id = Math.floor(Math.random()*10000)+1
  //   const newTask = {id,...task}
  //   setTasks([...tasks,newTask])
  // }
  
  return (
    <Switch>
      <div className = "container">
        <div className = "content-wrapper">

          <Route exact path="/" component={() => (<LoginHeaderWrapper signIn={signIn} setSignIn={setSignIn} />)}/>
          <Route exact path="/mainpage" component={MainPage}/>
        </div>
        {/* <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd = {showAddTask}/>
        {showAddTask && <AddTask onAdd={addTask}/>}
        {tasks.length > 0 ? <Tasks tasks ={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> 
        : (
          'No Tasks to Show'
          )} */}
      </div>
    </Switch>
  )
  // const [state, setState] = useState({})

  // useEffect(()=>{
  //   fetch("/api").then(response => {
  //     if(response.status == 200){
  //       return response.json()
  //     }
  //   }).then(data => setState(data))
  //   .then(error => console.log(error))
  // },[])
  // return (
  //   <div className="App">
  //     <Deploy prop={state}/>
  //   </div>
  // );
}


export default App;
