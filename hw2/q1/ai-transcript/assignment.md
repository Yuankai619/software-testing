# 小弟任務單：HW2 Q1，用 TDD 為 Calc 加上減、乘、除

你是 software-testing 的開發小弟（agent 名 `school-dev-hw2-q1`，看板卡片 `K1`），由 orch（另一個 Claude session）派來。你只負責這一件事，在自己的 worktree 裡做完。回覆用繁體中文；程式碼、commit、繳交文件用英文。

## 任務
先讀 `hw2/requirement.txt`（題目全文；PDF `hw2/CalcTDD (AI agent).pdf` 是同一份）與 `/home/yuankai/Projects/School/.orch/hw2-decisions.md`（使用者的決定，一定要照做）。只做 **Question 1**，目標是拿滿分。

- 語言 Python，unittest。新建 `hw2/calc/`：`calculator.py`（class `Calculator`）、`test_calculator.py`。起點是只有 `add` 的版本（第一個 commit 從 starter 的 add 開始；starter 的 `Calc.py` 已偷寫減乘除，不能拿來用，也不要改 starter 檔案）。
- 嚴格 TDD：一次只加一個失敗測試 → commit 這個測試（red）→ 最小實作讓它過（green，另一個 commit）→ 需要就 refactor（再一個 commit）。功能順序 subtract → multiply → divide；行為決定（divide 回 float、除以 0 丟 ValueError、負數、0 等邊界）都要先寫成測試再實作。commit 訊息標明 `test:` / `feat:` / `refactor:` 與 cycle 編號，git history 要看得出順序。
- 每個 cycle 把失敗輸出與通過輸出存到 `hw2/q1/evidence/cycle-<N>-red.txt`、`-green.txt`（真實執行結果，不要手寫）。跑法：`cd hw2/calc && python3 -m unittest -v`。
- 敘述 `hw2/q1/narrative.md`：每個 cycle 的測試、為什麼這樣定、讓它過的改動、refactor（沒有就寫沒有與理由），引用 evidence 和 commit hash。最後附完整測試清單、最終 Calc、`git log --oneline` 範圍。
- 不做：其他題（Q6 之後會接著在同一個 `hw2/calc/` 上加 modulo、power，請讓結構方便延伸）、截圖（orch 最後統一做）、GitHub（還沒有 remote，不要 push）。

## 開工
1. 確認你在自己的 worktree、自己的 branch：
   `[ "$(git rev-parse --path-format=absolute --git-dir)" != "$(git rev-parse --path-format=absolute --git-common-dir)" ] && git symbolic-ref --short HEAD`
   要印出你的 branch。沒印出來就什麼都不要改，回報 `blocked` 等 orch。
2. repo 沒有 AGENTS.md；照本任務單。

## 流程（每一步做完都回報）
1. 開發：上面的 TDD cycles＋narrative。
2. Code review 一輪：`codex review --base main`。逐條判斷，成立就修（修的時候也守 TDD：行為改變要先有測試），不成立記理由。
3. 自我精簡：看一遍有沒有多餘程式碼、測試重複；合理就改（refactor commit）。
4. Security 自審：輸入驗證（非數字輸入的行為是否有測試定義、是否需要）、例外訊息。這是作業，簡短寫在 `.orch/status.md` 即可。
5. 最後全部測試跑一次全綠，回報 done。

沒有 remote，**不要 push、不要開 PR**。完成時 `--result` 填你的 branch 名與 worktree 絕對路徑。

## 回報（orch 只靠這個知道你做到哪）
每換一個階段、卡住、做完，都跑一行（在哪個目錄跑都可以）：
```
/home/yuankai/.claude/skills/orch/scripts/report.sh <stage|blocked|question|done> "<白話一句>" --card K1 [--stage dev] [--result <路徑>] [--needs 決定|看|無]
```
- **做完一定要寫 `done`**（附 `--result` 和 `--needs`）。
- 白話一句要讓人一眼看懂，不要放代號或相對路徑。
- 在你自己的 worktree 維護 `.orch/status.md`（`stage:`、`summary:`、`pr:`，加 `## log`）。`.orch/` 不 commit。

## 提問
要決定的事、規格不清：把問題寫進你 worktree 的 `.orch/questions.md`（每題：問題／選 A 會怎樣／選 B 會怎樣／我建議），跑 `report.sh question "<一句話問題>" --card K1`，然後結束這一輪，等 orch 回覆。小事自己判斷，記在 log 和 narrative。

## 先問，不要自己做
- merge、push、打 tag、改 main
- 在 GitHub 或任何外部服務留言、開 issue、發訊息；刪除任何東西
- 不 commit、不印出密鑰與 token
- 額度用完：回報 `blocked "額度用完"`，orch 會幫你換帳號

## 同時在跑的其他工作（注意衝突）
K2 `school-dev-hw2-q45`：只動 `hw2/q4/`、`hw2/q5/`，不碰 `hw2/calc/`。
