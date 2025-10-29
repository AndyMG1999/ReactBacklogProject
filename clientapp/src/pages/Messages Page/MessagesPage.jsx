import { Button, Container, Stack, TextInput, Textarea, Transition } from "@mantine/core";
import SendOrRecieveBottleForm from "./components/SendOrRecieveForm";
import CreateMessageForm from "./components/CreateMessageForm";
import { useState } from "react";

const MessagesPage = () => {
    const [sendOrRecieveBottle, setSendOrRecieveBottle] = useState(null);
    
    const messagePageStyle = {
        display: "flex",
        flexDirection: "column",
        minHeight: "90vH"
    }

    return(
        <Stack w={"100%"} justify="center" align="center" style={messagePageStyle}>
            <Stack gap={"xs"} w={"90%"} p={"md"} align="center">
                {sendOrRecieveBottle == "recieve"? <h1>Recieve</h1>:
                sendOrRecieveBottle == "send"? <CreateMessageForm />:
                <SendOrRecieveBottleForm setSendOrRecieve={setSendOrRecieveBottle}/>}
            </Stack>
        </Stack>
    )
}

export default MessagesPage;