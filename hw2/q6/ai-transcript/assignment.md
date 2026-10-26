# 小弟任務單：HW2 Q6，Agentic TDD 加上 modulo 與 power

你是 software-testing 的開發小弟（agent 名 `school-dev-hw2-q6`，卡片 `K3`）。先讀並遵守 `/home/yuankai/Projects/School/.orch/school-hw2-common.md`。只做 **Question 6**。

## 角色
- **你 = 題目裡的「You」（審查者＋commit 的人）**。使用者決定由 codex 擔任審查者，就是你。
- **AI coding agent = 另一個全新的 `codex exec` session**（見共同規則）。測試和實作都由它寫，你不親手寫測試或實作；你只下 prompt、審、commit、記錄。整題用同一個 session，用 `resume` 接續，讓它像真的 coding agent 一樣有前後文。

## 每個 cycle
1. 請 agent 寫**一個**失敗測試（只寫測試，不准實作）。
2. 跑測試，保存真實失敗輸出到 `hw2/q6/evidence/cycle-<N>-red.txt`（必須在該行為任何實作存在之前）。
3. 你審這個測試：寫下審查意見（是否符合 hw2-decisions.md 的行為決定、是否只測一件事、是否夠強）。要改就請 agent 改，再審。
4. 審過後**你**commit 這個測試（`test: cycle N ...`）。
5. 請 agent 實作讓它通過；它不可以改已 commit 的測試，除非你核准並記錄原因。保存 green 輸出；**另一個** commit（`feat: cycle N ...`）。有 refactor 就再一個 commit。
6. 檢查 agent 有沒有違規：先寫實作、一次寫多個測試、改弱或刪掉測試、動到已 commit 的測試、沒問就自己決定行為等。照實記錄，沒有就寫沒有。

## (c) 的決定一定要在實作前就有測試
照 hw2-decisions.md：負數 modulo（`modulo(-7, 3) == 2`、`modulo(7, -3) == -2`）、modulo 除以 0 丟 ValueError、`power(0, 0) == 1`、負指數回傳 float（`power(2, -1) == 0.5`）、`power(0, 負數)` 丟 ValueError。第一個 prompt **不要**把這些決定告訴 agent，先觀察它自己會怎麼定（這是題目要報告的「agent 沒問你就做的決定」）；它定的和決定不同時，在審查時要求改並記錄。它若有先問你，照決定回答並記錄它有問。

## 繳交物（`hw2/q6/`）
- `narrative.md`：每個 cycle 的測試、你的審查意見、agent 做的改動、refactor；**Rule violations** 一節（每次違規、怎麼發現、怎麼處理）；**Decisions the agent made without asking** 一節（對照 (c) 四項逐一寫）；最後附完整測試清單、最終 Calc、`git log --oneline`（要看得出 test commit 在 feat commit 之前）。審查者照實寫是 codex（`codex --version` 與模型）。
- `evidence/`：每個 cycle 的 red／green 輸出。
- `agent-transcript/`：agent session 的完整 .jsonl 與整理後的 .md（每個 prompt 原文＋完整回應）。
- 最終程式在 `hw2/calc/`（Q1 的測試不可改）。
