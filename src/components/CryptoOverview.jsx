import {useEffect, useState} from "react";
import CoinCard from "./CoinCard.jsx";
import FavoriteCoinList from "./FavoriteCoinList.jsx";

function Market() {

    const [coins, setcoin] = useState([]);

    const [favoriteCoin, setFavoriteCoin] = useState([])


   /* const addFavoriteCoin = (coin) => {
        const favoriteExist = favoriteCoin.some(fav => fav === coin)

        if (!favoriteExist) {
            const newFavCoin = [...favoriteCoin, coin];
            setFavoriteCoin(newFavCoin);
            console.log(favoriteCoin);
        }
    }*/

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
                            <li>

                            </li>
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
                        <CoinCard key={coin.ID} coin={coin} />

                    ))
                }
                </tbody>
            </table>

        </div>
    )
}

export default Market