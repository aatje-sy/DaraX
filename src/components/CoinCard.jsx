import { Link } from 'react-router-dom';

const CoinCard = ({ coin, toggleFavCoin, favoriteList }) => {
    const isFavorite = favoriteList.some(fav => fav.ID === coin.ID);

    return (
        <tr key={coin.ID}>
            <td></td>
            <td>{coin.SYMBOL}</td>
            <td>{coin.NAME} {coin.symbol}</td>
            <td>${parseFloat(coin.PRICE_USD).toFixed(2)}</td>
            <td>{parseFloat(coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD).toFixed(2)}%</td>
            <td>${parseFloat(coin.CIRCULATING_MKT_CAP_USD).toLocaleString()}</td>
            <td>${parseFloat(coin.SPOT_MOVING_24_HOUR_QUOTE_VOLUME_USD).toLocaleString()}</td>
            <td>
                <button onClick={() => toggleFavCoin(coin)}>
                    {isFavorite ? "💔 Unfavorite" : "❤️ Favorite"}
                </button>
            </td>
        </tr>
    );
};

export default CoinCard;
