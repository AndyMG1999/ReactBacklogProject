import { ActionIcon, Tooltip } from "@mantine/core"

const SidebarButton = (props) => {
    const iconSize = props.actionSize || 80;
    const tooltipLabel = props.tooltipLabel;
    const tooltipColor = props.tooltipColor || "cozyGreen"; 
    const IconComponent = props.IconComponent;
    const iconComponentStyle = {
        width: "65%",
        height: "65%",
    }
    const buttonStyle= { 
        backgroundColor: 'rgba(255, 255, 255, 0.25)', // Semi-transparent background
        backdropFilter: 'blur(12px)', // Frosted glass effect
        WebkitBackdropFilter: 'blur(12px)', // For Safari compatibility
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '0 20px 24px rgba(0,0,0,0.08)',
    };

    return(
        <Tooltip label={tooltipLabel} color={tooltipColor} position="right"radius="lg" transitionProps={{ transition: 'slide-left', duration: 200 }}>
            <ActionIcon size={iconSize} {...props} radius={"lg"} style={buttonStyle}>
                <IconComponent style={iconComponentStyle} />
            </ActionIcon>
        </Tooltip>
    )
}

export default SidebarButton;