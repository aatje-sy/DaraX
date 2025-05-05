import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CoinChart from '../components/CoinChart';

function CoinDetails() {
    const { symbol } = useParams();
    const [coinMeta, setCoinMeta] = useState(null);
    const [coinStats, setCoinStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const metaRes = await fetch(`https://data-api.coindesk.com/asset/v2/metadata?assets=${symbol}`);
                const metaData = await metaRes.json();

                const assetKey = Object.keys(metaData.Data)[0];
                const assetMeta = metaData.Data[assetKey];

                if (!assetMeta) throw new Error("Geen metadata gevonden");

                const statsRes = await fetch(`https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100`);
                const statsData = await statsRes.json();

                const matchingStat = statsData?.Data?.LIST?.find(c => c.SYMBOL === symbol);

                if (!matchingStat) throw new Error("Geen statistieken gevonden");

                setCoinMeta(assetMeta);
                setCoinStats(matchingStat);
                setLoading(false);
            } catch (err) {
                console.error("Fout bij ophalen:", err.message);
                setError("Kon gegevens niet ophalen: " + err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [symbol]);

    if (loading) return <p>Laden...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={"CoinDetails-Container"}>
            <div className={"Coin-title-container flex"}>
                <img
                    src={coinMeta.LOGO_URL || ""}
                    alt={coinMeta.SYMBOL}
                    style={{ height: "60px", display: coinMeta.LOGO_URL ? "block" : "none" }}
                />
                <h1>{coinMeta.NAME} ({coinMeta.SYMBOL})</h1>
            </div>
            <div className={"Details-Container"}>
                <p><strong>Prijs (USD):</strong> ${parseFloat(coinStats.PRICE_USD).toFixed(2)}</p>
                <p><strong>Verandering (24u):</strong> {parseFloat(coinStats.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD).toFixed(2)}%</p>
                <p><strong>Market Cap:</strong> ${parseFloat(coinStats.CIRCULATING_MKT_CAP_USD).toLocaleString()}</p>
                <p><strong>Volume (24u):</strong> ${parseFloat(coinStats.SPOT_MOVING_24_HOUR_QUOTE_VOLUME_USD).toLocaleString()}</p>

                {coinMeta.details?.website && (
                    <p>
                        <strong>Website:</strong>{" "}
                        <a href={coinMeta.details.website} target="_blank" rel="noreferrer">
                            {coinMeta.details.website}
                        </a>
                    </p>
                )}

                {coinMeta.ASSET_DESCRIPTION_SNIPPET && (
                    <p style={{ marginTop: "1rem" }}>{coinMeta.ASSET_DESCRIPTION_SNIPPET}</p>
                )}
            </div>

            <CoinChart symbol={symbol} />
        </div>
    );
}

export default CoinDetails;
