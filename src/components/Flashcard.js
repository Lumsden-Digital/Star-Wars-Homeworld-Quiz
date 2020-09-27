import React from 'react'
import { Button } from '@material-ui/core'
function Flashcard(props) {
    return (
        <div>

            <div onClick={() => {props.flip(props.id)}} className={`card ${props.flipped ? 'flipped' : ''}`}>                
                <div className='front'>{props.name}</div>
                <div className='back'>{props.answer}</div>
            </div>
        
            <div style={btnStyle}>

                <Button 
                    onClick={() => {props.incorrect()}}
                    variant='contained'
                    color='secondary'
                    className='btn'
                >Nope!</Button>

                {(props.complete) ? 
                <Button variant='contained'>It's away!</Button>: 
                <Button                
                    onClick={() => {props.correct()                        
                        props.completeQuestion(props.id)}}
                    variant='contained' 
                    color='primary'                   
                >correct!</Button>
                }
            </div>

        </div>
    )
        
}

const btnStyle = {
    display: 'flex',
    justifyContent: 'center',

}

export default Flashcard