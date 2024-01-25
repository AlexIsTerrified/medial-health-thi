import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button,CircularProgress} from '@mui/material';
import {Add} from '@mui/icons-material';
import AddTask from './Tasks/AddTask'
import List from './Tasks/List'
import {Task} from './misc/dataTypes'
import {getTasks, users,pullTasks, pushTasks,sortList} from './misc/functions'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [start, setStart] = useState(true)
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [force,setForce] = useState<boolean>(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (value: Task) => {
    setOpen(false)
    const newTasks = tasks
    newTasks.unshift(value)
    setTasks(newTasks)
    pushTasks(newTasks)
  }

  const initData = async () =>{
    let initTasks = await pullTasks()
    if(initTasks){
      initTasks = sortList("title",initTasks)
      setTasks(initTasks)
    }
    setLoaded(true)
  }

  const handleEdit = (tasksEdit: Array<Task>) => {
    setTasks(tasksEdit)
    pushTasks(tasksEdit)
    console.log(tasksEdit)
    setForce(!force)
  }

  const handleDelete = (i: number) => {
    const newtasks = tasks
    newtasks.splice(i,1)
    setTasks(newtasks)
    pushTasks(newtasks)
    setForce(!force)
  }

  const handleSort = (tasksSort: Array<Task>) => {
    setTasks(tasksSort)
    setForce(!force)
  }

  useEffect(()=>{
    initData()
  },[start])

  if(!loaded) return (
    <div className="loading">
      <CircularProgress />
    </div>
  )

  return (
    <div className="main">
      <div className="center">
        <div className="addTask">
          <h1>Task Manager</h1>
          <Button variant="contained" startIcon={<Add/>} onClick={handleClickOpen}>New Task</Button>
        </div>
        <div className="list">
            <List tasks={tasks} onSubmit={handleEdit} onDelete={handleDelete} onSort={handleSort}/>
        </div>
      </div>
      <AddTask open={open} onClose={handleClose} onSubmit={handleSubmit}></AddTask>
    </div>
  );
}
export default App;
