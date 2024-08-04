import { cn } from "@/lib/utils";

type Props = {
  score: number;
};

export default function EvaluationScore({ score }: Props) {
  const TOTAL_CIRCLE_SPAN = 75;
  const scoreSpan = (score * TOTAL_CIRCLE_SPAN) / 100;

  return (
    <div className="relative size-12 mx-auto">
      <svg
        className="rotate-[135deg] size-full"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-neutral-700"
          strokeWidth="2"
          strokeDasharray="75 100"
          strokeLinecap="round"
        ></circle>
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className={cn(
            "stroke-current text-yellow-500",
            score <= 40 && "text-red-500",
            score >= 70 && "text-green-500"
          )}
          strokeWidth="3"
          strokeDasharray={`${scoreSpan} 100`}
          strokeLinecap="round"
        ></circle>
      </svg>

      <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-sm">{score}</span>
      </div>
    </div>
  );
}
