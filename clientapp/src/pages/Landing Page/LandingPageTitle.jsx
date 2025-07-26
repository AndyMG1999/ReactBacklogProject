import { Group,Title,Text } from "@mantine/core"

const LandingPageTitle = () =>{
    return(
        <Group>
            <Title variant="h1" fz={"3em"}> 
            Welcome to Your
            </Title>
            <Text fz={"3em"} variant="gradient" fw={"bold"} gradient={{ from: 'cozyBlue', to: 'cozyGreen' }}>
            Digital Paradise!
            </Text>
        </Group>
    )
}

export default LandingPageTitle;