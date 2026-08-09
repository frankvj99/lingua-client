"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@auth0/nextjs-auth0/client";
import { get2ndDraftFeedback, suggestImprovementsForWritingSample } from "../lib/writing-api-client";
import {
  SubmitWritingRevisionRequest,
  SubmitWritingSampleRequest,
  WritingLength,
  WritingMode,
} from "../types/writing";

const writingLengthOptions: { value: WritingLength; label: string }[] = [
  { value: WritingLength.NoneAssigned, label: "Select length..." },
  { value: WritingLength.Short, label: "Short (a paragraph)" },
  { value: WritingLength.Medium, label: "Medium (a few paragraphs)" },
  { value: WritingLength.Long, label: "Long (a full essay)" },
];

const writingModeOptions: { value: WritingMode; label: string }[] = [
  { value: WritingMode.NoneAssigned, label: "Select mode..." },
  { value: WritingMode.Expository, label: "Expository" },
  { value: WritingMode.Narrative, label: "Narrative" },
  { value: WritingMode.Persuasive, label: "Persuasive" },
  { value: WritingMode.Descriptive, label: "Descriptive" },
];

export default function WritingExercise() {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [length, setLength] = useState<WritingLength>(WritingLength.NoneAssigned);
  const [mode, setMode] = useState<WritingMode>(WritingMode.NoneAssigned);
  const [initialInput, setInitialInput] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null);
  const [exerciseId, setExerciseId] = useState<number | null>(null);

  const [revisionInput, setRevisionInput] = useState("");
  const [aiRevision, setAiRevision] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async ({
      text,
      stage,
    }: {
      text: string;
      stage: "initial" | "suggested";
    }) => {

      if (stage === "initial") {
        const payload: SubmitWritingSampleRequest = {
          userId: 0,
          userName: user?.name ?? "",
          userEmail: user?.email ?? "",
          title,
          length,
          mode,
          originalText: text,
        };
        const res = await suggestImprovementsForWritingSample(payload);
        return { result: res.feedback, id: res.id, stage };
      }

      const payload: SubmitWritingRevisionRequest = {
        id: exerciseId ?? 0,
        revisedText: text,
      };

      const res = await get2ndDraftFeedback(payload);
      return { result: res.feedback, id: res.id, aiRewrite: res.aiRewrite, stage };
    },

    onSuccess: ({ result, id, aiRewrite, stage }) => {
      if (stage === "initial") {
        setAiSuggestions(result);
        setExerciseId(id);
        setRevisionInput(initialInput); // pipe forward
      } else {
        setAiRevision(
          aiRewrite ? `${result}\n\n---\n\nAI Rewrite:\n${aiRewrite}` : result
        );
      }
    },
  });

  const isInitialPending = mutation.isPending && mutation.variables?.stage === "initial";
  const isSuggestedPending = mutation.isPending && mutation.variables?.stage === "suggested";

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-8">
        <h2 className="text-xl font-semibold text-slate-900">
          Writing Revision Exercise
        </h2>

        {/* ===== EXERCISE SETUP ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="flex flex-col gap-1 text-sm text-slate-700 sm:col-span-2">
            Title
            <input
              type="text"
              className="border border-slate-200 rounded-md p-2 text-slate-900 focus:outline-2 focus:outline-offset-2 focus:outline-navy-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="flex flex-col gap-1 text-sm text-slate-700">
            Length
            <select
              className="border border-slate-200 rounded-md p-2 text-slate-900 focus:outline-2 focus:outline-offset-2 focus:outline-navy-600"
              value={length}
              onChange={(e) => setLength(Number(e.target.value) as WritingLength)}
            >
              {writingLengthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm text-slate-700">
            Mode
            <select
              className="border border-slate-200 rounded-md p-2 text-slate-900 focus:outline-2 focus:outline-offset-2 focus:outline-navy-600"
              value={mode}
              onChange={(e) => setMode(Number(e.target.value) as WritingMode)}
            >
              {writingModeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* ===== INITIAL STAGE ===== */}
        <div className="flex flex-col gap-4">
          <p className="text-slate-500 text-sm">Enter your text by typing or pasting the sample in the textbox.</p>

          <textarea
            className="w-full border border-slate-200 rounded-md p-2 min-h-[200px] text-slate-900 focus:outline-2 focus:outline-offset-2 focus:outline-navy-600"
            value={initialInput}
            onChange={(e) => setInitialInput(e.target.value)}
          />

          <button
            onClick={() =>
              mutation.mutate({ text: initialInput, stage: "initial" })
            }
            disabled={mutation.isPending}
            className="bg-navy-800 text-white text-sm px-4 py-2 rounded-md hover:bg-navy-700 cursor-pointer self-start"
          >
            Get Suggestions
          </button>

          <textarea
            className="w-full border border-slate-200 rounded-md p-2 min-h-[200px] bg-slate-50 text-slate-700"
            value={isInitialPending ? "Loading..." : aiSuggestions ?? ""}
            readOnly
          />
        </div>

        {/* ===== SUGGESTED STAGE ===== */}
        <div className="flex flex-col gap-4">
          <p className="text-slate-500 text-sm">Edit the sample in the textbox.</p>

          <textarea
            className="w-full border border-slate-200 rounded-md p-2 min-h-[200px] text-slate-900 focus:outline-2 focus:outline-offset-2 focus:outline-navy-600"
            value={revisionInput}
            onChange={(e) => setRevisionInput(e.target.value)}
          />

          <button
            onClick={() =>
              mutation.mutate({ text: revisionInput, stage: "suggested" })
            }
            disabled={mutation.isPending}
            className="bg-mint-600 text-white text-sm px-4 py-2 rounded-md hover:bg-mint-700 cursor-pointer self-start"
          >
            Submit Revision
          </button>

          <textarea
            className="w-full border border-slate-200 rounded-md p-2 min-h-[200px] bg-slate-50 text-slate-700"
            value={isSuggestedPending ? "Loading..." : aiRevision ?? ""}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
