"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { quizData } from "@/lib/quiz-data";

const OPTION_LETTERS = ["A", "B", "C", "D", "E"] as const;

const fachColors: Record<
  string,
  {
    accent: string;
    text: string;
    bg: string;
    border: string;
    bar: string;
    topicBtn: string;
    pill: string;
  }
> = {
  biochemie: {
    accent: "emerald",
    text: "text-emerald-300",
    bg: "bg-emerald-950/60",
    border: "border-emerald-800/40",
    bar: "bg-emerald-600",
    topicBtn:
      "bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 hover:bg-emerald-900/50",
    pill: "bg-emerald-950/60 text-emerald-300 border border-emerald-800/35",
  },
  chemie: {
    accent: "amber",
    text: "text-amber-300",
    bg: "bg-amber-950/60",
    border: "border-amber-800/40",
    bar: "bg-amber-600",
    topicBtn:
      "bg-amber-950/60 text-amber-300 border border-amber-800/40 hover:bg-amber-900/50",
    pill: "bg-amber-950/60 text-amber-300 border border-amber-800/35",
  },
  physik: {
    accent: "indigo",
    text: "text-indigo-300",
    bg: "bg-indigo-950/60",
    border: "border-indigo-800/40",
    bar: "bg-indigo-500",
    topicBtn:
      "bg-indigo-950/60 text-indigo-300 border border-indigo-800/40 hover:bg-indigo-900/50",
    pill: "bg-indigo-950/60 text-indigo-300 border border-indigo-800/35",
  },
  biologie: {
    accent: "teal",
    text: "text-teal-300",
    bg: "bg-teal-950/60",
    border: "border-teal-800/40",
    bar: "bg-teal-500",
    topicBtn:
      "bg-teal-950/60 text-teal-300 border border-teal-800/40 hover:bg-teal-900/50",
    pill: "bg-teal-950/60 text-teal-300 border border-teal-800/35",
  },
  physiologie: {
    accent: "rose",
    text: "text-rose-300",
    bg: "bg-rose-950/60",
    border: "border-rose-800/40",
    bar: "bg-rose-600",
    topicBtn:
      "bg-rose-950/60 text-rose-300 border border-rose-800/40 hover:bg-rose-900/50",
    pill: "bg-rose-950/60 text-rose-300 border border-rose-800/35",
  },
};

function getResultInfo(score: number, total: number) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  if (pct >= 80)
    return {
      emoji: "🏆",
      label: "Hervorragend!",
      msg: "Du beherrschst dieses Thema ausgezeichnet.",
      color: "text-emerald-300",
      barColor: "bg-emerald-600",
    };
  if (pct >= 60)
    return {
      emoji: "⭐",
      label: "Gut gemacht!",
      msg: "Mit etwas mehr Übung wirst du es meistern.",
      color: "text-amber-300",
      barColor: "bg-amber-600",
    };
  if (pct >= 40)
    return {
      emoji: "💪",
      label: "Nicht schlecht!",
      msg: "Schau dir die Erklärungen nochmal in Ruhe an.",
      color: "text-orange-300",
      barColor: "bg-orange-600",
    };
  return {
    emoji: "📚",
    label: "Weiter üben!",
    msg: "Lies die Erklärungen durch – du schaffst das!",
    color: "text-red-300",
    barColor: "bg-red-600",
  };
}

type Phase = "selecting" | "quizzing" | "finished";

interface Props {
  standort: string;
  fach: string;
  fachName: string;
  locShort: string;
  locPillClass: string;
  locDotClass: string;
}

export function QuizClient({
  standort,
  fach,
  fachName,
  locShort,
  locPillClass,
  locDotClass,
}: Props) {
  const [phase, setPhase] = useState<Phase>("selecting");
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const colors = fachColors[fach] ?? fachColors.biochemie;
  const topics = quizData[fach]?.topics ?? [];
  const selectedTopic = topics.find((t) => t.id === selectedTopicId) ?? null;
  const questions = selectedTopic?.questions ?? [];
  const currentQuestion = questions[currentIndex] ?? null;
  const isAnswered = selectedAnswer !== null;
  const isCorrect =
    isAnswered && selectedAnswer === currentQuestion?.correctIndex;
  const isLastQuestion = currentIndex === questions.length - 1;
  const progress =
    questions.length > 0
      ? ((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100
      : 0;

  const startTopic = (id: string) => {
    setSelectedTopicId(id);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setPhase("quizzing");
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    if (index === currentQuestion?.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setPhase("finished");
      void saveResult(score, questions.length);
    }
  };

  const resetToTopics = () => {
    setPhase("selecting");
    setSelectedTopicId(null);
    setSelectedAnswer(null);
    setCurrentIndex(0);
    setScore(0);
  };

  const retryTopic = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setPhase("quizzing");
  };

  const saveResult = async (finalScore: number, total: number) => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || !selectedTopicId) return;
      await supabase.from("quiz_results").insert({
        user_id: user.id,
        standort,
        fach,
        thema: selectedTopicId,
        score: finalScore,
        total,
        percentage: Math.round((finalScore / total) * 100),
      });
    } catch {
      // non-critical
    }
  };

  const getOptionClass = (index: number) => {
    const base =
      "w-full text-left rounded-xl border p-4 transition-all duration-200 flex items-start gap-3 group";
    if (!isAnswered) {
      return `${base} border-white/8 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15 cursor-pointer`;
    }
    if (index === currentQuestion?.correctIndex) {
      return `${base} border-emerald-700/40 bg-emerald-950/50 cursor-default`;
    }
    if (index === selectedAnswer) {
      return `${base} border-red-700/40 bg-red-950/50 cursor-default`;
    }
    return `${base} border-white/4 bg-transparent cursor-default opacity-35`;
  };

  const getOptionLetterClass = (index: number) => {
    const base =
      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold mt-0.5";
    if (!isAnswered) {
      return `${base} bg-white/5 text-slate-500 group-hover:bg-white/8 group-hover:text-slate-300 transition-colors`;
    }
    if (index === currentQuestion?.correctIndex) {
      return `${base} bg-emerald-900/60 text-emerald-300`;
    }
    if (index === selectedAnswer) {
      return `${base} bg-red-900/60 text-red-300`;
    }
    return `${base} bg-white/4 text-slate-700`;
  };

  const getOptionTextClass = (index: number) => {
    if (!isAnswered) return "text-slate-300 text-sm leading-relaxed";
    if (index === currentQuestion?.correctIndex) return "text-emerald-200 text-sm leading-relaxed";
    if (index === selectedAnswer) return "text-red-200 text-sm leading-relaxed";
    return "text-slate-700 text-sm leading-relaxed";
  };

  // ── TOPIC SELECTION ──────────────────────────────────────────────────────────
  if (phase === "selecting") {
    return (
      <div>
        {/* Header */}
        <div className="mb-8">
          <div className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${locPillClass}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${locDotClass}`} />
            {locShort}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            <span className={colors.text}>{fachName}</span>{" "}
            <span className="text-slate-400 font-semibold">Quiz</span>
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Wähle ein Unterthema und teste dein Wissen mit Multiple-Choice-Fragen.
          </p>
        </div>

        {/* Topic grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => startTopic(topic.id)}
              className={`group relative rounded-2xl border bg-white/[0.02] p-6 text-left transition-all duration-200 hover:bg-white/[0.04] hover:scale-[1.01] ${colors.border}`}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent rounded-t-2xl" />

              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border text-2xl ${colors.border} ${colors.bg}`}>
                {topic.emoji}
              </div>

              <h3 className={`mb-1 font-bold ${colors.text}`}>{topic.name}</h3>
              <p className="text-xs text-slate-600">{topic.questions.length} Fragen</p>

              <div className="mt-5 flex items-center gap-1.5">
                <span className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${colors.topicBtn} border`}>
                  Starten
                </span>
                <svg
                  className={`h-3.5 w-3.5 ${colors.text} opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {topics.length === 0 && (
          <div className="rounded-2xl border border-white/6 bg-white/[0.015] p-12 text-center">
            <p className="text-slate-600">
              Für dieses Fach sind noch keine Quiz-Fragen verfügbar.
            </p>
          </div>
        )}
      </div>
    );
  }

  // ── RESULTS ──────────────────────────────────────────────────────────────────
  if (phase === "finished") {
    const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    const result = getResultInfo(score, questions.length);

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-md rounded-2xl border border-white/7 bg-white/[0.02] p-8 text-center">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent rounded-t-2xl" />

          <div className="mb-2 text-5xl">{result.emoji}</div>
          <div className={`mb-1 text-lg font-bold ${result.color}`}>{result.label}</div>
          <p className="mb-6 text-sm text-slate-600">{result.msg}</p>

          <div className="mb-2 text-6xl font-black text-white">
            {score}
            <span className="text-3xl font-semibold text-slate-600">/{questions.length}</span>
          </div>
          <p className="mb-6 text-sm text-slate-600">Punkte erreicht</p>

          <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className={`h-full rounded-full transition-all duration-700 ${result.barColor}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className={`mb-8 text-sm font-semibold ${result.color}`}>{pct}%</p>

          <div className="mb-8 flex justify-center">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${colors.pill}`}>
              {selectedTopic?.emoji} {selectedTopic?.name}
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={retryTopic}
              className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${colors.topicBtn}`}
            >
              Nochmal versuchen
            </button>
            <button
              onClick={resetToTopics}
              className="flex-1 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/[0.05]"
            >
              Anderes Thema
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ ─────────────────────────────────────────────────────────────────────
  if (!currentQuestion) return null;

  return (
    <div>
      {/* Top bar */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={resetToTopics}
          className="flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-slate-300"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Thema wechseln
        </button>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${colors.text}`}>
            {selectedTopic?.emoji} {selectedTopic?.name}
          </span>
          <span className="text-xs text-slate-700">
            {currentIndex + 1}/{questions.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question card */}
      <div className="relative rounded-2xl border border-white/7 bg-white/[0.02] p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent rounded-t-2xl" />

        <div className="mb-5 flex items-center justify-between">
          <span className="text-xs text-slate-700">
            Frage {currentIndex + 1} von {questions.length}
          </span>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.pill}`}>
            {score} Pkt.
          </span>
        </div>

        <h2 className="mb-6 text-base font-semibold leading-relaxed text-white sm:text-lg">
          {currentQuestion.question}
        </h2>

        <div className="mb-6 flex flex-col gap-2.5">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
              className={getOptionClass(index)}
            >
              <span className={getOptionLetterClass(index)}>
                {OPTION_LETTERS[index]}
              </span>
              <span className={getOptionTextClass(index)}>{option}</span>
              {isAnswered && index === currentQuestion.correctIndex && (
                <svg className="ml-auto h-4 w-4 shrink-0 text-emerald-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {isAnswered && index === selectedAnswer && index !== currentQuestion.correctIndex && (
                <svg className="ml-auto h-4 w-4 shrink-0 text-red-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div className={`mb-5 rounded-xl border p-4 ${
            isCorrect
              ? "border-emerald-700/35 bg-emerald-950/50"
              : "border-red-700/35 bg-red-950/50"
          }`}>
            <div className="mb-2 flex items-center gap-2">
              {isCorrect ? (
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
                  <span className="text-xs text-slate-600">
                    Richtig wäre:{" "}
                    <span className="text-emerald-300 font-medium">
                      {OPTION_LETTERS[currentQuestion.correctIndex]}.{" "}
                      {currentQuestion.options[currentQuestion.correctIndex]}
                    </span>
                  </span>
                </>
              )}
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Next button */}
        {isAnswered && (
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className={`flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors ${colors.topicBtn}`}
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
        <p className="mt-4 text-center text-xs text-slate-700">
          Wähle eine Antwort, um fortzufahren
        </p>
      )}
    </div>
  );
}
