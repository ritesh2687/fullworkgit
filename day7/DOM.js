// DOM - Document Object Model
// Represents the structure of HTML documents as a tree of objects

// 1. DOCUMENT OBJECT
console.log(document); // Root of all DOM nodes
console.log(document.title); // Page title
console.log(document.URL); // Current URL
console.log(document.domain); // Domain name

// 2. SELECTING ELEMENTS
// By ID
const element1 = document.getElementById('myId');

// By Class Name
const elements1 = document.getElementsByClassName('myClass');

// By Tag Name
const elements2 = document.getElementsByTagName('div');

// Query Selector (CSS selector - single)
const element2 = document.querySelector('.myClass');
const element3 = document.querySelector('#myId');

// Query Selector All (CSS selector - multiple)
const elements3 = document.querySelectorAll('.myClass');
const elements4 = document.querySelectorAll('div > p');

// 3. CREATING ELEMENTS
const newDiv = document.createElement('div');
const newPara = document.createElement('p');
const textNode = document.createTextNode('Hello World');

// 4. MANIPULATING ELEMENTS
// Adding content
element1.textContent = 'New Text';
element1.innerHTML = '<span>HTML Content</span>';
element1.innerText = 'Visible Text';

// Adding/Removing classes
element1.classList.add('active');
element1.classList.remove('inactive');
element1.classList.toggle('highlight');
element1.classList.contains('active');

// Setting attributes
element1.setAttribute('data-id', '123');
element1.getAttribute('data-id');
element1.removeAttribute('data-id');

// Setting styles
element1.style.color = 'red';
element1.style.backgroundColor = 'blue';
element1.style.fontSize = '20px';

// 5. APPENDING/REMOVING ELEMENTS
const parent = document.querySelector('.container');
parent.appendChild(newDiv); // Add as last child
parent.insertBefore(newDiv, parent.firstChild); // Insert at specific position
parent.removeChild(newDiv); // Remove child
newDiv.remove(); // Remove element itself
newDiv.replaceChild(newElement, oldElement); // Replace child

// 6. TRAVERSING DOM TREE
const parent1 = element1.parentElement;
const children = element1.children;
const firstChild = element1.firstElementChild;
const lastChild = element1.lastElementChild;
const nextSibling = element1.nextElementSibling;
const prevSibling = element1.previousElementSibling;

// 7. EVENT LISTENERS
element1.addEventListener('click', function() {
  console.log('Clicked!');
});

element1.addEventListener('mouseover', (event) => {
  console.log('Mouse over');
});

element1.addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('Form submitted');
});

element1.addEventListener('keydown', function(event) {
  console.log('Key pressed: ' + event.key);
});

// 8. EVENT OBJECT PROPERTIES
document.addEventListener('click', function(event) {
  console.log(event.target); // Element that triggered event
  console.log(event.currentTarget); // Element with listener
  console.log(event.type); // Type of event
  console.log(event.preventDefault()); // Prevent default action
  console.log(event.stopPropagation()); // Stop bubbling
});

// 9. DOM PROPERTIES
const element = document.querySelector('div');
console.log(element.offsetHeight); // Height with padding/border
console.log(element.offsetWidth); // Width with padding/border
console.log(element.clientHeight); // Height without border
console.log(element.clientWidth); // Width without border
console.log(element.scrollHeight); // Total scrollable height
console.log(element.scrollWidth); // Total scrollable width
console.log(element.offsetTop); // Position from top
console.log(element.offsetLeft); // Position from left

// 10. FORM ELEMENTS
const input = document.querySelector('input');
console.log(input.value); // Get input value
input.value = 'new value'; // Set input value
input.focus(); // Focus on input
input.blur(); // Remove focus

const checkbox = document.querySelector('input[type="checkbox"]');
console.log(checkbox.checked); // Check if checked
checkbox.checked = true; // Set checked state

// 11. LOCAL STORAGE
localStorage.setItem('key', 'value');
const storedValue = localStorage.getItem('key');
localStorage.removeItem('key');
localStorage.clear();

// 12. COMMON DOM METHODS
document.write('Text'); // Write to document
window.alert('Alert message'); // Show alert
window.confirm('Are you sure?'); // Show confirm dialog
window.prompt('Enter name:', 'default'); // Show prompt

// 13. TIMING
setTimeout(() => {
  console.log('Delayed execution');
}, 1000); // Execute after 1 second

setInterval(() => {
  console.log('Repeated execution');
}, 2000); // Execute every 2 seconds

// 14. FETCH API (Getting data)
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
