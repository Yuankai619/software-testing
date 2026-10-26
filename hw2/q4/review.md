# Review, simplification, and security audit

This record covers Q4 and Q5. At the time of the experimental review, no commits, pushes, PRs, or upstream messages had been made. The user subsequently authorized committing Q4/Q5 and pushing the dedicated `feat/hw2-q45` branch; the experimental evidence below remains unchanged.

## Codex code review

Invocation (Codex CLI 0.164.0, model gpt-6.1-sol):

```bash
CODEX_HOME=/home/yuankai/Projects/School/.cache/hw2-upstream/codex-home \
TMPDIR=/home/yuankai/Projects/School/.cache/hw2-upstream/codex-tmp \
codex review --base main -c 'model="gpt-6.1-sol"'
```

Exit status: 0. Full unedited stdout/stderr: [evidence/codex-review.txt](evidence/codex-review.txt). The review ran read-only with approval disabled. Its final assessment identified **no actionable correctness regressions** in the digest refactoring, JSON exception repair, tests, or reproduction scripts. There were no individual findings to accept or reject; no implementation changes were needed after review.

New submission files were exposed to review using `git add -N` (intent-to-add); no file contents were staged and no commit was created. `main` advanced independently with another worker's Q1 work while this branch remained at its original base. A direct `git diff main` therefore shows Q1 files absent from this older worktree; `git diff HEAD` contains only Q4/Q5 additions. Those other directories were not modified. Codex reviewed from merge-base `934a95e0ceafdd3ac58e34dd2a3dbfcfa56d7acb`.

## Self-simplification

Reports keep the rationale, actual test matrix, limitations, and reproduction command in the main narrative. Complete raw outputs and prompts remain in appendices because the assignment requires them. Q4 uses one table-driven golden suite; Q5 uses six focused methods and one shared comparison helper. No extra framework or production dependency was added. Bytecode caches are excluded with local `.gitignore` files.

The primary transcript is shared between the two AI logs rather than duplicated. Failed CLI starts, the missing-fixture run, and the child's sandbox-limited run remain explicitly labeled; they are not counted as successful verification.

## Security self-audit

Actual final audit output: [evidence/security-audit.txt](evidence/security-audit.txt).

- Upstream clones, editable installs, environments, and all upstream test working directories stayed under `/home/yuankai/Projects/School/.cache/hw2-upstream/`. Reproduction scripts create fresh siblings in this cache. `PYTHONPATH` explicitly selects the clone under test.
- Installation used standard package-manager commands; no downloaded shell installer or unknown installation script was run. Historical Requests packaging required setuptools below 81; this is documented.
- Relevant upstream HTTP tests use local loopback servers. The complete upstream suite and public endpoint tests were not run.
- Checked submission text for common OpenAI/GitHub token formats, JWTs, and private-key headers: zero matches. No credential values were printed or copied into the submission. Temporary authentication copies for CLI startup were held in protected local homes and cleared after use; the original authentication file was not changed.
- No symlinks occur in the submitted Q4/Q5 files. Git changes against this branch's HEAD are restricted to the authorized two directories; `.orch/status.md` remains local progress metadata.
- The actual patched upstream source passes `git diff --check`. An outer check over the submission reports whitespace in verbatim console outputs and unified-diff blank context lines; those raw artifacts are preserved unchanged. Authored Python and Markdown pass a scoped whitespace check.

After these checks, both reproduction scripts were run again. Their final logs preserve Q4's green-before/green-after sequence and Q5's expected red baseline followed by green results for both repairs under both JSON backends, including the agent's own test-only red run.
