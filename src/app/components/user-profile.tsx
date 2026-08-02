"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUserProfile, updateCurrentUserProfile } from "../lib/user-api-client";
import { UserEducationLevel } from "../types/user-profile";

const gradeLevelLabels: Record<UserEducationLevel, string> = {
  [UserEducationLevel.NotRecorded]: "Not Recorded",
  [UserEducationLevel.GradesKThru4]: "Grades K-4",
  [UserEducationLevel.Grades5Thru8]: "Grades 5-8",
  [UserEducationLevel.Grades9Thru12]: "Grades 9-12",
  [UserEducationLevel.UndergraduateCollege]: "Undergraduate College",
  [UserEducationLevel.BachelorDegree]: "Bachelor Degree",
  [UserEducationLevel.AdvancedDegree]: "Advanced Degree",
};

export default function UserProfile() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getCurrentUserProfile,
  });

  const [gradeLevel, setGradeLevel] = useState<UserEducationLevel | null>(null);

  useEffect(() => {
    if (data) setGradeLevel(data.gradeLevel);
  }, [data]);

  const mutation = useMutation({
    mutationFn: updateCurrentUserProfile,
    onSuccess: (updated) => {
      queryClient.setQueryData(["userProfile"], updated);
      setGradeLevel(updated.gradeLevel);
    },
  });

  if (isLoading) return <p className="p-4 text-slate-500 text-sm">Loading...</p>;
  if (isError) return <p className="p-4 text-red-600 text-sm">{(error as Error).message || "Something went wrong"}</p>;
  if (!data) return null;

  const isDirty = gradeLevel !== null && gradeLevel !== data.gradeLevel;

  const handleSave = () => {
    if (gradeLevel === null) return;
    mutation.mutate({ ...data, gradeLevel });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      <h2 className="text-xl font-semibold text-slate-900">User Profile</h2>

      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">Name</label>
          <input
            type="text"
            value={data.name}
            readOnly
            className="w-full border border-slate-200 rounded-md p-2 bg-slate-50 text-slate-700"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={data.email}
            readOnly
            className="w-full border border-slate-200 rounded-md p-2 bg-slate-50 text-slate-700"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">Picture URL</label>
          <input
            type="text"
            value={data.picture ?? ""}
            readOnly
            className="w-full border border-slate-200 rounded-md p-2 bg-slate-50 text-slate-700"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">Grade Level</label>
          <select
            value={gradeLevel ?? data.gradeLevel}
            onChange={(e) => setGradeLevel(Number(e.target.value) as UserEducationLevel)}
            className="w-full border border-slate-200 rounded-md p-2 text-slate-700"
          >
            {Object.entries(gradeLevelLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.profileComplete}
            disabled
            className="accent-navy-800"
          />
          <label className="text-sm font-medium text-slate-700">Profile Complete</label>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">Last Login</label>
          <input
            type="text"
            value={data.lastLoginAt ? new Date(data.lastLoginAt).toLocaleString() : "—"}
            readOnly
            className="w-full border border-slate-200 rounded-md p-2 bg-slate-50 text-slate-700"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={!isDirty || mutation.isPending}
            className="bg-navy-800 text-white text-sm px-4 py-2 rounded-md hover:bg-navy-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-navy-800"
          >
            Save
          </button>
          {mutation.isPending && <span className="text-sm text-slate-500">Saving...</span>}
          {mutation.isError && (
            <span className="text-sm text-red-600">
              {(mutation.error as Error).message || "Something went wrong"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
