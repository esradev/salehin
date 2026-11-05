import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Award,
  Calendar,
  CheckCircle2,
  Crown,
  FileCheck2,
  Filter,
  GraduationCap,
  Medal,
  Minus,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import { CircleRankingItem, UserProfile } from '../types';

interface RankingViewProps {
  currentUser: UserProfile;
  rankings: CircleRankingItem[];
}

export const RankingView: React.FC<RankingViewProps> = ({ currentUser, rankings }) => {
  const [selectedAgeFilter, setSelectedAgeFilter] = useState<string>('همه');
  const [selectedHozehFilter, setSelectedHozehFilter] = useState<string>('همه');

  const filteredRankings = rankings.filter((item) => {
    if (selectedAgeFilter !== 'همه' && item.ageGroup !== selectedAgeFilter) return false;
    if (selectedHozehFilter !== 'همه' && !item.hozehName.includes(selectedHozehFilter)) return false;
    return true;
  });

  const topThree = filteredRankings.slice(0, 3);

  return (
    <div className="space-y-6 pb-12 text-right">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#243E34] via-[#2D4A3E] to-[#1C332A] text-white p-6 rounded-2xl shadow-md border border-[#3E6554] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E5C365_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#13241D]/80 border border-[#C59B27]/30 text-[#E5C365] text-xs font-semibold">
              <Trophy size={14} />
              <span>جدول ارزیابی و رتبه‌بندی جامع حلقات شجره طیبه صالحین</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              رتبه‌بندی عملکرد حلقات و پایگاه‌های نمونه
            </h1>
            <p className="text-xs sm:text-sm text-stone-300">
              ارزیابی بر مبنای نظم گزارش‌دهی، حضور و غیاب مستمر، نمرات کوییزهای متربیان و فعالیت‌های میدانی
            </p>
          </div>

          <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-xs text-stone-200">
            <span className="text-stone-300 block text-[11px]">موقعیت حلقه شما:</span>
            <span className="font-bold text-[#E5C365] text-sm block">
              رتبه ۲ در حوزه ۲۱۵ (نشان زرین)
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-700">
          <Filter size={15} className="text-[#2D4A3E]" />
          <span>فیلتر رده سنی:</span>
          <div className="flex items-center gap-1 overflow-x-auto">
            {['همه', 'نونهالان', 'نوجوانان', 'جوانان', 'میانسالان'].map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAgeFilter(age)}
                className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedAgeFilter === age
                    ? 'bg-[#2D4A3E] text-white font-bold'
                    : 'text-stone-600 hover:text-stone-900 bg-stone-100'
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500 font-medium">حوزه:</span>
          <select
            value={selectedHozehFilter}
            onChange={(e) => setSelectedHozehFilter(e.target.value)}
            className="px-2.5 py-1 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-700 font-medium"
          >
            <option value="همه">تمامی حوزه‌های ناحیه ابوذر</option>
            <option value="۲۱۵">حوزه ۲۱۵ ایثار</option>
            <option value="۲۱۷">حوزه ۲۱۷ رجایی</option>
            <option value="۲۱۹">حوزه ۲۱۹ فتح</option>
          </select>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      {topThree.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Rank 2 (Silver) */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs relative flex flex-col justify-between order-2 md:order-1 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 border-2 border-stone-300 text-stone-600 flex items-center justify-center mx-auto text-lg font-black font-mono shadow-inner">
                ۲
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-full">
                <Medal size={13} className="text-stone-500" />
                <span>نشان سیمین رتبه دوم</span>
              </div>
              <h3 className="font-bold text-stone-900 text-sm">{topThree[1].circleName}</h3>
              <p className="text-xs text-stone-500">
                {topThree[1].baseName} · {topThree[1].leaderName}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-around text-xs">
              <div>
                <span className="text-[10px] text-stone-400 block">امتیاز کل</span>
                <span className="font-bold text-stone-900 font-mono tabular-nums text-sm">
                  {topThree[1].totalScore}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block">درصد حضور</span>
                <span className="font-bold text-emerald-700 font-mono tabular-nums text-sm">
                  {topThree[1].attendanceRate}٪
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block">آزمون‌ها</span>
                <span className="font-bold text-[#C59B27] font-mono tabular-nums text-sm">
                  {topThree[1].quizAverage}
                </span>
              </div>
            </div>
          </div>

          {/* Rank 1 (Gold) */}
          <div className="bg-gradient-to-b from-[#FAF6EA] to-white rounded-2xl border-2 border-[#C59B27] p-6 shadow-md relative flex flex-col justify-between order-1 md:order-2 text-center -translate-y-1">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C59B27] text-white px-3 py-0.5 rounded-full text-xs font-bold shadow-xs flex items-center gap-1">
              <Crown size={14} />
              <span>پیشتاز صالحین</span>
            </div>

            <div className="space-y-3 mt-2">
              <div className="w-14 h-14 rounded-full bg-[#FAF0D4] border-2 border-[#C59B27] text-[#8C6B13] flex items-center justify-center mx-auto text-xl font-black font-mono shadow-sm">
                ۱
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8C6B13] bg-[#FAF0D4] px-2.5 py-0.5 rounded-full">
                <Sparkles size={13} />
                <span>نشان زرین رتبه اول ناحیه</span>
              </div>
              <h3 className="font-bold text-stone-900 text-base">{topThree[0].circleName}</h3>
              <p className="text-xs text-stone-600">
                {topThree[0].baseName} · سرگروه: {topThree[0].leaderName}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-around text-xs">
              <div>
                <span className="text-[10px] text-stone-500 block">امتیاز کل</span>
                <span className="font-extrabold text-[#8C6B13] font-mono tabular-nums text-base">
                  {topThree[0].totalScore}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 block">درصد حضور</span>
                <span className="font-bold text-emerald-800 font-mono tabular-nums text-base">
                  {topThree[0].attendanceRate}٪
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 block">آزمون‌ها</span>
                <span className="font-bold text-[#8C6B13] font-mono tabular-nums text-base">
                  {topThree[0].quizAverage}
                </span>
              </div>
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs relative flex flex-col justify-between order-3 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-50 border-2 border-amber-300 text-amber-800 flex items-center justify-center mx-auto text-lg font-black font-mono shadow-inner">
                ۳
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                <Medal size={13} className="text-amber-700" />
                <span>نشان برنز رتبه سوم</span>
              </div>
              <h3 className="font-bold text-stone-900 text-sm">{topThree[2].circleName}</h3>
              <p className="text-xs text-stone-500">
                {topThree[2].baseName} · {topThree[2].leaderName}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-around text-xs">
              <div>
                <span className="text-[10px] text-stone-400 block">امتیاز کل</span>
                <span className="font-bold text-stone-900 font-mono tabular-nums text-sm">
                  {topThree[2].totalScore}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block">درصد حضور</span>
                <span className="font-bold text-emerald-700 font-mono tabular-nums text-sm">
                  {topThree[2].attendanceRate}٪
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block">آزمون‌ها</span>
                <span className="font-bold text-amber-800 font-mono tabular-nums text-sm">
                  {topThree[2].quizAverage}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive Leaderboard Table with Tabular Numbers */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <Award size={18} className="text-[#2D4A3E]" />
            <span>جدول رتبه‌بندی کامل حلقات فعال</span>
          </h2>
          <span className="text-xs text-stone-500 font-mono tabular-nums">
            {filteredRankings.length} حلقه ثبت‌شده
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                <th className="py-3 px-4 w-16 text-center">رتبه</th>
                <th className="py-3 px-4">نام حلقه صالحین</th>
                <th className="py-3 px-4">سرگروه</th>
                <th className="py-3 px-4">پایگاه و حوزه</th>
                <th className="py-3 px-4 text-center">جلسات</th>
                <th className="py-3 px-4 text-center">میانگین حضور</th>
                <th className="py-3 px-4 text-center">نمره آزمون‌ها</th>
                <th className="py-3 px-4 text-center">امتیاز کل</th>
                <th className="py-3 px-4 text-center">سطح نشان</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredRankings.map((row) => {
                const isUserCircle = row.circleName.includes('شهید ابراهیم هادی');

                return (
                  <tr
                    key={row.id}
                    className={`hover:bg-stone-50/80 transition-colors ${
                      isUserCircle ? 'bg-amber-50/50 font-medium' : ''
                    }`}
                  >
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="font-mono font-bold text-stone-900 text-sm">
                          {row.rank}
                        </span>
                        {row.rank < row.previousRank ? (
                          <ArrowUp size={12} className="text-emerald-600" />
                        ) : row.rank > row.previousRank ? (
                          <ArrowDown size={12} className="text-rose-600" />
                        ) : (
                          <Minus size={12} className="text-stone-300" />
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900">{row.circleName}</div>
                      <span className="text-[10px] text-stone-400">{row.ageGroup}</span>
                    </td>

                    <td className="py-3 px-4 text-stone-700 font-medium">
                      {row.leaderName}
                    </td>

                    <td className="py-3 px-4 text-stone-600">
                      <div>{row.baseName}</div>
                      <span className="text-[10px] text-stone-400">{row.hozehName}</span>
                    </td>

                    <td className="py-3 px-4 text-center font-mono tabular-nums font-medium text-stone-800">
                      {row.reportCount}
                    </td>

                    <td className="py-3 px-4 text-center font-mono tabular-nums font-bold text-emerald-700">
                      {row.attendanceRate}٪
                    </td>

                    <td className="py-3 px-4 text-center font-mono tabular-nums text-stone-700">
                      {row.quizAverage}
                    </td>

                    <td className="py-3 px-4 text-center font-mono tabular-nums font-extrabold text-[#2D4A3E] text-sm">
                      {row.totalScore}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 text-[11px] font-bold rounded-md ${
                          row.badgeLevel === 'زرین'
                            ? 'bg-[#FAF0D4] text-[#8C6B13]'
                            : row.badgeLevel === 'سیمین'
                            ? 'bg-stone-200 text-stone-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {row.badgeLevel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scoring Rubric Transparency Card */}
      <div className="bg-[#FBF9F5] p-5 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-2">
        <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
          <CheckCircle2 size={16} className="text-[#2D4A3E]" />
          <span>فرمول و ضوابط رسمی ارزیابی و رتبه‌بندی حلقات شجره طیبه صالحین</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3 bg-white rounded-xl border border-stone-200/80">
            <span className="font-bold text-[#2D4A3E] block mb-1">۳۰٪ نظم گزارش‌دهی</span>
            <p className="text-[11px] text-stone-500">
              ثبت به موقع گزارش جلسات هفتگی تا پایان مهلت مقرر با تصاویر مستند.
            </p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200/80">
            <span className="font-bold text-[#2D4A3E] block mb-1">۳۰٪ حضور و غیاب</span>
            <p className="text-[11px] text-stone-500">
              میانگین حضور اعضا و مشارکت فعال در برنامه‌های هفتگی مسجد.
            </p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200/80">
            <span className="font-bold text-[#2D4A3E] block mb-1">۲۰٪ کوییزهای تعاملی</span>
            <p className="text-[11px] text-stone-500">
              نمرات کسب‌شده متربیان در آزمون‌های برخط دروس معارف و بصیرت.
            </p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200/80">
            <span className="font-bold text-[#2D4A3E] block mb-1">۲۰٪ فعالیت میدانی و اردو</span>
            <p className="text-[11px] text-stone-500">
              حضور در نماز جمعه، اردوهای تربیتی، مسابقات ورزشی و پویش‌های محله.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
