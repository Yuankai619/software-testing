# Q5 — Repairing Requests JSON exception serialization

## System and real fault

Project: [Requests](https://github.com/psf/requests), commit **`7a13c041dbef42f9f3feb14110f02626f6892e9a`**. This is the first parent immediately before upstream's [fix merge `382fc2c0c6c0ef0874bc65bc1175f97c073e5086`](https://github.com/psf/requests/commit/382fc2c0c6c0ef0874bc65bc1175f97c073e5086), for [issue #6628](https://github.com/psf/requests/issues/6628). It is a real historical bug, not a deliberately injected fault. The issue describes failure to deserialize a JSON decoding exception and resulting process-pool failure. I read the issue, which also contains a proposed repair; this experiment does not claim a novel diagnosis.

The affected code is `src/requests/exceptions.py:JSONDecodeError`. Multiple inheritance selects `OSError`/`IOError`'s pickle reducer before the JSON decoder's reducer. The exception's display arguments omit the document and position needed by its constructor, so `pickle.loads(pickle.dumps(error))` raises `TypeError`. When a worker returns that exception, the parent cannot deserialize it and raises `BrokenProcessPool`.

## My repair: capture, red, green

“My repair” means the primary AI coding session's repair; no human-authored implementation is claimed. Before editing source, I wrote the six `unittest` methods in `tests/test_json_exception_pickle.py`:

1. Three malformed response bodies (including Unicode/newlines) round-trip through all six supported pickle protocols.
2. A directly constructed exception round-trips.
3. Deep copy reconstructs the exception.
4. Existing message/document/position and catch hierarchy are characterized.
5. Valid JSON still decodes normally.
6. A spawned process propagates `JSONDecodeError`, then successfully runs another task in the same pool.

The tests compare exception type, backend compatibility, `msg`, `doc`, `pos`, `lineno`, `colno`, `args`, and string rendering. The first run had **20 subtest/assertion failures and one process-pool error across six methods**, while the two unaffected methods passed. This is preserved in `evidence/my-before.txt`.

I then added `JSONDecodeError.__reduce__`, delegating to `CompatJSONDecodeError.__reduce__`. This preserves the appropriate constructor arguments with either standard-library `json` or optional `simplejson`. `my-fix.patch` is the actual source-only `git diff`. All six methods then passed, without changing the tests (`evidence/my-after.txt`). A separate environment reproduced the red/green cycle with simplejson 4.2.0.

The repair targets JSON decoding state. It does not promise preservation of arbitrary added attributes or attached request/response objects, nor does it change inheritance or valid JSON handling.

## Independent agent comparison

A **fresh `codex exec` session**, not a resume or fork, began from a clean checkout of the same faulty commit. It received only the symptoms and local execution constraints; it did not receive my tests, patch, solution, or the issue URL. Tool: **Codex CLI 0.164.0**; successful session model: **`gpt-6.1-sol`**, explicitly selected. See `evidence/agent-invocation.txt` and [ai-usage-log.md](ai-usage-log.md) for every prompt and complete responses, commands, outputs, and startup failures.

**It did write and run a reproducing test before changing source.** In the successful JSONL transcript:

| Event | Observed action |
| --- | --- |
| `item_4` | Added a parameterized regression test in upstream `tests/test_requests.py`. |
| `item_5` | Ran it against faulty source: **12 failed**, with missing `doc` and `pos` constructor arguments. |
| `item_6` | Added the source repair. |
| `item_7` | New tests passed in a broader run, but one unrelated loopback-server fixture was blocked by the child's sandbox. |
| `item_9` | A separate spawned-process check passed; the pool remained usable. |
| `item_10` | Reran without server-dependent cases: **38 passed, 4 deselected**. |

The agent tested both `Response.json()` decoding paths (`encoding=None` and `utf-8`) and all pickle protocols. It kept the regression test. Its source change is semantically identical to mine: both delegate to the backend JSON reducer; comments differ. My suite additionally checks multiple documents, direct construction, deepcopy, and persistent pool usability; its parameterized test covers the two decoding paths explicitly. `agent-fix.patch` includes **both** its source repair and its added test.

Three startup attempts failed before any files were changed: a read-only Codex home, then socket-directory permissions in nested sandboxes. The fourth fresh session launched with automatic approval outside the outer sandbox and retained its own `workspace-write` sandbox. No bypass option was used. The complete failed-attempt logs are retained; they are not reported as successful repairs. The issue's historical report informed my repair, so this comparison measures the recorded workflows, not a controlled human-versus-AI study.

## Independent verification and reproduction

| Variant | Own suite, standard JSON | Own suite, simplejson | Relevant upstream JSON/pickle tests |
| --- | --- | --- | --- |
| Original | Expected red: 20 failures + 1 error | Expected red: 20 failures + 1 error | Agent's added test alone: 12 expected failures |
| My patch | 6 passed | 6 passed | 12 passed, 330 deselected |
| Agent patch | 6 passed | 6 passed | 24 passed, 330 deselected (includes 12 new cases) |

`evidence/final-verification.txt` repeats this matrix in fresh cached clones, checks both submitted patches apply, and applies just the agent's test to original source to independently confirm it is red. The upstream test runs use a local httpbin plugin; no public HTTP endpoint is needed. An initial run lacked the plugin and failed at fixture setup; its actual output is retained in `evidence/upstream-missing-fixture.txt`, followed by successful runs after installing/loading the plugin. No full-upstream-suite claim is made.

```bash
python3 hw2/q5/reproduce.py \
  /home/yuankai/Projects/School/.cache/hw2-upstream/requests-original \
  /home/yuankai/Projects/School/.cache/hw2-upstream/venv/bin/python \
  /home/yuankai/Projects/School/.cache/hw2-upstream/venv-simplejson/bin/python
```

Substitute your own cache and Python paths on another machine. Clone Requests outside the submission. Prepare Python 3.14 with Requests' dependencies, pytest 9.1.1, PySocks 1.7.1, and pytest-httpbin 2.1.0 (httpbin 0.10.4). For the second interpreter install simplejson 4.2.0 as well. Exact main packages are in `../q4/evidence/requirements-lock.txt`; the alternate environment is in `evidence/requirements-simplejson-lock.txt`. Omit the final argument to test only the standard JSON backend. All upstream execution and new clones stay beside the cached source; imports point explicitly to each tested clone.

Review and security audit: [../q4/review.md](../q4/review.md).
