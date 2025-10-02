const YoutubePlayer = (props) => {
    const youtubeLink = props.link || `<iframe width="560" height="315" src="https://www.youtube.com/embed/quGZjIkigu4?si=r0f76ww6uHWcC01X" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    const embedLink = youtubeLink.split("src=\"")[1].split("\"");
    return(
        <iframe width="560" height="315" src={embedLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen/>
    )
}

export default YoutubePlayer;