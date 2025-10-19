import { Button, Dialog, Stack } from "@mantine/core";
import { useState,useContext } from "react";
import { AppContext } from "../../contexts/ApplicationContext";

const FeedLeftMenu = (props) => {
    const [opened, setOpened] = useState(true);

    const {isAtTop} = useContext(AppContext);

    const feedMenuStyle = {
        zIndex: 10,
        borderRadius: "40px",
        transition: "width 0.3s ease-in-out",
        background: 'rgba(255, 255, 255, 0.10)',
        backdropFilter: 'blur(10px) saturate(180%)',
        WebkitBackdropFilter: 'blur(10px) saturate(180%)',
        border: '1px solid rgba(76, 246, 249, 0.43)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        overflow: "hidden",
        position: "relative",
    }

    const buttonStyle = {
        borderRadius: "30em",
    }

    return(
        <Dialog opened={!isAtTop} size={"md"} position={{top:"30%", left: "1em"}} transitionProps={{ transition: 'fade-right', duration: 200, timingFunction: 'linear' }} style={feedMenuStyle} zIndex={5}>
            <Stack>
                <Button style={buttonStyle}>Explore</Button>
                <Button style={buttonStyle} bg={"cozyGreen"}>🔖Personal Tag</Button>
                <Button style={buttonStyle}>🔖Personal Tag</Button>
            </Stack>
        </Dialog>
    )
}

export default FeedLeftMenu;