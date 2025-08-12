import { Stack,TextInput,PasswordInput,Button,Checkbox } from "@mantine/core";

const LoginFields = () => {
    return(
        <Stack gap="lg">
            <TextInput label="Username" placeholder="Enter Your Username"/>
            <PasswordInput label="Password" placeholder="Enter Your Password"/>
            <Checkbox label="Remember Me" />
            <Button>Log In</Button>
            <Button variant="subtle">umm... forgot my password :(</Button>
        </Stack>
    )
}

export default LoginFields;