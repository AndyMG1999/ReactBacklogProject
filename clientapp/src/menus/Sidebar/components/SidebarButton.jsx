import { ActionIcon } from "@mantine/core"

const SidebarButton = (props) => {
    const iconSize = props.actionSize || 80;
    const IconComponent = props.IconComponent;
    const iconComponentStyle = {
        width: "65%",
        height: "65%"
    }

    return(
        
        <ActionIcon size={iconSize} {...props} radius={"lg"} >
            <IconComponent style={iconComponentStyle} />
        </ActionIcon>
    )
}

export default SidebarButton;