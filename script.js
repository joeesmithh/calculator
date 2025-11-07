const buttons = document.querySelectorAll("button");
const display = document.getElementById("display");

let expression = {
    lhs: null,
    op: null,
    rhs: null
}

/**
    @param {string} side The side ("left" or "right") to append the apple to.
    @param {number} count Number of apples to add.
*/
function addApples(side, count) {
    const applesSide = document.getElementById(`apples-${side}`);
    applesSide.innerHTML = "";

    for (let i = 0; i < count; i++) {
        let apple = document.createElement("img");
        apple.setAttribute("src", "./images/apple.svg");
        apple.setAttribute("alt", "apple");
        applesSide.appendChild(apple);
    }
}

/** Make a certain number of left-hand-side apples transparent.
    @param {number} count The number of apples to make transparent, beginning from the end of the list.
*/
function makeApplesTransparent(count) {
    const applesSide = document.getElementById(`apples-left`);
    let apples = applesSide.childNodes;
    
    for (let i = apples.length - 1; i > apples.length - count - 1; i--) {
        let maxIndex = Math.max(0, i);
        apples[maxIndex].classList.add("transparent");
    }
}

function debugExpression() {
    for (const [key, value] of Object.entries(expression)) {
        console.log(`Key: ${key}, Value: ${value}`);
    }
}

function clearExpression() {
    // Clear calculator display
    Object.keys(expression).forEach((key) => {
        expression[key] = null;
    });

    // Clear apples display
    addApples("left", 0);
    addApples("right", 0);
}

function updateDisplay() {
    display.textContent = "";
    if (expression.lhs !== null){
        display.textContent = expression.lhs;
        addApples("left", parseInt(expression.lhs));
    }
    if (expression.op !== null){
        display.textContent += ` ${expression.op} `;
    }
    if (expression.rhs !== null){
        display.textContent += expression.rhs;
        addApples("right", parseInt(expression.rhs));

        if(expression.op === "-"){
            makeApplesTransparent(expression.rhs);
        }
    }
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
    if (expression.rhs === null)
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