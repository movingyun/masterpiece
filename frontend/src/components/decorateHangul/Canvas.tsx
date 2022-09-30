import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNFTActions } from '../../_slice/CreateNFTSlice';

function Canvas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const text = useSelector((state: any) => state.areaSentence.value).join('');
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
  // const [text, setText] = useState('세종대왕만세');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const CANVAS_WIDTH = 512;

  // 글자 조작 화면
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    if (!ctx) return;

    // ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);

    // ctx.font = `${textSize}px ${fontName || ''}`;
    // ctx.fillStyle = textColor;
    // ctx.lineWidth = strokeWidth;
    // ctx.strokeStyle = strokeWidth === 0 ? textColor : strokeColor;
    // ctx.strokeText(text, textXAxis, textYAxis + textSize);

    // ctx.shadowColor = shadowColor;
    // ctx.shadowBlur = shadowBlur;
    // ctx.shadowOffsetX = shadowXAxis;
    // ctx.shadowOffsetY = shadowYAxis;

    // ctx.fillText(text, textXAxis, textYAxis + textSize);

    // let requestId: number;
    // let i = 0;
    // const render = () => {
    //   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);

    //   ctx.beginPath();
    //   // context.arc(canvas.width / 4 + 2,canvas.height / 4, (canvas.width / 4) * Math.abs(Math.cos(i)),0,2*Math.PI);
    //   const w = CANVAS_WIDTH / 2;
    //   const h = CANVAS_WIDTH / 2;

    //   const d = Math.min(w, h);
    //   const k = Math.sin(i) * 10;

    //   ctx.strokeStyle = '#fff';
    //   ctx.shadowOffsetX = CANVAS_WIDTH / 100;
    //   ctx.shadowOffsetY = CANVAS_WIDTH / 100;
    //   ctx.lineWidth = CANVAS_WIDTH / 40;
    //   ctx.fillStyle = 'rgba(254, 12, 13, 1)';

    //   ctx.moveTo(d, d);
    //   ctx.quadraticCurveTo((24 * d) / 16, (10 * d) / 16, d, (5 * d) / 4 + k);
    //   ctx.quadraticCurveTo((8 * d) / 16, (10 * d) / 16, d, d);
    //   ctx.stroke();
    //   ctx.fill();

    //   i += 0.05;
    //   requestId = requestAnimationFrame(render);
    //   console.log(requestId);
    // };

    // render();
    // return () => {
    //   cancelAnimationFrame(requestId);
    // };

    const W = CANVAS_WIDTH;
    const H = CANVAS_WIDTH;

    let frameCount = 0;
    const message = text.split('');

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
      message.forEach((letter:string, index:number) => {
        const noiseX = Math.sin(index * 10 + frameCount / 100) * 10;
        const noiseY = Math.cos(index * 10 + frameCount / 100) * 10;

        const offsetX = noiseX + (-Math.cos(index + frameCount / 20) * textSize) / 4;
        const offsetY = noiseY + (Math.sin(index + frameCount / 60) * textSize) / 4;

        ctx.save();
        ctx.translate(index * textSize + offsetX + textXAxis, offsetY + textYAxis + textSize);
        ctx.fillStyle = textColor;
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = strokeWidth === 0 ? textColor : strokeColor;
        ctx.font = `${textSize}px ${fontName || ''}`;

        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = shadowBlur;
        ctx.shadowOffsetX = shadowXAxis;
        ctx.shadowOffsetY = shadowYAxis;
        ctx.strokeText(letter, 0, 0);
        ctx.fillText(letter, 0, 0);

        ctx.restore();
      });
      frameCount = requestAnimationFrame(loop);
    }

    function clear() {
      if (!ctx) return;
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, W, H);
    }

    init();
    return () => {
      cancelAnimationFrame(frameCount);
    };
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