import React, {useEffect, useRef} from 'react'

const BackgroundVideo = ({video}) => {
    
    const videoRef = useRef(null);

    useEffect(() => {
      videoRef.current.src = video
    }, [video])
    

    return (
        <video ref={videoRef} autoPlay muted loop playsInline className="fixed object-cover w-full h-full z-[-1]" />
    )
}

export default BackgroundVideo
