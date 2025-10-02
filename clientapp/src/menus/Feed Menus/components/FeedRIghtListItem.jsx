import { Title, Text, Stack, Group, Avatar, Divider, Pill, Image } from "@mantine/core";
import SoundCloudPlayer from "../../../pages/Feed Page/components/SoundCloudPlayer";

const FeedRightListItem = (props) => {
    const data = props.data;
    return(
    <Stack gap={"xs"} py={"xs"} px={"md"}>  
        <Group>
            <Avatar color="cozyGreen"/>
            <Title order={6} c={"white"}>Username</Title>
            <Text size="xs" c={"white"}>LastCreated</Text>
        </Group>
        
        <Group>  
            <Pill>Test Pill</Pill>
            <Pill>Test Pill</Pill>
            <Pill>Test Pill</Pill>
        </Group>

        <Group>
            <Title fz={"sm"} lineClamp={2} w={"70%"} c={"white"} m={0}>{data.messageSubject}</Title>
            <Image radius="md" h={"4em"} w={"4em"} fit="inherit" m={0} src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"/>
        </Group>
    
        <Group>
            <Text size="sm" c={"white"}>20 hearts</Text>
            <Text size="sm" c={"white"}>4 replies</Text>
        </Group>
        
        <Divider/>
    </Stack>
    )
}

export default FeedRightListItem;