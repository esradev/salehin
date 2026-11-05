import React from 'react';
import {
  Bell,
  BookOpen,
  FileCheck2,
  GraduationCap,
  LayoutDashboard,
  Shield,
  Trophy,
  UserPlus,
  Users,
} from 'lucide-react';
import { ROLE_THEMES } from '../theme/roleThemes';
import { UserProfile, UserRole } from '../types';

interface MobileBottomNavProps {
  currentUser: UserProfile;
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenRoleSwitcher: () => void;
  pendingReportsCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentUser,
  currentTab,
  onTabChange,
  onOpenRoleSwitcher,
  pendingReportsCount = 0,
}) => {
  const theme = ROLE_THEMES[currentUser.role];

  const getTabsForRole = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
          { id: 'personnel', label: 'کاربران', icon: Users },
          { id: 'reports', label: 'گزارش‌ها', icon: FileCheck2 },
          { id: 'education', label: 'آموزش', icon: GraduationCap },
        ];
      case 'nahieh_officer':
        return [
          { id: 'dashboard', label: 'ناحیه', icon: LayoutDashboard },
          { id: 'personnel', label: 'زیرمجموعه', icon: UserPlus },
          { id: 'reports', label: 'گزارش‌ها', icon: FileCheck2 },
          { id: 'announcements', label: 'ابلاغیه‌ها', icon: Bell },
        ];
      case 'nahieh_ostadyar':
        return [
          { id: 'dashboard', label: 'استادیار', icon: LayoutDashboard },
          { id: 'education', label: 'کتابخانه', icon: BookOpen },
          { id: 'reports', label: 'نظارت', icon: FileCheck2 },
          { id: 'announcements', label: 'اطلاعیه‌ها', icon: Bell },
        ];
      case 'hozeh_officer':
        return [
          { id: 'dashboard', label: 'حوزه', icon: LayoutDashboard },
          { id: 'personnel', label: 'مربیان', icon: Users },
          { id: 'reports', label: 'پایگاه‌ها', icon: FileCheck2 },
          { id: 'rankings', label: 'رتبه‌بندی', icon: Trophy },
        ];
      case 'hozeh_sarmarbi':
        return [
          { id: 'dashboard', label: 'سرمربی', icon: LayoutDashboard },
          { id: 'reports', label: 'ارزیابی', icon: FileCheck2, badge: pendingReportsCount },
          { id: 'education', label: 'درسنامه‌ها', icon: GraduationCap },
          { id: 'personnel', label: 'مربیان', icon: Users },
        ];
      case 'morabbi':
        return [
          { id: 'dashboard', label: 'پایگاه', icon: LayoutDashboard },
          { id: 'personnel', label: 'سرگروه‌ها', icon: Users },
          { id: 'reports', label: 'گزارش‌ها', icon: FileCheck2 },
          { id: 'education', label: 'آموزش', icon: GraduationCap },
        ];
      case 'sargorouh':
        return [
          { id: 'dashboard', label: 'جلسه من', icon: LayoutDashboard },
          { id: 'members', label: 'حضور و غیاب', icon: Users },
          { id: 'reports', label: 'ثبت گزارش', icon: FileCheck2 },
          { id: 'education', label: 'درسنامه', icon: GraduationCap },
        ];
      case 'basiji':
        return [
          { id: 'education', label: 'آموزش و آزمون', icon: GraduationCap },
          { id: 'dashboard', label: 'میز یادگیری', icon: LayoutDashboard },
          { id: 'announcements', label: 'اطلاعیه‌ها', icon: Bell },
          { id: 'rankings', label: 'رتبه‌بندی', icon: Trophy },
        ];
      default:
        return [
          { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
          { id: 'education', label: 'آموزش', icon: GraduationCap },
          { id: 'reports', label: 'گزارش‌ها', icon: FileCheck2 },
          { id: 'rankings', label: 'رتبه‌بندی', icon: Trophy },
        ];
    }
  };

  const tabs = getTabsForRole(currentUser.role);

  return (
    <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-5 items-center h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] relative transition-transform active:scale-95 ${
                isActive ? 'text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <div className="relative">
                <Icon size={19} className={isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-amber-500 text-white text-[9px] font-bold rounded-full min-w-3.5 text-center">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span
                className={`text-[9.5px] tracking-tight mt-1 truncate max-w-[60px] ${
                  isActive ? 'font-bold text-stone-900' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span
                  className="absolute bottom-1 w-5 h-0.5 rounded-full"
                  style={{ backgroundColor: theme.primaryHex }}
                />
              )}
            </button>
          );
        })}

        {/* Roles tab */}
        <button
          onClick={onOpenRoleSwitcher}
          className="flex flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] text-stone-500 active:scale-95"
          title="تغییر نقش کاربری"
        >
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center shadow-xs text-white"
            style={{ backgroundColor: theme.primaryHex }}
          >
            <Shield size={13} className={theme.accentText} />
          </div>
          <span className="text-[9.5px] font-medium tracking-tight mt-1 text-stone-600">
            نقش‌ها
          </span>
        </button>
      </div>
    </nav>
  );
};
