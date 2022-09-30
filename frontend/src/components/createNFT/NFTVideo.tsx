import React, { useEffect, useRef as UseRef } from 'react';
import { useSelector as UseSelector } from 'react-redux';

function NFTVideo() {
  const blobURL = UseSelector((state: any) => state.createNFT.NFTBlobURL);
  const videoRecorded = UseRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 재생 구현
    if (!videoRecorded.current) return;
    videoRecorded.current.src = blobURL;
    videoRecorded.current.play();
    // window.URL.revokeObjectURL(blobURL);

  }, [])

  return <video id="video_recorded" loop style={{ border: '1px solid black' }} muted ref={videoRecorded} />;
}

export default NFTVideo;