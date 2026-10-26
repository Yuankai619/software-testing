# HW2: Calculator TDD and agent experiments

This submission contains Q1–Q7 in Python 3.14, with an integrated six-operation `Calculator`, nine calculator test methods, CI verification, and the original experimental evidence. The [audit checklist](checklist.md) maps the assignment's sentences to files and commits. The [combined printable report](HW2-report.pdf) includes this summary, the checklist, every question's principal narrative/report and AI usage index, the final Calc, and complete authored test listings. Raw machine-readable transcripts and upstream source remain separate linked evidence.

**Unresolved assignment limitations:** the supplied PDF requires Q1 without AI, but Codex wrote the existing Q1 experiment. For Q6 the user delegated the test reviewer role to another Codex session; there is no personal human review or recorded instructor approval of that substitution. These cannot be repaired by repackaging. The reported experiments and Git history are preserved, and no human-versus-AI comparison is claimed. Full details are in the checklist.

## Question 1 — Test-first arithmetic

Starting from an add-only baseline, four separate red/green cycles added subtraction, multiplication, float division, and `ValueError` for division by zero. Negative operands and boundary behavior were specified before implementation. Each test commit precedes its implementation commit; none of the committed tests was subsequently edited. [Narrative and original outputs](../q1/narrative.md) · [AI authorship and recovered records](../q1/ai-usage-log.md).

## Question 2 — Break CI and compare repairs

GitHub Actions tracks source and tests. A subtraction fault was committed, observed red, and manually restored; the same fault was introduced again for a fresh agent given only “CI is failing. Please make it pass.” The agent repaired the source without changing tests. The primary/manual repair was also AI-assisted. All five runs, commits, failures and recoveries are retained. [Report](../q2/report.md) · [AI log](../q2/ai-usage-log.md).

## Question 3 — Coverage and static analysis

The [workflow](../../.github/workflows/calculator.yml) runs unittest with coverage.py **7.17.0**, enforces **100% statement/branch coverage**, exports XML, and runs Ruff **0.17.2**. An unused import demonstrated a lint failure while tests and coverage remained green; removing it restored CI. Final integration covers **19 statements and 6 branch destinations**, with no misses. [Report](../q3/report.md) · [AI log](../q3/ai-usage-log.md) · [configuration](../../pyproject.toml).

## Question 4 — Characterization before refactoring

Requests at `7a13c041dbef42f9f3feb14110f02626f6892e9a` provided the existing large system. Twenty-nine golden digest-authentication cases captured original behavior before duplicate hash closures were replaced with a constructor table and shared closure. All 29 characterization cases and three targeted upstream digest tests passed before and after. [Report and reproduction](../q4/report.md) · [patch](../q4/refactor.patch) · [AI log](../q4/ai-usage-log.md).

## Question 5 — Repair a real exception-serialization fault

Six regression methods exposed Requests' historical `JSONDecodeError` pickling fault, including a broken process pool. A backend reducer delegation repaired it. A separate agent started from the same faulty source, independently wrote a reproducing test first, then made an equivalent repair. Both patches pass the primary tests under standard JSON and simplejson; targeted upstream tests also pass. The primary author had read the issue's suggested solution, as disclosed. [Report and comparison](../q5/report.md) · [primary patch](../q5/my-fix.patch) · [agent patch including its test](../q5/agent-fix.patch) · [AI log](../q5/ai-usage-log.md).

## Question 6 — Agentic TDD for modulo and power

A fresh coding agent and separate Codex reviewer used four red/green cycles with test-only commits before implementation commits. Tests specify Python's signed modulo, `ValueError` for modulo by zero, `power(0, 0) == 1`, float results for negative exponents, and `ValueError` for a zero base with negative exponent. The signed-modulo convention was proposed without asking; the other required choices were explicitly answered before their tests. No implementation-first or committed-test-edit violation was observed. The delegated-review limitation is stated above. [Narrative](../q6/narrative.md) · [review notes](../q6/review-notes.md) · [AI log](../q6/ai-usage-log.md).

## Question 7 — Tests-only reconstruction and properties

A new session received only Q1's test file and produced a general Calc without observed input-specific branches. Both implementations passed nine property methods over 633 deterministic triples. Four deliberate mutants passed Q1 but were rejected by the properties. No real implementation fault was exposed in the sampled domain; sampling is not proof. [Report](../q7/report.md) · [properties](../q7/test_properties.py) · [generated Calc](../q7/agent_calc/calculator.py) · [AI log](../q7/ai-usage-log.md).

## Final Calc and complete test inventory

The authoritative final implementation is [hw2/calc/calculator.py](../calc/calculator.py). All complete authored source/test printouts are in [test-listings.md](test-listings.md) and the PDF. Original supplied starters remain unchanged and are not the final submitted Calc.

| Scope | Authoritative tests / data | Count / role |
| --- | --- | --- |
| Q1 | [test_calculator.py](../calc/test_calculator.py) | 5 unittest methods; unchanged |
| Q6 | [test_calculator_q6.py](../calc/test_calculator_q6.py) | 4 unittest methods; unchanged |
| Q4 | [test_digest_characterization.py](../q4/tests/test_digest_characterization.py), [digest_golden.json](../q4/tests/digest_golden.json) | 29 named golden cases |
| Q5 primary | [test_json_exception_pickle.py](../q5/tests/test_json_exception_pickle.py) | 6 methods, both JSON backends |
| Q5 independent agent | [agent-fix.patch](../q5/agent-fix.patch) | Added parameterized upstream regression: 12 cases |
| Q7 | [test_properties.py](../q7/test_properties.py), [frozen Q1 tests](../q7/evidence/q1_test_calculator.py) | 9 property methods; frozen Q1 suite |
| Q7 sensitivity | [check_sensitivity.py](../q7/evidence/check_sensitivity.py) | Four deliberate mutants; validation probes |
| Targeted upstream | Requests `tests/test_lowlevel.py` / `tests/test_requests.py` at the pinned commit | Source is external; exact selection, setup and results in Q4/Q5 reports |

## Reproduce and inspect verification

From the repository root, using Python 3.14:

```sh
cd hw2/calc
python3 -m unittest -v
cd ../..
python3 -m pip install -r requirements-ci.txt
python3 -m coverage run -m unittest discover -s hw2/calc -v
python3 -m coverage report
python3 -m coverage xml
python3 -m ruff check hw2/calc
python3 -B hw2/q7/test_properties.py --calculator hw2/q7/agent_calc/calculator.py
python3 -B hw2/q7/test_properties.py --calculator hw2/calc/calculator.py
python3 -B hw2/q7/evidence/check_sensitivity.py
```

Q4/Q5 require their pinned external Requests checkout and test environments; use each report's reproduction command. Finalization reran both reproduction scripts in fresh cached clones. Expected original-code failures are part of Q5's successful reproduction, not failures of the repaired submission.

- [All nine integrated Calc tests plus CI-equivalent coverage/Ruff output](all-tests-pass.txt), [HTML](all-tests-pass.html), and [Chrome screenshot](all-tests-pass.png). The screenshot renders captured text; it is not a terminal-emulator recording. The commands use system Python 3.14.4 for `python3 -m unittest -v` and a dedicated Python 3.14.4 environment for the pinned CI tools.
- [Final Q4/Q5/Q7 reproduction output](verification.txt), [independent Git history audit](history-audit.txt), and [final code review](review.txt).
- Latest main run at capture: [40348898585 — success](https://github.com/Yuankai619/software-testing/actions/runs/40348898585), head `6f9eeebf1ed9fca90b25ec863230dc4ae315cdad`. [Actual gh output](main-actions.txt), [structured metadata](main-actions.json), [full job log](main-actions.log). This is main evidence; the final feature-branch CI is checked separately after push and reported at handoff.
- [Graph log](git-log.txt) is the actual `git log --graph --oneline --decorate --all` output at baseline `6f9eeeb`; [full main log](git-log-full.txt) is `git log --stat main` at the same capture. They intentionally precede finalization commits and preserve every experimental commit. No history was rewritten. A snapshot cannot contain the future commit that packages itself.

## AI use inventory

| Question | Tool, model, version | Work performed and complete records |
| --- | --- | --- |
| Q1 | Codex / gpt-6.1-sol; local Codex CLI 0.164.0 | Primary TDD, tests, code, narrative; separate Codex review. [Usage log](../q1/ai-usage-log.md), [visible primary/review records](../q1/ai-transcript/visible-session.jsonl) |
| Q2 | Codex CLI / gpt-6.1-sol / 0.164.0 | Coordinator, blind repair child, review. [Usage log](../q2/ai-usage-log.md); complete coordinator and repair JSONL/readable records linked there |
| Q3 | Codex CLI / gpt-6.1-sol / 0.164.0 | Shared Q2/Q3 coordinator and review; [usage index](../q3/ai-usage-log.md) |
| Q4 | Codex / gpt-6.1-sol; local CLI 0.164.0 | Primary characterization/refactor plus separate review; [usage log](../q4/ai-usage-log.md), shared Q4/Q5 visible primary JSONL |
| Q5 | Codex / gpt-6.1-sol; CLI 0.164.0 | Primary and independent child repair, separate review; [usage log](../q5/ai-usage-log.md). Failed attempt 2 used an unrecorded default model; its identity is not invented |
| Q6 | Codex and Codex CLI / gpt-6.1-sol / 0.164.0 | Delegated reviewer, separate coding agent and final review; [usage log](../q6/ai-usage-log.md), every coding prompt/response plus recovered reviewer records |
| Q7 | Codex and Codex CLI / gpt-6.1-sol / 0.164.0 | Coordinator, fresh tests-only child, property validation, review; [usage log](../q7/ai-usage-log.md) |
| Finalization | Codex / gpt-6.1-sol; CLI 0.164.0 | Audit, disclosure corrections, reruns, screenshots, report assembly and review; [usage log](ai-usage-log.md) |

These versions are observed CLI versions, not inferred application build numbers. Logs retain prompts verbatim and original visible responses/tool results, including original truncation, startup failures and explicit snapshot cutoffs. Private reasoning, platform instructions and credentials are excluded. No unavailable model identity or human participation is invented. The PDF includes usage indexes; full raw transcript appendices are provided as separate files to retain their exact format.
