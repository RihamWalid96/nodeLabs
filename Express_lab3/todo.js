
const fs =require('fs');

let todos=[];
const path ="./todos.json";
let id=0;


function readFile(filepath,encoding="utf-8"){
    const file=fs.readFileSync(filepath,{encoding});
   return file;
}

function writeFile(filepath,data){
    fs.writeFileSync(filepath,JSON.stringify(data));
}

function addToDo(filepath,todoobj){
    file = readFile(filepath)
    todos=JSON.parse(file || "[]");
    let id= todos.length == 0 ? 0 : todos[todos.length-1].id;
    todoobj.id=id+1
    todos.push(todoobj);
    writeFile(filepath,todos);
}


function deleteToDo(id){
    file = readFile(path);
    todos=JSON.parse(file || "[]");
    let obj = todos.find(obj => obj.id == id);
    if(obj){
        todos=todos.filter((val)=>{
            return val!==obj	
        });
        console.log(todos)
        writeFile(path,todos);
        return true;
    }return false;  
}

function editToDo(id,todo){
    file = readFile(path);
    todos=JSON.parse(file || "[]");
    let obj = todos.find(obj => obj.id == id);
    const {title,username,status}=todo;
    if(obj){
       if(title) obj.title=title;
       if(username) obj.username=username;
       if(status) obj.status=status;
       writeFile(path,todos);
       return true;
    }return false;
}

module.exports={
    readFile,addToDo,writeFile,deleteToDo,editToDo
}