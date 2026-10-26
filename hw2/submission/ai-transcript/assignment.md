# 小弟任務單：HW2 繳交包收尾與全面審查

你是 software-testing 的開發小弟（agent 名 `school-dev-hw2-final`，卡片 `K6`）。先讀並遵守 `/home/yuankai/Projects/School/.orch/school-hw2-common.md`（「同時在跑的工作」那節已過時：其他 HW2 小弟都做完了，現在只有你）。

## 現況
main 已有 Q1–Q7 全部成果：`hw2/calc/`（最終 Calc＋Q1、Q6 測試）、`hw2/q1/`、`hw2/q2/`、`hw2/q3/`、`hw2/q4/`、`hw2/q5/`、`hw2/q6/`、`hw2/q7/`、`.github/workflows/`。GitHub repo `Yuankai619/software-testing`（private）。

## 任務
1. **全面審查（先做）**：逐題對照 `hw2/requirement.txt` 的每一句要求與「Submit」清單，列出缺漏或與題意不符之處，寫成 `hw2/submission/checklist.md`（每一項：要求原文 → 對應檔案／commit → 狀態）。發現缺漏能補就補（行為改變仍要守 TDD；不可以改寫歷史、不可以改已 commit 的 Q1／Q6 測試）；補不了的寫清楚原因。也檢查各報告之間有沒有互相矛盾、有沒有不實陳述（例如聲稱有人類參與但實際沒有），有就改成照實。
2. **截圖**：在 `hw2/calc` 跑全部測試（`python3 -m unittest -v`，以及 CI 同款的 coverage／ruff 指令），把真實終端輸出做成 PNG：用 HTML 呈現終端輸出後以 `google-chrome --headless --screenshot` 截圖，存 `hw2/submission/all-tests-pass.png`。再附一張 GitHub Actions main 最新一次綠燈的證據（`gh run view` 輸出截圖成 PNG，或文字檔＋run 連結）。截圖內容必須是真實執行結果。
3. **git log**：`hw2/submission/git-log.txt`（`git log --graph --oneline --decorate --all`）與 `git-log-full.txt`（`git log --stat main`）。
4. **總報告**：`hw2/submission/README.md`（英文）：每題一節的摘要與連到各題詳細檔案的連結；所有測試清單位置；最終 Calc；AI 使用說明總表（每題用了什麼工具、模型、版本、在哪個 log）。再用 Chrome headless 把 README 加上各題主要文件（Q1 narrative、Q2/Q3/Q4/Q5/Q7 report、Q6 narrative、AI usage logs、最終程式碼與測試）合併轉成一份 `hw2/submission/HW2-report.pdf`，方便上傳。
5. 完成後 push 你的 branch，CI 綠，回報 done。

## 不做
不改 Q1–Q7 已經 commit 的實驗結果（只能補充說明或修正明顯錯字與不實陳述，修正要在 checklist 記錄）。
