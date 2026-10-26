# 小弟任務單：HW2 Q7，只給測試讓新 agent 寫 Calc，再用 property／metamorphic 測試檢查

你是 software-testing 的開發小弟（agent 名 `school-dev-hw2-q7`，卡片 `K4`）。先讀並遵守 `/home/yuankai/Projects/School/.orch/school-hw2-common.md`。只做 **Question 7**。

## 做法
1. 建一個乾淨的工作目錄 `/home/yuankai/Projects/School/.cache/hw2-q7-agent/`，只放 Q1 的 `test_calculator.py`（從 main 複製，**不要**放 calculator.py、narrative 或 git 歷史）。
2. 開一個全新的 `codex exec` session（見共同規則），工作目錄就是那裡，prompt 只說「寫一個 calculator.py 讓這些測試全部通過」。完整保存 prompt 與回應。
3. 把它寫的 `calculator.py` 存到 `hw2/q7/agent_calc/calculator.py`，跑 Q1 測試確認結果（照實記錄通過與否）。
4. 分析：它有沒有針對測試輸入特判（硬寫輸入→輸出、只對特定值成立等）。逐個函式說明證據。
5. 寫 property-based 或 metamorphic 測試，不寫死期望值，例如 `subtract(add(a, b), b) == a`、乘法交換律／分配律、`divide(multiply(a, b), b) == a`（b ≠ 0，注意浮點誤差的容許範圍）、除以 0 一律 ValueError。可以用 `hypothesis`（裝在 `.cache` 的 venv，不改全域環境）或標準庫 `random` 加固定 seed；說明你選哪個與原因。
6. 這些測試同時跑在 agent 的 Calc 與 main 上我們自己的 Calc（`hw2/calc/calculator.py`），保存真實輸出，報告有沒有暴露問題（沒有也照實寫，並說明測試的強度）。

## 繳交物（`hw2/q7/`）
`agent_calc/calculator.py`、`test_properties.py`（可對兩份 Calc 跑，例如用環境變數或參數選擇）、`evidence/`、`agent-transcript/`（prompt 原文＋完整回應）、`report.md`（回答題目的兩個問題）。不要改 `hw2/calc/`。
