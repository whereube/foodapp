import { useState, useEffect } from "react";
import { InstagramEmbed, TikTokEmbed } from 'react-social-media-embed';

const EmbededVideo = (props) => {

    const [videoSource, setVideoSource] = useState({})
    const [embededLink, setEmbededLink] = useState("")


    useEffect(() => {
        if (props.recipe.hasOwnProperty('video_link')){
            handleVideoLink();
        }
    }, [props.recipe]);


    const handleVideoLink = () => {
        if (props.recipe.video_link.includes("youtube") === true){
            if (props.recipe.video_link.includes("short") === true){
                setVideoSource({"youtube": "short"})
                const formattedLink = props.recipe.video_link.replace("shorts", "embed")
                setEmbededLink(formattedLink)
            }
            else if(props.recipe.video_link.includes("embed")){
                setVideoSource({"youtube": "longform"})
                setEmbededLink(props.recipe.video_link)
            } else{
                console.log("incorrect video link")
            }
        }
        else if (props.recipe.video_link.includes("instagram")){
            if(props.recipe.video_link.includes("reel")){
                console.log("instagram")
                setVideoSource({"instagram": "reels"})
                setEmbededLink(props.recipe.video_link)
            }
        }
        else if (props.recipe.video_link.includes("tiktok")){
            console.log("Tiktok")
            setVideoSource({"tiktok": "video"})
            setEmbededLink(props.recipe.video_link)
        }

    }


    return (
        <>
            {videoSource.hasOwnProperty("youtube") &&(
                <iframe 
                width={videoSource.youtube === "short" ? "315" : "560"}
                height={videoSource.youtube === "short" ? "560" : "315"}
                src={embededLink}
                title="YouTube video player"
                FrameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
            )}
            <div className="InstaVideo" style={{ display: 'flex', justifyContent: 'center' }}>
                {videoSource.hasOwnProperty("instagram") &&(
                    <InstagramEmbed url={embededLink} width={350} captioned />
                )}
                {videoSource.hasOwnProperty("tiktok") &&(
                    <TikTokEmbed url={embededLink} width={400} captioned />
                )}
            </div>


            <script async src="//www.instagram.com/embed.js"></script>
        </>
    )

}

export default EmbededVideo