//JS Code



//how to change text
//how to change style
//how to create a new element
//how to delete an element


//access the element

// let heading=document.querySelector("#heading")
// let para=document.querySelector(".para")

// heading.innerHTML="<h5>Modified DOM</h5>"

//text - innerText    innerHTML  

// let body=document.querySelector("body")

// body.style.backgroundColor="red"
// para.style.fontSize="50px"

// let div=document.createElement("div")

// div.innerHTML="<h2>Submit</h2>"


// body.appendChild(div)

// para.remove();

//event handling

// let body=document.querySelector("body")

// let btn=document.querySelector("#btn")

// let check=document.querySelector("#checkbox")

// check.addEventListener("click",(event)=>{

//     event.preventDefault();
    
// })

//access all the elements

let task=document.querySelector("#taskinput")
let taskol=document.querySelector("#list")
let btn=document.querySelector("#btn")
// event handler 
btn.addEventListener("click",taskHandler)

function taskHandler(){
    let taskdata=task.value
    console.log(taskdata)

    if(taskdata==""){
        alert("please enter your task before adding")
        return;
    }
    let tasklist=document.createElement("li")
    tasklist.innerText=taskdata;

     let delbtn=document.createElement("button");
     delbtn.innerText="Delete";

     let compbtn=document.createElement("button")
     compbtn.innerText="incomplete"
     
taskol.appendChild(tasklist)
tasklist.appendChild(delbtn)
tasklist.appendChild(compbtn)

task.value=""

delbtn.addEventListener("click",()=>{

    tasklist.remove();

})

compbtn.addEventListener("click",()=>{

    compbtn.innerText="Completed"
    compbtn.style.backgroundColor="green"
})



}

//HTML CODE






