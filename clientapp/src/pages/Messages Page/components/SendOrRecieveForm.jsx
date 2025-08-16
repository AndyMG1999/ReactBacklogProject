import { Button, Stack, Group, ActionIcon, Title } from "@mantine/core";
import { PiBeerBottle } from "react-icons/pi";
import { GiIsland } from "react-icons/gi";

const SendOrRecieveBottleForm = (props) => {

    const setSendOrRecieveBottle = props.setSendOrRecieve;
    const actionIconSize = "13em"
    const iconComponentStyle = {
        width: "65%",
        height: "65%",
    }

    return(
        <Group justify="space-between">
            <ActionIcon onClick={()=>setSendOrRecieveBottle("send")} size={actionIconSize} radius={"xl"} ms={"xl"}>
                <Stack align="center">
                    <PiBeerBottle style={iconComponentStyle}/><Title order={2}>Send A Bottle!</Title>
                </Stack>
            </ActionIcon>
            
            <ActionIcon onClick={()=>setSendOrRecieveBottle("recieve")} size={actionIconSize} radius={"xl"} ms={"xl"}>
                <Stack align="center">
                    <GiIsland style={iconComponentStyle}/><Title order={2}>Find A Bottle!</Title>
                </Stack>
            </ActionIcon>
        </Group>
    )
}

export default SendOrRecieveBottleForm;