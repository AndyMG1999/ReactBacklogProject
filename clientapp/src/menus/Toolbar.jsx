import { Group, ActionIcon, Button, Title, Box, Container, Divider } from '@mantine/core';
import { alpha, } from '@mantine/core';
import { FaGithub,FaDiscord,FaInstagram } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useState,useEffect } from 'react';
import LoginModal from '../pages/Login Signup/LoginModal';
import SidebarModal from './Sidebar/SidebarModal';

const Toolbar = () => {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openSidebarModal, setOpenSidebarModal] = useState(false);
    const [isReturningUser, setIsReturningUser] = useState(false);
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

    // Use Effect for checking if Scroll is on top of screen
    useEffect(() => {
        const handleScroll = () => {
        setIsAtTop(window.scrollY < 250);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return(
        <Container fluid display={"flex"} pos={"sticky"} top={0} w={isAtTop?"100%":"90%"} h={"7em"} mt={!isAtTop&&"xs"} style={toolbarStyle}>
            <Group justify="space-between" preventGrowOverflow={false} style={{ width: '100%' }}>
                <Group>
                    <SidebarModal opened={openSidebarModal} onClose={()=>setOpenSidebarModal(false)}/>
                    <ActionIcon color="white" variant="subtle" size={"xl"} onClick={()=>setOpenSidebarModal(true)}><MdMenu size={iconSize}/></ActionIcon>
                    <Title order={1} fz={"3em"}>Rainy Day</Title>
                </Group>

                <Group>
                    <ActionIcon size={"xl"} radius="xl"><FaGithub size={iconSize}/></ActionIcon>
                    <ActionIcon size={"xl"} radius="xl"><FaInstagram size={iconSize}/></ActionIcon>
                    <ActionIcon size={"xl"} radius="xl"><FaDiscord size={iconSize}/></ActionIcon>
                    <Button radius={"lg"} color='cozyGreen' onClick={()=>{setOpenLoginModal(true); setIsReturningUser(true);}}>Log In</Button>
                    <Button radius={"lg"} color='cozyBrown' onClick={()=>{setOpenLoginModal(true); setIsReturningUser(false);}}>Sign up</Button>
                </Group>
            </Group>
            <LoginModal opened={openLoginModal} onClose={()=>{setOpenLoginModal(false);}} isReturningUser={isReturningUser}/>
        </Container>
    )
}

export default Toolbar;