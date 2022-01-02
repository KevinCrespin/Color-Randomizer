import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [colorPallete, setColorPallete] = useState([]);
  const [hexColor, setHexColor] = useState("CLICK HERE");
  const [hexTextColor, setTextColor] = useState("light");
  const [showColorAdded, setShowColorAdded] = useState(false);
  const [showColorPallete, setShowColorPallete] = useState(false);
  const [textContent, setTextContent] = useState("Press space to copy");

  const hexRandomizer = () => {
    setTextContent("Press space to copy");
    setShowColorAdded(false);
    let randomHex = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    if (randomHex.length !== 7) {
      for (let i = randomHex.length; i < 7; i++) {
        randomHex += 0;
      }
    }
    getTextColor(randomHex);
  };

  const getTextColor = (hexCode) => {
    setHexColor(hexCode);

    const rgb = parseInt(hexCode.substring(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const isDark = 0.2126 * r + 0.7152 * g + 0.0722 * b < 150;

    setTextColor(isDark ? "dark" : "light");
  };

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === " " && hexColor !== "CLICK HERE") {
        navigator.clipboard.writeText(hexColor.toUpperCase());
        setTextContent("Copied to clipboard!");
      }
    },
    { once: true }
  );

  const addColor = () => {
    if (hexColor === "CLICK HERE" || colorPallete.length >= 7) return false;

    for (var i = 0; i < colorPallete.length; i++) {
      if (colorPallete[i].color === hexColor) {
        return false;
      }
    }
    
    setColorPallete([...colorPallete, { color: hexColor, text: hexTextColor }]);
    return true;
  };

  return (
    <div
      className="random-hex"
      style={{
        backgroundColor: `${hexColor}`
      }}
    >
      <h2 className={hexTextColor}>RandomHex</h2>
      <div className="git-container">
        <a href="https://github.com/KevinCrespin">
          <i className={`fab fa-github ${hexTextColor}`}/>
        </a>
      </div>
      <div className="show-container">
        <i className={`fas fa-palette show-icon ${hexTextColor}`}
          onClick={() => {
            setShowColorPallete(!showColorPallete);
          }}/>
      </div>
      <div className="color-pallete">
        {showColorPallete && colorPallete.map((e, i) => (
          <div
            key={i}
            style={{
              backgroundColor: `${hexTextColor === "dark" ? "#FFF" : "#000"}`,
            }}
            className="color-div"
          >
            <div
              style={{
                color: `${e.text === "dark" ? "#FFF" : "#000"}`,
                backgroundColor: `${e.color}`,
              }}
              className="text-div"
              onClick={(e) => console.log(e)}
            >
              {e.color.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
      <h1>  
        <a href="/#" className={hexTextColor} onClick={hexRandomizer}>
          {hexColor}
        </a>
        <div className="add">
          <a href="/#" onClick={() => {
              const colorAdded = addColor();
              if (colorAdded) {
                setShowColorAdded(true);
              }
            }
          }>
            {!showColorAdded && hexColor !== "CLICK HERE" && colorPallete.length < 7
            && 
              <i className={`far fa-plus-square ${hexTextColor}`}></i>
            }
            {showColorAdded &&
              <div className={`color-added ${hexTextColor}`}>
                Color added to palette!
              </div>
            }
          </a>
        </div>
      </h1>
      <h3 className={hexTextColor}>{textContent}</h3>
    </div>
  );
};

export default App;
