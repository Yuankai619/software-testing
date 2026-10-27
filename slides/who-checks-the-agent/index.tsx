import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  useSlidePageNumber,
} from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

export const design: DesignSystem = {
  palette: { bg: '#FBFAF6', text: '#161514', accent: '#1A4B7A' },
  fonts: {
    display: '"Spectral", "Iowan Old Style", Georgia, serif',
    body: '"Spectral", "Iowan Old Style", Georgia, serif',
  },
  typeScale: { hero: 116, body: 32 },
  radius: 3,
};

const INK = 'var(--osd-text)';
const PAPER = 'var(--osd-bg)';
const ACCENT = 'var(--osd-accent)';
const MUTED = '#5F5B54';
const FAINT = '#A29D93';
const TINT = '#ECE8DF';
const SKY = '#DCE6F0';
const OCHRE = '#B9832B';
const MONO = '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace';

const SLIDE_ID = 'who-checks-the-agent';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;600&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;

if (typeof document !== 'undefined') {
  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  if (link.href !== FONT_HREF) link.href = FONT_HREF;
}

export const transition: SlideTransition = {
  duration: 200,
  exit: {
    duration: 200,
    easing: 'cubic-bezier(0.4, 0, 1, 1)',
    keyframes: [{ opacity: 1 }, { opacity: 1 }],
  },
  enter: {
    duration: 200,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
  },
};

const abs = (left: number, top: number, extra?: CSSProperties): CSSProperties => ({
  position: 'absolute',
  left,
  top,
  ...extra,
});

const NUM: CSSProperties = { fontVariantNumeric: 'lining-nums tabular-nums' };
const CODE: CSSProperties = { fontFamily: MONO, fontSize: '0.82em' };

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={abs(120, 1010, {
        width: 1680,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        fontSize: 20,
        lineHeight: 1,
        color: MUTED,
      })}
    >
      <span>
        <i>Who Checks the Agent?</i>
        <span style={{ marginLeft: 28 }}>Yuan-Kai Liu, Software Testing, Fall 2026</span>
      </span>
      <span style={{ ...NUM, color: INK, fontSize: 22 }}>
        {current} / {total}
      </span>
    </div>
  );
};

const Sheet = ({ children, plain }: { children: ReactNode; plain?: boolean }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      background: PAPER,
      color: INK,
      fontFamily: 'var(--osd-font-body)',
      fontSize: 'var(--osd-size-body)',
    }}
  >
    {children}
    {!plain && <div style={abs(120, 990, { width: 1680, height: 1, background: FAINT })} />}
    {!plain && <Footer />}
  </div>
);

const Heading = ({ n, children }: { n?: string; children: ReactNode }) => (
  <>
    <h2
      style={abs(120, 78, {
        margin: 0,
        width: 1680,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 58,
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '-0.005em',
        display: 'flex',
        alignItems: 'baseline',
      })}
    >
      {n && <span style={{ ...NUM, color: ACCENT, fontWeight: 400, marginRight: 30 }}>{n}</span>}
      <span>{children}</span>
    </h2>
    <div style={abs(120, 172, { width: 1680, height: 1, background: INK })} />
  </>
);

const Caption = ({
  label,
  children,
  style,
}: {
  label?: string;
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <div style={{ fontSize: 24, lineHeight: 1.45, color: MUTED, ...style }}>
    {label && <span style={{ fontWeight: 600, color: INK, marginRight: 10 }}>{label}</span>}
    {children}
  </div>
);

const Takeaway = ({ top, children }: { top: number; children: ReactNode }) => (
  <div
    style={abs(120, top, {
      width: 1680,
      borderLeft: `4px solid ${ACCENT}`,
      paddingLeft: 28,
      fontSize: 32,
      lineHeight: 1.4,
    })}
  >
    {children}
  </div>
);

const Box = ({
  x,
  y,
  w,
  h,
  fill = PAPER,
  stroke = INK,
  children,
  size = 28,
  color,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
  stroke?: string;
  children: ReactNode;
  size?: number;
  color?: string;
}) => (
  <div
    style={abs(x, y, {
      width: w,
      height: h,
      boxSizing: 'border-box',
      border: `1.5px solid ${stroke}`,
      borderRadius: 'var(--osd-radius)',
      background: fill,
      color: color ?? INK,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: size,
      lineHeight: 1.3,
      padding: '8px 14px',
    })}
  >
    <div>{children}</div>
  </div>
);

const Small = ({ children, color = MUTED }: { children: ReactNode; color?: string }) => (
  <div style={{ fontSize: 22, color, fontStyle: 'italic', marginTop: 4 }}>{children}</div>
);

const Arrow = ({
  x1,
  y1,
  x2,
  y2,
  color = INK,
  width = 1.8,
  dash,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
  dash?: string;
}) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const L = 14;
  const W = 6;
  const bx = x2 - L * Math.cos(a);
  const by = y2 - L * Math.sin(a);
  const px = -Math.sin(a) * W;
  const py = Math.cos(a) * W;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={bx}
        y2={by}
        style={{ stroke: color, strokeWidth: width, strokeDasharray: dash }}
      />
      <path
        d={`M${x2} ${y2}L${bx + px} ${by + py}L${bx - px} ${by - py}Z`}
        style={{ fill: color }}
      />
    </g>
  );
};

const Overlay = ({ children }: { children: ReactNode }) => (
  <svg
    width={1920}
    height={1080}
    viewBox="0 0 1920 1080"
    style={abs(0, 0, { pointerEvents: 'none', overflow: 'visible' })}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const SvgText = ({
  x,
  y,
  children,
  anchor = 'middle',
  size = 22,
  color = INK,
  italic,
  weight,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  size?: number;
  color?: string;
  italic?: boolean;
  weight?: number;
}) => (
  <text
    x={x}
    y={y}
    fontSize={size}
    textAnchor={anchor}
    fontStyle={italic ? 'italic' : undefined}
    fontWeight={weight}
    style={{ fill: color, ...NUM }}
  >
    {children}
  </text>
);

const TitlePage: Page = () => (
  <Sheet plain>
    <h1
      style={abs(0, 250, {
        width: 1920,
        margin: 0,
        textAlign: 'center',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 'var(--osd-size-hero)',
        fontWeight: 600,
        lineHeight: 1.1,
        letterSpacing: '-0.015em',
      })}
    >
      Who Checks the Agent?
    </h1>
    <div
      style={abs(0, 400, {
        width: 1920,
        textAlign: 'center',
        fontSize: 50,
        fontStyle: 'italic',
        lineHeight: 1.2,
      })}
    >
      Testing a Tool-Calling LLM Agent with promptfoo and DeepEval
    </div>
    <div style={abs(0, 530, { width: 1920, display: 'flex', justifyContent: 'center' })}>
      <div style={{ width: 120, height: 1, background: INK }} />
    </div>
    <div style={abs(0, 590, { width: 1920, textAlign: 'center', fontSize: 40, lineHeight: 1.3 })}>
      Yuan-Kai Liu <span style={{ ...NUM, color: MUTED }}>(315551026)</span>
    </div>
    <div
      style={abs(0, 660, {
        width: 1920,
        textAlign: 'center',
        fontSize: 30,
        fontStyle: 'italic',
        color: MUTED,
      })}
    >
      National Yang Ming Chiao Tung University
    </div>
    <div
      style={abs(0, 860, {
        width: 1920,
        textAlign: 'center',
        fontSize: 26,
        color: MUTED,
        lineHeight: 1.5,
      })}
    >
      <div>Software Testing, Fall 2026</div>
      <div>Mid-term study report, October 2026</div>
    </div>
  </Sheet>
);

const Finding = ({ x, big, children }: { x: number; big: string; children: ReactNode }) => (
  <div style={abs(x, 445, { width: 390 })}>
    <div style={{ ...NUM, fontSize: 58, fontWeight: 600, color: ACCENT, lineHeight: 1.1 }}>
      {big}
    </div>
    <div style={{ fontSize: 25, lineHeight: 1.45, color: MUTED, marginTop: 10 }}>{children}</div>
  </div>
);

const SummaryNote = ({ x, title, children }: { x: number; title: string; children: ReactNode }) => (
  <div style={abs(x, 700, { width: 800, borderTop: `2px solid ${INK}`, paddingTop: 16 })}>
    <div style={{ fontSize: 32, fontWeight: 600 }}>{title}</div>
    <div style={{ fontSize: 26, lineHeight: 1.45, color: MUTED, marginTop: 8 }}>{children}</div>
  </div>
);

const ExecSummary: Page = () => (
  <Sheet>
    <Heading>Executive summary</Heading>
    <div style={abs(120, 200, { fontSize: 26, fontStyle: 'italic', color: MUTED })}>What I did</div>
    <Box x={120} y={245} w={330} h={110} size={28}>
      40 tests from the spec
    </Box>
    <Box x={530} y={245} w={420} h={110} size={28}>
      12 agent versions, 5 runs each
    </Box>
    <Box x={1030} y={245} w={380} h={110} size={28}>
      6 oracles in 2 tools
    </Box>
    <Box x={1490} y={245} w={310} h={110} fill={SKY} size={28}>
      check the oracles
    </Box>
    <Overlay>
      <Arrow x1={450} y1={300} x2={528} y2={300} />
      <Arrow x1={950} y1={300} x2={1028} y2={300} />
      <Arrow x1={1410} y1={300} x2={1488} y2={300} />
    </Overlay>
    <div style={abs(120, 400, { fontSize: 26, fontStyle: 'italic', color: MUTED })}>
      What I found
    </div>
    <Finding x={120} big="7 of 11">
      faults caught by two free code checks
    </Finding>
    <Finding x={545} big="κ = 0.92">
      best judge sees the tool calls; TaskCompletion: 0.19
    </Finding>
    <Finding x={970} big="7 of 40">
      recorded reference answers were wrong
    </Finding>
    <Finding x={1395} big="1 leak">
      found only by the red team
    </Finding>
    <SummaryNote x={120} title="Contribution">
      Tests the oracles themselves, not only the tools.
    </SummaryNote>
    <SummaryNote x={1000} title="Limitations">
      One agent and model, AI-made labels, five runs per test.
    </SummaryNote>
  </Sheet>
);

const SourceCard = ({ x, title, children }: { x: number; title: string; children: ReactNode }) => (
  <div
    style={abs(x, 640, {
      width: 520,
      height: 170,
      boxSizing: 'border-box',
      borderTop: `2px solid ${INK}`,
      paddingTop: 18,
    })}
  >
    <div style={{ fontSize: 32, fontWeight: 600 }}>{title}</div>
    <div style={{ fontSize: 26, lineHeight: 1.45, color: MUTED, marginTop: 8 }}>{children}</div>
  </div>
);

const Oracle: Page = () => (
  <Sheet>
    <Heading n="1">Where does an oracle get its expected behaviour?</Heading>
    <Box x={1190} y={230} w={270} h={100} fill={TINT} size={26}>
      Expected behaviour
    </Box>
    <Box x={120} y={400} w={250} h={120}>
      Test input
    </Box>
    <Box x={470} y={400} w={300} h={120}>
      Program under test
    </Box>
    <Box x={870} y={400} w={220} h={120}>
      Output
    </Box>
    <Box x={1190} y={400} w={270} h={120} fill={ACCENT} stroke={ACCENT} color="#FBFAF6" size={34}>
      <b>Oracle</b>
    </Box>
    <Box x={1560} y={400} w={240} h={120}>
      Pass or fail
    </Box>
    <Overlay>
      <Arrow x1={370} y1={460} x2={468} y2={460} />
      <Arrow x1={770} y1={460} x2={868} y2={460} />
      <Arrow x1={1090} y1={460} x2={1188} y2={460} />
      <Arrow x1={1460} y1={460} x2={1558} y2={460} />
      <Arrow x1={1325} y1={330} x2={1325} y2={398} />
    </Overlay>
    <SourceCard x={120} title="The specification">
      written as code, as required phrases, or as a rubric
    </SourceCard>
    <SourceCard x={700} title="A recorded earlier output">
      a reference answer saved from a previous run
    </SourceCard>
    <SourceCard x={1280} title="Another model's opinion">
      an LLM grades the output: LLM-as-judge
    </SourceCard>
    {(
      [
        [120, 'in this study: L1, L2, J1, J2'],
        [700, 'in this study: L3'],
        [1280, 'in this study: J3'],
      ] as const
    ).map(([x, t]) => (
      <div key={x} style={abs(x, 830, { fontSize: 26, color: ACCENT, fontWeight: 600 })}>
        {t}
      </div>
    ))}
  </Sheet>
);

const Panel = ({
  x,
  title,
  children,
  caption,
}: {
  x: number;
  title: string;
  children: ReactNode;
  caption: ReactNode;
}) => (
  <div style={abs(x, 230, { width: 520, height: 700 })}>
    <div style={{ fontSize: 38, fontWeight: 600, lineHeight: 1.2 }}>{title}</div>
    <div style={{ position: 'relative', height: 330, marginTop: 30 }}>{children}</div>
    <div style={{ fontSize: 28, lineHeight: 1.45, color: MUTED, marginTop: 20 }}>{caption}</div>
  </div>
);

const Bubble = ({ top, children, mark }: { top: number; children: ReactNode; mark: string }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top,
      width: 480,
      boxSizing: 'border-box',
      border: `1.5px solid ${INK}`,
      borderRadius: 18,
      padding: '20px 26px',
      fontSize: 32,
      fontStyle: 'italic',
      display: 'flex',
      justifyContent: 'space-between',
    }}
  >
    <span>{children}</span>
    <span style={{ fontStyle: 'normal', color: ACCENT, fontWeight: 600 }}>{mark}</span>
  </div>
);

const RunDot = ({ i, ok }: { i: number; ok: boolean }) => (
  <g>
    <circle
      cx={48 + i * 96}
      cy={140}
      r={34}
      style={{ fill: ok ? ACCENT : PAPER, stroke: ok ? ACCENT : OCHRE, strokeWidth: 3 }}
    />
    {!ok && (
      <path
        d={`M${48 + i * 96 - 14} 126l28 28M${48 + i * 96 + 14} 126l-28 28`}
        style={{ stroke: OCHRE, strokeWidth: 3 }}
      />
    )}
    <SvgText x={48 + i * 96} y={210} size={22} color={MUTED}>
      run {i + 1}
    </SvgText>
  </g>
);

const WhyHard: Page = () => (
  <Sheet>
    <Heading n="2">Why LLM agents make the oracle hard</Heading>
    <Panel
      x={120}
      title="Many valid answers"
      caption="Both are correct, so exact-match assertions are too strict."
    >
      <Bubble top={60} mark="✓">
        “19 open seats”
      </Bubble>
      <Bubble top={200} mark="✓">
        “nineteen seats are left”
      </Bubble>
    </Panel>
    <Panel
      x={700}
      title="Different on every run"
      caption={
        <>
          Test E06 on the unchanged agent: over the credit limit in{' '}
          <b style={{ color: INK }}>3 of 5</b> runs.
        </>
      }
    >
      <svg width={520} height={400} viewBox="0 0 520 400" aria-hidden="true">
        <SvgText x={10} y={60} anchor="start" size={26} italic>
          same request, five runs
        </SvgText>
        <RunDot i={0} ok={false} />
        <RunDot i={1} ok={true} />
        <RunDot i={2} ok={false} />
        <RunDot i={3} ok={true} />
        <RunDot i={4} ok={false} />
        <circle cx={22} cy={300} r={12} style={{ fill: ACCENT }} />
        <SvgText x={44} y={308} anchor="start" size={22} color={MUTED}>
          correct
        </SvgText>
        <circle cx={182} cy={300} r={12} style={{ fill: PAPER, stroke: OCHRE, strokeWidth: 3 }} />
        <SvgText x={204} y={308} anchor="start" size={22} color={MUTED}>
          wrong (run order illustrative)
        </SvgText>
      </svg>
    </Panel>
    <Panel
      x={1280}
      title="Actions hide behind words"
      caption="The answer text alone does not show what the tools did."
    >
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 0,
          width: 480,
          boxSizing: 'border-box',
          background: TINT,
          padding: '20px 24px',
          fontFamily: MONO,
          fontSize: 24,
          lineHeight: 1.5,
        }}
      >
        tool call: enroll("CS301")
        <br />
        result: ok
      </div>
      <svg
        width={520}
        height={400}
        viewBox="0 0 520 400"
        style={{ position: 'absolute', left: 0, top: 0 }}
        aria-hidden="true"
      >
        <Arrow x1={240} y1={160} x2={240} y2={220} />
      </svg>
      <Bubble top={232} mark="✗">
        “You are not enrolled.”
      </Bubble>
    </Panel>
  </Sheet>
);

const Tool = ({ y, name, state }: { y: number; name: string; state?: boolean }) => (
  <div
    style={abs(1260, y, {
      width: 540,
      height: 50,
      boxSizing: 'border-box',
      border: `1.5px solid ${state ? ACCENT : INK}`,
      background: state ? SKY : PAPER,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 20,
      fontFamily: MONO,
      fontSize: 24,
    })}
  >
    {name}
  </div>
);

const AgentUnderTest: Page = () => (
  <Sheet>
    <Heading n="3">The system under test: a course-registration agent</Heading>
    <Box x={120} y={300} w={300} h={140}>
      <div>
        Student <span style={NUM}>S001</span>
      </div>
      <Small>“Enroll me in CS301 and CS320.”</Small>
    </Box>
    <Box x={620} y={300} w={360} h={140} fill={TINT}>
      <div>
        <b>LLM</b>
      </div>
      <div style={{ fontFamily: MONO, fontSize: 24 }}>gpt-4.1-mini</div>
      <Small>at most 8 model calls</Small>
    </Box>
    <div style={abs(1260, 222, { fontSize: 28, fontWeight: 600 })}>Six tools</div>
    <Tool y={270} name="search_courses" />
    <Tool y={330} name="get_course" />
    <Tool y={390} name="get_student_record" />
    <Tool y={450} name="check_schedule_conflicts" />
    <Tool y={510} name="enroll" state />
    <Tool y={570} name="drop" state />
    <div style={abs(1260, 632, { fontSize: 22, color: MUTED, fontStyle: 'italic' })}>
      <span
        style={{
          display: 'inline-block',
          width: 18,
          height: 18,
          background: SKY,
          border: `1.5px solid ${ACCENT}`,
          marginRight: 10,
          verticalAlign: '-2px',
        }}
      />
      changes the student's enrollment
    </div>
    <Box x={1260} y={700} w={540} h={90} fill={TINT} size={26}>
      Data: <span style={NUM}>25</span> courses, <span style={NUM}>3</span> student records
    </Box>
    <Overlay>
      <Arrow x1={420} y1={350} x2={618} y2={350} />
      <SvgText x={520} y={336} size={22} italic color={MUTED}>
        request
      </SvgText>
      <Arrow x1={618} y1={400} x2={422} y2={400} />
      <SvgText x={520} y={432} size={22} italic color={MUTED}>
        answer
      </SvgText>
      <Arrow x1={980} y1={345} x2={1254} y2={345} />
      <SvgText x={1117} y={331} size={22} italic color={MUTED}>
        tool call
      </SvgText>
      <Arrow x1={1254} y1={405} x2={982} y2={405} />
      <SvgText x={1117} y={437} size={22} italic color={MUTED}>
        tool result
      </SvgText>
    </Overlay>
    <div style={abs(120, 520, { width: 860, borderTop: `2px solid ${INK}`, paddingTop: 18 })}>
      <div style={{ fontSize: 30, fontWeight: 600 }}>Every run is recorded as a trace</div>
      <div style={{ fontSize: 28, lineHeight: 1.5, color: MUTED, marginTop: 8 }}>
        each tool call with its arguments and result
        <br />
        the final answer
        <br />
        the student's final enrollment
      </div>
    </div>
    <Caption label="Specification." style={abs(120, 830, { width: 1680 })}>
      Eight rules, R1 to R8: grounding, eligibility, explicit action, order, ambiguity, privacy,
      prompt injection, style.
    </Caption>
  </Sheet>
);

const OX = (i: number) => 120 + i * 286;

const OracleCard = ({
  i,
  id,
  name,
  sees,
  authority,
  fill,
}: {
  i: number;
  id: string;
  name: string;
  sees: string;
  authority: string;
  fill: string;
}) => (
  <div
    style={abs(OX(i), 390, {
      width: 250,
      height: 350,
      boxSizing: 'border-box',
      border: `1.5px solid ${INK}`,
      background: fill,
      padding: '22px 20px',
    })}
  >
    <div style={{ fontSize: 52, color: ACCENT, fontWeight: 600, lineHeight: 1 }}>{id}</div>
    <div style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.2, marginTop: 14, height: 68 }}>
      {name}
    </div>
    <div style={{ fontSize: 21, color: MUTED, marginTop: 18, fontStyle: 'italic' }}>sees</div>
    <div style={{ fontSize: 24, lineHeight: 1.3 }}>{sees}</div>
    <div style={{ fontSize: 21, color: MUTED, marginTop: 12, fontStyle: 'italic' }}>authority</div>
    <div style={{ fontSize: 24, lineHeight: 1.3 }}>{authority}</div>
  </div>
);

const Bracket = ({
  x1,
  x2,
  y,
  down,
  label,
  sub,
}: {
  x1: number;
  x2: number;
  y: number;
  down?: boolean;
  label: string;
  sub?: string;
}) => {
  const t = down ? -14 : 14;
  return (
    <g>
      <path
        d={`M${x1} ${y + t}V${y}H${x2}V${y + t}`}
        style={{ fill: 'none', stroke: INK, strokeWidth: 1.5 }}
      />
      <SvgText x={(x1 + x2) / 2} y={down ? y + 40 : y - 52} size={36} weight={600}>
        {label}
      </SvgText>
      {sub && (
        <SvgText x={(x1 + x2) / 2} y={down ? y + 72 : y - 18} size={22} italic color={MUTED}>
          {sub}
        </SvgText>
      )}
    </g>
  );
};

const SixOracles: Page = () => (
  <Sheet>
    <Heading n="4">Two tools, six oracles</Heading>
    <Overlay>
      <Bracket
        x1={OX(0)}
        x2={OX(3) + 250}
        y={360}
        label="promptfoo"
        sub="YAML tests, a CLI, many assertion types, built-in red teaming"
      />
      <Bracket
        x1={OX(4)}
        x2={OX(5) + 250}
        y={360}
        label="DeepEval"
        sub="Python tests on pytest, ready-made metrics"
      />
      <Bracket x1={OX(0)} x2={OX(1) + 250} y={770} down label="Deterministic code" />
      <Bracket x1={OX(2)} x2={OX(2) + 250} y={770} down label="Snapshot" />
      <Bracket x1={OX(3)} x2={OX(5) + 250} y={770} down label="LLM-as-judge" />
    </Overlay>
    <OracleCard
      i={0}
      id="L1"
      name="Trace check"
      sees="the trace"
      authority="spec, as code"
      fill={PAPER}
    />
    <OracleCard
      i={1}
      id="L2"
      name="Phrase check"
      sees="the answer"
      authority="spec, as phrases"
      fill={PAPER}
    />
    <OracleCard
      i={2}
      id="L3"
      name="Reference answer"
      sees="the answer"
      authority="a recorded answer"
      fill={TINT}
    />
    <OracleCard
      i={3}
      id="J1"
      name="Rubric judge"
      sees="the answer"
      authority="spec, as rubric"
      fill={SKY}
    />
    <OracleCard
      i={4}
      id="J2"
      name="G-Eval judge"
      sees="answer and tool calls"
      authority="spec, as rubric"
      fill={SKY}
    />
    <OracleCard
      i={5}
      id="J3"
      name="Task­Completion"
      sees="answer and tool calls"
      authority="the judge itself"
      fill={SKY}
    />
    <Caption style={abs(120, 890, { width: 1680, fontSize: 26 })}>
      <b style={{ color: INK }}>LLM-as-judge:</b> a second language model reads the output and
      grades it, against a written rubric (J1, J2) or against its own idea of the task (J3).
    </Caption>
  </Sheet>
);

const MRow = ({
  y,
  layer,
  ids,
  example,
}: {
  y: number;
  layer: string;
  ids: string[];
  example: string;
}) => (
  <div style={abs(120, y, { display: 'flex', alignItems: 'center', height: 56 })}>
    <div style={{ width: 230, fontSize: 26, fontStyle: 'italic', color: MUTED }}>{layer}</div>
    <div style={{ width: 330, display: 'flex', gap: 10 }}>
      {ids.map((id) => (
        <span
          key={id}
          style={{
            width: 70,
            height: 44,
            border: `1.5px solid ${INK}`,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: MONO,
            fontSize: 20,
            background: TINT,
          }}
        >
          {id}
        </span>
      ))}
    </div>
    <div style={{ fontSize: 24, lineHeight: 1.3 }}>{example}</div>
  </div>
);

const Pip = ({ cx, cy, ok }: { cx: number; cy: number; ok: boolean }) => (
  <g>
    <circle
      cx={cx}
      cy={cy}
      r={20}
      style={{ fill: ok ? ACCENT : PAPER, stroke: ok ? ACCENT : OCHRE, strokeWidth: 3 }}
    />
    {!ok && (
      <path
        d={`M${cx - 8} ${cy - 8}l16 16M${cx + 8} ${cy - 8}l-16 16`}
        style={{ stroke: OCHRE, strokeWidth: 3 }}
      />
    )}
  </g>
);

const Mutation: Page = () => (
  <Sheet>
    <Heading n="5">Mutation testing: plant faults, see who notices</Heading>
    <div style={abs(120, 210, { width: 900, fontSize: 30, lineHeight: 1.4 })}>
      A <b>mutant</b> is a copy of the agent with exactly one known fault. I wrote 11, in five
      layers.
    </div>
    <MRow
      y={310}
      layer="tool code"
      ids={['M01', 'M02', 'M03']}
      example="e.g. no authorization check"
    />
    <MRow
      y={380}
      layer="prompt"
      ids={['M04', 'M05', 'M06', 'M07']}
      example="e.g. limit written as 25"
    />
    <MRow y={450} layer="tool description" ids={['M08']} example="e.g. enroll claims it checks" />
    <MRow y={520} layer="agent loop" ids={['M09', 'M10']} example="e.g. at most 3 model calls" />
    <MRow y={590} layer="model" ids={['M11']} example="gpt-4.1-nano instead of mini" />
    <div style={abs(1130, 210, { width: 670, fontSize: 30, lineHeight: 1.4 })}>
      A test <b>kills</b> a mutant when it passes on the original agent and fails on the mutant.
    </div>
    <Overlay>
      <SvgText x={1130} y={360} anchor="start" size={26} italic color={MUTED}>
        original, 5 runs
      </SvgText>
      <Pip cx={1400} cy={352} ok />
      <Pip cx={1450} cy={352} ok />
      <Pip cx={1500} cy={352} ok />
      <Pip cx={1550} cy={352} ok />
      <Pip cx={1600} cy={352} ok={false} />
      <SvgText x={1640} y={360} anchor="start" size={24}>
        pass ≥ 4
      </SvgText>
      <SvgText x={1130} y={430} anchor="start" size={26} italic color={MUTED}>
        mutant, 5 runs
      </SvgText>
      <Pip cx={1400} cy={422} ok={false} />
      <Pip cx={1450} cy={422} ok={false} />
      <Pip cx={1500} cy={422} ok={false} />
      <Pip cx={1550} cy={422} ok={false} />
      <Pip cx={1600} cy={422} ok />
      <SvgText x={1640} y={430} anchor="start" size={24}>
        pass ≤ 1
      </SvgText>
    </Overlay>
    <div style={abs(1130, 480, { width: 670, display: 'flex', flexDirection: 'column', gap: 18 })}>
      <div style={{ fontSize: 26, lineHeight: 1.4 }}>
        <b>Clear kill:</b> the gap above, so chance alone cannot explain it.
      </div>
      <div style={{ fontSize: 26, lineHeight: 1.4 }}>
        <b>Valid kill:</b> the failing run really shows a defect, checked by reading the trace.
      </div>
      <div style={{ fontSize: 26, lineHeight: 1.4 }}>
        <b>Control:</b> M03's faulty code never ran, so every M03 kill is false.
      </div>
    </div>
    <Takeaway top={800}>
      More faults killed means a stronger oracle. False kills mean the oracle is reacting to noise.
    </Takeaway>
  </Sheet>
);

const Stat = ({ x, big, small }: { x: number; big: string; small: string }) => (
  <div style={abs(x, 820, { width: 390, borderTop: `2px solid ${INK}`, paddingTop: 14 })}>
    <div style={{ ...NUM, fontSize: 44, fontWeight: 600, color: ACCENT, lineHeight: 1.1 }}>
      {big}
    </div>
    <div style={{ fontSize: 24, color: MUTED, lineHeight: 1.35, marginTop: 6 }}>{small}</div>
  </div>
);

const Setup: Page = () => (
  <Sheet>
    <Heading n="6">Experiment setup</Heading>
    <Box x={120} y={300} w={290} h={150} size={26}>
      <div>12 agent versions</div>
      <Small>original + 11 mutants</Small>
      <div style={{ marginTop: 4 }}>40 tests</div>
    </Box>
    <Box x={490} y={310} w={260} h={130} size={26}>
      <div>5 runs each</div>
      <div>
        <b>2,400 traces</b>
      </div>
    </Box>
    <Box x={830} y={232} w={290} h={120} fill={SKY} size={26}>
      <div>
        <b>promptfoo</b>
      </div>
      <div>L1 L2 L3 J1</div>
    </Box>
    <Box x={830} y={398} w={290} h={120} fill={SKY} size={26}>
      <div>
        <b>DeepEval</b>
      </div>
      <div>J2 J3</div>
    </Box>
    <Box x={1200} y={310} w={260} h={130} size={26}>
      <div>Verdict table</div>
      <div>6 × 2,400</div>
    </Box>
    <Box x={1540} y={232} w={260} h={120} size={26}>
      <div>
        <b>RQ1</b>
      </div>
      <div>vs. 11 faults</div>
    </Box>
    <Box x={1540} y={398} w={260} h={120} size={26}>
      <div>
        <b>RQ2</b>
      </div>
      <div>vs. 640 labels</div>
    </Box>
    <Box x={120} y={590} w={290} h={130} fill={SKY} size={26}>
      <div>
        <b>Red team</b>
      </div>
      <div>64 attacks</div>
    </Box>
    <Box x={490} y={590} w={630} h={130} size={26}>
      <div>3 runs each, on the original and on M03</div>
      <Small>grader verdicts + every trace</Small>
    </Box>
    <Box x={1540} y={590} w={260} h={130} size={26}>
      <div>
        <b>RQ3</b>
      </div>
      <div>triage of findings</div>
    </Box>
    <Overlay>
      <Arrow x1={410} y1={375} x2={488} y2={375} />
      <Arrow x1={750} y1={360} x2={828} y2={300} />
      <Arrow x1={750} y1={390} x2={828} y2={450} />
      <Arrow x1={1120} y1={300} x2={1198} y2={355} />
      <Arrow x1={1120} y1={450} x2={1198} y2={395} />
      <Arrow x1={1460} y1={355} x2={1538} y2={300} />
      <Arrow x1={1460} y1={395} x2={1538} y2={450} />
      <Arrow x1={410} y1={655} x2={488} y2={655} />
      <Arrow x1={1120} y1={655} x2={1538} y2={655} />
    </Overlay>
    <Stat x={120} big="2,400" small="agent runs, 5 per version and test" />
    <Stat x={550} big="640" small="outputs labeled by reading the full trace" />
    <Stat x={980} big="Claude Haiku 5.5" small="main judge, temperature 0" />
    <Stat x={1410} big="US$12.2" small="total cost of the study" />
  </Sheet>
);

const C1 = { x0: 200, x1: 1000, y0: 270, y1: 800, max: 11 };
const c1y = (v: number) => C1.y1 - (v / C1.max) * (C1.y1 - C1.y0);
const c1x = (i: number) => C1.x0 + 30 + i * 96;

const KillBar = ({
  i,
  label,
  valid,
  note,
}: {
  i: number;
  label: string;
  valid: number;
  note?: string;
}) => (
  <g>
    <rect
      x={c1x(i)}
      y={c1y(valid)}
      width={56}
      height={c1y(0) - c1y(valid)}
      style={{ fill: ACCENT }}
    />
    <SvgText x={c1x(i) + 28} y={c1y(valid) - 10} size={24} weight={600}>
      {valid}
    </SvgText>
    <SvgText x={c1x(i) + 28} y={C1.y1 + 34} size={24}>
      {label}
    </SvgText>
    {note && (
      <SvgText x={c1x(i) + 28} y={C1.y1 + 62} size={20} italic color={OCHRE}>
        {note}
      </SvgText>
    )}
  </g>
);

const MX = 1200;
const MY = 268;
const mcx = (j: number) => MX + 110 + j * 80;
const mcy = (r: number) => MY + 40 + r * 42;

const MCell = ({ r, j, on }: { r: number; j: number; on?: boolean }) => (
  <rect
    x={mcx(j) + 6}
    y={mcy(r) + 4}
    width={68}
    height={34}
    style={{ fill: on ? ACCENT : PAPER, stroke: on ? ACCENT : TINT, strokeWidth: 1.5 }}
  />
);

const MLabel = ({ r, id, dead }: { r: number; id: string; dead?: boolean }) => (
  <text
    x={MX + 96}
    y={mcy(r) + 30}
    fontSize={22}
    textAnchor="end"
    style={{ fill: dead ? OCHRE : INK, fontFamily: MONO }}
  >
    {id}
  </text>
);

const RQ1: Page = () => (
  <Sheet>
    <Heading n="7">RQ1: Which oracles catch the injected faults?</Heading>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={abs(0, 0)} aria-hidden="true">
      <SvgText x={C1.x0} y={226} anchor="start" size={24} italic color={MUTED}>
        mutants killed (of 11)
      </SvgText>
      {[0, 2, 4, 6, 8, 10].map((v) => (
        <g key={v}>
          <line
            x1={C1.x0}
            x2={C1.x1}
            y1={c1y(v)}
            y2={c1y(v)}
            style={{ stroke: TINT, strokeWidth: 1.2 }}
          />
          <SvgText x={C1.x0 - 14} y={c1y(v) + 8} anchor="end" size={22}>
            {v}
          </SvgText>
        </g>
      ))}
      <line
        x1={C1.x0}
        x2={C1.x1}
        y1={c1y(11)}
        y2={c1y(11)}
        style={{ stroke: FAINT, strokeWidth: 1.2, strokeDasharray: '6 6' }}
      />
      <SvgText x={C1.x1} y={c1y(11) - 10} anchor="end" size={20} italic color={MUTED}>
        all 11
      </SvgText>
      <line x1={C1.x0} x2={C1.x1} y1={C1.y1} y2={C1.y1} style={{ stroke: INK, strokeWidth: 1.5 }} />
      <rect
        x={c1x(2) - 14}
        y={c1y(11)}
        width={c1x(5) - c1x(2) + 84}
        height={c1y(8) - c1y(11)}
        style={{
          fill: OCHRE,
          fillOpacity: 0.1,
          stroke: OCHRE,
          strokeWidth: 1.5,
          strokeDasharray: '7 5',
        }}
      />
      <SvgText x={(c1x(2) + c1x(5) + 56) / 2} y={c1y(9.5) + 8} size={22} italic color={OCHRE}>
        a single run: 8 to 11 "killed" each time
      </SvgText>
      <KillBar i={0} label="L1" valid={5} />
      <KillBar i={1} label="L2" valid={5} />
      <KillBar i={2} label="L3" valid={7} note="17 false kills" />
      <KillBar i={3} label="J1" valid={6} />
      <KillBar i={4} label="J2" valid={6} />
      <KillBar i={5} label="J3" valid={4} />
      <line
        x1={c1x(6) - 4}
        x2={c1x(6) - 4}
        y1={C1.y0 + 40}
        y2={C1.y1}
        style={{ stroke: FAINT, strokeWidth: 1.2 }}
      />
      <KillBar i={6} label="L1+L2" valid={7} />
      <KillBar i={7} label="all six" valid={7} />
      <rect x={210} y={884} width={26} height={20} style={{ fill: ACCENT }} />
      <SvgText x={246} y={902} anchor="start" size={22}>
        valid kills, 5 runs per test
      </SvgText>
      <rect
        x={560}
        y={884}
        width={26}
        height={20}
        style={{ fill: OCHRE, fillOpacity: 0.1, stroke: OCHRE, strokeDasharray: '4 3' }}
      />
      <SvgText x={596} y={902} anchor="start" size={22}>
        range seen when the LLM-based oracles run once
      </SvgText>

      <SvgText x={MX} y={226} anchor="start" size={24} italic color={MUTED}>
        which mutants each oracle validly kills
      </SvgText>
      <SvgText x={mcx(0) + 40} y={MY + 26} size={22}>
        L1
      </SvgText>
      <SvgText x={mcx(1) + 40} y={MY + 26} size={22}>
        L2
      </SvgText>
      <SvgText x={mcx(2) + 40} y={MY + 26} size={22}>
        L3
      </SvgText>
      <SvgText x={mcx(3) + 40} y={MY + 26} size={22}>
        J1
      </SvgText>
      <SvgText x={mcx(4) + 40} y={MY + 26} size={22}>
        J2
      </SvgText>
      <SvgText x={mcx(5) + 40} y={MY + 26} size={22}>
        J3
      </SvgText>

      <MLabel r={0} id="M01" />
      <MCell r={0} j={0} on />
      <MCell r={0} j={1} on />
      <MCell r={0} j={2} on />
      <MCell r={0} j={3} on />
      <MCell r={0} j={4} on />
      <MCell r={0} j={5} on />
      <MLabel r={1} id="M02" />
      <MCell r={1} j={0} />
      <MCell r={1} j={1} on />
      <MCell r={1} j={2} on />
      <MCell r={1} j={3} on />
      <MCell r={1} j={4} on />
      <MCell r={1} j={5} />
      <MLabel r={2} id="M03" dead />
      <MCell r={2} j={0} />
      <MCell r={2} j={1} />
      <MCell r={2} j={2} />
      <MCell r={2} j={3} />
      <MCell r={2} j={4} />
      <MCell r={2} j={5} />
      <MLabel r={3} id="M04" />
      <MCell r={3} j={0} on />
      <MCell r={3} j={1} on />
      <MCell r={3} j={2} on />
      <MCell r={3} j={3} on />
      <MCell r={3} j={4} on />
      <MCell r={3} j={5} />
      <MLabel r={4} id="M05" dead />
      <MCell r={4} j={0} />
      <MCell r={4} j={1} />
      <MCell r={4} j={2} />
      <MCell r={4} j={3} />
      <MCell r={4} j={4} />
      <MCell r={4} j={5} />
      <MLabel r={5} id="M06" />
      <MCell r={5} j={0} on />
      <MCell r={5} j={1} />
      <MCell r={5} j={2} on />
      <MCell r={5} j={3} />
      <MCell r={5} j={4} />
      <MCell r={5} j={5} />
      <MLabel r={6} id="M07" dead />
      <MCell r={6} j={0} />
      <MCell r={6} j={1} />
      <MCell r={6} j={2} />
      <MCell r={6} j={3} />
      <MCell r={6} j={4} />
      <MCell r={6} j={5} />
      <MLabel r={7} id="M08" dead />
      <MCell r={7} j={0} />
      <MCell r={7} j={1} />
      <MCell r={7} j={2} />
      <MCell r={7} j={3} />
      <MCell r={7} j={4} />
      <MCell r={7} j={5} />
      <MLabel r={8} id="M09" />
      <MCell r={8} j={0} />
      <MCell r={8} j={1} on />
      <MCell r={8} j={2} on />
      <MCell r={8} j={3} on />
      <MCell r={8} j={4} on />
      <MCell r={8} j={5} on />
      <MLabel r={9} id="M10" />
      <MCell r={9} j={0} on />
      <MCell r={9} j={1} />
      <MCell r={9} j={2} on />
      <MCell r={9} j={3} on />
      <MCell r={9} j={4} on />
      <MCell r={9} j={5} on />
      <MLabel r={10} id="M11" />
      <MCell r={10} j={0} on />
      <MCell r={10} j={1} on />
      <MCell r={10} j={2} on />
      <MCell r={10} j={3} on />
      <MCell r={10} j={4} on />
      <MCell r={10} j={5} on />
      <SvgText x={MX} y={mcy(11) + 40} anchor="start" size={22} italic color={OCHRE}>
        M03, M05, M07, M08 survive every oracle
      </SvgText>
    </svg>
    <Takeaway top={928}>
      Two cheap checks, L1 + L2, catch 7 of 11 faults: as many as all six oracles together.
    </Takeaway>
  </Sheet>
);

const K = { x0: 1080, x1: 1740, y0: 222 };
const kx = (v: number) => K.x0 + v * (K.x1 - K.x0);
const ky = (i: number) => K.y0 + 40 + i * 76;

const KBar = ({ i, label, v, color }: { i: number; label: string; v: number; color: string }) => (
  <g>
    <SvgText x={K.x0 - 18} y={ky(i) + 36} anchor="end" size={26}>
      {label}
    </SvgText>
    <rect x={K.x0} y={ky(i) + 6} width={kx(v) - K.x0} height={44} style={{ fill: color }} />
    <SvgText x={kx(v) + 12} y={ky(i) + 37} anchor="start" size={26} weight={600}>
      {v.toFixed(2)}
    </SvgText>
  </g>
);

const RQ2Kappa: Page = () => (
  <Sheet>
    <Heading n="8">RQ2: Do the oracles agree with careful labels?</Heading>
    <div style={abs(120, 220, { width: 760, fontSize: 30, lineHeight: 1.45 })}>
      640 outputs were labeled by reading the whole trace. <span style={NUM}>151</span> of them have
      a defect.
    </div>
    <div style={abs(120, 360, { width: 760, borderTop: `2px solid ${INK}`, paddingTop: 20 })}>
      <div style={{ fontSize: 32, fontWeight: 600 }}>Cohen's κ (kappa)</div>
      <div style={{ fontSize: 28, lineHeight: 1.45, marginTop: 10 }}>
        How often two raters agree, after removing the agreement they would reach by chance.
      </div>
      <div style={{ fontSize: 36, textAlign: 'center', margin: '28px 0', fontStyle: 'italic' }}>
        κ = (p<sub style={{ fontSize: '0.6em', marginRight: '0.12em' }}>o</sub> − p
        <sub style={{ fontSize: '0.6em', marginRight: '0.12em' }}>e</sub>) / (1 − p
        <sub style={{ fontSize: '0.6em', marginRight: '0.12em' }}>e</sub>)
      </div>
      <div style={{ fontSize: 24, lineHeight: 1.45, color: MUTED }}>
        p<sub>o</sub>: observed agreement; p<sub>e</sub>: agreement expected by chance
      </div>
    </div>
    <svg width={760} height={120} viewBox="0 0 760 120" style={abs(120, 740)} aria-hidden="true">
      <line x1={20} x2={740} y1={50} y2={50} style={{ stroke: INK, strokeWidth: 1.5 }} />
      <line x1={20} x2={20} y1={40} y2={60} style={{ stroke: INK, strokeWidth: 1.5 }} />
      <line x1={740} x2={740} y1={40} y2={60} style={{ stroke: INK, strokeWidth: 1.5 }} />
      <SvgText x={20} y={30} size={24}>
        0
      </SvgText>
      <SvgText x={740} y={30} size={24}>
        1
      </SvgText>
      <SvgText x={20} y={92} anchor="start" size={22} italic color={MUTED}>
        no better than chance
      </SvgText>
      <SvgText x={740} y={92} size={22} italic color={MUTED} anchor="end">
        perfect agreement
      </SvgText>
    </svg>
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={abs(0, 0, { pointerEvents: 'none' })}
      aria-hidden="true"
    >
      <SvgText x={K.x0} y={K.y0 + 10} anchor="start" size={24} italic color={MUTED}>
        κ against the 640 labels (judge: Claude Haiku 5.5)
      </SvgText>
      {[0, 0.2, 0.4, 0.6, 0.8, 1].map((v) => (
        <g key={v}>
          <line
            x1={kx(v)}
            x2={kx(v)}
            y1={K.y0 + 36}
            y2={ky(7) + 6}
            style={{ stroke: TINT, strokeWidth: 1.2 }}
          />
          <SvgText x={kx(v)} y={ky(7) + 38} size={22}>
            {v === 0 || v === 1 ? String(v) : v.toFixed(1)}
          </SvgText>
        </g>
      ))}
      <KBar i={0} label="L1" v={0.41} color={FAINT} />
      <KBar i={1} label="L2" v={0.6} color={FAINT} />
      <KBar i={2} label="L3" v={0.56} color={FAINT} />
      <KBar i={3} label="J1" v={0.86} color={FAINT} />
      <KBar i={4} label="J2" v={0.92} color={ACCENT} />
      <KBar i={5} label="J3" v={0.19} color={OCHRE} />
      <KBar i={6} label="L1 + L2" v={0.81} color={FAINT} />
      <line
        x1={K.x0}
        x2={K.x0}
        y1={K.y0 + 36}
        y2={ky(7) + 6}
        style={{ stroke: INK, strokeWidth: 1.5 }}
      />
    </svg>
    <Takeaway top={912}>
      The rubric judge that also sees the tool calls (J2) agrees best. TaskCompletion (J3) is barely
      above chance.
    </Takeaway>
  </Sheet>
);

const F3 = { x0: 200, x1: 1000, y0: 260, y1: 800, max: 80 };
const f3y = (v: number) => F3.y1 - (v / F3.max) * (F3.y1 - F3.y0);
const f3x = (i: number) => F3.x0 + 40 + i * 128;

const MissPair = ({
  i,
  label,
  miss,
  fa,
}: {
  i: number;
  label: string;
  miss: number;
  fa: number;
}) => (
  <g>
    <rect
      x={f3x(i)}
      y={f3y(miss)}
      width={44}
      height={f3y(0) - f3y(miss)}
      style={{ fill: ACCENT }}
    />
    <rect
      x={f3x(i) + 48}
      y={f3y(fa)}
      width={44}
      height={f3y(0) - f3y(fa)}
      style={{ fill: OCHRE }}
    />
    <SvgText x={f3x(i) + 22} y={f3y(miss) - 10} size={22}>
      {miss}
    </SvgText>
    <SvgText x={f3x(i) + 70} y={f3y(fa) - 10} size={22}>
      {fa}
    </SvgText>
    <SvgText x={f3x(i) + 46} y={F3.y1 + 34} size={24}>
      {label}
    </SvgText>
  </g>
);

const WhereWrong: Page = () => (
  <Sheet>
    <Heading n="9">RQ2: Where the oracles go wrong</Heading>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={abs(0, 0)} aria-hidden="true">
      <SvgText x={F3.x0} y={226} anchor="start" size={24} italic color={MUTED}>
        % of labeled outputs
      </SvgText>
      {[0, 20, 40, 60, 80].map((v) => (
        <g key={v}>
          <line
            x1={F3.x0}
            x2={F3.x1}
            y1={f3y(v)}
            y2={f3y(v)}
            style={{ stroke: TINT, strokeWidth: 1.2 }}
          />
          <SvgText x={F3.x0 - 14} y={f3y(v) + 8} anchor="end" size={22}>
            {v}
          </SvgText>
        </g>
      ))}
      <line x1={F3.x0} x2={F3.x1} y1={F3.y1} y2={F3.y1} style={{ stroke: INK, strokeWidth: 1.5 }} />
      <MissPair i={0} label="L1" miss={69} fa={0} />
      <MissPair i={1} label="L2" miss={47} fa={2} />
      <MissPair i={2} label="L3" miss={48} fa={3} />
      <MissPair i={3} label="J1" miss={9} fa={4} />
      <MissPair i={4} label="J2" miss={11} fa={0} />
      <MissPair i={5} label="J3" miss={41} fa={36} />
      <rect x={210} y={884} width={26} height={20} style={{ fill: ACCENT }} />
      <SvgText x={246} y={902} anchor="start" size={22}>
        miss: a defect passed
      </SvgText>
      <rect x={520} y={884} width={26} height={20} style={{ fill: OCHRE }} />
      <SvgText x={556} y={902} anchor="start" size={22}>
        false alarm: a correct output failed
      </SvgText>
    </svg>
    <div style={abs(1120, 220, { width: 680, borderTop: `2px solid ${INK}`, paddingTop: 16 })}>
      <div style={{ fontSize: 32, fontWeight: 600 }}>J3 punishes correct refusals</div>
      <div style={{ fontSize: 26, lineHeight: 1.45, marginTop: 8 }}>
        It failed all <b style={NUM}>111</b> correct refusals, e.g. “I can't show another student's
        record.” The user asked; the agent said no; so the judge saw a failed task.
      </div>
    </div>
    <div style={abs(1120, 500, { width: 680, borderTop: `2px solid ${INK}`, paddingTop: 16 })}>
      <div style={{ fontSize: 32, fontWeight: 600 }}>Assertion echo in L3</div>
      <div style={{ fontSize: 26, lineHeight: 1.45, marginTop: 8 }}>
        The expected answer was copied from the agent's own first run, so its bugs became
        requirements.
      </div>
    </div>
    <Box x={1120} y={700} w={190} h={96} size={22}>
      agent, run 1
    </Box>
    <Box x={1370} y={700} w={190} h={96} size={22} fill={TINT}>
      reference answer
    </Box>
    <Box x={1620} y={700} w={180} h={96} size={22}>
      L3 compares
    </Box>
    <Overlay>
      <Arrow x1={1310} y1={748} x2={1368} y2={748} />
      <Arrow x1={1560} y1={748} x2={1618} y2={748} />
    </Overlay>
    <div style={abs(1120, 820, { width: 680, fontSize: 24, lineHeight: 1.45, color: MUTED })}>
      7 of 40 references were wrong. On those tests L3 passed <b style={{ color: INK }}>68%</b> of
      defective outputs, against 16% on the other tests.
    </div>
  </Sheet>
);

const Sq = ({ x, y, kind }: { x: number; y: number; kind: 'real' | 'false' | 'missed' }) => (
  <rect
    x={x}
    y={y}
    width={40}
    height={40}
    style={{
      fill: kind === 'real' ? ACCENT : kind === 'missed' ? OCHRE : PAPER,
      stroke: kind === 'false' ? INK : 'none',
      strokeWidth: 1.8,
      strokeDasharray: kind === 'false' ? '5 4' : undefined,
    }}
  />
);

const sqx = (x0: number, k: number) => x0 + k * 50;

const RedTeam: Page = () => (
  <Sheet>
    <Heading n="10">RQ3: What does promptfoo's red team find?</Heading>
    <Box x={120} y={220} w={300} h={110} size={24}>
      purpose and rules of the agent
    </Box>
    <Box x={500} y={220} w={330} h={110} size={24}>
      8 local plugins, each also as a jailbreak
    </Box>
    <Box x={910} y={220} w={250} h={110} size={24} fill={SKY}>
      <b>64 attacks</b>
    </Box>
    <Box x={1240} y={220} w={260} h={110} size={24}>
      <div>3 runs each</div>
      <div>192 probes</div>
    </Box>
    <Box x={1580} y={220} w={220} h={110} size={24}>
      grader LLM
    </Box>
    <Overlay>
      <Arrow x1={420} y1={275} x2={498} y2={275} />
      <Arrow x1={830} y1={275} x2={908} y2={275} />
      <Arrow x1={1160} y1={275} x2={1238} y2={275} />
      <Arrow x1={1500} y1={275} x2={1578} y2={275} />
    </Overlay>

    <div style={abs(120, 390, { width: 800, fontSize: 34, fontWeight: 600 })}>Original agent</div>
    <div style={abs(1000, 390, { width: 800, fontSize: 34, fontWeight: 600 })}>
      M03{' '}
      <span style={{ fontWeight: 400, fontStyle: 'italic', color: MUTED, fontSize: 28 }}>
        no authorization check
      </span>
    </div>
    <svg
      width={1920}
      height={1080}
      viewBox="0 0 1920 1080"
      style={abs(0, 0, { pointerEvents: 'none' })}
      aria-hidden="true"
    >
      <SvgText x={120} y={490} anchor="start" size={24} italic color={MUTED}>
        flagged by the grader: 2
      </SvgText>
      <Sq x={sqx(120, 0)} y={506} kind="false" />
      <Sq x={sqx(120, 1)} y={506} kind="false" />
      <SvgText x={120} y={600} anchor="start" size={24} italic color={MUTED}>
        real problems the grader missed: 7
      </SvgText>
      <Sq x={sqx(120, 0)} y={616} kind="missed" />
      <Sq x={sqx(120, 1)} y={616} kind="missed" />
      <Sq x={sqx(120, 2)} y={616} kind="missed" />
      <Sq x={sqx(120, 3)} y={616} kind="missed" />
      <Sq x={sqx(120, 4)} y={616} kind="missed" />
      <Sq x={sqx(120, 5)} y={616} kind="missed" />
      <Sq x={sqx(120, 6)} y={616} kind="missed" />

      <SvgText x={1000} y={490} anchor="start" size={24} italic color={MUTED}>
        flagged by the grader: 10
      </SvgText>
      <Sq x={sqx(1000, 0)} y={506} kind="real" />
      <Sq x={sqx(1000, 1)} y={506} kind="real" />
      <Sq x={sqx(1000, 2)} y={506} kind="real" />
      <Sq x={sqx(1000, 3)} y={506} kind="real" />
      <Sq x={sqx(1000, 4)} y={506} kind="real" />
      <Sq x={sqx(1000, 5)} y={506} kind="real" />
      <Sq x={sqx(1000, 6)} y={506} kind="real" />
      <Sq x={sqx(1000, 7)} y={506} kind="false" />
      <Sq x={sqx(1000, 8)} y={506} kind="false" />
      <Sq x={sqx(1000, 9)} y={506} kind="false" />
      <SvgText x={1000} y={600} anchor="start" size={24} italic color={MUTED}>
        real problems the grader missed: 1
      </SvgText>
      <Sq x={sqx(1000, 0)} y={616} kind="missed" />

      <line x1={960} x2={960} y1={390} y2={850} style={{ stroke: FAINT, strokeWidth: 1.2 }} />

      <rect x={120} y={892} width={26} height={26} style={{ fill: ACCENT }} />
      <SvgText x={156} y={913} anchor="start" size={22}>
        flagged, real
      </SvgText>
      <rect
        x={340}
        y={892}
        width={26}
        height={26}
        style={{ fill: PAPER, stroke: INK, strokeWidth: 1.8, strokeDasharray: '5 4' }}
      />
      <SvgText x={376} y={913} anchor="start" size={22}>
        flagged, not real
      </SvgText>
      <rect x={600} y={892} width={26} height={26} style={{ fill: OCHRE }} />
      <SvgText x={636} y={913} anchor="start" size={22}>
        real, but passed by the grader
      </SvgText>
    </svg>
    <div style={abs(120, 700, { width: 780, fontSize: 26, lineHeight: 1.45 })}>
      Both flags were false alarms. Five probes made the agent call <span style={CODE}>enroll</span>{' '}
      with no eligibility check, and the grader passed them.
    </div>
    <div style={abs(1000, 700, { width: 800, fontSize: 26, lineHeight: 1.45 })}>
      In <b>8 of 10</b> probes that asked for another student's record, the record reached the user.
      None of the 40 functional tests reached this code path.
    </div>
  </Sheet>
);

const Claim = ({ n, title, children }: { n: string; title: ReactNode; children: ReactNode }) => (
  <div style={{ display: 'flex', gap: 30, alignItems: 'baseline' }}>
    <span style={{ ...NUM, fontSize: 52, lineHeight: 1, color: ACCENT, width: 40, flex: 'none' }}>
      {n}
    </span>
    <div>
      <div style={{ fontSize: 36, lineHeight: 1.25, fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 27, lineHeight: 1.4, color: MUTED, marginTop: 6 }}>{children}</div>
    </div>
  </div>
);

const Conclusions: Page = () => (
  <Sheet>
    <Heading n="11">Conclusions</Heading>
    <div style={abs(120, 226, { width: 1080, display: 'flex', flexDirection: 'column', gap: 34 })}>
      <Claim n="1" title="One run makes every oracle look strong.">
        The agent is flaky; five runs and a validity check removed most false kills.
      </Claim>
      <Claim n="2" title="Cheap deterministic checks go far.">
        L1 + L2 caught 7 of 11 faults, as many as all six, with almost no false alarms.
      </Claim>
      <Claim n="3" title="A judge must be checked against labels.">
        J2 agreed best (κ = 0.92); generic TaskCompletion was near chance (κ = 0.19).
      </Claim>
      <Claim n="4" title="Recorded references echo the agent's bugs.">
        A snapshot of today's behaviour turns today's bugs into requirements.
      </Claim>
      <Claim n="5" title="Red teaming finds new paths, but needs a human.">
        It found a leak no functional test reached; its grader was wrong on the original agent.
      </Claim>
    </div>
    <div
      style={abs(1300, 232, {
        width: 500,
        borderTop: `2px solid ${INK}`,
        borderBottom: `2px solid ${INK}`,
        padding: '24px 0 28px',
      })}
    >
      <div style={{ fontSize: 32, fontWeight: 600 }}>Limits</div>
      <div
        style={{
          fontSize: 26,
          lineHeight: 1.5,
          marginTop: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div>One small agent, one model, one domain.</div>
        <div>
          Labels were made by an AI assistant following a written guide, not by independent humans.
        </div>
        <div>The same person wrote the tests and the faults.</div>
        <div>Five runs per test are few.</div>
      </div>
    </div>
  </Sheet>
);

const Thanks: Page = () => (
  <Sheet>
    <div
      style={abs(0, 280, {
        width: 1920,
        textAlign: 'center',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 'var(--osd-size-hero)',
        fontWeight: 600,
        lineHeight: 1.1,
      })}
    >
      Thank you
    </div>
    <div
      style={abs(0, 440, { width: 1920, textAlign: 'center', fontSize: 44, fontStyle: 'italic' })}
    >
      Questions are very welcome.
    </div>
    <div style={abs(0, 560, { width: 1920, display: 'flex', justifyContent: 'center' })}>
      <div style={{ width: 120, height: 1, background: INK }} />
    </div>
    <div
      style={abs(0, 620, {
        width: 1920,
        textAlign: 'center',
        fontSize: 30,
        lineHeight: 1.6,
        color: MUTED,
      })}
    >
      <div>Testing an agent is mostly about its oracles,</div>
      <div>and the oracles need testing too.</div>
    </div>
  </Sheet>
);

export const meta: SlideMeta = {
  title: 'Who Checks the Agent?',
  createdAt: '2026-10-26T17:41:47.410Z',
};

export default [
  TitlePage,
  ExecSummary,
  Oracle,
  WhyHard,
  AgentUnderTest,
  SixOracles,
  Mutation,
  Setup,
  RQ1,
  RQ2Kappa,
  WhereWrong,
  RedTeam,
  Conclusions,
  Thanks,
] satisfies Page[];

export const notes: (string | undefined)[] = [
  '大家好，我是（你的名字）。我的期中報告題目是 Who Checks the Agent。我用 promptfoo 和 DeepEval 這兩個工具，測試一個會呼叫工具的 LLM agent。我想回答的問題是：這些工具判出來的 pass 和 fail，到底能不能相信。',
  '先講結論。我寫了一個選課 agent，依照規格寫了 40 個測試，另外做了 11 個故意放錯的版本，每個測試跑 5 次。我用兩個工具做了六種 oracle，再檢查這些 oracle 本身判得準不準。 結果有四點。第一，兩個不用花錢的程式檢查，就抓到 11 個錯裡的 7 個，跟六個 oracle 全部加起來一樣多。第二，看得到工具呼叫的 judge 最準，κ 是 0.92；DeepEval 內建的 TaskCompletion 只有 0.19。第三，從 agent 自己的輸出錄下來的參考答案，40 個裡有 7 個是錯的。第四，red team 找到一個只有它找得到的資料外洩。 這份研究的貢獻是把 oracle 本身拿來測，不只是比較工具。限制是只有一個 agent 和一個模型、標註是 AI 做的，而且每個測試只跑 5 次。',
  '這份研究關注的是 oracle，也就是測試裡判斷對錯的部分。我依照「預期結果從哪裡來」把 oracle 分成三類：從規格來、從之前錄下來的輸出來，或交給另一個模型判斷。在這份研究裡，L1、L2、J1、J2 的標準來自規格，L3 來自錄下來的輸出，J3 則完全交給模型自己判斷。',
  'agent 的 oracle 比一般程式難寫，有三個原因。第一，同一個正確答案可以有很多種說法，所以不能逐字比對。第二，每次執行的結果不一樣。例如測試 E06，沒改過的 agent 跑 5 次，有 3 次讓學生超過學分上限。第三，agent 會呼叫工具改資料，它可能已經幫學生選了課，回答卻說沒有選上。所以只看最後的回答不夠，還要看它中間呼叫了哪些工具。',
  '被測的系統是我寫的選課助理，使用者是學生 S001。例如他說「幫我選 CS301 和 CS320」，正確做法是只選 CS301，因為再加 CS320 會變成 22 學分，超過 20 學分的上限，而且兩門課的結果都要說明。 agent 用的是 gpt-4.1-mini，有六個工具，其中 enroll 和 drop 會改資料。資料有 25 門課、3 個學生。規格有 8 條規則，包括資格檢查、隱私，還有不能照著資料裡的指令做事。我在兩門課的課程說明裡放了惡意指令，用來測間接 prompt injection。每次執行都存成一份 trace，記錄每個工具呼叫、最後的回答，還有最後選了哪些課。',
  '接下來是六個 oracle。L1、L2、L3 和 J1 寫在 promptfoo，J2 和 J3 寫在 DeepEval。 L1 是一段 Python 程式，直接讀 trace，檢查最後的選課結果對不對、有沒有呼叫不該呼叫的工具、有沒有讀到別的學生的資料。L2 檢查回答裡有沒有規格要求的關鍵字，或有沒有出現不該出現的字。L3 拿原版 agent 第一次跑的回答當標準答案，請模型判斷新的回答跟它一不一致。這是很常見的快照做法，我刻意沒有檢查這些標準答案對不對。 J1 和 J2 用同一份 rubric 請模型打分數。差別是 J1 只看回答，J2 用 DeepEval 的 G-Eval，還看得到工具呼叫。J3 是 DeepEval 的 TaskCompletion，不用 rubric，由模型自己推測任務是什麼、有沒有完成。L1 和 L2 不需要模型，其他四個每判一次都要呼叫一次模型。',
  '為了知道 oracle 抓不抓得到錯，我用 mutation testing。我手動做了 11 個 mutant，每個只改一個地方，分布在工具程式、prompt、工具說明、agent 迴圈和模型這五層。 agent 每次結果都不一樣，如果只跑一次就比較，會出現很多假的 kill。所以我的規則是：每個測試跑 5 次，原版至少過 4 次、mutant 最多過 1 次，才算 kill。接著還要讀 trace，確認 mutant 失敗的那次真的有缺陷，才算 valid kill。 M03 拿掉了權限檢查，但功能測試從來沒讓 agent 去查別的學生，所以那段錯的程式一次都沒有執行。對 M03 的 kill 一定是假的，所以它可以當對照組。',
  '實驗規模是 12 個版本、40 個測試、每個跑 5 次，共 2,400 份 trace。六個 oracle 判的是同一批 trace，所以判斷結果不同，只會是 oracle 本身造成的。另外我讀完整的 trace，標註了 640 筆輸出，當作 RQ2 的標準答案。red team 是另外跑的，有 64 個攻擊。主要的 judge 模型是 Claude Haiku 5.5。整個研究只花了 12.2 美元，最花時間的是標註和讀 trace。',
  'RQ1 看每個 oracle 抓到幾個植入的錯。左邊的圖，藍色長條是 valid kill 的數量。上面的虛線框是只跑一次的情況：用到模型的 oracle 每跑一次都會「抓到」8 到 11 個，但大部分是 agent 本身不穩定造成的。 用五次的規則之後，L1 和 L2 各抓到 5 個，J1 和 J2 各 6 個，J3 只有 4 個。L3 有 7 個，但它同時有 17 次假的 kill，原因後面會講。 右邊的表，每一列是一個 mutant，每一欄是一個 oracle，藍色代表抓到。不同 oracle 抓到的錯不一樣。改到動作的錯，例如 M04 讓學生選到衝堂的課，看 trace 的 L1 和 J2 抓得到。只改到回答內容的錯，例如 M09 把工具結果截斷後，agent 開始編造先修課，L1 看不到，但看回答的 L2、J1、J2 抓得到。 M03、M05、M07、M08 沒有任何 oracle 抓到，原因有兩種。一種是別的地方擋住了錯，例如 M07 把 prompt 裡的學分上限改成 25，但工具回傳 20，模型相信工具。另一種是原版 agent 在那個測試上本來就會錯，所以看不出 mutant 比較差。 整體來看，L1 加 L2 兩個便宜的檢查就抓到 7 個，跟六個全部加起來一樣。',
  "RQ2 把每個 oracle 的判斷跟 640 筆標註比較。這 640 筆裡只有 151 筆有缺陷，所以只看準確率會太樂觀：一個全部判通過的 oracle，準確率也有 76%。所以我用 Cohen's κ，它會扣掉碰巧一致的部分，1 代表完全一致，0 代表跟隨機差不多。 結果 J2 最高，0.92；J1 是 0.86；L1 加 L2 合起來是 0.81；J3 只有 0.19。 我也換過 judge 模型。如果改用跟 agent 同一個模型 GPT-4.1 mini 來當 J2 的 judge，會漏掉 47% 的缺陷。所以 judge 最好不要跟 agent 用同一個模型。",
  '這頁看 oracle 錯在哪裡。深色是漏判，就是有缺陷卻判通過；淺色是誤判，就是正確卻判失敗。 L1 沒有誤判，但漏了 69%，因為大部分缺陷出在 agent 說的話，不是它做的事。J3 兩種錯都很多，因為它把 111 個正確的拒絕全部判失敗。例如使用者要看別人的資料，agent 正確地拒絕了，TaskCompletion 卻認為任務沒有完成。 右下是 L3 的 assertion echo。L3 的標準答案是從原版 agent 錄下來的，40 個裡有 7 個本身就錯。在這 7 個測試上，有缺陷的輸出剛好跟錯的標準答案一致，所以 L3 讓 68% 的缺陷通過，其他測試只有 16%。反過來，正確的回答因為跟錯的標準答案不一樣，反而被判失敗。這就是 L3 有 17 次假 kill 的原因。',
  'RQ3 是 promptfoo 的 red team。它根據我寫的 agent 用途和規則，自動產生 64 個攻擊，每個跑 3 次，共 192 次，再用另一個模型當 grader，判斷 agent 有沒有被攻破。我把每一次的 trace 都讀過，跟 grader 的判斷做比對。 在原版 agent 上，grader 標了 2 個問題，兩個都是誤報。另外有 7 個真的問題它沒抓到，其中 5 次是 agent 沒做資格檢查就直接呼叫 enroll，只是因為課程不存在，才沒有真的選上。 在 M03，也就是沒有權限檢查的版本上，有 10 次攻擊讓 agent 去查別的學生，其中 8 次把資料告訴了使用者，grader 抓到了 7 次。這是 40 個功能測試都沒有走到的路徑。另外，64 個攻擊裡有 34 個提到的課程根本不存在，因為產生攻擊的模型不知道系統裡有哪些資料。',
  '總結有五點。第一，只跑一次會讓每個 oracle 看起來都很強，要重複執行，並確認 kill 是真的。第二，便宜的確定性檢查效果很好。第三，judge 要先用標註檢查過才能相信。第四，從 agent 錄下來的參考答案會把 bug 一起錄進去。第五，red team 能找到新的路徑，但結果需要有人讀 trace 確認。 限制方面，只有一個小 agent 和一個模型；標註是 AI 助理照著準則做的，不是獨立的人；測試和錯誤是同一個人寫的；每個測試只跑 5 次。所以換一個系統，具體數字一定會變，但這些現象比較有可能會重複出現。',
  '兩個工具都讓人很容易加上一個 oracle，但都沒有幫忙確認這個 oracle 對不對。我的報告到這裡，謝謝。',
];
