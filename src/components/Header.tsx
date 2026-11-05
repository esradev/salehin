import React, { useState } from 'react';
import {
  Bell,
  BookOpen,
  ChevronDown,
  FileCheck2,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Network,
  PlusCircle,
  Shield,
  Trophy,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { ROLES_CONFIG } from '../data/mockData';
import { ROLE_THEMES } from '../theme/roleThemes';
import { Announcement, UserProfile, UserRole } from '../types';
import emblemImage from '../assets/images/salehin_badge_emblem_1793894948131.jpg';

interface HeaderProps {
  currentUser: UserProfile;
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenRoleSwitcher: () => void;
  onOpenPublishModal: () => void;
  onOpenReportModal: () => void;
  announcements: Announcement[];
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  currentTab,
  onTabChange,
  onOpenRoleSwitcher,
  onOpenPublishModal,
  onOpenReportModal,
  announcements,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const roleConfig = ROLES_CONFIG[currentUser.role];
  const theme = ROLE_THEMES[currentUser.role];

  const importantNotices = announcements.filter((a) => a.isImportant);

  const canPublish = currentUser.role !== 'basiji';
  const canReport = currentUser.role === 'sargorouh' || currentUser.role === 'morabbi';

  // Compute completely customized navigation menu per role
  const getNavItemsForRole = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'مانیتورینگ کلان', icon: LayoutDashboard },
          { id: 'personnel', label: 'ساختار و کاربران', icon: Users },
          { id: 'reports', label: 'گزارشات کشوری', icon: FileCheck2 },
          { id: 'rankings', label: 'رتبه‌بندی کل', icon: Trophy },
          { id: 'education', label: 'مدیریت آموزش', icon: GraduationCap },
          { id: 'announcements', label: 'ابلاغیه‌ها', icon: Bell },
        ];
      case 'nahieh_officer':
        return [
          { id: 'dashboard', label: 'فرماندهی ناحیه', icon: LayoutDashboard },
          { id: 'personnel', label: 'انتصاب و اعضای زیرمجموعه', icon: UserPlus },
          { id: 'reports', label: 'گزارشات حوزه‌ها', icon: FileCheck2 },
          { id: 'rankings', label: 'رتبه‌بندی پایگاه‌ها', icon: Trophy },
          { id: 'announcements', label: 'ابلاغیه‌های ناحیه', icon: Bell },
        ];
      case 'nahieh_ostadyar':
        return [
          { id: 'dashboard', label: 'میز علمی استادیار', icon: LayoutDashboard },
          { id: 'education', label: 'کتابخانه و درسنامه‌ها', icon: BookOpen },
          { id: 'reports', label: 'نظارت محتوایی بر گزارشات', icon: FileCheck2 },
          { id: 'announcements', label: 'اطلاعیه‌ها', icon: Bell },
        ];
      case 'hozeh_officer':
        return [
          { id: 'dashboard', label: 'عملیات حوزه', icon: LayoutDashboard },
          { id: 'personnel', label: 'مربیان و سرگروه‌های حوزه', icon: Users },
          { id: 'reports', label: 'گزارش‌های پایگاه‌ها', icon: FileCheck2 },
          { id: 'rankings', label: 'رتبه‌بندی حوزه', icon: Trophy },
          { id: 'announcements', label: 'ابلاغیه‌ها', icon: Bell },
        ];
      case 'hozeh_sarmarbi':
        return [
          { id: 'dashboard', label: 'میز هدایت سرمربی', icon: LayoutDashboard },
          { id: 'reports', label: 'کارتابل ارزیابی گزارشات', icon: FileCheck2 },
          { id: 'education', label: 'درسنامه‌ها و رفع شبهات', icon: GraduationCap },
          { id: 'personnel', label: 'شبکه مربیان', icon: Users },
        ];
      case 'morabbi':
        return [
          { id: 'dashboard', label: 'داشبورد پایگاه', icon: LayoutDashboard },
          { id: 'personnel', label: 'سرگروه‌ها و اعضای پایگاه', icon: Users },
          { id: 'reports', label: 'تایید گزارشات مسجد', icon: FileCheck2 },
          { id: 'education', label: 'طرح درس‌ها', icon: BookOpen },
        ];
      case 'sargorouh':
        return [
          { id: 'dashboard', label: 'جلسه و حلقه من', icon: LayoutDashboard },
          { id: 'members', label: 'حضور و غیاب اعضا', icon: Users },
          { id: 'reports', label: 'ثبت و سوابق گزارشات', icon: FileCheck2 },
          { id: 'education', label: 'درسنامه و آزمون‌ها', icon: GraduationCap },
          { id: 'announcements', label: 'پیام‌های حلقه', icon: Bell },
        ];
      case 'basiji':
        return [
          { id: 'education', label: 'مرکز آموزش و آزمون‌ها', icon: GraduationCap },
          { id: 'dashboard', label: 'میز یادگیری من', icon: LayoutDashboard },
          { id: 'announcements', label: 'اطلاعیه‌های حلقه', icon: Bell },
          { id: 'rankings', label: 'رتبه‌بندی حلقات', icon: Trophy },
        ];
      default:
        return [
          { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
          { id: 'education', label: 'مرکز آموزش', icon: GraduationCap },
        ];
    }
  };

  const navItems = getNavItemsForRole(currentUser.role);

  return (
    <>
      {/* Top Bar Contract with Role Dynamic Theme Color */}
      <header className={`sticky top-0 z-30 ${theme.headerBg} text-white border-b ${theme.headerBorder} shadow-md transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4 h-16 min-w-0">
            {/* Zone 1: Brand Wordmark with Salehin Emblem */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-stone-200 hover:text-white rounded-lg focus:outline-none"
                aria-label="منوی اصلی"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              <button
                onClick={() => onTabChange(currentUser.role === 'basiji' ? 'education' : 'dashboard')}
                className="flex items-center gap-2.5 text-right group focus:outline-none min-w-0"
              >
                <div className="w-9 h-9 rounded-full bg-black/40 border border-white/20 p-0.5 flex items-center justify-center shadow-inner overflow-hidden">
                  <img
                    src={emblemImage}
                    alt="نشان شجره طیبه صالحین"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-sm sm:text-base font-bold tracking-tight text-white truncate block">
                    سامانه صالحین بسیج
                  </span>
                  <span className={`text-[10px] ${theme.accentText} font-bold block -mt-0.5`}>
                    {theme.nameFa}
                  </span>
                </div>
              </button>
            </div>

            {/* Zone 2: Navigation Links tailored per active role */}
            <nav className="hidden xl:flex items-center gap-1 lg:gap-2 min-w-0">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? `${theme.activeNavTab} font-bold shadow-sm border`
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={16} className={isActive ? theme.accentText : 'text-stone-300'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Actions & Active Role Switcher */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Quick Publish / Report Button */}
              {canPublish && (
                <button
                  onClick={onOpenPublishModal}
                  className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#14231A] ${theme.accentBg} ${theme.accentHoverBg} rounded-lg shadow-sm transition-all whitespace-nowrap`}
                >
                  <PlusCircle size={15} />
                  <span>انتشار محتوا</span>
                </button>
              )}

              {canReport && (
                <button
                  onClick={onOpenReportModal}
                  className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all whitespace-nowrap"
                >
                  <FileCheck2 size={15} />
                  <span>ثبت گزارش</span>
                </button>
              )}

              {/* Notification Popover Toggle */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="اعلان‌ها"
                >
                  <Bell size={18} />
                  {importantNotices.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full" />
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute left-0 mt-2 w-[min(20rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] bg-white text-stone-900 rounded-xl shadow-xl border border-stone-200 p-3 z-50">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                      <span className="text-xs font-bold text-stone-900">اعلان‌های فوری و ابلاغیه‌ها</span>
                      <span className="text-[11px] text-stone-500">{importantNotices.length} مورد مهم</span>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {importantNotices.map((notice) => (
                        <div
                          key={notice.id}
                          className="p-2.5 bg-stone-50 hover:bg-stone-100 rounded-lg text-right transition-colors"
                        >
                          <div className="flex items-center justify-between text-[11px] text-amber-700 font-semibold mb-1">
                            <span>{notice.category}</span>
                            <span className="text-stone-400">{notice.publishedAt}</span>
                          </div>
                          <p className="text-xs font-medium text-stone-800 line-clamp-2 leading-relaxed">
                            {notice.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Active Role Card & Switcher Trigger */}
              <button
                onClick={onOpenRoleSwitcher}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 bg-black/30 hover:bg-black/50 border border-white/20 rounded-lg transition-colors text-right"
                title="تغییر نقش کاربری جهت تست و بررسی دسترسی‌ها"
              >
                <div className={`w-7 h-7 rounded-md bg-white/10 flex items-center justify-center ${theme.accentText}`}>
                  <Shield size={16} />
                </div>
                <div className="hidden sm:block text-right">
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>{roleConfig.title}</span>
                    <ChevronDown size={13} className="text-stone-300" />
                  </div>
                  <span className="text-[10px] text-stone-300 block truncate max-w-[120px]">
                    {currentUser.name}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-black/40 backdrop-blur-md border-t border-white/10 px-4 pt-2 pb-4 space-y-1">
            <div className="py-2 border-b border-white/10 mb-2">
              <p className="text-xs text-stone-200">
                نقش فعال: <span className={`font-bold ${theme.accentText}`}>{roleConfig.title}</span>
              </p>
              <p className="text-[11px] text-stone-300">
                {currentUser.name} · {currentUser.base}
              </p>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? `${theme.activeNavTab} font-bold` : 'text-stone-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              {canPublish && (
                <button
                  onClick={() => {
                    onOpenPublishModal();
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-[#14231A] ${theme.accentBg} rounded-lg`}
                >
                  <PlusCircle size={15} />
                  <span>انتشار محتوا / ابلاغیه جدید</span>
                </button>
              )}
              {canReport && (
                <button
                  onClick={() => {
                    onOpenReportModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-white bg-white/20 rounded-lg border border-white/20"
                >
                  <FileCheck2 size={15} />
                  <span>ثبت گزارش فعالیت حلقه</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
