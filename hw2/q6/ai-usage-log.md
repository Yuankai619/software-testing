# Q6 AI usage log

The delegated reviewer/primary author used **Codex, gpt-6.1-sol**, with recorded CLI version **0.164.0**. The separate coding agent used **Codex CLI 0.164.0**, model **gpt-6.1-sol**, fresh session `01a1789e-5c60-7a30-ad1d-76609a6da601`, continued only by its explicit ID. These are separate roles, not human and AI roles. The [narrative](narrative.md) discloses the literal-human-review limitation and every observed unasked decision.

- **Every coding-agent prompt verbatim and full emitted responses/tool events:** [readable transcript](agent-transcript/transcript.md), [complete concatenated original JSONL](agent-transcript/session.jsonl); per-invocation JSONL, prompts, stderr and [launch arguments](agent-transcript/launches.jsonl) are retained in that directory.
- **Primary/reviewer prompts, complete visible responses, tool calls and results:** [raw appendix](ai-transcript/visible-session.jsonl), [readable appendix](ai-transcript/visible-session.md). This includes the coordinating session and persisted final-review records.
- **Observed model/version metadata and snapshot cutoffs:** [metadata](ai-transcript/metadata.json).
- **Original assignment:** [verbatim snapshot](ai-transcript/assignment.md).
- **Review:** [contemporaneous notes](review-notes.md) and [final code-review output](evidence/code-review.txt).

Startup failures and unsuccessful retries remain in the records; none is counted as a red test or successful implementation. Original visible tool truncation is preserved. Exports exclude private reasoning, system/developer instructions, environment boilerplate, and automatic permission-review sessions. Snapshot boundaries are explicit; the completed experiment's original raw child streams are unchanged.
