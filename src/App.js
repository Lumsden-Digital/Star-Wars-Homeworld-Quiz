import React, {useState, useEffect} from 'react'
import './App.css';
import FlashcardList from './components/FlashcardList'
import Intro from './components/Intro'

function App() {

  const [peopleData, setPeopleData] = useState([{}])
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [question, setQuestion] = useState(0)

  
  useEffect(() => {

    (async function getData() {
      const success = response => response.json().then(data => data.results)

      // fetch first array of objects with people data
      const peopleData1 = fetch(
        'https://swapi.dev/api/people/',
      {method: 'get',
      headers: {
          'X-Requested-With': 'XMLHttpRequest'
      }}).then(success)
    
      // fetch second array of objects with people data
      const peopleData2 = fetch('https://swapi.dev/api/people/?page=2')
      .then(success)
    
      // await then return both fetch requests.... 
      const allPeopleData = await Promise.all([peopleData1, peopleData2])
      // then concat into single array
      .then(data => [].concat.apply([], data))

      // create variable of allPeopleData then array of URLs to fetch homeworlds
      let peopleArray = allPeopleData
      const planetLinks = peopleArray.map(personObj => personObj.homeworld.replace(/http/g,"https"))

      // Get homeworld names of each character and add to peopleArray, then add an id and flipped state 
      planetLinks.forEach((url, index) => {
        fetch(url,
          {
            method: 'get',
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
          }).then(res => res.json()).then(data => {
            peopleArray[index].homeworldName = data.name
            peopleArray[index].id = index + 1
            peopleArray[index].flipped = false
            peopleArray[index].complete = false            
          })
      })

      /////////////////////////////////////////////////////////////////////
      // Delay setting peopleData state until peopleArray has been set!! //
      /////////////////////////////////////////////////////////////////////     
      setTimeout(() => {
        setPeopleData(peopleArray)
        setIsLoading(false)
      }, 500)

    }) () // getData
      
   
  }, []) // useEffect
  
  
  const flip = (id) => {
    setPeopleData(prevData => {
      const newData = prevData.map(person => {
        if (person.id === id) {
          return {
            ...person,
            flipped: !person.flipped
          }
        }
        return person
      })
      return newData
    })
  }

  const completeQuestion = (id) => {
    setPeopleData(prevData => {
      const newData = prevData.map(person => {
        if (person.id === id) {
          return {
            ...person,
            complete: !person.complete
          }
        }
        return person
      })
      return newData
    })
  }
  
  //////////////////////
  // Button functions //
  //////////////////////
  const nextQuestion = () => {
    setQuestion(prevQuestion => prevQuestion + 1)
  }
  const incrementScore = () => {
    setScore(prevCount => prevCount + 1)
  }
  const correct = () => {
    nextQuestion()
    incrementScore()
  }
  const incorrect = () => {
    nextQuestion()
  }

  ///////////////////
  // Display logic //
  ///////////////////
  return (
    <div> 
    
      <header>
        <h1> {`Score: ${score}/20`} </h1>
      </header>

      <main>
        {(isLoading) ? <h1>Loading...</h1> : !question ? <Intro incorrect={incorrect}/> :
        
        <FlashcardList   
          //// state props        
          peopleData={peopleData}          
          question={question}

          //// function props
          flip={flip}
          completeQuestion={completeQuestion}            
          correct={correct}
          incorrect={incorrect}  
        />

      }
      </main>

    </div>

  )
}

export default App;