import { useContext } from "react";
import { Avatar, Menu, Text } from "@mantine/core";
import { AppContext } from "../../contexts/ApplicationContext";
import { logoutUser } from "../../services/authServices";

const AccountAvatarContainer = () => {
    const {userInfo,setUserInfo} = useContext(AppContext);
    const userName = userInfo.userName;

    const menuStyles = {
        label: {color: "#666666"},
        dropdown: {
            background: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            border: '2px solid rgba(255, 255, 255, 0.27)',
            boxShadow: '0 24px 24px rgba(0,0,0,0.08)',
            filter: "saturate(200%)",
        },
    };

    const logoutUserOnClick = async() => {
        const reponse = await logoutUser();
        if(!reponse.ok) return;
        setUserInfo(null);
    }

    return(
    <Menu withArrow offset={-5} radius="lg" width="15em" styles={menuStyles}>
        <Menu.Target>
            <Avatar color='cozyGreen' name={userName} size="3em" component="button" bg={"#00000025"}/>
        </Menu.Target>
        <Menu.Dropdown>
            <Menu.Label><Text size="xl" fw="bold">{userName}</Text></Menu.Label>
            <Menu.Divider/>
            <Menu.Item>Account Profile</Menu.Item>
            <Menu.Item>My Bottles</Menu.Item>
            <Menu.Item>Saved Bottles</Menu.Item>
            <Menu.Divider/>
            <Menu.Item>Settings</Menu.Item>
            <Menu.Divider/>
            <Menu.Item color="red" onClick={logoutUserOnClick}>Sign Out</Menu.Item>
        </Menu.Dropdown>
    </Menu>
    )
}

export default AccountAvatarContainer;