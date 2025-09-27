import { useContext, useState } from "react";
import { Stack,TextInput,PasswordInput,Button,Checkbox,Alert } from "@mantine/core";
import { useForm,isEmail,isNotEmpty } from "@mantine/form";
import { loginUser} from "../../services/authServices";
import { AppContext } from "../../contexts/ApplicationContext";

const LoginFields = (props) => {
    const [openAlert,setOpenAlert] = useState(false);
    const {setUserInfo} = useContext(AppContext);
    
    const closeModal = props.onClose;

    const form = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '',},
    validate: {
        email: isEmail('Invalid email'),
        password: isNotEmpty('Required'),
    },
    });

    const onSubmitLogin = async (data) => {
        setOpenAlert(false);
        console.log("Logging with:",data);
        const response = await loginUser(data.email,data.password);
        console.log("response",response);
        
        if(!response.ok) setOpenAlert(true); 
        if(!response.ok) return; 
        
        console.log("Login Success!", response);
        const loginInfo = await response.json();
        console.log("Login Info:", loginInfo);
        setUserInfo(loginInfo);
        form.reset();
        closeModal();
    }

    return(
        <form onSubmit={form.onSubmit(onSubmitLogin)}>
        <Stack gap="lg">
            <TextInput label="Email" placeholder="Enter Your Email" withAsterisk key={form.key("email")} {...form.getInputProps("email")}/>
            <PasswordInput label="Password" placeholder="Enter Your Password" key={form.key("password")} {...form.getInputProps("password")}/>
            <Checkbox label="Remember Me" />
            <Button type="submit">Log In</Button>
            <Button variant="subtle" color="cozyGreen">umm... forgot my password :(</Button>
            {openAlert && <Alert variant="filled" color="red" title="Wrong Username or Password 😢" onClose={()=>setOpenAlert(false)} withCloseButton />}
        </Stack>
        </form>
    )
}

export default LoginFields;