import React, { useState } from 'react';
import {
  CheckCircle2,
  Filter,
  Phone,
  PlusCircle,
  Search,
  Shield,
  ShieldAlert,
  UserCheck,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { ROLES_CONFIG } from '../data/mockData';
import { PersonnelUser, UserProfile, UserRole } from '../types';

interface PersonnelManagementViewProps {
  currentUser: UserProfile;
  personnelList: PersonnelUser[];
  onAddPersonnel: (newUser: Omit<PersonnelUser, 'id' | 'assignedAt' | 'createdByRole'>) => void;
}

export const PersonnelManagementView: React.FC<PersonnelManagementViewProps> = ({
  currentUser,
  personnelList,
  onAddPersonnel,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [assignedRole, setAssignedRole] = useState<UserRole>('morabbi');
  const [hozeh, setHozeh] = useState(currentUser.hozeh || 'حوزه ۲۱۵ ایثار');
  const [base, setBase] = useState(currentUser.base || 'پایگاه شهید همت');
  const [circleName, setCircleName] = useState('');
  const [rankBadge, setRankBadge] = useState('');

  // Determine assignable roles based on hierarchy
  const getAssignableRoles = (currentRole: UserRole): UserRole[] => {
    switch (currentRole) {
      case 'admin':
        return [
          'nahieh_officer',
          'nahieh_ostadyar',
          'hozeh_officer',
          'hozeh_sarmarbi',
          'morabbi',
          'sargorouh',
          'basiji',
        ];
      case 'nahieh_officer':
        return [
          'nahieh_ostadyar',
          'hozeh_officer',
          'hozeh_sarmarbi',
          'morabbi',
          'sargorouh',
          'basiji',
        ];
      case 'nahieh_ostadyar':
        return ['hozeh_sarmarbi', 'morabbi', 'sargorouh'];
      case 'hozeh_officer':
        return ['hozeh_sarmarbi', 'morabbi', 'sargorouh', 'basiji'];
      case 'hozeh_sarmarbi':
        return ['morabbi', 'sargorouh'];
      case 'morabbi':
        return ['sargorouh', 'basiji'];
      case 'sargorouh':
        return ['basiji'];
      default:
        return [];
    }
  };

  const assignableRoles = getAssignableRoles(currentUser.role);
  const canAddPersonnel = assignableRoles.length > 0;

  // Filter list based on visibility hierarchy
  const visiblePersonnel = personnelList.filter((p) => {
    // Role filter
    if (roleFilter !== 'all' && p.role !== roleFilter) return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.phone.includes(q) ||
        p.nationalCode.includes(q) ||
        p.base.toLowerCase().includes(q) ||
        (p.circleName && p.circleName.toLowerCase().includes(q))
      );
    }
    // Hierarchy scope limit
    if (currentUser.role === 'admin') return true;
    if (currentUser.role.startsWith('nahieh')) return p.nahieh === currentUser.nahieh;
    if (currentUser.role.startsWith('hozeh')) return p.hozeh === currentUser.hozeh;
    if (currentUser.role === 'morabbi') return p.base === currentUser.base;
    if (currentUser.role === 'sargorouh') return p.circleName === currentUser.circleName;
    return true;
  });

  const handleOpenAddModal = () => {
    if (assignableRoles.length > 0) {
      setAssignedRole(assignableRoles[0]);
    }
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    onAddPersonnel({
      name: name.trim(),
      role: assignedRole,
      nationalCode: nationalCode.trim() || '۰۰۱۲۳۴۵۶۷۸',
      phone: phone.trim(),
      nahieh: currentUser.nahieh || 'ناحیه مقاومت ابوذر',
      hozeh,
      base,
      circleName: circleName.trim() ? circleName.trim() : undefined,
      status: 'active',
      rankBadge: rankBadge.trim() ? rankBadge.trim() : ROLES_CONFIG[assignedRole].rankTitle,
    });

    setName('');
    setNationalCode('');
    setPhone('');
    setCircleName('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 text-right">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <Users size={22} className="text-[#2D4A3E]" />
            <span>مدیریت ساختار تشکیلاتی و زیرمجموعه‌های {ROLES_CONFIG[currentUser.role].title}</span>
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            ساماندهی، انتصاب مسئولین رده‌های تابعه و پایش احکام مسئولیتی در {currentUser.nahieh}
          </p>
        </div>

        {canAddPersonnel && (
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 text-xs font-bold text-white bg-[#243E34] hover:bg-[#1A2E26] rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
          >
            <UserPlus size={16} />
            <span>افزودن عضو / مسئول جدید به زیرمجموعه</span>
          </button>
        )}
      </div>

      {/* Permission scope callout */}
      <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#C59B27]/30 flex items-center justify-between text-xs text-stone-700">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-[#2D4A3E]" />
          <span>
            سطح دسترسی شما: <strong>{ROLES_CONFIG[currentUser.role].title}</strong>. رده‌های مجاز به انتصاب و افزودن توسط شما:{' '}
            <strong className="text-[#8C6B13]">
              {assignableRoles.map((r) => ROLES_CONFIG[r].title).join('، ') || 'صرفاً مشاهده'}
            </strong>
          </span>
        </div>
        <span className="font-mono tabular-nums text-stone-500 font-bold">
          {visiblePersonnel.length} نفر ثبت‌شده
        </span>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search size={16} className="absolute right-3 top-2.5 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی نام، تلفن، کدملی، پایگاه یا حلقه..."
            className="w-full pr-9 pl-4 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:border-[#2D4A3E]"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg overflow-x-auto shrink-0">
          <button
            onClick={() => setRoleFilter('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              roleFilter === 'all'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            همه نقش‌ها
          </button>
          {assignableRoles.map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                roleFilter === r
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {ROLES_CONFIG[r].title}
            </button>
          ))}
        </div>
      </div>

      {/* Personnel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visiblePersonnel.map((person) => {
          const roleCfg = ROLES_CONFIG[person.role];
          return (
            <div
              key={person.id}
              className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-xs"
                      style={{ backgroundColor: roleCfg.color }}
                    >
                      {roleCfg.level.substring(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-stone-900">{person.name}</h3>
                      <span className="text-[11px] font-semibold text-[#8C6B13] block">
                        {roleCfg.title}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                    فعال
                  </span>
                </div>

                <div className="space-y-1 text-xs text-stone-600 pt-1">
                  <p className="text-[11px] text-stone-500">
                    رده خدمتی: <strong>{person.base}</strong> {person.circleName ? `· ${person.circleName}` : ''}
                  </p>
                  <p className="text-[11px] text-stone-400">
                    حوزه: {person.hozeh} · ناحیه: {person.nahieh}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1 font-mono tabular-nums">
                  <Phone size={12} className="text-stone-400" />
                  <span>{person.phone}</span>
                </span>
                <span className="text-[10px] text-stone-400 font-mono tabular-nums">
                  انتصاب: {person.assignedAt}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Personnel Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden text-right animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-[#FAF8F5]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#243E34] text-[#E5C365] flex items-center justify-center">
                  <UserPlus size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    انتصاب و ثبت مسئول / عضو جدید در زیرمجموعه
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    ثبت توسط {ROLES_CONFIG[currentUser.role].title} ({currentUser.name})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  نقش و جایگاه تشکیلاتی <span className="text-red-500">*</span>
                </label>
                <select
                  value={assignedRole}
                  onChange={(e) => setAssignedRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
                >
                  {assignableRoles.map((role) => (
                    <option key={role} value={role}>
                      {ROLES_CONFIG[role].title} ({ROLES_CONFIG[role].level})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-stone-400 mt-1">
                  {ROLES_CONFIG[assignedRole]?.description}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  نام و نام خانوادگی <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: برادر پاسدار محمدرضا رضایی"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    شماره تماس / همراه <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="۰۹۱۲۰۰۰۰۰۰۰"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E] font-mono tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">کد ملی</label>
                  <input
                    type="text"
                    value={nationalCode}
                    onChange={(e) => setNationalCode(e.target.value)}
                    placeholder="۰۰۱۲۳۴۵۶۷۸"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E] font-mono tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">حوزه مقاومت</label>
                  <input
                    type="text"
                    value={hozeh}
                    onChange={(e) => setHozeh(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">پایگاه مقاومت</label>
                  <input
                    type="text"
                    value={base}
                    onChange={(e) => setBase(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
                  />
                </div>
              </div>

              {(assignedRole === 'sargorouh' || assignedRole === 'basiji') && (
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    نام حلقه صالحین مربوطه
                  </label>
                  <input
                    type="text"
                    value={circleName}
                    onChange={(e) => setCircleName(e.target.value)}
                    placeholder="مثال: حلقه نوجوانان شهید ابراهیم هادی"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-[#2D4A3E]"
                  />
                </div>
              )}

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-2 text-xs text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-[#243E34] hover:bg-[#1A2E26] rounded-xl shadow-xs"
                >
                  ثبت رسمی حکم و افزودن به سامانه
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
