import { Group,Title,Text } from "@mantine/core";

const LandingPageTitle = () =>{
    return(
        <Group>
            <Title variant="h1" fz={"3em"}> 
            Meet your new 
            </Title>
            <Text fz={"4em"} variant="gradient" fw={"bold"} gradient={{ from: 'cozyBlue', to: 'cozyGreen' }}>
            Hiding Place!
            </Text>
        </Group>
    )
}

export default LandingPageTitle;