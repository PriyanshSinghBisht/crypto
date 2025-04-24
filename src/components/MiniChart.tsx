"use client"

import { useRef, useEffect } from "react"

interface MiniChartProps {
    data: number[]
}

export default function MiniChart({ data }: MiniChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current || !data.length) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Set chart dimensions
        const width = canvas.width
        const height = canvas.height

        // Find min and max values for scaling
        const minValue = Math.min(...data)
        const maxValue = Math.max(...data)
        const range = maxValue - minValue

        // Draw the line
        ctx.beginPath()
        ctx.strokeStyle = data[0] < data[data.length - 1] ? "#10b981" : "#ef4444"
        ctx.lineWidth = 1.5

        // Move to the first point
        const xStep = width / (data.length - 1)

        data.forEach((value, index) => {
            // Scale the y value to fit in the canvas
            const y = height - ((value - minValue) / range) * height
            const x = index * xStep

            if (index === 0) {
                ctx.moveTo(x, y)
            } else {
                ctx.lineTo(x, y)
            }
        })

        ctx.stroke()
    }, [data])

    return <canvas ref={canvasRef} width={120} height={40} className="inline-block" />
}
