// set loading preloader
var preloader = document.getElementById("preloader");
function myFunctionLoad() {
  preloader.style.display = "none";
}


window.addEventListener('load', () => {
    let calDisplay = document.querySelector('.calDisplay');
    let calButtons = document.querySelectorAll('.calButton');
    let status = document.querySelector('.status');
    let clearButton = document.querySelector('.clearButton');
    let num1, num2, operator,
        clickedOnEqualsButton = "";
    let isEqualPressed = false;

    // Add click event to the clear button
    clearButton.addEventListener('click', () => {
        calDisplay.textContent = " ";
        num1 = "";
        num2 = "";
        operator = "";
        clickedOnEqualsButton = "";
        status.textContent = " ";
        isEqualPressed = false;
    });

    // Initiate the number and operational buttons
    calButtons.forEach((item) => {
        //item is not "="
        if (item.dataset.val !== "=") {
            // item is a number
            if (item.dataset.val !== "+" && item.dataset.val !== "-" && item.dataset.val !== "/" && item.dataset.val !== "%" && item.dataset.val !== "*") {
                addClickEventToNumberButton(item);
            }
            // item is a operator
            else {
                addClickEventToOperationButton(item);
            }

        } else {
            item.addEventListener('click', () => {
                if (!isEqualPressed) {
                    num2 = calDisplay.textContent.trim();
                    clickedOnEqualsButton = item.dataset.val;
                    calculate(num1, num2, operator);
                }
                isEqualPressed = true;
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
      case "+":
        add(a, b);
        break;

      case "-":
        sub(a, b);
        break;

      case "/":
        div(a, b);
        break;

      case "%":
        rem(a, b);
        break;

      case "*":
        mul(a, b);
        break;
			
		case "Clear":
        clearData();
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
    // checking if denominator is zero or not
    if (c == 0) {
      setDisplay("Can't divide by 0");
    } else {
      let val = a / c;
      num1 = val.toFixed(5);
      setDisplay(val.toFixed(5));
    }
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
  
  function clearData() {
    return false;
  }
  

  function addClickEventToNumberButton(item) {
    item.addEventListener("click", () => {
      var patt1 = /[\+\-\/\*\%]/g;

      //regex to match mathimatical operators
      // const regex = RegExp('([\+\-\/\*\%])', 'g');
      // if matched value is number then update display with the number

      if (!calDisplay.textContent.trim().match(patt1)) {
        calDisplay.textContent += item.dataset.val;
      }
      //update display with the number and set operator property with selected operator
      else {
        operator = calDisplay.textContent
          .trim()
          .match(/([\+\-\/\*\%])/g)
          .join("");
        calDisplay.textContent = item.dataset.val;
      }
    });
  }

  function addClickEventToOperationButton(item) {
    item.addEventListener("click", () => {
      // if first number is defined then update display with num1
      if (!num1) {
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

  document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (
      key === "." ||
      key === "0" ||
      key === "1" ||
      key === "2" ||
      key === "3" ||
      key === "4" ||
      key === "5" ||
      key === "6" ||
      key === "7" ||
      key === "8" ||
      key === "9" ||
      key === "+" ||
      key === "-" ||
      key === "/" ||
      key === "%" ||
      key === "*"
    ) {
      if (
        key !== "+" &&
        key !== "-" &&
        key !== "/" &&
        key !== "%" &&
        key !== "*"
      ) {
        addKeyboardEventToNumberButton(key);
      } else {
        addKeyboardEventToOperationButton(key);
      }
    } else if (key === "=" || key === "Enter") {
      num2 = calDisplay.textContent.trim();
      clickedOnEqualsButton = key;
      calculate(num1, num2, operator);
      isEqualPressed = true;
    } else if (event.keyCode === 8) {
      calDisplay.textContent = " ";
      num1 = "";
      num2 = "";
      operator = "";
      clickedOnEqualsButton = "";
      status.textContent = " ";
      isEqualPressed = false;
    }
  });

  function addKeyboardEventToNumberButton(item) {

        var patt1 = /[\+\-\/\*\%]/g;

        //regex to match mathimatical operators
        // const regex = RegExp('([\+\-\/\*\%])', 'g');
        // if matched value is number then update display with the number

        if (!calDisplay.textContent.trim().match(patt1)) {
            calDisplay.textContent += item;
        }
        // update display with the number and set operator property with selected operator
        else {
            operator = calDisplay.textContent.trim().match(/([\+\-\/\*\%])/g).join("");
            calDisplay.textContent = item;
        }
    }

  function addKeyboardEventToOperationButton(item) {
    // if first number is defined then update display with num1
    if (!num1) {
      console.log("for num1: ", num1, item);
      num1 = calDisplay.textContent.trim();
      operator = item;
      status.textContent = num1;
      calDisplay.textContent = item;
    } else {
      //Set the second value and call calculate method
      num2 = calDisplay.textContent.trim();
      calculate(num1, num2, operator);
      calDisplay.textContent = item;
    }
  }
});
