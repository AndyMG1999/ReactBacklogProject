import { Button, Container, Stack, TextInput, Textarea, Transition } from "@mantine/core";
import SendOrRecieveBottleForm from "./components/SendOrRecieveForm";
import CreateMessageForm from "./components/CreateMessageForm";
import Snowfall from "react-snowfall";
import { useState } from "react";

const MessagesPage = () => {
    const [sendOrRecieveBottle, setSendOrRecieveBottle] = useState(null);
    
    const messagePageStyle = {
        display: "flex",
        flexDirection: "column",
        minHeight: "90vH"
    }

    return(
        <Stack align="center" style={messagePageStyle}>
            <Stack gap={"xs"} w={"90%"} align="center" p={"md"}>
                {sendOrRecieveBottle == "recieve"? <h1>Recieve</h1>:
                sendOrRecieveBottle == "send"? <CreateMessageForm />:
                <SendOrRecieveBottleForm setSendOrRecieve={setSendOrRecieveBottle}/>}
            </Stack>
        </Stack>
    )
}

export default MessagesPage;