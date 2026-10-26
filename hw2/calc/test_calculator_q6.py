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

    def test_power_zero_base_negative_exponent_raises_value_error(self):
        calc = Calculator()
        for exponent in (-1, -2, -5):
            with self.subTest(exponent=exponent):
                with self.assertRaisesRegex(
                    ValueError, "^Cannot raise zero to a negative power$"
                ):
                    calc.power(0, exponent)

    def test_power_valid_integer_operands(self):
        calc = Calculator()
        for base, exponent, expected in (
            (2, 3, 8),
            (3, 4, 81),
            (5, 1, 5),
            (-2, 3, -8),
            (-2, 4, 16),
            (0, 3, 0),
            (5, 0, 1),
            (-5, 0, 1),
            (0, 0, 1),
            (2, -1, 0.5),
            (2, -3, 0.125),
            (-2, -3, -0.125),
            (-2, -2, 0.25),
            (1, -4, 1.0),
        ):
            with self.subTest(base=base, exponent=exponent):
                result = calc.power(base, exponent)
                self.assertEqual(result, expected)
                if exponent < 0:
                    self.assertIsInstance(result, float)
