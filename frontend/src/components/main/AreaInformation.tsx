import React from "react";
import { Box, Container, Grid } from "@mui/material";
import { defaultBackground } from "../../_css/ReactCSSProperties";
import AreaExample from "./AreaExample";
import AreaTutorial from "./AreaTutorial";

export default function AreaInformation({ focus }:any) {
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
				<div style={{ marginBottom: 10, fontSize: 28, lineHeight:"50px" }}>
					We provide multiple properties to decorate your own word. 50+ fonts, text animations, and more!
				</div>
			</div>
		</>,
		<AreaExample height={height} />
	], [
		<>
			<div style={{ height: height / 3 }} />
			<div style={{ height: height / 2 }} >
			<div style={{ marginBottom: 50, marginRight: 10, fontSize: 50 }}>
					| The Most Scientific
				</div>
				<div style={{ marginBottom: 10, marginRight: 10, fontSize: 28, lineHeight:"50px" }}>
					Consonants and vowels are assembled in a box to form an word
				</div>
			</div>
		</>,
		<AreaTutorial height={height} />
	]];
	const backgroundColor: string[] = ["white", defaultBackground.toString()];
	const indexArray: number[] = [];
	for (let i = 0; i < elements.length;i++){
		indexArray.push(i);
	}
	return (
		<>
			{elements.map((element:JSX.Element[], index:number) => (
				<Grid key={`tutorialInfo${indexArray[index]}`} container columns={40}
				ref={(thisElement:HTMLDivElement) => { focuses.current[index] = thisElement }}
				justifyContent="center" alignItems="center"
				style={{minHeight:600, background:backgroundColor[index]}}>
					<Grid item xs={20} style={{ minHeight:600, minWidth:530, padding:15, height, textAlign:"left" }}
					justifyContent="center" alignItems="center">
						{element[index % 2]}
					</Grid>
					<Grid item xs={1}/>
					<Grid item xs={19} style={{ minHeight:600, minWidth:530, padding:15, height, textAlign:"left" }}
					justifyContent="center" alignItems="center">
						{element[(index + 1) % 2]}
					</Grid>
				</Grid>
			))}
		</>
	);
}