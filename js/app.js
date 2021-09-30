class Calculator {
  constructor(prevCalculation, currCalculation) {
    this.prevCalculation = prevCalculation;
    this.currCalculation = currCalculation;
    this.clear();
  }

  clear() {
    this.currentOperator = "";
    this.prevOperator = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperator = this.currentOperator.toString().slice(0, -1);
  }

  appendNumber(number) {
    // ALLOWS ONLY ONE PERIOD
    if (number === "." && this.currentOperator.includes(".")) return;
    this.currentOperator = this.currentOperator.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperator === "") return;
    if (this.prevOperator !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOperator = this.currentOperator;
    this.currentOperator = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevOperator);
    const current = parseFloat(this.currentOperator);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperator = computation;
    this.operation = undefined;
    this.prevOperator = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currCalculation.innerText = this.getDisplayNumber(
      this.currentOperator
    );
    if (this.operation != null) {
      this.prevCalculation.innerText = `${this.prevOperator} ${this.operation}`;
    } else {
      this.prevCalculation.innerText = "";
    }
  }
}

// SELECTED ELEMENTs
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const resetButton = document.querySelector("[data-reset]");
const prevCalculation = document.querySelector("[data-previous]");
const currCalculation = document.querySelector("[data-current]");

const calculator = new Calculator(prevCalculation, currCalculation);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

resetButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
