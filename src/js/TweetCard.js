import React from "react";


class TweetCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            border: " #ddd 3px solid"
        }
        this._redOrGreen = this._redOrGreen.bind(this)
    }


    _redOrGreen() {
        console.log("redorgreen called")
        if (this.props.content.isReal === true) {
            this.setState({
                border: "#2ECC40 3px solid"
            })
        } else {
            this.setState({
                border: "#FF4136 3px solid"
            })
        }
    }



    componentWillReceiveProps() {
        this.setState({
            border: "#ddd 3px solid"
        })
    }


    render() {
        let cardStyles = {
            backgroundColor: "white",
            border: this.state.border
        }
        return ( <
            div >
            <
            blockquote className = {
                "twitter-tweet"
            }
            style = {
                cardStyles
            }
            onClick = {
                this._redOrGreen
            } >
            <
            img src = "https://pbs.twimg.com/profile_images/1980294624/DJT_Headshot_V2_bigger.jpg" / >
            <
            p > {
                this.props.content.text
            } < /p> <
            footer >
            <
            cite > @realDonaldTrump < /cite> <
            /footer> <
            a href = {
                this.props.url
            }
            target = {
                "_blank"
            } > Link < /a> <
            /blockquote> <
            /div>
        )
    }
}

export default TweetCard
