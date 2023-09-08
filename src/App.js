import './App.css';
import { useState, useEffect } from 'react';
import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import ButtonBox from './components/ButtonBox';
import Button from './components/Button';
import { create, all } from 'mathjs'

const btnValues = [
  ["C", "Del", "%", "/", "\u221A"],
  [7, 8, 9, "x", "("],
  [4, 5, 6, "-", ")"],
  [1, 2, 3, "+", "^"],
  [0, ".", "e", "="],
];


function App() {

  const [input, setInput] = useState("0");
  const math = create(all)

  const handleButtonClick = (btn) => {
    if (btn === "C") {
      setInput("0");

    } else if (btn === "Del") {
      setInput((prevInput) => {
        if (prevInput.length === 1) {
          // If there's only one character, set input to "0"
          return "0";
        } else {
          // Remove the last character
          return prevInput.slice(0, -1);
        }
      });

    } else if (btn === "=") {
      try {
        let convertedInput = input.replace(/x/g, '*'); // replace 'X' with '*'
        convertedInput = convertedInput.replace(/√/g, 'sqrt');

        const result = math.evaluate(convertedInput);
        console.info('the result is: ', result)

        if (result === Infinity || isNaN(result)) {
          setInput("Error: Division by zero");
        }
        else {
          setInput(result.toString());
        }
      } catch (error) {
        setInput("Error");
      }
    } else {
      setInput((prevInput) => {
        // Convert prevInput and btn to strings before concatenating
        const prevInputStr = prevInput.toString();
        const btnStr = btn.toString();
        if (prevInputStr === "0" && (btnStr === "/" || btnStr === "." || btnStr === "+")) {
          return prevInputStr + btnStr;
        } else if (prevInputStr === "0") {
          return btnStr;
          // } else if (prevInputStr === "0" && btnStr === "/") {
          //   return prevInputStr + btnStr;
        } else if (/[0-9]/.test(prevInputStr)) {
          return prevInputStr + btnStr;

        }
        else if (prevInputStr.endsWith("\u221A")) {
          return prevInputStr + "(" + btnStr;
        }
        else {
          return prevInputStr + btnStr;
        }
      });
    }
  };


  //Enables keyboard input
  useEffect(() => {
    const appElement = document.querySelector('.App');
    appElement.focus();
  }, []);

  // Handle keyboard input
  const handleKeyDown = (event) => {
    console.log('Key pressed:', event.key);
    event.preventDefault();
    const key = event.key;

    // Check if digit, operator or '='
    if (/[\d+\-*\/=^%.]/.test(key)) {

      handleButtonClick(key);
    } else if (key === "Enter") {

      handleButtonClick("=");
    } else if (key === "Backspace") {

      handleButtonClick("Del");

    } else if (key === "Escape") {
      handleButtonClick("C");
    }
  };


  return (
    <div className="App" tabIndex={0} onKeyDown={handleKeyDown}>
      <Wrapper>

        <Screen value={input} />

        <ButtonBox>
          {
            btnValues.flat().map((btn, i) => {
              return (
                <Button
                  key={i}
                  className={btn === "=" ? "equals" : ""}
                  value={btn}
                  onClick={() => {
                    console.log(`${btn} clicked!`);
                    handleButtonClick(btn);
                  }}
                />
              );
            })
          }
        </ButtonBox>
      </Wrapper>

    </div>
  );
}

export default App;


