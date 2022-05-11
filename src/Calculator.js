import React, {useState, useRef} from 'react';
import './Calculator.css';

function Calculator() {
  const [input, setInput] = useState("0");
  const operand1 = useRef("");
  const operand2 = useRef("");
  const operator = useRef("");
  const calcTotal = () => {
      let total;

      switch(operator.current) {
        case "+":
          total = parseInt(operand1.current) + parseInt(operand2.current || input);
          break;
        case "-":
          total = parseInt(operand1.current) - parseInt(operand2.current || input);
          break;
        case "x":
          total = parseInt(operand1.current) * parseInt(operand2.current || input);
          break;
        case "/":
          total = parseInt(operand1.current) / parseInt(operand2.current || input);
          break;
      }

      return total;
  };
  const buttonClick = (e) => {
    switch(e.target.innerHTML) {
      case "C":
        setInput("0");
        operand1.current = "";
        operand2.current = "";
        operator.current = "";
        break;
      case "()":
        console.log(e.target.innerHTML);
        break;
      case "%":
        break;
      case "*":
      case "/":
      case "+":
      case "-":
        if (operand2.current) {
          operand1.current = input;
          operand2.current = "";
        } else if (operand1.current) {
          let total = calcTotal();

          setInput(total);
          operand1.current = total;
        } else {
          operand1.current = input;
        }
        operator.current = e.target.innerHTML;
        break;
      case "=":
        if (operand1.current) {
          let total = calcTotal();
          
          operand2.current = operand2.current || input;
          setInput(total);
          operand1.current = total;
        } else {
          operand1.current = input;
        }
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        let num = e.target.innerHTML;
        
        if (input === "0" || operator.current) {
          setInput(num);
        } else {
          setInput(input + num);
        }
        break;
    }    
  };

  return (
    <div className="Calculator">
      <div>
        <div className="row">
          <input value={input}>
          </input>
        </div>
        <div className="row">
          <button onClick={buttonClick}>C</button>
          <button onClick={buttonClick}>()</button>
          <button onClick={buttonClick}>%</button>
          <button onClick={buttonClick}>/</button>
        </div>
        <div className="row">
          <button onClick={buttonClick}>7</button>
          <button onClick={buttonClick}>8</button>
          <button onClick={buttonClick}>9</button>
          <button onClick={buttonClick}>x</button>
        </div>
        <div className="row">
          <button onClick={buttonClick}>4</button>
          <button onClick={buttonClick}>5</button>
          <button onClick={buttonClick}>6</button>
          <button onClick={buttonClick}>-</button>
        </div>
        <div className="row">
          <button onClick={buttonClick}>1</button>
          <button onClick={buttonClick}>2</button>
          <button onClick={buttonClick}>3</button>
          <button onClick={buttonClick}>+</button>
        </div>
        <div className="row">
          <button onClick={buttonClick}>+/-</button>
          <button onClick={buttonClick}>0</button>
          <button onClick={buttonClick}>.</button>
          <button onClick={buttonClick}>=</button>
        </div>
        
      </div>
    </div>
  );
}

export default Calculator;
