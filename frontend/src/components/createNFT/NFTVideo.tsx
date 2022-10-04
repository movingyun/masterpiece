import React, { useEffect, useRef as UseRef } from 'react';
import { UseSelectorHook } from '../../_hook/HangulMakerHook';

function NFTVideo() {
  const blobURL = UseSelectorHook(state => state.createNFT.NFTBlobURL);
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