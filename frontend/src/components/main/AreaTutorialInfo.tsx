import React from "react";
import { Box, Container, Grid } from "@mui/material";

export default function AreaTutorialInfo({ focus }:any) {
	const [height, setHeight] = React.useState<any>(window.innerHeight);
	const handleHeight = () => {
		setHeight(window.innerHeight);
	}
	React.useEffect(() => {
		window.addEventListener("resize", handleHeight);
	}, [window.innerHeight]);

	// scrollIntoView
	const focuses: React.MutableRefObject<HTMLDivElement[]> = focus;

	const elements: JSX.Element[][] = [[
		<>
			<div style={{ height: height / 3 }} />
			<div style={{ height: height / 2 }} >
				<div style={{ marginBottom: 50, fontSize: 50 }}>
					| The Most Beautiful
				</div>
				<div style={{ marginBottom: 10, fontSize: 30 }}>
					We provide multiple properties to decorate your own word. 50+ fonts, text animations, and more!
				</div>
			</div>
			{/* <div style={{ marginBottom: 50, fontSize: 50 }}>
				| The Most Beautiful
			</div>
			<div style={{ marginBottom: 10, fontSize: 30 }}>
				We provide multiple properties to decorate your own word. 50+ fonts, text animations, and more!
			</div> */}
		</>,
		<>
			<div style={{ height: height / 3 }} />
			<div style={{ height: height / 2 , padding: 30 }}>첫번째 이미지</div>
			{/* <div style={{ padding: 30 }}>첫번째 이미지</div> */}
		</>
	], [
		<>
			<div style={{ height: height / 3 }} />
			<div style={{ height: height / 2 }} >
			<div style={{ marginBottom: 50, fontSize: 50 }}>
					| The Most Scientific
				</div>
				<div style={{ marginBottom: 10, fontSize: 30 }}>
					Consonants and vowels are assembled in a box to form an word
				</div>
			</div>
			{/* <div style={{ marginBottom: 50, fontSize: 50 }}>
				| The Most Scientific
			</div>
			<div style={{ marginBottom: 10, fontSize: 30 }}>
				Consonants and vowels are assembled in a box to form an word
			</div> */}
		</>,
		<>
		<div style={{ height: height / 3 }} />
		<div style={{ height: height / 2 , padding: 30 }}>두번째 이미지</div>
		{/* <div style={{ padding: 30 }}>두번째 이미지</div> */}
	</>
		]];
	const backgroundColor: string[] = ["white", "gray"];
	const indexArray: number[] = [];
	for (let i = 0; i < elements.length;i++){
		indexArray.push(i);
	}
	return (
		<Container style={{marginTop:20}}>
			{elements.map((element:JSX.Element[], index:number) => (
				<Grid key={`tutorialInfo${indexArray[index]}`} container
				ref={(thisElement:HTMLDivElement) => { focuses.current[index] = thisElement }}
				justifyContent="center" alignItems="center">
					<Grid item xs={6} style={{ height, background: `${backgroundColor[index % 2]}`, textAlign:"center" }}
					justifyContent="center" alignItems="center">
						{element[index % 2]}
					</Grid>
					<Grid item xs={6} style={{ height, background: `${backgroundColor[(index + 1) % 2]}`, textAlign:"center" }}
					justifyContent="center" alignItems="center">
						{element[(index + 1) % 2]}
					</Grid>
				</Grid>
			))}
		</Container>
	);
}