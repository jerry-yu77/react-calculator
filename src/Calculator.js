import React, {useState, useRef} from 'react';
import './Calculator.css';

function Calculator() {
  const [input, setInput] = useState("0");
  const operand1 = useRef("");
  const operand2 = useRef("");
  const operator = useRef("");
  const appendOn = useRef(true);
  const calcTotal = () => {
      let total;

      switch(operator.current) {
        case "+":
          total = parseFloat(operand1.current) + parseFloat(operand2.current || input);
          break;
        case "-":
          total = parseFloat(operand1.current) - parseFloat(operand2.current || input);
          break;
        case "x":
          total = parseFloat(operand1.current) * parseFloat(operand2.current || input);
          break;
        case "/":
          total = parseFloat(operand1.current) / parseFloat(operand2.current || input);
          break;
        default:
          break;
      }

      return total.toString();
  };
  const settingInput = (value) => {
    let truncateLength = 17;
    
    if (value.length > truncateLength) {
      value = value.substring(0, truncateLength);
    }
    setInput(value);
  }
  const buttonClick = (e) => {
    let num;
    switch(e.target.innerHTML) {
      case "C":
        setInput("0");
        operand1.current = "";
        operand2.current = "";
        operator.current = "";
        break;
      case "x^2":
        settingInput((parseFloat(input) ** 2).toString());
        break;
      case "%":
        num = parseFloat(input);
        settingInput((num/100).toString());
        break;
      case "x":
      case "/":
      case "+":
      case "-":
        if (operand2.current) {
          operand1.current = input;
          operand2.current = "";
        } else if (operand1.current) {
          let total = calcTotal();

          settingInput(total);
          operand1.current = total;
        } else {
          operand1.current = input;
        }
        operator.current = e.target.innerHTML;
        appendOn.current = false;
        break;
      case "=":
        if (operand1.current) {
          let total = calcTotal();
          
          operand2.current = operand2.current || input;
          settingInput(total);
          operand1.current = total;
        } else {
          operand1.current = input;
        }
        appendOn.current = false;
        break;
      case ".":        
        if (!input.includes(".")) {
          settingInput(input + ".");
        }
        break;
      case "+/-":
        if (input.includes("-")) {
          setInput(input.slice(1));
        } else {
          setInput("-" + input);
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
        num = e.target.innerHTML;
        
        if (input === "0" || !appendOn.current) {
          setInput(num);
          appendOn.current = true;
        } else {
          setInput(input + num);
        }
        break;
      default:
        break;
    }    
  };

  return (
    <div className="calculator-container">
      <div>
        <div className="row">
          <input value={input} readOnly={true}/>
        </div>
        <div className="row">
          <button onClick={buttonClick}>C</button>
          <button onClick={buttonClick}>x^2</button>
          <button onClick={buttonClick}>%</button>
          <button onClick={buttonClick}>/</button>
        </div>
        <div className="row">
          <button className="num-pad" onClick={buttonClick}>7</button>
          <button className="num-pad" onClick={buttonClick}>8</button>
          <button className="num-pad" onClick={buttonClick}>9</button>
          <button onClick={buttonClick}>x</button>
        </div>
        <div className="row">
          <button className="num-pad" onClick={buttonClick}>4</button>
          <button className="num-pad" onClick={buttonClick}>5</button>
          <button className="num-pad" onClick={buttonClick}>6</button>
          <button onClick={buttonClick}>-</button>
        </div>
        <div className="row">
          <button className="num-pad" onClick={buttonClick}>1</button>
          <button className="num-pad" onClick={buttonClick}>2</button>
          <button className="num-pad" onClick={buttonClick}>3</button>
          <button onClick={buttonClick}>+</button>
        </div>
        <div className="row">
          <button className="num-pad" onClick={buttonClick}>+/-</button>
          <button className="num-pad" onClick={buttonClick}>0</button>
          <button className="num-pad" onClick={buttonClick}>.</button>
          <button className="equal-button" onClick={buttonClick}>=</button>
        </div>
        
      </div>
    </div>
  );
}

export default Calculator;
