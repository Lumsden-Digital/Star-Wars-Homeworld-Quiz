import React from 'react'

export default function Intro(props) {
    return (
        <div>
            <h2>How well do you know your Star Wars characters, or at least do you know their homeworlds?</h2>
            <p>There's no multiple choice or data entry, just flip the cards to reveal the answers, then click to indicate whether you got it right or wrong.</p>
            <button onClick={props.incorrect}>Begin</button>
        </div>
    )
}
