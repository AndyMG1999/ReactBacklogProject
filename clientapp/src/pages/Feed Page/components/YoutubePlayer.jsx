import { memo } from "react";

const YoutubePlayer = memo((props) => {
    const youtubeLink = props.attachmentLink || `<iframe width="560" height="315" src="https://www.youtube.com/embed/quGZjIkigu4?si=r0f76ww6uHWcC01X" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    const embedLink = youtubeLink.split("src=\"")[1].split("\"");
    return(
        <iframe width="560" height="315" src={embedLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/>
    )
});

export default YoutubePlayer;