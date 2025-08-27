let display = document.getElementById('display');
let currentExpression = '';
let lastResult = null;

function appendNumber(number) {
    if (currentExpression === '0' || currentExpression === lastResult) {
        currentExpression = number;
    } else {
        currentExpression += number;
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (currentExpression && !isOperator(currentExpression.slice(-1))) {
        currentExpression += operator;
    } else if (currentExpression && isOperator(currentExpression.slice(-1))) {
        currentExpression = currentExpression.slice(0, -1) + operator;
    }
    updateDisplay();
}

function isOperator(char) {
    return ['+', '−', '×', '÷'].includes(char);
}

function clearDisplay() {
    currentExpression = '';
    lastResult = null;
    display.value = '0';
}

function toggleSign() {
    if (currentExpression && !isOperator(currentExpression.slice(-1))) {
        let parts = currentExpression.split(/([+−×÷])/);
        let lastPart = parts[parts.length - 1];
        if (lastPart) {
            parts[parts.length - 1] = (-parseFloat(lastPart)).toString();
            currentExpression = parts.join('');
            updateDisplay();
        }
    }
}

function percent() {
    if (currentExpression && !isOperator(currentExpression.slice(-1))) {
        let parts = currentExpression.split(/([+−×÷])/);
        let lastPart = parts[parts.length - 1];
        if (lastPart) {
            parts[parts.length - 1] = (parseFloat(lastPart) / 100).toString();
            currentExpression = parts.join('');
            updateDisplay();
        }
    }
}

function calculate() {
    try {
        let expression = currentExpression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');
        if (expression) {
            let result = eval(expression);
            if (!isFinite(result)) {
                display.value = 'Error';
                currentExpression = '';
                return;
            }
            currentExpression = result.toString();
            lastResult = currentExpression;
            updateDisplay();
        }
    } catch (e) {
        display.value = 'Error';
        currentExpression = '';
    }
}

function updateDisplay() {
    display.value = currentExpression || '0';
}