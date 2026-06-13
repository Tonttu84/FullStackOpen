
import { CountryDetail } from './CountryDetail'




export const Countries = ({ countries, filterWord, setSelectedCountry }) => {



  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filterWord.toLowerCase())
  )

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (filteredCountries.length > 1)
  {
  return (
    <div>
      {filteredCountries.map(country => (
        <div key={country.cca3}>
          {country.name.common} <button onClick={() => setSelectedCountry(country)}>
    show
  </button>
        </div>
      ))}
    </div>
  )
  }

  if (filteredCountries.length == 0)
  {
  return (

    <div>
      <p></p>
      No matches
    </div>
  )
  }

  const match = filteredCountries[0]

   return <CountryDetail uniqueMatch={match} />;
  
  

}