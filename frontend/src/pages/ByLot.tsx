import React from 'react';
import { Link } from 'react-router-dom';
import Draw from '../components/byLot/Draw';
import Inventory from '../components/byLot/Inventory';

export default function ByLot() {
  return (
    <>
      <Draw />
      <Inventory />
    </>
  );
}
