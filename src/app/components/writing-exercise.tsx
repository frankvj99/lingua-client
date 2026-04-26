"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/app/lib/api-client";

export default function WritingExercise() {
  const [initialInput, setInitialInput] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null);

  const [revisionInput, setRevisionInput] = useState("");
  const [aiRevision, setAiRevision] = useState<string | null>(null);

  const endpointMap = {
    initial: "/Writing/SuggestImprovementsForWritingSample",
    suggested: "/Writing/EditAndReviseWritingSample",
  } as const;

  const mutation = useMutation({
    mutationFn: async ({
      text,
      stage,
    }: {
      text: string;
      stage: "initial" | "suggested";
    }) => {
      const endpoint = endpointMap[stage];

      const res = await apiClient.post<{ result: string }>(endpoint, {
        writingSample: text,
      });

      return { result: res.result, stage };
    },

    onSuccess: ({ result, stage }) => {
      if (stage === "initial") {
        setAiSuggestions(result);
        setRevisionInput(initialInput); // pipe forward
      } else {
        setAiRevision(result);
      }
    },
  });

  return (
    <div className="w-full p-4">
      <div className="border rounded-lg shadow-sm p-6 bg-white max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Writing Revision Exercise
        </h2>

        {/* ===== INITIAL STAGE ===== */}
        <div className="flex flex-col gap-4 mb-8">
          <p className="text-gray-700">Step 1: Get suggestions</p>

          <textarea
            className="w-full border rounded-md p-2 min-h-[200px] text-black"
            value={initialInput}
            onChange={(e) => setInitialInput(e.target.value)}
          />

          <button
            onClick={() =>
              mutation.mutate({ text: initialInput, stage: "initial" })
            }
            disabled={mutation.isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Get Suggestions
          </button>

          <textarea
            className="w-full border rounded-md p-2 min-h-[200px] bg-gray-100 text-black"
            value={aiSuggestions ?? ""}
            readOnly
          />
        </div>

        {/* ===== SUGGESTED STAGE ===== */}
        <div className="flex flex-col gap-4">
          <p className="text-gray-700">Step 2: Revise writing</p>

          <textarea
            className="w-full border rounded-md p-2 min-h-[200px] text-black"
            value={revisionInput}
            onChange={(e) => setRevisionInput(e.target.value)}
          />

          <button
            onClick={() =>
              mutation.mutate({ text: revisionInput, stage: "suggested" })
            }
            disabled={mutation.isPending}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Revise
          </button>

          <textarea
            className="w-full border rounded-md p-2 min-h-[200px] bg-gray-100 text-black"
            value={aiRevision ?? ""}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
