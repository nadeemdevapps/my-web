import { useSyncExternalStore } from 'react'

import { characters, type Character } from '../content'
import { read, subscribe, write } from './storage'

// Everything the game remembers, all in this browser's localStorage.
const KEY = 'look-out-below:v1'

export type Run = { score: number; at: string; character: string; dodged: number; caught: number }
export type Save = { best: number; runs: Run[]; character: string; plays: number }

const EMPTY: Save = { best: 0, runs: [], character: 'pip', plays: 0 }

let cache: { raw: string; value: Save } | null = null

function snapshot(): Save {
  const value = read<Save>(KEY, EMPTY)
  const raw = JSON.stringify(value)
  if (cache && cache.raw === raw) return cache.value
  const safe: Save = {
    best: Number.isFinite(value.best) ? value.best : 0,
    runs: Array.isArray(value.runs) ? value.runs.slice(0, 10) : [],
    character: typeof value.character === 'string' ? value.character : 'pip',
    plays: Number.isFinite(value.plays) ? value.plays : 0,
  }
  cache = { raw, value: safe }
  return safe
}

export function useSave(): Save {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY)
}

export function recordRun(run: Omit<Run, 'at'>): { isBest: boolean; best: number; unlocked: Character[] } {
  const save = snapshot()
  const isBest = run.score > save.best
  const best = Math.max(save.best, run.score)
  const unlocked = characters.filter((c) => c.unlockAt > save.best && c.unlockAt <= best)
  write(KEY, { ...save, best, plays: save.plays + 1, runs: [{ ...run, at: new Date().toISOString() }, ...save.runs].slice(0, 10) })
  return { isBest, best, unlocked }
}

export function selectCharacter(id: string) {
  write(KEY, { ...snapshot(), character: id })
}

export function clearScores() {
  write(KEY, { ...EMPTY, character: snapshot().character })
}

export function isUnlocked(c: Character, best: number) {
  return best >= c.unlockAt
}

export function currentCharacter(save: Save): Character {
  const c = characters.find((x) => x.id === save.character)
  return c && isUnlocked(c, save.best) ? c : characters[0]
}
