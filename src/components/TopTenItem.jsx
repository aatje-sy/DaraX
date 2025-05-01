// TopTenItem.jsx
const TopTenItem = ({ coin }) => {
    const price = parseFloat(coin.PRICE_USD).toFixed(2);
    const change = parseFloat(coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD).toFixed(2);
    const isPositive = change >= 0;

    return (
        <li
            className="flex justify-between items-center p-2 bg-white rounded shadow hover:bg-gray-100 transition"
        >
            <div>
                <strong>{coin.NAME}</strong> ({coin.SYMBOL})
            </div>
            <div className="flex items-center gap-3">
                <span>${price}</span>
                <span className={isPositive ? "text-green-600" : "text-red-500"}>
                    {isPositive ? "🔺" : "🔻"} {change}%
                </span>
            </div>
        </li>
    );
};

export default TopTenItem;
e