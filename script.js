/*-----------Function For preloader start-----------*/
var preloader = document.getElementById('preloader');
function myFunctionLoad()
{
  preloader.style.display = 'none';
}
/*-----------Function For preloader end-------------*/
window.addEventListener('load', () => {

    let calDisplay = document.querySelector('.calDisplay');
    let calButtons = document.querySelectorAll('.calButton');
    let status = document.querySelector('.status');
    let clearButton = document.querySelector('.clearButton');
    let num1, num2, op, xt = "";

    // Add click event to the clear button
    clearButton.addEventListener('click', () => {
        calDisplay.textContent = " ";
        num1 = "";                                  // First number in the calculation
        num2 = "";                                  // Second number in the calculation
        op = "";                                    // Operation for the calculation
        xt = "";                                    // Did we hit the (=) button or not. After clicking this, we want to start a new caclulation
        status.textContent = "";
    });

    // Initiate the number and operational buttons
    calButtons.forEach((item) => {
        if (item.dataset.val !== "=") {
            if (item.dataset.val !== "+" && item.dataset.val !== "-" && item.dataset.val !== "÷" && item.dataset.val !== "%" && item.dataset.val !== "*") {
                // Add click event for all number buttons
                item.addEventListener('click', () => {
                    // Does the display contain operational chars?
                    const matchResult = calDisplay.textContent.trim().match(/([\+\-\÷\*\%])/g);
                    if (matchResult) {
                        op = matchResult && matchResult.join("") || "";
                        calDisplay.textContent = item.dataset.val;
                    } else {
                        // Are we adding numbers after clicking the (=) button? If so, we want to start with a new calculation.
                        if (xt === "=") {
                            xt = ""; // Restore this variable until we hit the (=) button again.
                            calDisplay.textContent = item.dataset.val; // Start with a new caclulation
                        } else {
                            calDisplay.textContent += item.dataset.val; // Add numbers to the current num1 or num2
                        }
                    }
                });
            } else {
                // Add click event for all operation buttons
                item.addEventListener('click', () => {
                    if (!(num1)) {
                        // First number is not defined. Lets add it to variable num1
                        num1 = calDisplay.textContent.trim();
                        op = item.dataset.val;
                        status.textContent = num1;
                        calDisplay.textContent = item.dataset.val;
                    } else {
                        // First number is defined. Set the second value and execute the current caclulation operation (op)
                        num2 = calDisplay.textContent.trim();
                        calculate(num1, num2, op);
                        calDisplay.textContent = item.dataset.val;
                    }
                });
            }

        } else {
            // Add click event to the equals (=) button
            item.addEventListener('click', () => {
                num2 = calDisplay.textContent.trim();
                calculate(num1, num2, op);
                num1 = "";
                num2 = "";
                status.textContent = "";
                xt = "="
            });
        }
    });

    function setDisplay(val) {
        status.textContent = num1;
        calDisplay.textContent = val;
    }

    function calculate(a, b, c) {
        a = Number(a);
        b = Number(b);
        switch (c) {
            case '+':
                add(a, b);
                break;

            case '-':
                sub(a, b);
                break;

            case '÷':
                div(a, b);
                break;

            case '%':
                rem(a, b);
                break;

            case '*':
                mul(a, b);
                break;
        }
    }

    function add(a, c) {
        num1 = a + c;
        setDisplay(a + c);
    }

    function sub(a, c) {
        num1 = a - c;
        setDisplay(a - c);
    }

    function div(a, c) {
        let val = a / c;
        num1 = val.toFixed(5);
        setDisplay(val.toFixed(5));
    }

    function rem(a, c) {
        let val = a % c;
        num1 = val.toFixed(3);
        setDisplay(parseFloat(val.toFixed(3)));
    }

    function mul(a, c) {
        num1 = a * c;
        setDisplay(a * c);
    }
});
