import React from "react";




class ScoreCard extends React.Component {

  render() {
    let scoreStyles = {
      backgroundColor: "white",
      border: "3px solid #333",
      padding: "5px 10px",
      textAlign: "center",
      maxWidth: "450px",
      display: "inline-block",
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: "5px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
      // font: "bold 14px/18px Helvetica, Arial, sans-serif"
    }
    let scoreSpanStyles = {
      border: (this.props.score >= 0) ? "#2ECC40 1px solid" : "#FF4136 1px solid",
      padding: "0px 5px"
    }
    //
    // if (this.props.score >== 10) {
    //
    // }
    return (
      <div
        className="scoreCard"
        style={scoreStyles}>
        <h2>Donald Trump&#39;s tweetbot, TrumpBOT2k, has gone a little crazy</h2>
        <h2>Can you figure out which tweets are real?</h2>
        <h3>Your score is: <span style={scoreSpanStyles}>{this.props.score}</span></h3>
      </div>
    )
  }
}

export default ScoreCard
