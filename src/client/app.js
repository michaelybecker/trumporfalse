// Libraries/plugins
import React from "react";
import ReactDOM from "react-dom";
import { createRenderer } from 'fela'
import { Provider as FelaProvider } from 'react-fela';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider, connect } from "react-redux";
import axios from "axios";
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
  <div style={ props.style } onClick={ props.onClick }></div>
)

class App extends React.Component {
  constructor(props) {
    super(props);

    this.store = this.props.store;
    this.store.dispatch((dispatch) => {
      dispatch({type: "GETTING_TWEETS"})
      axios.get("/getTweet").then((response) => {
        dispatch({
          type: "NEW_TWEETS",
          payload: response.data
        })
      })
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
      zIndex: "40",
      padding: "30px",
      textAlign: "center",
      position: "absolute",
      margin: "auto",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      height: "70vh",
      width: "50%",
      backgroundColor: "white",
      display: this.store.getState().score > 4 ? "flex" : "none",
      justifyContent: "center",
      alignItems: "center"
    }
    if (this.store.getState().gameState === "INITIAL_STATE") {
      return (<OverlayNewGame
        store={this.store}
        onClick={() => {
          this.store.dispatch((dispatch) => {
            dispatch({type: "GETTING_TWEETS"})
            axios.get("/getTweet").then((response) => {
              dispatch({
                type: "NEW_GAME",
                payload: response.data
              })
            })
          })
        }}
        name="Start Game"
        style={overlayTitleStyles}
        />)
    } else {
      return (<OverlayWin
        onClick={() => {
          this.store.dispatch((dispatch) => {
            dispatch({type: "GETTING_TWEETS"})
            axios.get("/getTweet").then((response) => {
              dispatch({
                type: "NEW_GAME",
                payload: response.data
              })
            })
          })
        }}
        store={this.store}
        name="Play Again!"
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
      zIndex: "20",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      backgroundColor: "#333",
      WebkitFilter: "opacity(90%)",
      filter: "opacity(90%)",
      display: this.store.getState().score > 4 ? "block" : "none"
    }

    return (
      <div className="rootDiv">
        <Overlay
          style={overlayStyles}
          onClick={() => {
            this.store.dispatch((dispatch) => {
              dispatch({type: "GETTING_TWEETS"})
              axios.get("/getTweet").then((response) => {
                dispatch({
                  type: "NEW_GAME",
                  payload: response.data
                })
              })
            })
          }}/>
        {this._chooseOverlay()}
        <div className="tweetDiv">
          <ScoreCounter score={this.store.getState().score} />
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
      <App store={createStore(reducers, middleware)} />
    </FelaProvider>,
    document.getElementById("root")
  )
}

render();
