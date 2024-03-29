import { Axios } from "@constants"
import { useEffect, useRef, useState } from "react"
import { Header, Movies } from "@components"
import { useParams } from "react-router-dom"
import ReactPlayer from 'react-player/youtube'
import { NotFound } from "@screens"

const Player: React.FC = () => {
    const [videoId, setVideoId] = useState<string>("")
    const params = useParams()
    const videoRef = useRef(null)

    const fetchMovieVideos = async () => {
        await Axios(`/movie/${params.movieId}/videos`).get("").then((res) => {
            setVideoId(res.data.results[0].key || "")
        })
    }

    useEffect(() => {
        fetchMovieVideos()
    }, [])

    return (
        <div className="Player" style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
            <Header bgColor="black" />

            {!!!videoId ? (
                <div className="pt-5">
                    <NotFound subTitle="Movie trailer not found" />
                </div>
            ) : (
                <ReactPlayer
                    playing={true}
                    controls={true}
                    muted={true}
                    ref={videoRef}
                    width={'100%'}
                    height={'100%'}
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                />
            )}
            <Movies isPlayer={true} movieId={params.movieId} />
        </div>
    )
}

export default Player