"""Re-run the frozen Q1 tests, the properties, and the sensitivity probes."""

from pathlib import Path
import shlex
import subprocess
import sys


Q7 = Path(__file__).resolve().parents[1]
ROOT = Q7.parents[1]
EVIDENCE = Q7 / "evidence"


def record(name, command):
    result = subprocess.run(command, cwd=ROOT, text=True, stdout=subprocess.PIPE,
                            stderr=subprocess.STDOUT, check=False)
    log = (
        f"$ {shlex.join(command)}\nWorking directory: {ROOT}\n\n"
        f"{result.stdout}\nExit code: {result.returncode}\n"
    )
    (EVIDENCE / name).write_text(log)
    print(f"{name}: exit {result.returncode}", flush=True)
    return result.returncode == 0


def main():
    passed = True
    for name, calculator in (
        ("agent", Q7 / "agent_calc/calculator.py"),
        ("main", ROOT / "hw2/calc/calculator.py"),
    ):
        # Run the frozen tests against one explicit calculator directory.
        q1_command = [
            sys.executable, "-B", "-c",
            "import runpy, sys; sys.path.insert(0, sys.argv.pop(1)); "
            "sys.argv[0] = sys.argv.pop(1); "
            "runpy.run_path(sys.argv[0], run_name='__main__')",
            str(calculator.parent), str(EVIDENCE / "q1_test_calculator.py"), "-v",
        ]
        passed = record(f"q1-{name}.txt", q1_command) and passed
        passed = record(
            f"properties-{name}.txt",
            [sys.executable, "-B", str(Q7 / "test_properties.py"),
             "--calculator", str(calculator)],
        ) and passed
    passed = record(
        "sensitivity.txt", [sys.executable, "-B", str(EVIDENCE / "check_sensitivity.py")]
    ) and passed
    raise SystemExit(0 if passed else 1)


if __name__ == "__main__":
    main()
