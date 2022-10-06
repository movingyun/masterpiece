import React from "react";
import { Box, Button } from "@mui/material";
import { yellow } from "../_css/ReactCSSProperties";

export default function Information({ title, content, buttonText, onClick, backgroundColor, width, height,
lineHeight }: any) {
	const [thisBackground, setThisBackground] = React.useState<string>(yellow.toString());
	const [thisHeight, setThisHeight] = React.useState<number>(200);
	const [thisWidth, setThisWidth] = React.useState<number>(0);
	const [thisLineHeight, setThisLineHeight] = React.useState<number>(5);
	const [thisButtonText, setThisButtonText] = React.useState<string>("");
	React.useEffect(() => {
		if (backgroundColor!==undefined) {
			setThisBackground(backgroundColor);
		}
	}, [backgroundColor]);
	React.useEffect(() => {
		if (height!==undefined) {
			setThisHeight(height);
		}
	}, [height]);
	React.useEffect(() => {
		if (width!==undefined) {
			setThisWidth(width);
		}
	}, [width]);
	React.useEffect(() => {
		if (lineHeight!==undefined){
			setThisLineHeight(lineHeight);
		}
	}, [lineHeight]);
	React.useEffect(() => {
		if (buttonText!==undefined) {
			setThisButtonText(buttonText);
		}
	}, [buttonText]);
	
	return (
		<Box sx={{ boxShadow: 8, padding: 1.8 }}
		style={{ position:"relative", width:(width>0) ? width : "wrap-content", height:thisHeight,
		minWidth:250, background:thisBackground, alignContent:"center" }}>
			<div style={{ marginBottom:40, fontSize: 30, lineHeight:`${thisLineHeight*7}px` }}>{title}</div><br/>
			<div style={{ marginBottom:10, fontSize: 15, lineHeight:`${thisLineHeight*4}px` }}>{content}</div>
			{ (thisButtonText==="") ? (<div/>)
			: (<Button onClick={onClick} style={{ position:"absolute", bottom:10, right:10, padding:10, background:"black", color:"white"}}>{buttonText}</Button>)
			}
		</Box>
	);
}