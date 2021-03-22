import React, {useState, useEffect} from "react";
import LoadingMask from './components/LoadingMask'
import Hotel from './components/Hotel.jsx'
import Subscription from './components/Subscription'

const App = () => {
  const [ loadHotels, setLoadHotels] = useState(false)
  const [hotels, setHotels] = useState([])
  const [ formShow, setFormShow] = useState(false)
  
  useEffect(() => {
    setLoadHotels(true)
    fetch("api/hotels")
    .then(res => res.json())
    .then(data => setHotels(data))
    .catch(err => setHotels(null))
    .finally(() => setLoadHotels(false))
  }, [])
  
  // useEffect(() => {
  //   setTimeout(() => setFormShow(true), 10000)
  // }, [])
  return (
  <div>
    <h1>Hotels</h1>
      { 
        loadHotels && <LoadingMask />
      }
      {
        hotels ?
          hotels.map(hotel => <Hotel key={hotel.name} name={hotel.name} stars={hotel.stars} city={hotel.city}/>) :
          <p>It doesn't work</p>
      }
      {
        formShow && <Subscription close={() => setFormShow(false)}/>
      }
  </div>
)};

export default App;
