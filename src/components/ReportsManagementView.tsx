import React, { useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  FileCheck2,
  Filter,
  PlusCircle,
  Search,
  Star,
  Users,
} from 'lucide-react';
import { ROLES_CONFIG } from '../data/mockData';
import { ROLE_THEMES } from '../theme/roleThemes';
import { CircleReport, UserProfile } from '../types';

interface ReportsManagementViewProps {
  currentUser: UserProfile;
  reports: CircleReport[];
  onOpenSubmitReportPage: () => void;
  onOpenReportDetailPage: (report: CircleReport) => void;
}

export const ReportsManagementView: React.FC<ReportsManagementViewProps> = ({
  currentUser,
  reports,
  onOpenSubmitReportPage,
  onOpenReportDetailPage,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'revision'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const roleConfig = ROLES_CONFIG[currentUser.role];
  const theme = ROLE_THEMES[currentUser.role];

  const filteredReports = reports.filter((rep) => {
    if (statusFilter !== 'all' && rep.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        rep.circleName.toLowerCase().includes(q) ||
        rep.mainTopic.toLowerCase().includes(q) ||
        rep.leaderName.toLowerCase().includes(q) ||
        rep.baseName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12 text-right">
      {/* Top Banner with Dynamic Role Theme */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <FileCheck2 size={22} className="text-[#1A3326]" />
            <span>مدیریت و کارتابل گزارشات عملکرد حلقات صالحین</span>
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            پایش مستمر، نظارت محتوایی و ارزیابی کیفی جلسات هفتگی شجره طیبه صالحین
          </p>
        </div>

        {roleConfig.canSubmitReports && (
          <button
            onClick={onOpenSubmitReportPage}
            className="px-4 py-2.5 text-xs font-bold text-white bg-[#1A3326] hover:bg-[#122219] rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
          >
            <PlusCircle size={16} />
            <span>ورود به صفحه ثبت گزارش جدید</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-stone-200">
        <div className="relative flex-1">
          <Search size={16} className="absolute right-3 top-2.5 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در نام حلقه، سرگروه، موضوع یا پایگاه..."
            className="w-full pr-9 pl-4 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:border-[#1A3326]"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg overflow-x-auto shrink-0">
          {[
            { id: 'all', label: 'همه گزارش‌ها' },
            { id: 'pending', label: 'در انتظار بررسی' },
            { id: 'approved', label: 'تایید شده' },
            { id: 'revision', label: 'نیازمند اصلاح' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                statusFilter === tab.id
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Grid */}
      {filteredReports.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center space-y-3">
          <FileCheck2 size={36} className="text-stone-300 mx-auto" />
          <h3 className="text-sm font-bold text-stone-800">هیچ گزارشی یافت نشد</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            گزارشی با فیلترهای انتخابی موجود نیست. می‌توانید فیلترها را ریست کرده یا گزارش جدید ثبت نمایید.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.map((rep) => {
            const attendancePercent = Math.round((rep.presentCount / rep.totalMembers) * 100);

            return (
              <div
                key={rep.id}
                className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-[#1A3326] transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  {/* Top Meta info */}
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <div className="flex items-center gap-1.5 font-medium">
                      <span>جلسه شماره {rep.sessionNumber}</span>
                      <span aria-hidden="true">·</span>
                      <span>{rep.meetingDate}</span>
                      <span aria-hidden="true">·</span>
                      <span>{rep.ageGroup}</span>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${
                        rep.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : rep.status === 'pending'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {rep.status === 'approved'
                        ? 'تایید شده'
                        : rep.status === 'pending'
                        ? 'در انتظار بررسی'
                        : 'نیازمند اصلاح'}
                    </span>
                  </div>

                  {/* Circle and Topic */}
                  <h3 className="text-sm font-bold text-stone-900 line-clamp-1 mb-1">
                    {rep.circleName}
                  </h3>
                  <p className="text-xs font-semibold text-[#1A3326] mb-2">
                    موضوع: {rep.mainTopic}
                  </p>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {rep.summary}
                  </p>
                </div>

                {/* Quantitative Attendance & Metadata */}
                <div className="pt-3 border-t border-stone-100 space-y-2">
                  <div className="grid grid-cols-3 gap-2 text-center text-xs bg-stone-50 p-2.5 rounded-lg">
                    <div>
                      <span className="text-[10px] text-stone-400 block">حاضرین</span>
                      <span className="font-bold text-stone-800 font-mono tabular-nums">
                        {rep.presentCount} از {rep.totalMembers}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">درصد حضور</span>
                      <span className="font-bold text-emerald-700 font-mono tabular-nums">
                        {attendancePercent}٪
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">نمره کیفی</span>
                      <span className="font-bold text-[#8C6B13] font-mono tabular-nums">
                        {rep.score ? `${rep.score} نمره` : 'ثبت نشده'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                    <span>سرگروه: <strong>{rep.leaderName}</strong></span>
                    <button
                      onClick={() => onOpenReportDetailPage(rep)}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#1A3326] hover:bg-[#122219] rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <Eye size={13} />
                      <span>{roleConfig.canApproveReports ? 'ورود به صفحه ارزیابی →' : 'مشاهده صفحه گزارش →'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
