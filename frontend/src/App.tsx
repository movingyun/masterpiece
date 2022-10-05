import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
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
  const isLogin = useSelector((state: any) => state.user.isLogin);

  return (
    <div>
      {!isLogin && <Navigate to="/" replace />}
      <Header />
      <Resolution>
        <div>
          <Outlet />
        </div>
      </Resolution>
    </div>
  );
}

export default App;
