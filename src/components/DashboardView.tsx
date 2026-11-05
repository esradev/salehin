import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  GraduationCap,
  Heart,
  HelpCircle,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Network,
  Phone,
  Pin,
  Play,
  PlusCircle,
  Search,
  Server,
  Share2,
  Shield,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserCheck,
  UserPlus,
  Users,
  Video,
} from 'lucide-react';
import { MOCK_PAMPHLETS, MOCK_QUIZZES, MOCK_VIDEOS, ROLES_CONFIG } from '../data/mockData';
import {
  Announcement,
  CircleRankingItem,
  CircleReport,
  PersonnelUser,
  UserProfile,
} from '../types';

interface DashboardViewProps {
  currentUser: UserProfile;
  announcements: Announcement[];
  reports: CircleReport[];
  rankings: CircleRankingItem[];
  personnelList: PersonnelUser[];
  onNavigateTab: (tab: string) => void;
  onOpenPublishModal: () => void;
  onOpenReportModal: () => void;
  onOpenQuiz: (quizId: string) => void;
  onOpenPamphlet: (pamphletId: string) => void;
  onLikeAnnouncement: (id: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  announcements,
  reports,
  rankings,
  personnelList,
  onNavigateTab,
  onOpenPublishModal,
  onOpenReportModal,
  onOpenQuiz,
  onOpenPamphlet,
  onLikeAnnouncement,
}) => {
  const roleConfig = ROLES_CONFIG[currentUser.role];
  const pendingReportsCount = reports.filter((r) => r.status === 'pending').length;

  // -------------------------------------------------------------
  // 1. ADMIN DASHBOARD (کنترل و مانیتورینگ کلان کشوری)
  // -------------------------------------------------------------
  if (currentUser.role === 'admin') {
    return (
      <div className="space-y-6 pb-12 text-right">
        {/* Admin Grand Header */}
        <div className="bg-gradient-to-br from-[#12221B] via-[#1E352B] to-[#2B493C] text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-[#3E6554] relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 rounded-full border border-[#C59B27]/40 text-[#E5C365] text-xs font-bold">
                <ShieldCheck size={15} />
                <span>مرکز مانیتورینگ و کنترل کلان سازمان بسیج مستضعفین</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                میز فرماندهی و دیده‌بان سراسری صالحین
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                ادمین کل سامانه: جناب آقای {currentUser.name}. دسترسی نامحدود به مدیریت کلیه نواحی، انتصابات سراسری، پایش گزارشات و صدور ابلاغیه‌های کشوری.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              <button
                onClick={onOpenPublishModal}
                className="px-4 py-2.5 bg-[#E5C365] hover:bg-[#F3D580] text-[#162921] rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
              >
                <PlusCircle size={16} />
                <span>ابلاغیه سراسری به کل کشور</span>
              </button>
              <button
                onClick={() => onNavigateTab('personnel')}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <Users size={16} />
                <span>مدیریت ساختار و کاربران</span>
              </button>
            </div>
          </div>
        </div>

        {/* Macro KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">کل حلقات ثبت‌شده کشور</span>
            <div className="text-2xl font-black text-stone-900 font-mono tabular-nums">۴۲,۵۸۰</div>
            <span className="text-[11px] text-emerald-700 font-medium">در ۵۴۰ ناحیه مقاومت</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">جلسات برگزارشده این ماه</span>
            <div className="text-2xl font-black text-stone-900 font-mono tabular-nums">۱۳۸,۲۰۰</div>
            <span className="text-[11px] text-emerald-700 font-medium">۹۴.۲٪ ثبت آنلاین</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">کل کادر و مسئولین ثبت‌شده</span>
            <div className="text-2xl font-black text-stone-900 font-mono tabular-nums font-mono">
              {personnelList.length + 1250}
            </div>
            <span className="text-[11px] text-stone-500">استادیاران، مربیان و سرگروه‌ها</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">گزارشات در انتظار بررسی کل</span>
            <div className="text-2xl font-black text-amber-600 font-mono tabular-nums">{pendingReportsCount}</div>
            <button
              onClick={() => onNavigateTab('reports')}
              className="text-[11px] text-[#2D4A3E] font-bold hover:underline"
            >
              نظارت بر کارتابل‌ها →
            </button>
          </div>
        </div>

        {/* Admin Operational Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Cpu size={16} className="text-[#2D4A3E]" />
                  <span>پایش سلامت و وضعیت عملکرد نواحی استان تهران</span>
                </h2>
                <span className="text-xs text-stone-500 font-mono tabular-nums">آبان ۱۴۰۵</span>
              </div>

              <div className="divide-y divide-stone-100 text-xs">
                {[
                  { name: 'ناحیه مقاومت ابوذر', hozehs: 6, bases: 48, circles: 124, status: 'عالی (نشان زرین)' },
                  { name: 'ناحیه حبیب بن مظاهر', hozehs: 5, bases: 42, circles: 110, status: 'خوب' },
                  { name: 'ناحیه مقداد', hozehs: 7, bases: 55, circles: 145, status: 'بسیار فعال' },
                  { name: 'ناحیه مالک اشتر', hozehs: 6, bases: 50, circles: 130, status: 'عالی' },
                ].map((dist, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between">
                    <div>
                      <strong className="text-stone-900 text-xs">{dist.name}</strong>
                      <span className="text-[11px] text-stone-400 block">
                        {dist.hozehs} حوزه · {dist.bases} پایگاه · {dist.circles} حلقه فعال
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {dist.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions for Admin */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => onNavigateTab('personnel')}
                className="p-4 bg-white rounded-xl border border-stone-200 hover:border-stone-300 text-right transition-all group"
              >
                <UserCheck size={18} className="text-[#2D4A3E] mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-xs font-bold text-stone-900">مدیریت احکام مسئولین</h4>
                <p className="text-[11px] text-stone-500 mt-1">افزودن و انتصاب مسئولین نواحی و حوزه‌ها</p>
              </button>

              <button
                onClick={() => onNavigateTab('reports')}
                className="p-4 bg-white rounded-xl border border-stone-200 hover:border-stone-300 text-right transition-all group"
              >
                <FileCheck2 size={18} className="text-[#C59B27] mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-xs font-bold text-stone-900">بازرسی کل گزارشات</h4>
                <p className="text-[11px] text-stone-500 mt-1">رصد گزارشات و نمرات کیفی سرگروه‌ها</p>
              </button>

              <button
                onClick={() => onNavigateTab('education')}
                className="p-4 bg-white rounded-xl border border-stone-200 hover:border-stone-300 text-right transition-all group"
              >
                <BookOpen size={18} className="text-[#2D4A3E] mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-xs font-bold text-stone-900">سیاست‌گذاری درسی</h4>
                <p className="text-[11px] text-stone-500 mt-1">مدیریت آزمون‌ها و جزوات کشوری</p>
              </button>
            </div>
          </div>

          {/* Right column: Recent Global Directives */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-stone-900 flex items-center justify-between">
              <span>ابلاغیه‌های فعال سیستم</span>
              <span className="text-xs text-stone-400 font-mono tabular-nums">{announcements.length} مورد</span>
            </h3>

            <div className="space-y-3">
              {announcements.slice(0, 3).map((a) => (
                <div key={a.id} className="p-3 bg-stone-50 rounded-lg text-xs space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-stone-500">
                    <span className="font-bold text-[#2D4A3E]">{a.authorRoleTitle}</span>
                    <span>{a.publishedAt}</span>
                  </div>
                  <h4 className="font-bold text-stone-900 line-clamp-1">{a.title}</h4>
                  <p className="text-[11px] text-stone-600 line-clamp-2">{a.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. مسئول تعلیم و تربیت ناحیه (District Education & Upbringing Officer)
  // -------------------------------------------------------------
  if (currentUser.role === 'nahieh_officer') {
    return (
      <div className="space-y-6 pb-12 text-right">
        {/* District Commander Banner */}
        <div className="bg-gradient-to-br from-[#1E352B] via-[#243E34] to-[#2E4E42] text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-[#3E6554]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/30 rounded-full border border-[#C59B27]/30 text-[#E5C365] text-xs font-semibold">
                <Shield size={14} />
                <span>فرماندهی قرارگاه تعلیم و تربیت {currentUser.nahieh}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                داشبورد مدیریتی مسئول تعلیم و تربیت ناحیه
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                مسئول ارجمند: {currentUser.name}. شما صلاحیت کامل سازمانی جهت <strong>انتصاب و افزودن استادیاران، مسئولین حوزه‌ها، سرمربیان، مربیان پایگاه‌ها، سرگروه‌ها و متربیان</strong> در سطح کل ناحیه را دارا می‌باشید.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 w-full lg:w-auto">
              <button
                onClick={() => onNavigateTab('personnel')}
                className="px-4 py-2.5 bg-[#E5C365] hover:bg-[#F3D580] text-[#162921] rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
              >
                <UserPlus size={16} />
                <span>افزودن و انتصاب اعضای زیرمجموعه</span>
              </button>
              <button
                onClick={onOpenPublishModal}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <PlusCircle size={16} />
                <span>ابلاغ دستورالعمل به حوزه‌ها</span>
              </button>
            </div>
          </div>
        </div>

        {/* District Overview Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">حوزه‌های مقاومت تابعه</span>
            <div className="text-2xl font-black text-stone-900 font-mono tabular-nums">۶ حوزه</div>
            <span className="text-[11px] text-emerald-700 font-medium">۴۸ پایگاه تحت پوشش</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">کادر منصوب در ناحیه</span>
            <div className="text-2xl font-black text-stone-900 font-mono tabular-nums">
              {personnelList.length} نفر
            </div>
            <button
              onClick={() => onNavigateTab('personnel')}
              className="text-[11px] text-[#2D4A3E] font-bold hover:underline"
            >
              مشاهده و افزودن عضو جدید →
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">گزارشات رسیده این هفته</span>
            <div className="text-2xl font-black text-stone-900 font-mono tabular-nums">۱۱۸ از ۱۲۴</div>
            <span className="text-[11px] text-emerald-700 font-medium">۹۵٪ تحقق برنامه</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">گزارشات نیازمند تایید نهایی</span>
            <div className="text-2xl font-black text-amber-600 font-mono tabular-nums">{pendingReportsCount}</div>
            <button
              onClick={() => onNavigateTab('reports')}
              className="text-[11px] text-[#2D4A3E] font-bold hover:underline"
            >
              ورود به کارتابل ارزیابی →
            </button>
          </div>
        </div>

        {/* Subordinate Zones Management Section */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Network size={18} className="text-[#2D4A3E]" />
                <span>سازمان رزم تربیتی حوزه‌های تابعه {currentUser.nahieh}</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                نظارت بر سرمربیان، مربیان و وضعیت تکمیل کادر تربیتی در هر حوزه
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('personnel')}
              className="px-3 py-1.5 text-xs font-bold text-[#2D4A3E] bg-[#2D4A3E]/10 hover:bg-[#2D4A3E]/20 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <UserPlus size={14} />
              <span>انتصاب عضو در حوزه</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                hozeh: 'حوزه ۲۱۵ ایثار',
                officer: 'برادر پاسدار علی صادقی',
                sarmarbi: 'حجت‌الاسلام تقوی',
                circles: 42,
                status: 'کادر کامل - فعال',
              },
              {
                hozeh: 'حوزه ۲۱۷ شهید رجایی',
                officer: 'برادر پاسدار قنبری',
                sarmarbi: 'حجت‌الاسلام طاهری',
                circles: 38,
                status: 'کادر کامل - فعال',
              },
              {
                hozeh: 'حوزه ۲۱۹ فتح',
                officer: 'برادر پاسدار نوری',
                sarmarbi: 'حجت‌الاسلام میرزایی',
                circles: 44,
                status: 'نیازمند ۲ مربی جدید',
              },
            ].map((hz, idx) => (
              <div key={idx} className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
                <div className="flex items-center justify-between font-bold text-stone-900 text-xs">
                  <span>{hz.hozeh}</span>
                  <span className="text-[10px] text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                    {hz.circles} حلقه
                  </span>
                </div>
                <div className="text-[11px] text-stone-600 space-y-1">
                  <p>مسئول تعلیم و تربیت: <strong>{hz.officer}</strong></p>
                  <p>سرمربی صالحین: <strong>{hz.sarmarbi}</strong></p>
                </div>
                <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">{hz.status}</span>
                  <button
                    onClick={() => onNavigateTab('personnel')}
                    className="text-[#2D4A3E] font-bold hover:underline"
                  >
                    مدیریت اعضا
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 3. استادیار ناحیه (District Ostadyar - Scientific/Pedagogical Mentor)
  // -------------------------------------------------------------
  if (currentUser.role === 'nahieh_ostadyar') {
    return (
      <div className="space-y-6 pb-12 text-right">
        {/* Ostadyar Spiritual & Academic Banner */}
        <div className="bg-gradient-to-br from-[#2D3A34] via-[#354B40] to-[#24352D] text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-[#486857]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 rounded-full border border-[#C59B27]/40 text-[#E5C365] text-xs font-bold">
                <BookOpen size={14} />
                <span>قرارگاه هدایت علمی و محتوایی صالحین {currentUser.nahieh}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                میز کار استادیار شجره طیبه صالحین
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                استادیار محترم: {currentUser.name}. نظارت عالی بر سیر تربیتی، تایید کتابچه‌ها و درسنامه‌های عقیدتی، برگزاری شورای انسجام با سرمربیان حوزه‌ها و هدایت معرفتی مربیان.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={onOpenPublishModal}
                className="px-4 py-2.5 bg-[#E5C365] hover:bg-[#F3D580] text-[#162921] rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                <PlusCircle size={16} />
                <span>انتشار درسنامه و محتوای علمی</span>
              </button>
              <button
                onClick={() => onNavigateTab('education')}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-all flex items-center gap-2"
              >
                <GraduationCap size={16} />
                <span>کتابخانه تخصصی و آزمون‌ها</span>
              </button>
            </div>
          </div>
        </div>

        {/* Ostadyar KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">سرمربیان تحت هدایت علمی</span>
            <div className="text-2xl font-black text-stone-900 font-mono tabular-nums">۶ سرمربی</div>
            <span className="text-[11px] text-emerald-700 font-medium">جلسات انسجام ماهانه دایر</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">درسنامه‌های تاییدشده ناحیه</span>
            <div className="text-2xl font-black text-stone-900 font-mono tabular-nums">۲۴ عنوان</div>
            <span className="text-[11px] text-stone-500">سیر معرفتی و اخلاقی</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">جلسه شورای استادیاری</span>
            <div className="text-2xl font-black text-[#8C6B13] font-mono tabular-nums">دوشنبه آینده</div>
            <span className="text-[11px] text-stone-500">ساعت ۱۶ در جامعه مدرسین</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">نظارت کیفی بر مباحث</span>
            <div className="text-2xl font-black text-emerald-700 font-mono tabular-nums">۹۶٪ رضایت</div>
            <span className="text-[11px] text-stone-500">بررسی شبهات گزارش‌شده</span>
          </div>
        </div>

        {/* Scientific & Doctrinal Guidance Focus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Sparkles size={16} className="text-[#C59B27]" />
              <span>محورهای مطالعاتی اولویت‌دار در حلقات ناحیه (ابلاغ استادیار)</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <strong className="text-stone-900 block mb-0.5">۱. مبانی توحید و نفی طاغوت</strong>
                <p className="text-stone-500 text-[11px]">با محوریت بخش دوم کتاب طرح کلی اندیشه اسلامی در قرآن</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <strong className="text-stone-900 block mb-0.5">۲. پاسخ به شبهات نسل نوجوان</strong>
                <p className="text-stone-500 text-[11px]">روش اقناعی در پاسخگویی به ابهامات هویت و حجاب</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <strong className="text-stone-900 block mb-0.5">۳. پیوند اخلاق فردی با کار تشکیلاتی</strong>
                <p className="text-stone-500 text-[11px]">تبیین مفهوم نظم و وقت‌شناسی به عنوان واجب شرعی و تربیتی</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Users size={16} className="text-[#2D4A3E]" />
              <span>اعضای شورای سرمربیان ناحیه</span>
            </h3>
            <div className="divide-y divide-stone-100 text-xs">
              {personnelList
                .filter((p) => p.role === 'hozeh_sarmarbi')
                .map((sarm, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <div>
                      <strong className="text-stone-900">{sarm.name}</strong>
                      <span className="text-[11px] text-stone-400 block">{sarm.hozeh}</span>
                    </div>
                    <span className="text-[11px] font-mono text-stone-500">{sarm.phone}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 4. مسئول تعلیم و تربیت حوزه (Zone Education Officer)
  // -------------------------------------------------------------
  if (currentUser.role === 'hozeh_officer') {
    return (
      <div className="space-y-6 pb-12 text-right">
        {/* Zone Commander Banner */}
        <div className="bg-gradient-to-br from-[#2D4A3E] via-[#243E34] to-[#1E352B] text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-[#3E6554]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/30 rounded-full border border-[#C59B27]/30 text-[#E5C365] text-xs font-semibold">
                <MapPin size={14} />
                <span>فرماندهی عملیات تربیتی {currentUser.hozeh}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                داشبورد مسئول تعلیم و تربیت حوزه
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                برادر ارجمند: {currentUser.name}. نظارت عملیاتی بر پایگاه‌های مقاومت حوزه، پیگیری تشکیل جلسات هفتگی و انتصاب مربیان و سرگروه‌های حوزه ۲۱۵.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => onNavigateTab('personnel')}
                className="px-4 py-2.5 bg-[#E5C365] hover:bg-[#F3D580] text-[#162921] rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                <UserPlus size={16} />
                <span>ثبت مربی و سرگروه جدید حوزه</span>
              </button>
              <button
                onClick={onOpenPublishModal}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-all flex items-center gap-2"
              >
                <PlusCircle size={16} />
                <span>ابلاغیه به پایگاه‌ها</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hozeh Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">پایگاه‌های تابعه حوزه</span>
            <div className="text-2xl font-black text-stone-900 font-mono tabular-nums">۸ پایگاه</div>
            <span className="text-[11px] text-emerald-700 font-medium">۴۲ حلقه صالحین فعال</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">گزارشات رسیده این هفته</span>
            <div className="text-2xl font-black text-stone-900 font-mono tabular-nums">۳۸ از ۴۲</div>
            <span className="text-[11px] text-emerald-700 font-medium">۹۰٪ پایگاه‌ها منظم</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">مربیان و سرگروه‌های ثبت‌شده</span>
            <div className="text-2xl font-black text-stone-900 font-mono tabular-nums">
              {personnelList.filter((p) => p.hozeh.includes('۲۱۵')).length} نفر
            </div>
            <button
              onClick={() => onNavigateTab('personnel')}
              className="text-[11px] text-[#2D4A3E] font-bold hover:underline"
            >
              مشاهده و انتصاب →
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">رتبه حوزه در ناحیه</span>
            <div className="text-2xl font-black text-[#C59B27] font-mono tabular-nums">رتبه ۱</div>
            <span className="text-[11px] text-amber-700 font-bold">حوزه پیشتاز و نمونه</span>
          </div>
        </div>

        {/* Bases Status Table */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900">وضعیت پایگاه‌های مقاومت حوزه ۲۱۵ ایثار</h3>
            <button
              onClick={() => onNavigateTab('rankings')}
              className="text-xs font-bold text-[#2D4A3E] hover:underline"
            >
              مشاهده رتبه‌بندی کامل
            </button>
          </div>

          <div className="divide-y divide-stone-100 text-xs">
            {[
              { base: 'پایگاه شهید همت', leader: 'کربلایی مجتبی احمدی', circles: 6, reportState: '۱۰۰٪ ارسال شده' },
              { base: 'پایگاه میثم تمار', leader: 'استاد احمدی', circles: 5, reportState: '۱ مورد در انتظار' },
              { base: 'پایگاه عاشورا', leader: 'محمدرضا اسدی', circles: 5, reportState: '۱۰۰٪ ارسال شده' },
              { base: 'پایگاه مالک اشتر', leader: 'سرهنگ یزدانی', circles: 4, reportState: '۱۰۰٪ ارسال شده' },
            ].map((b, i) => (
              <div key={i} className="py-2.5 flex items-center justify-between">
                <div>
                  <strong className="text-stone-900">{b.base}</strong>
                  <span className="text-[11px] text-stone-400 block">
                    مربی ارشد: {b.leader} · {b.circles} حلقه فعال
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {b.reportState}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 5. سرمربی حوزه (Zone Sarmarbi - Pedagogical Coach)
  // -------------------------------------------------------------
  if (currentUser.role === 'hozeh_sarmarbi') {
    return (
      <div className="space-y-6 pb-12 text-right">
        {/* Sarmarbi Banner */}
        <div className="bg-gradient-to-br from-[#1E352B] via-[#2A4639] to-[#365747] text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-[#486857]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/30 rounded-full border border-[#C59B27]/30 text-[#E5C365] text-xs font-semibold">
                <Award size={14} />
                <span>شورای هدایت و داوری تربیتی {currentUser.hozeh}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                میز داوری و ارزیابی سرمربی صالحین حوزه
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                سرمربی محترم: {currentUser.name}. دسترسی ویژه جهت ارزیابی، بازخورد و ثبت نمره کیفی برای گزارشات رسیده از مربیان و سرگروه‌های پایگاه‌ها.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => onNavigateTab('reports')}
                className="px-4 py-2.5 bg-[#E5C365] hover:bg-[#F3D580] text-[#162921] rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                <FileCheck2 size={16} />
                <span>کارتابل ارزیابی و امتیازدهی گزارشات</span>
              </button>
              <button
                onClick={onOpenPublishModal}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-all flex items-center gap-2"
              >
                <PlusCircle size={16} />
                <span>رهنمود تربیتی برای مربیان</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sarmarbi KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">گزارشات در انتظار بررسی شما</span>
            <div className="text-2xl font-black text-amber-600 font-mono tabular-nums">{pendingReportsCount}</div>
            <button
              onClick={() => onNavigateTab('reports')}
              className="text-[11px] text-[#2D4A3E] font-bold hover:underline"
            >
              شروع بررسی و نمره‌دهی →
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">میانگین نمره کیفی حوزه</span>
            <div className="text-2xl font-black text-stone-900 font-mono tabular-nums">۹۲.۵ از ۱۰۰</div>
            <span className="text-[11px] text-emerald-700 font-medium">سطح شایستگی زرین</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">مربیان تحت سرپرستی</span>
            <div className="text-2xl font-black text-stone-900 font-mono tabular-nums">۸ مربی</div>
            <span className="text-[11px] text-stone-500">پایگاه‌های تابعه</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">جلسه شورای مربیان</span>
            <div className="text-2xl font-black text-[#8C6B13] font-mono tabular-nums">چهارشنبه</div>
            <span className="text-[11px] text-stone-500">ساعت ۱۸ شبستان مسجد</span>
          </div>
        </div>

        {/* Pending Reports Card Preview */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Clock size={16} className="text-amber-600" />
              <span>آخرین گزارشات نیازمند بررسی و ثبت بازخورد سرمربی</span>
            </h3>
            <button
              onClick={() => onNavigateTab('reports')}
              className="text-xs font-bold text-[#2D4A3E] hover:underline"
            >
              مشاهده همه در کارتابل
            </button>
          </div>

          <div className="space-y-2">
            {reports
              .filter((r) => r.status === 'pending')
              .slice(0, 3)
              .map((rep) => (
                <div
                  key={rep.id}
                  className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between text-xs"
                >
                  <div>
                    <strong className="text-stone-900 text-xs block">{rep.circleName}</strong>
                    <span className="text-[11px] text-stone-500">
                      موضوع: {rep.mainTopic} · سرگروه: {rep.leaderName}
                    </span>
                  </div>
                  <button
                    onClick={() => onNavigateTab('reports')}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-[#243E34] rounded-lg hover:bg-[#1A2E26]"
                  >
                    ارزیابی و ثبت امتیاز
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 6. مربی پایگاه (Base Morabbi - Mosque Coach)
  // -------------------------------------------------------------
  if (currentUser.role === 'morabbi') {
    return (
      <div className="space-y-6 pb-12 text-right">
        {/* Morabbi Banner */}
        <div className="bg-gradient-to-br from-[#243E34] via-[#2D4E41] to-[#1E352B] text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-[#3E6554]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/30 rounded-full border border-[#C59B27]/30 text-[#E5C365] text-xs font-semibold">
                <Users size={14} />
                <span>مربی تربیتی صالحین {currentUser.base}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                داشبورد مربی پایگاه مقاومت
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                مربی گرامی: {currentUser.name}. هدایت و پشتیبانی سرگروه‌های حلقه‌های مسجد، تایید جلسات هفتگی و انتصاب سرگروه‌ها و متربیان جدید در پایگاه.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => onNavigateTab('personnel')}
                className="px-4 py-2.5 bg-[#E5C365] hover:bg-[#F3D580] text-[#162921] rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                <UserPlus size={16} />
                <span>افزودن سرگروه / متربی جدید</span>
              </button>
              <button
                onClick={onOpenPublishModal}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-all flex items-center gap-2"
              >
                <PlusCircle size={16} />
                <span>طرح درس برای سرگروه‌ها</span>
              </button>
            </div>
          </div>
        </div>

        {/* Morabbi KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">حلقات تحت هدایت پایگاه</span>
            <div className="text-2xl font-black text-stone-900 font-mono tabular-nums">۶ حلقه</div>
            <span className="text-[11px] text-emerald-700 font-medium">نونهال، نوجوان، جوان</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">سرگروه‌های پایگاه</span>
            <div className="text-2xl font-black text-stone-900 font-mono tabular-nums">۶ نفر</div>
            <button
              onClick={() => onNavigateTab('personnel')}
              className="text-[11px] text-[#2D4A3E] font-bold hover:underline"
            >
              مشاهده سرگروه‌ها →
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">جلسه مربی با سرگروه‌ها</span>
            <div className="text-2xl font-black text-[#8C6B13] font-mono tabular-nums">پنج‌شنبه</div>
            <span className="text-[11px] text-stone-500">ساعت ۱۷ اتاق پایگاه</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">نمره انضباط پایگاه</span>
            <div className="text-2xl font-black text-emerald-700 font-mono tabular-nums">۹۵٪</div>
            <span className="text-[11px] text-stone-500">پایگاه نمونه حوزه ۲۱۵</span>
          </div>
        </div>

        {/* Circles in Base */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-100">
            حلقات صالحین مستقر در {currentUser.base}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1">
              <strong className="text-stone-900 block">حلقه شهید ابراهیم هادی</strong>
              <p className="text-[11px] text-stone-500">سرگروه: محمدحسین نجفی (نوجوانان)</p>
              <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded inline-block">
                گزارش این هفته تایید شد
              </span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1">
              <strong className="text-stone-900 block">حلقه شهید محسن حججی</strong>
              <p className="text-[11px] text-stone-500">سرگروه: سید رضا حسینی (جوانان)</p>
              <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded inline-block">
                گزارش این هفته تایید شد
              </span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1">
              <strong className="text-stone-900 block">حلقه شهید آرمان علی‌وردی</strong>
              <p className="text-[11px] text-stone-500">سرگروه: حاج قدرت فراهانی (میانسالان)</p>
              <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded inline-block">
                در انتظار بررسی مربی
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 7. سرگروه حلقه پایگاه (Circle Leader / Sargorouh)
  // -------------------------------------------------------------
  if (currentUser.role === 'sargorouh') {
    return (
      <div className="space-y-6 pb-12 text-right">
        {/* Sargorouh Tactical Desk Banner */}
        <div className="bg-gradient-to-br from-[#1C332A] via-[#243E34] to-[#2E4E42] text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-[#3E6554]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 rounded-full border border-[#C59B27]/30 text-[#E5C365] text-xs font-semibold">
                <Compass size={14} />
                <span>میز کار میدانی سرگروه صالحین · {currentUser.circleName}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                خدا قوت سرگروه محترم، {currentUser.name}
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                جلسه این هفته حلقه شما فردا جمعه در مسجد منعقد می‌گردد. ثبت به موقع حضور و غیاب و گزارش مباحث، ضامن تداوم رتبه دوم حلقه شما در سطح حوزه است.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={onOpenReportModal}
                className="px-4 py-2.5 bg-[#E5C365] hover:bg-[#F3D580] text-[#162921] rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
              >
                <FileCheck2 size={16} />
                <span>ثبت گزارش جلسه حلقه</span>
              </button>
              <button
                onClick={() => onNavigateTab('members')}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <Users size={16} />
                <span>حضور و غیاب و کارنامه اعضا</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sargorouh KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">اعضای ثبت‌شده در حلقه شما</span>
            <div className="text-2xl font-black text-stone-900 font-mono tabular-nums">۱۸ متربی</div>
            <span className="text-[11px] text-emerald-700 font-medium">۱۶ نفر حاضر در جلسه قبل</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">رتبه در سطح حوزه ۲۱۵</span>
            <div className="text-2xl font-black text-[#C59B27] font-mono tabular-nums">رتبه ۲</div>
            <span className="text-[11px] text-amber-700 font-bold">نشان زرین شایستگی</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">جلسات برگزارشده</span>
            <div className="text-2xl font-black text-stone-900 font-mono tabular-nums">۲۴ جلسه</div>
            <span className="text-[11px] text-stone-500">پاییز ۱۴۰۵</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs text-stone-500 block mb-1">نمره ارزیابی مربی</span>
            <div className="text-2xl font-black text-emerald-700 font-mono tabular-nums">۹۵ از ۱۰۰</div>
            <span className="text-[11px] text-emerald-700 font-medium">تایید شده توسط استاد احمدی</span>
          </div>
        </div>

        {/* Session Preparation & Weekly Discussion Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Calendar size={16} className="text-[#2D4A3E]" />
                <span>برنامه جلسه ۲۵ (جمعه این هفته)</span>
              </h3>
              <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                فردا ساعت ۱۰:۳۰
              </span>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed font-semibold">
              موضوع مباحثه: «رفاقت به سبک شهدا؛ الگوی دوستی ایمانی و تشکیلاتی»
            </p>

            <div className="space-y-1.5 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100">
              <span className="text-stone-400 block text-[11px]">اقدامات اجرایی سرگروه پیش از جلسه:</span>
              <p>✓ هماهنگی با مسئول فرهنگی مسجد جهت آماده‌سازی شبستان</p>
              <p>✓ تماس تلفنی با ۲ عضو غایب جلسه قبل جهت احوالپرسی</p>
              <p>✓ مطالعه ۱۰ صفحه‌ای کتابچه اخلاق تشکیلاتی</p>
            </div>

            <button
              onClick={() => onOpenPamphlet('pam-1')}
              className="w-full py-2 text-xs font-bold text-[#2D4A3E] bg-[#2D4A3E]/10 hover:bg-[#2D4A3E]/20 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <BookOpen size={14} />
              <span>مشاهده و دانلود درسنامه جلسه ۲۵</span>
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Users size={16} className="text-[#2D4A3E]" />
                <span>اعضای فعال نیازمند تشویق یا پیگیری</span>
              </h3>
              <button
                onClick={() => onNavigateTab('members')}
                className="text-xs font-bold text-[#2D4A3E] hover:underline"
              >
                لیست کل اعضا
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <strong className="text-emerald-900 block">سید علی موسوی</strong>
                  <span className="text-[11px] text-emerald-700">۱۰۰٪ حضور در جلسات + نمره ۱۰۰ در کوییز</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-800">کاندیدای تشویق</span>
              </div>

              <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-100 flex items-center justify-between">
                <div>
                  <strong className="text-amber-900 block">حسین سلیمانی</strong>
                  <span className="text-[11px] text-amber-700">غایب موجه در جلسه قبل (بیماری)</span>
                </div>
                <span className="text-[11px] font-bold text-amber-800">نیازمند احوالپرسی</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 8. بسیجی عادی / متربی حلقه (Normal Basiji - Direct Learning Space)
  // -------------------------------------------------------------
  // As requested: "بسیجی عادی نیاز به داشبورد خاصی ندارد و بیشتر باید در فضای مرکز آموزش دسترسی بیشتری و راحت تری داشته باشد."
  return (
    <div className="space-y-6 pb-12 text-right">
      {/* Friendly, Welcoming Spiritual Learning Banner for Basiji */}
      <div className="bg-gradient-to-br from-[#1E352B] via-[#243E34] to-[#2D4A3E] text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-[#3E6554] relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/40 rounded-full border border-[#C59B27]/40 text-[#E5C365] text-xs font-bold">
              <GraduationCap size={15} />
              <span>میز یادگیری، رشد و دانشنامه صالحین</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              سلام و درود، {currentUser.name} عزیز
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              عضو باصفای {currentUser.circleName} در {currentUser.base}. به سامانه آموزش، آزمون‌های آنلاین، ویدیوها و جزوات تربیتی خوش آمدید.
            </p>
          </div>

          <div className="bg-black/30 p-4 rounded-xl border border-[#C59B27]/30 text-center shrink-0 w-full sm:w-auto">
            <span className="text-stone-300 block text-xs">مجموع امتیاز شما:</span>
            <div className="text-2xl font-black text-[#E5C365] font-mono tabular-nums">
              {currentUser.points} نمره
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">۶ آزمون با موفقیت پاس شد</span>
          </div>
        </div>
      </div>

      {/* Direct 1-Click Access to Interactive Quizzes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <HelpCircle size={18} className="text-[#C59B27]" />
            <span>آزمون‌ها و کوییزهای فعال برای شما</span>
          </h2>
          <span className="text-xs text-stone-500 font-mono tabular-nums">۲ آزمون آماده شروع</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_QUIZZES.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-xl border-2 border-stone-200 hover:border-[#2D4A3E] p-5 shadow-xs transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span className="font-bold text-[#2D4A3E]">{quiz.category}</span>
                  <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                    +{quiz.rewardPoints} امتیاز جایزه
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-stone-900">{quiz.title}</h3>
                <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                  شامل {quiz.questionsCount} سوال تستی، کارنامه آنی و جایزه امتیاز در کارنامه حلقه.
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-400 font-mono tabular-nums">
                  مدت پاسخگویی: {quiz.durationMinutes} دقیقه
                </span>
                <button
                  onClick={() => onOpenQuiz(quiz.id)}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#243E34] hover:bg-[#1A2E26] rounded-xl shadow-xs transition-transform active:scale-95"
                >
                  شروع آنلاین آزمون →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Access to Video Classes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Video size={18} className="text-[#2D4A3E]" />
            <span>کلاس‌های ویدیویی و مهارتی</span>
          </h2>
          <button
            onClick={() => onNavigateTab('education')}
            className="text-xs font-bold text-[#2D4A3E] hover:underline"
          >
            مشاهده کل ویدیوها
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_VIDEOS.map((vid) => (
            <div
              key={vid.id}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between"
            >
              <div
                className="relative aspect-video bg-stone-900 cursor-pointer group"
                onClick={() => onNavigateTab('education')}
              >
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#E5C365] text-[#162921] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={20} className="fill-current translate-x-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[11px] font-mono px-2 py-0.5 rounded">
                  {vid.duration}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-stone-900">{vid.title}</h3>
                <p className="text-xs text-stone-500">مدرس: {vid.speaker}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Booklets for Basiji */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <BookOpen size={18} className="text-[#2D4A3E]" />
            <span>درسنامه‌ها و جزوات خواندنی حلقه</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_PAMPHLETS.map((pam) => (
            <div
              key={pam.id}
              className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs flex items-center gap-4 hover:border-stone-300 transition-all"
            >
              <div className="w-16 h-22 rounded-lg overflow-hidden border border-stone-200 shrink-0 bg-stone-100">
                <img
                  src={pam.coverUrl}
                  alt={pam.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-1">
                <span className="text-[10px] text-amber-800 font-bold block">{pam.category}</span>
                <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{pam.title}</h4>
                <p className="text-[11px] text-stone-500 line-clamp-1">{pam.author}</p>
                <button
                  onClick={() => onOpenPamphlet(pam.id)}
                  className="text-xs font-bold text-[#2D4A3E] hover:underline pt-1 block"
                >
                  مطالعه متن درسنامه →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Circle Next Meeting Info Card */}
      <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C59B27]/40 text-xs text-stone-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] text-amber-800 font-bold block">
            جلسه بعدی حلقه شما در مسجد
          </span>
          <h4 className="text-sm font-bold text-stone-900 mt-0.5">
            جمعه ساعت ۱۰:۳۰ صبح در شبستان مسجد جامع پایگاه شهید همت
          </h4>
          <p className="text-stone-500 text-[11px] mt-1">
            سرگروه: برادر محمدحسین نجفی · موضوع: «رفاقت به سبک شهدا»
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('announcements')}
          className="px-4 py-2 text-xs font-bold text-[#2D4A3E] bg-white border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors shrink-0 shadow-xs"
        >
          مشاهده اطلاعیه‌های حلقه
        </button>
      </div>
    </div>
  );
};
