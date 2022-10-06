import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Chip, Container, Grid } from "@mui/material";
import api from "../../api/api";
import { UseSelectorHook } from "../../_hook/HangulMakerHook";
import CarouselDisplay from "./CarouselDisplay";
import { fetchAllNFT } from "../../_slice/NFTSlice";

export default function AreaExample({ height }: any) {
	// login 판단
	const walletAddress = UseSelectorHook(state => state.user.currentUser.wallet_address);
	const [isLogin, setIsLogin] = React.useState(false);
	React.useEffect(() => {
		if (walletAddress.charAt(0) === '0') {
			setIsLogin(true);
		}
		else {
			setIsLogin(false);
		}
	}, [walletAddress]);

	const [topMargin, setTopMargin] = React.useState(0);
	React.useEffect(() => {
		if (height) {
			const tempMargin = (height > 600) ? height / 2 - 300 : 5;
			setTopMargin(tempMargin);
		}
	}, [height]);
	const [NFTList, setNFTList] = React.useState();
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
		async function fetchNFTData() {
			const response: any = await axios.get(api.fetchAllNFT(), {});
			const randomElements: JSX.Element[] = [];

			// temp color
			const colors: string[] = ["lightblue", "red", "green", "cyan", "pink"];
			for (let i = 0; i < 5; i++){
				const randomIndex = Math.floor(Math.random() * (response.data.length));
				randomElements.push(
					<video autoPlay loop muted src={response.data[randomIndex].imgUrl}
					width={300} height={300}/>
				);
			}
			setCarouselElements(randomElements);
			setNFTList(response.data);
		}
		fetchNFTData();
	}, []);
	
	return (
		<Container style={{ marginTop: topMargin }}>
			<Box sx={{ minHeight:300, boxShadow: 8, borderRadius: "5%", padding: 2, background: "white", textAlign:"center"}}
			display="flex" justifyContent="center" alignItems="center"
			flexDirection="column">
				<Container style={{ marginBottom: 50, fontSize: 30 }}>It Takes Only 5-minutes.<br/>Give it a try!</Container>
				{(!isLogin) ? (<Link to="/login" style={{ padding: 10, background: "yellow", color: "black" }}>Get started</Link>)
					:
					(<Grid container>
						<Grid item xs={6}><Link to="/composehangul" style={{ padding: 10, background: "yellow", color: "black" }}>Create</Link></Grid>
						<Grid item xs={6}><Link to="/learnsyllables" style={{padding:10, background:"yellow", color:"black"}}>Explore</Link></Grid>
					</Grid>
					)}
				<Grid container justifyContent="center" alignItems="center">
					<Grid item xs={12} style={{marginTop:30, textAlign:"center"}}>
						<CarouselDisplay elements={CarouselElements} />
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}