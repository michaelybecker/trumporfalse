// Libraries/plugins
import React from "react";
import ReactDOM from "react-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";
import deepFreeze from "deepfreeze";
import expect, { createSpy, spyOn, isSpy } from "expect";
import CreateFakeTweet from "./markovGenerator";
import _ from "underscore"

// Our Components:
import TweetCard from "./TweetCard"
import ScoreCard from "./ScoreCard"
import Button from "./Button";
import realTweetArray from "./data/rawTweets";

const ranNum = (max) => {
  return Math.floor(Math.random() * max)
}
let score = 0;
const answerVisibility = (state = {
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
    default:
      return state;
  }
}

// const trumpAppReducers = combineReducers({
//   trumpApp,
//   answerVisibility
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

    return (
      <div className="rootDiv">
        <ScoreCard
          className="scoreCard"
          score={this.store.getState().score}
        />
        <div className="tweetDiv">
          {this._tweets()}
        </div>
      </div>
    )
  }
}

// const store = createStore(answerVisibility)

const render = () => {
  ReactDOM.render(
    <App store={createStore(answerVisibility)} />,
    document.getElementById("root")
  )
}

render();

// export { store }

// <Button
//   name={"Add store tweets"}
//   clickFunc={()=> {
//     this.store.dispatch({ type: "NEW_TWEETS" })
//   }}
// />
// <Button
//   name="Log Store"
//   clickFunc={() => {
//     console.log(this.store.getState())
//   }}
// />
