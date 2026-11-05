import React, { useState } from 'react';
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  FileCheck2,
  FileText,
  Image as ImageIcon,
  Plus,
  Shield,
  Trash2,
  UserCheck,
  Users,
} from 'lucide-react';
import { MOCK_CIRCLE_MEMBERS, ROLES_CONFIG } from '../data/mockData';
import { ROLE_THEMES } from '../theme/roleThemes';
import { CircleReport, UserProfile } from '../types';

interface SubmitReportPageProps {
  currentUser: UserProfile;
  onBack: () => void;
  onSubmitReport: (report: Omit<CircleReport, 'id' | 'createdAt' | 'status'>) => void;
}

export const SubmitReportPage: React.FC<SubmitReportPageProps> = ({
  currentUser,
  onBack,
  onSubmitReport,
}) => {
  const roleConfig = ROLES_CONFIG[currentUser.role];
  const theme = ROLE_THEMES[currentUser.role];

  // Sargorouh / Morabbi specific state
  const [meetingDate, setMeetingDate] = useState('۱۴۰۵/۰۸/۱۶');
  const [sessionNumber, setSessionNumber] = useState(25);
  const [ageGroup, setAgeGroup] = useState<CircleReport['ageGroup']>('نوجوانان');
  const [topicType, setTopicType] = useState<CircleReport['topicType']>('تربیتی و اخلاقی');
  const [mainTopic, setMainTopic] = useState('');
  const [summary, setSummary] = useState('');
  const [decisionInput, setDecisionInput] = useState('');
  const [decisions, setDecisions] = useState<string[]>([
    'برگزاری اردوی یک‌روزه کوهپیمایی در جمعه آینده',
    'شرکت هماهنگ اعضای حلقه در نماز جمعه این هفته',
  ]);
  const [challenges, setChallenges] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<string>(
    '/src/assets/images/salehin_hero_banner_1793894946018.jpg'
  );

  // Individual attendance roster for Sargorouh
  const [attendanceRoster, setAttendanceRoster] = useState<Record<string, boolean>>({
    'm-1': true,
    'm-2': true,
    'm-3': true,
    'm-4': true,
    'm-5': false,
    'm-6': true,
  });

  const toggleAttendance = (memberId: string) => {
    setAttendanceRoster((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }));
  };

  const presentCount = Object.values(attendanceRoster).filter(Boolean).length;
  const totalRosterCount = MOCK_CIRCLE_MEMBERS.length;

  const handleAddDecision = () => {
    if (decisionInput.trim()) {
      setDecisions([...decisions, decisionInput.trim()]);
      setDecisionInput('');
    }
  };

  const handleRemoveDecision = (index: number) => {
    setDecisions(decisions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainTopic.trim() || !summary.trim()) return;

    onSubmitReport({
      circleId: 'c-101',
      circleName: currentUser.circleName || 'حلقه نوجوانان شهید ابراهیم هادی',
      leaderId: currentUser.id,
      leaderName: currentUser.name,
      morabbiName: 'کربلایی مجتبی احمدی',
      baseName: currentUser.base,
      hozehName: currentUser.hozeh,
      nahiehName: currentUser.nahieh,
      ageGroup,
      meetingDate,
      sessionNumber: Number(sessionNumber),
      totalMembers: 18,
      presentCount: presentCount + 12, // scaled up for mock realism
      absentCount: Math.max(0, 18 - (presentCount + 12)),
      topicType,
      mainTopic,
      summary,
      decisions,
      challenges: challenges.trim() ? challenges.trim() : undefined,
      photoUrl: selectedPhoto,
    });

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
          <span>بازگشت به پیشخوان</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span>گزارش‌دهنده:</span>
          <span className="font-bold text-stone-900 bg-stone-100 px-2.5 py-1 rounded-md">
            {roleConfig.title} ({currentUser.name})
          </span>
        </div>
      </div>

      {/* Banner */}
      <div className={`p-6 sm:p-7 rounded-2xl text-white bg-gradient-to-br ${theme.bannerGradient} border ${theme.bannerBorder} shadow-lg relative overflow-hidden`}>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-black/30 border border-white/20 text-xs font-semibold">
            <FileCheck2 size={14} className={theme.accentText} />
            <span>سامانه رسمی نظارت و ثبت عملکرد جلسات صالحین</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            {currentUser.role === 'sargorouh'
              ? `ثبت گزارش جلسه شماره ${sessionNumber} - ${currentUser.circleName}`
              : currentUser.role === 'morabbi'
              ? `ثبت گزارش نظارت میدانی مربی در ${currentUser.base}`
              : `ثبت گزارش ارزیابی ستادی ${roleConfig.title}`}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300">
            اطلاعات ثبت‌شده پس از ارسال، در کارتابل ارزیابی مربی و سرمربی قرار گرفته و نمره کیفی آن در رتبه‌بندی پایگاه و حلقه لحاظ خواهد شد.
          </p>
        </div>
      </div>

      {/* Main Full Page Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Section 1: Basic Meeting Metadata */}
        <div>
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
            ۱. مشخصات زمانی و تشکیلاتی جلسه
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200/80">
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">تاریخ برگزاری جلسه</label>
              <input
                type="text"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:border-[#2D4A3E]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">شماره جلسه دوره</label>
              <input
                type="number"
                value={sessionNumber}
                onChange={(e) => setSessionNumber(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:border-[#2D4A3E] font-mono tabular-nums text-center"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">رده سنی مخاطب</label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value as CircleReport['ageGroup'])}
                className="w-full px-2.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:border-[#2D4A3E]"
              >
                <option value="نونهالان">نونهالان</option>
                <option value="نوجوانان">نوجوانان</option>
                <option value="جوانان">جوانان</option>
                <option value="میانسالان و پیشکسوتان">پیشکسوتان</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">محور موضوعی</label>
              <select
                value={topicType}
                onChange={(e) => setTopicType(e.target.value as CircleReport['topicType'])}
                className="w-full px-2.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:border-[#2D4A3E]"
              >
                <option value="تربیتی و اخلاقی">تربیتی و اخلاقی</option>
                <option value="معرفتی و احکام">معرفتی و احکام</option>
                <option value="بصیرتی و سیاسی">بصیرتی و سیاسی</option>
                <option value="مهارتی و ورزشی">مهارتی و ورزشی</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Individual Member Attendance Roster (For Sargorouh) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              ۲. حضور و غیاب الکترونیکی اعضای حلقه در جلسه
            </h3>
            <span className="text-xs font-mono font-bold text-[#2D4A3E]">
              {presentCount} حاضر از {totalRosterCount} عضو نمونه
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3.5 bg-stone-50 rounded-xl border border-stone-200/80">
            {MOCK_CIRCLE_MEMBERS.map((member) => {
              const isPresent = attendanceRoster[member.id] ?? true;
              return (
                <button
                  type="button"
                  key={member.id}
                  onClick={() => toggleAttendance(member.id)}
                  className={`p-2.5 rounded-lg border text-right transition-all flex items-center justify-between text-xs ${
                    isPresent
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                      : 'bg-rose-50 border-rose-200 text-rose-900 opacity-80'
                  }`}
                >
                  <div>
                    <span>{member.name}</span>
                    <span className="block text-[10px] text-stone-400 font-normal">{member.roleInCircle}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${isPresent ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}`}>
                    {isPresent ? 'حاضر' : 'غایب'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Topic and Detailed Summary */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            ۳. مباحث معرفتی و گزارش محتوایی
          </h3>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              موضوع اصلی مورد بحث جلسه <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={mainTopic}
              onChange={(e) => setMainTopic(e.target.value)}
              placeholder="مثال: رفاقت به سبک شهدا؛ الگوی دوستی ایمانی و تشکیلاتی"
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              مشروح مباحث و سوالات مطرح‌شده توسط اعضا <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="شرح نکات کلیدی مطرح شده، شبهات فکری پاسخ داده شده توسط سرگروه و میزان مشارکت بچه‌ها..."
              className="w-full px-3.5 py-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E] leading-relaxed"
            />
          </div>
        </div>

        {/* Section 4: Decisions & Challenges */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            ۴. مصوبات اجرایی و نیازمندی‌ها
          </h3>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              مصوبات و برنامه‌های توافق شده برای هفته آینده
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={decisionInput}
                onChange={(e) => setDecisionInput(e.target.value)}
                placeholder="عنوان برنامه (مثال: شرکت در مسابقه کتابخوانی)"
                className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
              />
              <button
                type="button"
                onClick={handleAddDecision}
                className="px-4 py-2 text-xs font-bold text-white bg-[#243E34] hover:bg-[#1A2E26] rounded-xl flex items-center gap-1 shadow-xs"
              >
                <Plus size={14} />
                <span>افزودن مصوبه</span>
              </button>
            </div>

            <div className="space-y-1.5">
              {decisions.map((dec, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-stone-50 rounded-lg text-xs text-stone-800 border border-stone-200/80"
                >
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-[#2D4A3E]" />
                    <span>{dec}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDecision(idx)}
                    className="text-stone-400 hover:text-red-500"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              چالش‌ها، نیازمندی‌ها یا درخواست از مربی و حوزه
            </label>
            <input
              type="text"
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              placeholder="مثال: نیاز به استخر یا سالن ورزشی / درخواست جزوه جدید"
              className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
            />
          </div>
        </div>

        {/* Section 5: Photo Verification */}
        <div>
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
            ۵. مستندات تصویری جلسه
          </h3>
          <div className="flex items-center gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div className="w-28 h-20 rounded-xl overflow-hidden border border-stone-300 relative shrink-0">
              <img
                src={selectedPhoto}
                alt="عکس جلسه حلقه"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs text-stone-600 space-y-1">
              <span className="font-bold text-stone-900 block">تصویر جلسه حلقه با موفقیت بارگذاری شد</span>
              <p className="text-[11px] text-stone-500">
                این مستند جهت تایید سلامت برگزاری جلسه به کارتابل ارزیابی مربی پایگاه و سرمربی حوزه ارسال می‌گردد.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
          >
            انصراف و بازگشت
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-bold text-white bg-[#1A3326] hover:bg-[#122219] rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95"
          >
            <FileCheck2 size={15} />
            <span>ارسال نهایی گزارش به کارتابل مربی و سرمربی</span>
          </button>
        </div>
      </form>
    </div>
  );
};
