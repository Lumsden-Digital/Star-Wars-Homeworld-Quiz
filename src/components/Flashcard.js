import React from 'react'

function Flashcard(props) {

    return (
        <div style={flashcardStyle}>

            <h1>{(props.flipped) ? props.answer : props.name}</h1>

            <button 
                onClick={() => {props.flip(props.id)}} 
            >Reveal</button>


            <div>
                {(props.complete) ? <button>It's away!</button>
                : 
                <button                
                    onClick={() => {
                        props.incrementScore()
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

export default Flashcard