import logo from './logo.svg';
import './App.css';
import { BlockchainProvider } from './context/AppConfig';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { UploadNFT } from './pages/UploadNFT';

function App() {
  return (
    <div className="App">
      <BlockchainProvider>

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/upload" element={<UploadNFT/>} />
      </Routes>
      </BrowserRouter>

      </BlockchainProvider>
    </div>
  );
}

export default App;
