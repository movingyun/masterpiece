import React from "react";
import { Container, Paper, Button } from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import AreaInformation from "./AreaInformation";
import Information from "./Information";

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
	const items: JSX.Element[] = [<AreaInformation/>, <div>아아</div>];
	const indexArray: number[] = [];
	for (let i = 0; i < items.length; i++){
		indexArray.push(i);
	}
	return (
		<Container>
			<AreaInformation/>
			{/* <Carousel height={800} fullHeightHover={false}
			indicatorContainerProps={{ style: { marginTop: '50px', textAlign: 'center', verticalAlign: "middle" } }}>
        {items.map((item: JSX.Element, index:number) => (
					CarouselItem(item, items.toString()+indexArray[index].toString())
				))}
      </Carousel> */}
		</Container>
	);
}