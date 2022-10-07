/* eslint-disable max-len */
import React, { useRef, useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Tab } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { Send } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { UseSelectorHook } from "../../_hook/HangulMakerHook";
import { createNFTActions } from '../../_slice/CreateNFTSlice';
import { decoActions } from '../../_slice/DecorateHangulSlice'

function Canvas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const text = UseSelectorHook(state => state.areaSentence.value).join('');
  const textSize = UseSelectorHook(state => state.deco.textSize);
  const textColor =  UseSelectorHook(state => state.deco.textColor);
  const textXAxis =  UseSelectorHook(state => state.deco.textXAxis);
  const textYAxis =  UseSelectorHook(state => state.deco.textYAxis);
  const textWidthSpacing =  UseSelectorHook(state => state.deco.textWidthSpacing);
  const textLineSpacing =  UseSelectorHook(state => state.deco.textLineSpacing);
  const strokeWidth =  UseSelectorHook(state => state.deco.strokeWidth);
  const strokeColor =  UseSelectorHook(state => state.deco.strokeColor);
  const shadowXAxis =  UseSelectorHook(state => state.deco.shadowXAxis);
  const shadowYAxis =  UseSelectorHook(state => state.deco.shadowYAxis);
  const shadowBlur =  UseSelectorHook(state => state.deco.shadowBlur);
  const shadowColor =  UseSelectorHook(state => state.deco.shadowColor);
  const backgroundColor =  UseSelectorHook(state => state.deco.backgroundColor);
  const fontName =  UseSelectorHook(state => state.deco.fontName);
  const animationSpeed =  UseSelectorHook(state => state.deco.animationSpeed);

  
  // const [text, setText] = useState("야너네\n뭐하냐");
  // 애니메이션
  const [animationType, setAnimationType] = useState(1);
  const handleAnimationType = (event: React.SyntheticEvent, newValue: number) => {
    setAnimationType(newValue);
    dispatch(decoActions.textSize(textSize));
  };

  // Minting button 눌렀을 때 로딩
  const [loading, setLoading] = React.useState(false);


  const canvasRef = useRef<HTMLCanvasElement>(null);
  const CANVAS_WIDTH = 512;
  const messageLineByLine = text.split('\n');
  
  // 글자 조작 화면
  useEffect(() => {
    if(animationType === 0) return;

    const ctx = canvasRef.current?.getContext('2d');

    if (!ctx) return;

    // animation one
    const W = CANVAS_WIDTH;
    const H = CANVAS_WIDTH;

    let frameCount = 0;

    function init() {
      if (!ctx) return;
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
      if (animationType === 1) {
        frameCount = requestAnimationFrame(loop1);
      } else if (animationType === 2) {
        frameCount = requestAnimationFrame(loop2);
      } else if (animationType === 3) {
        frameCount = requestAnimationFrame(loop3);
      } else if (animationType === 4) {
        frameCount = requestAnimationFrame(loop4);
      } else if (animationType === 5) {
        frameCount = requestAnimationFrame(loop5);
      }
    }

    function loop1() {
      clear();

      if (!ctx) return;
      ctx.globalAlpha = 0.4;
      messageLineByLine.forEach((line: string, idx: number) => {
        line.split('').forEach((letter: string, index: number) => {
          const noiseX = (Math.sin(index * 10 + frameCount / 100) * 10);
          const noiseY = (Math.cos(index * 10 + frameCount / 100) * 10);

          const offsetX = noiseX + (-Math.cos(index + frameCount / animationSpeed) * textSize) / 4;
          const offsetY = noiseY + (Math.sin(index + frameCount / animationSpeed / 2) * textSize) / 4;

          ctx.save();
          // eslint-disable-next-line max-len
          ctx.translate(
            offsetX * (idx + 1) / 2 + index * (textSize + textWidthSpacing),
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

      frameCount = requestAnimationFrame(loop1);
    }

    function loop2() {
      clear();

      if (!ctx) return;
      ctx.globalAlpha = 0.4;
      messageLineByLine.forEach((line: string, idx: number) => {
        line.split('').forEach((letter: string, index: number) => {

          ctx.save();
          ctx.translate(
            CANVAS_WIDTH / 2 + textXAxis - ctx.measureText(line).width * 2 + index * (textSize + textWidthSpacing),
            CANVAS_WIDTH / 2 + idx * textSize + textYAxis + idx * textLineSpacing
          );
          ctx.rotate((frameCount * Math.PI) / - animationSpeed / 3);
          ctx.fillStyle = textColor;
          ctx.lineWidth = strokeWidth;
          ctx.strokeStyle = strokeWidth === 0 ? textColor : strokeColor;
          ctx.font = `${textSize}px ${fontName || ''}`;

          ctx.shadowColor = shadowColor;
          ctx.shadowBlur = shadowBlur;
          ctx.shadowOffsetX = shadowXAxis;
          ctx.shadowOffsetY = shadowYAxis;
          ctx.textAlign = 'center';
          ctx.strokeText(letter, 0, 0);
          ctx.fillText(letter, 0, 0);
          ctx.restore();
        });
      });

      frameCount = requestAnimationFrame(loop2);
    }

    function loop3() {
      clear();

      if (!ctx) return;
      ctx.globalAlpha = 0.4;
      messageLineByLine.forEach((line: string, idx: number) => {
        line.split('').forEach((letter: string, index: number) => {

          const numRadsPerLetter = -(2 * Math.PI) / line.length;

          ctx.save();
          ctx.translate(
            CANVAS_WIDTH / 2,
            CANVAS_WIDTH / 2
          );
          ctx.rotate(((index + 1) * (frameCount * Math.PI)) / animationSpeed / 100);

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
            CANVAS_WIDTH / 3 - textSize * idx + textXAxis,
            CANVAS_WIDTH / 3 - textSize * idx + textYAxis
          );
          ctx.fillText(letter, CANVAS_WIDTH / 3 - (textSize) * idx + textXAxis, CANVAS_WIDTH / 3 - (textSize) * idx + textYAxis);
          ctx.restore();
          
        });
      });

      frameCount = requestAnimationFrame(loop3);
    }

    function loop4() {
      clear();

      if (!ctx) return;
      ctx.globalAlpha = 0.4;
      messageLineByLine.forEach((line: string, idx: number) => {
        line.split('').forEach((letter: string, index: number) => {

          const offset = index % 2 === 0 ? 1 : -1;

          const offsetY = 2 * offset * (Math.cos(frameCount / animationSpeed) * textSize) / 4;

          ctx.save();
          ctx.translate(
            index * (textSize + textWidthSpacing),
            offsetY
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

      frameCount = requestAnimationFrame(loop4);
    }

    function loop5() {
      clear();

      if (!ctx) return;
      ctx.globalAlpha = 0.4;

      messageLineByLine.forEach((line: string, idx: number) => {
        line.split('').forEach((letter: string, index: number) => {

          ctx.save();

          ctx.transform(
            1,
            -Math.sin((frameCount / animationSpeed) / 2),
            Math.sin((frameCount / animationSpeed) / 2),
            1,
            CANVAS_WIDTH / 2 + textXAxis,
            CANVAS_WIDTH / 2 + idx * textSize * 1.5 + textYAxis + idx * textLineSpacing
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
          ctx.strokeText(line, 0, 0);
          ctx.fillText(line, 0, 0);
          ctx.restore();
        });
      });

      frameCount = requestAnimationFrame(loop5);
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
    
  });

  useEffect(() => {
    if (animationType !== 0) return;

    // animation 없을 때
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);

    messageLineByLine.forEach((line: string, idx: number) => {
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
    });
  });

  // Canvas 녹화
  const recordCanvas = () => {
    setLoading(true);

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
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {/* <div>애니메이션 원래 위치는 여기</div> */}
      <Tabs
        value={animationType}
        onChange={handleAnimationType}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
          marginBottom: 3,
        }}>
        <Tab label="Default" sx={{ fontWeight: 700, fontSize: '18px' }} />
        <Tab label="No. 1" sx={{ fontWeight: 700, fontSize: '18px' }} />
        <Tab label="No. 2" sx={{ fontWeight: 700, fontSize: '18px' }} />
        <Tab label="No. 3" sx={{ fontWeight: 700, fontSize: '18px' }} />
        <Tab label="No. 4" sx={{ fontWeight: 700, fontSize: '18px' }} />
        <Tab label="No. 5" sx={{ fontWeight: 700, fontSize: '18px' }} />
      </Tabs>
      {animationType === 0 && (
        <canvas
          id="canvas"
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_WIDTH}
          style={{ backgroundColor, fontFamily: 'BlackHanSans', width: CANVAS_WIDTH, height: CANVAS_WIDTH }}
        />
      )}
      {animationType !== 0 && (
        <canvas
          id="canvas"
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_WIDTH}
          style={{ backgroundColor, fontFamily: 'BlackHanSans', width: CANVAS_WIDTH, height: CANVAS_WIDTH }}
        />
      )}
      <br />
      <LoadingButton
        color="secondary"
        onClick={recordCanvas}
        loading={loading}
        loadingPosition="end"
        endIcon={<Send />}
        variant="contained">
        Let&apos;s Mint!
      </LoadingButton>
    </div>
  );
}

export default Canvas;