import { Image,Title } from "@mantine/core";
import projectLogo from "../../assets/projectLogo.svg";

const ToolbarLogo = () => {
    return(
        <>
            <Image src={projectLogo} h="5em" w="auto" fit="contain" mr="-2em"/>
            <Title order={1} fz={"2.5em"} c="white">bottledup.io</Title> 
        </>
    )
}

export default ToolbarLogo;