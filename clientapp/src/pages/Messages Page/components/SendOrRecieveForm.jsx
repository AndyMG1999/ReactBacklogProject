import { Button, Stack } from "@mantine/core"

const SendOrRecieveBottleForm = (props) => {

    const setSendOrRecieveBottle = props.setSendOrRecieve;

    return(
        <Stack w={"100%"}>
            <Button fullWidth onClick={()=>setSendOrRecieveBottle("send")}>Send a Bottle!</Button>
            <Button fullWidth onClick={()=>setSendOrRecieveBottle("recieve")}>Find a Bottle!</Button>
        </Stack>
    )
}

export default SendOrRecieveBottleForm;