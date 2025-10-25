const keypad = document.getElementById("keypad");
const display = document.getElementById("display");

let expression = {
    lhs: null,
    op: null,
    rhs: null
}

/** @param {string} s The string to append to the display. */
function append(s) {
    display.innerHTML += s;
}

/** Clears the expression and display. */
function clear() {

}

/** @param {Element} e The element of the input number */
function makeNum(e) {
    if (expression.op == null)
        expression.lhs = expression.lhs == null ?
            e.innerHTML : expression.lhs + e.innerHTML;
    else
        expression.rhs = expression.rhs == null ?
            e.innerHTML : expression.rhs + e.innerHTML;

    append(e.innerHTML)
}

/** @param {Element} e The element of the operator to add the the expressions */
function addOp(e) {
    if (expression.op == null) {
        expression.op = e.id;
        append(e.innerHTML);
    }
    else if (expression.rhs != null) {
        calc();
        expression.op = e.id;
        append(e.innerHTML);
    }
}

function calc() {
    if (expression.op == null)
        return;
    
    switch (expression.op) {
        case "add":     // Add
            expression.lhs = parseFloat(expression.lhs) + parseFloat(expression.rhs);
            break;
        case "sub":     // Subtract
            expression.lhs = parseFloat(expression.lhs) - parseFloat(expression.rhs);
            break;
        case "mult":    // Multiply
            expression.lhs = parseFloat(expression.lhs) * parseFloat(expression.rhs);
            break;
        case "div":     // Divide
            expression.lhs = parseFloat(expression.lhs) / parseFloat(expression.rhs);
            break;
        default:
            break;
    }
    expression.op = null;
    expression.rhs = null;
    console.log(expression.lhs);
}

keypad.addEventListener("click", (e) => {
    const target = e.target;

    if (target instanceof Element) {

        target.classList.forEach((s) => {
            switch (s) {
                case "num":
                    makeNum(target);
                    break;
                case "op":
                    addOp(target);
                    break;
                case "action":
                default:
                    break;
            }
        });
    }
});
