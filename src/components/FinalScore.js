import React from 'react'
import { Typography} from '@material-ui/core'

export default function FinalScore(props) {
    return (
        <div>
            <Typography variant='h4'>Final Score: {props.score}/20</Typography>
        </div>
    )
}