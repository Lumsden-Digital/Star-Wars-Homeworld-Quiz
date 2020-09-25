import React from 'react'

function Flashcard(props) {

    return (
        <div>

            <div onClick={() => {props.flip(props.id)}} className={`card ${props.flipped ? 'flipped' : ''}`}>                
                <div className='front'>{props.name}</div>
                <div className='back'>{props.answer}</div>
            </div>
        
            <div style={btnStyle}>
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

const btnStyle = {
    display: 'flex',
    justifyContent: 'center'
}

export default Flashcard