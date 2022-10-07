import React from 'react'
import {List, ListItem, Divider } from '@mui/material';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { UseSelectorHook } from '../../_hook/HangulMakerHook';
import { decoActions } from '../../_slice/DecorateHangulSlice';

const FONT_SIZE = 40;

const FontBlackHanSans = styled.div`
  font-family: 'BlackHanSans';
  font-size: ${FONT_SIZE}px;
`;
const FontBMEuljiro = styled.div`
  font-family: 'BMEuljiro';
  font-size: ${FONT_SIZE}px;
`;
const FontGabiaBombaram = styled.div`
  font-family: 'GabiaBombaram';
  font-size: ${FONT_SIZE}px;
`;
const FontHSBombaram = styled.div`
  font-family: 'HSBombaram';
  font-size: ${FONT_SIZE}px;
`;
const FontHSGooltokki = styled.div`
  font-family: 'HSGooltokki';
  font-size: ${FONT_SIZE}px;
`;
const FontMapoHongdaeFreedom = styled.div`
  font-family: 'MapoHongdaeFreedom';
  font-size: ${FONT_SIZE * 0.9}px;
`;
const FontSangjuGotgam = styled.div`
  font-family: 'SangjuGotgam';
  font-size: ${FONT_SIZE}px;
`;
const FontSuseongBatang = styled.div`
  font-family: 'SuseongBatang';
  font-size: ${FONT_SIZE}px;
`;
const FontClassicB = styled.div`
  font-family: 'ClassicB';
  font-size: ${FONT_SIZE}px;
`;
const FontDolBomB = styled.div`
  font-family: 'DolBomB';
  font-size: ${FONT_SIZE}px;
`;
const FontGwangJu = styled.div`
  font-family: 'GwangJu';
  font-size: ${FONT_SIZE}px;
`;
const FontNamsan = styled.div`
  font-family: 'Namsan';
  font-size: ${FONT_SIZE}px;
`;
const FontHangang = styled.div`
  font-family: 'Hangang';
  font-size: ${FONT_SIZE}px;
`;
const FontYanolja = styled.div`
  font-family: 'Yanolja';
  font-size: ${FONT_SIZE * 1.2}px;
`;
const FontJSArirangPPURI = styled.div`
  font-family: 'JSArirangPPURI';
  font-size: ${FONT_SIZE}px;
`;
const FontDanGam = styled.div`
  font-family: 'DanGam';
  font-size: ${FONT_SIZE}px;
`;
const FontKCCAhnjunggeun = styled.div`
  font-family: 'KCCAhnjunggeun';
  font-size: ${FONT_SIZE}px;
`;
const FontJikji = styled.div`
  font-family: 'Jikji';
  font-size: ${FONT_SIZE}px;
`;
const FontHanDoetEum = styled.div`
  font-family: 'HanDoetEum';
  font-size: ${FONT_SIZE}px;
`;
const FontGoheung = styled.div`
  font-family: 'Goheung';
  font-size: ${FONT_SIZE * 1.5}px;
`;


function FontPicker() {
  const dispatch = useDispatch();
  const style =  UseSelectorHook(state => state.deco.style);

  const fontNameHandler = (type: string) => {
    dispatch(decoActions.fontName(type));
  };

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button onClick={() => fontNameHandler('BlackHanSans')}>
        <FontBlackHanSans>검은고딕체</FontBlackHanSans>
      </ListItem>
      <Divider />
      <ListItem button divider onClick={() => fontNameHandler('BMEuljiro')}>
        <FontBMEuljiro>배민 을지로체</FontBMEuljiro>
      </ListItem>
      <ListItem button onClick={() => fontNameHandler('GabiaBombaram')}>
        <FontGabiaBombaram>가비아봄바람체</FontGabiaBombaram>
      </ListItem>
      <Divider />
      <ListItem button onClick={() => fontNameHandler('HSBombaram')}>
        <FontHSBombaram>HS봄바람체 3.0</FontHSBombaram>
      </ListItem>
      <Divider />
      <ListItem button onClick={() => fontNameHandler('HSGooltokki')}>
        <FontHSGooltokki>HS굴토끼체</FontHSGooltokki>
      </ListItem>
      <Divider />
      <ListItem button onClick={() => fontNameHandler('MapoHongdaeFreedom')}>
        <FontMapoHongdaeFreedom>Mapo 홍대프리덤</FontMapoHongdaeFreedom>
      </ListItem>
      <Divider />
      <ListItem button onClick={() => fontNameHandler('SangjuGotgam')}>
        <FontSangjuGotgam>상주곶감체</FontSangjuGotgam>
      </ListItem>
      <Divider />
      <ListItem button onClick={() => fontNameHandler('SuseongBatang')}>
        <FontSuseongBatang>수성바탕체</FontSuseongBatang>
      </ListItem>
      <Divider />
      <ListItem button onClick={() => fontNameHandler('ClassicB')}>
        <FontClassicB>클래식체 B</FontClassicB>
      </ListItem>
      <Divider />
      <ListItem button onClick={() => fontNameHandler('DolBomB')}>
        <FontDolBomB>문화재돌봄체B</FontDolBomB>
      </ListItem>
      <Divider />
      <ListItem button onClick={() => fontNameHandler('GwangJu')}>
        <FontGwangJu>빛고을광주체 B</FontGwangJu>
      </ListItem>
      <Divider />
      <ListItem button onClick={() => fontNameHandler('Namsan')}>
        <FontNamsan>서울남산체 EB</FontNamsan>
      </ListItem>
      <Divider />
      <ListItem button onClick={() => fontNameHandler('Hangang')}>
        <FontHangang>서울한강체 EB</FontHangang>
      </ListItem>
      <Divider />
      <ListItem button onClick={() => fontNameHandler('Yanolja')}>
        <FontYanolja>야놀자 야체</FontYanolja>
      </ListItem>
      <Divider />
      <ListItem button onClick={() => fontNameHandler('JSArirangPPURI')}>
        <FontJSArirangPPURI>정선아리랑 뿌리체</FontJSArirangPPURI>
      </ListItem>
      <Divider />
      <ListItem button onClick={() => fontNameHandler('KCCAhnjunggeun')}>
        <FontKCCAhnjunggeun>KCC 안중근체</FontKCCAhnjunggeun>
      </ListItem>
      <Divider />
      <ListItem button onClick={() => fontNameHandler('DanGam')}>
        <FontDanGam>창원단감아삭체</FontDanGam>
      </ListItem>
      <Divider />
      <ListItem button onClick={() => fontNameHandler('Jikji')}>
        <FontJikji>충북대 직지체</FontJikji>
      </ListItem>
      <Divider />
      <ListItem button onClick={() => fontNameHandler('HanDoetEum')}>
        <FontHanDoetEum>한수원 한돋움체</FontHanDoetEum>
      </ListItem>
      <Divider />
      <ListItem button onClick={() => fontNameHandler('Goheung')}>
        <FontGoheung>행복고흥체 B</FontGoheung>
      </ListItem>
    </List>
  );
}

export default FontPicker