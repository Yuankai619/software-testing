# Question 3: Coverage and static analysis in CI

## Configuration and rationale

The same Calculator CI workflow installs exact versions from root `requirements-ci.txt`: coverage.py 7.17.0 and Ruff 0.17.2. The root `pyproject.toml` enables branch measurement, limits measured production code to `hw2/calc`, omits `test_*.py` from the coverage denominator, displays missing lines, and enforces 100% combined statement/branch coverage. Tests still run through unittest discovery, so all existing Q1 tests remain the oracle.

Ruff checks both calculator source and tests, targeting Python 3.14 and selecting E4/E7/E9/F. These rules detect import errors, undefined names, unused imports, and basic syntax/style problems without imposing type annotations or broad formatting changes on this small untyped starter. Neither tool automatically fixes files in CI. Coverage XML is generated and uploaded as `calculator-coverage`, with upload attempted even on failure.

References: [coverage configuration](https://coverage.readthedocs.io/en/latest/config.html) and [Ruff settings](https://docs.astral.sh/ruff/settings/).

## Demonstrated verification failure and recovery

I temporarily added an unused `import os` to `hw2/calc/calculator.py` while enabling the tools. The five unit tests still passed and coverage remained 100%, but Ruff reported F401 and returned exit code 1, making CI fail. I removed that import without changing tests, coverage exclusions, thresholds, or Ruff rules, and observed green CI. The temporary source change was fully restored.

| Stage | Commit | Run | Conclusion |
| --- | --- | --- | --- |
| 06-static-red | `3e30db0bac333c95d86c5569a348531479c7c03d` | [40341675283](https://github.com/Yuankai619/software-testing/actions/runs/40341675283) | failure |
| 07-static-green | `53477b46de17b9c3f7d9fca8de5537f6c55d450b` | [40341850392](https://github.com/Yuankai619/software-testing/actions/runs/40341850392) | success |

The full Actions logs and run JSON are in `evidence/`. `failure-excerpts.txt` isolates F401 and the exit status. `final-local-checks.txt` records the final local unittest/coverage/Ruff results. `coverage.xml` preserves the measured line and branch counts from the green GitHub run.

The final baseline has 11 executable statements and two branch destinations; all are covered (100%, zero missing statements and zero partial branches). Ruff reports `All checks passed!`.

Coverage measures execution, not correctness: even the Q2 arithmetic fault could execute every line. The subtraction assertions caught that fault; Ruff catches a separate unused-import defect. These complementary checks do not prove all possible calculator inputs are correct. K3's later modulo/power changes must pass this same gate after integration; no claim is made about their unmerged coverage.
