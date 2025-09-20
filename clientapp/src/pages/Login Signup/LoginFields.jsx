import { Stack,TextInput,PasswordInput,Button,Checkbox } from "@mantine/core";
import { useForm,isEmail,isNotEmpty } from "@mantine/form";

const LoginFields = () => {
    const form = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '', retypePassword: '' },
    validate: {
        email: isEmail('Invalid email'),
        password: isNotEmpty('Required'),
    },
    });
    return(
        <form onSubmit={form.onSubmit(console.log)}>
        <Stack gap="lg">
            <TextInput label="Email" placeholder="Enter Your Email" withAsterisk key={form.key("email")} {...form.getInputProps("email")}/>
            <PasswordInput label="Password" placeholder="Enter Your Password" key={form.key("password")} {...form.getInputProps("password")}/>
            <Checkbox label="Remember Me" />
            <Button type="submit">Log In</Button>
            <Button variant="subtle" color="cozyGreen">umm... forgot my password :(</Button>
        </Stack>
        </form>
    )
}

export default LoginFields;