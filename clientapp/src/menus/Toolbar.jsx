import { Group, Button, Title, Box, Container } from '@mantine/core';

const Toolbar = () => {
    return(
        <Container fluid bg={"lime"} display={"flex"} pos={"sticky"} top={0} w={"100%"} style={{zIndex: 10}}>
            <Group justify="space-between" preventGrowOverflow={false}>
                <Title order={1}>Homepage</Title>
                <Button>Log In</Button>
                <Button>Sign up</Button>
            </Group>
        </Container>
    )
}

export default Toolbar;