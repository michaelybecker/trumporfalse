import React from "react";
import Social from "./Social"

// Style object
const listStyles = {
  listStyleType: "none",
  paddingLeft: "0px"
}

// New Game overlay component
const OverlayNewGame = props => (
  <div style={ props.style }>
    <ul style={ listStyles }>
      <li><h1>TRUMP OR FALSE?</h1></li>
      <li><h1>Trump or False is an absurdist <a href="https://en.wikipedia.org/wiki/Markov_chain" target="_blank">Markov chain</a> experiment to see what happens when you try to randomly generate tweets in Trump's style</h1></li>
      <li><h2>Can you tell the real tweets from the fake ones?</h2></li>
      <li><button onClick={props.onClick} className="button">{props.name}</button></li>
    </ul>
  </div>
)

// Win condition overlay component
const OverlayWin = props => (
  <div style={ props.style }>
    <ul style={ listStyles }>
      <li><h1>YOU WON!</h1></li>
      <li><h3>Check me out on GitHub:</h3></li>
      <li><Social /></li>
      <li><button onClick={props.onClick} className="button" >{props.name}</button></li>
    </ul>
  </div>
)



export { OverlayWin, OverlayNewGame };
