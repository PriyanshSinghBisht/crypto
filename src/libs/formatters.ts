// Format currency with appropriate symbol and abbreviation for large numbers
export function formatCurrency(value: number): string {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
  
    if (value >= 1_000_000_000) {
      return formatter.format(value / 1_000_000_000) + "B"
    } else if (value >= 1_000_000) {
      return formatter.format(value / 1_000_000) + "M"
    } else if (value >= 1_000) {
      return formatter.format(value / 1_000) + "K"
    }
  
    return formatter.format(value)
  }
  
  // Format percentage with appropriate sign
  export function formatPercentage(value: number): string {
    return `${value.toFixed(2)}%`
  }
  
  // Format large numbers with appropriate abbreviation
  export function formatNumber(value: number): string {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(2) + "B"
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(2) + "M"
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(2) + "K"
    }
  
    return value.toFixed(2)
  }
  