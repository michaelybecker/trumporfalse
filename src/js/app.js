// Libraries/plugins
import React from "react";
import ReactDOM from "react-dom";
import { createRenderer } from 'fela'
import { Provider as FelaProvider } from 'react-fela';
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider, connect } from "react-redux";
import _ from "underscore"

// Our Components:
import TweetCard from "./TweetCard"
import ScoreCard from "./ScoreCard"
import Button from "./Button";
import CreateFakeTweet from "./markovGenerator";
import realTweetArray from "./data/rawTweets";

const middleware = applyMiddleware(thunk, logger())

const ranNum = (max) => {
  return Math.floor(Math.random() * max)
}

let score = 0;
const answerReducer = (state = {
  answerVisibility: "HIDE_ANSWERS",
  currentTweets: [],
  score: 0
}, action) => {

  switch (action.type) {
    case "RIGHT_ANSWER":
      return {
        ...state,
        answerVisibility: "SHOW_ANSWER",
        score: ++score
      }
    case "WRONG_ANSWER":
      return {
        ...state,
        answerVisibility: "SHOW_ANSWER",
        score: --score
      }
    case "SHOW_ANSWER":
      return {
        ...state,
        answerVisibility: action.type,
        score: score++
      }
    case "HIDE_ANSWERS":
      return {
        ...state,
        answerVisibility: action.type
      }
    case "NEW_TWEETS":
      return {
        ...state,
        currentTweets: _.shuffle([
          realTweetArray[ranNum(3200)],
          CreateFakeTweet()
        ]),
        answerVisibility: "HIDE_ANSWERS"
      }
    case "NEW_GAME":
      return {
        ...state,
        currentTweets: _.shuffle([
          realTweetArray[ranNum(3200)],
          CreateFakeTweet()
        ]),
        answerVisibility: "HIDE_ANSWERS",
        score: 0
      }
    default:
      return state;
  }
}

const tweetReducer = (state = [], action) => {

}


// const reducers = combineReducers({
//   answerVisibility,
//   tweets
// })

const EmptyStateButton = () => {
  return (
    <button
      onClick={() => {
        store.dispatch({
          type: "EMPTY_STATE"
        })}
      }
    >
      empty state
    </button>
  )
}

const Social = props => (
  <div className="social-buttons">
    <a href="#" target="_blank" className="social-button facebook">
      <i className="fa fa-facebook"></i>
    </a>
    <a href="#" target="_blank" className="social-button twitter">
      <i className="fa fa-twitter"></i>
    </a>
  </div>
)

const Overlay = props => (
  <div style={ props.style }></div>
)

const OverlayTitle = props => (
  <div style={ props.style }>
    <h1>YOU WON!</h1>
    <h3>Please like/share and have a great day!</h3>
    <Social />
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props);

    this.store = this.props.store;
    this.store.dispatch({
      type: "NEW_TWEETS"
    })

    this.unsubscribe = this.store.subscribe(() => {
      console.log(this.store.getState())
      this.forceUpdate()
    })

    this._addTweet = this._addTweet.bind(this);
    this._tweets = this._tweets.bind(this);
  }



  _tweets() {
    return this.store.getState().currentTweets.map((tweet, index) => {
      return (
        <TweetCard
          store={this.props.store}
          content={tweet}
          key={index}
          id={index}
        />
      )
    })
  }

  _addTweet() {
    this.setState({
      currentTweets: [
        ...this.state.currentTweets,
        CreateFakeTweet()
      ]
    })
  }


  render() {
    const transitionOptions = {
      transitionName: "fade",
      transitionEnterTimeout: 5000,
      transitionLeaveTimeout: 5000
    }

    const scoreDivStyles = {
      display: "flex",
      marginBottom: "40px",
      marginTop: "100px"
    }

    const overlayStyles = {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      backgroundColor: "#FFDB19",
      WebkitFilter: "opacity(90%)",
      filter: "opacity(90%)",
      display: this.store.getState().score > 10 ? "block" : "none"
    }

    const overlayTitleStyles = {
      borderRadius: "5px",
      border: "3px solid #B29911",
      textAlign: "center",
      position: "absolute",
      margin: "auto",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      height: "50%",
      width: "50%",
      backgroundColor: "white",
      display: this.store.getState().score > 10 ? "block" : "none"
    }


    return (
      <div className="rootDiv">
        <Overlay style={overlayStyles} />
        <OverlayTitle style={overlayTitleStyles} />
        <div
          className="scoreDiv"
          style={scoreDivStyles}
        >
          <ScoreCard
            className="scoreCard"
            score={this.store.getState().score}
          />
        </div>
        <div className="tweetDiv">
          {this._tweets()}
        </div>
      </div>
    )
  }
}

const renderer = createRenderer()
const mountNode = document.getElementById('stylesheet')

const render = () => {
  ReactDOM.render(
    <FelaProvider renderer={renderer} mountNode={mountNode}>
      <App store={createStore(answerReducer, middleware)} />
    </FelaProvider>,
    document.getElementById("root")
  )
}

render();
