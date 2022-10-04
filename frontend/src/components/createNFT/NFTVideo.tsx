import React, { useEffect, useRef as UseRef } from 'react';
import { useSelector } from 'react-redux';

function NFTVideo() {
  const blobURL = useSelector((state: any) => state.createNFT.NFTBlobURL);
  const videoRecorded = UseRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 재생 구현
    if (!videoRecorded.current) return;
    videoRecorded.current.src = blobURL;
    videoRecorded.current.play();
  }, [])

  return <video id="video_recorded" loop style={{ border: '1px solid black' }} muted ref={videoRecorded} />;
}

export default NFTVideo;