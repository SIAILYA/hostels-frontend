import React, {useState} from "react"
import {Animated} from "react-animated-css"

import up from "../../img/up.svg"
import down from "../../img/down.svg"


const Vote = ({reviewRating, onUp, onDown}) => {
    const [visible, setVisible] = useState('true')
    const [upVoted, setUpVoted] = useState(false)
    const [downVoted, setDownVoted] = useState(false)
    const [votes, setVotes] = useState(reviewRating)

    return (
        <React.Fragment>
            <div style={{display: "flex"}}>
                <Animated style={{display: "inline-block", padding: "6px 6px", margin: "auto"}} animationIn="fadeInDown" animationOut="fadeOutDown" animationInDuration={200} animationOutDuration={200} isVisible={visible}>
                    {votes}
                </Animated>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <img
                        src={up}
                        onClick={() => {
                            if (upVoted){
                                setVotes(prev => prev - 1)
                            } else {
                                setVotes(prev => prev + 1)
                            }

                            if (downVoted){
                                setVotes(prev => prev + 1)
                            }

                            setDownVoted(false)
                            setUpVoted(prevState => !prevState)
                            setVisible(false)
                            setTimeout(() => {setVisible(true)}, 150)                }}
                        width="23vw"
                        height="23vw"
                        style={upVoted ? { borderRadius: "100%", background: "rgba(119,250,71,0.2)", padding: "6px 6px"} : {padding: "6px 6px"}}
                        alt=""
                    />
                    <img
                        src={down}
                        onClick={() => {
                            if (downVoted){
                                setVotes(prev => prev + 1)
                            } else {
                                setVotes(prev => prev - 1)
                            }

                            if (upVoted){
                                setVotes(prev => prev - 1)
                            }

                            setUpVoted(false)
                            setDownVoted(prevState => !prevState)
                            setVisible(false)
                            setTimeout(() => {setVisible(true)}, 150)
                        }}
                        width="23vw"
                        height="23vw"
                        style={downVoted ? { borderRadius: "100%", background: "rgba(255,100,80,0.22)", padding: "6px 6px"} : {padding: "6px 6px"}}
                        alt=""
                    />
                </div>
            </div>
        </React.Fragment>
    )
}


export default Vote;