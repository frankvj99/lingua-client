"use client";

import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { getCurrentUserDashboard } from "../lib/reading-api-client";
import { UserReadingExerciseDto } from "../types/user-dashboard";
import DataTable from "./data-table";

const columns: ColumnDef<UserReadingExerciseDto>[] = [
  {
    accessorKey: "readingPassagePreviewText",
    header: "Passage",
  },
  {
    accessorKey: "numberOfQuestions",
    header: "Questions",
  },
  {
    accessorKey: "numberCorrectlyAnswered",
    header: "Correct",
  },
  {
    accessorKey: "numberOfTries",
    header: "Tries",
  },
  {
    accessorKey: "userCanTryAgain",
    header: "Can Retry",
    cell: (info) => (info.getValue() ? "Yes" : "No"),
  },
  {
    accessorKey: "completedOn",
    header: "Completed On",
    cell: (info) => {
      const value = info.getValue<string | null>();
      return value ? new Date(value).toLocaleDateString() : "—";
    },
  },
];

export default function UserDashboard() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userDashboard"],
    queryFn: getCurrentUserDashboard,
  });

  if (isLoading) return <p className="p-4 text-slate-500 text-sm">Loading...</p>;
  if (isError) return <p className="p-4 text-red-600 text-sm">{(error as Error).message || "Something went wrong"}</p>;
  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">{data.userName}&apos;s Dashboard</h2>
        <p className="text-sm text-slate-500">{data.email}</p>
      </div>

      <DataTable columns={columns} data={data.userReadingExercises} />
    </div>
  );
}
