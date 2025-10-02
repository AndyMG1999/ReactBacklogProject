import { Button, Dialog, Stack } from "@mantine/core";
import { useState,useContext } from "react";
import { AppContext } from "../../contexts/ApplicationContext";
import { Virtuoso } from "react-virtuoso";
import FeedRightListItem from "./components/FeedRIghtListItem";

const FeedRightMenu = (props) => {
    const {isAtTop} = useContext(AppContext);

    const listSize = props.listSize;
    const listData = props.listData;

    const feedMenuStyle = {
        zIndex: 10,
        borderRadius: "40px",
        transition: "width 0.3s ease-in-out",
        background: 'rgba(255, 255, 255, 0.10)',
        backdropFilter: 'blur(10px) saturate(180%)',
        WebkitBackdropFilter: 'blur(10px) saturate(180%)',
        border: '1px solid rgba(76, 246, 249, 0.43)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        overflow: "hidden",
        position: "relative",
    }

    return(
        <Dialog opened={!isAtTop} size={"md"} h={"70vh"} position={{top:"20%", right: "1em"}} transitionProps={{ transition: 'fade-left', duration: 200, timingFunction: 'linear' }} style={feedMenuStyle} zIndex={5} p={0}>
            <Virtuoso totalCount={listSize} data={listData} itemContent={(index,data)=><FeedRightListItem data={data}/>} headers="Recent Bottles"/>
        </Dialog>
    )
}

export default FeedRightMenu;