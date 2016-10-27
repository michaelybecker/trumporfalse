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
import ScoreCounter from "./ScoreCounter";
import Social from "./Social"
import { OverlayWin, OverlayNewGame } from "./OverlayCard"

const middleware = applyMiddleware(thunk, logger())

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

const Overlay = props => (
  <div style={ props.style }></div>
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

    this._tweets = this._tweets.bind(this);
    this._chooseOverlay = this._chooseOverlay.bind(this);
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

  _chooseOverlay() {
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
      height: "90vh",
      width: "50%",
      backgroundColor: "white",
      display: this.store.getState().score > 10 ? "block" : "none"
    }
    if (this.store.getState().gameState === "INITIAL_STATE") {
      return (<OverlayNewGame
        store={this.store}
        onClick={() => {
          this.store.dispatch({type: "NEW_GAME"})
        }}
        style={overlayTitleStyles}
        />)
    } else {
      return (<OverlayWin
        onClick={() => {
          this.store.dispatch({type: "NEW_GAME"})
        }}
        store={this.store}
        style={overlayTitleStyles}
        />)
    }
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





    return (
      <div className="rootDiv">
        <Overlay style={overlayStyles} />
        {this._chooseOverlay()}
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
