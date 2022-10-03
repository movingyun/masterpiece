import React from "react";
import { Box, Button } from "@mui/material";

export default function Information({ title, content, buttonText, onClick }:any){
	return (
		<Box sx={{ boxShadow: 8, padding:2, background:"#F3E900" }}>
			<div style={{ marginBottom:10, fontSize: 30 }}>{title}</div><br/>
			<div style={{ marginBottom:10, fontSize: 15 }}>{content}</div>
			<Button onClick={onClick} style={{padding:10, background:"black", color:"white"}}>{buttonText}</Button>
		</Box>
	);
}