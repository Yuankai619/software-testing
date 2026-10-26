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
