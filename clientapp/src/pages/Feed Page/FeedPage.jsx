import { Button, Stack, Text } from "@mantine/core"
import { useEffect, useState } from "react";
import FeedMessageCard from "./components/FeedMessageCard";

const FeedPage = () => {
    const [dummyData,setDummyData]= useState([]);
    const [dummyArrSize,setDummyArrSize]= useState(20);
    
    const getDummyData = () => {
        console.log("Populating dummy data.")
        for(let i=0; i<dummyArrSize; i++) setDummyData((prevData) => [...prevData, {id: i, messageSubject: " Insert your bottle subject here!", messageContent: "This is where you test message content will go. Furthermore, the nature of how much longer the content of a post tend to be means this dummy data is thus, much more verbose than the subject. \n \n Best Wishes,\nLetter Sender"}]);
    }

    useEffect(()=>{getDummyData()},[]);    
    
    return(
        <Stack align="center" >
            <Stack w={"70%"}>
                {dummyData.map(data => <FeedMessageCard id={data.id}/>)}
            </Stack>
        </Stack>
    );
}

export default FeedPage;