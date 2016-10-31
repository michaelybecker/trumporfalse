import { combineReducers } from "redux";


let score = 0;
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
const scoreReducer = (state = 100, action) => {
  switch(action.type) {
    case "RIGHT_ANSWER":
      return ++state
    case "WRONG_ANSWER":
      if (state > 0) {
        return --state
      } else {
        return state
      }
    case "SHOW_ANSWER":
      return score++
    case "NEW_GAME":
      return 0;
    case "TEST_WIN":
      return 15;
    default:
      return state;
  }
}
const tweetReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_TWEETS":
      return [
        {
          text: "tweet 1",
          isReal: true,
          id: 1513651
        },
        {
          text: "tweet 2 false",
          isReal: false
        }
      ]
    case "NEW_GAME":
      return [
        {
          text: "tweet 1",
          isReal: true,
          id: 1513651
        },
        {
          text: "tweet 2 false",
          isReal: false
        }
      ]
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
