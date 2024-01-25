import { useState, ChangeEvent } from 'react';
import {Dialog,DialogTitle,DialogContent,DialogActions,TextField,Select,MenuItem,FormControl,InputLabel,Button,SelectChangeEvent} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {Task} from '../misc/dataTypes'
import {users} from '../misc/functions'


export default function AddTask(props: {open: boolean,onClose: () => void,onSubmit: (value: Task) => void, taskEdit?: Task}){
    const {taskEdit = {
        "id": "",
        "title": "",
        "description": "",
        "dueDate": new Date(),
        "assignee": users[1],
        "priorityLevel": "low",
        "notes": "",
        "status": "pending"
    }} = props
    const [newTask, setNewTask] = useState<Task>({...taskEdit})
    const [force,setForce] = useState<boolean>(false)
    const handleClose = () => {
        props.onClose();
        setNewTask(taskEdit)
    };
    const handleSubmit = () => {
        props.onSubmit(newTask);
        setNewTask(taskEdit)
    };

    const handleEdit = (e: ChangeEvent<HTMLInputElement>) => {
        const nTask = newTask
        if(e.target.id === "title")nTask.title = e.target.value
        else if(e.target.id === "description")nTask.description = e.target.value
        else if(e.target.id === "dueDate")nTask.dueDate = new Date(e.target.value)
        else if(e.target.id === "notes")nTask.notes = e.target.value
        setNewTask(nTask);
        setForce(!force)
    }

    const handleSelect = (e: SelectChangeEvent<string>, id: String) => {
        const nTask = newTask
        if(id === "priorityLevel")nTask.priorityLevel = e.target.value as "low" | "medium" | "high"
        else if(id === "assignee")nTask.assignee = users[parseInt(e.target.value)]
        setNewTask(nTask);
        console.log(nTask.assignee)
        setForce(!force)
    }

    const handleDate = (value: Dayjs | null) => {
        const nTask = newTask
        nTask.dueDate = new Date(String(value?.toString()))
        setNewTask(nTask);
        setForce(!force)
        console.log(nTask)
    }

    return (
        <Dialog open={props.open} onClose={handleClose} maxWidth="lg">
            <DialogTitle>{!taskEdit.title ? "New Task" : "Edit Task"}</DialogTitle>
            <DialogContent>
                <div className="taskform">
                    <TextField label="Title" variant="outlined" id="title" onChange={handleEdit} value={newTask.title}/>
                    <FormControl>
                        <InputLabel id="priority-label">Priority</InputLabel>
                        <Select label="Priority" value={newTask.priorityLevel} labelId="priority-label" onChange={(e)=>handleSelect(e,"priorityLevel")}>
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="assignee-label">Assignee</InputLabel>
                        <Select label="Assignee" labelId="assignee-label" value={String(newTask.assignee.userId)} onChange={(e)=>handleSelect(e,"assignee")}>
                        {users.map((user)=>{
                            if(user.userId === 0)return
                            return <MenuItem key={String(user.userId)} value={String(user.userId)}>{user.displayName}</MenuItem>
                        })}
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker onChange={handleDate} defaultValue={dayjs(newTask.dueDate.toString())} />
                    </LocalizationProvider>
                    <TextField multiline variant='outlined' label="Description" minRows={2} onChange={handleEdit} id="description" value={newTask.description}/>
                    <TextField multiline variant='outlined' label="Notes" minRows={2} onChange={handleEdit} id="notes" value={newTask.notes}/>
                </div>
            </DialogContent>
            <DialogActions sx={{margin:1}}>
                <Button variant="contained" onClick={handleSubmit} disabled={!newTask.title || !newTask.description || !newTask.assignee}>Save</Button>
                <Button variant="text" onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}