
import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import deepFreeze from "deepfreeze";
import expect, { createSpy, spyOn, isSpy } from "expect";
import TweetCard from "./TweetCard"
import CreateFakeTweet from "./markovGenerator"

import Button from "./Button";
import realTweetArray from "./data/realTweets";
import fakeTweetArray from "./data/fakeTweets";

const ranNum = (max) => {
  return Math.floor(Math.random() * max)
}

const trumpApp = (state = [], action) => {
  switch (action.type) {
    case "TRUE_TWEET_CLICKED":
      console.log(store.getState())

      return [
        ...state,
        {
          id: action.id,
          isReal: action.isReal
        }

      ]
      break;
    case "FAKE_TWEET_CLICKED":
      return {
        // stuff
      }
    case "EMPTY_STATE":
      state = undefined
    default:
      return state;
  }
}
let idIndex = 0;
const TestButton = () => {
  return (
    <button
      onClick={() => {
        store.dispatch({
          type: "TRUE_TWEET_CLICKED",
          isReal: true,
          id: idIndex++
        })}
      }
    >
      Test Button
    </button>
  )
}

const GetStateButton = () => {
  return (
    <button
      onClick={() => {console.log(store.getState())}
      }
    >
      log state
    </button>
  )
}

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

const goodSites = [
  "http://www.naacp.org/",
  "https://www.hillaryclinton.com/",
  "http://maldef.org/immigration/litigation/",
  "https://www.plannedparenthood.org/",
  "https://www.icrc.org/eng/resources/documents/misc/57jqgr.htm"
]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      realTweetIndex: ranNum(3200),
      fakeTweetIndex: ranNum(3200)
    }
    this._newTweet = this._newTweet.bind(this);
    this._makeUrl = this._makeUrl.bind(this);
  }

  _newTweet() {
    this.setState({
      realTweetIndex: ranNum(3200),
      fakeTweetIndex: ranNum(3200)
    })
  }



  _makeUrl(tweetObject) {
    if (tweetObject.hasOwnProperty("id_str")) {
      console.log("makeurl called")
      return "https://twitter.com/realDonaldTrump/status/" + tweetObject.id_str
    } else {
      const goodSite = Math.floor(Math.random() * goodSites.length)
      console.log("goodSites index: " + goodSite)
      return goodSites[goodSite]
    }

  }

  render() {
    console.log(realTweetArray[this.state.realTweetIndex])
    console.log(fakeTweetArray[this.state.fakeTweetIndex])
    const testStyle = {
      backgroundColor: "green"
    }

    return (
      <div>
        <TestButton />
        <GetStateButton />
        <EmptyStateButton />
        <Button
          name={"Button here"}
          clickFunc={this._newTweet}/>
        <TweetCard
          content={realTweetArray[this.state.realTweetIndex]}
          url={this._makeUrl(realTweetArray[this.state.realTweetIndex])}
          style={testStyle}
        />
        <TweetCard
          content={CreateFakeTweet()}
          url={this._makeUrl(fakeTweetArray[this.state.fakeTweetIndex])}
          style={testStyle}/>
      </div>
    )
  }
}

const store = createStore(trumpApp)

const render = () => {
  ReactDOM.render(
    <App />,
    document.getElementById("root")
  )
}

render();

export { store }
