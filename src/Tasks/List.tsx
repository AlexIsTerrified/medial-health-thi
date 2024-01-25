
import { useState } from 'react';
import {Table,TableBody,TableContainer,TableCell,TableHead,TableRow,TableSortLabel,Paper} from '@mui/material';
import Row from './Row'
import {Task} from '../misc/dataTypes'
import {sortList} from '../misc/functions'

export default function List(props: {tasks: Array<Task>,onSubmit: (tasksEdit: Array<Task>)=>void,onDelete: (i: number)=>void,onSort: (tasks: Array<Task>)=>void}){
  const [orderBy,setOrderBy] = useState<"title" | "priority" | "status">("title")
  const [desc,setDesc] = useState<boolean>(false)

  const handleEdit = (task: Task,i: number) =>{
    const newTasks: Array<Task> = props.tasks
    newTasks[i] = task
    props.onSubmit(newTasks)
  }

  const handleDelete = (i: number) => {
    props.onDelete(i)
  }

  const sortHandler = (col: "title" | "priority" | "status") => {
    let newTasks: Array<Task> = props.tasks
    if(orderBy === col){
      newTasks = sortList(col, newTasks, !desc)
      setDesc(!desc)
    }else{
      newTasks = sortList(col, newTasks)
      setOrderBy(col)
      setDesc(false)
    }
    props.onSort(newTasks)
  }

  return  <TableContainer component={Paper} sx={{backgroundColor:'#0000',border:'unset',boxShadow:'none'}}>
    <Table aria-label="simple table">
      <TableHead sx={{backgroundColor:'#0001'}}>
        <TableRow>
          <TableCell sortDirection={orderBy === 'title' ? desc ? 'desc' : 'asc' : false}>
            <TableSortLabel active={orderBy === 'title'} direction={desc ? 'desc' : 'asc'} onClick={()=>sortHandler("title")}>Title</TableSortLabel>
            </TableCell>
          <TableCell align="right" sortDirection={orderBy === 'priority' ? desc ? 'desc' : 'asc' : false}>
            <TableSortLabel active={orderBy === 'priority'} direction={desc ? 'desc' : 'asc'} onClick={()=>sortHandler("priority")}>Priority</TableSortLabel>
          </TableCell>
          <TableCell align="right" sortDirection={orderBy === 'status' ? desc ? 'desc' : 'asc' : false}>
            <TableSortLabel active={orderBy === 'status'} direction={desc ? 'desc' : 'asc'} onClick={()=>sortHandler("status")}>Status</TableSortLabel>
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          {props.tasks.map((task,i)=>{
            return <Row key={task.id+task.dueDate.toString()+task.title} task={task} i={i} onSubmit={handleEdit} onDelete={handleDelete}/>
          })}
      </TableBody>
    </Table>
  </TableContainer>
}