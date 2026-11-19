const fmt = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })
export const money = (n: number) => fmt.format(n).replace(/\.00$/, '')
