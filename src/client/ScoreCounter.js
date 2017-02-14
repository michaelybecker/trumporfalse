import React from "react";

// Simple score counter component. TODO: convert to stateless component
class ScoreCounter extends React.Component {

  render() {
    let scoreCounterStyles = {
      textAlign: "center",
      background: "white",
      border: "3px solid black",
      borderRadius: "5px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "40px"
    }
    let scoreSpanStyles = {
      padding: "0px 5px"
    }

    return (
      <div className="scoreCounter" style={scoreCounterStyles}>
        <h3><span style={scoreSpanStyles}>{this.props.score} out of 5</span></h3>
      </div>
    )
  }
}

export default ScoreCounter;
