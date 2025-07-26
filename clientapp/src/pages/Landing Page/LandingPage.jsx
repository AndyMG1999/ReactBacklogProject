import { Button, Container, Text, Title, Stack, Group } from '@mantine/core';
import "./landingPageStyling.css"
import LandingPageTitle from './LandingPageTitle';

const LandingPage = () => {
  return (
    <Container fluid w={"100%"} bg={"white"}>
      <Stack justify="center" align="flex-start">
        <LandingPageTitle />
        <Text fz={"1.35em"}>Welcome to your number one stop on talking to strangers about... well pretty much anything!</Text>
        <Text fz={"1.35em"}>You can pick the topic or if you are feelin' lucky... we'll pick it for you!</Text>
        <Button size="xl">I'M READY!</Button>
      </Stack>
    </Container>
  );
}

export default LandingPage;