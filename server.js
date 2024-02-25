const fs=require('fs')
const http=require('http')
//const url=require('url')

//const taskList=[];
const server=http.createServer((request,response)=>{

if(request.url==='/')
{
    const data=fs.readFileSync('./todo.json')
    //data=JSON.parse(data);
    response.write(data);
    response.end();
}
else if(request.url==='/delete?id=1')
{
    let data=fs.readFileSync('./todo.json');
    data=JSON.parse(data);
    var result=data.filter((task)=>{
        return task.id!=1;
    })

    var PendingTasks=data.filter((task)=>{
        return task.status=='pending';
    })
    fs.writeFileSync('./todo.json',JSON.stringify(result));
    response.end();
}

})

server.listen(3001,()=>{
    console.log("Server started...");
})
server.on('error',(error)=>{
    console.log("unable to start server");
})