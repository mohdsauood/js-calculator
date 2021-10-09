// set loading preloader 
var preloader = document.getElementById('preloader');
function myFunctionLoad()
{
  preloader.style.display = 'none';
}
window.addEventListener('load', () => {
    let calDisplay = document.querySelector('.calDisplay');
    let calButtons = document.querySelectorAll('.calButton');
    let status = document.querySelector('.status');
    let clearButton = document.querySelector('.clearButton');
    let num1, num2, operator, 
    clickedOnEqualsButton = "";
  
    // Add click event to the clear button
    clearButton.addEventListener('click', () => {
        calDisplay.textContent = " ";
        num1 = "";
        num2 = "";
        operator = "";
        clickedOnEqualsButton = "";
        status.textContent = " ";
    });

    // Initiate the number and operational buttons
    calButtons.forEach((item) => {
        //item is not "="
        if (item.dataset.val !== "=") {
            // item is a number
            if (item.dataset.val !== "+" && item.dataset.val !== "-" && item.dataset.val !== "/" && item.dataset.val !== "%" && item.dataset.val !== "*") {
               addClickEventToNumberButton(item) ;   
            } 
            // item is a operator
            else {
               addClickEventToOperationButton(item);
            }

        } else {
            item.addEventListener('click', () => {
                num2 = calDisplay.textContent.trim();
                clickedOnEqualsButton = item.dataset.val;
                calculate(num1, num2, operator);
            });
        }
    });

    function setDisplay(val) {
        if (clickedOnEqualsButton) { 
            status.textContent = "";
            calDisplay.textContent = val;
        } else {
            status.textContent = val;
        }
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

            case '/':
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
function addClickEventToNumberButton(item)
{
    item.addEventListener('click', () => {
        //regex to match mathimatical operators
        const regex = RegExp('([\+\-\/\*\%])', 'g');
        // if matched value is number then update display with the number
        if (!(regex.test(calDisplay.textContent.trim()))) {
            calDisplay.textContent += item.dataset.val;
        } 
        //update display with the number and set operator property with selected operator
        else {
            operator = calDisplay.textContent.trim().match(/([\+\-\/\*\%])/g).join("");
            calDisplay.textContent = item.dataset.val;
        }
    });
}

function addClickEventToOperationButton(item){
    item.addEventListener('click', () => {
        // if first number is defined then update display with num1
        if (!(num1)) {
            num1 = calDisplay.textContent.trim();
            operator = item.dataset.val;
            status.textContent = num1;
            calDisplay.textContent = item.dataset.val;
        } else {
            //Set the second value and call calculate method
            num2 = calDisplay.textContent.trim();
            calculate(num1, num2, operator);
            calDisplay.textContent = item.dataset.val;
        }
    });
}
});


