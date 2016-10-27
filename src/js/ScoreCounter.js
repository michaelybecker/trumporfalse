import React from "react";


class ScoreCounter extends React.Component {

  render() {
    let scoreCounterStyles = {
      textAlign: "center",
      background: "white",
      border: "3px solid black",
      borderRadius: "5px",
      display: "inline-block",
      width: "100%"
    }
    let scoreSpanStyles = {
      border: (this.props.score >= 0) ? "#2ECC40 1px solid" : "#FF4136 1px solid",
      padding: "0px 5px"
    }

    return (
      <div style={scoreCounterStyles}>
        <h3>Your score is: <span style={scoreSpanStyles}>{this.props.score}</span></h3>
      </div>
    )
  }
}

export default ScoreCounter;
