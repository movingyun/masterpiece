import React, { useEffect, useRef as UseRef } from 'react';
import { useSelector as UseSelector } from 'react-redux';

function NFTVideo() {
  const videoBlob = UseSelector((state: any) => state.createNFT.NFTBlob);
  const videoRecorded = UseRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 재생 구현
    if (!videoRecorded.current) return;
    videoRecorded.current.src = videoBlob;
    videoRecorded.current.play();
  }, [])

  return <video id="video_recorded" loop style={{ border: '1px solid black' }} muted ref={videoRecorded} />;
}

export default NFTVideo;