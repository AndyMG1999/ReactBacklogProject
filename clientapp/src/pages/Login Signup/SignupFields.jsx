import { Stack,TextInput,PasswordInput,Button,Group,Popover, Alert } from "@mantine/core";
import {useForm,isEmail,matchesField} from '@mantine/form';
import { registerUser } from "../../services/authServices";
import { useState } from "react";

const SignupFields = () => {
    const [openAlert, setOpenAlert] = useState(false);

    const passwordValidation = (value) => {
        if(value.length < 6) return "Password must be at least 6 characters";
        if(!/[A-Z]/.test(value)) return "Password must have an uppercase letter";
        if(!/[a-z]/.test(value)) return "Password must have a lowercase letter";
        if(!/[0-9]/.test(value)) return "Password must include a number";
        if(!/[$&+,:;=?@#|'<>.^*()%!-]/.test(value)) return "Password must include a special character";
    }
    
    const form = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '', retypePassword: '' },
    validate: {
      email: isEmail('Invalid email'),
      password: passwordValidation,
      retypePassword: matchesField('password', 'Passwords are not the same'),
    },
    });

    const onSubmitSignup = (data) => {
        console.log("Registering with:",data);
        const success = registerUser(data.email,data.password);
        if(!success) return; 
        console.log("Register Success!");
        form.reset();
        setOpenAlert(true);
    }

    return(
        <form onSubmit={form.onSubmit(onSubmitSignup)}>
        <Stack gap="lg">
            <TextInput label="Email" placeholder="Enter Your Email" withAsterisk key={form.key("email")} {...form.getInputProps("email")}/>
            <Group grow>
                <PasswordInput label="Password" placeholder="Enter Your Username" withAsterisk key={form.key("password")} {...form.getInputProps("password")}/>
                <PasswordInput label="Re-type Password" placeholder="Enter Your Password Again!" withAsterisk key={form.key("retypePassword")} {...form.getInputProps("retypePassword")}/>
            </Group>
            <Button type="submit">Sign Up!</Button>
            {openAlert && <Alert variant="filled" color="green" title="Account Created!" onClose={()=>setOpenAlert(false)} withCloseButton />}
        </Stack>
        </form>
    )
}

export default SignupFields;