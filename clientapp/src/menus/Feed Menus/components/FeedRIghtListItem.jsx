import { Title, Text, Stack, Group, Avatar, Divider, Pill, Image } from "@mantine/core";
import { displayDateCreated } from "../../../services/feedServices";

const FeedRightListItem = (props) => {
    const data = props.data;
    const dateCreated = new Date(data.dateCreated);

    const createdBy = data.createdBy;

    const postTags = data.postTags;

    const attachment = data.attachment;
    const attachmentType = attachment?.attachmentType;
    return(
    <Stack gap={"xs"} py={"xs"} px={"md"}>  
        <Group>
            <Avatar color="cozyGreen"/>
            <Title order={6} c={"white"}>{createdBy.userName}</Title>
            <Text size="xs" c={"white"}>{dateCreated.toDateString()}</Text>
        </Group>
        
        <Group>  
            <Pill>Test Pill</Pill>
            <Pill>Test Pill</Pill>
            <Pill>Test Pill</Pill>
        </Group>

        <Group>
            <Title fz={"sm"} lineClamp={2} w={"70%"} c={"white"} m={0}>{data.postTitle}</Title>
            <Image radius="md" h={"4em"} w={"4em"} fit="inherit" m={0} src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"/>
        </Group>
    
        <Group>
            <Text size="sm" c={"white"}>{`${data.postLikeCount} hearts`}</Text>
            <Text size="sm" c={"white"}>{`${data.postReplyCount} replies`}</Text>
        </Group>
        
        <Divider/>
    </Stack>
    )
}

export default FeedRightListItem;