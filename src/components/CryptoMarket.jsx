import {useEffect, useState} from "react";
import CoinCard from "./CoinCard.jsx";
import FavoriteCoinList from "./FavoriteCoinList.jsx";
import TopTenList from "./TopTenList.jsx";

function CryptoMarket() {

    const [coins, setcoin] = useState([]);
    const [favoriteCoin, setFavoriteCoin] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleFavoriteCoin = (coin) => {
        const isFavorite = favoriteCoin.some(fav => fav.ID === coin.ID);

        if (isFavorite) {
            const updatedFavs = favoriteCoin.filter(fav => fav.ID !== coin.ID);
            setFavoriteCoin(updatedFavs);
            console.log("Verwijderd uit favorieten:", coin.NAME);
        } else {
            setFavoriteCoin([...favoriteCoin, coin]);
            console.log("Toegevoegd aan favorieten:", coin.NAME);
        }
    };

    useEffect(() => {
        fetch("https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100")
            .then(httpResponse => httpResponse.json())
            .then(jsonResponse => {
                setcoin(jsonResponse.Data.LIST)
            })
    }, []);

    const filteredCoins = coins.filter((coin) =>
        coin.NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.SYMBOL.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <section>
                <FavoriteCoinList FavoriteCoin={favoriteCoin}></FavoriteCoinList>
                <TopTenList coins={coins} />
                <div className={"CryptoOverviewContainers"}></div>
            </section>
            <div className={"search-bar-container"}>
                <input className={"Search-Bar"} type="text" placeholder="Zoek coin op naam of symbool..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>


            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Change24%</th>
                    <th>Market Cap</th>
                    <th>Volume(24)</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    filteredCoins.map((coin) => (
                        <CoinCard key={coin.ID} coin={coin} toggleFavCoin={toggleFavoriteCoin} favoriteList={favoriteCoin} />
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default CryptoMarket;
