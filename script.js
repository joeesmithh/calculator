const buttons = document.querySelectorAll("button");
const display = document.getElementById("display");

let expression = {
    lhs: null,
    op: null,
    rhs: null
}

function debugExpression() {
    for (const [key, value] of Object.entries(expression)) {
        console.log(`Key: ${key}, Value: ${value}`);
    }
}

function clearExpression() {
    Object.keys(expression).forEach((key) => {
        expression[key] = null;
    });
}

function updateDisplay() {
    display.textContent = "";
    if (expression.lhs !== null)
        display.textContent = expression.lhs;
    if (expression.op !== null)
        display.textContent += ` ${expression.op} `;
    if (expression.rhs !== null)
        display.textContent += expression.rhs;
}

/** @param {Element} e The element of the input number */
function makeNum(num) {

    // Append to lhs number if no op, append to rhs number otherwise
    if (expression.op === null)
        expression.lhs =
            expression.lhs === null ? num : expression.lhs + num;
    else
        expression.rhs =
            expression.rhs === null ? num : expression.rhs + num;

    updateDisplay();
}

function addOp(opID) {

    // Return if no rhs number
    if (expression.lhs === null)
        return;

    if (expression.op === null)
        expression.op = opID;

    updateDisplay();
}

function calc() {
    if (expression.op === null)
        return;

    let result = 0;
    switch (expression.op) {
        case "+":     // Add
            result =
                parseFloat(expression.lhs) + parseFloat(expression.rhs);
            break;
        case "-":     // Subtract
            result =
                parseFloat(expression.lhs) - parseFloat(expression.rhs);
            break;
        case "×":    // Multiply
            result =
                parseFloat(expression.lhs) * parseFloat(expression.rhs);
            break;
        case "÷":     // Divide
            result =
                parseFloat(expression.lhs) / parseFloat(expression.rhs);
            break;
        default:
            break;
    }

    clearExpression();
    makeNum(result);
}

function reset() {
    clearExpression();
    updateDisplay();
}

function performAction(actionString) {
    switch (actionString) {
        case "=":
            calc();
            break;
        case "C":
            reset();
            break;
        default:
            break;
    }
}

keypad.addEventListener("click", (event) => {
    const element = event.target;

    if (element instanceof Element) {
        let elementText = element.textContent.slice(0, 1); // Strip new line
        element.classList.forEach((elementClass) => {
            switch (elementClass) {
                case "num":
                    makeNum(elementText);
                    break;
                case "op":
                    addOp(elementText);
                    break;
                case "action":
                    performAction(elementText);
                    break;
                default:
                    break;
            }
        });
    }
});

/** Clears the expression and display. */
function clear() {

}
