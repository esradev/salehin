import React, { useState } from 'react';
import { Camera, CheckCircle2, FileCheck2, Image as ImageIcon, Plus, Trash2, X } from 'lucide-react';
import { CircleReport, UserProfile } from '../types';

interface ReportSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSubmitReport: (report: Omit<CircleReport, 'id' | 'createdAt' | 'status'>) => void;
}

export const ReportSubmissionModal: React.FC<ReportSubmissionModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSubmitReport,
}) => {
  const [meetingDate, setMeetingDate] = useState('۱۴۰۵/۰۸/۱۶');
  const [sessionNumber, setSessionNumber] = useState(25);
  const [ageGroup, setAgeGroup] = useState<CircleReport['ageGroup']>('نوجوانان');
  const [topicType, setTopicType] = useState<CircleReport['topicType']>('تربیتی و اخلاقی');
  const [mainTopic, setMainTopic] = useState('');
  const [totalMembers, setTotalMembers] = useState(18);
  const [presentCount, setPresentCount] = useState(16);
  const [summary, setSummary] = useState('');
  const [decisionInput, setDecisionInput] = useState('');
  const [decisions, setDecisions] = useState<string[]>([
    'برگزاری اردوی یک‌روزه بقعه متبرکه در جمعه آتی',
    'شرکت هماهنگ اعضای حلقه در نماز جمعه این هفته',
  ]);
  const [challenges, setChallenges] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<string>(
    new URL('../assets/images/salehin_hero_banner_1793894946018.jpg', import.meta.url).href
  );

  if (!isOpen) return null;

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
      totalMembers: Number(totalMembers),
      presentCount: Number(presentCount),
      absentCount: Math.max(0, Number(totalMembers) - Number(presentCount)),
      topicType,
      mainTopic,
      summary,
      decisions,
      challenges: challenges.trim() ? challenges.trim() : undefined,
      photoUrl: selectedPhoto,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#243E34] text-[#E5C365] flex items-center justify-center shadow-xs">
              <FileCheck2 size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">
                ثبت گزارش عملکرد جلسه حلقه صالحین
              </h2>
              <p className="text-xs text-stone-500">
                پایگاه {currentUser.base} - {currentUser.circleName || 'حلقه صالحین'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Top metadata grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-3.5 rounded-xl border border-stone-200/80">
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">تاریخ جلسه</label>
              <input
                type="text"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:border-[#2D4A3E]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">شماره جلسه</label>
              <input
                type="number"
                value={sessionNumber}
                onChange={(e) => setSessionNumber(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:border-[#2D4A3E]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">تعداد کل اعضا</label>
              <input
                type="number"
                value={totalMembers}
                onChange={(e) => setTotalMembers(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:border-[#2D4A3E]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">تعداد حاضرین</label>
              <input
                type="number"
                value={presentCount}
                onChange={(e) => setPresentCount(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:border-[#2D4A3E]"
              />
            </div>
          </div>

          {/* Age Group & Topic Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                رده سنی حلقه <span className="text-red-500">*</span>
              </label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value as CircleReport['ageGroup'])}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
              >
                <option value="نونهالان">نونهالان (زیر ۱۲ سال)</option>
                <option value="نوجوانان">نوجوانان (۱۲ تا ۱۷ سال)</option>
                <option value="جوانان">جوانان (۱۸ تا ۲۹ سال)</option>
                <option value="میانسالان و پیشکسوتان">میانسالان و پیشکسوتان</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                محور موضوعی جلسه <span className="text-red-500">*</span>
              </label>
              <select
                value={topicType}
                onChange={(e) => setTopicType(e.target.value as CircleReport['topicType'])}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
              >
                <option value="تربیتی و اخلاقی">تربیتی و اخلاقی (سیره شهدا، فضائل فردی)</option>
                <option value="معرفتی و احکام">معرفتی و احکام (عقاید، احکام کاربردی، قرآن)</option>
                <option value="بصیرتی و سیاسی">بصیرتی و سیاسی (سواد رسانه، مسائل روز)</option>
                <option value="مهارتی و ورزشی">مهارتی و ورزشی (ورزش، امداد، توانمندی فنی)</option>
              </select>
            </div>
          </div>

          {/* Main Topic Headline */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              موضوع اصلی مورد بحث جلسه <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={mainTopic}
              onChange={(e) => setMainTopic(e.target.value)}
              placeholder="مثال: جایگاه صبر و شکر در ناملایمات / بررسی سیره اخلاقی شهید چمران"
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
            />
          </div>

          {/* Discussion summary */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              مشروح مباحث مطرح شده و بازخورد اعضا <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="نکات کلیدی مطرح شده توسط سرگروه و مشارکت متربیان، شبهات پاسخ داده شده و تشویق‌های صورت گرفته..."
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E] leading-relaxed"
            />
          </div>

          {/* Decisions & Action items */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              مصوبات اجرایی و برنامه‌های توافق شده
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={decisionInput}
                onChange={(e) => setDecisionInput(e.target.value)}
                placeholder="عنوان تصمیم یا برنامه (مثال: تهیه کتابچه و توزیع میان اعضا)"
                className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
              />
              <button
                type="button"
                onClick={handleAddDecision}
                className="px-3 py-2 text-xs font-bold text-white bg-[#243E34] hover:bg-[#1A2E26] rounded-xl flex items-center gap-1"
              >
                <Plus size={14} />
                <span>افزودن</span>
              </button>
            </div>

            <div className="space-y-1.5">
              {decisions.map((dec, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-stone-50 rounded-lg text-xs text-stone-800 border border-stone-100"
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

          {/* Challenges / Needs */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              چالش‌ها، نیازمندی‌ها یا درخواست از مربی و حوزه
            </label>
            <input
              type="text"
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              placeholder="مثال: نیاز به استخر یا سالن ورزشی / درخواست کتابچه طرح درس جدید"
              className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
            />
          </div>

          {/* Photo attachment preview */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              تصویر مستند برگزاری جلسه حلقه
            </label>
            <div className="flex items-center gap-3">
              <div className="w-24 h-16 rounded-xl border border-stone-300 overflow-hidden relative group">
                <img
                  src={selectedPhoto}
                  alt="عکس مستند جلسه حلقه صالحین"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs text-stone-500">
                <span className="block font-medium text-stone-700">تصویر مستند جلسه بارگذاری شد</span>
                <span className="text-[11px] text-stone-400">عکس الصاق شده به پرونده ارزیابی حلقه</span>
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#243E34] hover:bg-[#1A2E26] rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <FileCheck2 size={14} />
              <span>ارسال نهایی گزارش جهت تایید و امتیازدهی</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
