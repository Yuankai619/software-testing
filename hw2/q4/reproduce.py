"""Run from anywhere: python3 reproduce.py CACHED_REQUESTS PYTHON_EXECUTABLE.

Creates a disposable clone beside the cached source; never modifies the input.
The supplied Python needs Requests' dependencies and pytest installed.
"""
import os
from pathlib import Path
import subprocess
import sys
import tempfile

BASE = '7a13c041dbef42f9f3feb14110f02626f6892e9a'
HERE = Path(__file__).resolve().parent


def main():
    upstream = Path(sys.argv[1]).resolve()
    python = str(Path(sys.argv[2]).absolute())
    scratch = Path(tempfile.mkdtemp(prefix='q4-verify-', dir=upstream.parent)) / 'requests'
    subprocess.run(['git', 'clone', '--quiet', '--no-hardlinks', str(upstream), str(scratch)], check=True)
    subprocess.run(['git', '-C', str(scratch), 'checkout', '--quiet', '--detach', BASE], check=True)
    env = dict(os.environ, PYTHONPATH=str(scratch / 'src'), PYTEST_DISABLE_PLUGIN_AUTOLOAD='1')
    for phase in ('before', 'after'):
        print(f'\n{phase}: {scratch} at {BASE}', flush=True)
        for command in (
            [python, '-m', 'unittest', 'discover', '-s', str(HERE / 'tests'), '-v'],
            [python, '-m', 'pytest', 'tests/test_lowlevel.py', '-k', 'digest', '-q', '-o', 'addopts='],
        ):
            print(f'Command: {command!r}', flush=True)
            subprocess.run(command, cwd=scratch, env=env, check=True)
        if phase == 'before':
            subprocess.run(['git', 'apply', '--check', str(HERE / 'refactor.patch')], cwd=scratch, check=True)
            subprocess.run(['git', 'apply', str(HERE / 'refactor.patch')], cwd=scratch, check=True)
    subprocess.run(['git', 'diff', '--check'], cwd=scratch, check=True)
    print('Q4: original and refactored behavior agree; upstream digest tests pass.', flush=True)


if __name__ == '__main__':
    main()
