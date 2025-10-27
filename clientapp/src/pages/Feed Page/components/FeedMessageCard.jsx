import { Card,Button,Title,Text,Group, ActionIcon, Pill, Container, Avatar } from "@mantine/core";
import { FaRegHeart } from "react-icons/fa";
import { LiaLaughSquint } from "react-icons/lia";
import { BiCool } from "react-icons/bi";
import { PiBeerBottleLight } from "react-icons/pi";
import { PiShareFat } from "react-icons/pi";
import { useMemo } from "react";
import { displayDateCreated } from "../../../services/feedServices";
import SoundCloudPlayer from "./SoundCloudPlayer";
import YoutubePlayer from "./YoutubePlayer";
import WebsiteLinkCard from "./WebsiteLinkCard";
//import { useHover } from "@mantine/hooks";

const FeedMessageCard = (props) => {

    // const {hovered,ref} = useHover();
    // const [isClicked,setIsClicked] = useState(false);

    const id = props.id;
    const data = props.data;
    const messageTitle = data.postTitle || "If you see this, it means there is no message title set. Consider setting messageTitle to something!";
    const messageContent = data.postBody || "";
    const messageLikes = data.postLikeCount || 0;
    const bottleCount = data.postReplyCount || 0;

    const dateCreated = new Date(data.dateCreated);
    const formattedDate = useMemo(() => displayDateCreated(dateCreated), [dateCreated]);
    
    const createdBy = data.createdBy;

    const postTags = data.postTags;

    const attachment = data.attachment;
    const attachmentType = attachment?.attachmentType;
    
    const cardStyle = {
        ...props.cardStyle,
        background: 'rgba(255, 255, 255, 0.25)', // semi-transparent
        backdropFilter: 'blur(12px)',            // blur effect
        WebkitBackdropFilter: 'blur(12px)', 
        border: '1px solid rgba(255, 255, 255, 0.2)', // Light border
    }

    const textColor = "#EEEEEE";

    const iconComponentStyle = {
        width: "65%",
        height: "65%",
    }   

    function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }

    const cardOnClick = async() => {
        console.log("Click!");
    }

    return(
        <Container pb={"md"}>
        <Card padding="lg" shadow="lg" radius="lg" withBorder style={cardStyle}>
            <Card.Section onClick={cardOnClick} inheritPadding pt={"md"}>
                <Group pb={"xs"}>
                    <Avatar size={"sm"} color="cozyGreen" name={createdBy.userName} />
                    <Title order={5} c={"white"}>{createdBy.userName}</Title>
                    <Text size="xs" c={"white"}>{formattedDate}</Text>
                </Group>
                <Title order={3} lineClamp={2} c={textColor}>{messageTitle}</Title>
                <Group>
                    {postTags.map((tag,index)=><Pill size="lg" bg={index==0?"cozyBlue":index==2?"cozyGreen":""} key={index}>{tag.tagName}</Pill>)}
                </Group>
                
                <Card.Section inheritPadding align="center">
                    {attachmentType === 1 && <Group w={{xs:"100%", lg: "75%"}} p={"xs"} m={{xs:"xs", s:"xs "}} bdrs={"lg"} align="center" bd="2px solid white">
                         <WebsiteLinkCard attachment={attachment}/>
                    </Group>}
                    {attachmentType === 4 && <Group w={{xs:"100%", lg: "85%"}} p={"xs"} m={{xs:"xs", s:"lg"}} bdrs={"lg"} align="center" bd="2px solid white">
                         <SoundCloudPlayer attachmentLink={attachment.attachmentLink} />
                    </Group>}
                    {attachmentType === 5 && <Group w={{xs:"100%", lg: "85%"}} p={"xs"} m={{xs:"xs", s:"lg"}} bdrs={"lg"} align="center" bd="2px solid white">
                         <YoutubePlayer attachmentLink={attachment.attachmentLink} />
                    </Group>}
                </Card.Section>

                {!attachmentType && <Card.Section inheritPadding pb={"md"}>
                    <Text size="lg" lineClamp={5} c={textColor}>{messageContent}</Text>
                </Card.Section>}
            </Card.Section>

            <Group pt={"lg"}>
                <ActionIcon.Group>
                    <ActionIcon variant="default" size="lg"><FaRegHeart style={iconComponentStyle} /></ActionIcon>
                    <ActionIcon.GroupSection size="lg">{`${messageLikes}`}</ActionIcon.GroupSection>

                    <ActionIcon variant="default" size="lg"><LiaLaughSquint style={iconComponentStyle} /></ActionIcon>
                    <ActionIcon.GroupSection size="lg">{`${messageLikes}`}</ActionIcon.GroupSection>
                    
                    <ActionIcon variant="default" size="lg"><BiCool style={iconComponentStyle} /></ActionIcon>
                    <ActionIcon.GroupSection size="lg">{`${messageLikes}`}</ActionIcon.GroupSection>
                </ActionIcon.Group>
                
                <ActionIcon.Group>
                <ActionIcon variant="default" size="lg"><PiBeerBottleLight style={iconComponentStyle} /></ActionIcon>
                <ActionIcon.GroupSection size="lg">{`${bottleCount}`}</ActionIcon.GroupSection>
                </ActionIcon.Group>
                
                <Button leftSection={<PiShareFat/>}> {`Share this bottle!`}</Button>
            </Group>
        </Card>
        </Container>
    )
}

export default FeedMessageCard;