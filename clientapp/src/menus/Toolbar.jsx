import { Group, ActionIcon, Title, Container, } from '@mantine/core';
import { FaGithub,FaDiscord,FaInstagram } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useState,useEffect } from 'react';
import LoginModal from '../pages/Login Signup/LoginModal';
import SidebarModal from './Sidebar/SidebarModal';
import AccountAvatarContainer from './Toolbar Components/AccountAvatarContainer';
import LoginSignupContainer from './Toolbar Components/loginSignupContainer';
import { getUserInfo } from '../services/authServices';

const Toolbar = () => {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openSidebarModal, setOpenSidebarModal] = useState(false);
    const [openLoginOrSignup, setOpenLoginOrSignup] = useState("login");
    const [userInfo, setUserInfo] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);

    const iconSize = "2em"
    const toolbarStyle = {
        zIndex: 10,
        borderRadius: isAtTop? "20px" : "40px",
        transition: "width 0.3s ease-in-out",
        background: 'rgba(255, 255, 255, 0.10)',
        backdropFilter: 'blur(10px) saturate(180%)',
        WebkitBackdropFilter: 'blur(10px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: isAtTop?"":'0 4px 24px rgba(0,0,0,0.08)',
        overflow: "hidden",
        position: "relative",
    };

    const openLink = (link)=>{
        window.open(link, '_blank', 'noopener,noreferrer');
    }

    const addScrollAtTopEventListener = () => {
        const handleScroll = () => {
        setIsAtTop(window.scrollY < 250);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }

    const getCurrentUserInfo = async () => {
        const userData = await getUserInfo();
        if(!userData) return;
        setUserInfo(userData);
        setIsLoggedIn(true);
    }

    // Use Effect for checking if Scroll is on top of screen
    useEffect(() => {
        getCurrentUserInfo();
        addScrollAtTopEventListener();    
    }, []);

    return(
        <Container fluid display={"flex"} pos={"sticky"} top={0} w={isAtTop?"100%":"85%"} h={"7em"} mt={!isAtTop&&"xs"} style={toolbarStyle}>
            <Group justify="space-between" preventGrowOverflow={false} style={{ width: '100%' }}>
                <Group>
                    <SidebarModal opened={openSidebarModal} onClose={()=>setOpenSidebarModal(false)}/>
                    <ActionIcon color="white" variant="subtle" size={"xl"} onClick={()=>setOpenSidebarModal(true)}><MdMenu size={iconSize}/></ActionIcon>
                    <Title order={1} fz={"3em"}>Rainy Day</Title>
                </Group>

                <Group>
                    {isLoggedIn?
                    <AccountAvatarContainer userInfo={userInfo}/>
                    :
                    <LoginSignupContainer setOpenLoginModal={setOpenLoginModal} setOpenLoginOrSignup={setOpenLoginOrSignup}/>}
                    <ActionIcon size={"xl"} radius="xl" onClick={()=>{openLink("https://github.com/AndyMG1999")}}><FaGithub size={iconSize}/></ActionIcon>
                    <ActionIcon size={"xl"} radius="xl"><FaInstagram size={iconSize}/></ActionIcon>
                    <ActionIcon size={"xl"} radius="xl"><FaDiscord size={iconSize}/></ActionIcon>
                </Group>
            </Group>
            <LoginModal opened={openLoginModal} onClose={()=>{setOpenLoginModal(false);}} openLoginOrSignup={openLoginOrSignup}/>
        </Container>
    )
}

export default Toolbar;