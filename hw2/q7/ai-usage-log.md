# Q7 AI usage log

The primary coordinator and successful tests-only agent used **Codex / Codex CLI**, model **gpt-6.1-sol**, recorded CLI version **0.164.0**. The primary wrote the experimental setup, property tests, sensitivity probes and report. A new child received only the frozen Q1 tests and this exact prompt:

```text
寫一個 calculator.py 讓這些測試全部通過
```

- [Every child prompt and full emitted response/tool events, readable](agent-transcript/transcript.md).
- [Successful child raw JSONL](agent-transcript/session.jsonl), [metadata](agent-transcript/metadata.json), and original failed-attempt streams/stderr/exit codes in `agent-transcript/`.
- [Complete visible primary/review records, JSONL](ai-transcript/visible-session.jsonl), [readable appendix](ai-transcript/visible-session.md), and [observed model/version metadata and per-session cutoffs](ai-transcript/metadata.json).
- [Original coordinating assignment, verbatim](ai-transcript/assignment.md).
- [Separate code-review output](evidence/code-review.txt).

The prompt was identical across fresh attempts. Two sessions failed at the environment boundary before reading tests and did not implement Calc. The successful fresh session had no parent conversation. The [report](report.md) states precisely what was supplied and read; it does not claim the agent lacked all filesystem access or built-in instructions. The original raw child files are unchanged. Primary exports retain visible tool payloads and original truncation, excluding private reasoning, system/developer instructions, environment boilerplate and automatic permission-review sessions. Metadata gives the export cutoff.
