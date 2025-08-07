import { Button, Container, Stack, TextInput, Textarea, Transition } from "@mantine/core";
import SendOrRecieveBottleForm from "./components/SendOrRecieveForm";
import CreateMessageForm from "./components/CreateMessageForm";
import Snowfall from "react-snowfall";
import { useState } from "react";

const MessagesPage = () => {
    const [sendOrRecieveBottle, setSendOrRecieveBottle] = useState(null);
    return(
        <Stack align="center">
            <Stack gap={"xs"} w={"90%"} align="center" bg={"backgroundBrown.0"} p={"md"}>
                <Snowfall color='#03a9f4' snowflakeCount={25} wind={[0,0]} radius={[0.5,3]} speed={[7.5,10]}/>

                {sendOrRecieveBottle == "recieve"? <h1>Recieve</h1>:
                sendOrRecieveBottle == "send"? <CreateMessageForm />:
                <SendOrRecieveBottleForm setSendOrRecieve={setSendOrRecieveBottle}/>}
            </Stack>
        </Stack>
    )
}

export default MessagesPage;