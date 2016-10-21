import React from "react";




class ScoreCard extends React.Component {

  render() {
    let scoreStyles = {
      backgroundColor: "white",
      padding: "5px 10px",
      textAlign: "center",
      width: "500px",
      display: "absolute",
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: "5px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
      // font: "bold 14px/18px Helvetica, Arial, sans-serif"
    }
    return (
      <div
        className="scoreCard"
        style={scoreStyles}>
        <h2>Donald Trump&#39;s tweetbot, TrumpBOT2k, has gone a little crazy</h2>
        <h2>Can you figure out which tweets are real?</h2>
        <h3>Your score is: {this.props.score}</h3>
      </div>
    )
  }
}

export default ScoreCard
