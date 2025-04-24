"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Star } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { formatCurrency, formatNumber } from "../libs/formatters"
import { cryptoSelector } from "../redux/features/crypto/cryptoSelectors"
import { startWebSocketSimulation, stopWebSocketSimulation } from "../redux/features/crypto/cryptoSlice"
import PriceChangeIndicator from "./PriceChangeIndicator"
import MiniChart from "./MiniChart"

export default function CryptoTable({ filter }: { filter: string }) {

    const dispatch = useDispatch()
    const cryptos = useSelector(cryptoSelector(filter))
    const savedCryptos = useSelector((state: any) => state.localStorage.data);

    const handleAdd = (cryptoId: string) => {
        dispatch({
            type: "localStorage/addData",
            payload: cryptoId,
        })
    }

    const handleRemove = (cryptoId: string) => {
        dispatch({
            type: "localStorage/removeData",
            payload: cryptoId,
        })
    }

    useEffect(() => {
        // Start the WebSocket simulation when component mounts
        startWebSocketSimulation()(dispatch);

        // Clean up the interval when component unmounts
        return () => {
            dispatch(stopWebSocketSimulation() as any);
        }
    }, [dispatch])

    return (
        <div className="overflow-x-auto rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[40px]"></TableHead>
                        <TableHead className="w-[40px]">#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">1h %</TableHead>
                        <TableHead className="text-right">24h %</TableHead>
                        <TableHead className="text-right">7d %</TableHead>
                        <TableHead className="text-right">
                            <div className="flex items-center justify-end">
                                Market Cap
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="ml-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-muted-foreground"
                                            >
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="M12 16v-4"></path>
                                                <path d="M12 8h.01"></path>
                                            </svg>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="w-[200px]">Market Cap = Current Price x Circulating Supply</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </TableHead>
                        <TableHead className="text-right">
                            <div className="flex items-center justify-end">
                                Volume(24h)
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="ml-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-muted-foreground"
                                            >
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="M12 16v-4"></path>
                                                <path d="M12 8h.01"></path>
                                            </svg>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="w-[200px]">
                                                A measure of how much of a cryptocurrency was traded in the last 24 hours.
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </TableHead>
                        <TableHead className="text-right">
                            <div className="flex items-center justify-end">
                                Circulating Supply
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="ml-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-muted-foreground"
                                            >
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="M12 16v-4"></path>
                                                <path d="M12 8h.01"></path>
                                            </svg>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="w-[200px]">
                                                The amount of coins that are circulating in the market and are in public hands.
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </TableHead>
                        <TableHead className="text-right">Last 7 Days</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cryptos.map((crypto, index) => (filter == "saved" && !savedCryptos.includes(crypto.id)) ? null : (
                        <TableRow key={crypto.id}>
                            <TableCell className="font-medium">
                                <button className="text-muted-foreground hover:text-foreground"
                                    onClick={() => savedCryptos.includes(crypto.id) ? handleRemove(crypto.id) : handleAdd(crypto.id)}
                                >
                                    <Star size={18} fill={savedCryptos.includes(crypto.id) ? "yellow" : "none"}
                                    />
                                </button>
                            </TableCell>
                            <TableCell className="font-medium">
                                <span>{index + 1}</span>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 relative">
                                        <img
                                            src={crypto.image || "/placeholder.svg"}
                                            alt={crypto.name}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-medium">{crypto.name}</div>
                                        <div className="text-muted-foreground text-sm">{crypto.symbol}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">{formatCurrency(crypto.price)}</TableCell>
                            <TableCell className="text-right">
                                <PriceChangeIndicator value={crypto.priceChange1h} />
                            </TableCell>
                            <TableCell className="text-right">
                                <PriceChangeIndicator value={crypto.priceChange24h} />
                            </TableCell>
                            <TableCell className="text-right">
                                <PriceChangeIndicator value={crypto.priceChange7d} />
                            </TableCell>
                            <TableCell className="text-right">{formatCurrency(crypto.marketCap)}</TableCell>
                            <TableCell className="text-right">
                                <div>{formatCurrency(crypto.volume24h)}</div>
                                <div className="text-sm text-muted-foreground">
                                    {formatNumber(crypto.volumeInCrypto)} {crypto.symbol}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex flex-col items-center justify-end text-right">
                                    <div>
                                        {formatNumber(crypto.circulatingSupply)} {crypto.symbol}
                                    </div>
                                    {crypto.maxSupply && (
                                        <div className="ml-2 w-24">
                                            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary rounded-full"
                                                    style={{
                                                        width: `${(crypto.circulatingSupply / crypto.maxSupply) * 100}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <MiniChart data={crypto.sparkline7d} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
