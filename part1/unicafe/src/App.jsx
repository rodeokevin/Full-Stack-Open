import { useState } from 'react'

const App = () => {
  
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const handleGood = () => {
    setGood(good + 1)
  }

  const [neutral, setNeutral] = useState(0)
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const [bad, setBad] = useState(0)
  const handleBad = () => {
    setBad(bad + 1)
  }

  const totalFeedback = good + neutral + bad
  const averageFeedback = (good - bad)/totalFeedback
  const positiveFeeback = good / totalFeedback * 100

  const feedbackStatistics = [
    {title: 'good', data: good},
    {title: 'neutral', data: neutral},
    {title: 'bad', data: bad},
    {title: 'all', data: totalFeedback},
    {title: 'average', data: averageFeedback},
    {title: 'positive', data: `${positiveFeeback} %`},
  ]

  return (
    <div>
      <SectionTitle title="give feedback" />
      <FeedbackButton onClick={handleGood} text="good" />
      <FeedbackButton onClick={handleNeutral} text="neutral" />
      <FeedbackButton onClick={handleBad} text="bad" />
      <SectionTitle title="statistics" />
      <Statistics stats={feedbackStatistics} />
    </div>
  )
}

/* SectionTitle component */
const SectionTitle = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}

/* FeedbackButton component */
const FeedbackButton = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

/* Statistics component */
const Statistics = (props) => {
    if (props.stats[3].data) {
      return (
        <table>
          <tbody>
            <tr>
              <StatisticsLine entry={props.stats[0]} />
            </tr>
            <tr>
              <StatisticsLine entry={props.stats[1]} />
            </tr>
            <tr>
              <StatisticsLine entry={props.stats[2]} />
            </tr>
            <tr>
              <StatisticsLine entry={props.stats[3]} />
            </tr>
            <tr>
              <StatisticsLine entry={props.stats[4]} />
            </tr>
            <tr>
              <StatisticsLine entry={props.stats[5]} />
            </tr>
          </tbody>
        </table>
      )
    }
    else {
      return (
        <p>No feedback given</p>
      )
    }
}

const StatisticsLine = ({entry}) => {
  return (
    <>
      <td>
        {entry.title}
      </td>
      <td>
        {entry.data}
      </td>
    </>
  )
}

export default App