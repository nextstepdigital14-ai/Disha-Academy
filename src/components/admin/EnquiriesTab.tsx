import React, { useState } from 'react';
import { AdmissionEnquiry } from '../../types';
import { enquiryService } from '../../services/enquiryService';
import {
  Mail,
  Phone,
  MessageCircle,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  User,
  ChevronDown
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface EnquiriesTabProps {
  enquiries: AdmissionEnquiry[];
  onRefresh: () => void;
}

export const EnquiriesTab: React.FC<EnquiriesTabProps> = ({ enquiries, onRefresh }) => {
  const { showToast } = useNotification();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [courseFilter, setCourseFilter] = useState<string>('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdmissionEnquiry | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  const handleUpdateStatus = async (id: string, status: AdmissionEnquiry['status']) => {
    try {
      await enquiryService.updateEnquiryStatus(id, status, adminNotes || undefined);
      showToast(`Status updated to "${status}"`, 'success');
      onRefresh();
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status, adminNotes: adminNotes || selectedEnquiry.adminNotes });
      }
    } catch {
      showToast('Failed to update enquiry status', 'error');
    }
  };

  const filtered = enquiries.filter((e) => {
    const matchSearch =
      e.studentName.toLowerCase().includes(search.toLowerCase()) ||
      e.mobileNumber.includes(search) ||
      (e.email && e.email.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === 'All' || e.status === statusFilter;
    const matchCourse = courseFilter === 'All' || e.interestedCourse === courseFilter;
    return matchSearch && matchStatus && matchCourse;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
            Admission Enquiries ({enquiries.length})
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Follow up with students, track admission status, and contact applicants via WhatsApp or phone.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, phone or email..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
        >
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Enrolled">Enrolled</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
        >
          <option value="All">All Courses</option>
          <option value="MHT-CET">MHT-CET</option>
          <option value="JEE">JEE</option>
          <option value="NEET">NEET</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Enquiries List */}
        <div className="lg:col-span-8 space-y-3">
          {filtered.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
              No admission enquiries match the current filters.
            </div>
          ) : (
            filtered.map((enq) => {
              const isSelected = selectedEnquiry?.id === enq.id;
              const waLink = `https://wa.me/91${enq.mobileNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
                `Hello ${enq.studentName}! This is Disha Academy & Olympiad School, Kolhapur regarding your admission enquiry for ${enq.interestedCourse}.`
              )}`;

              return (
                <div
                  key={enq.id}
                  onClick={() => {
                    setSelectedEnquiry(enq);
                    setAdminNotes(enq.adminNotes || '');
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white dark:bg-slate-900 ${
                    isSelected
                      ? 'border-brand-500 shadow-md ring-1 ring-brand-500'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-navy-950 dark:text-white">
                          {enq.studentName}
                        </h4>
                        <span className="font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 text-[10px]">
                          {enq.interestedCourse}
                        </span>
                        <span className="text-slate-400 text-[11px]">Class {enq.studentClass}</span>
                      </div>

                      <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 pt-0.5">
                        <span className="flex items-center gap-1 font-mono">
                          <Phone className="w-3.5 h-3.5 text-brand-500" /> {enq.mobileNumber}
                        </span>
                        {enq.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5 text-slate-400" /> {enq.email}
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400">
                          {new Date(enq.submittedAt).toLocaleDateString()}
                        </span>
                      </div>

                      {enq.message && (
                        <p className="text-slate-600 dark:text-slate-300 text-[11px] line-clamp-1 italic mt-1">
                          &quot;{enq.message}&quot;
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 hover:bg-emerald-100 font-bold text-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>WhatsApp</span>
                      </a>

                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          enq.status === 'New'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                            : enq.status === 'Contacted'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : enq.status === 'Enrolled'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Detail & Action Drawer */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
          {selectedEnquiry ? (
            <>
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Enquiry ID: {selectedEnquiry.id}
                </span>
                <h3 className="font-bold text-base text-navy-950 dark:text-white mt-1">
                  {selectedEnquiry.studentName}
                </h3>
                <p className="text-xs text-slate-500">
                  Submitted on {new Date(selectedEnquiry.submittedAt).toLocaleString()}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Mobile Phone:</span>
                  <a href={`tel:${selectedEnquiry.mobileNumber}`} className="font-bold text-brand-600">
                    {selectedEnquiry.mobileNumber}
                  </a>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Target Course:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedEnquiry.interestedCourse}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Academic Class:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedEnquiry.studentClass}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Preferred Batch:</span>
                  <span>{selectedEnquiry.preferredBatch}</span>
                </div>
                {selectedEnquiry.email && (
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">Email:</span>
                    <span>{selectedEnquiry.email}</span>
                  </div>
                )}
              </div>

              {selectedEnquiry.message && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-500 block text-[10px] uppercase mb-1">Student Note:</span>
                  {selectedEnquiry.message}
                </div>
              )}

              {/* Status Update Buttons */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Change Enquiry Status:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['New', 'Contacted', 'Enrolled', 'Closed'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleUpdateStatus(selectedEnquiry.id, st)}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                        selectedEnquiry.status === st
                          ? 'bg-navy-900 text-white dark:bg-brand-600 border-navy-900 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Notes */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Counselor Follow-Up Notes:
                </label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record conversation outcome, fee quote, or visit appointment..."
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedEnquiry.id, selectedEnquiry.status)}
                  className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 font-bold text-xs"
                >
                  Save Counselor Notes
                </button>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs">
              <Mail className="w-10 h-10 mx-auto mb-2 opacity-30" />
              Click an admission enquiry on the left to view details and update follow-up status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
