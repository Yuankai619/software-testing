# AI usage log: Questions 2 and 3

## Tools and scope

The coordinating coding assistant prepared the workflow, injected/reverted controlled faults, collected GitHub evidence, and wrote these reports. Its task was the user-provided Q2/Q3 assignment, not a blind repair. The independent repair experiment below was a separate Codex CLI process with no parent conversation. Model and version are observed facts, not inferred from a product name.

- Coordinator: OpenAI Codex CLI `0.164.0`, model `gpt-6.1-sol`, session `01a1789d-014d-7501-9cf4-e380e8a6ab67`.
- Independent repair: OpenAI Codex CLI `0.164.0`, model `gpt-6.1-sol`, session `01a178a1-07a4-7752-ac6c-87cd1ee710f1`.
- Model evidence: [selected persisted turn-context metadata](agent-transcript/model-context.json).
- Exact invocation, starting commit, clean status, and environment-retry reason: [metadata.json](agent-transcript/metadata.json).
- The original turn failed at the execution-environment boundary; the successful resume reused the same session and prompt without revealing the fault.

## Every explicit prompt to the repair agent, verbatim

Initial prompt ([raw text](agent-transcript/prompt.txt)):

```text
CI is failing. Please make it pass.
```

Resume prompt ([raw text](agent-transcript/resume-prompt.txt)):

```text
CI is failing. Please make it pass.
```

## Complete responses and tool output

- [Initial turn, original JSONL event stream](agent-transcript/repair.jsonl).
- [Initial stderr](agent-transcript/repair.stderr.txt).
- [Resumed turn, original JSONL event stream](agent-transcript/repair-resume.jsonl).
- [Resumed stderr](agent-transcript/repair-resume.stderr.txt).
- [Complete readable transcript of both turns](agent-transcript/repair-response.md), including every response, command, output, exit status, change event, and resulting patch. Started events are represented by their corresponding completed events; the original streams preserve both.
- [Exact repair patch](agent-transcript/repair.diff).

The agent repaired source, not tests. The evidence includes its inability to act in the first turn; that turn is not presented as a successful repair.

## Required code review

OpenAI Codex CLI `0.164.0`, model `gpt-6.1-sol`, reviewed head `91febef` against `main` with `codex review --base main`. There was no custom prompt. The CLI-generated review prompt, verbatim ([raw text](agent-transcript/review-prompt.txt)):

```text
Review the code changes against the base branch 'main'. The merge base commit for this comparison is a4ef434976fedbd87dfccd2055956c440e78bbca. Run `git diff a4ef434976fedbd87dfccd2055956c440e78bbca` to inspect the changes relative to main. Provide prioritized, actionable findings.
```

The review returned no findings and judged the patch correct. No findings needed acceptance or rejection. [Complete CLI output](agent-transcript/review.txt) includes its commands, outputs, and final response; [original completed review events](agent-transcript/review-events.jsonl) preserve the generated prompt, tool outputs, and structured judgment. Private reasoning/system context is omitted. [Review metadata](agent-transcript/review-metadata.json) records the model, version, base, and head.

A later coordinator check found that the generic `coverage.xml` ignore pattern also hid the downloaded evidence file. The report artifact was explicitly staged; this did not change the workflow, tests, calculator, or verification settings.

## Coordination assignment

The user's direct instruction (verbatim):

```text
讀並執行 /home/yuankai/Projects/School/.orch/school-dev-hw2-q23.md  （回報：/home/yuankai/Projects/Corvo/.orch/kit/skills/orch/scripts/report.sh <kind> "<白話一句>" --card K5；進度檔寫在你自己的 worktree：/home/yuankai/.herdr/worktrees/software-testing/hw2-q23/.orch/status.md）
```

The referenced assignment and common rules are preserved verbatim in [coordination-assignment.md](agent-transcript/coordination-assignment.md) and [common-rules.md](agent-transcript/common-rules.md). These were supplied only to the coordinator, not to the independent repair session. This appendix contains the complete emitted repair/review responses; it does not claim to export the coordinating assistant's private internal reasoning or platform system instructions.

The coordinator's [raw visible transcript](agent-transcript/coordinator.jsonl) and [readable visible transcript](agent-transcript/coordinator-response.md) capture the direct user prompt, emitted messages, commands, and tool output through the final evidence audit. Platform/developer instructions, environment boilerplate, and private reasoning are excluded. The snapshot ends before the final handoff commit; later commit/CI results are recorded in the worktree status file and final handoff.
