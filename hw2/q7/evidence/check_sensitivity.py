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
