# Q4 AI usage log

The primary implementation was performed by Codex, model **gpt-6.1-sol**, through the Codex application. The locally available Codex CLI reports **0.164.0** (`../q5/evidence/codex-version.txt`); this is the CLI version, not a claim about the application's build. There was no human-written implementation in this experiment.

The user's verbatim request and all visible primary-session responses, tool calls, and outputs are preserved in the shared appendix [`../q5/evidence/primary-session.jsonl`](../q5/evidence/primary-session.jsonl). Its export is a snapshot through final verification, rather than an export of private reasoning or system instructions. The orchestrator's task is `/home/yuankai/Projects/School/.orch/school-dev-hw2-q45.md`; a verbatim snapshot is [`../q5/evidence/assignment-prompt.txt`](../q5/evidence/assignment-prompt.txt). The task directed me to characterize real code before refactoring, retain actual evidence, and perform review and security checks.

Main recorded steps:

1. Read the assignment, requirements, and shared decisions; verified an isolated worktree and branch.
2. Chose Requests and pinned a historical commit shared with Q5. Inspected digest authentication and relevant upstream tests.
3. Captured 29 golden cases from unchanged source and ran characterization plus upstream digest tests successfully.
4. Replaced duplicate digest closures with one constructor table and closure; reran the same tests successfully and saved the actual source diff.
5. Repeated the experiment from a fresh clone using the submitted patch and reproduction script.
6. Invoked `codex review --base main`; evaluated its findings, simplified the submission, and audited logs and execution locations. Results and complete review output are linked from [review.md](review.md).

No independent implementer was used for Q4. The separate Q5 session is documented in its own usage log. All implementation and reported experimental observations remain AI-assisted; the golden cases were recorded from the original source, not invented outputs.
