import { Button } from "@mantine/core";

const LoginSignupContainer = (props) => {
    const setOpenLoginModal = props.setOpenLoginModal;
    const setOpenLoginOrSignup = props.setOpenLoginOrSignup;


    return(
    <>
        <Button radius={"lg"} color='cozyGreen' onClick={()=>{setOpenLoginModal(true); setOpenLoginOrSignup("login");}}>Log In</Button>
        <Button radius={"lg"} color='cozyBrown' onClick={()=>{setOpenLoginModal(true); setOpenLoginOrSignup("signup");}}>Sign up</Button>
    </>
    )
}

export default LoginSignupContainer;