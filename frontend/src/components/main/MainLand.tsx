import React from "react";
import { Container, Paper, Button } from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import AreaExplain from "./AreaExplain";
import Information from "../../commons/Information";

function CarouselItem(element:any, key:string): JSX.Element {
	return (
		<Paper key={ key }>
			{element}

			<Button className="CheckButton">
				Check it out!
			</Button>
		</Paper>
	);
}

export default function MainLand() {
	const items: JSX.Element[] = [<AreaExplain/>, <div>아아</div>];
	const indexArray: number[] = [];
	for (let i = 0; i < items.length; i++){
		indexArray.push(i);
	}
	return (
		<Container>
			<AreaExplain/>
		</Container>
	);
}