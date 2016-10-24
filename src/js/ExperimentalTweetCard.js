import React from "react";
import { createComponent } from "react-fela";
import { connect } from 'react-fela'
// import ImgWrapper from "./ImgWrapper"

const goodSites = [
  "http://www.naacp.org/",
  "https://www.hillaryclinton.com/",
  "http://maldef.org/immigration/litigation/",
  "https://www.plannedparenthood.org/",
  "https://www.icrc.org/eng/resources/documents/misc/57jqgr.htm"
]

// const ImgWrapper = ({ title, styles, children }) => (
//   <div className={styles}>
//     {children}
//   </div>
// )
//
// const imgWrapperStyles = props => ({
//   padding: 50,
//   ':hover': {
//     animationDuration: '500ms'
//   },
//   '@media (max-width: 800px)': {
//     fontSize: '40px'
//   },
//   animation: props.name + " 2s infinite",
//   width: "200px",
//   height: "200px",
//   backgroundColor: "blue"
// })
//
// const animation = props => ({
//   '0%': {
//     transform: "scale(1)"
//   },
//   '100%': {
//     transform: "scale(" + props.scale + ")"
//   },
// })
//
// const mapStylesToProps = function(props) {
//   return function(renderer) {
//     return renderer.renderRule(imgWrapperStyles, {
//       name: renderer.renderKeyframe(animation, { scale: 2 })
//     })
//   }
// }
//
// connect(mapStylesToProps)(ImgWrapper)

// const ImgWrapper = createComponent(props => ({
//   "> img": {
//     transform: "scale(.5)",
//     transform: props.answerVisibility === "SHOW_ANSWER" ? "scale(1)" : "scale(.5)",
//     transition: "all .2s cubic-bezier(.39,.04,.43,1.89)"
//   }
// }), "div")



class TweetCard extends React.Component {

  constructor(props){
    super(props)
    this._makeUrl = this._makeUrl.bind(this)
    this._dotDotifier = this._dotDotifier.bind(this)
    this._tweetClicked = this._tweetClicked.bind(this)
    this._whichPortrait = this._whichPortrait.bind(this)
    this._whichHandle = this._whichHandle.bind(this)
  }

  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })

  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _makeUrl() {
    if (this.props.content.hasOwnProperty("id_str")) {
      return "https://twitter.com/realDonaldTrump/status/" + this.props.content.id_str
    } else {
      const goodSite = Math.floor(Math.random() * goodSites.length)
      return goodSites[goodSite]
    }
  }

  _dotDotifier(tweet) {
    if (tweet.split(" ").length < 5) {
      console.log(this.props.content.isReal + " short tweet")
      return tweet;
    } else {
      const textArr = tweet.split(" ")
      return textArr.slice(0, textArr.length-2).join(" ").concat("...")
    }
  }

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
        store.dispatch({
          type: "NEW_TWEETS"
        })
      }, 500)
    }
  }

  _whichPortrait(state) {
    if (state.answerVisibility === "HIDE_ANSWERS") {
      return "http://i45.photobucket.com/albums/f98/llanginger/silhouette.jpg";
    } else if (this.props.content.isReal === true) {
      return "https://pbs.twimg.com/profile_images/1980294624/DJT_Headshot_V2_bigger.jpg";
    } else {
      return "http://i45.photobucket.com/albums/f98/llanginger/robotTrump.jpg";
    }
  }

  _whichHandle(state) {
    if (state.answerVisibility === "HIDE_ANSWERS") {
      return "@?";
    } else if (this.props.content.isReal === true) {
      return "@realDonaldTrump";
    } else {
      return "@TrumpBot2k";
    }
  }

  render() {
    const { store } = this.props;
    const state = store.getState();

    let cardStyles = {
      backgroundColor: "white"
    }

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
      <div className="tweetCard">
        <blockquote
          className={"twitter-tweet"}
          style={cardStyles}
          onClick={() => {this._tweetClicked(state, store)}}
        >
          <img src={this._whichPortrait(state)} />
          <p>{this._dotDotifier(this.props.content.text)}</p>
          <footer>
              <cite>{this._whichHandle(state)}</cite>
          </footer>
          <a
            href={this._makeUrl()}
            target={"_blank"}>Link
          </a>
        </blockquote>
      </div>
    )
  }
}

export default TweetCard
