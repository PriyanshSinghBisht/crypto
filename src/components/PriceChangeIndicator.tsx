import { ArrowDown, ArrowUp } from "lucide-react"
import { formatPercentage } from "../libs/formatters"

interface PriceChangeIndicatorProps {
    value: number
}

export default function PriceChangeIndicator({ value }: PriceChangeIndicatorProps) {
    if (value === 0) {
        return <span className="text-muted-foreground">{formatPercentage(value)}</span>
    }

    return (
        <div className={`flex items-center justify-end ${value > 0 ? "text-green-500" : "text-red-500"}`}>
            {value > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            {formatPercentage(Math.abs(value))}
        </div>
    )
}
