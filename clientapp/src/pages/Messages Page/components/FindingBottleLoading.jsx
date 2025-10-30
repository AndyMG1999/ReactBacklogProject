import { Loader, Stack, Title } from "@mantine/core"

const FindingBottleLoading = () => {
    return(
    <Stack align="center">
        <Loader color="cozyBlue" size="xl" type="bars" />
        <Title order={1} c={"white"}>Finding a bottle...</Title>
    </Stack>
    )
}

export default FindingBottleLoading;