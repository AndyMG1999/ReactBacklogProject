import { Button,Menu } from "@mantine/core";
import { FaRegImage } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { LuMusic } from "react-icons/lu";
import { SlSocialSpotify } from "react-icons/sl";
import { RiSoundcloudLine } from "react-icons/ri";
import { SiApplemusic } from "react-icons/si";
import { FiYoutube } from "react-icons/fi";

const AttachButton = (props) => {
  const setDisplayField = props.setDisplayField;
  return(
    <Menu width={200} position="top">
      <Menu.Target>
        <Button leftSection={<FaLink/>}>Attach</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<FaRegImage/>} onClick={()=>setDisplayField(0)}>Image</Menu.Item>
        
        <Menu.Item leftSection={<FaLink/>} onClick={()=>setDisplayField(1)}>Link</Menu.Item>

        <Menu.Sub>
            <Menu.Sub.Target><Menu.Sub.Item leftSection={<LuMusic/>}>Embedded Music</Menu.Sub.Item></Menu.Sub.Target>
            <Menu.Sub.Dropdown>
                <Menu.Item leftSection={<SlSocialSpotify/>} onClick={()=>setDisplayField(2)}>Spotify</Menu.Item>
                <Menu.Item leftSection={<SiApplemusic/>} onClick={()=>setDisplayField(3)}>Apple Music</Menu.Item>
                <Menu.Item leftSection={<RiSoundcloudLine/>} onClick={()=>setDisplayField(4)}>Soundcloud</Menu.Item>
            </Menu.Sub.Dropdown>
        </Menu.Sub>

        <Menu.Item leftSection={<FiYoutube/>} onClick={()=>setDisplayField(5)}>Youtube Embed</Menu.Item>

      </Menu.Dropdown>
    </Menu>
  )
}

export default AttachButton;