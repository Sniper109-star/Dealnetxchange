"use client";

export default function ProgressMeter({
  startedAt,
  endsAt,
  completed,
}: {
  startedAt: string;
  endsAt: string;
  completed: boolean;
}) {
  const progress = completed
    ? 100
    : Math.min(
        100,
      Math.round(
        // eslint-disable-next-line react-hooks/purity
        ((Date.now() - new Date(startedAt).getTime()) /
          (new Date(endsAt).getTime() - new Date(startedAt).getTime())) *
          100
      )
      );

  return (
    <div className="mt-4">
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-600 to-brand-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
