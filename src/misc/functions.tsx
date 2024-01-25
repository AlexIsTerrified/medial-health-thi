import {Task,assignee} from './dataTypes'


export const pullTasks = async () => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000)

    const response =await fetch('https://first---medial-thi-backend-smf6xtkuia-ue.a.run.app/',{signal: controller.signal,headers: {
        "Content-Type": "application/json",
      } }).then((res)=>{
        console.log("connected")
        return res.json()
      }).catch((err)=>{console.log(err)})


      const date: string = localStorage.getItem("date") || ""
    if(!response || date>response?.date){
        const tasks: string = localStorage.getItem("tasks") || ""
        if(tasks){
            const newtasks: Array<Task> | null = parseTasks(JSON.parse(tasks))

            return newtasks
        }else{
            if(users.length < 1)users[1] = {userId:1,displayName:"John Doe"} as assignee
        }
    }else{
        if(response){
            const newtasks: Array<Task> | null = parseTasks(response.Tasks)
            return newtasks
        }else{
            if(users.length < 1)users[1] = {userId:1,displayName:"John Doe"} as assignee
        }
    }
    clearTimeout(id);
}

export const pushTasks = async(tasks: Array<Task>) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000)

    const response = fetch('https://first---medial-thi-backend-smf6xtkuia-ue.a.run.app/push',{method: "POST",signal: controller.signal,headers: {
        "Content-Type": "application/json",
      },body: JSON.stringify(tasks) }).then(()=>console.log("connected")).catch((err)=>{console.log(err)})
    localStorage.setItem("tasks",JSON.stringify(tasks))
    const date = new Date()
    localStorage.setItem("date",JSON.stringify(date.valueOf()))

    clearTimeout(id);
}

const api = [
    {
      "id": "3f5b4d60-2f96-4c0a-b65a-61a3bfeef0e5",
      "title": "Task 1",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "dueDate": "2023-06-10",
      "assignee": {
        "userId": "1",
        "displayName": "John Doe"
      },
      "priorityLevel": "high",
      "notes": "This task requires immediate attention.",
      "status": "pending"
    },
    {
      "id": "2e5b7b9d-3a9d-4f51-b72d-1e1be617c1e9",
      "title": "Task 2",
      "description": "Pellentesque habitant morbi tristique senectus et...",
      "dueDate": "2023-06-12",
      "assignee": {
        "userId": "2",
        "displayName": "Jane Smith"
      },
      "priorityLevel": "medium",
      "notes": "",
      "status": "in progress"
    },
    {
      "id": "4a5c9f7e-1d23-41ab-9cb9-64d55ab1368e",
      "title": "Task 3",
      "description": "Vestibulum consectetur elit sit amet risus consequat...",
      "dueDate": "2023-06-15",
      "assignee": {
        "userId": "1",
        "displayName": "John Doe"
      },
      "priorityLevel": "low",
      "notes": "Remember to gather all the required documents.",
      "status": "pending"
    },
    {
      "id": "9d2fe6c5-8f8c-41ef-a0ff-b3ebe1edfd10",
      "title": "Task 4",
      "description": "Curabitur at mauris varius, placerat lacus at...",
      "dueDate": "2023-06-11",
      "assignee": {
        "userId": "3",
        "displayName": "Alice Johnson"
      },
      "priorityLevel": "high",
      "notes": "This task is critical and must be completed by the due date.",
      "status": "in progress"
    },
    {
      "id": "1a4d3a29-61f8-42ae-9865-13e8a3fc3cfe",
      "title": "Task 5",
      "description": "Donec efficitur nibh vitae augue laoreet, nec aliquet...",
      "dueDate": "2023-06-14",
      "assignee": {
        "userId": "2",
        "displayName": "Jane Smith"
      },
      "priorityLevel": "medium",
      "notes": "",
      "status": "completed"
    },
    {
      "id": "39ba93c8-1a70-4e02-979e-2f5f3de55f8d",
      "title": "Task 6",
      "description": "Fusce a massa non orci aliquam finibus.",
      "dueDate": "2023-06-13",
      "assignee": {
        "userId": "3",
        "displayName": "Alice Johnson"
      },
      "priorityLevel": "low",
      "notes": "",
      "status": "pending"
    },
    {
      "id": "79e3cc9f-6e01-45e5-a95f-9e9512e0c75e",
      "title": "Task 7",
      "description": "Nulla sit amet purus ut nisi varius scelerisque sed...",
      "dueDate": "2023-06-16",
      "assignee": {
        "userId": "1",
        "displayName": "John Doe"
      },
      "priorityLevel": "medium",
      "notes": "",
      "status": "in progress"
    },
    {
      "id": "1fbf26b9-67f9-4a9e-bdcf-c4736f4a27d9",
      "title": "Task 8",
      "description": "Vestibulum pharetra mi eget diam scelerisque, sed...",
      "dueDate": "2023-06-09",
      "assignee": {
        "userId": "2",
        "displayName": "Jane Smith"
      },
      "priorityLevel": "low",
      "notes": "",
      "status": "completed"
    },
    {
      "id": "896043f0-9a34-402e-82e0-4ebe05e1a50a",
      "title": "Task 9",
      "description": "Morbi facilisis neque id turpis rutrum, eu malesuada...",
      "dueDate": "2023-06-17",
      "assignee": {
        "userId": "3",
        "displayName": "Alice Johnson"
      },
      "priorityLevel": "high",
      "notes": "",
      "status": "in progress"
    }
  ]
  
export const users: Array<assignee> = []

export const getTasks = () => {
    let tasks = api.map((task)=>{
      let newTask: Task = {...task, 
                            dueDate:new Date(task.dueDate), 
                            assignee: {...task.assignee, userId:Number(task.assignee.userId)},
                            priorityLevel: isPriority(task.priorityLevel) ? task.priorityLevel : "low",
                            status: isStatus(task.status) ? task.status : "pending"
                          }
    if(!users[parseInt(newTask.assignee.userId+"")]){
        users[parseInt(newTask.assignee.userId+"")] = newTask.assignee
    }
      return newTask
    })
    return tasks
}

  export const parseTasks = (t: Array<Task>) => {
    let tasks = t.map((task)=>{
      let newTask: Task = {...task, 
                            dueDate:new Date(task.dueDate), 
                            assignee: {...task.assignee, userId:Number(task.assignee.userId)},
                            priorityLevel: isPriority(task.priorityLevel) ? task.priorityLevel : "low",
                            status: isStatus(task.status) ? task.status : "pending"
                          }
    if(!users[parseInt(newTask.assignee.userId+"")]){
        users[parseInt(newTask.assignee.userId+"")] = newTask.assignee
    }
      return newTask
    })

    if(users.length < 1)users[1] = {userId:1,displayName:"John Doe"} as assignee
    return tasks
  }
  
  
  const isPriority = (value: string): value is "low" | "medium" | "high" =>{
    return value === "low" || value === "medium" || value === "high";
  }
  
  const isStatus = (value: string): value is 'pending' | 'in progress' | 'completed' | 'cancelled' => {
    return value === "pending" || value === "in progress" || value === "completed"|| value === "cancelled";
  }
  
  export const sortList = (col: "title" | "priority" | "status" = "title",tasks: Array<Task>,desc=false) => {
    const newTasks = tasks
    if(col === "priority"){
        newTasks.sort((a,b)=>{
            const aPriority = a.priorityLevel === "low" ? 0 : 
                            a.priorityLevel === "medium" ? 1 :
                            a.priorityLevel === "high" ? 2 : 0
            const bPriority = b.priorityLevel === "low" ? 0 : 
                            b.priorityLevel === "medium" ? 1 :
                            b.priorityLevel === "high" ? 2 : 0
            if(desc){
                return aPriority - bPriority
            }else{
                return bPriority - aPriority
            }
        })
    }else if(col === "status"){
        newTasks.sort((a,b)=>{
            const aStatus = a.status === "pending" ? 0 : 
                            a.status === "in progress" ? 1 :
                            a.status === "completed" ? 2 :
                            a.status === "cancelled" ? 3 : 0
            const bStatus = b.status === "pending" ? 0 : 
                            b.status === "in progress" ? 1 :
                            b.status === "completed" ? 2 :
                            b.status === "cancelled" ? 3 : 0
            if(desc){
                return aStatus - bStatus
            }else{
                return bStatus - aStatus
            }
        })
    }else{
        newTasks.sort((a,b)=>{
            if(desc){
                return b.title.localeCompare(a.title)
            }else{
                return a.title.localeCompare(b.title)
            }
        })
    }
    return newTasks
  }