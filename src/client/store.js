import { combineReducers } from "redux";

// Init score on game load
let score = 0;

// Reducer in charge of handling displaying "right/wrong" answer info
const answerVisibility = (state = "HIDE_ANSWERS", action) => {
  switch (action.type) {
    case "RIGHT_ANSWER":
      return "SHOW_ANSWER"
    case "WRONG_ANSWER":
      return "SHOW_ANSWER"
    case "SHOW_ANSWER":
      return action.type
    case "HIDE_ANSWERS":
      return action.type
    case "NEW_TWEETS":
      return "HIDE_ANSWERS"
    case "NEW_GAME":
      return "HIDE_ANSWERS"
    default:
      return state;
  }
}

// Initial game state reducer - can probably put init score here
const gameState = (state = "INITIAL_STATE", action) => {
  switch(action.type) {
    case "INITIAL_STATE":
      return action.type;
    case "NEW_GAME":
      return action.type;
    default:
      return state;
  }
}

// Reducer in charge of
const scoreReducer = (state = 0, action) => {
  switch(action.type) {
    case "RIGHT_ANSWER":
      return ++state
    case "WRONG_ANSWER":
			// Decrease score unless score is currently 0
      if (state > 0) {
        return --state
      } else {
        return state
      }
    case "SHOW_ANSWER":
      return ++score
    case "NEW_GAME":
			// Reset score to 0 when player decides to play again
      return 0;
    default:
      return state;
  }
}

// Reducer in charge of loading new tweets to the GUI
const tweetReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_TWEETS":
      return action.payload
    case "NEW_GAME":
      return action.payload
    default:
      return state;
  }
}

const reducers = combineReducers({
  answerVisibility,
  currentTweets: tweetReducer,
  score: scoreReducer,
  gameState
})

export default reducers;
