import {useEffect, useState} from "react";
import CoinCard from "./CoinCard.jsx";
import FavoriteCoinList from "./FavoriteCoinList.jsx";

function Market() {

    const [coins, setcoin] = useState([]);

    const [favoriteCoin, setFavoriteCoin] = useState([])


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

    return (

        <div>

            <section>

                <FavoriteCoinList FavoriteCoin={favoriteCoin}></FavoriteCoinList>


                <div className={"CryptoOverviewContainers"}>
                    <h1>Top 10</h1>
                    <p>Past 24 hrs</p>
                    <ul>
                        {
                            coins.slice(0, 10).map((coin) => (
                                <li key={coin.ID}>
                                    {coin.NAME} ({coin.SYMBOL}) — ${parseFloat(coin.PRICE_USD).toFixed(2)}
                                </li>
                            ))
                        }
                    </ul>
                </div>


                <div className={"CryptoOverviewContainers"}>

                </div>

            </section>

            <table>
                <thead>
                    <tr>
                        <th></th>
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
                    coins.map((coin) => (
                        <CoinCard key={coin.ID} coin={coin} toggleFavCoin={toggleFavoriteCoin} favoriteList={favoriteCoin} />

                    ))
                }
                </tbody>
            </table>

        </div>
    )
}

export default Market