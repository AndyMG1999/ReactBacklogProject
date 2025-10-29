import { Text, Card, Group, Image, Title, Stack} from "@mantine/core";
import { useEffect } from "react";

const WebsiteLinkCard = (props) => {
    const attachment = props.attachment;
    const attachmentLink = attachment.attachmentLink;
    const linkTitle = attachment.websiteLinkTitle;
    const linkIcon = attachment.websiteLinkIcon;

    useEffect(()=>console.log("attachment:",attachment),[]);

    return(
        <Card shadow="sm" radius="md" withBorder component="a" w={"100%"} href={attachmentLink} target="a_blank">
            <Group>
                <Image radius="md" h={"4em"} w={"8em"} fit="inherit" m={0} src={linkIcon||"error"}/>
                <Stack w={"60%"}>
                    <Title order={4} lineClamp={1}>{linkTitle||attachmentLink}</Title>
                    <Text size="sm" c="dimmed" lineClamp={1}>{attachmentLink}</Text>
                </Stack>
            </Group>
        </Card>
    );
};

export default WebsiteLinkCard;