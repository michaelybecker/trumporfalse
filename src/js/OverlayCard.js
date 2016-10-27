import React from "react";
import Social from "./Social"



const OverlayWin = props => (
  <div style={ props.style }>
    <h1>YOU WON!</h1>
    <h3>Please like/share and have a great day!</h3>
    <Social />
    <button onClick={props.onClick} className="button" >Play Again!</button>
  </div>
)

const OverlayNewGame = props => (
  <div style={ props.style }>
    <h1>New Game</h1>
    <button onClick={props.onClick} className="button">Start Game</button>
  </div>
)


export { OverlayWin, OverlayNewGame };
