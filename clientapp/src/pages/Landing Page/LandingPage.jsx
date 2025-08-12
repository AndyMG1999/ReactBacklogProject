import { Button, Container, Text, Title, Stack, Group, Overlay, BackgroundImage } from '@mantine/core';
import LandingPageTitle from './LandingPageTitle';
import { useEffect, useState } from 'react';
import landingPageImage from '../../assets/landingPageImage.jpg';
import Snowfall from 'react-snowfall';

const LandingPage = () => {
  const [imageURL, setImageURL] = useState("");

  return (
    <Container fluid w={"100%"} bg={"backgroundBrown.0"} display="flex" direction="column" style={{ minHeight: '90vh', overflow: 'hidden' }}>
      <BackgroundImage src={""} flex={1} minheight={0}>
        <Stack justify="center" align="flex-start" h={"100%"}>
          <LandingPageTitle />
          <Text fz={"1.35em"}>Welcome to your number one stop on talking to strangers about... well pretty much anything!</Text>
          <Text fz={"1.35em"}>You can pick the topic or if you are feelin' lucky... we'll pick it for you!</Text>
          <Button size="xl">I'M READY!</Button>
        </Stack>
      </BackgroundImage>
    </Container>
  );
}

export default LandingPage;