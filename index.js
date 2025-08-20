// CALCULATOR PROGRAM

const display = document.getElementById('display');

function appendToDisplay(input) {
  const lastChar = display.value.slice(-1);
  const isLastCharOperatorOrDecimal = /[+\-*/.]/.test(lastChar);
  const isNewInputOperatorOrDecimal = /[+\-*/.]/.test(input);

  // Prevent an operator from being the very first character
  if (display.value.length === 0 && isNewInputOperatorOrDecimal && input !== '.') {
    return;
  }
  
  // If the last character and the new input are both operators/decimals, replace the old one
  if (isLastCharOperatorOrDecimal && isNewInputOperatorOrDecimal) {
    display.value = display.value.slice(0, -1) + input;
  } else {
    // Otherwise, append the new input as normal
    display.value += input;
  }
}

function calculateResult() {
  try {
    // Replace the symbols with JavaScript-friendly operators before evaluation
    const expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
    display.value = eval(expression);
  } catch (error) {
    display.value = "Error";
  }
}

function clearDisplay() {
  display.value = "";
}