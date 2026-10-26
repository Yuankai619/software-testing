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
