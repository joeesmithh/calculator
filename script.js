// The main math expression
let expression = {
    lhs: null,
    op: null,
    rhs: null
}

/** Append apples to display.
    @param {string} side The side ("left" or "right") to append the apple to.
    @param {number} count Number of apples to add. */
function addApples(side, count) {
    const applesSide = document.getElementById(`apples-${side}`);
    applesSide.innerHTML = "";

    for (let i = 0; i < count; i++) {
        let apple = document.createElement("img");
        apple.setAttribute("src", "./images/apple.svg");
        apple.setAttribute("alt", "apple");
        apple.classList.add("apple");
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

/** Clear the math expression */
function clearExpression() {
    // Clear calculator display
    Object.keys(expression).forEach((key) => {
        expression[key] = null;
    });
}

/** Update displays to reflect math expression. */
function updateDisplay() {
    display.textContent = "";
    if (expression.lhs !== null) {
        // Append number and apples to left-hand-side displays
        display.textContent = expression.lhs;
        addApples("left", parseInt(expression.lhs));
    }
    if (expression.op !== null) {
        // Append operator to apple and calculator displays
        display.textContent += ` ${expression.op} `;
        document.getElementById("apples").querySelector("p").textContent
            = `  ${expression.op}  `;
    }
    if (expression.rhs !== null) {
        // Append number and apples to right-hand-side displays
        display.textContent += expression.rhs;
        addApples("right", parseInt(expression.rhs));

        // Make left-hand-side apples transparent if subtracting
        if (expression.op === "-") {
            makeApplesTransparent(expression.rhs);
        }
    }
}

/** Build either number of the math expression.
    @param {Element} e The element of the input number */
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

/** Specify operator to add to the math expression.
    @param {string} operator The operator to add to the expression (+, -, ×, or ÷) */
function addOp(operator) {

    // Return if no rhs number
    if (expression.lhs === null)
        return;

    if (expression.op === null)
        expression.op = operator;

    updateDisplay();
}

/** Perform calculation on expression and update display. */
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

    // Clear expression and add result to new expression
    reset();
    makeNum(result);
}

/** Clear expression and displays. */
function reset() {
    clearExpression();

    // Clear apples display
    addApples("left", 0);
    addApples("right", 0);

    // Clear apples operator
    document.getElementById("apples").querySelector("p").textContent = '';

    updateDisplay();
}

/** Perform an action on the expression.
    @param {string} action The action to perform ('=' to calculate, or 'C' to clear)
 */
function performAction(action) {
    switch (action) {
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

// Add onClick event listener to keypad button elements
$("button").click(function (event) { 
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



