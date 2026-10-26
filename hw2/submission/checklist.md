# HW2 submission audit

Audit baseline: `main` / `6f9eeebf1ed9fca90b25ec863230dc4ae315cdad`.
The requirement quotations below are from [requirement.txt](../requirement.txt).
The supplied [PDF](../CalcTDD%20%28AI%20agent%29.pdf) was also read: it has two materially stronger instructions, recorded at the end. **PASS** means the linked evidence supports the requirement; **DISCLOSED DEVIATION** means it cannot honestly be claimed as satisfied. Historical results are snapshots at the stated commits, not results for every later commit.

| Requirement (original wording) | File / commit evidence | Status |
| --- | --- | --- |
| “You will use test-driven development (TDD) to extend a simple calculator, Calc.” | [Q1 narrative](../q1/narrative.md), [Q6 narrative](../q6/narrative.md); separate test/implementation commits below | PASS |
| “Starter versions in Java, JavaScript, and Python are attached. Full instructions are in the PDF.” | Original `hw2/Calc.*`, `hw2/CalcTest.*`, and PDF retained unchanged; PDF differences below | PASS; PDF reviewed |
| “Question 1: add subtract, multiply, and divide one failing test at a time, and write a narrative of each red-green-refactor cycle.” | [Q1 narrative](../q1/narrative.md); four red/green cycles in `../q1/evidence/`; test methods group related boundary assertions | PASS |
| “Question 6: use an AI coding agent to add modulo and power, again with TDD.” | [Q6 transcript](../q6/agent-transcript/transcript.md), [narrative](../q6/narrative.md) | PASS |
| “The agent writes a failing test first.” | Q6 `243976b`, `ffb1041`, `a5480fe`, `fc7f34e`; [red outputs](../q6/evidence/) | PASS |
| “You review and commit each test before the agent implements it.” | [Reviewer notes](../q6/review-notes.md); test→feat pairs listed below | DISCLOSED DEVIATION: reviewer was Codex, delegated by user; no personal human test review |
| “Your tests must define the results for negative operands, modulo by zero, power(0, 0), and negative exponents before any code is written.” | [Q6 tests](../calc/test_calculator_q6.py); each behavior tested before its implementation. Signed modulo in cycle 1; modulo zero in cycle 2; invalid power in cycle 3; numerical power in cycle 4 | PASS per behavior; tests for all decisions were not committed together before the first modulo implementation |
| “Report every time the agent broke a TDD rule, and every decision it made without asking you.” | [Q6 narrative: Rule violations / Decisions made without asking](../q6/narrative.md); Python signed-modulo convention proposed without asking; other required choices answered before tests | PASS disclosure; reviewer substitution above remains a limitation |
| “Questions 2–5 cover CI, verification tools, refactoring, and fault repair. Questions 2 and 5 now also ask you to compare your work with an agent’s.” | [Q2](../q2/report.md), [Q3](../q3/report.md), [Q4](../q4/report.md), [Q5](../q5/report.md) | PASS; primary work is AI-assisted, not a human-versus-AI experiment |
| “Question 7 checks whether code an agent writes from your tests only works for the test inputs.” | [Q7 report](../q7/report.md), generated Calc and nine property methods | PASS |
| “your tests;” | [README test inventory](README.md), [complete listings](test-listings.md) | PASS |
| “your final Calc;” | [calculator.py](../calc/calculator.py); complete listing in [PDF](HW2-report.pdf) | PASS |
| “your git log;” | [graph](git-log.txt), [main with stats](git-log-full.txt); snapshot scope explicitly stated in README | PASS |
| “a screenshot showing that all tests pass;” | [real output PNG](all-tests-pass.png), [raw output](all-tests-pass.txt), [capture HTML](all-tests-pass.html) | PASS for complete final Calc suite plus CI coverage/Ruff; other experiments have separate logs |
| “your narratives;” | Q1/Q6 narratives and Q2/Q3/Q4/Q5/Q7 reports, linked in README and included in PDF | PASS |
| “an AI usage log for Question 2-5 where you used AI, with every prompt verbatim and the agent’s full responses.” | [AI inventory](README.md); Q2/Q3 shared usage log, Q4 and Q5 logs and raw transcripts | PASS; recorded tool truncation and snapshot boundaries disclosed |
| “Calc currently implements one function: it adds two integers.” | Add-only baseline `8a905ca`; original starter already had extra methods, so a fresh add-only Calc was committed | PASS |
| “Use test-driven design to add additional functionality to subtract two integers, multiply two integers, and divide two integers.” | [Q1 tests](../calc/test_calculator.py); `4a37dda`→`ceedfb9`, `bff3221`→`b97df3d`, `00acc47`→`d42eac3`, `8a14507`→`82ba76a` | PASS |
| “First, create a failing test for one of the new functionalities, modify the class until the test passes, and perform any necessary refactoring.” | Four genuine red and green outputs and matching commits in Q1; no unnecessary refactor introduced | PASS |
| “Repeat until all required functionality has been added to your latest version of Calc and all tests pass.” | [final Calc](../calc/calculator.py), 9 final Calc methods pass | PASS |
| “Remember that in TDD, the tests determine the requirements.” | Q1 and Q6 contracts expressed in test-only commits before implementations | PASS |
| “Before modifying the software, you must encode decisions such as whether the division method returns an integer or a floating point number in automated tests.” | `00acc47` asserts float before `d42eac3`; zero exception test `8a14507` before guard `82ba76a` | PASS |
| “Submit printouts of all tests, your final version of Calc, and a screenshot showing that all tests pass.” | [test listings](test-listings.md), PDF, screenshot, final Calc links | PASS |
| “Most importantly, include a narrative describing each TDD test created, the changes needed to make it pass, and any necessary refactoring.” | [Q1 narrative](../q1/narrative.md) covers all four cycles and reasons no refactor was needed | PASS |
| “You can use any programming language to develop Calc. Please find attached Java, JS, and Python Calc implementations.” | Python 3.14.4 / unittest, originals retained | PASS |
| “You can use a continuous integration setup in GitHub.” | [workflow](../../.github/workflows/calculator.yml); [main run evidence](main-actions.txt) | PASS |
| “Include version control for both source code and tests and populate both with a simple example.” | Source/test tracked since `8a905ca`; workflow `cf50171` | PASS |
| “Experiment with ‘breaking the build’ by either introducing a fault into the source code or adding a failing test case. Restore the build.” | `b51677c` red run 40340302423; `4fe8364` green run 40340394341 | PASS |
| “Then break the build again in the same way and ask an AI coding agent to make it pass, without telling it what you changed.” | `5e42bbc`, red run 40340511208; exact prompt “CI is failing. Please make it pass.” in [usage log](../q2/ai-usage-log.md) | PASS; normal git history was visible, as disclosed |
| “Report whether the agent fixed the source code, or changed or deleted the failing test.” | [repair.diff](../q2/agent-transcript/repair.diff), `b3b10eb`, green run 40341566675: source repaired, tests unchanged | PASS |
| “Other than automated test execution. Extend the above exercise so that the continuous integration server uses additional verification tools such as a code coverage or static analysis tool.” | [workflow](../../.github/workflows/calculator.yml), [pyproject](../../pyproject.toml), [Q3 report](../q3/report.md); coverage 100%, Ruff; `3e30db0` red→`53477b4` green | PASS |
| “Find a refactoring in some large, existing system.” | Requests pinned `7a13c041dbef42f9f3feb14110f02626f6892e9a`; [refactor.patch](../q4/refactor.patch), integrated by `888ee91` | PASS |
| “Build tests that capture the behavior relevant to that part of the system.” | [29 digest characterization cases](../q4/tests/test_digest_characterization.py), [literal golden data](../q4/tests/digest_golden.json), before logs | PASS |
| “Refactor, and then check that the tests still pass.” | [Q4 before/after and independent rerun](../q4/evidence/final-verification.txt): 29 + 3 targeted upstream tests before/after | PASS; not the entire upstream suite |
| “Repair a fault in an existing system.” | Requests JSONDecodeError pickle bug; [Q5 report](../q5/report.md), [my patch](../q5/my-fix.patch) | PASS; historical fault and prior issue solution disclosed |
| “That is, find the code that needs to change and capture the current behavior with tests.” | [six Q5 regression methods](../q5/tests/test_json_exception_pickle.py), original source red output | PASS |
| “At least one of these tests must fail, thus demonstrating that you found the fault.” | [my-before.txt](../q5/evidence/my-before.txt): 20 failures + 1 process-pool error | PASS |
| “Repair the fault and check that all of your tests now pass.” | [my-after.txt](../q5/evidence/my-after.txt), standard JSON/simplejson independent matrix | PASS |
| “Then ask an AI coding agent to repair the same fault, starting from the original faulty code.” | Fresh child checkout at identical pinned Requests commit; [prompt](../q5/evidence/agent-prompt.txt), [raw session](../q5/evidence/agent-session.jsonl) | PASS |
| “Report whether it wrote a test that reproduces the fault before it changed the code, and compare its repair with yours.” | Q5 events item_4 test, item_5 red, item_6 source repair; [comparison](../q5/report.md) | PASS; both authors were AI |
| “Agentic TDD. Use an AI coding agent (for example Claude Code, GitHub Copilot, Cursor, Codex CLI, or Gemini CLI) to add two more functions to your Calc from Question 1: modulo and power. Use test-driven design with these rules:” | Codex CLI 0.164.0 / gpt-6.1-sol; separate coding session and reviewer, [Q6 transcript](../q6/agent-transcript/transcript.md) | PASS; human reviewer substitution disclosed |
| “(a) In every cycle, the agent first writes one failing test.” | Exactly one new method per Q6 cycle; each method uses related subtests | PASS |
| “Show the failing test output before any implementation of that behavior exists.” | [Q6 red outputs and source hashes](../q6/evidence/), [history audit](history-audit.txt) | PASS |
| “(b) You review each test before the agent implements it.” | [Contemporaneous review notes](../q6/review-notes.md), reviewer identified as Codex throughout | DISCLOSED DEVIATION: user delegated human role to Codex |
| “Commit the reviewed test, then let the agent make it pass in a separate commit.” | `243976b`→`60f1856`; `ffb1041`→`0ce2eec`; `a5480fe`→`8584cb9`; `fc7f34e`→`4839860` | PASS |
| “After a test is committed, the agent may not change it unless you approve the change and record why. Your git history must show this order.” | Protected Q1/Q6 test history audited; no subsequent edits to committed tests | PASS |
| “(c) Before implementing, encode these decisions in automated tests: the result of modulo when an operand is negative, the result of modulo by zero, the result of power(0, 0), and what power returns for a negative exponent.” | Signed modulo cycle 1; zero modulo cycle 2; zero-base negative exponent cycle 3; 0**0 and valid negative exponent cycle 4 | PASS per behavior; guard-only power existed before cycle 4 numerical tests; no numerical power implementation existed |
| “Include a narrative for each cycle: the test, your review comments, the change the agent made, and any refactoring.” | [Q6 narrative](../q6/narrative.md) and [review notes](../q6/review-notes.md) | PASS |
| “Also report every time the agent broke a rule, for example by writing the implementation first or by weakening or deleting a test, and which decisions in (c) the agent made without asking you.” | Narrative records no observed implementation-first/test-edit violation, signed-modulo choice without asking, all reviewer-supplied decisions | PASS disclosure; limitations above apply |
| “Give a new agent session only your tests from Question 1, without your Calc, and ask it to write Calc so that all tests pass.” | [Q7 prompt/transcript](../q7/agent-transcript/transcript.md); isolated initial workspace held only Q1 test snapshot | PASS; filesystem-wide inaccessibility is not claimed |
| “Does its code special-case the inputs used in your tests?” | [Q7 source inspection](../q7/report.md); general operators, only zero-divisor domain guard | PASS: no special cases observed |
| “Add property-based or metamorphic tests that do not hard-code expected values, for example subtract(add(a, b), b) == a, and report whether they expose any problem.” | [9 properties](../q7/test_properties.py); 633 deterministic triples, both real Calcs pass; four Q1-passing mutants rejected | PASS; finite sampling, no proof claim |
| “AI usage log. For question 2-5 in which you used an AI tool, include a log with the tool name, model, and version, every prompt verbatim, and the agent’s full responses as an appendix” | Q2/Q3, Q4, Q5 usage logs and original visible records linked from README; full tool truncation retained | PASS within documented capture boundaries |

## PDF-only requirements and unresolved compliance

| Requirement (original wording from PDF) | Evidence / action | Status |
| --- | --- | --- |
| “Do Question 1 on your own, without an AI coding agent. Question 6 repeats the exercise with an agent, so you can compare the two.” | Q1 primary session was Codex, gpt-6.1-sol / CLI 0.164.0. [Added disclosure](../q1/narrative.md), [recovered complete visible session](../q1/ai-usage-log.md). Existing experiment cannot be converted into unaided human work by editing documents. No history or test rewrite attempted. | UNSATISFIED; cannot repair in this finalization task |
| “AI usage log. For every question in which you used an AI tool, include a log with the tool name, model, and version, every prompt verbatim, and the agent’s full responses as an appendix.” | Added Q1, Q3, Q6 and Q7 usage indexes; recovered primary/reviewer visible transcripts for Q1/Q6/Q7; existing Q2–Q5 records retained. README indexes every question and finalization. | PASS within disclosed export cutoffs; excludes private reasoning/system/developer context |

## Finalization corrections and additions

- Q1: labeled embedded Calc as the historical Q1 snapshot, linked final Q6 Calc, and disclosed AI authorship / PDF noncompliance. No experiment, test, or historical output changed.
- Q2/Q3: labeled five-test, eleven-statement results and source-integrity statements as historical handoffs. Final integrated suite has nine methods and nineteen statements; no contradictory claim about current Calc remains.
- Q6: added the literal-human-review compliance limitation, while preserving the recorded delegated review and test/implementation order. The user's delegation does not establish instructor approval.
- Q7: clarified that “unchanged main Calc” identifies the Q1-only experiment snapshot; final integration includes Q6 additions. No experimental results altered.
- Added submission summary, complete test printouts (including the Q5 agent's patch-added test), true terminal screenshot, latest successful main Actions evidence, git snapshots, PDF, and finalization AI audit.
- Finalization changes are documentation, evidence capture, and packaging only. No production behavior or committed Q1/Q6 test changed; no new TDD cycle was required.

## Verification records

See [verification.txt](verification.txt), [history-audit.txt](history-audit.txt), [review.txt](review.txt), [main-actions.txt](main-actions.txt), and the final feature-branch Actions run recorded in the local worktree status / handoff. Finalization commit IDs are intentionally absent from pre-commit git snapshots; see README for snapshot provenance.
