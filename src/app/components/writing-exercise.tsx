"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@auth0/nextjs-auth0/client";
// import { apiClient } from "@/app/lib/api-client";
import { get2ndDraftFeedback, suggestImprovementsForWritingSample } from "../lib/writing-api-client";
import { SubmitWritingRevisionRequest, SubmitWritingSampleRequest } from "../types/writing";

export default function WritingExercise() {
  const { user } = useUser();
  const [initialInput, setInitialInput] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null);
  const [exerciseId, setExerciseId] = useState<number | null>(null);

  const [revisionInput, setRevisionInput] = useState("");
  const [aiRevision, setAiRevision] = useState<string | null>(null);

  // const endpointMap = {
  //   initial: "/Writing/SuggestImprovementsForWritingSample",
  //   suggested: "/Writing/Get2ndRoundWritingFeedback",
  // } as const;

  const mutation = useMutation({
    mutationFn: async ({
      text,
      stage,
    }: {
      text: string;
      stage: "initial" | "suggested";
    }) => {
      // const endpoint = endpointMap[stage];

      if (stage === "initial") {
        const payload: SubmitWritingSampleRequest = {
          userId: 0,
          userName: user?.name ?? "",
          userEmail: user?.email ?? "",
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

        {/* ===== INITIAL STAGE ===== */}
        <div className="flex flex-col gap-4">
          <p className="text-slate-500 text-sm">Step 1: Get suggestions</p>

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
          <p className="text-slate-500 text-sm">Step 2: Revise writing</p>

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
            Revise
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
