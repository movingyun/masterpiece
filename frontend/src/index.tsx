import { Provider } from 'react-redux';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import App from './App';
import ScrollToTop from "./ScrollToTop";
import store from './_store/store';
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

function getLibrary(provider: any) {
  const library = new Web3Provider(provider, 'any');
  return library;
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const theme = createTheme({
  components: {
    // Name of the component
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
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
              <Route path="nftdetail/:nftAddress" element={<NFTDetail />} />
              <Route path="nftlist" element={<NFTList />} />
              <Route path="signup" element={<Signup />} />
              <Route path="userpage/:walletAddress" element={<UserPage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Provider>
    </Web3ReactProvider>
  </BrowserRouter>
);
