import React from "react";
import { Box, Button } from "@mui/material";
import { yellow } from "../_css/ReactCSSProperties";

export default function Information({ title, content, buttonText, onClick, backgroundColor, height }: any) {
	const [thisBackground, setThisBackground] = React.useState<string>(yellow.toString());
	const [thisHeight, setThisHeight] = React.useState<number>(200);
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
	
	return (
		<Box sx={{ boxShadow: 8, padding: 2 }} style={{ position:"relative", height:thisHeight, minWidth:250, background:thisBackground }}>
			<div style={{ marginBottom:40, fontSize: 30, lineHeight:"35px" }}>{title}</div><br/>
			<div style={{ marginBottom:10, fontSize: 15, lineHeight:"20px" }}>{content}</div>
			<Button onClick={onClick} style={{ position:"absolute", bottom:10, right:10, padding:10, background:"black", color:"white"}}>{buttonText}</Button>
		</Box>
	);
}