import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, NavigationControl, GeolocateControl } from "react-map-gl";
import { useState, useEffect } from "react";
import styled from 'styled-components'



function App() {
  const [data, setData] = useState([]);
  const [chosenCountry, setChosenCountry] = useState('all');
  const [chosenCity, setChosenCity] = useState('all');
  const [chosenCompany, setChosenCompany] = useState('all');

  useEffect(() => {
    async function fetchData() {
      const result = await fetch("http://api.citybik.es/v2/networks");
      const data = await result.json();
      setData(data.networks);
    }
    fetchData();
  }, []);

  const uniqueCountries = Array.from(
    new Set(data.map((item) => item.location.country))
  );

  const filteredByCountry = chosenCountry === 'all' ? data : data.filter((item) => item.location.country === chosenCountry);

  const uniqueCities = Array.from(
    new Set(filteredByCountry.map((item) => item.location.city))
  );

  const filteredByCities = chosenCity === 'all' ? filteredByCountry : filteredByCountry.filter((item) => item.location.city === chosenCity);
  
  const filteredByCompany = chosenCompany === 'all' ? filteredByCities : filteredByCities.filter(item => {
    if (!item.company) return false;
    if (typeof item.company === 'string') {
      return item.company === chosenCompany;
    }
    return item.company.includes(chosenCompany)
  })

  return (
    <Contianer className="App">
      <h2>this is a mapbox</h2>
      <Map
        mapboxAccessToken="pk.eyJ1IjoiemFuZ3VyYSIsImEiOiJjbGUybnM3YW8wMG92M29xajNkaXFnMXhwIn0.5mKLHHR16BxcqzVViKNVqg"
        style={{
          width: "500px",
          height: "500px",
          borderRadius: "15px",
          border: "2px solid red",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9" >
        {filteredByCompany.map((item, index) => {
          return (
            <Marker
              key={index}
              longitude={item.location.longitude}
              latitude={item.location.latitude}
            />
          )
        })}
        <NavigationControl position="bottom-right" />
        <GeolocateControl />
      </Map>
      <Cont>
        <SelectContainer>
          <span>Choose a Country</span>
          <select
            value={chosenCountry}
            onChange={(e) => {
              setChosenCountry(e.target.value);
              setChosenCity('all');
            }}
            placeholder="Select a country"
          >
            <option value='all'>All</option>
            {uniqueCountries.map((country) => {
              return (
                <option key={country} value={country}>{ country}</option>
              )
            })}
          </select>
        </SelectContainer>
        <SelectContainer>
          <span>Choose a City</span>
          <select
            disabled={chosenCountry === 'all'}
            value={chosenCountry === 'all' ? 'all' : chosenCity}
            onChange={(e) => {
              setChosenCity(e.target.value);
              setChosenCompany('all');
            }}
            placeholder="Select a city"
          >
            <option value='all'>All</option>
            {uniqueCities.map((city) => {
              return (
                <option key={city} value={city}>{ city}</option>
              )
            })}
          </select>
        </SelectContainer>
        <SelectContainer>
          <span>Choose a Company</span>
          <select
            disabled={chosenCity === 'all'}
            value={chosenCity === 'all' ? 'all' : chosenCompany}
            onChange={(e) => setChosenCompany(e.target.value)}
            placeholder="Select a company"
          >
            <option value='all'>All</option>
            {filteredByCities.map((item) => {
              if (!item.company) return null;
              if (typeof item.company === "string") return <option key={item.company} value={item.company}>{ item.company}</option>
              return item.company.map((company) => {
                return <option key={company} value={company}>{ company}</option>
              })
            })}
          </select>
        </SelectContainer>
      </Cont>
    </Contianer>
  );
}

export default App;

const Contianer = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
height: 100vh;
`

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`