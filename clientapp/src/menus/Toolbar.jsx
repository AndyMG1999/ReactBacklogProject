import { Group, Button, Title, Box, Container } from '@mantine/core';
import { alpha } from '@mantine/core';

const Toolbar = () => {
    return(
        <Container fluid bg={alpha("#ffffffff", 0.95)} display={"flex"} pos={"sticky"} top={0} w={"90%"} h={"7rem"} style={{zIndex: 10, borderRadius: 40}}>
            <Group justify="flex-end" preventGrowOverflow={false}>
                <Title order={1}>Homepage</Title>
                <Button>Log In</Button>
                <Button>Sign up</Button>
            </Group>
        </Container>
    )
}

export default Toolbar;