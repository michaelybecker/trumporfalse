import React from "react";
// import { store } from "./app"


class TweetCard extends React.Component {

  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }


  render() {
    const {store} = this.props;
    const state = store.getState();

    const tweetClicked = () => {
      if (state.answerVisibility === "HIDE_ANSWERS") {
        store.dispatch({
          type: "SHOW_ANSWER"
        })
      }
    }

    let idIndex = 0;
    let cardStyles = {
      backgroundColor: "white"
    }

    if (state.answerVisibility === "HIDE_ANSWERS") {
      cardStyles.border = "white 3px solid"
    } else if (state.answerVisibility === "SHOW_ANSWER") {
      if (this.props.content.isReal === true) {
        cardStyles.border = "#2ECC40 3px solid"
      } else {
        cardStyles.border = "#FF4136 3px solid"
      }
    }



    console.log("Tweetcard state: ")
    console.log(state.answerVisibility)
    console.log("==================")

    console.log("Background color state: ")
    console.log(cardStyles)
    console.log("==================")


    return (
      <div>
        <blockquote
          className={"twitter-tweet"}
          style={cardStyles}
          onClick={tweetClicked}
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
