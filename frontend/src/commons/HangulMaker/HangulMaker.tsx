import React from "react";
import HangulMakerFML from "./HangulMakerFML";

interface TestType {
  test: boolean;
}
export default function HangulMaker({ test }:TestType){
  return (
    <HangulMakerFML test={test}/>
  );
}