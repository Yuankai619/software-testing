import unittest

from calculator import Calculator


class TestCalculatorQ6(unittest.TestCase):
    def test_modulo_with_nonzero_divisor(self):
        calc = Calculator()
        for dividend, divisor, expected in (
            (7, 3, 1),
            (3, 7, 3),
            (6, 3, 0),
            (0, 3, 0),
            (-7, 3, 2),
            (7, -3, -2),
            (-7, -3, -1),
        ):
            with self.subTest(dividend=dividend, divisor=divisor):
                self.assertEqual(calc.modulo(dividend, divisor), expected)

    def test_modulo_by_zero_raises_value_error(self):
        calc = Calculator()
        for dividend in (7, -7, 0):
            with self.subTest(dividend=dividend):
                with self.assertRaisesRegex(ValueError, "^Cannot modulo by zero$"):
                    calc.modulo(dividend, 0)
