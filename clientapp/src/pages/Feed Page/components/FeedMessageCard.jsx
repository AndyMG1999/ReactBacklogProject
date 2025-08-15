import { Card,Button,Title,Text,Group, ActionIcon, Pill } from "@mantine/core";
import { FaRegHeart } from "react-icons/fa";
import { LiaLaughSquint } from "react-icons/lia";
import { BiCool } from "react-icons/bi";
import { PiBeerBottleLight } from "react-icons/pi";
import { PiShareFat } from "react-icons/pi";

const FeedMessageCard = (props) => {
    
    const randomLengthLorum = () => {
        const fullString = "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath";
        const fullStringLastIndex = fullString.length - 1;
        return fullString.substring(0,Math.floor(Math.random() * fullStringLastIndex))
    }

    const id = props.id;
    const messageTitle = props.messageTitle || "If you see this, it means there is no message title set. Consider setting messageTitle to something!";
    const messageContent = props.messageContent || randomLengthLorum();
    const messageLikes = Math.floor(Math.random() * 100);
    const bottleCount = Math.floor(Math.random() * 20);


    const iconComponentStyle = {
        width: "65%",
        height: "65%",
    }

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.25)', // semi-transparent
        backdropFilter: 'blur(12px)',            // blur effect
        WebkitBackdropFilter: 'blur(12px)', 
        border: '1px solid rgba(255, 255, 255, 0.2)', // Light border
    }

    return(
        <Card padding="lg" shadow="lg" radius="lg" withBorder style={cardStyle}>
            <Card.Section inheritPadding pt={"md"}>
                <Title order={2} lineClamp={2}>{messageTitle}</Title>
            </Card.Section>
            <Group>
                <Pill size="lg">Test Pill</Pill>
                <Pill size="lg">Test Pill</Pill>
                <Pill size="lg">Test Pill</Pill>
            </Group>

            <Card.Section inheritPadding>
                <Text size="lg" lineClamp={5}>{messageContent}</Text>
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