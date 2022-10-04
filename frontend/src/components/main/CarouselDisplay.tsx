import React from "react";
import { Container, Box, Paper, Button } from "@mui/material";
import Carousel from 'react-material-ui-carousel'

function CarouselItem(element:any, key:string): JSX.Element {
	return (
		<Container key={ key }>
			{element}
		</Container>
	);
}

export default function CarouselDisplay({ elements }:any) {
	const items: JSX.Element[] = elements;
	const indexArray: number[] = [];
	for (let i = 0; i < items.length; i++){
		indexArray.push(i);
	}
	return (
		<Carousel fullHeightHover={false}
		indicatorContainerProps={{ style: { marginTop: '50px', textAlign: 'center', verticalAlign: "middle" } }}>
      {items.map((item: JSX.Element, index:number) => (
				CarouselItem(item, items.toString()+indexArray[index].toString())
			))}
    </Carousel>
	);
}