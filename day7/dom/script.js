


// Get DOM elements
let heading = document.querySelector("#heading");
let para = document.querySelector(".para");
let body = document.querySelector("body");
let btn = document.querySelector("#btn");

// Check if elements exist before modifying
if (heading) {
    heading.innerHTML = "Modified DOM";
} else {
    console.warn("Warning: #heading element not found");
}

// Comment explaining different text methods
// text - innerText (rendered text), innerHTML (HTML content), textContent (all text)

if (body) {
    body.style.backgroundColor = "#4a8477";
} else {
    console.warn("Warning: body element not found");
}

if (para) {
    para.style.fontSize = "24px";
    para.style.color = "#ffffff";
} else {
    console.warn("Warning: .para element not found");
}

// Add click event listener to button with error handling
if (btn) {
    btn.addEventListener("click", () => {
        if (body) {
            body.style.backgroundColor = "#a8f79f";
        }
    });
} else {
    console.warn("Warning: #btn element not found");
}



check.addEventListener("click",(event)=> {
    event.preventDefault();
})

let link = document.querySelector("#link");

link.addEventListener("cli",(event)=> {
    event.preventDefault();})