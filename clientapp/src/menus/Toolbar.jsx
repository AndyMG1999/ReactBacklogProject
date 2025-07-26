import { Group, Button, Title, Box, Container, Divider } from '@mantine/core';
import { alpha } from '@mantine/core';
import { FaGithub,FaDiscord,FaInstagram } from "react-icons/fa";

const Toolbar = () => {
    const iconSize = "2em"

    return(
        <Container fluid bg={alpha("#ffffffff", 0.95)} display={"flex"} pos={"sticky"} top={0} w={"90%"} h={"7em"} style={{zIndex: 10, borderTopLeftRadius: 40, borderTopRightRadius: 40}}>
            <Group justify="space-between" preventGrowOverflow={false} style={{ width: '100%' }}>
                <Group>
                    <Title order={1}>Homepage</Title>
                </Group>
                <Group>
                    <Button><FaGithub size={iconSize}/></Button>
                    <Button><FaInstagram size={iconSize}/></Button>
                    <Button><FaDiscord size={iconSize}/></Button>
                    <Button color='cozyGreen'>Log In</Button>
                    <Button color='cozyBrown'>Sign up</Button>
                </Group>
            </Group>
        </Container>
    )
}

export default Toolbar;