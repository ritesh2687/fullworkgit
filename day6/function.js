// function display(){
//     return function(){
//         console.log("inner function");
//     }
// }
// display()


let func=function display(){
    console.log("outer function");
    return function(){
        console.log("inner function");
    }
}
func()()


function greet(name){
    console.log("Hello ",name);
}

function display(highfunc){
    highfunc("Aman");
}

display(greet)