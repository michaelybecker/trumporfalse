import React from "react";
import Social from "./Social"

const listStyles = {
  listStyleType: "none",
  paddingLeft: "0px"
}

const OverlayNewGame = props => (
  <div style={ props.style }>
    <ul style={ listStyles }>
      <li><h1>TRUMP OR FALSE?</h1></li>
      <li><h1>We made a robot that tries to tweet like Trump does...</h1></li>
      <li><h2>Can you tell the real tweets from the fake ones 5 times?</h2></li>
      <li><button onClick={props.onClick} className="button">{props.name}</button></li>
    </ul>
  </div>
)

const OverlayWin = props => (
  <div style={ props.style }>
    <ul style={ listStyles }>
      <li><h1>YOU WON!</h1></li>
      <li><h3>Please like/share and have a great day!</h3></li>
      <li><Social /></li>
      <li><button onClick={props.onClick} className="button" >{props.name}</button></li>
    </ul>
  </div>
)



export { OverlayWin, OverlayNewGame };
