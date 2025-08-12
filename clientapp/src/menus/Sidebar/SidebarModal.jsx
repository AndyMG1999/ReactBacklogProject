import {  Drawer, Stack } from "@mantine/core"
import { PiBeerBottleBold } from "react-icons/pi";
import { TbBeach } from "react-icons/tb";
import { FaGear } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import SidebarButton from "./components/SidebarButton";
import { FaLifeRing } from "react-icons/fa";

const SidebarModal = (props) => {
    const opened = props.opened;
    const onClose = props.onClose;
    
    const modalStyle = {
        header: { 
            backgroundColor: 'rgba(255, 255, 255, 0.25)', // Semi-transparent background
            backdropFilter: 'blur(12px)', // Frosted glass effect
            WebkitBackdropFilter: 'blur(12px)', // For Safari compatibility
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          },
        content: {
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }
    };

    return(
        <Drawer opened={opened} onClose={onClose} offset={20} size="10em" radius="xl" overlayProps={{ backgroundOpacity: 0.08, blur: 1 }} styles={modalStyle}>
            <Stack align="center" gap={"3em"} pt={"md"}>
                <SidebarButton tooltipLabel="The Shore" IconComponent={PiBeerBottleBold}/>
                <SidebarButton tooltipLabel="The Beach" IconComponent={TbBeach}/>
                <SidebarButton tooltipLabel="Stats" IconComponent={IoStatsChart}/>
                <SidebarButton tooltipLabel="Help" IconComponent={FaLifeRing}/>
                <SidebarButton tooltipLabel="Settings" IconComponent={FaGear}/>
            </Stack>
        </Drawer>
    )
}

export default SidebarModal;