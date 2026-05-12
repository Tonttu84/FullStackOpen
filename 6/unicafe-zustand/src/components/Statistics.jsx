import { useStatisticsStore } from "../stores/store"



const Statistics = () => {
  const good = useStatisticsStore(state => state.good)
  const neutral = useStatisticsStore(state => state.neutral)
  const bad = useStatisticsStore(state => state.bad)

  const all = good + neutral + bad

  const average = all === 0
    ? 0
    : (good - bad) / all

  const positive = all === 0
    ? 0
    : good / all
  
  if (all === 0) {
  return (
    <div>
      <h2>statistics</h2>
      <p>No feedback given</p>
    </div>
  )
  }

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{average }</td></tr>
          <tr><td>positive</td><td>{positive* 100}%</td></tr>
        </tbody>
      </table>
    </div>
  )
}
export default Statistics
