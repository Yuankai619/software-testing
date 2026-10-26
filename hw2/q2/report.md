# Question 2: CI failure and blind agent repair

## CI setup

`.github/workflows/calculator.yml` runs on every branch push and pull request, with read-only repository permissions. It checks out versioned source and tests, installs CPython 3.14 with setup-python, and discovers unittest tests in `hw2/calc`. GitHub provided Python 3.14.8; no fallback was needed. The local interpreter was Python 3.14.4. The later Q3 steps retain the same five tests under coverage.

## Controlled fault and manual recovery

I chose a source fault because the existing subtraction tests already specify the intended behavior. In `Calculator.subtract`, I replaced `return a - b` with `return a + b`. This leaves the tests as an independent oracle. The first assertion `subtract(7, 3) == 4` then fails with `AssertionError: 10 != 4`. No test was added, deleted, or weakened.

After the initial green CI run, I committed and pushed the fault, observed failure, reverted that commit, and observed success. Then I introduced exactly the same one-line fault in a second commit and confirmed failure again. The fault and both recoveries remain in history; no squashing, force pushing, or pushes to main were used.

| Stage | Commit | Run | Conclusion |
| --- | --- | --- | --- |
| 01-baseline | `cf5017114c4b1c180cd588defd8c115bfca42b0f` | [40340181643](https://github.com/Yuankai619/software-testing/actions/runs/40340181643) | success |
| 02-manual-red | `b51677c2307f8096255ba5168f4468967592dd19` | [40340302423](https://github.com/Yuankai619/software-testing/actions/runs/40340302423) | failure |
| 03-manual-green | `4fe8364a213a18c51d8a8d065973c0ed7f997432` | [40340394341](https://github.com/Yuankai619/software-testing/actions/runs/40340394341) | success |
| 04-agent-red | `5e42bbcaeaf90b33ea2bab6e996c6c2e32cb2d45` | [40340511208](https://github.com/Yuankai619/software-testing/actions/runs/40340511208) | failure |
| 05-agent-green | `b3b10eba0d4690a65e316ec14655566cca667f4a` | [40341566675](https://github.com/Yuankai619/software-testing/actions/runs/40341566675) | success |

Full logs and structured metadata are in `evidence/`; `failure-excerpts.txt` extracts the failing assertions. Each JSON file records the exact head SHA, run ID, conclusion, and URL. The initial local result is `evidence/baseline-tests.txt`.

## Independent agent experiment

A clean, independent clone at `/home/yuankai/Projects/School/.cache/hw2-q2-agent` started at `5e42bbcaeaf90b33ea2bab6e996c6c2e32cb2d45`, with empty porcelain status. A fresh `codex exec` session received only:

> CI is failing. Please make it pass.

No parent conversation, previous failure logs, fault description, or repair instructions were supplied. Normal repository history was available, so this is an experiment with an undisclosed fault, not a history-blind experiment. The clone origin points to the local worktree; the agent did not need GitHub credentials or a push.

The first turn could not execute either shell command because the nested sandbox hid the app-server socket directory (`app-server socket directory must be a user-owned directory with mode 0700`). No repository files changed. I preserved that trace and resumed the same session outside the parent sandbox, retaining the child workspace-write sandbox. The resume prompt was exactly the same sentence; no hint about the fault was added.

The resumed agent reproduced the failure with `python3 -m unittest discover -s hw2/calc -v`, changed only `Calculator.subtract` from `a + b` to `a - b`, and reran the same five tests successfully. It neither edited nor deleted any test and left the CI configuration unchanged. `agent-transcript/repair.diff` contains the one-line source repair; the transcript includes the red output, patch result, green output, and final diff. I independently checked that the test-file diff was empty, applied the saved repair to this branch, and confirmed the green Actions run. The agent itself explicitly stated it had not rerun remote CI.

The complete prompt, raw response events (including commands and outputs), readable transcript, version/model metadata, and final repair diff are linked from [the AI usage log](ai-usage-log.md). The result describes this one trial and does not establish general agent reliability.

## Final source integrity

Both `calculator.py` and `test_calculator.py` match the original Q1 base (`a4ef434`) byte for byte at handoff. This branch leaves no net change in `hw2/calc/`; Q6 changes owned by K3 can be merged independently. The integration owner must rerun CI after merging Q6.
