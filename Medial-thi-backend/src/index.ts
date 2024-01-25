import fs from 'fs'
import bodyParser from 'body-parser'
import express from "express"
import cors from 'cors'
import {Task,assignee} from "./dataTypes.js"

const app = express()

app.use(bodyParser.json());
app.use(cors());

app.get("/",(req,res)=>{

    const data = fs.readFileSync('./data/Task List.json', 'utf8');
    const date = fs.readFileSync('./data/date.json', 'utf8');
    const Tasks: Array<Task> = JSON.parse(data);
    const editDate: string = JSON.parse(date);
    console.log(editDate)
    res.json({Tasks:Tasks,date:editDate})
})

app.post("/push",(req,res)=>{
    const newTasks: Array<Task> = req.body

    fs.writeFile('./data/Task List.json', JSON.stringify(newTasks), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("JSON data is saved.");
        }
    });
    const date = new Date()
    fs.writeFile('./data/date.json', JSON.stringify(date.valueOf()), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("JSON data is saved.");
        }
    });

    res.json(newTasks)
})


app.listen(parseInt(process.env.PORT) || 8080, () => {
    console.log('Example app listening on port 5000!');
  });