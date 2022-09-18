import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import store from './store';
import Main from './pages/Main';
import ByLot from './pages/ByLot';
import ComposeHangul from './pages/ComposeHangul';
import CreateNFT from './pages/CreateNFT';
import DecorateHangul from './pages/DecorateHangul';
import LearnSyllables from './pages/LearnSyllables';
import Login from './pages/Login';
import NFTDetail from './pages/NFTDetail';
import NFTList from './pages/NFTList';
import Signup from './pages/Signup';
import UserPage from './pages/UserPage';
import HangulGame from './pages/HangulGame';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Main />} />
          <Route path="bylot" element={<ByLot />} />
          <Route path="composehangul" element={<ComposeHangul />} />
          <Route path="createnft" element={<CreateNFT />} />
          <Route path="decoratehangul" element={<DecorateHangul />} />
          <Route path="hangulgame" element={<HangulGame />} />
          <Route path="learnsyllables" element={<LearnSyllables />} />
          <Route path="login" element={<Login />} />
          <Route path="nftdetail" element={<NFTDetail />} />
          <Route path="nftlist" element={<NFTList />} />
          <Route path="signup" element={<Signup />} />
          <Route path="userpage" element={<UserPage />} />
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
