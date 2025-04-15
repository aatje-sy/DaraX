const FavoriteCoinList = ({ FavoriteCoin }) => {
    return (
        <div className={"CryptoOverviewContainers"}>
            <h1>Favourites</h1>
            <ul>
                {
                    FavoriteCoin.length === 0
                        ? <li>Geen favorieten geselecteerd.</li>
                        : FavoriteCoin.map((coin) => (
                            <li key={coin.ID}>{coin.NAME} ({coin.SYMBOL})</li>
                        ))
                }
            </ul>
        </div>
    );
};

export default FavoriteCoinList;
