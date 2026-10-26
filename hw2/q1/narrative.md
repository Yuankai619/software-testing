# Question 1: extending Calculator with TDD

## Scope and reproduction

This submission implements Question 1 only, using Python 3.14.4 and the standard-library `unittest` framework. The public class is `Calculator` in `hw2/calc/calculator.py`. The original starter files remain unchanged. Although the supplied `hw2/Calc.py` already contains the requested operations, the new implementation began with only the starter's `add` behavior and its regression test, committed as `8a905ca`.

Run the complete suite from the repository root:

```sh
cd hw2/calc
python3 -m unittest -v
```

The user chose true division returning `float`, with `ValueError` for a zero divisor. The assignment's domain is integer operands. The new methods follow ordinary signed arithmetic, including zero. No new nonnumeric-input contract is introduced: Python's operators determine behavior outside the assignment's integer domain, without coercion or an extra validation layer. There is no promise that every nonnumeric value raises `TypeError` (for example, Python supports string multiplication).

## TDD method and evidence

Each cycle added exactly one test method, ran the whole suite to observe exactly one error, and committed that test and its actual red output before modifying `calculator.py`. One method can contain several assertions specifying the related sign and zero boundaries of that behavior; all those assertions were written before its implementation. The first unmet assertion stopped the red run, while the green run executed every assertion. This avoids inventing input-specific implementations merely to manufacture additional failing cycles. No committed test was weakened, removed, or edited later.

The evidence files capture stdout and stderr from the real `python3 -m unittest -v` invocations. Red runs exited 1 and green runs exited 0. An absent method appears as a unittest ERROR (`AttributeError`), which is a red result just like a failed assertion. Cycle 4 is red because Python's default `ZeroDivisionError` does not satisfy the specified `ValueError` contract. No implementation or exception was mocked.

## Cycle 1: signed integer subtraction

- Test: `test_subtract_integers` specifies `7 - 3 == 4`, reversed operands producing a negative result, either operand negative, both negative, zero on either side, both zero, and equal operands. This defines operand order and sign/zero behavior before subtraction exists.
- Red: commit `4a37dda`; [actual red output](evidence/cycle-1-red.txt). Only this new test errors because `subtract` is absent; the add regression passes (2 methods total).
- Green: commit `ceedfb9`; [actual green output](evidence/cycle-1-green.txt). Added only `subtract(self, a, b): return a - b`. Both methods pass.
- Refactor: none. One native arithmetic expression is already the simplest general implementation; it handles every integer pair rather than recognizing tested inputs.

## Cycle 2: signed integer multiplication

- Test: `test_multiply_integers` specifies a positive product, reversed operand order, either operand negative, two negatives producing a positive product, zero on either side, both zero, and multiplication by one. These cases define the sign rules, annihilator zero, and identity one before multiplication exists.
- Red: commit `bff3221`; [actual red output](evidence/cycle-2-red.txt). Only the new multiplication method errors with `AttributeError`; the previous 2 methods pass (3 methods total).
- Green: commit `b97df3d`; [actual green output](evidence/cycle-2-green.txt). Added only `multiply(self, a, b): return a * b`. All 3 methods pass.
- Refactor: none. A shared arithmetic dispatcher or helper would add indirection without removing meaningful duplication.

## Cycle 3: true division with float results

- Test: `test_divide_returns_float` first requires `divide(6, 3)` to be a `float` equal to `2.0`, preventing integer-returning exact division. It also requires a fractional result (`7 / 2 == 3.5`) and its float type, all negative-operand sign combinations, zero numerators with positive and negative divisors, a float zero result, and division by one. These decisions are encoded before `divide` exists. Nonzero divisors are the scope of this cycle; the next cycle defines a zero divisor.
- Red: commit `00acc47`; [actual red output](evidence/cycle-3-red.txt). Only the new division method errors because `divide` is absent; the previous 3 methods pass (4 methods total).
- Green: commit `d42eac3`; [actual green output](evidence/cycle-3-green.txt). Added only `divide(self, a, b): return a / b`, using Python's true-division operator. All 4 methods pass.
- Refactor: none. The single expression directly expresses the tested contract. No rounding policy or float conversion wrapper is needed.

## Cycle 4: division by zero

- Test: `test_divide_by_zero_raises_value_error` requires `ValueError` with the exact message `Cannot divide by zero` for positive, negative, and zero numerators. The user chose the exception type; the agent chose the concise message and these boundary examples, then specified them in the test before changing the implementation.
- Red: commit `8a14507`; [actual red output](evidence/cycle-4-red.txt). The existing `/` expression raises `ZeroDivisionError`, which is not a `ValueError`, so exactly this new method errors; the previous 4 methods pass (5 methods total).
- Green: commit `82ba76a`; [actual green output](evidence/cycle-4-green.txt). Added `if b == 0: raise ValueError("Cannot divide by zero")` before `/`. All 5 methods pass.
- Refactor: none. A local guard is the smallest implementation of the explicit exception contract. An exception hierarchy or common validation abstraction would be unnecessary.

## Decisions, process integrity, and extension

The agent selected representative integer examples, grouped related assertions into one test method per new behavior, and chose the zero-division message. These routine choices did not require clarification. The float and exception-type requirements came from the user's decisions; they were not invented by the agent. There were no implementation-first cycles, edited committed tests, fabricated test outputs, or other observed TDD-rule violations in this task. The history below records the test-first order.

Subtraction, multiplication, and division remain independent stateless instance methods. Question 6 can add `modulo` and `power` plus their tests without changing these methods or introducing dispatch infrastructure. No Question 6 behavior is implemented here.

## Complete test listing

This is the complete final contents of `hw2/calc/test_calculator.py` (5 test methods). The executable file is the authoritative version.

```python
import unittest

from calculator import Calculator


class TestCalculator(unittest.TestCase):
    def test_add(self):
        calc = Calculator()
        self.assertEqual(calc.add(2, 3), 5)

    def test_subtract_integers(self):
        calc = Calculator()
        self.assertEqual(calc.subtract(7, 3), 4)
        self.assertEqual(calc.subtract(3, 7), -4)
        self.assertEqual(calc.subtract(-7, 3), -10)
        self.assertEqual(calc.subtract(7, -3), 10)
        self.assertEqual(calc.subtract(-7, -3), -4)
        self.assertEqual(calc.subtract(7, 0), 7)
        self.assertEqual(calc.subtract(0, 7), -7)
        self.assertEqual(calc.subtract(0, 0), 0)
        self.assertEqual(calc.subtract(7, 7), 0)

    def test_multiply_integers(self):
        calc = Calculator()
        self.assertEqual(calc.multiply(7, 3), 21)
        self.assertEqual(calc.multiply(3, 7), 21)
        self.assertEqual(calc.multiply(-7, 3), -21)
        self.assertEqual(calc.multiply(7, -3), -21)
        self.assertEqual(calc.multiply(-7, -3), 21)
        self.assertEqual(calc.multiply(7, 0), 0)
        self.assertEqual(calc.multiply(0, 7), 0)
        self.assertEqual(calc.multiply(0, 0), 0)
        self.assertEqual(calc.multiply(7, 1), 7)

    def test_divide_returns_float(self):
        calc = Calculator()
        exact = calc.divide(6, 3)
        self.assertIsInstance(exact, float)
        self.assertEqual(exact, 2.0)
        fraction = calc.divide(7, 2)
        self.assertIsInstance(fraction, float)
        self.assertEqual(fraction, 3.5)
        self.assertEqual(calc.divide(-7, 2), -3.5)
        self.assertEqual(calc.divide(7, -2), -3.5)
        self.assertEqual(calc.divide(-7, -2), 3.5)
        zero = calc.divide(0, 7)
        self.assertIsInstance(zero, float)
        self.assertEqual(zero, 0.0)
        self.assertEqual(calc.divide(0, -7), 0.0)
        self.assertEqual(calc.divide(7, 1), 7.0)

    def test_divide_by_zero_raises_value_error(self):
        calc = Calculator()
        with self.assertRaisesRegex(ValueError, "^Cannot divide by zero$"):
            calc.divide(7, 0)
        with self.assertRaisesRegex(ValueError, "^Cannot divide by zero$"):
            calc.divide(-7, 0)
        with self.assertRaisesRegex(ValueError, "^Cannot divide by zero$"):
            calc.divide(0, 0)


if __name__ == "__main__":
    unittest.main()
```

## Final Calculator

Complete contents of `hw2/calc/calculator.py`:

```python
class Calculator:
    def add(self, a, b):
        return a + b

    def subtract(self, a, b):
        return a - b

    def multiply(self, a, b):
        return a * b

    def divide(self, a, b):
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b
```

## Git history

The complete implementation interval, including the add-only baseline, is `934a95e..82ba76a`. Reproduce this chronological log with:

```sh
git log --oneline --reverse 934a95e..82ba76a
```

```text
8a905ca feat: cycle 0 establish add-only calculator baseline
4a37dda test: cycle 1 define integer subtraction and boundaries
ceedfb9 feat: cycle 1 implement integer subtraction
bff3221 test: cycle 2 define integer multiplication and boundaries
b97df3d feat: cycle 2 implement integer multiplication
00acc47 test: cycle 3 define true division with float results
d42eac3 feat: cycle 3 implement true division
8a14507 test: cycle 4 require ValueError for division by zero
82ba76a feat: cycle 4 reject division by zero with ValueError
```

Later documentation commits do not change the implementation or committed tests. The final verification output is [evidence/final-tests.txt](evidence/final-tests.txt). Screenshots will be produced by the coordinating session, as assigned; none are fabricated here.

## Review and final verification

After committing the implementation and narrative, Codex CLI 0.164.0 ran `codex review --base main`. It executed the documented suite, confirmed all 5 test methods passed, and identified no actionable defects. There were no review findings to fix or reject. The coordinating session can inspect the full local transcript in `.orch/codex-review.txt`; orchestration files are deliberately not committed.

The subsequent simplification pass found no unnecessary production code or redundant test cases: each sign, operand-order, zero, identity, type, or exception assertion distinguishes relevant behavior. No refactor was needed, and committed tests remained unchanged. A history audit also confirmed one newly added test method per red commit, unchanged production code in each red commit, and unchanged tests in each green commit.

The security self-review found no parsing, evaluation, external I/O, or dependencies in Calculator. The integer input domain does not require a new nonnumeric validation policy. The tested zero-division exception contains a fixed message without interpolated input. Detailed security notes are in the local `.orch/status.md`, as requested.

The final `python3 -m unittest -v` run passed all 5 test methods; its real output is saved in `evidence/final-tests.txt`. `git diff --check main` also passed. Only Question 1 files were changed, and the original starter files were verified unchanged.
