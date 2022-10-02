/* eslint-disable max-len */
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNFTActions } from '../../_slice/CreateNFTSlice';

function Canvas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const text = useSelector((state: any) => state.areaSentence.value).join('');
  const textSize = useSelector((state: any) => state.deco.textSize);
  const textColor = useSelector((state: any) => state.deco.textColor);
  const textXAxis = useSelector((state: any) => state.deco.textXAxis);
  const textYAxis = useSelector((state: any) => state.deco.textYAxis);
  const textLineSpacing = useSelector((state: any) => state.deco.textLineSpacing);
  const strokeWidth = useSelector((state: any) => state.deco.strokeWidth);
  const strokeOpacity = useSelector((state: any) => state.deco.strokeOpacity);
  const strokeColor = useSelector((state: any) => state.deco.strokeColor);
  const shadowXAxis = useSelector((state: any) => state.deco.shadowXAxis);
  const shadowYAxis = useSelector((state: any) => state.deco.shadowYAxis);
  const shadowBlur = useSelector((state: any) => state.deco.shadowBlur);
  const shadowColor = useSelector((state: any) => state.deco.shadowColor);
  const backgroundColor = useSelector((state: any) => state.deco.backgroundColor);
  const fontName = useSelector((state: any) => state.deco.fontName);

  // 텍스트
  const [text, setText] = useState('세종대왕\n만세');
  const [animationType, setAnimationType] = useState(1);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const CANVAS_WIDTH = 512;
  const messageLineByLine = text.split('\n');
  const maxWidth = Math.max(...messageLineByLine.map(item => item.length));
  
  // 글자 조작 화면
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    if (!ctx) return;

    // animation one
    const W = CANVAS_WIDTH;
    const H = CANVAS_WIDTH;

    let frameCount = 0;

    function init() {
      if (!ctx) return;
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
      frameCount = requestAnimationFrame(loop);
      // console.log(frameCount);
    }

    function loop() {
      clear();

      if (!ctx) return;
      ctx.globalAlpha = 0.4;
      messageLineByLine.forEach((line: string, idx: number) => {
        line.split('').forEach((letter: string, index: number) => {
          const noiseX = Math.sin(index * 10 + frameCount / 100) * 10;
          const noiseY = Math.cos(index * 10 + frameCount / 100) * 10;

          const offsetX = noiseX + (-Math.cos(index + frameCount / 20) * textSize) / 4;
          const offsetY = noiseY + (Math.sin(index + frameCount / 60) * textSize) / 4;

          ctx.save();
          // eslint-disable-next-line max-len
          ctx.translate(
            offsetX * (idx + 1) / 2 + index * textSize,
            offsetY * (idx + 1) / 2
          );
          ctx.fillStyle = textColor;
          ctx.lineWidth = strokeWidth;
          ctx.strokeStyle = strokeWidth === 0 ? textColor : strokeColor;
          ctx.font = `${textSize}px ${fontName || ''}`;

          ctx.shadowColor = shadowColor;
          ctx.shadowBlur = shadowBlur;
          ctx.shadowOffsetX = shadowXAxis;
          ctx.shadowOffsetY = shadowYAxis;
          ctx.textAlign = 'center';
          ctx.strokeText(
            letter,
            CANVAS_WIDTH / 2 + textXAxis - ctx.measureText(line).width / 2,
            CANVAS_WIDTH / 2 + idx * textSize + textYAxis + idx * textLineSpacing
          );
          ctx.fillText(
            letter,
            CANVAS_WIDTH / 2 + textXAxis - ctx.measureText(line).width / 2,
            CANVAS_WIDTH / 2 + idx * textSize + textYAxis + idx * textLineSpacing
          );

          ctx.restore();
        });
      });

      frameCount = requestAnimationFrame(loop);
    }

    function clear() {
      if (!ctx) return;
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, W, H);
    }




    // ANIMATION TYPES
    if (animationType === 0) {
      // animation 없을 때
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
      messageLineByLine.forEach((line: string, idx: number) => {
        ctx.save();
        ctx.fillStyle = textColor;
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = strokeWidth === 0 ? textColor : strokeColor;
        ctx.font = `${textSize}px ${fontName || ''}`;

        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = shadowBlur;
        ctx.shadowOffsetX = shadowXAxis;
        ctx.shadowOffsetY = shadowYAxis;
        ctx.textAlign = 'center';
        ctx.strokeText(
          line,
          CANVAS_WIDTH / 2 + textXAxis,
          CANVAS_WIDTH / 2 + idx * textSize + textYAxis + idx * textLineSpacing
        );
        ctx.fillText(
          line,
          CANVAS_WIDTH / 2 + textXAxis,
          CANVAS_WIDTH / 2 + idx * textSize + textYAxis + idx * textLineSpacing
        );
        ctx.restore();
      });
    } else if (animationType === 1) {
      init();
      return () => {
        cancelAnimationFrame(frameCount);
      };
    }



  }, [
    shadowBlur,
    shadowXAxis,
    shadowYAxis,
    shadowColor,
    fontName,
    strokeWidth,
    strokeColor,
    strokeOpacity,
    textXAxis,
    textYAxis,
    text,
    textSize,
    textColor,
    backgroundColor,
    textLineSpacing,
  ]);

  // Canvas 녹화
  const recordCanvas = () => {
    const canvasRec = canvasRef.current;

    // MediaRecorder(녹화기) 변수 선언
    let mediaRecorder: MediaRecorder | null = null;

    // 스트림 데이터를 담아둘 배열 생성
    const arrVideoData: BlobPart[] | undefined = [];

    // 캔버스 영역 화면을 스트림으로 취득
    if (!canvasRec) return;
    const mediaStream = canvasRec.captureStream();

    // MediaRecorder(녹화기) 객체 생성
    mediaRecorder = new MediaRecorder(mediaStream);

    // MediaRecorder.dataavailable 이벤트 처리
    mediaRecorder.ondataavailable = event => {
      // 스트림 데이터(Blob)가 들어올 때마다 배열에 담아둔다.
      arrVideoData.push(event.data);
    };

    mediaRecorder.start();

    mediaRecorder.onstop = () => {
      // 들어온 스트림 데이터들(Blob)을 통합한 Blob객체를 생성
      const blob = new Blob(arrVideoData);

      // BlobURL 생성: 통합한 스트림 데이터를 가르키는 임시 주소를 생성
      const blobURL = window.URL.createObjectURL(blob);
      // console.log('blobURL : ', blobURL);

      // Blob store 저장
      dispatch(createNFTActions.NFTBlob(blob));
      dispatch(createNFTActions.NFTBlobURL(blobURL));

      // 배열 초기화
      arrVideoData.splice(0);
      navigate('/createnft');
    };

    setTimeout(() => {
      mediaRecorder?.stop();
    }, 3000);
  };

  return (
    <>
      <div>애니메이션 원래 위치는 여기</div>
      <canvas
        id="canvas"
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_WIDTH}
        style={{ backgroundColor, fontFamily: 'BlackHanSans' }}
      />
      <button type="button" onClick={recordCanvas}>
        recordCanvas
      </button>
    </>
  );
}

export default Canvas;