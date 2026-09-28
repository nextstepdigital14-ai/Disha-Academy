import React, { useState } from 'react';
import { UserProfile, TestAttempt } from '../../types';
import { authService } from '../../services/authService';
import { Search, User, ShieldCheck, CheckCircle2, XCircle, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface StudentManagerTabProps {
  students: UserProfile[];
  attempts: TestAttempt[];
  onRefresh: () => void;
}

export const StudentManagerTab: React.FC<StudentManagerTabProps> = ({
  students,
  attempts,
  onRefresh
}) => {
  const { showToast } = useNotification();
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<UserProfile | null>(null);

  const handleToggleStatus = (student: UserProfile) => {
    const updatedStatus = !student.isActive;
    authService.toggleUserStatus(student.uid, updatedStatus);
    showToast(`Student account ${updatedStatus ? 'activated' : 'deactivated'}`, 'info');
    onRefresh();
  };

  const filteredStudents = students.filter(
    (s) =>
      s.displayName.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const studentAttempts = selectedStudent
    ? attempts.filter((a) => a.studentId === selectedStudent.uid || a.studentEmail === selectedStudent.email)
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
          Student Management & Progress Tracking
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Manage enrolled students, control access permissions, and inspect individualized test results.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by student name or email..."
          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Students Table */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">Target Course</th>
                  <th className="p-4">Class</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredStudents.map((s) => (
                  <tr
                    key={s.uid}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer ${
                      selectedStudent?.uid === s.uid ? 'bg-brand-50/60 dark:bg-brand-950/40' : ''
                    }`}
                    onClick={() => setSelectedStudent(s)}
                  >
                    <td className="p-4">
                      <p className="font-bold text-slate-900 dark:text-white">{s.displayName}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{s.email}</p>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-brand-600 dark:text-brand-400">
                        {s.targetExam || 'General'}
                      </span>
                    </td>
                    <td className="p-4">{s.studentClass || '12th'}</td>
                    <td className="p-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          s.role === 'admin'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {s.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          s.isActive
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {s.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {s.role !== 'admin' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(s);
                          }}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                            s.isActive
                              ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
                              : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                          }`}
                        >
                          {s.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Student Details Card */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
          {selectedStudent ? (
            <>
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold text-lg">
                  {selectedStudent.displayName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-base text-navy-950 dark:text-white">
                    {selectedStudent.displayName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selectedStudent.email}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Target Goal:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedStudent.targetExam || 'MHT-CET'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Academic Class:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedStudent.studentClass || '12th'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Mobile Phone:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedStudent.phone || 'Not provided'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Joined:</span>
                  <span>{new Date(selectedStudent.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Individual Test Attempts */}
              <div className="pt-2 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                  Student Test Attempts ({studentAttempts.length})
                </h4>

                {studentAttempts.length === 0 ? (
                  <p className="text-xs text-slate-400 py-3 text-center">No test attempts yet.</p>
                ) : (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {studentAttempts.map((att) => (
                      <div
                        key={att.id}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between"
                      >
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{att.testTitle}</p>
                          <p className="text-[10px] text-slate-500">{new Date(att.completedAt).toLocaleDateString()}</p>
                        </div>
                        <span className="font-extrabold text-brand-600 dark:text-brand-400">
                          {att.score}/{att.maxMarks} ({att.percentage.toFixed(0)}%)
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs">
              <User className="w-10 h-10 mx-auto mb-2 opacity-30" />
              Click any student from the list to view profile and test progress.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
