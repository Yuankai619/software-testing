"""python3 reproduce.py CACHED_REQUESTS PYTHON [SIMPLEJSON_PYTHON].

All clones and upstream test execution stay beside the cached upstream source.
Python needs Requests dependencies, pytest, and pytest-httpbin (see report.md).
"""
import os
from pathlib import Path
import subprocess
import sys
import tempfile

BASE = '7a13c041dbef42f9f3feb14110f02626f6892e9a'
HERE = Path(__file__).resolve().parent


def run(source, command, expected=0, marker=None):
    env = dict(os.environ, PYTHONPATH=str(source / 'src'), PYTEST_DISABLE_PLUGIN_AUTOLOAD='1')
    print(f'\nSource: {source} at {BASE}\nCommand: {command!r}', flush=True)
    result = subprocess.run(command, cwd=source, env=env, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    print(result.stdout, end='', flush=True)
    print(f'Exit code: {result.returncode}; expected: {expected}', flush=True)
    if result.returncode != expected or (marker and marker not in result.stdout):
        raise SystemExit('Unexpected verification result')


def main():
    upstream = Path(sys.argv[1]).resolve()
    pythons = [str(Path(p).absolute()) for p in sys.argv[2:]]
    root = Path(tempfile.mkdtemp(prefix='q5-verify-', dir=upstream.parent))
    for variant in ('original', 'my', 'agent'):
        source = root / variant
        subprocess.run(['git', 'clone', '--quiet', '--no-hardlinks', str(upstream), str(source)], check=True)
        subprocess.run(['git', '-C', str(source), 'checkout', '--quiet', '--detach', BASE], check=True)
        if variant != 'original':
            patch = HERE / f'{variant}-fix.patch'
            subprocess.run(['git', 'apply', '--check', str(patch)], cwd=source, check=True)
            subprocess.run(['git', 'apply', str(patch)], cwd=source, check=True)
        for python in pythons:
            run(source, [python, '-c', 'import sys, requests; from requests.compat import JSONDecodeError; print(sys.version); print(requests.__file__); print(JSONDecodeError.__module__)'])
            run(source, [python, '-m', 'unittest', 'discover', '-s', str(HERE / 'tests'), '-v'],
                expected=1 if variant == 'original' else 0,
                marker='missing 2 required positional arguments' if variant == 'original' else 'OK')
        if variant == 'original':
            # Apply only the agent's added test, leaving the faulty source intact.
            patch = (HERE / 'agent-fix.patch').read_text()
            test_patch = patch[patch.index('diff --git a/tests/'):]
            subprocess.run(['git', 'apply', '-'], cwd=source, input=test_patch, text=True, check=True)
            run(source, [pythons[0], '-m', 'pytest', 'tests/test_requests.py', '-k', 'test_json_decode_error_is_pickleable', '-q', '-o', 'addopts='],
                expected=1, marker='12 failed')
        else:
            run(source, [pythons[0], '-m', 'pytest', '-p', 'pytest_httpbin.plugin', 'tests/test_requests.py', 'tests/test_lowlevel.py', '-k', 'json or pickle', '-q', '-o', 'addopts='])
            subprocess.run(['git', 'diff', '--check'], cwd=source, check=True)
    print('Q5: original fails as expected; both independent repairs pass.', flush=True)


if __name__ == '__main__':
    main()
