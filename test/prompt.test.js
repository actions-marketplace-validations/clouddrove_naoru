import { describe, it, expect } from 'vitest'
import { buildPrompt, DIAGNOSIS_SCHEMA } from '../src/prompt.js'

describe('buildPrompt', () => {
  it('includes job name, logs, and diff', () => {
    const p = buildPrompt({ jobName: 'build', logs: 'TypeError: x', diff: '- a\n+ b', files: ['src/a.ts'] })
    expect(p).toContain('build')
    expect(p).toContain('TypeError: x')
    expect(p).toContain('+ b')
    expect(p).toContain('src/a.ts')
  })
})

describe('DIAGNOSIS_SCHEMA', () => {
  it('requires the four fields', () => {
    expect(DIAGNOSIS_SCHEMA.required).toEqual(['rootCause', 'suggestedFix', 'confidence', 'files'])
  })
})
