// Libraries/plugins
import React from "react";
import ReactDOM from "react-dom";
import { createRenderer } from 'fela'
import { Provider as FelaProvider } from 'react-fela';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider, connect } from "react-redux";
import _ from "underscore"

// Our Components:
import reducers from "./store"
import TweetCard from "./TweetCard"
import ScoreCard from "./ScoreCard"
import Button from "./Button";
import CreateFakeTweet from "./markovGenerator";
import realTweetArray from "./data/rawTweets";
import ScoreCounter from "./ScoreCounter";

const middleware = applyMiddleware(thunk, logger())

const ranNum = (max) => {
  return Math.floor(Math.random() * max)
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
    <button onClick={props.onClick} className="button" >Play Again!</button>
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
      // marginTop: "100px"
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
      padding: "30px",
      textAlign: "center",
      position: "absolute",
      margin: "auto",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      // height: "50%",
      width: "50%",
      backgroundColor: "white",
      display: this.store.getState().score > 10 ? "block" : "none"
    }


    return (
      <div className="rootDiv">
        <Overlay style={overlayStyles} />
        <OverlayTitle style={overlayTitleStyles} onClick={() => {
            this.props.store.dispatch({type: "NEW_GAME"})
          }}/>
        <div
          className="scoreDiv"
          style={scoreDivStyles}
          >
          <ScoreCard
            className="scoreCard"
          />
        </div>
        <div className="tweetDiv">
          <ScoreCounter score={this.store.getState().score} />
          {this._tweets()}
        </div>
        <button onClick={() => {
            this.props.store.dispatch({type: "TEST_WIN"})
          }}>TEST WIN</button>
      </div>
    )
  }
}

const renderer = createRenderer()
const mountNode = document.getElementById('stylesheet')

const render = () => {
  ReactDOM.render(
    <FelaProvider renderer={renderer} mountNode={mountNode}>
      <App store={createStore(reducers, middleware)} />
    </FelaProvider>,
    document.getElementById("root")
  )
}

render();
