import { Card,Button,Title,Text,Group, ActionIcon, Pill } from "@mantine/core";
import { FaRegHeart } from "react-icons/fa";
import { LiaLaughSquint } from "react-icons/lia";
import { BiCool } from "react-icons/bi";
import { PiBeerBottleLight } from "react-icons/pi";
import { PiShareFat } from "react-icons/pi";
import { useHover } from "@mantine/hooks";
import { useState } from "react";
import SoundCloudPlayer from "./SoundCloudPlayer";

const FeedMessageCard = (props) => {

    const {hovered,ref} = useHover();
    const [isClicked,setIsClicked] = useState(false);

    const id = props.id;
    const messageTitle = props.messageTitle || "If you see this, it means there is no message title set. Consider setting messageTitle to something!";
    const messageContent = props.messageContent || "";
    const messageLikes = props.messageLikes || 0;
    const bottleCount = props.bottleCount || 0;

    const textColor = "#EEEEEE";

    const iconComponentStyle = {
        width: "65%",
        height: "65%",
    }

    const cardStyle = {
        background: isClicked? 'rgba(255, 255, 255, 0.1)' : hovered? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.25)', // semi-transparent
        backdropFilter: hovered? 'blur(2px)' : 'blur(12px)',            // blur effect
        WebkitBackdropFilter: hovered? 'blur(2px)' : 'blur(12px)', 
        border: hovered? '1.5px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.2)', // Light border
    }

    function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }

    const cardOnClick = async() => {
        setIsClicked(true);
        await sleep(100);
        setIsClicked(false);
    }

    return(
        <Card ref={ref} padding="lg" shadow="lg" radius="lg" withBorder style={cardStyle}>
            <Card.Section onClick={cardOnClick} inheritPadding pt={"md"}>
                <Title order={2} lineClamp={2} c={textColor}>{messageTitle}</Title>
                <Group>
                    <Pill size="lg">Test Pill</Pill>
                    <Pill size="lg">Test Pill</Pill>
                    <Pill size="lg">Test Pill</Pill>
                </Group>
                
                <Card.Section inheritPadding align="center">
                    <Group w={{xs:"100%", lg: "85%"}} p={"xs"} m={{xs:"xs", s:"lg"}} bdrs={"lg"} align="center" bd="2px solid white">
                        <SoundCloudPlayer />
                    </Group>
                </Card.Section>

                <Card.Section inheritPadding pb={"md"}>
                    <Text size="lg" lineClamp={5} c={textColor}>{messageContent}</Text>
                </Card.Section>
            </Card.Section>

            <Group pt={"sm"}>
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
    )
}

export default FeedMessageCard;