import { BackgroundImage, Button, Stack, Text,Overlay } from "@mantine/core"
import { useEffect, useState } from "react";
import FeedMessageCard from "./components/FeedMessageCard";

const FeedPage = () => {
    const [dummyData,setDummyData]= useState([]);
    const [dummyArrSize,setDummyArrSize]= useState(20);
    const [imageURL, setImageURL] = useState("");
    
    const getDummyData = () => {
        console.log("Populating dummy data.")
        for(let i=0; i<dummyArrSize; i++) setDummyData((prevData) => [...prevData, {id: i, messageSubject: " Insert your bottle subject here!", messageContent: "This is where you test message content will go. Furthermore, the nature of how much longer the content of a post tend to be means this dummy data is thus, much more verbose than the subject. \n \n Best Wishes,\nLetter Sender"}]);
    }

    const getRandomPhoto = async () => {
    // Get total number of artworks
    const response = await fetch("https://picsum.photos/1920/1080");
    console.log("response",response);

    setImageURL(response.url);
    }

    useEffect(()=>{getDummyData()},[]); 
    
    // const backgroundStyle = {
    //     background: `linear-gradient(to bottom, ${theme.colors.cozyBlue[3]}, ${theme.colors.cozyBlue[6]})`, // Example gradient
    //     padding: '20px',
    //     borderRadius: '8px',
    // }

    return(
        <Stack align="center" pt={"xs"}>
            <Stack w={"70%"}>
                {dummyData.map(data => <FeedMessageCard key={data.id} id={data.id}/>)}
            </Stack>
        </Stack>
    );
}

export default FeedPage;