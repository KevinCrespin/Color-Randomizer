import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [hexColor, setHexColor] = useState("CLICK HERE");
  const [textColor, setTextColor] = useState("isLight");
  const [textContent, setTextContent] = useState("Press space to copy");
  const [colorPallete, setColorPallete] = useState([]);

  const hexRandomizer = () => {
    setTextContent("Press space to copy");
    let randomHex = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    if (randomHex.length !== 7) {
      for (let i = randomHex.length; i < 7; i++) {
        randomHex += 0;
      }
    }
    getTextColor(randomHex);
  };

  const getTextColor = (hexCode) => {
    const rgb = parseInt(hexCode.substring(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const isDark = 0.2126 * r + 0.7152 * g + 0.0722 * b < 150;

    if (isDark) {
      setTextColor("isDark");
      setHexColor(hexCode);
    } else {
      setTextColor("isLight");
      setHexColor(hexCode);
    }
  };

  document.addEventListener(
    "keydown",
    function (event) {
      if (event.key === " " && hexColor !== "CLICK HERE") {
        navigator.clipboard.writeText(hexColor.toUpperCase());
        setTextContent("Copied!");
      }
    },
    { once: true }
  );

  const addToColorPallet = () => {
    var found = false;
    for (var i = 0; i < colorPallete.length; i++) {
      if (colorPallete[i].color === hexColor) {
        found = true;
        break;
      }
    }

    if (hexColor === "CLICK HERE") {
      return;
    } else if (found) {
      return;
    } else if (colorPallete.length >= 10) {
      return;
    } else {
      setColorPallete([...colorPallete, { color: hexColor, text: textColor }]);
    }
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: `${hexColor}`,
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <h2 className={textColor}>RandomHex</h2>
      <div className="git">
        <a href="https://github.com/KevinCrespin">
          <i className={`fab fa-github ${textColor}`}> </i>
        </a>
      </div>
      <div className="colorPallete">
        {colorPallete.map((e, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#FFF",
            }}
            className="colorDiv"
          >
            <div
              style={{
                color: `${e.text === "isDark" ? "#FFF" : "#000"}`,
                backgroundColor: `${e.color}`,
              }}
              className="textDiv"
            >
              {e.color.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
      <h1>
        <a href="/#" className={textColor} onClick={hexRandomizer}>
          {hexColor}
        </a>
        <div className="add">
          <a href="/#" onClick={addToColorPallet}>
            <i className={`far fa-plus-square ${textColor}`}></i>
          </a>
        </div>
      </h1>
      <h3 className={textColor}>{textContent}</h3>
    </div>
  );
};

export default App;
