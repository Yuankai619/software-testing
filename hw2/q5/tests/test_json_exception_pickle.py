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
