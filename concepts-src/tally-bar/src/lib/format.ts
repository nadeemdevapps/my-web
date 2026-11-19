const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 })

export const formatMoney = (value: number) => money.format(value)

export const formatNumber = (value: number) => new Intl.NumberFormat('en-US', { notation: value >= 10000 ? 'compact' : 'standard', maximumFractionDigits: 1 }).format(value)

export const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
