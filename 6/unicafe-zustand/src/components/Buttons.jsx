import { useStatisticsStore } from "../stores/store"

const Buttons = () => {

  const increaseGood = useStatisticsStore(state => state.actions.increaseGood)
  const increaseNeutral = useStatisticsStore(state => state.actions.increaseNeutral)
  const increaseBad = useStatisticsStore(state => state.actions.increaseBad)


  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={increaseGood}>good</button>
      <button onClick={increaseNeutral}> neutral</button>
      <button onClick={increaseBad}> bad</button>
    </div>
  )
}

export default Buttons
