import { BackgroundImage, Button, Stack, Text,Overlay } from "@mantine/core"
import { useEffect, useState, useContext } from "react";
import FeedMessageCard from "./components/FeedMessageCard";
import { Virtuoso } from "react-virtuoso";
import FeedLeftMenu from "../../menus/Feed Menus/FeedLeftMenu";
import FeedRightMenu from "../../menus/Feed Menus/FeedRightMenu";
import { getFeed } from "../../services/feedServices";
import { AppContext } from "../../contexts/ApplicationContext";

const FeedPage = () => {
    const [dummyArrSize,setDummyArrSize]= useState(20);
    const [imageURL, setImageURL] = useState("");

    const {feedData,setFeedData,addFeedData} = useContext(AppContext);
    
    // const getDummyData = () => {
    //     console.log("Populating dummy data.")
    //     for(let i=0; i<dummyArrSize; i++) setDummyData((prevData) => [...prevData, {id: i, messageSubject: " Insert your bottle subject here!", messageContent: randomLengthLorum(), messageLikes: Math.floor(Math.random() * 100), bottleCount: Math.floor(Math.random() * 20)}]);
    // }
    // const randomLengthLorum = () => {
    //     const fullString = "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath";
    //     const fullStringLastIndex = fullString.length - 1;
    //     return fullString.substring(0,Math.floor(Math.random() * fullStringLastIndex))
    // }
    // const getRandomPhoto = async () => {
    // // Get total number of artworks
    // const response = await fetch("https://picsum.photos/1920/1080");
    // console.log("response",response);
    // setImageURL(response.url);
    // }
    // useEffect(()=>{getDummyData()},[]);
    const getFeedData = async () => {
        const data = await getFeed();
        setFeedData(data);
    }
    useEffect(()=>{
        getFeedData();
    },[])
    
    const cardStyle = {
        
    }

    return(
        <Stack align="center" w={"100%"} style={{overflow: "auto"}}>
            <Stack w={"50%"}>
                <FeedLeftMenu />
                {/* {dummyData.map(data => <FeedMessageCard key={data.id} id={data.id} messageSubject={data.messageSubject} messageContent={data.messageContent} messageLikes={data.messageLikes} bottleCount={data.bottleCount}/>)} */}
                <Virtuoso data={feedData} totalCount={feedData.length} useWindowScroll itemContent={(index, data) => <FeedMessageCard data={data} cardStyle={cardStyle}/>}/>
                <FeedRightMenu listData={feedData} listSize={feedData.length}/>
            </Stack>
        </Stack>
    );
}

export default FeedPage;