import {  Drawer, Stack } from "@mantine/core"
import { PiBeerBottleBold } from "react-icons/pi";
import { TbBeach } from "react-icons/tb";
import { FaGear } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { FaLifeRing } from "react-icons/fa";
import SidebarButton from "./components/SidebarButton";

const SidebarModal = (props) => {
    const opened = props.opened;
    const onClose = props.onClose;
    
    const modalStyle = {
        header: { 
            backgroundColor: 'rgba(255, 255, 255, 0.25)', // Semi-transparent background
            backdropFilter: 'blur(9px)', // Frosted glass effect
            WebkitBackdropFilter: 'blur(9px)', // For Safari compatibility
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          },
        content: {
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(9px)',
            WebkitBackdropFilter: 'blur(9px)',
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }
    };

    return(
        <Drawer opened={opened} onClose={onClose} offset={20} size="10em" radius="xl" overlayProps={{ backgroundOpacity: 0.08, blur: 1 }} styles={modalStyle}>
            <Stack align="center" gap={"3em"} pt={"md"}>
                <SidebarButton tooltiplabel="The Shore" linkto={"/shore"} iconcomponent={PiBeerBottleBold}/>
                <SidebarButton tooltiplabel="The Beach" linkto={"/beach"} iconcomponent={TbBeach}/>
                <SidebarButton tooltiplabel="Stats" linkto={"/"} iconcomponent={IoStatsChart}/>
                <SidebarButton tooltiplabel="Help" linkto={"/"} iconcomponent={FaLifeRing}/>
                <SidebarButton tooltiplabel="Settings" linkto={"/"} iconcomponent={FaGear}/>
            </Stack>
        </Drawer>
    )
}

export default SidebarModal;