
import React from "react";
import ReactDOM from "react-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";
import deepFreeze from "deepfreeze";
import expect, { createSpy, spyOn, isSpy } from "expect";
import TweetCard from "./TweetCard"
import CreateFakeTweet from "./markovGenerator";
import _ from "underscore"

import Button from "./Button";
import realTweetArray from "./data/realTweets";
import fakeTweetArray from "./data/fakeTweets";

const ranNum = (max) => {
  return Math.floor(Math.random() * max)
}


const answerVisibility = (state = { answerVisibility: "HIDE_ANSWERS" }, action) => {
  switch (action.type) {
    case "SHOW_ANSWER":
      return {
        answerVisibility: action.type
      }
    case "HIDE_ANSWERS":
      return {
        answerVisibility: action.type
      }
    default:
      return state;
  }
  console.log(store.getState())
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
    this.state = {
      currentTweets: [
        realTweetArray[ranNum(3200)],
        CreateFakeTweet()
      ]
    }
    this._newTweet = this._newTweet.bind(this);
    this._addTweet = this._addTweet.bind(this);
    this._displayCards = this._displayCards.bind(this);
  }

  _newTweet() {
    this.setState({
      currentTweets: [
        realTweetArray[ranNum(3200)],
        CreateFakeTweet()
      ]
    })
    this.props.store.dispatch({
      type: "HIDE_ANSWERS"
    })
  }

  _displayCards() {
    return _.shuffle(this.state.currentTweets).map((tweet, index) => {
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
    console.log(this.state)
    const testStyle = {
      backgroundColor: "green"
    }

    const transitionOptions = {
      transitionName: "fade",
      transitionEnterTimeout: 5000,
      transitionLeaveTimeout: 5000
    }

    return (
      <div>
        <Button
          name={"Button here"}
          clickFunc={this._newTweet}
        />
        <Button
          name="Add Tweets"
          clickFunc={this._addTweet}
        />
        <ReactCSSTransitionGroup {...transitionOptions}>
          {this._displayCards()}
        </ReactCSSTransitionGroup>
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
