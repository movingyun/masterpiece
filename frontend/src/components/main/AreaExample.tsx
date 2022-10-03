import React from "react";
import { Link } from 'react-router-dom';
import { Box, Button, Container, Grid } from "@mui/material";
import { UseSelectorHook } from "../../_hook/HangulMakerHook";

export default function AreaExample() {
	const walletAddress = UseSelectorHook(state => state.user.currentUser.wallet_address);
	const [isLogin, setIsLogin] = React.useState(false);
	React.useEffect(() => {
		console.log(walletAddress);
		if (walletAddress.charAt(0) === '0') {
			setIsLogin(true);
			console.log(walletAddress);
		}
		else {
			setIsLogin(false);
			console.log(walletAddress);
		}
  }, [walletAddress]);
	return (
		<Container style={{marginTop:"50%"}}>
			<Box sx={{ minHeight:300, boxShadow: 8, borderRadius: "10%", padding: 2, background: "white", textAlign:"center"}}
			display="flex" justifyContent="center" alignItems="center"
			flexDirection="column">
				<Container style={{ marginBottom: 100, fontSize: 30 }}>It Takes Only 5-minutes.<br/>Give it a try!</Container>
				{(!isLogin) ? (<Link to="/login" style={{ padding: 10, background: "yellow", color: "black" }}>Get started</Link>)
					:
					(<Grid container>
						<Grid item xs={6}><Link to="/composehangul" style={{ padding: 10, background: "yellow", color: "black" }}>Created</Link></Grid>
						<Grid item xs={6}><Link to="/learnsyllables" style={{padding:10, background:"yellow", color:"black"}}>Explore</Link></Grid>
					</Grid>
				)}
				<Container style={{marginTop:30}}>
					<Box sx={{ width: 200, height: 200, background:"blue", textAlign: "center" }}
					display="flex" justifyContent="center" alignItems="center">
						NFT예시
					</Box>
				</Container>
			</Box>
		</Container>
	);
}