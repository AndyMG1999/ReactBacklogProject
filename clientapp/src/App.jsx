import { useState, useEffect, useContext } from 'react'
import { Flex, useMantineTheme } from '@mantine/core';
import Toolbar from './menus/Toolbar';
import LandingPage from './pages/Landing Page/LandingPage';
import MessagesPage from './pages/Messages Page/MessagesPage';
import FeedPage from './pages/Feed Page/FeedPage';
import Snowfall from 'react-snowfall';
import { Routes,Route } from 'react-router';
import * as signalR from '@microsoft/signalr';
import { AppContext } from './contexts/ApplicationContext';
import { getUserInfo } from './services/authServices';

function App() {
  let connection;
  const [weatherData, setWeatherData] = useState(null);
  const theme = useMantineTheme();

  const {setUserInfo} = useContext(AppContext);
  
  const getCurrentUserInfo = async () => {
    const userData = await getUserInfo();
    if(!userData) return;
    console.log("Already signed in! ",userData);
    setUserInfo(userData);
  }
  
  const fetchReponse = async () => {
    const response = await fetch(`./api/weatherforecast/`);
    console.log("response: ",response);
    if(!response.ok) return;
    const json = await response.json();
    console.log("json:", json);
    setWeatherData(json);
  }

  const setUpConnection = async () => {
    connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5224/testhub') // Replace with your hub URL
      .configureLogging(signalR.LogLevel.Information)
      .build();
    try{
      await connection.start();
      console.log("Realtime Connection Successful!");

      // let userInput = prompt("[SignalR Test] Enter User:");
      // let messageInput = prompt("[SignalR Test] Enter Message:");
      // connection.invoke("SendMessage", userInput, messageInput);

      // connection.on("ReceiveMessage", (user, message) => {
      //   console.log(`${user}: ${message}`);
      // });
    }
    catch(err){
      console.error('SignalR Connection Error: ', err);
    }
  }

  useEffect(() => {
    getCurrentUserInfo();
    fetchReponse();
    setUpConnection();
  },[]);

  const backgroundStyle = {
    background: `linear-gradient(to bottom, ${theme.colors.gray[9]}, ${theme.colors.gray[8]})`, // Example gradient
  }

  return (
  <Flex direction={"column"} style={backgroundStyle}>
    {/* <Snowfall color='#046896ff' snowflakeCount={45} wind={[0,0]} radius={[0.5,3]} speed={[7.5,10]}/> */}
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
