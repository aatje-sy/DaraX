const FavoriteCoinList = ({FavoriteCoin}) => {



    return (

        <div className={"CryptoOverviewContainers"}>
            <h1>Favourites</h1>

            {
                FavoriteCoin.map(favoriteCoin => {
                  return (
                      <span>{favoriteCoin}</span>
                  )
                })
            }
        </div>

    )
}

export default FavoriteCoinList;