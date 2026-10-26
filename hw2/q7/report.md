# Question 7: reconstructing Calc from tests alone

## Experiment and provenance

The new session received only Q1's `test_calculator.py`, copied from main commit
`a4ef434976fedbd87dfccd2055956c440e78bbca`. Its working directory was newly created
at `/home/yuankai/Projects/School/.cache/hw2-q7-agent/`, outside the repository,
without Calc, the Q1 narrative, or Git history. The only initial file was the test
file. A new headless Codex CLI session received this exact prompt:

```text
寫一個 calculator.py 讓這些測試全部通過
```

The tool was Codex CLI 0.164.0; the session metadata records model `gpt-6.1-sol`.
No parent conversation was passed. This is a tests-only workspace, not a claim
that the CLI has no built-in instructions or that its sandbox hides every other
readable filesystem path. The captured commands determine what the agent
actually inspected.

Two earlier fresh sessions failed before reading any tests: every attempted
shell command returned `app-server socket directory must be a user-owned
directory with mode 0700`. The second attempt tried a private runtime directory
and `--no-daemon`, with the same outcome. Their raw streams, stderr, exit codes,
and metadata are retained as `agent-transcript/attempt-1-*` and `attempt-2-*`.
Neither produced Calc; neither is counted as a passing implementation. The
third launch ran outside the parent's nested sandbox after automatic execution
approval, while keeping the child Codex `workspace-write` sandbox. It received
the same unchanged tests and exact prompt in a fresh session.

See [metadata](agent-transcript/metadata.json), the [verbatim prompt](agent-transcript/prompt.txt),
the [raw response stream](agent-transcript/session.jsonl), and the
[readable transcript](agent-transcript/transcript.md). The original test snapshot
and unchanged main Calc are retained in [evidence](evidence/); hashes in
`integrity.json` identify the files used.

## Does the generated code special-case the Q1 inputs?

No input-specific arithmetic branches or lookup tables were found in
[the generated implementation](agent_calc/calculator.py), which was copied
without edits. Function-by-function inspection shows:

| Function | Evidence |
| --- | --- |
| `add` | Returns `a + b` for all inputs; no check for Q1's `(2, 3)` example. |
| `subtract` | Returns `a - b`; no branches on signs or the example operands `7` and `3`. |
| `multiply` | Returns `a * b`; no example-specific table or restriction to small integers. |
| `divide` | Checks only `b == 0`, raises the required `ValueError`, and otherwise returns `a / b`. The zero branch expresses the operation's domain rule, rather than special-casing tested numerators. |

The error text matches Q1's explicit regex requirement. The agent chose direct
Python arithmetic and a short class docstring without asking follow-up
questions. It first tried `python -m unittest -v`, which failed because the
`python` command was unavailable, then ran `python3 -m unittest -v`: all five Q1
test methods passed. It did not edit the tests; the post-session SHA-256 matches
the main snapshot. Its recorded reads cover the isolated directory, the supplied
tests, and checks for ancestor `AGENTS.md` files (none supplied additional
instructions). No command read our original Calc or narrative. Sandbox-injected
empty protected directories appeared in its directory listing; they were not
Git history or supplied experiment material.

## Do additional properties expose problems?

No problems were exposed in either real implementation in the sampled domain.
Both passed the same frozen Q1 suite and all nine property methods:

| Implementation | Frozen Q1 suite | Properties | Recorded output |
| --- | --- | --- | --- |
| Agent Calc | 5/5 passed | 9/9 passed | [Q1](evidence/q1-agent.txt), [properties](evidence/properties-agent.txt) |
| Our unchanged main Calc | 5/5 passed | 9/9 passed | [Q1](evidence/q1-main.txt), [properties](evidence/properties-main.txt) |

The four deliberate mutants also passed Q1 (5/5 each), while the properties
rejected every mutant. The add, subtract, multiply, and divide mutants produced
1,784, 669, 1,132, and 5,234 failing subtests respectively, with no test errors.
The [sensitivity output](evidence/sensitivity.txt) is evidence that these checks
can expose unseen-input faults; it is not evidence of faults in the actual agent
Calc. A test method runs many subtests, so these counts exceed nine.

### Test design

[test_properties.py](test_properties.py) uses standard-library `unittest` and
`random.Random(20261026)` on Python 3.14.4. This avoids an additional dependency
and makes the sampled cases reproducible. Hypothesis would offer automatic
shrinking and broader strategies; this suite instead reports each failing input
with `subTest` and retains a fixed corpus.

The corpus contains all 121 pairs drawn from
`0, ±1, ±2, ±7, ±1000000, ±2**40`, with a deterministic third operand, plus 512
seeded random triples in `[-1000000, 1000000]`: 633 triples total. The nine test
methods check these relations, without tables of expected arithmetic outputs:

| Method | Property |
| --- | --- |
| Add/subtract round trips | `subtract(add(a,b),b) == a` and `add(subtract(a,b),b) == a` |
| Addition laws | Commutativity and associativity |
| Addition translation | `add(a+1,b) == add(a,b)+1` |
| Subtraction laws | Antisymmetry and translation by the same third operand |
| Multiplication laws | Commutativity and multiplicative identity |
| Distributivity | `multiply(a,add(b,c)) == add(multiply(a,b),multiply(a,c))` |
| Division round trips | Both multiplication/division orders recover `a`; division returns `float` |
| Division transformations | Scaling both operands preserves the quotient; negating either reverses its sign |
| Division by zero | Every sampled numerator raises `ValueError` for `0`, `0.0`, and `-0.0` |

There are 622 nonzero-divisor triples and 612 with both nonzero divisor and
scale. The zero-division property uses 1,546 distinct numerators, hence 4,638
numerator/zero-form combinations. Integer relations use exact equality; division
uses `math.isclose(rel_tol=1e-12, abs_tol=1e-9)` to allow ordinary floating-point
rounding. The largest integer operand is `2**40`; products remain finite as
floats in these checks.

### Strength and limits

The translation and identity checks anchor the relations so that a collection
of constant-zero methods cannot satisfy the entire suite merely by agreeing
with one another. Deliberate per-operation mutants in
[check_sensitivity.py](evidence/check_sensitivity.py) preserve Q1-sized inputs
but return zero when `abs(a) > 7`; they measure whether the additional tests
detect errors outside Q1's examples. These mutants are validation probes, not
observed defects in either Calc.

Finite seeded sampling is evidence, not a proof for all inputs. It does not cover
arbitrarily large integers, NaN/infinity, strings, complex numbers, concurrency,
or every possible combination of coordinated defects. The numeric domain follows
Q1's integer operands; fractional division results are checked with tolerance.
This suite makes no claims about Q6's modulo or power.

## Integration checks

Before submission, main commit `0587d03` (the Q2/Q3 CI integration) was merged
into this branch. Our Calc stayed unchanged. In a Python 3.14.4 virtual
environment under `.cache`, the pinned CI tools (`coverage==7.17.0` and
`ruff==0.17.2`) passed the workflow's unit tests, the 100% line/branch coverage
threshold for `hw2/calc`, and Ruff on `hw2/calc`. Ruff also passed on `hw2/q7`.
See [local CI output](evidence/ci-local.txt). The workflow measures our main Calc;
the separate Q7 verification command below exercises both implementations and
the sensitivity probes.

The required `codex review --base main` found no actionable defects; its
[full trace](evidence/code-review.txt) records the independent property and
sensitivity runs. Before final verification, the branch also incorporated main
commit `bdbfb18` (Q4/Q5). No changes to `hw2/calc` were authored for Q7.

## Reproduce

From the repository root, run:

```bash
python3 -B hw2/q7/test_properties.py --calculator hw2/q7/agent_calc/calculator.py
python3 -B hw2/q7/test_properties.py --calculator hw2/calc/calculator.py
python3 -B hw2/q7/evidence/verify.py
```

The last command reruns the frozen Q1 suite against each implementation, both
property runs, and the deliberate sensitivity probes, saving combined stdout,
stderr, commands, and exit codes to `evidence/*.txt`. It exits unsuccessfully if
either real implementation fails or if the sensitivity probes behave unexpectedly.
