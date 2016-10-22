const dotDotifier = (tweet) => {
  const textArr = tweet.split(" ")
  return textArr.slice(0, textArr.length-2).join(" ").concat("...")
}

export default dotDotifier
