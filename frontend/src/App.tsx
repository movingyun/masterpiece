import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Header from './components/header/Header';

// import font
import './App.css';

// 뷰포트 크기를 지정, flex 이용해서 중앙 정렬
const Resolution = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 200px;
  > * {
    max-width: 1190px;
    flex-grow: 1;
  }
`;

function App() {
  const isMain = useSelector((state: any) => state.sale.isMain);

  return (
    <div>
      <Header />
      {isMain ? (
        <div>
          <Outlet />
        </div>
      ) : (
        <Resolution>
          <div>
            <Outlet />
          </div>
        </Resolution>
      )}
    </div>
  );
}

export default App;
