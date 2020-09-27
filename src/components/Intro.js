import React from 'react'
import { Button, Typography } from '@material-ui/core'

export default function Intro(props) {
    return (
        <div>
            <Typography variant='h4'>How well do you know your Star Wars characters, or at least do you know their homeworlds?</Typography>
            <p>There's no multiple choice or data entry, just flip the cards to reveal the answers, then click to indicate whether you got it right or wrong.</p>
            <Button 
                onClick={props.incorrect}
                variant='contained'        
            >Begin</Button>
        </div>
    )
}
