/*-----------Function For preloader start-----------*/
var preloader = document.getElementById('preloader');
function myFunctionLoad()
{
  preloader.style.display = 'none';
}
/*-----------Function For preloader end-------------*/
window.addEventListener('load', () => {
    // DOM references
    let calDisplay = document.querySelector('.calDisplay');
    let calButtons = document.querySelectorAll('.calButton');
    let status = document.querySelector('.status');
    let clearButton = document.querySelector('.clearButton');

    let num1 = "0";                 // First number in the calculation
    let num2 = "0";                 // Second number in the calculation
    let op = "";                    // Chosen operation
    let equalsClicked = false;      // Was the equals button clicked?
    let operationClicked = false;   // Was any operation button just clicked?
    let num2Changed = false;        // Was the second number changed as last input?

    // Common function for resetting the calculator and return to the initial state.
    let resetFunction = function() {
        num1 = "0";
        num2 = "0";
        op = "";
        calDisplay.textContent = "0";
        status.textContent = "";
        equalsClicked = false;
        operationClicked = false;
        num2Changed = false;
        currentState = states.firstNumber;
    };

    // State object with functions scoped to each state.
    let states = {
        firstNumber: {
            numberClicked: function (number) {
                if (num1 === "0") {
                    num1 = number;
                } else {
                    num1 += number;
                }
                calDisplay.textContent = num1;
            },
            operationClicked: function (operation) {
                op = operation;
                currentState = states.secondNumber;
                status.textContent = num1;
            },
            equalsClicked: function () {
                // Do nothing in this state
            },
            resetClicked: function () {
                resetFunction();
            }
        },
        secondNumber: {
            numberClicked: function (number) {
                if (equalsClicked || operationClicked) {
                    num2 = number;
                    calDisplay.textContent = num2;
                    equalsClicked = false;
                    operationClicked = false;
                    num2Changed = true;
                    return;
                }
                if (num2 === "0") {
                    num2 = number;
                    num2Changed = true;
                } else {
                    num2 += number;
                    num2Changed = true;
                }
                calDisplay.textContent = num2;
            },
            operationClicked: function (operation) {
                if (num2Changed && !equalsClicked) {
                    num1 = JSON.stringify(calculate(num1, num2, op));
                    calDisplay.textContent = num1;
                    status.textContent = num1;
                    num2Changed = false;
                }
                op = operation;
                status.textContent = num1;
                operationClicked = true;
            },
            equalsClicked: function () {
                num1 = JSON.stringify(calculate(num1, num2, op));
                calDisplay.textContent = num1;
                equalsClicked = true;
            },
            resetClicked: function () {
                resetFunction();
            }
        }
    };

    // set initial state at start
    let currentState = states.firstNumber;

    // Add click event to the clear button
    clearButton.addEventListener('click', () => {
        currentState.resetClicked();
    });

    // Initiate the number and operational buttons
    calButtons.forEach((item) => {
        if (item.dataset.val !== "=") {
            if (item.dataset.val !== "+" && item.dataset.val !== "-" && item.dataset.val !== "/" && item.dataset.val !== "%" && item.dataset.val !== "*") {
                // Add click event for all number buttons
                item.addEventListener('click', () => {
                    currentState.numberClicked(item.dataset.val);
                });
            } else {
                // Add click event for all operation buttons
                item.addEventListener('click', () => {
                    currentState.operationClicked(item.dataset.val);
                });
            }

        } else {
            // Add click event to the equals (=) button
            item.addEventListener('click', () => {
                currentState.equalsClicked();
            });
        }
    });

    function calculate(a, b, c) {
        a = Number(a);
        b = Number(b);
        switch (c) {
            case '+':
                return add(a, b);
            case '-':
                return sub(a, b);
            case '/':
                return div(a, b);
            case '%':
                return rem(a, b);
            case '*':
                return mul(a, b);
        }
    }

    function add(a, c) {
        return a + c;
    }

    function sub(a, c) {
        return a - c;
    }

    function div(a, c) {
        return Number((a / c).toFixed(5));
    }

    function rem(a, c) {
        return Number((a % c).toFixed(3));
    }

    function mul(a, c) {
        return a * c;
    }
});
