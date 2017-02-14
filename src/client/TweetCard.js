import React from "react";
import { createComponent } from "react-fela";
import { connect } from 'react-fela';
import axios from "axios";
// import ImgWrapper from "./ImgWrapper"

class TweetCard extends React.Component {

  constructor(props){
    super(props)
    this._makeUrl = this._makeUrl.bind(this)
    this._tweetFormatter = this._tweetFormatter.bind(this)
    this._tweetClicked = this._tweetClicked.bind(this)
    this._whichPortrait = this._whichPortrait.bind(this)
    this._whichHandle = this._whichHandle.bind(this)
    this._link = this._link.bind(this)
  }

  componentDidMount() {
		// Set up redux subscription
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
		// Set up redux unsubscription
    this.unsubscribe();
  }

	// Construct link url to "real" tweet
  _makeUrl() {
    return "https://twitter.com/realDonaldTrump/status/" + this.props.content.id_str
  }

	// Format tweet contents
  _tweetFormatter(tweet) {

		// Ensure that no fake tweet can be longer than 140 chars
		const limitTweetLength = (thisTweet) => {
      if (thisTweet.length > 140) {
        return thisTweet.substr(0, 139)
      } else {
        return thisTweet;
      }
    }

		// If tweet is longer than 10 words, shorten it and concat "..." to it to help keep tweets similar in length. Not sure how impactful this truly is!
    if (tweet.split(" ").length < 10) {
      return limitTweetLength(tweet);
    } else {
      const textArr = tweet.split(" ")
      return limitTweetLength(textArr.slice(0, textArr.length-2).join(" ")).concat("...")
    }
  }

	// Handle clicking of tweet
  _tweetClicked(state, store) {
    if (state.answerVisibility === "HIDE_ANSWERS") {
      if (this.props.content.isReal === true) {
        store.dispatch({
          type: "RIGHT_ANSWER"
        })
      } else {
        store.dispatch({
          type: "WRONG_ANSWER"
        })
      }
      setTimeout(() => {
        store.dispatch((dispatch) => {
          dispatch({type: "GETTING_TWEETS"})
          axios.get("/getTweet").then((response) => {
            dispatch({
              type: "NEW_TWEETS",
              payload: response.data
            })
          })
        })
      }, 2500)
    }
  }

	// Assign the correct thumbnail image to the real/fake tweets once answers are revealed
  _whichPortrait(state) {
    if (state.answerVisibility === "HIDE_ANSWERS") {
      return "https://cdn2.iconfinder.com/data/icons/interface-part-2/32/question-mark-128.png";
    } else if (this.props.content.isReal === true) {
      return "https://pbs.twimg.com/profile_images/1980294624/DJT_Headshot_V2_bigger.jpg";
    } else {
      return "http://www.clker.com/cliparts/1/1/9/2/12065738771352376078Arnoud999_Right_or_wrong_5.svg.med.png";
    }
  }

	// Assign the correct handle to the real/fake tweets once the answers are revealed
  _whichHandle(state) {
    if (state.answerVisibility === "HIDE_ANSWERS") {
      return "@?";
    } else if (this.props.content.isReal === true) {
      return "@realDonaldTrump";
    } else {
      return "@TrumpBot2k";
    }
  }

	// Construct link url for the "real" tweet once answers are revealed
  _link(state) {
    if (this.props.content.isReal === true && state.answerVisibility === "SHOW_ANSWER") {
      return (
        <a
          href={this._makeUrl()}
          target={"_blank"}>Link
        </a>
      )
    }
  }

  render() {
    const { store } = this.props;
    const state = store.getState();

    let cardStyles = {
      backgroundColor: "white"
    }

		// Change border color based on answer visibility
    if (state.answerVisibility === "HIDE_ANSWERS") {
      cardStyles.border = "#333 3px solid"
    } else if (state.answerVisibility === "SHOW_ANSWER") {
      if (this.props.content.isReal === true) {
        cardStyles.border = "#2ECC40 3px solid"
      } else {
        cardStyles.border = "#FF4136 3px solid"
      }
    }


    return (
      <div
        className="tweetCard">
        <blockquote
          className={"twitter-tweet"}
          style={cardStyles}
          onClick={() => {this._tweetClicked(state, store)}}
        >
          <img src={this._whichPortrait(state)} />
          <p>{this._tweetFormatter(this.props.content.text)}</p>
          <footer>
              <cite>{this._whichHandle(state)}</cite>
          </footer>
          {this._link(state)}
        </blockquote>
      </div>
    )
  }
}

export default TweetCard
