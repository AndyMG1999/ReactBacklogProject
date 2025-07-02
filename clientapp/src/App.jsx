import { useState, useEffect } from 'react'
import { Box, Button, Flex } from '@mantine/core';
import Toolbar from './menus/Toolbar';
import LandingPage from './pages/LandingPage';

function App() {
  const [count, setCount] = useState(0);
  const [weatherData, setWeatherData] = useState(null);

  const fetchReponse = async () => {
    const response = await fetch(`./api/weatherforecast/`);
    console.log("response: ",response);
    const json = await response.json();
    console.log("json:", json);
    setWeatherData(json);
  }

  useEffect(() => {
    fetchReponse();
  },[]);

  return (
    <Flex direction={"column"}>
      <Toolbar/>
      <LandingPage/>
    </Flex>
  )
}

export default App
