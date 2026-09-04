import ReadingExercise from "@/app/components/reading-exercise";
import { ReadingDifficultyLevel, ReadingPromptType } from "@/app/types/reading";

export default function ShortReadingExercisePage() {
  return (
    <main className="p-4">
      <ReadingExercise
        level={ReadingDifficultyLevel.High}
        promptType={ReadingPromptType.ShortWithTopicAndLevel}
      />
    </main>
  );
}
