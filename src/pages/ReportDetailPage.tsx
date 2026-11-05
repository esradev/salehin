import React, { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  FileCheck2,
  Shield,
  Star,
  User,
  Users,
} from 'lucide-react';
import { ROLES_CONFIG } from '../data/mockData';
import { ROLE_THEMES } from '../theme/roleThemes';
import { CircleReport, UserProfile } from '../types';

interface ReportDetailPageProps {
  report: CircleReport;
  currentUser: UserProfile;
  onBack: () => void;
  onUpdateStatus: (reportId: string, status: 'approved' | 'revision', score: number, feedback: string) => void;
}

export const ReportDetailPage: React.FC<ReportDetailPageProps> = ({
  report,
  currentUser,
  onBack,
  onUpdateStatus,
}) => {
  const roleConfig = ROLES_CONFIG[currentUser.role];
  const theme = ROLE_THEMES[currentUser.role];

  const [evalScore, setEvalScore] = useState<number>(report.score || 90);
  const [evalFeedback, setEvalFeedback] = useState<string>(report.evaluatorFeedback || '');

  const attendancePercent = Math.round((report.presentCount / report.totalMembers) * 100);

  const handleApprove = () => {
    onUpdateStatus(report.id, 'approved', evalScore, evalFeedback);
    onBack();
  };

  const handleRequestRevision = () => {
    onUpdateStatus(report.id, 'revision', evalScore, evalFeedback);
    onBack();
  };

  return (
    <div className="space-y-6 pb-16 text-right max-w-4xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 bg-white px-3 py-1.5 rounded-lg border border-stone-200 transition-colors shadow-xs"
        >
          <ArrowRight size={15} />
          <span>بازگشت به فهرست گزارش‌ها</span>
        </button>

        <span
          className={`text-xs font-bold px-3 py-1 rounded-md ${
            report.status === 'approved'
              ? 'bg-emerald-100 text-emerald-900'
              : report.status === 'pending'
              ? 'bg-amber-100 text-amber-900'
              : 'bg-rose-100 text-rose-900'
          }`}
        >
          وضعیت گزارش: {report.status === 'approved' ? 'تایید شده' : report.status === 'pending' ? 'در انتظار بررسی' : 'نیازمند اصلاح'}
        </span>
      </div>

      {/* Main Header Banner */}
      <div className={`p-6 sm:p-7 rounded-2xl text-white bg-gradient-to-br ${theme.bannerGradient} border ${theme.bannerBorder} shadow-lg relative overflow-hidden`}>
        <div className="space-y-2">
          <span className="text-xs font-semibold text-stone-300">
            {report.nahiehName} · {report.hozehName} · {report.baseName}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            مشروح گزارش جلسه شماره {report.sessionNumber} - {report.circleName}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300">
            سرگروه: <strong>{report.leaderName}</strong> · مربی پایگاه: {report.morabbiName} · تاریخ برگزاری: {report.meetingDate}
          </p>
        </div>
      </div>

      {/* Report Content Full Page Container */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Quantitative Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs">
          <div>
            <span className="text-stone-400 block text-[11px]">رده سنی و محور</span>
            <span className="font-bold text-stone-900">{report.ageGroup} · {report.topicType}</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[11px]">تعداد کل اعضا</span>
            <span className="font-bold text-stone-900 font-mono tabular-nums">{report.totalMembers} نفر</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[11px]">حاضرین در جلسه</span>
            <span className="font-bold text-emerald-700 font-mono tabular-nums">{report.presentCount} نفر ({attendancePercent}٪)</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[11px]">امتیاز کیفی ثبت‌شده</span>
            <span className="font-bold text-[#8C6B13] font-mono tabular-nums text-sm">
              {report.score ? `${report.score} از ۱۰۰` : 'ثبت نشده'}
            </span>
          </div>
        </div>

        {/* Topic & Discussion Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-stone-500 uppercase">موضوع محوری جلسه:</h3>
          <p className="text-sm font-bold text-stone-900 bg-stone-50 p-4 rounded-xl border border-stone-100">
            {report.mainTopic}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-stone-500 uppercase">مشروح مباحث و رویدادهای جلسه:</h3>
          <div className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-100 whitespace-pre-line">
            {report.summary}
          </div>
        </div>

        {/* Decisions */}
        {report.decisions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-stone-500 uppercase">مصوبات اجرایی:</h3>
            <div className="space-y-2">
              {report.decisions.map((dec, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-stone-800 p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <CheckCircle2 size={15} className="text-[#2D4A3E] shrink-0" />
                  <span>{dec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges */}
        {report.challenges && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-stone-500 uppercase">چالش‌ها و نیازهای اعلام‌شده:</h3>
            <p className="text-xs text-amber-900 bg-amber-50 p-3.5 rounded-xl border border-amber-200">
              {report.challenges}
            </p>
          </div>
        )}

        {/* Photo Document */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-stone-500 uppercase">مستند تصویری جلسه:</h3>
          <div className="rounded-xl overflow-hidden border border-stone-200 max-h-72">
            <img
              src={report.photoUrl || new URL('../assets/images/salehin_hero_banner_1793894946018.jpg', import.meta.url).href}
              alt="عکس جلسه حلقه صالحین"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Evaluation and Sign-Off Console for Officers & Coaches */}
        {roleConfig.canApproveReports && (
          <div className="p-5 bg-[#FAF8F5] rounded-xl border border-[#C59B27]/40 space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1E352B] flex items-center gap-1.5">
                <Star size={16} className="text-[#C59B27]" />
                <span>پنل ارزیابی، بازخورد و ثبت نمره کیفی (ویژه مربی و سرمربی)</span>
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-700">نمره کیفی (۰ تا ۱۰۰):</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={evalScore}
                  onChange={(e) => setEvalScore(Number(e.target.value))}
                  className="w-16 px-2 py-1 text-xs font-bold text-center border border-stone-300 rounded-lg font-mono tabular-nums bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                رهنمود، پیام تشویقی یا بازخورد اصلاحی به سرگروه:
              </label>
              <textarea
                rows={3}
                value={evalFeedback}
                onChange={(e) => setEvalFeedback(e.target.value)}
                placeholder="رهنمودهای تربیتی و ارزیابی خود از محتوای این جلسه را مرقوم فرمایید..."
                className="w-full p-3 text-xs bg-white border border-stone-200 rounded-xl focus:border-[#2D4A3E]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleRequestRevision}
                className="px-4 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition-colors"
              >
                درخواست اصلاح و ارجاع به سرگروه
              </button>
              <button
                type="button"
                onClick={handleApprove}
                className="px-5 py-2 text-xs font-bold text-white bg-[#1A3326] hover:bg-[#122219] rounded-xl transition-all shadow-md"
              >
                تایید نهایی و ثبت نمره در رتبه‌بندی
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
