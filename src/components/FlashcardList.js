import React from 'react'
import Flashcard from './Flashcard'

export default function FlashcardList(props) {

    const questions = props.peopleData.map(character => {
        const { id, name, homeworldName, flipped, complete} = character
        return (
            <Flashcard 
                key={id}
                id={id}
                name={name}
                answer={homeworldName}
                flipped={flipped}
                complete={complete}
                flip={props.flip}

                //function props
                // incrementScore={props.incrementScore}
                completeQuestion={props.completeQuestion}
                // nextQuestion={props.nextQuestion}
                correct={props.correct}
                incorrect={props.incorrect}
            />
        )
    })

    return (
        <div>
            {questions[ props.question -1 ]}
        </div>
    )
}
