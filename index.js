let display = document.getElementById('display');
let currentInput = '0';

function appendToDisplay(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function calculate() {
    try {
        // Replace ÷ with / for eval
        let expression = currentInput.replace(/÷/g, '/');
        let result = eval(expression);
        // Format result to avoid floating-point precision issues
        result = Math.round(result * 1000000) / 1000000;
        currentInput = result.toString();
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
        setTimeout(clearDisplay, 1000);
    }
}

function updateDisplay() {
    display.textContent = currentInput;
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/\d/.test(key)) {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+') {
        appendToDisplay('+');
    } else if (key === '-') {
        appendToDisplay('-');
    } else if (key === '*') {
        appendToDisplay('*');
    } else if (key === '/') {
        appendToDisplay('/');
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === '(' || key === ')') {
        appendToDisplay(key);
    }
});