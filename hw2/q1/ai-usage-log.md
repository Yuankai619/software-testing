# Q1 AI usage log

Q1 was implemented by **Codex, model gpt-6.1-sol**, using the Codex application; the recorded CLI version is **0.164.0**, not a separately verified application build. The primary session is `01a17895-74f1-7870-b6d5-c8742f65b54e`. Its tests, implementation, evidence and narrative are AI-authored. The supplied PDF's requirement to do Q1 without an AI coding agent is **not satisfied**; see [the narrative disclosure](narrative.md).

- [Verbatim user prompts, complete visible assistant responses, tool calls and results (JSONL)](ai-transcript/visible-session.jsonl).
- [Readable full visible-session appendix](ai-transcript/visible-session.md).
- [CLI version, model metadata and per-session capture cutoffs](ai-transcript/metadata.json).
- [Original assignment supplied through the user's referenced file](ai-transcript/assignment.md).

The export also retains the persisted review-session visible records (`01a17898-f275-75c1-9074-a447093bfbc1`). Its separate model field is not present in that record; the primary metadata establishes the implementation model. No different reviewer model is inferred. The primary transcript records the exact `codex review --base main` invocation and returned output. This is an export of visible records, excluding private reasoning, system/developer instructions, environment boilerplate, and automatic permission reviews. Any original tool-output truncation is preserved. The original session completed before this retrospective export; metadata records its final timestamp.
