// Unused

import React from 'react'
import { connect } from 'react-fela'
import { createComponent } from "react-fela";

const ImgWrapper = ({ styles, children }) => (
  <div className={styles}>
    {children}
  </div>
)


const imgWrapperStyles = props => ({
  padding: 50,

  '@media (max-width: 800px)': {
    fontSize: '40px'
  },
  animation: props.name + " 2s infinite",
  width: "200px",
  height: "200px",
  backgroundColor: props.answerVisibility === "SHOW_ANSWER" ? "green" : "blue"
})

const animation = props => ({
  '0%': {
    transform: "scale(1)"
  },
  '100%': {
    transform: "scale(" + props.scale + ")"
  },
})

const mapStylesToProps = function(props) {
  console.log(ImgWrapper)
  return function(renderer) {
    return renderer.renderRule(imgWrapperStyles, {
      name: renderer.renderKeyframe(animation, { scale: 1.1 })
    })
  }
}
console.log(connect(mapStylesToProps)(ImgWrapper))

export default connect(mapStylesToProps)(ImgWrapper)
