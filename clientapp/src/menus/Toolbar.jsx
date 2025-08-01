import { Group, Button, Title, Box, Container, Divider } from '@mantine/core';
import { alpha } from '@mantine/core';
import { FaGithub,FaDiscord,FaInstagram } from "react-icons/fa";
import { useState } from 'react';
import LoginModal from '../pages/Login Signup/loginModal';

const Toolbar = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isReturningUser, setIsReturningUser] = useState(false);

    const iconSize = "2em"
    const toolbarStyle = {
        zIndex: 10,
        borderRadius: 40,
        background: 'rgba(255, 255, 255, 0.25)', // semi-transparent
        backdropFilter: 'blur(12px)',            // blur effect
        WebkitBackdropFilter: 'blur(12px)',      // Safari support
        border: '1px solid rgba(255,255,255,0.3)', // subtle border
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
    };


    return(
        <Container fluid display={"flex"} pos={"sticky"} top={0} w={"90%"} h={"7em"} style={toolbarStyle}>
            <Group justify="space-between" preventGrowOverflow={false} style={{ width: '100%' }}>
                <Group>
                    <Title order={1}>Rainy Day</Title>
                </Group>
                <Group>
                    <Button><FaGithub size={iconSize}/></Button>
                    <Button><FaInstagram size={iconSize}/></Button>
                    <Button><FaDiscord size={iconSize}/></Button>
                    <Button color='cozyGreen' onClick={()=>{setOpenModal(true); setIsReturningUser(true);}}>Log In</Button>
                    <Button color='cozyBrown' onClick={()=>{setOpenModal(true); setIsReturningUser(false);}}>Sign up</Button>
                </Group>
            </Group>
            <LoginModal opened={openModal} onClose={()=>{setOpenModal(false);}} isReturningUser={isReturningUser}/>
        </Container>
    )
}

export default Toolbar;