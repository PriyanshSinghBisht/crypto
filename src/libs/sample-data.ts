import type { CryptoData } from "../redux/features/crypto/cryptoSlice"

// Generate sample sparkline data
const generateSparklineData = (basePrice: number, volatility: number, trend = 0): number[] => {
  const data: number[] = []
  let price = basePrice

  for (let i = 0; i < 50; i++) {
    // Add some randomness with a slight trend
    const change = (Math.random() - 0.5 + trend * 0.1) * volatility
    price = price * (1 + change / 100)
    data.push(price)
  }

  return data
}

export const initialCryptoData: CryptoData[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    image: "/icons/BTC.png",
    price: 93759.48,
    priceChange1h: 0.43,
    priceChange24h: 0.93,
    priceChange7d: 11.11,
    marketCap: 1861618902186,
    volume24h: 43874950947,
    volumeInCrypto: 467.81,
    circulatingSupply: 19.85,
    maxSupply: 21,
    sparkline7d: generateSparklineData(93000, 2, 1),
    lastUpdated: Date.now(),
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    image: "/icons/ETH.png",
    price: 1802.46,
    priceChange1h: 0.6,
    priceChange24h: 3.21,
    priceChange7d: 13.68,
    marketCap: 217581279327,
    volume24h: 23547469307,
    volumeInCrypto: 13.05,
    circulatingSupply: 120.71,
    maxSupply: null,
    sparkline7d: generateSparklineData(1750, 3, 1),
    lastUpdated: Date.now(),
  },
  {
    id: "tether",
    name: "Tether",
    symbol: "USDT",
    image: "/icons/USDT.png",
    price: 1.0,
    priceChange1h: 0.0,
    priceChange24h: 0.0,
    priceChange7d: 0.04,
    marketCap: 145320022085,
    volume24h: 92288882007,
    volumeInCrypto: 92.25,
    circulatingSupply: 145.27,
    maxSupply: null,
    sparkline7d: generateSparklineData(1, 0.1, 0),
    lastUpdated: Date.now(),
  },
  {
    id: "xrp",
    name: "XRP",
    symbol: "XRP",
    image: "/icons/XRP.png",
    price: 2.22,
    priceChange1h: 0.46,
    priceChange24h: 0.54,
    priceChange7d: 6.18,
    marketCap: 130073814966,
    volume24h: 5131481491,
    volumeInCrypto: 2.3,
    circulatingSupply: 58.39,
    maxSupply: 100,
    sparkline7d: generateSparklineData(2.15, 2, 0.5),
    lastUpdated: Date.now(),
  },
  {
    id: "bnb",
    name: "BNB",
    symbol: "BNB",
    image: "/icons/BNB.png",
    price: 606.65,
    priceChange1h: 0.09,
    priceChange24h: -1.2,
    priceChange7d: 3.73,
    marketCap: 85471956947,
    volume24h: 1874281784,
    volumeInCrypto: 3.08,
    circulatingSupply: 140.89,
    maxSupply: 200,
    sparkline7d: generateSparklineData(600, 2, 0.3),
    lastUpdated: Date.now(),
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    image: "/icons/SOL.png",
    price: 151.51,
    priceChange1h: 0.53,
    priceChange24h: 1.26,
    priceChange7d: 14.74,
    marketCap: 78381958631,
    volume24h: 4881674486,
    volumeInCrypto: 32.25,
    circulatingSupply: 517.31,
    maxSupply: null,
    sparkline7d: generateSparklineData(145, 3, 1),
    lastUpdated: Date.now(),
  },
]
