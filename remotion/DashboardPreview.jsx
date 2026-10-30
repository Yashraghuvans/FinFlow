import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, font } from "./theme";

const STATS = [
  { label: "Bank disbursed", value: 42.5, suffix: "L", tone: colors.blue },
  { label: "Owner direct", value: 8.2, suffix: "L", tone: colors.primary },
  { label: "Pre-EMI paid", value: 1.84, suffix: "L", tone: colors.orange },
  { label: "Agreement value", value: 85.0, suffix: "L", tone: colors.muted },
];

const CHART_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const CHART_VALUES = [0.35, 0.55, 0.45, 0.72, 0.68, 0.85];

const TRANSACTIONS = [
  { type: "Bank disbursement", date: "Oct 12", amount: "₹12,50,000", tag: "blue" },
  { type: "Pre-EMI interest", date: "Oct 01", amount: "₹18,420", tag: "orange" },
  { type: "Owner direct", date: "Sep 28", amount: "₹3,00,000", tag: "indigo" },
];

function enterSpring(frame, delay, fps) {
  return spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.7 },
  });
}

function StatCard({ stat, index, frame, fps }) {
  const prog = enterSpring(frame, 35 + index * 12, fps);
  const opacity = interpolate(prog, [0, 1], [0, 1]);
  const y = interpolate(prog, [0, 1], [24, 0]);
  const displayVal = interpolate(
    prog,
    [0, 1],
    [0, stat.value],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        padding: 14,
        borderRadius: 12,
        border: `1px solid ${colors.border}`,
        background: colors.surface,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: `${stat.tone}22`,
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: stat.tone,
          }}
        />
      </div>
      <div
        style={{
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: colors.mutedDark,
          marginBottom: 4,
        }}
      >
        {stat.label}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: colors.text,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        ₹{displayVal.toFixed(2)}
        <span style={{ fontSize: 14, color: colors.mutedDark, marginLeft: 2 }}>
          {stat.suffix}
        </span>
      </div>
    </div>
  );
}

function tagStyle(tag) {
  if (tag === "blue")
    return { bg: "rgba(96,165,250,0.12)", color: colors.blue, border: "rgba(96,165,250,0.25)" };
  if (tag === "orange")
    return { bg: "rgba(249,115,22,0.12)", color: colors.orange, border: "rgba(249,115,22,0.25)" };
  return { bg: colors.primaryMuted, color: "#a5b4fc", border: "rgba(99,102,241,0.3)" };
}

export const DashboardPreview = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shellIn = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const shellOpacity = interpolate(shellIn, [0, 1], [0, 1]);
  const shellScale = interpolate(shellIn, [0, 1], [0.96, 1]);

  const progressFill = interpolate(
    frame,
    [100, 165],
    [0, 68.4],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const debtPct = interpolate(frame, [110, 170], [0, 61.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const toastProg = spring({
    frame: frame - 300,
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const toastY = interpolate(toastProg, [0, 1], [20, 0]);
  const toastOpacity = interpolate(toastProg, [0, 1], [0, 1]);

  const cursorBlink = Math.floor(frame / 15) % 2 === 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        fontFamily: font,
        padding: 28,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 16,
          border: `1px solid ${colors.border}`,
          background: `linear-gradient(165deg, ${colors.surfaceElevated} 0%, ${colors.surface} 45%, ${colors.bg} 100%)`,
          boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
          overflow: "hidden",
          display: "flex",
          opacity: shellOpacity,
          transform: `scale(${shellScale})`,
          transformOrigin: "center center",
        }}
      >
        {/* Sidebar */}
          <aside
            style={{
              width: 168,
              borderRight: `1px solid ${colors.border}`,
              padding: "20px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              background: "rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: colors.primaryMuted,
                  color: "#c7d2fe",
                  fontSize: 14,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                F
              </div>
              <span style={{ color: colors.text, fontWeight: 600, fontSize: 15 }}>FinFlow</span>
            </div>
            {["Overview", "Ledger", "Scenarios"].map((item, i) => {
              const active = i === 0;
              const p = enterSpring(frame, 18 + i * 6, fps);
              return (
                <div
                  key={item}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    color: active ? colors.text : colors.muted,
                    background: active ? "rgba(255,255,255,0.08)" : "transparent",
                    opacity: interpolate(p, [0, 1], [0, 1]),
                    transform: `translateX(${interpolate(p, [0, 1], [-12, 0])}px)`,
                  }}
                >
                  {item}
                </div>
              );
            })}
            <div style={{ flex: 1 }} />
            <div
              style={{
                padding: 12,
                borderRadius: 10,
                border: `1px solid ${colors.border}`,
                fontSize: 11,
                color: colors.muted,
                lineHeight: 1.4,
                opacity: interpolate(enterSpring(frame, 45, fps), [0, 1], [0, 1]),
              }}
            >
              <div style={{ color: colors.accent, fontWeight: 600, marginBottom: 4 }}>
                Live sync
              </div>
              Bank API · 2m ago
            </div>
          </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
          {/* Header */}
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 12,
              opacity: interpolate(enterSpring(frame, 22, fps), [0, 1], [0, 1]),
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#818cf8",
                  marginBottom: 6,
                }}
              >
                Project overview
              </div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: colors.text }}>
                Prestige Falcon City
              </h1>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: colors.muted }}>
                Builder: <span style={{ color: "#e4e4e7" }}>Prestige Group</span>
              </p>
            </div>
            <div
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid rgba(99,102,241,0.35)",
                background: colors.primaryMuted,
                fontSize: 11,
                color: "#c7d2fe",
                display: "flex",
                alignItems: "center",
                gap: 6,
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: colors.primary,
                  boxShadow: cursorBlink ? `0 0 8px ${colors.primary}` : "none",
                }}
              />
              Active construction
            </div>
          </header>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 4,
              padding: 4,
              borderRadius: 10,
              border: `1px solid ${colors.border}`,
              background: "rgba(0,0,0,0.2)",
              width: "fit-content",
              opacity: interpolate(enterSpring(frame, 28, fps), [0, 1], [0, 1]),
            }}
          >
            {["overview", "ledger", "scenarios"].map((tab, i) => (
              <div
                key={tab}
                style={{
                  padding: "6px 14px",
                  borderRadius: 7,
                  fontSize: 12,
                  fontWeight: 500,
                  textTransform: "capitalize",
                  color: i === 0 ? "#18181b" : colors.muted,
                  background: i === 0 ? "#fafafa" : "transparent",
                }}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 10 }}>
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} frame={frame} fps={fps} />
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, flex: 1, minHeight: 0 }}>
            {/* Progress + chart */}
            <div
              style={{
                flex: 1.4,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  padding: 16,
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`,
                  background: colors.surface,
                  opacity: interpolate(enterSpring(frame, 85, fps), [0, 1], [0, 1]),
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: colors.text }}>
                      Project liquidity
                    </div>
                    <div style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>
                      Capital deployed vs agreement
                    </div>
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 600, color: "#818cf8", fontVariantNumeric: "tabular-nums" }}>
                    {progressFill.toFixed(1)}%
                  </div>
                </div>
                <div
                  style={{
                    height: 8,
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.06)",
                    border: `1px solid ${colors.border}`,
                    padding: 2,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${progressFill}%`,
                      borderRadius: 999,
                      background: `linear-gradient(90deg, ${colors.primary}, ${colors.blue})`,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 8,
                    fontSize: 10,
                    color: colors.mutedDark,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  <span>Initiated</span>
                  <span>₹26.84L to possession</span>
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  padding: 16,
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`,
                  background: colors.surface,
                  opacity: interpolate(enterSpring(frame, 120, fps), [0, 1], [0, 1]),
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: colors.text, marginBottom: 4 }}>
                  Disbursement pace
                </div>
                <div style={{ fontSize: 11, color: colors.muted, marginBottom: 14 }}>
                  Tranche releases · last 6 months
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 8,
                    height: 100,
                    paddingTop: 4,
                  }}
                >
                  {CHART_VALUES.map((val, i) => {
                    const barProg = interpolate(
                      frame,
                      [140 + i * 8, 200 + i * 8],
                      [0, val],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    );
                    return (
                      <div
                        key={CHART_MONTHS[i]}
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: `${barProg * 100}%`,
                            minHeight: 4,
                            borderRadius: 4,
                            background:
                              i === CHART_VALUES.length - 1
                                ? `linear-gradient(180deg, ${colors.accent}, ${colors.primary})`
                                : "rgba(99,102,241,0.45)",
                          }}
                        />
                        <span style={{ fontSize: 9, color: colors.mutedDark }}>{CHART_MONTHS[i]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
              <div
                style={{
                  padding: 14,
                  borderRadius: 12,
                  border: "1px solid rgba(99,102,241,0.25)",
                  background: colors.primaryMuted,
                  opacity: interpolate(enterSpring(frame, 95, fps), [0, 1], [0, 1]),
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#a5b4fc",
                    marginBottom: 10,
                  }}
                >
                  Financial health
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 8 }}>
                  <span style={{ color: colors.muted }}>Debt utilized</span>
                  <span style={{ color: colors.text, fontWeight: 600 }}>{debtPct.toFixed(1)}%</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                  <span style={{ color: colors.muted }}>Interest accrued</span>
                  <span style={{ color: colors.orange, fontWeight: 600 }}>₹1,84,200</span>
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`,
                  background: colors.surface,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    padding: "12px 14px",
                    borderBottom: `1px solid ${colors.border}`,
                    fontSize: 13,
                    fontWeight: 600,
                    color: colors.text,
                    opacity: interpolate(enterSpring(frame, 200, fps), [0, 1], [0, 1]),
                  }}
                >
                  Recent movements
                </div>
                {TRANSACTIONS.map((tx, i) => {
                  const p = enterSpring(frame, 215 + i * 14, fps);
                  const ts = tagStyle(tx.tag);
                  return (
                    <div
                      key={tx.type + tx.date}
                      style={{
                        padding: "12px 14px",
                        borderBottom: `1px solid ${colors.border}`,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 8,
                        opacity: interpolate(p, [0, 1], [0, 1]),
                        transform: `translateX(${interpolate(p, [0, 1], [16, 0])}px)`,
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            display: "inline-block",
                            fontSize: 9,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                            padding: "3px 8px",
                            borderRadius: 999,
                            marginBottom: 4,
                            color: ts.color,
                            background: ts.bg,
                            border: `1px solid ${ts.border}`,
                          }}
                        >
                          {tx.type}
                        </div>
                        <div style={{ fontSize: 11, color: colors.mutedDark }}>{tx.date}</div>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: colors.text, whiteSpace: "nowrap" }}>
                        {tx.amount}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Toast */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          right: 44,
          padding: "12px 16px",
          borderRadius: 12,
          border: `1px solid ${colors.border}`,
          background: colors.surfaceElevated,
          boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: toastOpacity,
          transform: `translateY(${toastY}px)`,
          maxWidth: 320,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "rgba(20,184,166,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.accent,
            fontSize: 18,
          }}
        >
          ✓
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>
            Bank tranche received
          </div>
          <div style={{ fontSize: 11, color: colors.muted, marginTop: 2 }}>
            ₹12.5L logged · Ledger updated
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
