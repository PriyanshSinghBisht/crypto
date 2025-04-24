import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "../../store";

export const cryptoSelector = (filter: string) => {
  switch (filter) {
    case "topgainer":
      return selectTopGainers
    case "toploser":
      return selectTopLosers
    case "highestvolume":
      return selectHighestVolume
    default:
      return selectAllCryptos
  }
}

// Basic selector to get all crypto data
export const selectCryptoState = (state: RootState) => state.crypto

// Select all cryptos
export const selectAllCryptos = createSelector([selectCryptoState], (cryptoState) => cryptoState.data)

// Select a specific crypto by ID
export const selectCryptoById = createSelector(
  [selectAllCryptos, (_, cryptoId: string) => cryptoId],
  (cryptos, cryptoId) => cryptos.find((crypto) => crypto.id === cryptoId),
)

// Select top gainers (24h)
export const selectTopGainers = createSelector([selectAllCryptos], (cryptos) =>
  [...cryptos].sort((a, b) => b.priceChange24h - a.priceChange24h),
)

// Select top losers (24h)
export const selectTopLosers = createSelector([selectAllCryptos], (cryptos) =>
  [...cryptos].sort((a, b) => a.priceChange24h - b.priceChange24h),
)

// Select highest volume
export const selectHighestVolume = createSelector([selectAllCryptos], (cryptos) =>
  [...cryptos].sort((a, b) => b.volume24h - a.volume24h),
)
