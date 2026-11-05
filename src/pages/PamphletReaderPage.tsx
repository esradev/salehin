import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Download,
  FileText,
  HelpCircle,
  Share2,
} from 'lucide-react';
import { ROLE_THEMES } from '../theme/roleThemes';
import { Pamphlet, UserProfile } from '../types';

interface PamphletReaderPageProps {
  pamphlet: Pamphlet;
  currentUser: UserProfile;
  onBack: () => void;
}

export const PamphletReaderPage: React.FC<PamphletReaderPageProps> = ({
  pamphlet,
  currentUser,
  onBack,
}) => {
  const theme = ROLE_THEMES[currentUser.role];

  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const currentChapter = pamphlet.chapters[activeChapterIndex] || pamphlet.chapters[0];

  return (
    <div className="space-y-6 pb-16 text-right max-w-4xl mx-auto">
      {/* Top Breadcrumb & Controls */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 bg-white px-3 py-1.5 rounded-lg border border-stone-200 transition-colors shadow-xs"
        >
          <ArrowRight size={15} />
          <span>بازگشت به مرکز آموزش</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 hidden sm:inline">اندازه قلم:</span>
          <div className="flex items-center p-1 bg-stone-100 rounded-lg text-xs">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2.5 py-1 rounded-md transition-colors ${fontSize === 'normal' ? 'bg-white font-bold shadow-xs' : 'text-stone-600'}`}
            >
              استاندارد
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2.5 py-1 rounded-md transition-colors ${fontSize === 'large' ? 'bg-white font-bold shadow-xs' : 'text-stone-600'}`}
            >
              درشت
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2.5 py-1 rounded-md transition-colors ${fontSize === 'xlarge' ? 'bg-white font-bold shadow-xs' : 'text-stone-600'}`}
            >
              خیلی درشت
            </button>
          </div>
        </div>
      </div>

      {/* Book Cover and Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row gap-6 items-start">
        <div className="w-28 sm:w-36 h-40 sm:h-52 rounded-xl overflow-hidden border border-stone-200 shadow-md shrink-0 bg-stone-100">
          <img
            src={pamphlet.coverUrl}
            alt={pamphlet.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="font-bold text-[#1A3326] bg-[#1A3326]/10 px-2.5 py-0.5 rounded-md">
              {pamphlet.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{pamphlet.pages} صفحه</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{pamphlet.downloadsCount} دانلود ثبت‌شده</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug">
            {pamphlet.title}
          </h1>

          <p className="text-xs text-stone-500">
            تدوین و نگارش: <strong>{pamphlet.author}</strong> ({pamphlet.publishedDate})
          </p>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
            {pamphlet.description}
          </p>

          <div className="pt-2">
            <button
              onClick={() => alert(`دانلود نسخه چاپی PDF (${pamphlet.fileSize}) با موفقیت آغاز گردید.`)}
              className="px-4 py-2 text-xs font-bold text-white bg-[#1A3326] hover:bg-[#122219] rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <Download size={14} />
              <span>دریافت نسخه کامل PDF ({pamphlet.fileSize})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chapter Selection Bar */}
      <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-xs flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-stone-500 shrink-0 px-2">فهرست فصول:</span>
        {pamphlet.chapters.map((chap, idx) => (
          <button
            key={idx}
            onClick={() => setActiveChapterIndex(idx)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeChapterIndex === idx
                ? 'bg-[#1A3326] text-white font-bold shadow-xs'
                : 'bg-stone-50 text-stone-600 hover:text-stone-900 border border-stone-200'
            }`}
          >
            {chap.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Main Full Page Reading Surface */}
      <article className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="pb-4 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-[#1A3326]">
            {currentChapter.title}
          </h2>
          <span className="text-xs text-stone-400">
            فصل {activeChapterIndex + 1} از {pamphlet.chapters.length}
          </span>
        </div>

        {/* Prose Reading Text */}
        <div
          className={`text-stone-800 leading-loose space-y-5 transition-all ${
            fontSize === 'xlarge'
              ? 'text-lg sm:text-xl leading-relaxed'
              : fontSize === 'large'
              ? 'text-base sm:text-lg leading-relaxed'
              : 'text-sm sm:text-base leading-loose'
          }`}
        >
          <p>{currentChapter.excerpt}</p>

          <p>
            در سیره تربیتی شهدای والامقام، کار تشکیلاتی بر مبنای محبت، انضباط و صدق نیت شکل می‌گرفت. زمانی که نیت خالصانه باشد، کلمات سرگروه بر جان متربیان می‌نشیند و پیوند برادری ایمانی پدید می‌آید که تا سال‌ها مستحکم باقی می‌ماند.
          </p>

          <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200/80 text-stone-800 space-y-2">
            <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2">
              <HelpCircle size={16} className="text-[#8C6B13]" />
              <span>محور مباحثه و سوال کلیدی برای سرگروه‌ها در جلسه جمعه:</span>
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-stone-700">
              «چگونه می‌توانیم ارزش‌های اخلاقی مطرح در این درسنامه را در محیط مدرسه، دانشگاه و بازار کار جاری کنیم، به طوری که مردم طعم صداقت و خدمتگزاری یک بسیجی واقعی را بچشند؟»
            </p>
          </div>

          <p>
            امام خامنه‌ای (مدظله‌العالی) در دیدار با مربیان شجره طیبه صالحین فرمودند: «حلقه صالحین یعنی نشستن روی زمین صمیمیت، گوش دادن به سخنان جوانان، گره‌گشایی از شبهات و جهت دادن به استعدادهای پرشور آنان به سوی آرمان‌های الهی».
          </p>
        </div>

        {/* Chapter Nav Next/Prev */}
        <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
          <button
            disabled={activeChapterIndex === 0}
            onClick={() => setActiveChapterIndex((p) => Math.max(0, p - 1))}
            className="px-4 py-2 text-xs font-bold text-stone-600 disabled:opacity-30 rounded-xl hover:bg-stone-100"
          >
            ← فصل قبلی
          </button>

          {activeChapterIndex < pamphlet.chapters.length - 1 ? (
            <button
              onClick={() => setActiveChapterIndex((p) => p + 1)}
              className="px-5 py-2 text-xs font-bold text-white bg-[#1A3326] hover:bg-[#122219] rounded-xl shadow-xs"
            >
              مطالعه فصل بعدی →
            </button>
          ) : (
            <button
              onClick={onBack}
              className="px-5 py-2 text-xs font-bold text-white bg-[#C59B27] rounded-xl shadow-xs"
            >
              اتمام مطالعه و بازگشت
            </button>
          )}
        </div>
      </article>
    </div>
  );
};
