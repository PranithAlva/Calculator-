let operand1 = null;
let operand2 = null;
let operator = null;
let ans = 0;
let set = 1;
let errorSet = false;
let dotSet = false;

const screen1 = document.querySelector("#screen1");
const screen2 = document.querySelector("#screen2");

screen2.innerText = "0";

function clear() {
	let text = screen1.textContent;
	if (screen2.textContent != null) {
		let subText = text.substring(0, text.length - 1);
		screen1.innerText = subText;
		if (operand2 !== null) {
			operand2 = subText;
			return;
		}
		if (operator != null) {
			operator = subText;
			return;
		}
		if (operand1 != null) {
			operand1 = subText;
			return;
		}
	} else {
		screen1.innerText = "";
		screen2.innerText = "0";
	}
}

function reset() {
	operand1 = null;
	operand2 = null;
	operator = null;
	ans = 0;
	dotSet = false;
	screen2.style = "color:white";
	screen1.innerText = "";
	screen2.innerText = 0;
}

function firstCheck(op1, op2) {
	if (op1 == null && op2 == null) return true;
	return false;
}

function otherOperator(symbol) {
	if (symbol != "=") {
		if (symbol == "-") {
			if (operator != "-" && set == 1) {
				screen1.innerText += "-";
				set = -1;
			}
		} else {
			if (set == -1 && symbol == "+") {
				let text = screen1.textContent;
				text = text.substring(0, text.length - 1);
				screen1.innerText = text;
				set = 1;
				return;
			}
			operator = symbol;
			let text = screen1.textContent;
			subText = text.substring(0, text.length - 1);
			console.log(subText);
			screen1.innerText = subText + symbol;
		}
	}
}

function errorMessage() {
	screen2.style = "color:red";
	screen2.innerText = "Error";
}

function checkAnswer(number) {
	if (number == "Infinity" || number == "-Infinity") return true;
	return isNaN(number);
}

function displayAns() {
	if (errorSet == false) {
		screen1.innerText = ans;
		screen2.innerText = "";
		operand2 = ans;
		dotset = !Number.isInteger(operand2);
		operand1 = null;
		operator = null;
		set = 1;
	}
}

function evaluateSymbol(symbol, nextSymbol) {
	if (symbol == "+") {
		operator = "+";
		screen1.innerText += nextSymbol;
		operand1 = Number(operand1) + Number(operand2);
		operand2 = null;
		console.log(operand1);
		if (checkAnswer(operand1)) {
			errorMessage();
			errorSet = true;
			return;
		} else operand1 = 0 + Number(operand1.toFixed(7));
		ans = operand1;
		console.log(operand1);
		screen2.innerText = operand1;
	}

	if (symbol == "-") {
		operator = "-";
		screen1.innerText += nextSymbol;
		operand1 = Number(operand1) - Number(operand2);
		operand2 = null;
		console.log(operand1);
		if (checkAnswer(operand1)) {
			errorMessage();
			errorSet = true;
			return;
		} else operand1 = 0 + Number(operand1.toFixed(7));
		ans = operand1;
		console.log(operand1);
		screen2.innerText = operand1;
	}

	if (symbol == "*") {
		operator = "*";
		screen1.innerText += nextSymbol;
		operand1 = Number(operand1) * Number(operand2);
		operand2 = null;
		console.log(operand1);

		if (checkAnswer(operand1)) {
			errorMessage();
			errorSet = true;
			return;
		} else operand1 = 0 + Number(operand1.toFixed(7));
		ans = operand1;
		console.log(operand1);
		screen2.innerText = operand1;
	}

	if (symbol == "/") {
		operator = "/";
		screen1.innerText += nextSymbol;
		operand1 = Number(operand1) / Number(operand2);
		operand2 = null;
		console.log(operand1);

		//check if quotient is correct
		if (checkAnswer(operand1)) {
			errorMessage();
			errorSet = true;
			return;
		} else operand1 = 0 + Number(operand1.toFixed(7));
		ans = operand1;
		console.log(operand1);
		screen2.innerText = operand1;
	}

	if (symbol == "%") {
		operator = " % ";
		screen1.innerText += nextSymbol;
		operand1 = Number(operand1) % Number(operand2);
		console.log(operand1);
		operand2 = null;
		if (checkAnswer(operand1)) {
			errorMessage();
			errorSet = true;
			return;
		} else operand1 = 0 + Number(operand1.toFixed(7));
		ans = operand1;
		console.log(operand1);
		screen2.innerText = operand1;
	}
}

function getInteger() {
	const value = this.dataset.value;

	console.log(value);
	displayText = screen1.textContent;
	if (value == ".") {
		if (!dotSet) dotSet = true;
		else value = "";
	}
	if (!displayText) {
		console.log(displayText);
		displayText += value;
	} else displayText = value;

	screen1.innerText += displayText;
	operand2 == null ? (operand2 = value) : (operand2 += value);

	if (set == -1) {
		operand2 *= -1;
		set = 1;
	}
	console.log(operand2);
}

function operation() {
	//when we dont have both operands
	if (firstCheck(operand1, operand2)) {
		if (this.dataset.value == "-") {
			screen1.innerText = "-";
			set = -1;
		}
		screen2.innerText = 0;
		return;
	}
	//get first operand
	if (operand1 == null) {
		if (this.dataset.value == "=") {
			screen2.innerText = operand2;
			operator = null;
			return;
		}
		operand1 = operand2;
		dotSet = false;
		operand2 = null;
		screen1.innerText += this.dataset.value;
		if (this.dataset.value != "=") {
			operator = this.dataset.value;
			operatorSet = true;
		}
		return;
	}
	//adding 2 operators
	value = this.dataset.value;
	if (operand2 == null) {
		//equalOperator(value);
		otherOperator(value);
		return;
	}
	//when we have both operands
	console.log(operator);
	if (value == "=") {
		evaluateSymbol(operator, value);
		if (operand1 != Infinity && operand1 != -Infinity && !isNaN(operand1)) {
			operand1 = 0 + Number(operand1.toFixed(7));
			screen1.innerText = operand1;
			screen2.innerText = "";
			dotSet = !Number.isInteger(operand1);
			operand2 = operand1;
			operand1 = null;
			operator = null;
		} else {
			let text = screen1.textContent;
			screen1.innerText = text.substring(0, text.length - 1);
		}
	} else {
		evaluateSymbol(operator, value);
		dotSet = false;
		operator = value;
	}
}

const integers = document.querySelectorAll(".integer");
const operators = document.querySelectorAll(".operator");
const controls = document.querySelectorAll(".control-button");
const powerButton = document.querySelector("#power-button");
const clearButton = document.querySelector("#clear-button");
const ansButton = document.querySelector("#ans");

integers.forEach((integer) => integer.addEventListener("click", getInteger));
operators.forEach((operator) => operator.addEventListener("click", operation));

powerButton.addEventListener("click", reset);
clearButton.addEventListener("click", clear);
ansButton.addEventListener("click", displayAns);

/*--------things to watch out----------*/
//induce keyboard controls

/*--------didnot try to fix---------*/
//clear button is still not working
//some minor bugs here and there sed life!!

/*---------what we learnt is-------*/
//nan is not equal to nan
