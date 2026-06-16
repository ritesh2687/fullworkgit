
function outer(){
    let counter=0;
    console.log("outer function is called");
    return function inner(){
        console.log(counter);
        counter++;
    }
}

let fn=outer();
fn();
fn();
fn();








