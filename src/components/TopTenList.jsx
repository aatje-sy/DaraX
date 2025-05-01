import TopTenItem from "./TopTenItem.jsx";

const TopTenList = ({ coins }) => {
    return (
        <div className="CryptoOverviewContainers">
            <h1>Top 10</h1>
            <p>Past 24 hrs</p>
            <ul className="top-ten-list">
                {
                    coins.slice(0, 10).map((coin) => (
                        <TopTenItem key={coin.ID} coin={coin} />
                    ))
                }
            </ul>
        </div>
    );
};

export default TopTenList;
