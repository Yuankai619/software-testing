# Q4 — Refactoring Requests digest authentication

Requests is an established, actively maintained Python HTTP library, with a substantial implementation and upstream test suite: [repository](https://github.com/psf/requests). Both experiments pin commit **`7a13c041dbef42f9f3feb14110f02626f6892e9a`** (2024-02-20). The historical snapshot makes Q5 reproducible; it is not the current release. Upstream source and environments live outside this submission under `/home/yuankai/Projects/School/.cache/hw2-upstream/`.

## Why this refactoring

`src/requests/auth.py:HTTPDigestAuth.build_digest_header` mixes algorithm selection, text encoding, digest calculation, challenge negotiation, and nonce state. Its four algorithm branches each define almost identical UTF-8 conversion and hexadecimal-digest functions. A future change to input conversion would require four edits. This is a concrete duplication problem in a real authentication path.

`refactor.patch`, generated with `git diff -- src/requests/auth.py`, replaces the branch-specific functions with a five-entry constructor table and one local `hash_utf8` function. MD5-SESS deliberately shares the MD5 constructor; its session-specific calculation remains in the existing code. The function shrinks by 27 lines. No new algorithms or protocol behavior are introduced.

## Tests before implementation

I recorded 29 golden cases from the **unmodified** pinned source, then wrote `tests/test_digest_characterization.py`. Each case becomes a named `unittest` test. The committed `tests/digest_golden.json` contains literal observations, not values recalculated by the refactored code. Time and random bytes are fixed; tests compare the entire returned Authorization header and the nonce counter/last-nonce state.

Coverage includes:

- Default, MD5, MD5-SESS, SHA, SHA-256, SHA-512, including lowercase algorithm names.
- Missing/empty qop, `auth`, and multiple offered qop values; unsupported qop and whitespace behavior.
- Unicode credentials/realm, opaque values, an empty URL path, queries, fragments, and POST.
- Repeated and changed nonces, unknown/empty algorithms, and MD5-SESS without qop.

These are characterization tests: even the existing whitespace limitation is preserved. They do not prove every possible input or authenticate against every server.

## Actual results

| Phase | Own characterization tests | Upstream `tests/test_lowlevel.py -k digest` |
| --- | --- | --- |
| Before source change | 29 passed | 3 passed, 17 deselected |
| After refactoring | 29 passed | 3 passed, 17 deselected |

The upstream tests exercise real loopback HTTP digest challenges, retry limits, redirects, and response-status handling. Logs with commands, commit and source paths are in `evidence/before-*.txt` and `evidence/after-*.txt`. `evidence/final-verification.txt` independently repeats both phases in a new clone and checks that the submitted patch applies. This is a targeted upstream run, not a claim that the entire Requests suite passed.

## Reproduce

Use Python 3.14.4. Requests' historical development requirements pin an old pytest; instead this experiment uses pytest 9.1.1 on Python 3.14. The exact installed packages are in `evidence/requirements-lock.txt`. The editable installation was built with setuptools 80.10.2 and wheel 0.48.0; install those before `pip install --no-build-isolation -e PATH_TO_REQUESTS`.

With the existing cached source and environment:

```bash
python3 hw2/q4/reproduce.py \
  /home/yuankai/Projects/School/.cache/hw2-upstream/requests-original \
  /home/yuankai/Projects/School/.cache/hw2-upstream/venv/bin/python
```

For another machine, clone `https://github.com/psf/requests.git` into a cache outside the submission, install `charset-normalizer`, `idna`, `urllib3`, `certifi`, `PySocks`, and `pytest` into a Python 3.14 environment, and substitute those two paths. The script pins the commit, creates a new sibling clone, runs tests before/after applying `refactor.patch`, and leaves the input checkout untouched. It sets `PYTHONPATH` to each tested clone to avoid accidentally testing another editable installation.

AI involvement and the review are disclosed in [ai-usage-log.md](ai-usage-log.md). Review findings and security checks are recorded in [review.md](review.md).
