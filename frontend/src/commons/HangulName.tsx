import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, Container, Grid, TextField, CircularProgress } from "@mui/material";
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded';
import { UseSelectorHook } from "../_hook/HangulMakerHook";
import Information from "./Information";
import api from "../api/api";
import { black } from "../_css/ReactCSSProperties";

export default function HangulName() {
	// hangul convert toggle
	const [convertToggle, setConvertToggle] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [nameEnglish, setNameEnglish] = React.useState("smith");
	const [nameHangul, setNameHangul] = React.useState("");

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

	const title:string[] = [`What’s your name?`, `Your Hangul name is`];
	const buttonText:string[] = ["Convert to Hangul", "Retry"];

	const changeToggle = async () => {
		if (loading) return;
		const currentToggle = convertToggle;
		if (!currentToggle) {
			setLoading(true);
      const response: any = await axios.get(api.getConvertHangul(nameEnglish.replaceAll(' ', '')), {});
			setNameHangul(response.data);
			setLoading(false);
		}
		else {
			setNameEnglish("");
			setNameHangul("");
		}
		setConvertToggle(!currentToggle);
	};
	const inputName = (event:any) => {
		setNameEnglish(event.target.value);
	}

	const tts = (text:string)=>{
    const msg = new SpeechSynthesisUtterance();
    msg.lang = 'ko';
    msg.text = text;
    window.speechSynthesis.speak(msg);
	}
	
	return (
    <Container style={{ marginTop: 0, marginBottom: 50 }}>
      <Box
        sx={{
          minHeight: 300,
          borderRadius: 10,
          padding: 2,
          background: '#f2e4d8;',
          textAlign: 'center',
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column">
        {convertToggle ? (
          <Information
            title={title[1]} height={ 305 }
            buttonText={buttonText[1]}
            backgroundColor="white"
            content={
              <>
                <Container style={{ color: 'blue', fontSize: 40, marginBottom:50, lineHeight:1 }}>{nameHangul}</Container>
                <Button onClick={() => tts(nameHangul)} style={{ color: black.toString() }}>
                  <VolumeDownRoundedIcon fontSize="large"/>
                </Button>
              </>
            }
            onClick={changeToggle}
          />
        ) : loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <Information
            title={title[0]} height={ 305 }
            buttonText={buttonText[0]}
            backgroundColor="white"
            content={
              <TextField
                placeholder="Write your name"
                onChange={(event: any) => {
                  inputName(event);
                }}
              />
            }
            onClick={changeToggle}
          />
        )}
      </Box>
      {/* <Box sx={{ borderRadius: "5%", padding: 2, background: "white", textAlign:"center"}}
			display="flex" justifyContent="center" alignItems="center"
			flexDirection="column">	
				{(!isLogin) ? (<Link to="/login" style={{ padding: 10, marginTop:50, background: "yellow", color: "black" }}>Get started</Link>)
					:
					(<Grid container style={{ marginTop:50 }}>
						<Grid item xs={6}><Link to="/composehangul" style={{ textDecoration: 'none', padding: 10, background: "yellow", color: "black" }}>Created</Link></Grid>
						<Grid item xs={6}><Link to="/nftlist" style={{ textDecoration: 'none', padding:10, background:"yellow", color:"black"}}>Explore</Link></Grid>
					</Grid>
					)}
			</Box> */}
    </Container>
  );
}