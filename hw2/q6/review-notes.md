# Contemporaneous reviewer notes

Reviewer: Codex, model gpt-6.1-sol (CLI 0.164.0); not Yuankai. Notes are written after examining each actual red result and before authorizing implementation.

## Cycle 1: nonzero-divisor modulo

- Reviewed `test_modulo_with_nonzero_divisor`: exactly one test method, with seven subtests of the same remainder rule. Expected constants are independent of the implementation. Positive, reversed-order, exact-division, zero-dividend, and all negative-operand sign combinations distinguish common mistakes and truncation-based remainder semantics.
- The proposed `(-7, 3) -> 2` and `(7, -3) -> -2` agree with the user's prescribed Python modulo convention. The agent proposed this convention without first asking the reviewer to choose; it explicitly submitted the choice for review. It deferred the other Q6(c) choices rather than inventing answers.
- Independently ran the entire suite: 6 methods, 7 subtest errors because `modulo` is absent; all 5 Q1 methods pass. Saved actual output and source hashes in `evidence/cycle-1-red.*`. Production and Q1 tests were unchanged.
- Approved without test edits. No observed TDD-rule violation. Only nonzero-divisor modulo implementation is authorized after this test commit. Zero-divisor handling and all power code remain unauthorized.
- Green review: the agent added only `modulo(self, a, b): return a % b`; all 6 test methods pass. No test changes, premature power code, special zero-divisor handling, or refactor. Implementation approved for a separate feat commit.

## Cycle 2: modulo by zero

- The agent asked for the exception contract before writing anything. The reviewer supplied the user's `ValueError` decision and explicitly approved the agent's proposed fixed message `Cannot modulo by zero`.
- Reviewed `test_modulo_by_zero_raises_value_error`: exactly one new method tests the single zero-divisor exception contract with positive, negative, and zero dividends. Anchored message matching verifies the approved API detail; no unrelated behavior or weaker assertions were added.
- Independent red: 7 methods, three subtest errors from native `ZeroDivisionError` instead of the specified `ValueError`; previous 6 methods pass. Production and every previously committed test are unchanged.
- Approved unchanged for a test-only commit before zero-divisor implementation. No TDD-rule violation; this decision was asked and answered rather than assumed.
- Green review: only a `b == 0` guard raising the approved fixed `ValueError` was added before `%`. All 7 methods pass. No test edit, power implementation, refactor, or unasked behavioral choice. Approved for its separate feat commit.

## Cycle 3: zero base with negative exponent

- The agent asked for both the exception and message before editing; the reviewer supplied the user's ValueError requirement and approved `Cannot raise zero to a negative power`. The reviewer also answered the deferred 0**0 and nonzero-base negative-exponent choices for the next cycle.
- Reviewed exactly one new method, `test_power_zero_base_negative_exponent_raises_value_error`, with exponents -1, -2, and -5. Anchored ValueError/message assertions express one invalid-domain rule. Production and all committed tests are unchanged.
- Independent red: 8 methods, three AttributeError subtest errors because power is absent; all previous 7 methods pass. Actual output and source hashes are saved. Approved unchanged for a test commit.
- No observed TDD-rule violation or unasked power decision. After this commit only the invalid-domain guard is authorized; the numerical operation remains for cycle 4.
- Green review: only the zero-base/negative-exponent guard was added; valid inputs temporarily fall through without numerical implementation, as expressly authorized. All 8 methods pass independently. No committed test edit, general exponentiation, refactor, or observed violation. Approved for a separate feat commit.

## Cycle 4: valid integer exponentiation

- Reviewed exactly one new method, `test_power_valid_integer_operands`, with 14 literal expected examples of one numerical rule. It covers positive powers, negative-base odd/even parity, zero base with positive exponent, positive/negative/zero bases at exponent zero, and nonzero bases with negative exponents. All five negative-exponent examples also assert float type; the (1, -4) case distinguishes an equal integer value from the required float. All expected fractions are exactly representable in binary.
- The user's required (0, 0) -> 1 and (2, -1) -> 0.5 decisions are encoded before numerical implementation. Existing exception behavior and committed tests are unchanged.
- Independent red: 9 methods, 14 failing subtests because the guard-only method returns None; all previous 8 methods pass. Saved actual output and hashes. Approved unchanged for a test-only commit, then numerical implementation.
- No observed TDD-rule violation or additional unasked API decision; example selection is within the already approved contract.
