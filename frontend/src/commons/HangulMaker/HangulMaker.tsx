import React from "react";
import { Provider } from 'react-redux';
import hangulMakerStore from '../../_store/HangulMakerStore';
import HangulMakerFML from "./HangulMakerFML";

export default function HangulMaker(){
  return (
    <Provider store={hangulMakerStore}>
      <HangulMakerFML/>
    </Provider>
  );
}