import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerBadgeProps {
  totalSeconds: number;
  onTimeUp: () => void;
  isPaused?: boolean;
}

export const TimerBadge: React.FC<TimerBadgeProps> = ({ totalSeconds, onTimeUp, isPaused }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);

  useEffect(() => {
    setSecondsRemaining(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (isPaused) return;

    if (secondsRemaining <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining, onTimeUp, isPaused]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const isUrgent = secondsRemaining < 120; // Under 2 mins

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-sm font-bold border transition-colors ${
        isUrgent
          ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800 animate-pulse'
          : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
      }`}
    >
      {isUrgent ? (
        <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
      ) : (
        <Clock className="w-4 h-4 text-brand-600 dark:text-brand-400" />
      )}
      <span>{formattedTime}</span>
    </div>
  );
};
