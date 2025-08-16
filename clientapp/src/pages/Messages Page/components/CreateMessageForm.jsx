import { Container, Avatar, Button, Stack, TextInput, Textarea, TagsInput, Checkbox, Text, Select,Group } from "@mantine/core";

const CreateMessageForm = () => {
    const containerStyle = {
        background: 'rgba(255,255,255,0.25)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        borderRadius: '16px'
    };

    const fieldsetStyle = {
        background: 'rgba(255,255,255,0.25)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        borderRadius: '12px',
        padding: '1em'
    }

    const fullTagsData = [
        {id: 0,label:"🍾 All Seven Seas",numberOfBottles:13442},
    ]

    const sendOffsData =['Warm Regards,', 'Sincerely,', 'Take Care!']

    const tagsStringData = fullTagsData.map((data)=>data.label);
    return(
        <Stack w={"50%"} align="center">
            <Container w={"100%"} style={containerStyle}>
                <Stack gap={"md"} p={"10px"}>
                    <TextInput fw={"bold"} pt={"20px"} placeholder="Title your bottle here!"/>
                    <TagsInput
                    required
                    radius="lg"
                    fw={"bold"}
                    description="Add up to 3 tags"
                    placeholder="Who should receive this bottle?"
                    maxTags={3}
                    defaultValue={[tagsStringData[0]]}
                    data={tagsStringData}
                    renderOption={(tag)=>{
                        return `${tag.option.value} -${fullTagsData.find(data => data.label == tag.option.value).numberOfBottles} Bottles Sent!`;
                    }}
                    />
                    <Textarea placeholder="Enter you message here!" autosize minRows={10} maxRows={10} />
                    <Checkbox label="Allow Multiple Responses" />
                    <Group>
                        <Select placeholder="Pick a sendoff!" allowDeselect={false} fw={"bold"} data={sendOffsData} />
                        <Text fw="bold">Account Name</Text>
                        <Avatar color="cozyGreen"/>
                    </Group>
                </Stack>
            </Container>

            <Button size="compact-md" fullWidth>Toss to the sea!</Button>   
        </Stack>
    )
}

export default CreateMessageForm;