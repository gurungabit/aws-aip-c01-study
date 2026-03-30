import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  getExamHistory,
  getExamStats,
  getActiveExam,
  createExam,
  deleteExam,
  exportData,
  importData,
} from "~/server/functions";
import { getQuestions, VERSIONS } from "~/data/questions";
import type { ExamVersion } from "~/data/questions";
import { ConfirmModal } from "~/components/ConfirmModal";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [history, stats, activeExam] = await Promise.all([
      getExamHistory(),
      getExamStats(),
      getActiveExam(),
    ]);
    return { history, stats, activeExam };
  },
  component: Dashboard,
});

const DOMAIN_NAMES: Record<string, string> = {
  D1: "FM Integration, Data & Compliance",
  D2: "Implementation & Integration",
  D3: "Safety, Security & Governance",
  D4: "Operational Efficiency",
  D5: "Testing & Troubleshooting",
};

const DOMAIN_WEIGHTS: Record<string, string> = {
  D1: "31%",
  D2: "26%",
  D3: "20%",
  D4: "12%",
  D5: "11%",
};

function Dashboard() {
  const { history, stats, activeExam } = Route.useLoaderData();
  const navigate = useNavigate();

  const [selectedVersion, setSelectedVersion] = useState<ExamVersion>(1);
  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    danger?: boolean;
    hideCancel?: boolean;
    onConfirm: () => void;
  }>({
    open: false,
    title: "",
    message: "",
    confirmLabel: "",
    onConfirm: () => {},
  });

  const showConfirm = (
    title: string,
    message: string,
    confirmLabel: string,
    onConfirm: () => void,
  ) => {
    setConfirmState({ open: true, title, message, confirmLabel, danger: true, hideCancel: false, onConfirm });
  };

  const handleStartExam = async () => {
    const exam = await createExam({ data: { version: selectedVersion } });
    navigate({ to: "/exam", search: { id: exam.id } });
  };

  const handleResumeExam = () => {
    if (activeExam) {
      navigate({ to: "/exam", search: { id: activeExam.id } });
    }
  };

  const handleDeleteActive = () => {
    showConfirm(
      "Abandon Exam?",
      "This will permanently delete the in-progress exam.",
      "Abandon",
      async () => {
        if (activeExam) {
          await deleteExam({ data: { examId: activeExam.id } });
          window.location.reload();
        }
      },
    );
  };

  const handleDeleteExam = (examId: number) => {
    showConfirm(
      "Delete Exam?",
      "This will permanently delete this exam and its results.",
      "Delete",
      async () => {
        await deleteExam({ data: { examId } });
        window.location.reload();
      },
    );
  };

  const handleClearAll = () => {
    showConfirm(
      "Clear All History?",
      "This will permanently delete ALL exam history.\nThis cannot be undone.",
      "Clear All",
      async () => {
        for (const exam of history) {
          await deleteExam({ data: { examId: exam.id } });
        }
        window.location.reload();
      },
    );
  };

  const handleExport = async () => {
    const data = await exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aip-c01-exams-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const json = await file.text();
    try {
      const result = await importData({ data: { json } });
      setConfirmState({
        open: true,
        title: 'Import Complete',
        message: `Imported ${result.imported} exam(s).${result.skipped > 0 ? `\n${result.skipped} skipped (duplicates).` : ''}`,
        confirmLabel: 'OK',
        danger: false,
        hideCancel: true,
        onConfirm: () => { setConfirmState((s) => ({ ...s, open: false })); window.location.reload(); },
      });
    } catch (err: any) {
      setConfirmState({
        open: true,
        title: 'Import Failed',
        message: err.message || 'Could not parse the file.',
        confirmLabel: 'OK',
        danger: true,
        hideCancel: true,
        onConfirm: () => setConfirmState((s) => ({ ...s, open: false })),
      });
    }
    e.target.value = '';
  };

  const questions = getQuestions(selectedVersion);
  const domainCounts: Record<string, number> = {};
  for (const q of questions) {
    domainCounts[q.domain] = (domainCounts[q.domain] || 0) + 1;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <ConfirmModal
        open={confirmState.open}
        title={confirmState.title}
        message={confirmState.message}
        confirmLabel={confirmState.confirmLabel}
        danger={confirmState.danger}
        hideCancel={confirmState.hideCancel}
        onConfirm={() => {
          confirmState.onConfirm();
          setConfirmState((s) => ({ ...s, open: false }));
        }}
        onCancel={() => setConfirmState((s) => ({ ...s, open: false }))}
      />

      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-accent">
          AWS AIP-C01 Practice Exam
        </h1>
        <p className="text-txt-2">Generative AI Developer - Professional</p>
        <p className="mt-1 text-sm text-txt-3">
          6 exam versions &bull; 75 questions each &bull; 180 minutes &bull;
          750/1000 to pass
        </p>
      </div>

      {activeExam && (
        <div className="card mb-6 border-accent/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-accent">Exam In Progress</p>
              <p className="text-sm text-txt-2">
                Version {activeExam.version ?? 1} &bull; Started{" "}
                {new Date(activeExam.startedAt).toLocaleString()}
                {activeExam.pausedAt && (
                  <span className="ml-2 rounded-full bg-warn-dim px-2 py-0.5 text-xs font-medium text-warn border border-warn-border">
                    Paused
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleResumeExam}
                className="btn-primary text-sm"
              >
                Resume
              </button>
              <button
                onClick={handleDeleteActive}
                className="btn-secondary text-sm text-bad border-bad-border hover:bg-bad-dim"
              >
                Abandon
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="card text-center">
          <p className="text-3xl font-bold text-accent">{stats.totalExams}</p>
          <p className="text-sm text-txt-2">Exams Taken</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-ok">
            {stats.totalExams > 0 ? stats.avgScore : "-"}
          </p>
          <p className="text-sm text-txt-2">Avg Score</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-info">
            {stats.totalExams > 0 ? stats.bestScore : "-"}
          </p>
          <p className="text-sm text-txt-2">Best Score</p>
        </div>
        <div className="card text-center">
          <p
            className={`text-3xl font-bold ${stats.bestScore >= 750 ? "text-ok" : "text-txt-3"}`}
          >
            {stats.bestScore >= 750
              ? "PASS"
              : stats.totalExams > 0
                ? "NOT YET"
                : "-"}
          </p>
          <p className="text-sm text-txt-2">Best Result</p>
        </div>
      </div>

      {stats.totalExams > 0 && (
        <div className="card mb-8">
          <h2 className="mb-4 text-lg font-semibold text-txt">
            Domain Performance
          </h2>
          <div className="space-y-3">
            {Object.entries(DOMAIN_NAMES).map(([domain, name]) => {
              const pct = stats.domainAvgs[domain] ?? 0;
              const color =
                pct >= 75 ? "bg-ok" : pct >= 50 ? "bg-warn" : "bg-bad";
              return (
                <div key={domain} className="flex items-center gap-3">
                  <span className="w-8 text-xs font-semibold text-accent">
                    {domain}
                  </span>
                  <span className="hidden w-48 shrink-0 text-sm text-txt-2 md:block">
                    {name}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className={`h-full rounded-full ${color} transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span
                    className={`w-12 text-right text-sm font-semibold ${pct >= 75 ? "text-ok" : pct >= 50 ? "text-warn" : "text-bad"}`}
                  >
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!activeExam && (
        <div className="card mb-8 text-center">
          <h2 className="mb-4 text-lg font-semibold text-txt">
            Start New Exam
          </h2>

          {/* Version Selector */}
          <div className="mb-6">
            <p className="mb-3 text-sm text-txt-2">Select Exam Version</p>
            <div className="flex justify-center gap-2">
              {VERSIONS.map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVersion(v)}
                  className={`rounded-xl px-5 py-3 text-sm font-semibold transition-all cursor-pointer ${
                    selectedVersion === v
                      ? "bg-accent text-base shadow-lg shadow-accent/20 scale-105"
                      : "bg-surface-2 text-txt-2 hover:bg-surface-3 hover:text-txt"
                  }`}
                >
                  V{v}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
            {Object.entries(DOMAIN_NAMES).map(([domain, name]) => (
              <div
                key={domain}
                className="rounded-xl border border-accent-border bg-base px-3 py-2 text-left"
              >
                <span className="text-xs font-semibold text-accent">
                  {domain} ({DOMAIN_WEIGHTS[domain]})
                </span>
                <p className="mt-0.5 text-xs text-txt-2">{name}</p>
                <p className="text-xs text-txt-3">
                  {domainCounts[domain] || 0} Qs
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={handleStartExam}
            className="btn-primary px-12 py-4 text-lg"
          >
            Start Version {selectedVersion} ({questions.length} Questions, 180
            min)
          </button>
        </div>
      )}

      <div className="card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-txt">Exam History</h2>
          <div className="flex gap-2">
            {history.length > 0 && (
              <button onClick={handleExport} className="btn-secondary text-xs">
                Export
              </button>
            )}
            <label className="btn-secondary text-xs cursor-pointer">
              Import
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="btn-secondary text-xs text-bad border-bad-border hover:bg-bad-dim"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
        {history.length === 0 ? (
          <p className="text-sm text-txt-3 text-center py-6">No exams taken yet. Start one above or import from another device.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-accent-border text-left text-txt-2">
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">Ver</th>
                  <th className="pb-2 font-medium">Score</th>
                  <th className="pb-2 font-medium">Result</th>
                  <th className="pb-2 font-medium">Correct</th>
                  <th className="pb-2 font-medium">Time</th>
                  <th className="pb-2 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {history.map((exam) => {
                  const pass = (exam.scaledScore ?? 0) >= 750;
                  const mins = exam.timeSpentSeconds
                    ? Math.floor(exam.timeSpentSeconds / 60)
                    : 0;
                  return (
                    <tr
                      key={exam.id}
                      className="border-b border-accent-border/50"
                    >
                      <td className="py-3 text-txt">
                        {exam.finishedAt
                          ? new Date(exam.finishedAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="py-3">
                        <span className="rounded-full bg-accent-dim px-2 py-0.5 text-xs font-medium text-accent">
                          V{exam.version ?? 1}
                        </span>
                      </td>
                      <td
                        className={`py-3 font-semibold ${pass ? "text-ok" : "text-bad"}`}
                      >
                        {exam.scaledScore}/1000
                      </td>
                      <td className="py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${pass ? "bg-ok-dim text-ok" : "bg-bad-dim text-bad"}`}
                        >
                          {pass ? "PASS" : "FAIL"}
                        </span>
                      </td>
                      <td className="py-3 text-txt-2">
                        {exam.correctCount}/{exam.totalQuestions}
                      </td>
                      <td className="py-3 text-txt-2">{mins}m</td>
                      <td className="py-3 flex gap-2">
                        <button
                          onClick={() =>
                            navigate({
                              to: "/results/$id",
                              params: { id: String(exam.id) },
                            })
                          }
                          className="text-xs text-accent hover:text-accent-hover"
                        >
                          Review
                        </button>
                        <button
                          onClick={() => handleDeleteExam(exam.id)}
                          className="text-xs text-bad hover:text-bad/80"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
