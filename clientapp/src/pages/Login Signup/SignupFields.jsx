import { Stack,TextInput,PasswordInput,Button, Group } from "@mantine/core";

const SignupFields = () => {
    return(
        <Stack gap="lg">
            <Group grow>
                <TextInput label="Email" placeholder="Enter Your Email"/>
                <TextInput label="Username" placeholder="Enter Your Username"/>
            </Group>
            <PasswordInput label="Password" placeholder="Enter Your Password"/>
            <Button>Sign Up!</Button>
        </Stack>
    )
}

export default SignupFields;