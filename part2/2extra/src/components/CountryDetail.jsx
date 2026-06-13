import {Weather} from "./Weather"

export const CountryDetail = ({uniqueMatch}) => {
  return (

    <div>
      <p></p>
      <h1>
      {uniqueMatch.name.common}
      </h1>
      <p></p>
     <div>
    <div>Capital: {uniqueMatch.capital}</div>
    <div>Area: {uniqueMatch.area}</div>
    </div>
    <p></p>
    <h1>Languages</h1>
    <ul>
  {Object.values(uniqueMatch.languages || {}).map(language => (
    <li key={language}>
      {language}
    </li>
  ))}
</ul>
      <p></p>
      <img 
  src={uniqueMatch.flags.png} 
  alt={`Flag of ${uniqueMatch.name.common}`} 
  width="150" 
/>
<p></p>
<Weather city={uniqueMatch.capital?.[0]} />

    </div>
  )
}
