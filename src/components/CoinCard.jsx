import { useNavigate } from 'react-router-dom';

const CoinCard = ({ coin, toggleFavCoin, favoriteList }) => {
    const isFavorite = favoriteList.some(fav => fav.ID === coin.ID);
    const navigate = useNavigate();

    const handleRowClick = () => {
        navigate(`/coin/${coin.SYMBOL}`);
    };

    return (
        <tr onClick={handleRowClick} style={{ cursor: 'pointer' }}>
            <td>{coin.SYMBOL}</td>
            <td>{coin.NAME} ({coin.SYMBOL})</td>
            <td>${parseFloat(coin.PRICE_USD).toFixed(2)}</td>
            <td>{parseFloat(coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD).toFixed(2)}%</td>
            <td>${parseFloat(coin.CIRCULATING_MKT_CAP_USD).toLocaleString()}</td>
            <td>${parseFloat(coin.SPOT_MOVING_24_HOUR_QUOTE_VOLUME_USD).toLocaleString()}</td>
            <td>
                <button onClick={(e) => {e.stopPropagation();
                    toggleFavCoin(coin);}}>
                    {isFavorite ? "💔 Unfavorite" : "❤️ Favorite"}
                </button>
            </td>
        </tr>
    );
};

export default CoinCard;
