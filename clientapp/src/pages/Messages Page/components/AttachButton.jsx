import { Button,Menu } from "@mantine/core";
import { FaRegImage } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { LuMusic } from "react-icons/lu";
import { SlSocialSpotify } from "react-icons/sl";
import { RiSoundcloudLine } from "react-icons/ri";
import { SiApplemusic } from "react-icons/si";
import { FiYoutube } from "react-icons/fi";

const AttachButton = () => {
    return(
    <Menu width={200} position="top">
      <Menu.Target>
        <Button leftSection={<FaLink/>}>Attach</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<FaRegImage/>}>Image</Menu.Item>
        
        <Menu.Item leftSection={<FaLink/>}>Link</Menu.Item>

        <Menu.Sub>
            <Menu.Sub.Target><Menu.Sub.Item leftSection={<LuMusic/>}>Embedded Music</Menu.Sub.Item></Menu.Sub.Target>
            <Menu.Sub.Dropdown>
                <Menu.Item leftSection={<SlSocialSpotify/>}>Spotify</Menu.Item>
                <Menu.Item leftSection={<SiApplemusic/>}>Apple Music</Menu.Item>
                <Menu.Item leftSection={<RiSoundcloudLine/>}>Soundcloud</Menu.Item>
            </Menu.Sub.Dropdown>
        </Menu.Sub>

        <Menu.Item leftSection={<FiYoutube/>}>Youtube Link</Menu.Item>

      </Menu.Dropdown>
    </Menu>
    )
}

export default AttachButton;