import { useState } from 'react'

const App = () => {

  /* RNG function */
  const getRandomIntegerInclusive = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const length = 8

  const [votes, setVotes] = useState(Array(length).fill(0))

  const handleClick = () => {
    setSelected(getRandomIntegerInclusive(0, 7))
  }

  const handleVote = () => {
    let copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const indexOfLargest = (arr) => {
    let prev = arr[0]
    let index = 0
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > prev) {
        index = i
        prev = arr[i]
      }
    }
    return (
      index
    )
  }

  return (
    <>
      <h1>Anectode of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {votes[selected]} votes
      </div>
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleClick}>next anectode</button>
      </div>
      <h1>Anectode with the most votes</h1>
      <div>
        {anecdotes[indexOfLargest(votes)]}
      </div>
    </>
  )
}

export default App