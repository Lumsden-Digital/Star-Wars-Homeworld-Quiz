import React from 'react'
import Flashcard from './Flashcard'

export default function FlashcardList(props) {
    return (
        <div>
            {props.peopleData.map(character => {
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
                        incrementScore={props.incrementScore}
                        completeQuestion={props.completeQuestion}
                    />
                )
            })}
        </div>
    )
}
