import { Button } from "@mantine/core";

const LoginSignupContainer = (props) => {
    const setOpenLoginModal = props.setOpenLoginModal;
    const setIsReturningUser = props.setIsReturningUser;


    return(
    <>
        <Button radius={"lg"} color='cozyGreen' onClick={()=>{setOpenLoginModal(true); setIsReturningUser(true);}}>Log In</Button>
        <Button radius={"lg"} color='cozyBrown' onClick={()=>{setOpenLoginModal(true); setIsReturningUser(false);}}>Sign up</Button>
    </>
    )
}

export default LoginSignupContainer;