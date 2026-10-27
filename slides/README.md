# Mid-term talk: Who Checks the Agent?

Slides for the mid-term tool-study report "Who Checks the Agent? Testing a Tool-Calling LLM Agent with promptfoo and DeepEval".

| File | What it is |
| --- | --- |
| `midterm-talk.pdf` | The 14 slides, exported as PDF |
| `script-zh.md` | Speaker script in Chinese, about 9.5 minutes |
| `who-checks-the-agent/index.tsx` | Slide source for [OpenSlide](https://github.com/open-slide/open-slide) |

## Open the slides in OpenSlide

```sh
git clone https://github.com/open-slide/open-slide.git
cd open-slide && pnpm install
cp -r ../slides/who-checks-the-agent apps/demo/slides/
cd apps/demo && pnpm dev
```

Then open http://localhost:5173/s/who-checks-the-agent and press F to present.
