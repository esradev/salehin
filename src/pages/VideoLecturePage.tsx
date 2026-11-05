import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Eye,
  GraduationCap,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { ROLE_THEMES } from '../theme/roleThemes';
import { UserProfile, VideoLesson } from '../types';

interface VideoLecturePageProps {
  video: VideoLesson;
  currentUser: UserProfile;
  onBack: () => void;
  onOpenQuiz: (quizId: string) => void;
}

export const VideoLecturePage: React.FC<VideoLecturePageProps> = ({
  video,
  currentUser,
  onBack,
  onOpenQuiz,
}) => {
  const theme = ROLE_THEMES[currentUser.role];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('۰۶:۱۵');
  const [playbackProgress, setPlaybackProgress] = useState(25);

  const handleJumpChapter = (timeStr: string, index: number) => {
    setCurrentTime(timeStr);
    setPlaybackProgress(((index + 1) / (video.chapters.length + 1)) * 100);
    setIsPlaying(true);
  };

  return (
    <div className="space-y-6 pb-16 text-right max-w-4xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 bg-white px-3 py-1.5 rounded-lg border border-stone-200 transition-colors shadow-xs"
        >
          <ArrowRight size={15} />
          <span>بازگشت به مرکز آموزش</span>
        </button>

        <span className="text-xs text-stone-500 font-mono tabular-nums">
          کلاس ویدیویی · {video.category} · مدت: {video.duration}
        </span>
      </div>

      {/* Main Video Theater Player (Full Width on page) */}
      <div className="bg-stone-950 rounded-2xl overflow-hidden shadow-2xl border border-stone-800 relative">
        <div className="relative aspect-video flex items-center justify-center">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            referrerPolicy="no-referrer"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-75"
          />

          {/* Central Play/Pause Toggle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 rounded-full bg-[#E5C365] text-[#162921] flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform"
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} className="translate-x-1 fill-current" />}
            </button>
          </div>

          {/* Control bar */}
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-[#E5C365] transition-colors"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <Volume2 size={18} className="text-stone-300" />
              <span className="font-mono text-xs">{currentTime} / {video.duration}</span>
            </div>

            <div className="flex-1 min-w-0 mx-2 sm:mx-6">
              <div className="w-full h-1.5 bg-stone-700 rounded-full cursor-pointer overflow-hidden">
                <div
                  className="h-full bg-[#E5C365] transition-all"
                  style={{ width: `${playbackProgress}%` }}
                />
              </div>
            </div>

            <Maximize2 size={18} className="text-stone-300" />
          </div>
        </div>
      </div>

      {/* Video Lecture Details & Outline (Full Page) */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-bold text-[#1A3326] bg-[#1A3326]/10 px-2.5 py-0.5 rounded-md">
              {video.category}
            </span>
            <span className="font-mono tabular-nums">{video.views} بازدید ثبت‌شده</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-stone-900 mt-2 leading-snug">
            {video.title}
          </h1>

          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            مدرس: <strong className="text-stone-800">{video.speaker}</strong> ({video.speakerTitle})
          </p>
        </div>

        {/* Abstract */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-stone-400 uppercase">خلاصه جلسه و محورهای اصلی:</h3>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-100">
            {video.summary}
          </p>
        </div>

        {/* Chapters list */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-stone-400 uppercase">سرفصل‌های زمانی این جلسه (جهت پرش سریع):</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {video.chapters.map((chap, idx) => (
              <button
                key={idx}
                onClick={() => handleJumpChapter(chap.time, idx)}
                className="p-3 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200/80 text-xs transition-colors flex items-center justify-between group text-right"
              >
                <span className="font-medium text-stone-800 group-hover:text-stone-900">{chap.title}</span>
                <span className="font-mono text-stone-500 bg-white px-2.5 py-0.5 rounded-md border border-stone-200 shrink-0 mr-2">
                  {chap.time}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Key takeaways */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-stone-400 uppercase">نکات راهبردی مربی برای پیاده‌سازی در حلقه:</h3>
          <div className="space-y-2">
            {video.keyPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-800 bg-stone-50 p-3 rounded-xl border border-stone-100">
                <CheckCircle2 size={16} className="text-[#1A3326] shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA to take related quiz */}
        <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF8F5] p-5 rounded-xl border border-[#C59B27]/30">
          <div>
            <h4 className="text-sm font-bold text-stone-900">سنجش آموخته‌های این جلسه تصویری</h4>
            <p className="text-xs text-stone-500 mt-0.5">با شرکت در کوییز تعاملی این دوره، امتیاز شایستگی خود را دریافت فرمایید.</p>
          </div>

          <button
            onClick={() => onOpenQuiz('quiz-' + video.id.replace('vid-', ''))}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#1A3326] hover:bg-[#122219] rounded-xl shadow-md transition-all whitespace-nowrap active:scale-95"
          >
            ورود به آزمون این دوره آموزشی →
          </button>
        </div>
      </div>
    </div>
  );
};
