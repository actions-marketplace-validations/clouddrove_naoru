import { describe, it, expect } from 'vitest'
import { resolveProvider } from '../src/providers/index.js'

describe('resolveProvider', () => {
  it('defaults anthropic with claude model', () => {
    const r = resolveProvider({ provider: 'anthropic', apiKey: 'k' })
    expect(r.kind).toBe('anthropic')
    expect(r.model).toMatch(/claude/)
  })
  it('maps openrouter to its base url', () => {
    const r = resolveProvider({ provider: 'openrouter', apiKey: 'k' })
    expect(r.kind).toBe('openai')
    expect(r.baseURL).toBe('https://openrouter.ai/api/v1')
  })
  it('maps xai to grok endpoint', () => {
    expect(resolveProvider({ provider: 'xai', apiKey: 'k' }).baseURL).toBe('https://api.x.ai/v1')
  })
  it('requires base-url for custom provider', () => {
    expect(() => resolveProvider({ provider: 'custom', apiKey: 'k' })).toThrow(/base-url/)
  })
  it('honors explicit model override', () => {
    expect(resolveProvider({ provider: 'openai', apiKey: 'k', model: 'gpt-4o-mini' }).model).toBe('gpt-4o-mini')
  })
})
