import { Countries } from './components/Countries'
import { Filter } from './components/Filter'
import { useState, useEffect } from 'react'
import countryService from './services/countryService'
import { CountryDetail } from './components/CountryDetail';




const App = () => {
	  const [filterWord, setFilterWord] = useState("");

    const [selectedCountry, setSelectedCountry] = useState(null);

	    const handleFilterChange = (event) => {
	setFilterWord(event.target.value);
  };

  const [countries, setCountries] = useState([]);

   useEffect(() => {
    countryService.getAll().then(data => {
      setCountries(data);
    });
  }, []);
 


 if (selectedCountry) {
  return <CountryDetail uniqueMatch={selectedCountry} />;
}


  return (
	<>
	<Filter filterWord={filterWord} handleFilterChange={handleFilterChange}  /> 
	<Countries 
  countries = {countries} 
  filterWord={filterWord}
  setSelectedCountry={setSelectedCountry}
  />

	</>
  )
}

export default App