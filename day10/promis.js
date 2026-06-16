let prominse=new Promise((resolve,reject)=>{
    let num=9;
    if(num%2==0){
        resolve("Even number");
    }   else{
        reject("Odd number");
    }
});
prominse
.then(message=>{
    console.log("Resolved: "+message);
})
.catch(message=>{
    console.log("Rejected: "+message);
})
