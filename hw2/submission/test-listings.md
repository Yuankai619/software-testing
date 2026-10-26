# Complete final code and authored test listings

These are literal file contents at finalization. Executable files remain authoritative. Q4 golden data are included. The Q5 independent agent test is preserved as the exact patch hunk, including its upstream context. Existing targeted upstream tests are identified by pinned source and commands in the Q4/Q5 reports; their full upstream suites are not copied.

## hw2/calc/calculator.py

[Authoritative file](../../hw2/calc/calculator.py)

````python
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

    def modulo(self, a, b):
        if b == 0:
            raise ValueError("Cannot modulo by zero")
        return a % b

    def power(self, a, b):
        if a == 0 and b < 0:
            raise ValueError("Cannot raise zero to a negative power")
        return a ** b
````

## hw2/calc/test_calculator.py

[Authoritative file](../../hw2/calc/test_calculator.py)

````python
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
````

## hw2/calc/test_calculator_q6.py

[Authoritative file](../../hw2/calc/test_calculator_q6.py)

````python
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
````

## hw2/q4/tests/test_digest_characterization.py

[Authoritative file](../../hw2/q4/tests/test_digest_characterization.py)

````python
"""Golden behavior captured before changing Requests' digest implementation.

No network access: pin time and randomness, then compare entire public headers
and the nonce state after each call. See digest_golden.json for all 29 cases.
"""
import json
from pathlib import Path
import unittest
from unittest.mock import patch

from requests.auth import HTTPDigestAuth


class DigestCharacterization(unittest.TestCase):
    pass


def make_test(case):
    def test(self):
        auth = HTTPDigestAuth(case.get('username', 'user'), case.get('password', 'pass'))
        auth.init_per_thread_state()
        challenge = {'realm': case.get('realm', 'realm'), 'nonce': 'nonce-A'}
        for key in ('algorithm', 'qop', 'opaque'):
            if case.get(key) is not None:
                challenge[key] = case[key]
        auth._thread_local.chal = challenge
        with patch('requests.auth.os.urandom', return_value=b'12345678'), patch(
            'requests.auth.time.ctime', return_value='Mon Jan 01 00:00:00 2024'
        ):
            for nonce, expected in zip(case.get('nonces', ['nonce-A']), case['observations'], strict=True):
                challenge['nonce'] = nonce
                with self.subTest(nonce=nonce):
                    actual = auth.build_digest_header(
                        case.get('method', 'GET'),
                        case.get('url', 'https://example.test/resource?x=1'),
                    )
                    self.assertEqual(actual, expected['header'])
                    self.assertEqual(auth._thread_local.nonce_count, expected['nonce_count'])
                    self.assertEqual(auth._thread_local.last_nonce, expected['last_nonce'])
    return test


for index, case in enumerate(json.loads(Path(__file__).with_name('digest_golden.json').read_text())):
    setattr(DigestCharacterization, f'test_{index:02d}_{case["name"].replace("-", "_")}', make_test(case))


if __name__ == '__main__':
    unittest.main()
````

## hw2/q4/tests/digest_golden.json

[Authoritative file](../../hw2/q4/tests/digest_golden.json)

````json
[
  {
    "name": "default-no-qop",
    "algorithm": null,
    "qop": null,
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"85f29767730492c5fa9ded4693d75fb1\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "default-auth",
    "algorithm": null,
    "qop": "auth",
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"ab14cb9a0672a8a3eeafaab8a27f4e7e\", qop=\"auth\", nc=00000001, cnonce=\"ed5756984632fb8c\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "default-auth-int,auth",
    "algorithm": null,
    "qop": "auth-int,auth",
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"ab14cb9a0672a8a3eeafaab8a27f4e7e\", qop=\"auth\", nc=00000001, cnonce=\"ed5756984632fb8c\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "MD5-no-qop",
    "algorithm": "MD5",
    "qop": null,
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"85f29767730492c5fa9ded4693d75fb1\", algorithm=\"MD5\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "MD5-auth",
    "algorithm": "MD5",
    "qop": "auth",
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"ab14cb9a0672a8a3eeafaab8a27f4e7e\", algorithm=\"MD5\", qop=\"auth\", nc=00000001, cnonce=\"ed5756984632fb8c\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "MD5-auth-int,auth",
    "algorithm": "MD5",
    "qop": "auth-int,auth",
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"ab14cb9a0672a8a3eeafaab8a27f4e7e\", algorithm=\"MD5\", qop=\"auth\", nc=00000001, cnonce=\"ed5756984632fb8c\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "md5-sess-no-qop",
    "algorithm": "md5-sess",
    "qop": null,
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"2e1d59fbb684735da7ca30b528838500\", algorithm=\"md5-sess\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "md5-sess-auth",
    "algorithm": "md5-sess",
    "qop": "auth",
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"dfcab53f7b5275c9d322f61a6c32fe8b\", algorithm=\"md5-sess\", qop=\"auth\", nc=00000001, cnonce=\"ed5756984632fb8c\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "md5-sess-auth-int,auth",
    "algorithm": "md5-sess",
    "qop": "auth-int,auth",
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"dfcab53f7b5275c9d322f61a6c32fe8b\", algorithm=\"md5-sess\", qop=\"auth\", nc=00000001, cnonce=\"ed5756984632fb8c\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "SHA-no-qop",
    "algorithm": "SHA",
    "qop": null,
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"b5b36acf88f8fe8d392635a2bc886113356c2d71\", algorithm=\"SHA\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "SHA-auth",
    "algorithm": "SHA",
    "qop": "auth",
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"ca9135f8276cdd80659d3c50eaafe9dd4e074284\", algorithm=\"SHA\", qop=\"auth\", nc=00000001, cnonce=\"ed5756984632fb8c\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "SHA-auth-int,auth",
    "algorithm": "SHA",
    "qop": "auth-int,auth",
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"ca9135f8276cdd80659d3c50eaafe9dd4e074284\", algorithm=\"SHA\", qop=\"auth\", nc=00000001, cnonce=\"ed5756984632fb8c\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "sha-256-no-qop",
    "algorithm": "sha-256",
    "qop": null,
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"7e5be2af329c564357f31dc4c1a981f4b1fa8be8acecb743cb6c13deebeeb4dd\", algorithm=\"sha-256\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "sha-256-auth",
    "algorithm": "sha-256",
    "qop": "auth",
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"53c03852164d1457f0eda6570b1dc1709c870c009a138c8f6ee357caa9e91588\", algorithm=\"sha-256\", qop=\"auth\", nc=00000001, cnonce=\"ed5756984632fb8c\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "sha-256-auth-int,auth",
    "algorithm": "sha-256",
    "qop": "auth-int,auth",
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"53c03852164d1457f0eda6570b1dc1709c870c009a138c8f6ee357caa9e91588\", algorithm=\"sha-256\", qop=\"auth\", nc=00000001, cnonce=\"ed5756984632fb8c\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "SHA-512-no-qop",
    "algorithm": "SHA-512",
    "qop": null,
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"7f090009e35d7f4a2c049459270ed03271dbecb7500f3c0663f07f3e3e1471c21378c98da3522cb116b55a9c2584f0b237ecca5ab80876be7985a4fb5fafbb25\", algorithm=\"SHA-512\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "SHA-512-auth",
    "algorithm": "SHA-512",
    "qop": "auth",
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"f8dcf4560c5c6401e90b01327a7edd48fd19d23e104c4886c8f0df77c6630d11ccfb4feb3f8b943a1f0ca71e14d5133331a729850dfbc0c80704cfbb3f30c956\", algorithm=\"SHA-512\", qop=\"auth\", nc=00000001, cnonce=\"ed5756984632fb8c\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "SHA-512-auth-int,auth",
    "algorithm": "SHA-512",
    "qop": "auth-int,auth",
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"f8dcf4560c5c6401e90b01327a7edd48fd19d23e104c4886c8f0df77c6630d11ccfb4feb3f8b943a1f0ca71e14d5133331a729850dfbc0c80704cfbb3f30c956\", algorithm=\"SHA-512\", qop=\"auth\", nc=00000001, cnonce=\"ed5756984632fb8c\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "unicode-credentials",
    "algorithm": "SHA-256",
    "qop": "auth",
    "username": "用戶",
    "password": "päss密碼",
    "realm": "réalm",
    "observations": [
      {
        "header": "Digest username=\"用戶\", realm=\"réalm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"952c05d1291b90e89685868d191707ae7683cdfd971661e8f127638cca318ba9\", algorithm=\"SHA-256\", qop=\"auth\", nc=00000001, cnonce=\"ed5756984632fb8c\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "empty-path-query-fragment",
    "algorithm": "MD5",
    "qop": "auth",
    "url": "https://example.test?x=1#ignored",
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/?x=1\", response=\"0c1720c9e985815fb31a9cdfac1bc4da\", algorithm=\"MD5\", qop=\"auth\", nc=00000001, cnonce=\"ed5756984632fb8c\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "empty-qop",
    "algorithm": "MD5",
    "qop": "",
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"85f29767730492c5fa9ded4693d75fb1\", algorithm=\"MD5\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "opaque",
    "algorithm": "MD5",
    "qop": "auth",
    "opaque": "opaque-token",
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"ab14cb9a0672a8a3eeafaab8a27f4e7e\", opaque=\"opaque-token\", algorithm=\"MD5\", qop=\"auth\", nc=00000001, cnonce=\"ed5756984632fb8c\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "empty-algorithm",
    "algorithm": "",
    "qop": "auth",
    "observations": [
      {
        "header": null,
        "nonce_count": 0,
        "last_nonce": ""
      }
    ]
  },
  {
    "name": "unknown-algorithm",
    "algorithm": "SHA-999",
    "qop": "auth",
    "observations": [
      {
        "header": null,
        "nonce_count": 0,
        "last_nonce": ""
      }
    ]
  },
  {
    "name": "qop-auth-int-only",
    "algorithm": "MD5",
    "qop": "auth-int",
    "observations": [
      {
        "header": null,
        "nonce_count": 1,
        "last_nonce": ""
      }
    ]
  },
  {
    "name": "qop-space-not-trimmed",
    "algorithm": "MD5",
    "qop": "auth-int, auth",
    "observations": [
      {
        "header": null,
        "nonce_count": 1,
        "last_nonce": ""
      }
    ]
  },
  {
    "name": "same-then-new-nonce",
    "algorithm": "MD5",
    "qop": "auth",
    "nonces": [
      "nonce-A",
      "nonce-A",
      "nonce-B"
    ],
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"ab14cb9a0672a8a3eeafaab8a27f4e7e\", algorithm=\"MD5\", qop=\"auth\", nc=00000001, cnonce=\"ed5756984632fb8c\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      },
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"80ce84547a8e4a53fb311d96ddfa657b\", algorithm=\"MD5\", qop=\"auth\", nc=00000002, cnonce=\"f3560d1c741957fb\"",
        "nonce_count": 2,
        "last_nonce": "nonce-A"
      },
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-B\", uri=\"/resource?x=1\", response=\"f8705e7da15c0fb38adfed07a26e849f\", algorithm=\"MD5\", qop=\"auth\", nc=00000001, cnonce=\"bf990eaae2eeac00\"",
        "nonce_count": 1,
        "last_nonce": "nonce-B"
      }
    ]
  },
  {
    "name": "md5-sess-without-qop",
    "algorithm": "MD5-SESS",
    "qop": null,
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/resource?x=1\", response=\"2e1d59fbb684735da7ca30b528838500\", algorithm=\"MD5-SESS\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  },
  {
    "name": "post-with-query",
    "algorithm": "SHA-512",
    "qop": "auth",
    "method": "POST",
    "url": "http://example.test/a/b?x=1&x=2#fragment",
    "observations": [
      {
        "header": "Digest username=\"user\", realm=\"realm\", nonce=\"nonce-A\", uri=\"/a/b?x=1&x=2\", response=\"6184a76f58e67ec03a21d135997498978ff5989ec195508b6a065dd4c503c510eddcfff3ed6ab0ac213d76cbbec21df7311b5a9a37849731596789c928604b5f\", algorithm=\"SHA-512\", qop=\"auth\", nc=00000001, cnonce=\"ed5756984632fb8c\"",
        "nonce_count": 1,
        "last_nonce": "nonce-A"
      }
    ]
  }
]
````

## hw2/q5/tests/test_json_exception_pickle.py

[Authoritative file](../../hw2/q5/tests/test_json_exception_pickle.py)

````python
"""Regression tests for Requests issue #6628; no HTTP server is needed."""
from concurrent.futures import ProcessPoolExecutor
import copy
import multiprocessing
import pickle
import unittest

from requests import Response
from requests.compat import JSONDecodeError as BackendJSONDecodeError
from requests.exceptions import JSONDecodeError, RequestException


def decode_invalid_json():
    """A top-level function so the spawn multiprocessing context can import it."""
    response = Response()
    response.status_code = 200
    response.encoding = 'utf-8'
    response._content = b'{"answer":}'
    return response.json()


class JSONDecodeErrorPickleTests(unittest.TestCase):
    def assert_same_json_error(self, original, restored):
        self.assertIs(type(restored), JSONDecodeError)
        self.assertIsInstance(restored, RequestException)
        self.assertIsInstance(restored, BackendJSONDecodeError)
        for field in ('msg', 'doc', 'pos', 'lineno', 'colno', 'args'):
            self.assertEqual(getattr(restored, field), getattr(original, field), field)
        self.assertEqual(str(restored), str(original))

    def round_trip(self, error, protocol):
        try:
            return pickle.loads(pickle.dumps(error, protocol=protocol))
        except TypeError as error:
            self.fail(f'JSON exception could not be deserialized: {error}')

    def test_response_errors_round_trip_all_pickle_protocols(self):
        for body in (b'{"answer":}', b'{}{}', '{\n"資料": }'.encode()):
            response = Response()
            response.encoding = 'utf-8'
            response._content = body
            with self.assertRaises(JSONDecodeError) as caught:
                response.json()
            for protocol in range(pickle.HIGHEST_PROTOCOL + 1):
                with self.subTest(body=body, protocol=protocol):
                    self.assert_same_json_error(caught.exception, self.round_trip(caught.exception, protocol))

    def test_direct_constructor_round_trip(self):
        original = JSONDecodeError('invalid value', '{\n"資料": }', 8)
        self.assert_same_json_error(original, self.round_trip(original, pickle.HIGHEST_PROTOCOL))

    def test_deepcopy_uses_compatible_reconstruction(self):
        original = JSONDecodeError('invalid value', '{\n"資料": }', 8)
        try:
            restored = copy.deepcopy(original)
        except TypeError as error:
            self.fail(f'JSON exception could not be copied: {error}')
        self.assert_same_json_error(original, restored)

    def test_current_error_metadata_and_catch_hierarchy(self):
        original = JSONDecodeError('invalid value', '{\n"資料": }', 8)
        self.assertIsInstance(original, RequestException)
        self.assertIsInstance(original, BackendJSONDecodeError)
        self.assertEqual((original.msg, original.doc, original.pos), ('invalid value', '{\n"資料": }', 8))
        self.assertEqual((original.lineno, original.colno), (2, 7))

    def test_valid_json_is_unchanged(self):
        response = Response()
        response._content = b'{"answer": 42}'
        self.assertEqual(response.json(), {'answer': 42})

    def test_worker_exception_does_not_break_process_pool(self):
        with ProcessPoolExecutor(max_workers=1, mp_context=multiprocessing.get_context('spawn')) as pool:
            with self.assertRaises(JSONDecodeError) as caught:
                pool.submit(decode_invalid_json).result(timeout=20)
            self.assertEqual(caught.exception.doc, '{"answer":}')
            self.assertEqual(caught.exception.pos, 10)
            self.assertEqual(pool.submit(abs, -7).result(timeout=20), 7)


if __name__ == '__main__':
    unittest.main()
````

## hw2/q7/test_properties.py

[Authoritative file](../../hw2/q7/test_properties.py)

````python
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
````

## hw2/q7/evidence/q1_test_calculator.py

[Authoritative file](../../hw2/q7/evidence/q1_test_calculator.py)

````python
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
````

## hw2/q7/evidence/check_sensitivity.py

[Authoritative file](../../hw2/q7/evidence/check_sensitivity.py)

````python
"""Confirm that the properties reject four implementations that still pass Q1.

Each deliberate mutant uses the generated implementation for Q1-sized inputs,
but returns zero from one operation when abs(a) > 7. These are validation probes,
not defects observed in either submitted implementation.
"""

import importlib.util
from pathlib import Path
import sys
from types import ModuleType
import unittest


Q7 = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(Q7))
from test_properties import CalculatorProperties, load_calculator  # noqa: E402


def main():
    baseline = load_calculator(Q7 / "agent_calc/calculator.py")
    spec = importlib.util.spec_from_file_location(
        "q7_frozen_q1_tests", Q7 / "evidence/q1_test_calculator.py"
    )
    q1 = importlib.util.module_from_spec(spec)
    original_import = sys.modules.get("calculator")
    calculator_module = ModuleType("calculator")
    calculator_module.Calculator = baseline
    sys.modules["calculator"] = calculator_module
    try:
        spec.loader.exec_module(q1)
    finally:
        if original_import is None:
            del sys.modules["calculator"]
        else:
            sys.modules["calculator"] = original_import

    for operation in ("add", "subtract", "multiply", "divide"):
        original = getattr(baseline, operation)

        def faulty(self, a, b, original=original):
            return 0 if abs(a) > 7 else original(self, a, b)

        mutant = type(f"Faulty_{operation}", (baseline,), {operation: faulty})
        q1.Calculator = mutant
        q1_result = unittest.TestResult()
        unittest.defaultTestLoader.loadTestsFromModule(q1).run(q1_result)
        properties = type(
            f"Properties_{operation}", (CalculatorProperties,), {"calculator_class": mutant}
        )
        property_result = unittest.TestResult()
        unittest.defaultTestLoader.loadTestsFromTestCase(properties).run(property_result)
        print(
            f"{operation}: Q1 tests={q1_result.testsRun}, "
            f"failures={len(q1_result.failures)}, errors={len(q1_result.errors)}; "
            f"property methods={property_result.testsRun}, "
            f"failing subtests={len(property_result.failures)}, "
            f"errors={len(property_result.errors)}",
            flush=True,
        )
        if not q1_result.wasSuccessful() or property_result.wasSuccessful():
            raise SystemExit(f"Unexpected sensitivity result for {operation}")
    print("All four deliberate Q1-passing mutants were rejected by the properties.")


if __name__ == "__main__":
    main()
````

## hw2/q7/agent_calc/calculator.py

[Authoritative file](../../hw2/q7/agent_calc/calculator.py)

````python
class Calculator:
    """Provide basic arithmetic operations."""

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
````

## Q5 independent agent: added upstream regression test

[Complete source-and-test patch](../q5/agent-fix.patch)

```diff
diff --git a/tests/test_requests.py b/tests/test_requests.py
index 34796dc7..eb8628e9 100644
--- a/tests/test_requests.py
+++ b/tests/test_requests.py
@@ -2796,6 +2796,26 @@ class TestPreparingURLs:
             r.json()
         assert excinfo.value.doc == r.text
 
+    @pytest.mark.parametrize("protocol", range(pickle.HIGHEST_PROTOCOL + 1))
+    @pytest.mark.parametrize("encoding", [None, "utf-8"])
+    def test_json_decode_error_is_pickleable(self, protocol, encoding):
+        r = requests.Response()
+        r._content = b'{"value":\n invalid}'
+        r.encoding = encoding
+        with pytest.raises(requests.exceptions.JSONDecodeError) as excinfo:
+            r.json()
+
+        original = excinfo.value
+        restored = pickle.loads(pickle.dumps(original, protocol=protocol))
+
+        assert type(restored) is requests.exceptions.JSONDecodeError
+        assert isinstance(restored, RequestException)
+        assert isinstance(restored, JSONDecodeError)
+        assert restored.args == original.args
+        assert str(restored) == str(original)
+        for attr in ("msg", "doc", "pos", "lineno", "colno"):
+            assert getattr(restored, attr) == getattr(original, attr)
+
     def test_status_code_425(self):
         r1 = requests.codes.get("TOO_EARLY")
         r2 = requests.codes.get("too_early")
```
