import React from "react";
import { store } from "./app"


class TweetCard extends React.Component {
  constructor(props) {
    super(props);

    this._redOrGreen = this._redOrGreen.bind(this)
    console.log(this.state)
  }


  _redOrGreen() {
    console.log("redorgreen called")
    if (this.props.content.isReal === true) {
      this.setState({ border: "#2ECC40 3px solid"})
    } else {
      this.setState({ border: "#FF4136 3px solid"})
    }
  }



  componentWillReceiveProps() {
    this.setState({ border: "#ddd 3px solid" })
  }


  render() {
    let idIndex = 0;
    let cardStyles = {
      backgroundColor: "white",
    }
    return (
      <div>
        <blockquote
          className={"twitter-tweet"}
          style={cardStyles}
          onClick={() => {
            store.dispatch({
              type: "TRUE_TWEET_CLICKED",
              id: idIndex++,
              isReal: this.props.content.isReal
            })
          }}
        >
          <img src="https://pbs.twimg.com/profile_images/1980294624/DJT_Headshot_V2_bigger.jpg" />
          <p>{this.props.content.text}</p>
          <footer>
              <cite>@realDonaldTrump</cite>
          </footer>
          <a href={this.props.url} target={"_blank"}>Link</a>
        </blockquote>
      </div>
    )
  }
}

export default TweetCard
