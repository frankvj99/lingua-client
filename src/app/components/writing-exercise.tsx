"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/app/lib/api-client";

export default function WritingExercise() {
  const [inputText, setInputText] = useState("");
  const [revisionResult, setRevisionResult] = useState<string | null>(null);

  const [stage, setStage] = useState<"initial" | "suggested" | "complete">("initial");

  const endpointMap = {
    initial: "/Writing/SuggestImprovementsForWritingSample",
    suggested: "/Writing/EditAndReviseWritingSample",
    complete: null,
  } as const;

  const buttonLabelMap = {
    initial: "Offer suggestions for improvement",
    suggested: "Edit / Revise",
    complete: "Start a new exercise",
  };

  const mutation = useMutation({
    mutationFn: async (text: string) => {
      const endpoint = endpointMap[stage];

      if (!endpoint) {
        return null;
      }

      const res = await apiClient.post<{ result: string }>(
        endpoint,
        {
          writingSample: text,
        }
      );

      return res.result;
    },

    onSuccess: (data) => {
      setRevisionResult(data);

      // Move to next stage
      if (stage === "initial") {
        setStage("suggested");
      }
      else if (stage === "suggested") {
        setStage("complete");
      }
      else {
        setStage("initial");
        setInputText(""); 
        setRevisionResult(null); 
      }
    },
  });

  const handleSubmit = () => {
    mutation.mutate(inputText);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="border rounded-lg shadow-sm p-6 bg-white">
        <h2 className="text-xl font-semibold mb-2 text-black">
          Writing Revision Exercise
        </h2>

        <p className="text-gray-700">
          Enter your writing sample here:
        </p>

        <div className="flex flex-col gap-4 mt-4">
          <textarea
            className="w-full border rounded-md p-2 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Enter your writing sample here."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={mutation.isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {mutation.isPending
              ? "Processing..."
              : buttonLabelMap[stage]}
          </button>

          <p className="text-gray-700">
            {stage === "initial"
              ? "Suggestions:"
              : "Revised output:"}
          </p>

          <textarea
            className="w-full border rounded-md p-2 min-h-[200px] bg-gray-100 text-black"
            value={revisionResult ?? ""}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
