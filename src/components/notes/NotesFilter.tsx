import React from 'react';
import { TargetExam, ClassLevel, SubjectType } from '../../types';
import { Search, Filter, X } from 'lucide-react';

interface NotesFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCourse: TargetExam | 'All';
  onCourseChange: (c: TargetExam | 'All') => void;
  selectedClass: ClassLevel | 'All';
  onClassChange: (cl: ClassLevel | 'All') => void;
  selectedSubject: SubjectType | 'All';
  onSubjectChange: (s: SubjectType | 'All') => void;
  onReset: () => void;
  totalCount: number;
}

export const NotesFilter: React.FC<NotesFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCourse,
  onCourseChange,
  selectedClass,
  onClassChange,
  selectedSubject,
  onSubjectChange,
  onReset,
  totalCount
}) => {
  const courses: (TargetExam | 'All')[] = ['All', 'MHT-CET', 'JEE', 'NEET'];
  const classes: (ClassLevel | 'All')[] = ['All', '11th', '12th', 'Dropper'];
  const subjects: (SubjectType | 'All')[] = ['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology'];

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCourse !== 'All' ||
    selectedClass !== 'All' ||
    selectedSubject !== 'All';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-soft space-y-5">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by chapter (e.g. Rotational Dynamics), topic, or keyword..."
          className="w-full pl-12 pr-10 py-3 text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Rows */}
      <div className="space-y-4 pt-1">
        {/* Course Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
          <span className="font-bold text-slate-500 dark:text-slate-400 w-20 flex-shrink-0">
            Target Exam:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {courses.map((c) => (
              <button
                key={c}
                onClick={() => onCourseChange(c)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedCourse === c
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {c === 'All' ? 'All Exams' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
          <span className="font-bold text-slate-500 dark:text-slate-400 w-20 flex-shrink-0">
            Subject:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => onSubjectChange(s)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedSubject === s
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {s === 'All' ? 'All Subjects' : s}
              </button>
            ))}
          </div>
        </div>

        {/* Class Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
          <span className="font-bold text-slate-500 dark:text-slate-400 w-20 flex-shrink-0">
            Class Level:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {classes.map((cl) => (
              <button
                key={cl}
                onClick={() => onClassChange(cl)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedClass === cl
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cl === 'All' ? 'All Classes' : cl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Info Footer */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>
          Showing <strong>{totalCount}</strong> study resource{totalCount === 1 ? '' : 's'}
        </span>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-brand-600 dark:text-brand-400 font-bold hover:underline flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> Reset Filters
          </button>
        )}
      </div>
    </div>
  );
};
