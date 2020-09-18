import React from 'react'

function Flashcard(props) {

    return (
        <div style={flashcardStyle}>

            <h1>{(props.flipped) ? props.answer : props.name}</h1>

            <div style={btnStyle}>

                <button onClick={() => {props.flip(props.id)}}>Reveal</button>

                <button onClick={() => {props.incorrect()}}>Nope!</button>

                {(props.complete) ? <button>It's away!</button>
                : 
                <button                
                    onClick={() => {
                        props.correct()
                        props.completeQuestion(props.id)
                    }}
                >correct!</button>
                }

            </div>


        </div>
    )
}

const flashcardStyle = {
    border: 'grey solid 2px',
    margin: '1rem',
    textAlign: 'center'
}

const btnStyle = {
    display: 'flex',
    justifyContent: 'space-between'
}

export default Flashcard