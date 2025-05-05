import './styling/style.css';
import Header from "./components/Header.jsx"
import Market from './components/CryptoOverview.jsx';
import CoinDetails from "./components/CoinDetails";

import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<h1>Wallet</h1>} />
                <Route path="/crypto_Overview" element={<Market />} />
                <Route path="/Contact" element={<h1>Contact</h1>} />
                <Route path="/coin/:symbol" element={<CoinDetails />} />
            </Routes>
        </div>
    );
}

export default App;
