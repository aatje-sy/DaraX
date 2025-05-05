import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import coinGeckoIds from "../coinGeckoIds";

function CoinChart({ symbol }) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const geckoId = coinGeckoIds[symbol];
        if (!geckoId) {
            setError("Geen mapping voor CoinGecko ID");
            return;
        }

        const fetchChartData = async () => {
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/${geckoId}/market_chart?vs_currency=usd&days=30`);
                const json = await res.json();

                if (!json.prices) throw new Error("Geen prijsdata beschikbaar");

                const formatted = json.prices.map(([ts, price]) => ({
                    date: new Date(ts).toLocaleDateString(),
                    price: parseFloat(price.toFixed(2)),
                }));

                setData(formatted);
            } catch (err) {
                setError("Kon prijsdata niet ophalen");
                console.error(err.message);
            }
        };

        fetchChartData();
    }, [symbol]);

    if (error) return <p>{error}</p>;
    if (data.length === 0) return <p>Grafiek wordt geladen...</p>;

    return (
        <div style={{ width: "100%", marginTop: "2rem" }}>
            <h2>Prijsverloop (30 dagen)</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid vertical={false} stroke="#ccc" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#00c853" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CoinChart;
