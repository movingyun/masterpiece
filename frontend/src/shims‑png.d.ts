// .PNG 파일 타입스크립트 에러 방지
// 참조 솔루션 https://kr.coderbridge.com/questions/7b7189cb685444ea8d10d54673480007
declare module '*.PNG' {
  const value: string;
  export default value;
}
declare module '*.png' {
  const value: string;
  export default value;
}
declare module '*.jpg' {
  const value: string;
  export default value;
}
declare module '*.gif' {
  const value: string;
  export default value;
}
declare module '*.mp3' {
  const value: string;
  export default value;
}
declare module '*.wav' {
  const value: string;
  export default value;
}
declare module '*.mp4' {
  const value: string;
  export default value;
}
