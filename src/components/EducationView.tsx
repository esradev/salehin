import React, { useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  Clock,
  Download,
  Filter,
  GraduationCap,
  HelpCircle,
  Play,
  Search,
  Sparkles,
  Trophy,
  Video,
} from 'lucide-react';
import { MOCK_PAMPHLETS, MOCK_QUIZZES, MOCK_VIDEOS } from '../data/mockData';
import { ROLE_THEMES } from '../theme/roleThemes';
import { Pamphlet, QuizItem, UserProfile, VideoLesson } from '../types';

interface EducationViewProps {
  currentUser: UserProfile;
  onOpenQuizPage: (quiz: QuizItem) => void;
  onOpenVideoPage: (video: VideoLesson) => void;
  onOpenPamphletPage: (pamphlet: Pamphlet) => void;
}

export const EducationView: React.FC<EducationViewProps> = ({
  currentUser,
  onOpenQuizPage,
  onOpenVideoPage,
  onOpenPamphletPage,
}) => {
  const [activeTab, setActiveTab] = useState<'quizzes' | 'videos' | 'pamphlets'>('quizzes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const theme = ROLE_THEMES[currentUser.role];

  // Filter quizzes
  const filteredQuizzes = useMemo(() => {
    return MOCK_QUIZZES.filter((q) => {
      const matchSearch =
        q.title.includes(searchQuery) ||
        q.category.includes(searchQuery) ||
        q.targetAudience.includes(searchQuery);
      const matchCat = selectedCategory === 'all' || q.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [searchQuery, selectedCategory]);

  // Filter videos
  const filteredVideos = useMemo(() => {
    return MOCK_VIDEOS.filter((v) => {
      const matchSearch =
        v.title.includes(searchQuery) ||
        v.speaker.includes(searchQuery) ||
        v.category.includes(searchQuery) ||
        v.summary.includes(searchQuery);
      const matchCat = selectedCategory === 'all' || v.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [searchQuery, selectedCategory]);

  // Filter pamphlets
  const filteredPamphlets = useMemo(() => {
    return MOCK_PAMPHLETS.filter((p) => {
      const matchSearch =
        p.title.includes(searchQuery) ||
        p.author.includes(searchQuery) ||
        p.category.includes(searchQuery) ||
        p.description.includes(searchQuery);
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [searchQuery, selectedCategory]);

  // Categories list based on active tab
  const categories = useMemo(() => {
    if (activeTab === 'quizzes') {
      return ['all', ...Array.from(new Set(MOCK_QUIZZES.map((q) => q.category)))];
    }
    if (activeTab === 'videos') {
      return ['all', ...Array.from(new Set(MOCK_VIDEOS.map((v) => v.category)))];
    }
    return ['all', ...Array.from(new Set(MOCK_PAMPHLETS.map((p) => p.category)))];
  }, [activeTab]);

  return (
    <div className="space-y-6 pb-12 text-right">
      {/* Top Banner with Role Theme */}
      <div className={`p-6 sm:p-8 rounded-2xl text-white bg-gradient-to-r ${theme.bannerGradient} border ${theme.bannerBorder} shadow-lg relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E5C365_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/40 border border-white/20 text-xs font-semibold">
              <GraduationCap size={14} className={theme.accentText} />
              <span>مرکز جامع آموزش، آزمون‌های برخط و توانمندسازی شجره طیبه</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              دانشنامه و مرکز یادگیری تعاملی صالحین
            </h1>
            <p className="text-xs sm:text-sm text-stone-300">
              دسترسی به بیش از ۱۰ کوییز تعاملی، ۱۰ دوره کلاس تصویری اساتید کشوری و ۱۰ جلد جزوات درسنامه‌های مصوب تربیتی
            </p>
          </div>

          <div className="p-3.5 bg-black/30 rounded-xl border border-white/10 text-xs text-stone-200 shrink-0">
            <span className="text-stone-300 block text-[11px]">امتیازات آموزشی پرونده شما:</span>
            <span className="font-bold text-sm font-mono tabular-nums" style={{ color: theme.accentHex }}>
              {currentUser.points} امتیاز شایستگی
            </span>
          </div>
        </div>
      </div>

      {/* Segmented Control for 3 learning modes + Counts */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1.5 bg-stone-100 rounded-xl border border-stone-200">
          <button
            onClick={() => {
              setActiveTab('quizzes');
              setSelectedCategory('all');
            }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'quizzes'
                ? 'bg-[#1A3326] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <HelpCircle size={15} />
            <span>کوییزهای تعاملی</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">
              {MOCK_QUIZZES.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('videos');
              setSelectedCategory('all');
            }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'videos'
                ? 'bg-[#1A3326] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Video size={15} />
            <span>کلاس‌های تصویری</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">
              {MOCK_VIDEOS.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('pamphlets');
              setSelectedCategory('all');
            }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'pamphlets'
                ? 'bg-[#1A3326] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen size={15} />
            <span>جزوات و درسنامه‌ها</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">
              {MOCK_PAMPHLETS.length}
            </span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در عناوین و سرفصل‌ها..."
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#1A3326]/20 focus:border-[#1A3326] text-stone-800 placeholder-stone-400"
          />
          <Search size={15} className="absolute left-3 top-2.5 text-stone-400" />
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-stone-400 text-xs shrink-0 pl-1">موضوع:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-[#1A3326] text-white font-bold shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat === 'all' ? 'همه موضوعات' : cat}
          </button>
        ))}
      </div>

      {/* TAB 1: QUIZZES */}
      {activeTab === 'quizzes' && (
        <div className="space-y-4">
          {filteredQuizzes.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs">
              موردی با عنوان یا موضوع جستجو شده در بخش کوییزها یافت نشد.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:border-[#1A3326] transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="font-bold text-[#1A3326] bg-stone-100 px-2.5 py-0.5 rounded-md">
                        {quiz.category}
                      </span>
                      <span className="text-amber-800 font-bold bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/60">
                        +{quiz.rewardPoints} نمره جایزه
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 leading-snug">
                      {quiz.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      مخاطب دوره: <strong>{quiz.targetAudience}</strong>. شامل {quiz.questionsCount} پرسش چهارگزینه‌ای مفهومی، زمان استاندارد {quiz.durationMinutes} دقیقه و کارنامه آنی.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-mono tabular-nums">
                        <Clock size={14} className="text-stone-400" />
                        <span>{quiz.durationMinutes} دقیقه</span>
                      </span>
                      <span className="flex items-center gap-1 font-mono tabular-nums">
                        <HelpCircle size={14} className="text-stone-400" />
                        <span>{quiz.questionsCount} سوال</span>
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenQuizPage(quiz)}
                      className="px-5 py-2.5 text-xs font-bold text-white bg-[#1A3326] hover:bg-[#122219] rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      <span>ورود به صفحه آزمون →</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: VIDEOS */}
      {activeTab === 'videos' && (
        <div className="space-y-4">
          {filteredVideos.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs">
              کلاسی با مشخصات جستجو شده یافت نشد.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredVideos.map((vid) => (
                <div
                  key={vid.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-[#1A3326] transition-all flex flex-col justify-between"
                >
                  <div
                    className="relative aspect-video bg-stone-900 cursor-pointer group"
                    onClick={() => onOpenVideoPage(vid)}
                  >
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#E5C365] text-[#162921] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play size={24} className="fill-current translate-x-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[11px] font-mono px-2 py-0.5 rounded">
                      {vid.duration}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="text-[#1A3326] font-bold">{vid.category}</span>
                      <span className="font-mono tabular-nums">{vid.views} بازدید ثبت‌شده</span>
                    </div>

                    <h3 className="text-sm font-bold text-stone-900 leading-snug">
                      {vid.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {vid.summary}
                    </p>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-stone-500">مدرس: <strong>{vid.speaker}</strong></span>
                      <button
                        onClick={() => onOpenVideoPage(vid)}
                        className="px-4 py-2 text-xs font-bold text-white bg-[#1A3326] hover:bg-[#122219] rounded-xl transition-all shadow-xs"
                      >
                        ورود به صفحه کلاس تصویری →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PAMPHLETS */}
      {activeTab === 'pamphlets' && (
        <div className="space-y-4">
          {filteredPamphlets.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs">
              جزوه یا درسنامه‌ای با عنوان جستجو شده یافت نشد.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPamphlets.map((pam) => (
                <div
                  key={pam.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-[#1A3326] transition-all flex flex-col sm:flex-row gap-5 justify-between"
                >
                  <div className="w-full sm:w-32 h-44 rounded-xl overflow-hidden border border-stone-200 shrink-0 bg-stone-100 shadow-inner">
                    <img
                      src={pam.coverUrl}
                      alt={pam.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-[11px] font-bold text-amber-800 block mb-1">
                        {pam.category} · {pam.pages} صفحه
                      </span>
                      <h3 className="text-sm font-bold text-stone-900 leading-snug">
                        {pam.title}
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-1">
                        تدوین: {pam.author}
                      </p>
                      <p className="text-xs text-stone-600 line-clamp-3 mt-2 leading-relaxed">
                        {pam.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] text-stone-400 font-mono tabular-nums">
                        {pam.downloadsCount} دانلود
                      </span>
                      <button
                        onClick={() => onOpenPamphletPage(pam)}
                        className="px-4 py-2 text-xs font-bold text-white bg-[#1A3326] hover:bg-[#122219] rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <BookOpen size={14} />
                        <span>ورود به صفحه مطالعه →</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
