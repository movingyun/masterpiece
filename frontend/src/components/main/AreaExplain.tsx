import React from "react";
import { Container, Grid } from "@mui/material";
import Information from "../../commons/Information";

export default function AreaExplain({ focus }: any) {
	// scrollIntoView
	const focuses: React.MutableRefObject<HTMLDivElement[]> = focus;

	const titles: string[] = ["Learn the Principal of Hangul", "Have fun decorating Hangul words"];
	const contents: string[] = ["Don’t be nervous! We’ll give step by step guide toward the basics on how the Hangul is assembled to become Korean word.",
		"We provide various effects to decorate your Hangul."];
	const buttonTexts: string[] = ["More Info >>", "More Info >>"];
	const indexArray: number[] = [];
	for (let i = 0; i < titles.length; i++){
		indexArray.push(i);
	}
	return (
		<Container>
			<div style={{ margin: 30, fontSize: 50, lineHeight:"60px" }}>Hangul is the most scientfic, beautiful language on Earth</div>
			<Grid container>
				{titles.map((title: string, index: number) => (
					<Grid key={`Information${title}${indexArray[index]}`} item xs={6}
					style={{position:"relative", padding:10 }}>
						<Container style={{
							paddingTop: 15, paddingBottom: 0, paddingLeft: 15, paddingRight: 0,
							marginBottom:100,
							position: "relative", background: "black",
							height:300,
						}}>
							<Information title={title} content={contents[index]} buttonText={buttonTexts[index]} onClick={() => { focuses.current[index].scrollIntoView({ behavior: "smooth" }); }} height={ 305 } />
						</Container>
					</Grid>
				))}
			</Grid>
		</Container>
	);
}