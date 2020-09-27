import React from 'react'
import { Typography} from '@material-ui/core'

export default function FinalScore(props) {
    const evaluation = (props.score===20) ? 
    'Indeed you are powerful' : (props.score>15) ?
    'You are not a jedi yet' : (props.score>10) ?
    'You must unlearn what you have learned' : (props.score>5) ?
    'That bad huh?' : (props.score>2) ?
    'Weak minded fool!' : (props.score===0) ?
    'You want to go home and rethink your life' : ''
    return (
        <div>
            <Typography variant='h4'>Final Score: {props.score}/20</Typography>
            <Typography variant='h6'>      {evaluation}   </Typography>
        </div>
    )
}