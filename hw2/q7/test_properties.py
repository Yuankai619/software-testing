"""Reproducible metamorphic checks for either Q1 Calculator implementation.

Run from the repository root:
    python3 hw2/q7/test_properties.py --calculator hw2/q7/agent_calc/calculator.py
    python3 hw2/q7/test_properties.py --calculator hw2/calc/calculator.py
"""

import argparse
import importlib.util
import math
from pathlib import Path
import random
import unittest


SEED = 20261026
RANDOM_CASES = 512
EDGES = (0, 1, -1, 2, -2, 7, -7, 10**6, -(10**6), 2**40, -(2**40))
REL_TOL = 1e-12
ABS_TOL = 1e-9


def make_cases():
    """Cover every boundary pair, followed by seeded integer triples."""
    cases = [
        (a, b, EDGES[(i + j) % len(EDGES)])
        for i, a in enumerate(EDGES)
        for j, b in enumerate(EDGES)
    ]
    rng = random.Random(SEED)
    cases.extend(
        tuple(rng.randint(-(10**6), 10**6) for _ in range(3))
        for _ in range(RANDOM_CASES)
    )
    return tuple(cases)


CASES = make_cases()


def load_calculator(path):
    """Load the exact requested file without relying on import-path order."""
    spec = importlib.util.spec_from_file_location("q7_calculator_under_test", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.Calculator


class CalculatorProperties(unittest.TestCase):
    calculator_class = None

    def setUp(self):
        self.calc = self.calculator_class()

    def assertClose(self, actual, expected):
        self.assertTrue(
            math.isclose(actual, expected, rel_tol=REL_TOL, abs_tol=ABS_TOL),
            f"{actual!r} is not close to {expected!r}",
        )

    def test_add_subtract_round_trip(self):
        for a, b, _ in CASES:
            with self.subTest(a=a, b=b):
                self.assertEqual(self.calc.subtract(self.calc.add(a, b), b), a)
                self.assertEqual(self.calc.add(self.calc.subtract(a, b), b), a)

    def test_add_commutativity_and_associativity(self):
        for a, b, c in CASES:
            with self.subTest(a=a, b=b, c=c):
                self.assertEqual(self.calc.add(a, b), self.calc.add(b, a))
                self.assertEqual(
                    self.calc.add(self.calc.add(a, b), c),
                    self.calc.add(a, self.calc.add(b, c)),
                )

    def test_add_translation(self):
        # Anchor the relation independently of the implementation's other methods.
        for a, b, _ in CASES:
            with self.subTest(a=a, b=b):
                self.assertEqual(self.calc.add(a + 1, b), self.calc.add(a, b) + 1)

    def test_subtract_antisymmetry_and_translation(self):
        for a, b, c in CASES:
            with self.subTest(a=a, b=b, c=c):
                self.assertEqual(self.calc.subtract(a, b), -self.calc.subtract(b, a))
                self.assertEqual(
                    self.calc.subtract(a + c, b + c), self.calc.subtract(a, b)
                )

    def test_multiply_commutativity_and_identity(self):
        for a, b, _ in CASES:
            with self.subTest(a=a, b=b):
                self.assertEqual(self.calc.multiply(a, b), self.calc.multiply(b, a))
                self.assertEqual(self.calc.multiply(a, 1), a)

    def test_multiply_distributes_over_add(self):
        for a, b, c in CASES:
            with self.subTest(a=a, b=b, c=c):
                self.assertEqual(
                    self.calc.multiply(a, self.calc.add(b, c)),
                    self.calc.add(self.calc.multiply(a, b), self.calc.multiply(a, c)),
                )

    def test_divide_multiply_round_trip(self):
        for a, b, _ in CASES:
            if b == 0:
                continue
            with self.subTest(a=a, b=b):
                quotient = self.calc.divide(a, b)
                self.assertIsInstance(quotient, float)
                self.assertClose(self.calc.multiply(quotient, b), a)
                recovered = self.calc.divide(self.calc.multiply(a, b), b)
                self.assertIsInstance(recovered, float)
                self.assertClose(recovered, a)

    def test_divide_scale_and_sign(self):
        for a, b, c in CASES:
            if b == 0 or c == 0:
                continue
            with self.subTest(a=a, b=b, scale=c):
                quotient = self.calc.divide(a, b)
                self.assertClose(self.calc.divide(a * c, b * c), quotient)
                self.assertClose(self.calc.divide(-a, b), -quotient)
                self.assertClose(self.calc.divide(a, -b), -quotient)

    def test_divide_zero_always_raises_value_error(self):
        numerators = sorted({value for case in CASES for value in case})
        for a in numerators:
            for zero in (0, 0.0, -0.0):
                with self.subTest(a=a, zero=repr(zero)):
                    with self.assertRaises(ValueError):
                        self.calc.divide(a, zero)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--calculator", type=Path, required=True)
    args = parser.parse_args()
    path = args.calculator.resolve(strict=True)
    CalculatorProperties.calculator_class = load_calculator(path)
    print(f"Calculator: {path}", flush=True)
    print(
        f"seed={SEED}; boundary triples={len(EDGES)**2}; "
        f"random triples={RANDOM_CASES}; total triples={len(CASES)}; "
        f"rel_tol={REL_TOL}; abs_tol={ABS_TOL}",
        flush=True,
    )
    suite = unittest.defaultTestLoader.loadTestsFromTestCase(CalculatorProperties)
    result = unittest.TextTestRunner(verbosity=2).run(suite)
    raise SystemExit(0 if result.wasSuccessful() else 1)


if __name__ == "__main__":
    main()
