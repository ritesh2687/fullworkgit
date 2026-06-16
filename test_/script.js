// ========== BASIC CONCEPTS ==========

// 1. GETTING ELEMENTS FROM HTML
// Method 1: getElementById (get by ID attribute)
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');
const countrySelect = document.getElementById('country');
const subscribeCheckbox = document.getElementById('subscribe');
const messageTextarea = document.getElementById('message');

// Method 2: querySelector (more flexible, uses CSS selectors)
const genderRadios = document.querySelectorAll('input[name="gender"]');
const submitBtn = document.getElementById('submitBtn');
const clearBtn = document.getElementById('clearBtn');
const outputDiv = document.getElementById('output');

// ========== 2. GETTING VALUES FROM INPUT ELEMENTS ==========

// For text, email, number inputs: use .value
// For checkboxes/radio buttons: use .checked
// For select: use .value or .selectedIndex

function getFormData() {
    // Get values from different input types
    const name = nameInput.value;              // Text input
    const age = ageInput.value;                // Number input
    const email = emailInput.value;            // Email input
    const country = countrySelect.value;       // Select dropdown
    const subscribed = subscribeCheckbox.checked; // Checkbox (true/false)
    const message = messageTextarea.value;     // Textarea

    // Get selected radio button
    let selectedGender = '';
    genderRadios.forEach(radio => {
        if (radio.checked) {
            selectedGender = radio.value;
        }
    });

    return {
        name,
        age,
        email,
        country,
        subscribed,
        selectedGender,
        message
    };
}

// ========== 3. SETTING VALUES IN INPUT ELEMENTS ==========

function clearForm() {
    nameInput.value = '';
    ageInput.value = '';
    emailInput.value = '';
    countrySelect.value = '';
    subscribeCheckbox.checked = false;
    messageTextarea.value = '';
    genderRadios.forEach(radio => radio.checked = false);
}

// ========== 4. DISPLAYING OUTPUT ==========

function displayOutput(data) {
    let output = '<div class="output-item">✅ Form Data Received:</div>';
    
    output += `<div class="output-item"><strong>Name:</strong> ${data.name || 'Not provided'}</div>`;
    output += `<div class="output-item"><strong>Age:</strong> ${data.age || 'Not provided'}</div>`;
    output += `<div class="output-item"><strong>Email:</strong> ${data.email || 'Not provided'}</div>`;
    output += `<div class="output-item"><strong>Country:</strong> ${data.country || 'Not selected'}</div>`;
    output += `<div class="output-item"><strong>Gender:</strong> ${data.selectedGender || 'Not selected'}</div>`;
    output += `<div class="output-item"><strong>Newsletter:</strong> ${data.subscribed ? 'YES ✓' : 'NO ✗'}</div>`;
    output += `<div class="output-item"><strong>Message:</strong> ${data.message || 'Not provided'}</div>`;
    
    // Show some basic processing
    if (data.name) {
        output += `<div class="output-item"><strong>Welcome!</strong> Hello ${data.name.toUpperCase()}! 👋</div>`;
    }
    
    if (data.age) {
        const ageNum = parseInt(data.age);
        if (ageNum >= 18) {
            output += `<div class="output-item">✓ Age verified: You are ${ageNum} years old</div>`;
        } else {
            output += `<div class="output-item">⚠ Age: ${ageNum} years old</div>`;
        }
    }
    
    outputDiv.innerHTML = output;
}

// ========== 5. EVENT LISTENERS (Listening to user interactions) ==========

// Submit button click event
submitBtn.addEventListener('click', function() {
    console.log('Submit button clicked!');
    
    const data = getFormData();
    console.log('Form data:', data); // Check in browser console
    displayOutput(data);
});

// Clear button click event
clearBtn.addEventListener('click', function() {
    console.log('Clear button clicked!');
    clearForm();
    outputDiv.innerHTML = '<p>Form cleared. Fill and submit again!</p>';
});

// ========== 6. REAL-TIME INPUT LISTENING ==========

// Listen to input as user types
nameInput.addEventListener('input', function(event) {
    console.log('Name is being typed:', event.target.value);
    // You can do real-time validation or processing here
});

// Listen to changes in dropdown
countrySelect.addEventListener('change', function(event) {
    console.log('Country selected:', event.target.value);
});

// ========== 7. EXAMPLE 1: CALCULATOR ==========

const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const calculateBtn = document.getElementById('calculateBtn');
const calcResultDiv = document.getElementById('calcResult');

calculateBtn.addEventListener('click', function() {
    // Get values from inputs
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    
    // Validate: check if both inputs have valid numbers
    if (isNaN(num1) || isNaN(num2)) {
        calcResultDiv.textContent = '❌ Please enter valid numbers';
        calcResultDiv.style.color = 'red';
        return;
    }
    
    // Process: add the numbers
    const sum = num1 + num2;
    
    // Display result
    calcResultDiv.textContent = `✓ ${num1} + ${num2} = ${sum}`;
    calcResultDiv.style.color = 'green';
    
    console.log(`Calculation: ${num1} + ${num2} = ${sum}`);
});

// ========== 8. EXAMPLE 2: TEXT MANIPULATION ==========

const textInputElement = document.getElementById('textInput');
const upperBtn = document.getElementById('upperBtn');
const lowerBtn = document.getElementById('lowerBtn');
const textResultDiv = document.getElementById('textResult');

upperBtn.addEventListener('click', function() {
    // Get text from input
    const text = textInputElement.value;
    
    // Validate
    if (!text) {
        textResultDiv.textContent = '⚠ Please enter some text first';
        return;
    }
    
    // Process: convert to uppercase
    const result = text.toUpperCase();
    
    // Display
    textResultDiv.textContent = `Result: ${result}`;
    console.log('Uppercase:', result);
});

lowerBtn.addEventListener('click', function() {
    // Get text from input
    const text = textInputElement.value;
    
    // Validate
    if (!text) {
        textResultDiv.textContent = '⚠ Please enter some text first';
        return;
    }
    
    // Process: convert to lowercase
    const result = text.toLowerCase();
    
    // Display
    textResultDiv.textContent = `Result: ${result}`;
    console.log('Lowercase:', result);
});

// ========== BONUS: KEYBOARD EVENTS ==========

// Press Enter key to submit (optional)
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && event.ctrlKey) {
        // Ctrl + Enter to submit
        submitBtn.click();
    }
});

// ========== CONSOLE HELP ==========

console.log('%c=== JAVASCRIPT INPUT TUTORIAL ===', 'color: green; font-size: 16px; font-weight: bold;');
console.log('How to get values from HTML inputs:');
console.log('1. document.getElementById("id").value');
console.log('2. document.querySelector("selector").value');
console.log('3. For checkboxes/radio: .checked property');
console.log('For select: use .value to get selected option');
console.log('\nFill the form and click Submit to see the magic! 🚀');
