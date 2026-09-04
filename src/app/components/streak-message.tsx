"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentStreak } from "../lib/user-streak-api-client";

export default function StreakMessage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["currentStreak"],
    queryFn: getCurrentStreak,
  });

  if (isLoading || isError || !data) {
    return <p className="text-sm text-slate-500">Continue your language practice below.</p>;
  }

  if (data.currentStreak <= 0) {
    return (
      <p className="text-sm text-slate-500">
        You don&apos;t have a streak going yet — complete an exercise today to start one!
      </p>
    );
  }

  const dayLabel = data.currentStreak === 1 ? "day" : "days";

  return (
    <p className="text-sm text-slate-500">
      🔥 You&apos;re on a {data.currentStreak}-{dayLabel} streak! Keep it going today.
    </p>
  );
}
