import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AppDispatch } from "../../store"
import { initialCryptoData } from "../../../libs/sample-data";

export interface CryptoData {
  id: string
  name: string
  symbol: string
  image: string
  price: number
  priceChange1h: number
  priceChange24h: number
  priceChange7d: number
  marketCap: number
  volume24h: number
  volumeInCrypto: number
  circulatingSupply: number
  maxSupply: number | null
  sparkline7d: number[]
  lastUpdated: number
}

interface CryptoState {
  data: CryptoData[]
  isLoading: boolean
  error: string | null
  simulationInterval: number | null
}

const initialState: CryptoState = {
  data: initialCryptoData,
  isLoading: false,
  error: null,
  simulationInterval: null,
}

// Helper function to generate random price changes
const generateRandomPriceChange = (min = -2, max = 2) => {
  return Number.parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

// Helper function to update price based on percentage change
const updatePriceByPercentage = (price: number, percentChange: number) => {
  return price * (1 + percentChange / 100)
}

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setSimulationInterval: (state, action: PayloadAction<number | null>) => {
      state.simulationInterval = action.payload
    },
    updateCryptoPrices: (state) => {
      state.data = state.data.map((crypto) => {
        // Generate random price changes
        const priceChange1h = generateRandomPriceChange(-1, 1)
        const priceChange24h = generateRandomPriceChange(-2, 2)
        const volumeChange = generateRandomPriceChange(-5, 5)

        // Update price based on 1h change
        const newPrice = updatePriceByPercentage(crypto.price, priceChange1h)

        // Update volume based on volume change
        const newVolume = updatePriceByPercentage(crypto.volume24h, volumeChange)

        // Update sparkline data by adding new price and removing oldest
        const newSparkline = [...crypto.sparkline7d.slice(1), newPrice]

        return {
          ...crypto,
          price: Number.parseFloat(newPrice.toFixed(2)),
          priceChange1h: Number.parseFloat((crypto.priceChange1h + priceChange1h / 10).toFixed(2)),
          priceChange24h: Number.parseFloat((crypto.priceChange24h + priceChange24h / 24).toFixed(2)),
          volume24h: Number.parseFloat(newVolume.toFixed(2)),
          volumeInCrypto: Number.parseFloat((newVolume / newPrice).toFixed(2)),
          sparkline7d: newSparkline,
          lastUpdated: Date.now(),
        }
      })
    },
  },
})

export const { setSimulationInterval, updateCryptoPrices } = cryptoSlice.actions

// Thunks
export const startWebSocketSimulation = () => (dispatch: AppDispatch) => {
  // Simulate WebSocket connection by updating prices every 2 seconds
  const interval = window.setInterval(() => {
    dispatch(updateCryptoPrices())
  }, 2000)

  dispatch(setSimulationInterval(interval))
}

export const stopWebSocketSimulation = () => (dispatch: AppDispatch, getState: any) => {
  const { simulationInterval } = getState().crypto
  if (simulationInterval) {
    clearInterval(simulationInterval)
    dispatch(setSimulationInterval(null))
  }
}

export default cryptoSlice.reducer
