import React from "react";
// import { store } from "./app"

const goodSites = [
  "http://www.naacp.org/",
  "https://www.hillaryclinton.com/",
  "http://maldef.org/immigration/litigation/",
  "https://www.plannedparenthood.org/",
  "https://www.icrc.org/eng/resources/documents/misc/57jqgr.htm"
]


class TweetCard extends React.Component {

  constructor(props){
    super(props)
    this._makeUrl = this._makeUrl.bind(this)
  }

  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })

  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _makeUrl() {
    if (this.props.content.hasOwnProperty("id_str")) {
      return "https://twitter.com/realDonaldTrump/status/" + this.props.content.id_str
    } else {
      const goodSite = Math.floor(Math.random() * goodSites.length)
      return goodSites[goodSite]
    }
  }



  render() {
    const {store} = this.props;
    const state = store.getState();
    const url = this._makeUrl()

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

    console.log(this.props.content.isReal + " tweetcard state: ")
    console.log(state.answerVisibility)
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
          <a
            href={url}
            target={"_blank"}>Link</a>
        </blockquote>
      </div>
    )
  }
}

export default TweetCard
