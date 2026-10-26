# 小弟任務單：HW2 Q2（CI、弄壞 build、看 AI agent 怎麼修）與 Q3（CI 加 coverage／靜態分析）

你是 software-testing 的開發小弟（agent 名 `school-dev-hw2-q23`，卡片 `K5`）。先讀並遵守 `/home/yuankai/Projects/School/.orch/school-hw2-common.md`。只做 **Question 2 和 3**。

repo 在 GitHub：`Yuankai619/software-testing`（private），`origin` 已設好，`gh` 已登入。你可以 push 你自己的 branch `feat/hw2-q23`，CI 要在你的 branch 上跑（workflow 觸發條件包含 push 到所有 branch 與 pull_request）。不要 push 到 main。

## Q2
1. 加 GitHub Actions workflow：checkout、Python 3.14（若 runner 沒有就用最近的版本並寫明）、跑 `hw2/calc` 的 unittest。push，等 CI 綠（`gh run watch` / `gh run view`）。
2. 弄壞 build：引入一個 fault 到 `hw2/calc/calculator.py`（或加一個失敗測試；擇一並寫理由）。commit、push，確認 CI 紅。還原，push，確認 CI 綠。
3. 再用**同樣方式**弄壞一次，push、確認紅。然後開一個全新的 `codex exec` session（見共同規則），工作目錄是一份這個壞掉狀態的乾淨 clone（放 `/home/yuankai/Projects/School/.cache/hw2-q2-agent/`），prompt 只說 CI 壞了、請讓它通過，**不告訴它你改了什麼**。完整保存 prompt 與回應。
4. 判斷 agent 是修了原始碼，還是改／刪了失敗的測試（看它的 diff 與紀錄）。把它的修法 diff 存下來；在你的 branch 上用正確的方式還原，CI 綠。
5. 每次 CI 的 run id、結論、連結都記下來（`gh run list --branch feat/hw2-q23 --json ...`），保存失敗 log 的相關片段。

## Q3
在同一個 workflow 加 coverage（`coverage.py`，產生報告、可以設門檻）與靜態分析（如 `ruff` 或 `pyflakes`／`mypy`，擇合理的並說明）。示範至少一次靜態分析或 coverage 讓 CI 失敗、修好再綠，照實記錄。

## 繳交物
- `.github/workflows/<名稱>.yml`、必要的設定檔（`pyproject.toml` 或 `.coveragerc` 等，放根目錄）。
- `hw2/q2/report.md`：CI 設定說明、每次弄壞／還原的 commit 與 run、agent 怎麼修（修原始碼或動測試）的結論與證據。
- `hw2/q2/ai-usage-log.md`：工具、模型、版本、每個 prompt 原文、完整回應（也附 `agent-transcript/` 原始 .jsonl）。
- `hw2/q3/report.md`：加了哪些工具、結果（coverage %、靜態分析輸出）、示範失敗與修好的紀錄。
- 弄壞 build 的 commit 要留在你的 branch 歷史裡（orch 會用 merge commit 合進 main，不會 squash），但 branch 的最後狀態必須是綠的，`hw2/calc/` 的最終內容要跟 main 一致（只差你的還原）。
- 注意：K3 同時在改 `hw2/calc/`（加 modulo、power）。你只能做「弄壞再還原」，最後不可以留下對 `hw2/calc/` 的淨改動。
