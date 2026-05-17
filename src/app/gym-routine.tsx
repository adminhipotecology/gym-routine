"use client";

import { useState, useEffect } from "react";

type ExerciseType = "compound" | "isolation" | "core";

type IconKey =
  | "squat"
  | "bench"
  | "shoulderPress"
  | "lateralRaise"
  | "tricep"
  | "core"
  | "deadlift"
  | "pullup"
  | "row"
  | "facePull"
  | "curl"
  | "hipThrust"
  | "superset"
  | "chop";

type Exercise = {
  name: string;
  detail: string;
  type: ExerciseType;
  icon: IconKey;
};

const ICONS: Record<IconKey, React.ReactNode> = {
  squat: (
    <>
      <circle cx="12" cy="4.5" r="1.8" />
      <path d="M12 6.5v4l-3 4.5v5M12 10.5l3 4.5v5" />
      <path d="M6 9h12" strokeWidth="2.4" />
    </>
  ),
  bench: (
    <>
      <path d="M3 11h18M5 11v5M19 11v5" />
      <circle cx="12" cy="7.5" r="1.6" />
      <path d="M8 9l4-1.5 4 1.5" />
    </>
  ),
  shoulderPress: (
    <>
      <circle cx="12" cy="4.5" r="1.6" />
      <path d="M12 6v6M8 12h8M6 4h2M16 4h2M5 3v2M19 3v2M12 12v8M9 20h6" />
    </>
  ),
  lateralRaise: (
    <>
      <circle cx="12" cy="5" r="1.6" />
      <path d="M12 6.5v8M4 10h4M16 10h4M3 9v2M21 9v2M12 14.5v6M9 20.5h6" />
    </>
  ),
  tricep: (
    <>
      <path d="M5 4h14M5 4v3M19 4v3M12 7v6" />
      <path d="M9 13h6M10 13l-1 6M14 13l1 6" />
    </>
  ),
  core: (
    <>
      <ellipse cx="12" cy="12" rx="8" ry="5" />
      <path d="M9 10v4M12 9.5v5M15 10v4" />
    </>
  ),
  deadlift: (
    <>
      <circle cx="12" cy="4.5" r="1.6" />
      <path d="M12 6v6M9 12h6M9 12l-2 6M15 12l2 6" />
      <path d="M4 20h16" strokeWidth="2.4" />
      <circle cx="6" cy="20" r="1.6" fill="currentColor" />
      <circle cx="18" cy="20" r="1.6" fill="currentColor" />
    </>
  ),
  pullup: (
    <>
      <path d="M3 4h18" strokeWidth="2.2" />
      <path d="M9 4v3M15 4v3" />
      <circle cx="12" cy="9" r="1.6" />
      <path d="M12 10.5v5M10 15.5h4M11 15.5l-1 5M13 15.5l1 5" />
    </>
  ),
  row: (
    <>
      <circle cx="6" cy="9" r="1.6" />
      <path d="M6 10.5v4M7.5 11l4-1M11.5 10l4 2 4-1.5" />
      <path d="M6 14.5l-1 5M6 14.5l2 5" />
    </>
  ),
  facePull: (
    <>
      <circle cx="8" cy="8" r="1.6" />
      <path d="M9.5 8l5-1.5 5 1M8 9.5v5M6 14.5h4M7 14.5l-1 5M9 14.5l1 5" />
    </>
  ),
  curl: (
    <>
      <circle cx="12" cy="5" r="1.6" />
      <path d="M12 6.5v3M10 9.5h4M9 13l3-3 3 3M9 13v4M15 13v4M7 17h4M13 17h4" />
    </>
  ),
  hipThrust: (
    <>
      <path d="M3 17h18" strokeWidth="2.2" />
      <circle cx="6" cy="14" r="1.6" />
      <path d="M7.5 14l4-1 4 2.5M11 13l3-5M13 8l3 1" />
      <path d="M16 16v2M19 14v4" />
    </>
  ),
  superset: (
    <>
      <path d="M5 8h6M5 16h6" />
      <circle cx="13" cy="8" r="1.4" />
      <circle cx="13" cy="16" r="1.4" />
      <path d="M16 5l3 3-3 3M19 8h-4M8 13l-3 3 3 3M5 16h4" />
    </>
  ),
  chop: (
    <>
      <circle cx="9" cy="5" r="1.6" />
      <path d="M9 6.5v5M6 11.5h6M9 11.5l-2 5M11 11.5l2 5" />
      <path d="M14 7l5 3-3 4" strokeWidth="2" />
    </>
  ),
};

function ExerciseIcon({ icon, color }: { icon: IconKey; color: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {ICONS[icon]}
    </svg>
  );
}

type Day = {
  label: string;
  sub: string;
  focus: string;
  color: string;
  bg: string;
  exercises: Exercise[];
};

const ROUTINE: Record<"a" | "b" | "c", Day> = {
  a: {
    label: "Day A",
    sub: "Mon / Push + Legs",
    focus: "Chest · Quads · Shoulders · Triceps · Core",
    color: "#2563eb",
    bg: "#eff6ff",
    exercises: [
      { name: "Barbell or dumbbell squat", detail: "4 sets × 6–8 reps · 2 min rest", type: "compound", icon: "squat" },
      { name: "Incline dumbbell press", detail: "3 sets × 8–10 reps · 90 s rest", type: "compound", icon: "bench" },
      { name: "Dumbbell shoulder press", detail: "3 sets × 10 reps · 90 s rest", type: "compound", icon: "shoulderPress" },
      { name: "Cable or machine lateral raises", detail: "3 sets × 12–15 reps · 60 s rest", type: "isolation", icon: "lateralRaise" },
      { name: "Tricep pushdowns (rope)", detail: "3 sets × 12 reps · 60 s rest", type: "isolation", icon: "tricep" },
      { name: "Ab wheel or plank", detail: "3 sets × 30–45 s · 45 s rest", type: "core", icon: "core" },
    ],
  },
  b: {
    label: "Day B",
    sub: "Wed / Pull + Posterior Chain",
    focus: "Back · Hamstrings · Biceps · Rear delts · Core",
    color: "#7c3aed",
    bg: "#f5f3ff",
    exercises: [
      { name: "Romanian deadlift", detail: "4 sets × 6–8 reps · 2 min rest", type: "compound", icon: "deadlift" },
      { name: "Pull-ups or lat pulldown", detail: "3 sets × 6–10 reps · 90 s rest", type: "compound", icon: "pullup" },
      { name: "Cable or dumbbell row", detail: "3 sets × 10 reps · 90 s rest", type: "compound", icon: "row" },
      { name: "Face pulls (cable)", detail: "3 sets × 15 reps · 60 s rest", type: "isolation", icon: "facePull" },
      { name: "Hammer curls", detail: "3 sets × 12 reps · 60 s rest", type: "isolation", icon: "curl" },
      { name: "Dead bug or hollow hold", detail: "3 sets × 30 s · 45 s rest", type: "core", icon: "core" },
    ],
  },
  c: {
    label: "Day C",
    sub: "Fri / Full Body Power",
    focus: "Glutes · Chest · Back · Shoulders · Arms · Core",
    color: "#0f766e",
    bg: "#f0fdfa",
    exercises: [
      { name: "Hip thrust or goblet squat", detail: "4 sets × 8–10 reps · 90 s rest", type: "compound", icon: "hipThrust" },
      { name: "Dumbbell bench press", detail: "3 sets × 10 reps · 90 s rest", type: "compound", icon: "bench" },
      { name: "Single-arm dumbbell row", detail: "3 sets × 10 reps each · 60 s rest", type: "compound", icon: "row" },
      { name: "Arnold press", detail: "3 sets × 10 reps · 60 s rest", type: "compound", icon: "shoulderPress" },
      { name: "Superset: curls + skullcrushers", detail: "3 rounds × 10 each · 60 s rest", type: "isolation", icon: "superset" },
      { name: "Cable woodchop or Pallof press", detail: "3 sets × 12 reps each side · 45 s rest", type: "core", icon: "chop" },
    ],
  },
};

const TIPS = [
  { icon: "🏃", title: "Sport days", body: "Keep gym and run days separate when possible. If you play football or tennis on a gym day, gym first and go –1 set per exercise." },
  { icon: "📈", title: "Progressive overload", body: "Add 1–2 kg/week on big lifts when you hit the top of the rep range cleanly. That's the only rule that really matters." },
  { icon: "🌙", title: "Recovery", body: "7–8 h sleep, protein ~1.6 g/kg bodyweight, and at least one rest day between gym sessions." },
  { icon: "📅", title: "Example week", body: "Mon: Day A · Tue: run · Wed: Day B · Thu: football/tennis · Fri: Day C · Sat: run or rest · Sun: rest" },
  { icon: "⏱", title: "Stay under 45 mins", body: "Stick to rest times. Drop isolations before compounds if pressed for time." },
];

const badgeStyle = (type: ExerciseType) => {
  if (type === "compound") return { background: "#fef3c7", color: "#92400e", border: "1px solid #fde68a" };
  if (type === "isolation") return { background: "#f3f4f6", color: "#4b5563", border: "1px solid #e5e7eb" };
  return { background: "#dcfce7", color: "#166534", border: "1px solid #bbf7d0" };
};

const STORAGE_KEY = "gym_routine_checked";

type DayKey = "a" | "b" | "c";
type TabKey = DayKey | "notes";

export default function GymRoutine() {
  const [tab, setTab] = useState<TabKey>("a");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  const persist = (next: Record<string, boolean>) => {
    setChecked(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const toggle = (day: DayKey, idx: number) => {
    const key = `${day}-${idx}`;
    persist({ ...checked, [key]: !checked[key] });
  };

  const clearDay = (day: DayKey) => {
    const next = Object.fromEntries(Object.entries(checked).filter(([k]) => !k.startsWith(day + "-")));
    persist(next);
  };

  const dayDone = (day: DayKey) => ROUTINE[day].exercises.every((_, i) => checked[`${day}-${i}`]);

  if (!loaded) return <div style={{ padding: "2rem", color: "#6b7280", fontFamily: "sans-serif" }}>Loading…</div>;

  const isNotes = tab === "notes";
  const day = isNotes ? null : ROUTINE[tab];

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", maxWidth: 560, margin: "0 auto", padding: "1.5rem 1rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "#9ca3af", textTransform: "uppercase", marginBottom: 4 }}>3-day programme</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "#111827" }}>Full Body Gym Routine</h1>
        <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>45 min · 3× per week · paired with running & sport</div>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {(["a", "b", "c", "notes"] as TabKey[]).map((t) => {
          const isActive = tab === t;
          const d = t === "notes" ? null : ROUTINE[t];
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "7px 16px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500,
                background: isActive ? (t === "notes" ? "#111827" : d!.color) : "#f3f4f6",
                color: isActive ? "#fff" : "#374151",
                transition: "all .15s",
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              {t !== "notes" && dayDone(t) && <span style={{ fontSize: 11 }}>✓</span>}
              {t === "notes" ? "Notes & tips" : d!.label}
            </button>
          );
        })}
      </div>

      {day && !isNotes && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#111827" }}>{day.sub}</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{day.focus}</div>
            </div>
            <button
              onClick={() => clearDay(tab as DayKey)}
              style={{ fontSize: 11, color: "#9ca3af", background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}
            >
              Reset
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {day.exercises.map((ex, i) => {
              const isChecked = !!checked[`${tab}-${i}`];
              return (
                <div
                  key={i}
                  onClick={() => toggle(tab as DayKey, i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "12px 14px",
                    background: isChecked ? day.bg : "#fff",
                    border: `1px solid ${isChecked ? day.color + "40" : "#e5e7eb"}`,
                    borderRadius: 12, cursor: "pointer", transition: "all .15s",
                    opacity: isChecked ? 0.75 : 1,
                  }}
                >
                  <div style={{
                    width: 24, height: 24, borderRadius: 6, border: `2px solid ${isChecked ? day.color : "#d1d5db"}`,
                    background: isChecked ? day.color : "transparent", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center", transition: "all .15s",
                  }}>
                    {isChecked && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: day.bg, border: `1px solid ${day.color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <ExerciseIcon icon={ex.icon} color={day.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", textDecorationLine: isChecked ? "line-through" : "none", textDecorationColor: "#9ca3af" }}>{ex.name}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 1 }}>{ex.detail}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 20, whiteSpace: "nowrap", ...badgeStyle(ex.type) }}>
                    {ex.type}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: "#6b7280", background: "#f9fafb", border: "1px solid #e5e7eb", padding: "5px 12px", borderRadius: 999 }}>⏱ ~42 mins</span>
            <span style={{ fontSize: 12, color: "#6b7280", background: "#f9fafb", border: "1px solid #e5e7eb", padding: "5px 12px", borderRadius: 999 }}>🔥 5 min warm-up on bike</span>
          </div>
        </div>
      )}

      {isNotes && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {TIPS.map((tip, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "14px 16px", display: "flex", gap: 14 }}>
              <div style={{ fontSize: 22, flexShrink: 0 }}>{tip.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 3 }}>{tip.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{tip.body}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
