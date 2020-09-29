import React, {
  useState,
  useEffect
} from 'react'
import './App.css';
import FlashcardList from './components/FlashcardList'
import Intro from './components/Intro'
import {
  Container,
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress';
import FinalScore from './components/FinalScore';


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
        'https://swapi.dev/api/people/', {
          method: 'get',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then(success)

      // fetch second array of objects with people data
      const peopleData2 = fetch('https://swapi.dev/api/people/?page=2')
        .then(success)

      // await then return both fetch requests.... 
      const allPeopleData = await Promise.all([peopleData1, peopleData2])
        // then concat into single array
        .then(data => [].concat.apply([], data))

      // create variable of allPeopleData then array of URLs to fetch homeworlds
      let peopleArray = allPeopleData
      const planetLinks = peopleArray.map(personObj => personObj.homeworld.replace(/http/g, "https"))

      // Get homeworld names of each character and add to peopleArray, then add an id and flipped state 
      planetLinks.forEach((url, index) => {
        fetch(url, {
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

      setPeopleData(peopleArray)
      setIsLoading(false)

    })() // getData


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

  const appbarStyle = {
    // backgroundColor: 'black',
    color: 'white'
  }
  const toolbarStyle = {
    display: 'flex',
  }
  const titleStyle = {
    maxWidth: '50%'
  }
  const scoreStyle = {
    marginLeft: 'auto'
  }
  const progressStyle = {
    marginTop: '2rem'
  }

  return ( <
    div >
    <
    Container maxWidth = 'sm' >

    <
    AppBar position = "static"
    style = {
      appbarStyle
    } >
    <
    Toolbar style = {
      toolbarStyle
    } >
    <
    Typography variant = "h6"
    style = {
      titleStyle
    } >
    Star Wars Homeworld Quiz <
    /Typography> <
    Typography variant = "h6"
    style = {
      scoreStyle
    } > {
      `Score: ${score}/20`
    } <
    /Typography> < /
    Toolbar > <
    /AppBar>

    <
    main > {
      (isLoading) ? < h1 > Loading... < /h1> : (question===0) ? <Intro incorrect={incorrect}/ > : (question === 21) ? < FinalScore score = {
        score
      }
      /> : <
      FlashcardList
      //// state props        
      peopleData = {
        peopleData
      }
      question = {
        question
      }

      //// function props
      flip = {
        flip
      }
      completeQuestion = {
        completeQuestion
      }
      correct = {
        correct
      }
      incorrect = {
        incorrect
      }
      />

    } {
      (!question) ? '' : (question < 21) ?
      <
      div >
        <
        LinearProgress variant = "determinate"
      value = {
        question
      }
      style = {
        progressStyle
      }
      />   <
      Typography variant = 'h6' > Question {
        question
      }
      out of 20 < /Typography> < /
      div >: ''
    }



    <
    /main> < /
    Container >

    <
    /div>

  )


}

export default App;