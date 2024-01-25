
import {TableCell,TableRow,Collapse,IconButton,Box,Button,Dialog,DialogTitle,DialogContent,DialogActions,Menu,MenuItem} from '@mui/material';
import {KeyboardArrowUp, KeyboardArrowDown} from '@mui/icons-material';
import AddTask from './AddTask'
import {Task} from '../misc/dataTypes'
import { useState } from 'react';


export default function Row(props: {task: Task, i: number,onSubmit: (task: Task,i: number)=>void,onDelete: (i: number)=>void}){
    const atask: Task = {...props.task}
    const [openEdit, setOpenEdit] = useState(false);
    const [open, setOpen] = useState<boolean>(false)
    const [openDelete, setOpenDelete] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openStatus = Boolean(anchorEl);

    const handleClose = () => {
        setOpenEdit(false);
        setOpenDelete(false)
      };

    const handleSubmit = (task: Task) => {
        setOpenEdit(false)
        props.onSubmit(task, props.i)
    }

    const handleDelete = (i: number) =>{
        props.onDelete(i)
    }

    const handleStatus = (status: 'pending' | 'in progress' | 'completed' | 'cancelled') => {
        const newTask = {...props.task}
        newTask.status = status
        handleSubmit(newTask)
        setAnchorEl(null)
    }

    let statusColor: "secondary" | "success" | "primary" | "error" = props.task.status === 'pending' ? 'secondary' : 
                        props.task.status === 'in progress' ? 'success' : 
                        props.task.status === 'completed' ? 'primary' :
                        props.task.status === 'cancelled' ? 'error' : 'secondary';

    return (
        <>
         <TableRow sx={{ '& > *': { borderBottom: 'unset' },cursor:'pointer' }}>
            <TableCell component="th" scope="row">{props.task.title}</TableCell>
            <TableCell align="right">{props.task.priorityLevel}</TableCell>
            <TableCell align="right">
                <Button variant='text' onClick={(event)=>{
                        setAnchorEl(event.currentTarget);
                    }} color={statusColor}>{props.task.status}</Button>
                <Menu anchorEl={anchorEl} open={openStatus} onClose={()=>setAnchorEl(null)}>
                    {props.task.status !== 'pending' ? <MenuItem onClick={()=>handleStatus("pending")}>pending</MenuItem> : ""}
                    {props.task.status !== 'in progress' ? <MenuItem onClick={()=>handleStatus("in progress")}>in progress</MenuItem> : ""}
                    {props.task.status !== 'completed' ? <MenuItem onClick={()=>handleStatus("completed")}>completed</MenuItem> : ""}
                    {props.task.status !== 'cancelled' ? <MenuItem onClick={()=>handleStatus("cancelled")}>cancelled</MenuItem> : ""}
                </Menu>
            </TableCell>
            <TableCell align="right">
                <IconButton size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
            </TableCell>
        </TableRow>
        <TableRow sx={{'& > *': { borderBottom: '1px solid #0001' }}}>
            <TableCell style={{ paddingBottom: 10, paddingTop: 0,}} colSpan={5}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{margin:2}} >
                        <div className="collapsable">
                            <div className="assignee">
                                <b>Assignee</b>
                                <p>{props.task.assignee.displayName}</p>
                            </div>
                            <div className="due_date">
                                <b>Due Date</b>
                                <p>{props.task.dueDate.toDateString()}</p>
                            </div>
                            <div className="description">
                                <b>Description</b>
                                <p>{props.task.description}</p>
                            </div>
                            <div className="notes">
                                <b>Notes</b>
                                <p>{props.task.notes}</p>
                            </div>
                        </div>
                        <div className="buttons">
                            <Button variant="contained" color="primary" onClick={()=>setOpenEdit(true)}>Edit</Button>
                            <Button variant="contained" color="error" onClick={()=>setOpenDelete(true)}>Delete</Button>
                        </div>
                    </Box>
                </Collapse>
            </TableCell>
            <AddTask open={openEdit} onClose={handleClose} onSubmit={handleSubmit} taskEdit={atask}></AddTask>
            <DeleteDialog open={openDelete} onClose={handleClose} onDelete={()=>handleDelete(props.i)}/>
        </TableRow>
        </>
    )
}

const DeleteDialog = (props : {open: boolean,onClose: () => void,onDelete: () => void}) => {

    const handleClose = () => {
        props.onClose();
    };

    const handleDelete = () => {
        props.onDelete()
        props.onClose();
    };
    return (
        <Dialog open={props.open} onClose={handleClose} maxWidth="lg">
            <DialogTitle>
                Delete Task?
            </DialogTitle>
            <DialogContent>
                <p>Are you sure you would like to delete this task?</p>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color="error" onClick={handleDelete}>Delete</Button>
                <Button variant='text' onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}