# HW2 小弟共同規則（每份 HW2 任務單都要照這份）

回覆用繁體中文；程式碼、commit、繳交文件用英文。先讀 `hw2/requirement.txt`（題目全文）與 `/home/yuankai/Projects/School/.orch/hw2-decisions.md`（使用者的決定，一定照做）。目標是那一題拿滿分，內容必須照實：沒發生的事不寫，agent 的違規與自作主張照實記錄。

## 開工
1. 確認你在自己的 worktree、自己的 branch：
   `[ "$(git rev-parse --path-format=absolute --git-dir)" != "$(git rev-parse --path-format=absolute --git-common-dir)" ] && git symbolic-ref --short HEAD`
   要印出你的 branch。沒印出來就什麼都不要改，回報 `blocked` 等 orch。
2. Q1 已在 main：`hw2/calc/calculator.py`、`hw2/calc/test_calculator.py`（跑法 `cd hw2/calc && python3 -m unittest -v`），敘述在 `hw2/q1/narrative.md`。
3. 不要 commit `__pycache__/`（需要的話在 repo 根目錄加 `.gitignore`）。

## 在作業裡「再叫一個 AI coding agent」
題目要你另外用 AI agent 時，用全新的 headless session，不帶你的 context：
`CODEX_HOME=/home/yuankai/.codex-c codex exec --json -C <工作目錄> "<prompt>"`（接續同一個 session 用 `codex exec resume <session id>`）。
每次都完整保存：工具名稱、模型、版本（`codex --version`）、prompt 原文、agent 的完整回應（含它跑的指令與輸出；`--json` 的原始輸出存成 .jsonl，另外整理成可讀的 .md）。

## 流程（每一步做完都回報）
1. 開發。
2. Code review 一輪：`codex review --base main`。逐條判斷，成立就修，不成立記理由。
3. 自我精簡：繳交文件清楚、不灌水。
4. Security 自審：簡短寫在 `.orch/status.md`（log、輸出裡不能有 token）。
5. 全部測試跑一次，回報 done（`--result` 填 branch 名與 worktree 絕對路徑）。
可以 push 你自己的 feature branch（不 force-push、不碰 main 與別人的 branch）；不開 PR，orch 會自己 merge。

## 回報（orch 只靠這個知道你做到哪）
```
/home/yuankai/.claude/skills/orch/scripts/report.sh <stage|blocked|question|done> "<白話一句>" --card <CARD> [--stage dev] [--result <路徑>] [--needs 決定|看|無]
```
做完一定要寫 `done`。白話一句要讓人一眼看懂。在你自己的 worktree 維護 `.orch/status.md`（`stage:`、`summary:`，加 `## log`）；`.orch/` 不 commit。

## 提問
要決定的事：寫進 worktree 的 `.orch/questions.md`（問題／選 A／選 B／我建議），跑 `report.sh question "<一句話>" --card <CARD>`，結束這一輪等 orch。小事自己判斷，記在 log。

## 先問，不要自己做
- merge、push 到 main、打 tag、force-push
- 在 GitHub 或任何外部服務留言、開 issue／PR、發訊息；刪除 repo 以外的東西
- 不 commit、不印出密鑰與 token
- 額度用完：回報 `blocked "額度用完"`，orch 會幫你換帳號

## 同時在跑的 HW2 工作（不要動別人的資料夾）
- K2 `school-dev-hw2-q45`：`hw2/q4/`、`hw2/q5/`
- K3 `school-dev-hw2-q6`：`hw2/calc/`（加 modulo、power）、`hw2/q6/`
- K4 `school-dev-hw2-q7`：`hw2/q7/`（只讀 `hw2/calc/test_calculator.py`）
- K5 `school-dev-hw2-q23`：`.github/workflows/`、`hw2/q2/`、`hw2/q3/`、repo 根目錄的工具設定檔
