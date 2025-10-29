import { Container, Avatar, Button, Stack, TextInput, Textarea, TagsInput, Checkbox, Text, Select,Group,Alert } from "@mantine/core";
import AttachButton from "./AttachButton";
import { useState,useContext, useEffect } from "react";
import { useForm,isNotEmpty } from "@mantine/form";
import { AppContext } from "../../../contexts/ApplicationContext";
import { createPost } from "../../../services/postServices";
import { getAllTags,simplifyTagCount } from "../../../services/tagServices";
import { FaCheckCircle } from "react-icons/fa";

const CreateMessageForm = () => {
    const {userInfo} = useContext(AppContext);
    const userName = userInfo?.userName;

    const [displayField, setDisplayField] = useState(null);
    const [tagsStringData, setTagsStringData] = useState([]);
    const [tagsRenderData, setTagsRenderData] = useState({});
    const [isCorrectAttachment, setIsCorrectAttachment] = useState(false);
    const [openErrorAlert,setOpenErrorAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const getTags = async () => {
        const data = await getAllTags();
        console.log("data:",data);
        // Sets up tags with just tag names eg. ["Tag 1", "Tag 2"]
        setTagsStringData(data.map(tag => tag.tagName));
        // Sets up so tags can display number of bottles tagged with given tag eg. {"Tag 1": 23,"Tag 2": 100}
        setTagsRenderData([]);
        data.map(tag => {setTagsRenderData((prev)=>({...prev, [tag.tagName]: simplifyTagCount(tag.postsTaggedCount)}))});
    }
    useEffect(()=>{getTags()},[])

    const checkAttachmentLink = (link) => {
        const linkRegExp = /\w+[.]\w+/;
        const soundcloudRegExp = /<iframe.*tracks\/.*[&]/i;
        const youtubeRegExp = /src=[/]/
        if(displayField == 1) return link.match(linkRegExp);
        if(displayField == 2) return link.match(soundcloudRegExp);
        if(displayField == 5) return link.match(youtubeRegExp);
    }

    const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      postTitle: "",
      postTags: ["🍾 All Seven Seas"],
      postBody: "",
      attachmentType: "",
      attachmentLink: "",
      allowMultipleResponses: true,
      formSendOff: "",
    },
    onValuesChange: (values) => {
        setIsCorrectAttachment(checkAttachmentLink(values.attachmentLink));
    },

    validate: {
      postTitle: isNotEmpty('Required'),
      postTags: isNotEmpty('Please Enter At Least 1 Tag'),
      postBody: isNotEmpty('Required'),
    },
    });

    const onSubmitPost = async (data) => {
        setIsLoading(true);
        setOpenErrorAlert(false);
        data.postTags = data.postTags.map(tag=>({tagName: tag}));
        data.attachmentType = displayField;
        console.log("data subtmitted", data);
        const response = await createPost(data);
        
        if(!response.ok) {
            const error = await response.text();
            setOpenErrorAlert(true);
            return;
        }
        
        form.reset();
        setIsLoading(false);
    }

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

    const sendOffsData =['Warm Regards,', 'Sincerely,', 'Take Care!']
    const errorMessage = "Error Submitting Form...😢"
    const linkPlaceholderText = displayField==0? "enter image link here...":displayField==1? "enter link here...":displayField==2?"enter spotify embeded code here...":displayField==3?"enter apple music embeded code here...": displayField==4? "enter soundcloud embeded code here...": displayField==5?"enter youtube embeded code here...":"enter attachment here...";

    return(
        <Stack w={"50%"} align="center">
        <form onSubmit={form.onSubmit(onSubmitPost)}>     
            <Container w={"100%"} style={containerStyle}>
                <Stack gap={"md"} p={"10px"}>
                    <TextInput fw={"bold"} pt={"20px"} placeholder="Title your bottle here!" key={form.key('postTitle')} {...form.getInputProps('postTitle')} disabled={isLoading}/>
                    
                    <TagsInput
                    required
                    key={form.key('postTags')}
                    {...form.getInputProps('postTags')}
                    radius="lg"
                    fw={"bold"}
                    description="Add up to 3 tags"
                    placeholder="Who should receive this bottle?"
                    maxTags={3}
                    defaultValue={["🍾 All Seven Seas"]}
                    data={tagsStringData}
                    disabled={isLoading}
                    renderOption={(tag)=>{
                        return `${tag.option.value} -${tagsRenderData[tag.option.value]} Bottles Sent!`;
                    }}
                    />
                    
                    <Textarea placeholder="Enter you message here!" autosize minRows={10} maxRows={10} key={form.key('postBody')} {...form.getInputProps('postBody')} disabled={isLoading}/>
                    
                    <AttachButton setDisplayField={setDisplayField} isLoading={isLoading}/>
                    {displayField != null && <TextInput key={form.key('attachmentLink')} {...form.getInputProps('attachmentLink')} placeholder={linkPlaceholderText} disabled={isLoading} rightSection={isCorrectAttachment && <FaCheckCircle/>}/>}

                    <Checkbox label="Allow Multiple Responses" key={form.key('allowMultipleResponses')} {...form.getInputProps('allowMultipleResponses',{ type: 'checkbox' })} c={"white"} disabled={isLoading}/>
                    
                    <Group>
                        <Select placeholder="Pick a sendoff!" allowDeselect={false} fw={"bold"} data={sendOffsData} key={form.key('formSendOff')} {...form.getInputProps('formSendOff')} disabled={isLoading} />
                        <Text fw="bold" c={"white"}>{userName??"Account Name"}</Text>
                        <Avatar color="cozyGreen" name={userName??""}/>
                    </Group>
                    {openErrorAlert && <Alert variant="filled" color="red" title={errorMessage??"Error"} onClose={()=>setOpenErrorAlert(false)} withCloseButton radius={"lg"}/>}   
                </Stack>
            </Container>

            <Button type="submit" size="compact-md" fullWidth mt={"md"} loading={isLoading}>Toss to the sea!</Button>
        </form>
        </Stack>
    )
}

export default CreateMessageForm;