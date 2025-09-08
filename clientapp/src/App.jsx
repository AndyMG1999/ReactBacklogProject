import { useState, useEffect } from 'react'
import { Text, Box, Button, Flex, ScrollArea, useMantineTheme } from '@mantine/core';
import Toolbar from './menus/Toolbar';
import LandingPage from './pages/Landing Page/LandingPage';
import MessagesPage from './pages/Messages Page/MessagesPage';
import FeedPage from './pages/Feed Page/FeedPage';
import Snowfall from 'react-snowfall';
import { Routes,Route } from 'react-router';
import * as signalR from '@microsoft/signalr';
function App() {
  let connection;
  const [count, setCount] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const theme = useMantineTheme();
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });

  const fetchReponse = async () => {
    const response = await fetch(`./api/weatherforecast/`);
    console.log("response: ",response);
    const json = await response.json();
    console.log("json:", json);
    setWeatherData(json);
  }

  const fetchDummyData = async () => {
    const response = await fetch(`./api/post/GetAll`);
    console.log("API Reponse:",response);
    const data = await response.json();
    console.log("API Data:",data);
  }

  const setUpConnection = async () => {
    connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5224/testhub') // Replace with your hub URL
      .configureLogging(signalR.LogLevel.Information)
      .build();
    try{
        await connection.start();
        console.log("SignalR Connection Successful!");
    }
    catch(err)
    {
        console.error('SignalR Connection Error: ', err);
    }
  }

  useEffect(() => {
    fetchReponse();
    fetchDummyData();
    setUpConnection();
  },[]);

  const backgroundStyle = {
    background: `linear-gradient(to bottom, ${theme.colors.backgroundBlue[9]}, ${theme.colors.backgroundBlue[8]})`, // Example gradient
  }

  return (
    <Flex direction={"column"} style={backgroundStyle}>
      <Snowfall color='#046896ff' snowflakeCount={45} wind={[0,0]} radius={[0.5,3]} speed={[7.5,10]}/>
      <Toolbar/>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/shore' element={<MessagesPage />} />
        <Route path='/beach' element={<FeedPage />} />
      </Routes>
    </Flex>
  )
}

export default App
