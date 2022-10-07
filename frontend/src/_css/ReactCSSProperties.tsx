import react from 'react';
import { Color } from 'react-color';

const pastelBlue:Color = '#E0FFFF';
const pastelPink: Color = '#FFD4DF';
export const yellow: Color = '#F3E900';
export const black: Color = '#000000';
export const white: Color = '#FFFFFF';

export const defaultBackground: Color = '#F2E4D8';

export default function ReactCSSProperties(){

}

// color 1단계 어둡게
export const ColorDown = (color:string):string=>{
  let r:number = parseInt(color.substring(1,3), 16);
  let g:number = parseInt(color.substring(3,5), 16);
  let b:number = parseInt(color.substring(5,7), 16);
  r -= 0x11;
  g -= 0x11;
  b -= 0x11;
  if(r<0){
    r = 0;
  }
  if(g<0){
    g = 0;
  }
  if(b<0){
    b = 0;
  }
  const resultInt = (r*0x10000+g*0x100+b);
  let addZero:string = "";
  let checkInt = 0x100000;
  while(resultInt/checkInt<1){
    checkInt = parseInt((checkInt/0x10).toString(), 16);
    addZero += "0";
  }
  const result:string = "#" + addZero + resultInt.toString(16);
  return result;
};

export const GradientBlueToPink:React.CSSProperties = {
  padding:10,
  borderRadius:50,
  border:"2px solid white",
  background:`linear-gradient(to bottom right, ${pastelBlue}, ${pastelPink})`
}

export const BlackWhite:React.CSSProperties = {
  padding:10,
  borderRadius:50,
  border:`2px solid ${black.toString()}`,
  background:white,
}

export const tabButtonStyle: React.CSSProperties = {
  background: white.toString(),
  color: black.toString(),
  border: `1px solid ${black.toString()}`,
}
export const selectTabButtonStyle: React.CSSProperties = {
  background: black.toString(),
  color: white.toString(),
  border: `1px solid ${white.toString()}`,
}