import React, { useState } from 'react';
import { Course, BatchInfo } from '../../types';
import { contentService } from '../../services/contentService';
import { Edit, Plus, Trash2, CheckCircle2, X, Clock, Calendar, Users } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface CoursesManagerTabProps {
  courses: Course[];
  onRefresh: () => void;
}

export const CoursesManagerTab: React.FC<CoursesManagerTabProps> = ({ courses, onRefresh }) => {
  const { showToast } = useNotification();
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [badge, setBadge] = useState('');
  const [duration, setDuration] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [tuitionFee, setTuitionFee] = useState('');
  const [installments, setInstallments] = useState('');
  const [batches, setBatches] = useState<BatchInfo[]>([]);

  const handleStartEdit = (c: Course) => {
    setEditingCourse(c);
    setName(c.name);
    setBadge(c.badge);
    setDuration(c.duration);
    setEligibility(c.eligibility);
    setShortDesc(c.shortDesc);
    setFullDesc(c.fullDesc);
    setTuitionFee(c.feeStructure.tuitionFee);
    setInstallments(c.feeStructure.installments);
    setBatches([...c.batches]);
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    try {
      await contentService.updateCourse(editingCourse.id, {
        name,
        badge,
        duration,
        eligibility,
        shortDesc,
        fullDesc,
        feeStructure: {
          ...editingCourse.feeStructure,
          tuitionFee,
          installments
        },
        batches
      });

      showToast('Course and batch details saved successfully!', 'success');
      setEditingCourse(null);
      onRefresh();
    } catch {
      showToast('Failed to save course changes.', 'error');
    }
  };

  const handleAddBatch = () => {
    const newB: BatchInfo = {
      id: 'batch-' + Date.now(),
      name: 'New Academic Batch',
      timing: '08:00 AM - 12:30 PM',
      startDate: '15 June 2026',
      seatsTotal: 40,
      seatsAvailable: 20,
      mode: 'Offline Classroom'
    };
    setBatches([...batches, newB]);
  };

  const handleRemoveBatch = (bId: string) => {
    setBatches(batches.filter((b) => b.id !== bId));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
          Courses, Fees & Batch Management
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Modify course descriptions, syllabus overviews, official fees, and real batch seat availability.
        </p>
      </div>

      {/* Editing Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-navy-950 dark:text-white">
                Edit Course: {editingCourse.name}
              </h3>
              <button onClick={() => setEditingCourse(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Course Display Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Badge Highlight *
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Duration *
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Eligibility *
                  </label>
                  <input
                    type="text"
                    value={eligibility}
                    onChange={(e) => setEligibility(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              {/* Fee Structure */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-navy-950 dark:text-white">Fee Structure Settings</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Tuition Fee *
                    </label>
                    <input
                      type="text"
                      value={tuitionFee}
                      onChange={(e) => setTuitionFee(e.target.value)}
                      placeholder="e.g. ₹55,000 / year"
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Installment Terms
                    </label>
                    <input
                      type="text"
                      value={installments}
                      onChange={(e) => setInstallments(e.target.value)}
                      placeholder="e.g. 3 Installments allowed"
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Batches Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-navy-950 dark:text-white">
                    Active Batches ({batches.length})
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddBatch}
                    className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Batch
                  </button>
                </div>

                <div className="space-y-2">
                  {batches.map((b, idx) => (
                    <div
                      key={b.id}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
                        <input
                          type="text"
                          value={b.name}
                          onChange={(e) => {
                            const newB = [...batches];
                            newB[idx].name = e.target.value;
                            setBatches(newB);
                          }}
                          placeholder="Batch Name"
                          className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                        />
                        <input
                          type="text"
                          value={b.timing}
                          onChange={(e) => {
                            const newB = [...batches];
                            newB[idx].timing = e.target.value;
                            setBatches(newB);
                          }}
                          placeholder="Timing"
                          className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                        />
                        <input
                          type="text"
                          value={b.startDate}
                          onChange={(e) => {
                            const newB = [...batches];
                            newB[idx].startDate = e.target.value;
                            setBatches(newB);
                          }}
                          placeholder="Start Date"
                          className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                        />
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={b.seatsAvailable}
                            onChange={(e) => {
                              const newB = [...batches];
                              newB[idx].seatsAvailable = Number(e.target.value);
                              setBatches(newB);
                            }}
                            title="Available Seats"
                            className="w-16 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                          />
                          <span className="text-[10px] text-slate-400">seats</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveBatch(b.id)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold"
                >
                  Save Course & Batches
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  {course.badge}
                </span>
                <span className="text-xs text-slate-400">{course.duration}</span>
              </div>

              <h3 className="font-bold text-lg text-navy-950 dark:text-white">{course.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{course.shortDesc}</p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>Fee:</strong> {course.feeStructure.tuitionFee}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>Batches:</strong> {course.batches.length} scheduled
                </p>
              </div>
            </div>

            <button
              onClick={() => handleStartEdit(course)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white font-bold text-xs transition-colors"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Course Details & Batches</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
