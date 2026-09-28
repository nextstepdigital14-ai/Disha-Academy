import React from 'react';
import {
  LayoutDashboard,
  FileText,
  CheckCircle2,
  Users,
  GraduationCap,
  Bell,
  Settings,
  Mail,
  BarChart2,
  Database
} from 'lucide-react';

export type AdminTab =
  | 'overview'
  | 'notes'
  | 'mcq'
  | 'students'
  | 'courses'
  | 'announcements'
  | 'content'
  | 'enquiries'
  | 'reports'
  | 'firebase';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  enquiriesCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  enquiriesCount
}) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'enquiries', label: 'Enquiries', icon: <Mail className="w-4 h-4" />, badge: enquiriesCount },
    { id: 'notes', label: 'Notes Library', icon: <FileText className="w-4 h-4" /> },
    { id: 'mcq', label: 'MCQ & Test Series', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'students', label: 'Students', icon: <Users className="w-4 h-4" /> },
    { id: 'courses', label: 'Courses & Batches', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'announcements', label: 'Announcements', icon: <Bell className="w-4 h-4" /> },
    { id: 'content', label: 'Website Content', icon: <Settings className="w-4 h-4" /> },
    { id: 'reports', label: 'Analytics Reports', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'firebase', label: 'Firebase Config', icon: <Database className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full lg:w-64 bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200 dark:border-slate-800 shadow-soft space-y-1">
      <div className="px-3 py-3 border-b border-slate-100 dark:border-slate-800 mb-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Admin Control Center</h4>
        <p className="text-xs font-semibold text-navy-950 dark:text-white mt-0.5">Disha Academy Kolhapur</p>
      </div>

      <nav className="space-y-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id as AdminTab)}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                isActive
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-navy-950 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                {tab.icon}
                <span>{tab.label}</span>
              </div>

              {tab.badge !== undefined && tab.badge > 0 && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white text-brand-700'
                      : 'bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
