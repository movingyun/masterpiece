import React from "react";
import { Box, Container, Grid } from "@mui/material";
import CarouselDisplay from "./CarouselDisplay";
import ComposeHangul_01 from "../../video/HangulCompose_01.mp4";
import ComposeHangul_02 from "../../video/HangulCompose_02.mp4";
import ComposeHangul_03 from "../../video/HangulCompose_03.mp4";

export default function AreaTutorial({ height }: any) {
	const [topMargin, setTopMargin] = React.useState(0);
	React.useEffect(() => {
		if (height) {
			const tempMargin = (height > 600) ? height / 2 - 300 : 5;
			setTopMargin(tempMargin);
		}
	}, [height]);
	const [CarouselElements, setCarouselElements] = React.useState<JSX.Element[]>([
		<Container style={{ width: 300, height: 300, background: "red", textAlign: "center" }}>
						<img src="abc" alt="abc"/>
		</Container>,
		<Container style={{ width: 300, height: 300, background: "blue", textAlign: "center" }}>
		<img src="abc" alt="abc"/>
		</Container>,
		<Container style={{ width: 300, height: 300, background: "green", textAlign: "center" }}>
		<img src="abc" alt="abc"/>
	</Container>
	]);
	React.useEffect(() => {
		setCarouselElements([<video autoPlay loop muted width={450} height={450} src={ComposeHangul_01}/>,
			<video autoPlay loop muted width={450} height={450} src={ComposeHangul_02}/>,
			<video autoPlay loop muted width={450} height={450} src={ComposeHangul_03}/>]);
	}, []);
	
	return (
		<Container style={{ marginTop: topMargin}}>
			<Box sx={{ minHeight:300, boxShadow: 8, borderRadius: "5%", padding: 2, background: "white", textAlign:"center"}}
			display="flex" justifyContent="center" alignItems="center"
			flexDirection="column">
				<Container style={{ marginBottom: 50, fontSize: 30 }}>It Takes Only 5-minutes.<br/>Give it a try!</Container>
				<Grid container justifyContent="center" alignItems="center">
					<Grid item xs={12} style={{marginTop:0, textAlign:"center" }}>
						<CarouselDisplay elements={CarouselElements} />
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}