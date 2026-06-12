export const DIAGNOSIS_SCHEMA = {
  type: 'object',
  properties: {
    rootCause: { type: 'string', description: 'Concise root cause of the CI failure.' },
    suggestedFix: { type: 'string', description: 'Concrete fix, including a code diff in a ```diff block when applicable.' },
    confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
    files: { type: 'array', items: { type: 'string' }, description: 'Files implicated in the failure.' },
  },
  required: ['rootCause', 'suggestedFix', 'confidence', 'files'],
  additionalProperties: false,
}

export function buildPrompt({ jobName, logs, diff, files }) {
  return [
    'You are naoru, a CI failure diagnostician.',
    'Analyze the failed GitHub Actions job and return a root cause and a concrete suggested fix.',
    'Be specific. Prefer a minimal code diff in the suggestedFix when you can.',
    '',
    `## Failed job\n${jobName}`,
    '',
    `## Changed files\n${(files || []).join('\n') || '(none reported)'}`,
    '',
    `## PR diff\n\`\`\`diff\n${diff || '(no diff available)'}\n\`\`\``,
    '',
    `## Failed job logs (tail)\n\`\`\`\n${logs || '(no logs available)'}\n\`\`\``,
  ].join('\n')
}
