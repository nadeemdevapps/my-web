export function formatDate(iso: string) {
  return new Date(iso + (iso.length === 10 ? 'T12:00:00' : '')).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function timeAgo(iso: string) {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)} min ago`
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`
  return `${Math.floor(s / 86400)} d ago`
}
