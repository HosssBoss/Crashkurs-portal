"use client";

import { useState, useEffect, useRef } from "react";
import { quizData } from "@/lib/quiz-data";
import { saveSession } from "@/app/actions/sessions";
import type { QuestionResult } from "@/app/actions/sessions";
import type { Question } from "@/lib/quiz-data";

const OPTION_LETTERS = ["A", "B", "C", "D", "E"] as const;
const EXAM_QUESTION_COUNT = 50;
const EXAM_SECONDS = 90;

const fachColors: Record<string, { text: string; bg: string; border: string; bar: string; topicBtn: string; pill: string }> = {
  biochemie:   { text: "text-emerald-300", bg: "bg-emerald-950/60", border: "border-emerald-800/40", bar: "bg-emerald-600", topicBtn: "bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 hover:bg-emerald-900/50", pill: "bg-emerald-950/60 text-emerald-300 border border-emerald-800/35" },
  chemie:      { text: "text-amber-300",   bg: "bg-amber-950/60",   border: "border-amber-800/40",   bar: "bg-amber-600",   topicBtn: "bg-amber-950/60 text-amber-300 border border-amber-800/40 hover:bg-amber-900/50",     pill: "bg-amber-950/60 text-amber-300 border border-amber-800/35"   },
  physik:      { text: "text-indigo-300",  bg: "bg-indigo-950/60",  border: "border-indigo-800/40",  bar: "bg-indigo-500",  topicBtn: "bg-indigo-950/60 text-indigo-300 border border-indigo-800/40 hover:bg-indigo-900/50",   pill: "bg-indigo-950/60 text-indigo-300 border border-indigo-800/35"  },
  physiologie: { text: "text-rose-300",    bg: "bg-rose-950/60",    border: "border-rose-800/40",    bar: "bg-rose-600",    topicBtn: "bg-rose-950/60 text-rose-300 border border-rose-800/40 hover:bg-rose-900/50",           pill: "bg-rose-950/60 text-rose-300 border border-rose-800/35"         },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type ExamQuestion = Question & { topicName?: string };

function buildExamQuestions(fach: string): ExamQuestion[] {
  const topics = quizData[fach]?.topics ?? [];
  const all = topics.flatMap((t) => t.questions.map((q) => ({ ...q, topicName: t.name })));
  return shuffle(all).slice(0, EXAM_QUESTION_COUNT);
}

// ── Donut Chart ───────────────────────────────────────────────────────────────
function DonutChart({ correct, wrong }: { correct: number; wrong: number }) {
  const total = correct + wrong;
  const r = 70;
  const cx = 90;
  const cy = 90;
  const circ = 2 * Math.PI * r;
  const greenLen = total > 0 ? (correct / total) * circ : 0;
  const redLen = total > 0 ? (wrong / total) * circ : circ;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="18" />
        {wrong > 0 && (
          <circle
            cx={cx} cy={cy} r={r} fill="none"
            stroke="rgb(185,28,28)" strokeWidth="18"
            strokeDasharray={`${redLen} ${circ}`}
            strokeDashoffset={-greenLen}
            transform={`rotate(-90 ${cx} ${cy})`}
            strokeLinecap="butt"
          />
        )}
        {correct > 0 && (
          <circle
            cx={cx} cy={cy} r={r} fill="none"
            stroke="rgb(22,163,74)" strokeWidth="18"
            strokeDasharray={`${greenLen} ${circ}`}
            strokeDashoffset="0"
            transform={`rotate(-90 ${cx} ${cy})`}
            strokeLinecap="butt"
          />
        )}
      </svg>
      <div className="absolute text-center pointer-events-none">
        <div className="text-3xl font-black text-white">{pct}%</div>
        <div className="text-xs text-slate-500 tabular-nums">{correct}/{total}</div>
      </div>
    </div>
  );
}

// ── Result info (Übung mode) ──────────────────────────────────────────────────
function getResultInfo(score: number, total: number) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  if (pct >= 80) return { emoji: "🏆", label: "Hervorragend!", msg: "Du beherrschst dieses Thema ausgezeichnet.", color: "text-emerald-300", barColor: "bg-emerald-600" };
  if (pct >= 60) return { emoji: "⭐", label: "Gut gemacht!",   msg: "Mit etwas mehr Übung wirst du es meistern.",         color: "text-amber-300",  barColor: "bg-amber-600"  };
  if (pct >= 40) return { emoji: "💪", label: "Nicht schlecht!", msg: "Schau dir die Erklärungen nochmal in Ruhe an.",    color: "text-orange-300", barColor: "bg-orange-600" };
  return          { emoji: "📚", label: "Weiter üben!",   msg: "Lies die Erklärungen durch – du schaffst das!", color: "text-red-300",    barColor: "bg-red-600"    };
}

// ── Types ─────────────────────────────────────────────────────────────────────
type Phase = "mode_select" | "topic_select" | "quizzing" | "result" | "exam_result";
type SessionMode = "uebung" | "pruefung";

interface Props {
  standort: string;
  fach: string;
  fachName: string;
  locShort: string;
  locPillClass: string;
  locDotClass: string;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function QuizClient({ standort, fach, fachName, locShort, locPillClass, locDotClass }: Props) {
  const [phase, setPhase] = useState<Phase>("mode_select");
  const [mode, setMode] = useState<SessionMode>("uebung");

  // Shared quiz state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // -1 = timed out
  const [score, setScore] = useState(0);

  // Übung-specific
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Prüfung-specific
  const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>([]);
  const [timeLeft, setTimeLeft] = useState(EXAM_SECONDS);
  const [examResults, setExamResults] = useState<QuestionResult[]>([]);
  const examStartRef = useRef(0);

  // Stale-closure-safe ref for timer callbacks
  const examRef = useRef({ currentIndex: 0, examQuestions: [] as ExamQuestion[], score: 0, examResults: [] as QuestionResult[] });
  examRef.current = { currentIndex, examQuestions, score, examResults };

  const colors = fachColors[fach] ?? fachColors.biochemie;
  const topics = quizData[fach]?.topics ?? [];

  const ubungTopic = topics.find((t) => t.id === selectedTopicId) ?? null;
  const ubungQuestions = ubungTopic?.questions ?? [];
  const activeQuestions: (Question & { topicName?: string })[] = mode === "pruefung" ? examQuestions : ubungQuestions;
  const currentQuestion = activeQuestions[currentIndex] ?? null;
  const isTimeout = selectedAnswer === -1;
  const isAnswered = selectedAnswer !== null;
  const isLastQuestion = currentIndex === activeQuestions.length - 1;
  const progress = activeQuestions.length > 0
    ? ((currentIndex + (isAnswered ? 1 : 0)) / activeQuestions.length) * 100
    : 0;

  // ── Timer countdown (exam mode only) ────────────────────────────────────────
  useEffect(() => {
    if (phase !== "quizzing" || mode !== "pruefung" || isAnswered) return;
    if (timeLeft <= 0) {
      // Record timeout
      const { currentIndex: ci, examQuestions: qs, score: sc, examResults: rs } = examRef.current;
      const q = qs[ci];
      if (!q) return;
      const result: QuestionResult = {
        question: q.question, options: q.options,
        selectedIndex: null, correctIndex: q.correctIndex, correct: false, topicName: q.topicName,
      };
      const newResults = [...rs, result];
      setExamResults(newResults);
      setSelectedAnswer(-1);
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, phase, mode, isAnswered]);

  // ── Auto-advance after timeout ───────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "quizzing" || mode !== "pruefung" || selectedAnswer !== -1) return;
    const tid = setTimeout(() => {
      const { currentIndex: ci, examQuestions: qs, score: sc, examResults: rs } = examRef.current;
      if (ci >= qs.length - 1) {
        finishExam(sc, rs, qs.length);
      } else {
        setCurrentIndex(ci + 1);
        setSelectedAnswer(null);
        setTimeLeft(EXAM_SECONDS);
      }
    }, 1500);
    return () => clearTimeout(tid);
  }, [selectedAnswer, phase, mode]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Finish exam ──────────────────────────────────────────────────────────────
  const finishExam = (finalScore: number, results: QuestionResult[], total: number) => {
    const elapsed = Math.round((Date.now() - examStartRef.current) / 1000);
    setPhase("exam_result");
    void saveSession({ standort, fach, sessionType: "pruefung", score: finalScore, total, timeUsedSeconds: elapsed, questionResults: results });
  };

  // ── Start handlers ───────────────────────────────────────────────────────────
  const startUebung = (topicId: string) => {
    setSelectedTopicId(topicId);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setMode("uebung");
    setPhase("quizzing");
  };

  const startExam = () => {
    const qs = buildExamQuestions(fach);
    setExamQuestions(qs);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setExamResults([]);
    setTimeLeft(EXAM_SECONDS);
    setMode("pruefung");
    examStartRef.current = Date.now();
    setPhase("quizzing");
  };

  // ── Answer handlers ──────────────────────────────────────────────────────────
  const handleUebungAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    if (index === currentQuestion?.correctIndex) setScore((s) => s + 1);
  };

  const handleExamAnswer = (index: number) => {
    if (isAnswered || !currentQuestion) return;
    const correct = index === currentQuestion.correctIndex;
    setSelectedAnswer(index);
    if (correct) setScore((s) => s + 1);
    setExamResults((prev) => [
      ...prev,
      { question: currentQuestion.question, options: currentQuestion.options, selectedIndex: index, correctIndex: currentQuestion.correctIndex, correct, topicName: (currentQuestion as ExamQuestion).topicName },
    ]);
  };

  const handleUebungNext = () => {
    if (!isLastQuestion) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
    } else {
      void saveSession({ standort, fach, thema: selectedTopicId ?? undefined, sessionType: "uebung", score, total: ubungQuestions.length });
      setPhase("result");
    }
  };

  const handleExamNext = () => {
    const { currentIndex: ci, examQuestions: qs, score: sc, examResults: rs } = examRef.current;
    if (ci >= qs.length - 1) {
      finishExam(sc, rs, qs.length);
    } else {
      setCurrentIndex(ci + 1);
      setSelectedAnswer(null);
      setTimeLeft(EXAM_SECONDS);
    }
  };

  // ── Option style helpers ─────────────────────────────────────────────────────
  const getOptionClass = (index: number) => {
    const base = "w-full text-left rounded-xl border p-4 transition-all duration-200 flex items-start gap-3 group";
    if (!isAnswered) return `${base} border-white/8 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15 cursor-pointer`;
    if (index === currentQuestion?.correctIndex) return `${base} border-emerald-700/40 bg-emerald-950/50 cursor-default`;
    if (!isTimeout && index === selectedAnswer) return `${base} border-red-700/40 bg-red-950/50 cursor-default`;
    return `${base} border-white/4 bg-transparent cursor-default opacity-35`;
  };

  const getOptionLetterClass = (index: number) => {
    const base = "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold mt-0.5";
    if (!isAnswered) return `${base} bg-white/5 text-slate-500 group-hover:bg-white/8 group-hover:text-slate-300 transition-colors`;
    if (index === currentQuestion?.correctIndex) return `${base} bg-emerald-900/60 text-emerald-300`;
    if (!isTimeout && index === selectedAnswer) return `${base} bg-red-900/60 text-red-300`;
    return `${base} bg-white/4 text-slate-700`;
  };

  const getOptionTextClass = (index: number) => {
    if (!isAnswered) return "text-slate-300 text-sm leading-relaxed";
    if (index === currentQuestion?.correctIndex) return "text-emerald-200 text-sm leading-relaxed";
    if (!isTimeout && index === selectedAnswer) return "text-red-200 text-sm leading-relaxed";
    return "text-slate-700 text-sm leading-relaxed";
  };

  // ════════════════════════════════════════════════════════════════════════════
  // PHASE: mode_select
  // ════════════════════════════════════════════════════════════════════════════
  if (phase === "mode_select") {
    return (
      <div>
        <div className="mb-8">
          <div className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${locPillClass}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${locDotClass}`} />
            {locShort}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            <span className={colors.text}>{fachName}</span>{" "}
            <span className="text-slate-400 font-semibold">Quiz</span>
          </h1>
          <p className="mt-2 text-sm text-slate-600">Wähle deinen Lernmodus.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Übungssitzung */}
          <button
            onClick={() => setPhase("topic_select")}
            className={`group relative rounded-2xl border bg-white/[0.02] p-6 text-left transition-all duration-200 hover:bg-white/[0.04] hover:scale-[1.01] ${colors.border}`}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent rounded-t-2xl" />
            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border text-xl ${colors.border} ${colors.bg}`}>
              📖
            </div>
            <h3 className={`mb-1 text-base font-bold ${colors.text}`}>Übungssitzung</h3>
            <p className="mb-4 text-xs text-slate-600">Kein Zeitlimit · Eigenes Tempo · Sofortiges Feedback</p>
            <ul className="space-y-1 text-xs text-slate-500">
              <li className="flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-slate-600" />Wähle ein Unterthema</li>
              <li className="flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-slate-600" />Erklärungs-Feedback nach jeder Frage</li>
              <li className="flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-slate-600" />Wiederhole so oft du willst</li>
            </ul>
            <div className="mt-5 flex items-center gap-1.5">
              <span className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${colors.topicBtn} border`}>Starten</span>
              <svg className={`h-3.5 w-3.5 ${colors.text} opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          {/* Prüfungssitzung */}
          <button
            onClick={startExam}
            className="group relative rounded-2xl border border-violet-800/40 bg-violet-950/20 p-6 text-left transition-all duration-200 hover:bg-violet-950/30 hover:scale-[1.01]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent rounded-t-2xl" />
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-800/40 bg-violet-950/60 text-xl">
              🎯
            </div>
            <h3 className="mb-1 text-base font-bold text-violet-300">Prüfungssitzung</h3>
            <p className="mb-4 text-xs text-slate-600">50 Fragen · 1:30 Min/Frage · Prüfungsbedingungen</p>
            <ul className="space-y-1 text-xs text-slate-500">
              <li className="flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-slate-600" />50 zufällige Fragen aus allen Themen</li>
              <li className="flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-slate-600" />Countdown-Timer pro Frage</li>
              <li className="flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-slate-600" />Ranglisten-Eintrag nach Abschluss</li>
            </ul>
            <div className="mt-5 flex items-center gap-1.5">
              <span className="rounded-lg border border-violet-800/40 bg-violet-950/60 px-3 py-1.5 text-xs font-medium text-violet-300 hover:bg-violet-900/50 transition-colors">Starten</span>
              <svg className="h-3.5 w-3.5 text-violet-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // PHASE: topic_select
  // ════════════════════════════════════════════════════════════════════════════
  if (phase === "topic_select") {
    return (
      <div>
        <div className="mb-8">
          <button
            onClick={() => setPhase("mode_select")}
            className="mb-4 flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-slate-300"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Modus wählen
          </button>
          <div className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${locPillClass}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${locDotClass}`} />
            {locShort}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            <span className={colors.text}>{fachName}</span>{" "}
            <span className="text-slate-400 font-semibold">Übungssitzung</span>
          </h1>
          <p className="mt-2 text-sm text-slate-600">Wähle ein Unterthema und teste dein Wissen.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => startUebung(topic.id)}
              className={`group relative rounded-2xl border bg-white/[0.02] p-6 text-left transition-all duration-200 hover:bg-white/[0.04] hover:scale-[1.01] ${colors.border}`}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent rounded-t-2xl" />
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border text-2xl ${colors.border} ${colors.bg}`}>
                {topic.emoji}
              </div>
              <h3 className={`mb-1 font-bold ${colors.text}`}>{topic.name}</h3>
              <p className="text-xs text-slate-600">{topic.questions.length} Fragen</p>
              <div className="mt-5 flex items-center gap-1.5">
                <span className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${colors.topicBtn} border`}>Starten</span>
                <svg className={`h-3.5 w-3.5 ${colors.text} opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {topics.length === 0 && (
          <div className="rounded-2xl border border-white/6 bg-white/[0.015] p-12 text-center">
            <p className="text-slate-600">Für dieses Fach sind noch keine Quiz-Fragen verfügbar.</p>
          </div>
        )}
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // PHASE: result (Übungssitzung finished)
  // ════════════════════════════════════════════════════════════════════════════
  if (phase === "result") {
    const pct = ubungQuestions.length > 0 ? Math.round((score / ubungQuestions.length) * 100) : 0;
    const result = getResultInfo(score, ubungQuestions.length);

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-md rounded-2xl border border-white/7 bg-white/[0.02] p-8 text-center">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent rounded-t-2xl" />
          <div className="mb-2 text-5xl">{result.emoji}</div>
          <div className={`mb-1 text-lg font-bold ${result.color}`}>{result.label}</div>
          <p className="mb-6 text-sm text-slate-600">{result.msg}</p>
          <div className="mb-2 text-6xl font-black text-white">
            {score}<span className="text-3xl font-semibold text-slate-600">/{ubungQuestions.length}</span>
          </div>
          <p className="mb-6 text-sm text-slate-600">Punkte erreicht</p>
          <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-white/5">
            <div className={`h-full rounded-full transition-all duration-700 ${result.barColor}`} style={{ width: `${pct}%` }} />
          </div>
          <p className={`mb-8 text-sm font-semibold ${result.color}`}>{pct}%</p>
          <div className="mb-8 flex justify-center">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${colors.pill}`}>
              {ubungTopic?.emoji} {ubungTopic?.name}
            </span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={() => startUebung(selectedTopicId!)} className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${colors.topicBtn}`}>
              Nochmal versuchen
            </button>
            <button onClick={() => setPhase("topic_select")} className="flex-1 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/[0.05]">
              Anderes Thema
            </button>
          </div>
          <button onClick={() => setPhase("mode_select")} className="mt-3 w-full rounded-xl border border-white/5 px-4 py-2 text-xs text-slate-600 transition-colors hover:text-slate-400">
            Modus wechseln
          </button>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // PHASE: exam_result (Prüfungssitzung finished)
  // ════════════════════════════════════════════════════════════════════════════
  if (phase === "exam_result") {
    const total = examQuestions.length || examResults.length;
    const correct = examResults.filter((r) => r.correct).length;
    const wrong = total - correct;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const passed = pct >= 60;

    return (
      <div className="space-y-6">
        {/* Hero result card */}
        <div className="relative rounded-2xl border border-white/7 bg-white/[0.02] p-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent rounded-t-2xl" />
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <DonutChart correct={correct} wrong={wrong} />
              <div className="text-center sm:text-left">
                <div className={`text-2xl font-black ${passed ? "text-emerald-300" : "text-red-300"}`}>
                  {passed ? "Bestanden ✓" : "Nicht bestanden ✗"}
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  {correct} von {total} Fragen richtig
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-600">
                  <span><span className="font-semibold text-emerald-400">{correct}</span> richtig</span>
                  <span><span className="font-semibold text-red-400">{wrong}</span> falsch</span>
                  <span><span className="font-semibold text-slate-400">{examResults.filter((r) => r.selectedIndex === null).length}</span> abgelaufen</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 sm:items-end">
              <button onClick={startExam} className="rounded-xl border border-violet-800/40 bg-violet-950/50 px-5 py-2.5 text-sm font-medium text-violet-300 transition-colors hover:bg-violet-900/60">
                Nochmal
              </button>
              <button onClick={() => setPhase("mode_select")} className="rounded-xl border border-white/8 bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/[0.05]">
                Modus wählen
              </button>
            </div>
          </div>
        </div>

        {/* Pass threshold note */}
        <div className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs ${passed ? "border-emerald-800/30 bg-emerald-950/20 text-emerald-400" : "border-red-800/30 bg-red-950/20 text-red-400"}`}>
          <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={passed ? "M5 13l4 4L19 7" : "M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"} />
          </svg>
          {passed ? `${pct}% – Bestehensgrenze (60%) überschritten. Dein Ergebnis wird in der Rangliste gespeichert.` : `${pct}% – Bestehensgrenze liegt bei 60%. Noch nicht ganz – übe weiter!`}
        </div>

        {/* Question review */}
        <div className="rounded-2xl border border-white/7 bg-white/[0.02] overflow-hidden">
          <div className="px-5 py-3 border-b border-white/5">
            <p className="text-sm font-medium text-slate-300">Fragenübersicht</p>
          </div>
          <div className="divide-y divide-white/4">
            {examResults.map((r, i) => (
              <div key={i} className="px-5 py-3">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${r.correct ? "bg-emerald-900/60 text-emerald-300" : r.selectedIndex === null ? "bg-slate-800 text-slate-500" : "bg-red-900/60 text-red-300"}`}>
                    {r.correct ? "✓" : r.selectedIndex === null ? "—" : "✗"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-400 leading-relaxed">{r.question}</p>
                    {r.topicName && <p className="mt-0.5 text-[10px] text-slate-700">{r.topicName}</p>}
                    {!r.correct && (
                      <p className="mt-1 text-[10px] text-emerald-600">
                        Richtig: {OPTION_LETTERS[r.correctIndex]}. {r.options[r.correctIndex]}
                      </p>
                    )}
                  </div>
                  <span className={`shrink-0 text-xs font-medium ${r.correct ? "text-emerald-400" : r.selectedIndex === null ? "text-slate-600" : "text-red-400"}`}>
                    {i + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // PHASE: quizzing
  // ════════════════════════════════════════════════════════════════════════════
  if (!currentQuestion) return null;

  const isExam = mode === "pruefung";
  const timerPct = (timeLeft / EXAM_SECONDS) * 100;
  const timerColor = timerPct > 50 ? "bg-emerald-600" : timerPct > 25 ? "bg-amber-500" : "bg-red-600";
  const isCorrect = isAnswered && !isTimeout && selectedAnswer === currentQuestion.correctIndex;

  return (
    <div>
      {/* Top bar */}
      <div className="mb-4 flex items-center justify-between">
        {isExam ? (
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Prüfungssitzung
          </div>
        ) : (
          <button onClick={() => setPhase("topic_select")} className="flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-slate-300">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Thema wechseln
          </button>
        )}
        <div className="flex items-center gap-2">
          {isExam ? (
            <span className={`text-sm font-bold tabular-nums ${timerPct <= 25 ? "text-red-400" : timerPct <= 50 ? "text-amber-400" : "text-slate-400"}`}>
              {timeLeft}s
            </span>
          ) : (
            <span className={`text-xs font-medium ${colors.text}`}>
              {ubungTopic?.emoji} {ubungTopic?.name}
            </span>
          )}
          <span className="text-xs text-slate-700">{currentIndex + 1}/{activeQuestions.length}</span>
        </div>
      </div>

      {/* Timer bar (exam only) */}
      {isExam && (
        <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${timerColor}`}
            style={{ width: `${timerPct}%` }}
          />
        </div>
      )}

      {/* Progress bar */}
      <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full rounded-full transition-all duration-500 ${isExam ? "bg-violet-600" : colors.bar}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question card */}
      <div className="relative rounded-2xl border border-white/7 bg-white/[0.02] p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent rounded-t-2xl" />

        <div className="mb-5 flex items-center justify-between">
          <span className="text-xs text-slate-700">Frage {currentIndex + 1} von {activeQuestions.length}</span>
          {isExam ? (
            <span className="rounded-full border border-violet-800/30 bg-violet-950/30 px-2.5 py-0.5 text-xs font-medium text-violet-400">
              {score} Pkt.
            </span>
          ) : (
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.pill}`}>{score} Pkt.</span>
          )}
        </div>

        <h2 className="mb-6 text-base font-semibold leading-relaxed text-white sm:text-lg">
          {currentQuestion.question}
        </h2>

        <div className="mb-6 flex flex-col gap-2.5">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => isExam ? handleExamAnswer(index) : handleUebungAnswer(index)}
              disabled={isAnswered}
              className={getOptionClass(index)}
            >
              <span className={getOptionLetterClass(index)}>{OPTION_LETTERS[index]}</span>
              <span className={getOptionTextClass(index)}>{option}</span>
              {isAnswered && index === currentQuestion.correctIndex && (
                <svg className="ml-auto h-4 w-4 shrink-0 text-emerald-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {isAnswered && !isTimeout && index === selectedAnswer && index !== currentQuestion.correctIndex && (
                <svg className="ml-auto h-4 w-4 shrink-0 text-red-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div className={`mb-5 rounded-xl border p-4 ${isTimeout ? "border-slate-700/40 bg-slate-900/50" : isCorrect ? "border-emerald-700/35 bg-emerald-950/50" : "border-red-700/35 bg-red-950/50"}`}>
            <div className="mb-2 flex items-center gap-2">
              {isTimeout ? (
                <>
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-slate-400">Zeit abgelaufen</span>
                  <span className="text-xs text-slate-600">Richtig wäre: <span className="text-emerald-300 font-medium">{OPTION_LETTERS[currentQuestion.correctIndex]}. {currentQuestion.options[currentQuestion.correctIndex]}</span></span>
                </>
              ) : isCorrect ? (
                <>
                  <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-semibold text-emerald-300">Richtig!</span>
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm font-semibold text-red-300">Falsch!</span>
                  <span className="text-xs text-slate-600">Richtig wäre: <span className="text-emerald-300 font-medium">{OPTION_LETTERS[currentQuestion.correctIndex]}. {currentQuestion.options[currentQuestion.correctIndex]}</span></span>
                </>
              )}
            </div>
            {!isExam && (
              <p className="text-sm leading-relaxed text-slate-500">{currentQuestion.explanation}</p>
            )}
            {isTimeout && (
              <p className="text-xs text-slate-700 mt-1">Nächste Frage wird automatisch geladen…</p>
            )}
          </div>
        )}

        {/* Next button (not shown during auto-advance after timeout) */}
        {isAnswered && !isTimeout && (
          <div className="flex justify-end">
            <button
              onClick={isExam ? handleExamNext : handleUebungNext}
              className={`flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors ${isExam ? "border-violet-800/40 bg-violet-950/50 text-violet-300 hover:bg-violet-900/60" : colors.topicBtn}`}
            >
              {isLastQuestion ? "Ergebnis anzeigen" : "Nächste Frage"}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {!isAnswered && (
        <p className="mt-4 text-center text-xs text-slate-700">Wähle eine Antwort, um fortzufahren</p>
      )}
    </div>
  );
}
