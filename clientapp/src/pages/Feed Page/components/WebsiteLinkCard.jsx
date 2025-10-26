import { Text, Card, Group, Image, Title, Stack} from "@mantine/core";

const WebsiteLinkCard = (props) => {
    const attachmentLink = props.attachmentLink;
    const displayLink = attachmentLink.replace("https://","").replace("http://","").split("/")[0];

    return(
        <Card shadow="sm" radius="md" withBorder component="a" w={"100%"} href={attachmentLink} target="a_blank">
            <Group>
                <Image radius="md" h={"4em"} w={"8em"} fit="inherit" m={0} src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"/>
                <Stack gap={"xs"} justify="flex-start">
                    <Title order={4}>{displayLink}</Title>
                    <Text size="sm" c="dimmed">{attachmentLink}</Text>
                </Stack>
            </Group>
        </Card>
    );
};

export default WebsiteLinkCard;